import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import Controller from './controller';

interface ModuleRow {
    id: bigint;
    name: string;
    code: string;
    enabled: boolean;
    grades: string;
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
            'SELECT grades FROM modules WHERE id=?;'
        );

        this.#addGradeModules = db.prepare(
            "UPDATE modules SET grades=? WHERE id=?;",
        );
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        const rows = this.#indexModules.all() as Module[];
        return rows.map<Module>((row) => {
            return Object.assign({}, row, {
                grades: JSON.parse(row.grades),
            });
        });
    }

        
    /**
     * Get a modules current grades.
     */
    getGrades(id: number | bigint) {
        return JSON.stringify(this.#getGradesModules.get(BigInt(id)));
    }

    /**
     * Add a grade to a module.
     */
    addGrade(id: number | bigint, grades: any): string{
        this.#addGradeModules.run(JSON.stringify(grades), BigInt(id));
        return grades
    }
}
