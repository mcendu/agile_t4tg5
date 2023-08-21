import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import type Grade from '../models/grade';
import Controller from './controller';

export default class ModuleController extends Controller {
    #indexModules: Statement;
    #getGradesModules: Statement;
    #addGradeModules: Statement;
    #editGradeModules: Statement;
    #deleteGradeModules: Statement;

    constructor(db: Database) {
        super(db);

        this.#indexModules = db.prepare(
            'SELECT id,name,code,enabled,grades FROM modules;',
        );
        this.#indexModules.safeIntegers();

        this.#getGradesModules = db.prepare(
            'SELECT * FROM grades WHERE module_id=?;',
        );

        this.#addGradeModules = db.prepare(
            'INSERT INTO grades(module_id, type, grade, weight) VALUES(?,?,?,?) RETURNING *;',
        );

        this.#editGradeModules = db.prepare(
            'UPDATE grades SET grade=?, weight=? WHERE id=? RETURNING *;',
        );

        this.#deleteGradeModules = db.prepare('DELETE FROM grades WHERE id=?;');
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        const rows = this.#indexModules.all() as Module[];
        return rows.map<Module>((row) => {
            const grade_result = this.#getGradesModules.all(row.id) as Grade[];
            let overall_grade: Number = 0;
            let overall_weight: Number = 0;
            grade_result.forEach((g) => {
                overall_grade = +overall_grade + (+g.grade * +g.weight) / 100;
                overall_weight = +overall_weight + +g.weight;
            });
            return Object.assign({}, row, {
                grades: grade_result,
                total: { overall_grade, overall_weight },
            });
        });
    }

    /**
     * Get a modules current grades.
     */
    getGrades(id: number | bigint): Grade[] {
        return this.#getGradesModules.all(BigInt(id)) as Grade[];
    }

    /**
     * Add a grade to a module.
     */
    addGrade(id: number | bigint, grades: any): Grade[] {
        return this.#addGradeModules.get(
            id,
            grades.session,
            grades.grade,
            grades.weight,
        ) as Grade[];
    }

    /**
     * Edit a modules grade.
     */
    editGrade(id: number | bigint, grade: Number, weight: Number): Grade[] {
        return this.#editGradeModules.get(grade, weight, BigInt(id)) as Grade[];
    }

    /**
     * Delete a grade from a module.
     */
    deleteGrade(id: number | bigint): void {
        this.#deleteGradeModules.run(BigInt(id));
    }
}
