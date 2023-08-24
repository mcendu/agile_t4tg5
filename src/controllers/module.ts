import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import type Grade from '../models/grade';
import type TotalGrade from '../models/totalGrade';
import Controller from './controller';

export default class ModuleController extends Controller {
    #indexModules: Statement;
    #getGradesModules: Statement<bigint>;

    constructor(db: Database) {
        super(db);

        this.#indexModules = db.prepare(
            'SELECT id,name,code,enabled,grades FROM modules;',
        );
        this.#indexModules.safeIntegers();

        this.#getGradesModules = db.prepare(
            'SELECT * FROM grades WHERE module_id=?;',
        );
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        const rows = this.#indexModules.all() as Module[];
        return rows.map<Module>((row) => {
            const grade_result = this.#getGradesModules.all(row.id) as Grade[];
            let overall_grade: TotalGrade = {
                grade: 0,
                weight: 0,
            };
            grade_result.forEach((g) => {
                overall_grade.grade =
                    +overall_grade.grade + (+g.grade * +g.weight) / 100;
                overall_grade.weight = +overall_grade.weight + +g.weight;
            });
            return Object.assign({}, row, {
                grades: grade_result,
                total: overall_grade,
            });
        });
    }
}
