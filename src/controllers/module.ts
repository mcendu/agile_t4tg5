import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import type Grade from '../models/grade';
import Controller from './controller';
import { Integer } from '../assets/js/controllers';

interface GradeRow {
    id: bigint;
    type: string;
    grade: Integer;
    weight: Integer;
}

export default class ModuleController extends Controller {
    #indexModules: Statement;
    #getGradesModules: Statement;
    #addGradeModules: Statement;

    constructor(db: Database) {
        super(db);

        this.#indexModules = db.prepare('SELECT id,name,code,enabled,grades FROM modules;');
        this.#indexModules.safeIntegers();

        this.#getGradesModules = db.prepare(
            'SELECT * FROM grades WHERE module_id=?;'
        );

        this.#addGradeModules = db.prepare(
            "INSERT INTO grades(module_id, type, grade, weight) VALUES(?,?,?,?) RETURNING *;"
        );
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        const rows = this.#indexModules.all() as Module[];
        return rows.map<Module>((row) => {
            const grade_result = this.#getGradesModules.all(row.id) as Grade[];
            return Object.assign({}, row, {
                grades: grade_result,
            });
        });
    }

        
    /**
     * Get a modules current grades as JSON.
     */
    getGrades(id: number | bigint) {
        const res = this.#getGradesModules.all(BigInt(id));
        return "got"
    }

    /**
     * Add a grade to a module.
     */
    addGrade(id: number | bigint, grades: any): string{
        const rows = this.#addGradeModules.run(BigInt(id), "Midterm", 50, 50);
        return "success"
    }
}
