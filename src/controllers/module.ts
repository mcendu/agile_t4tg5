import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import Controller from './controller';

export default class ModuleController extends Controller {
    #indexModules: Statement;
    #getGrades: Statement;
    #addGrade: Statement;

    constructor(db: Database) {
        super(db);

        this.#indexModules = db.prepare('SELECT id,name,code FROM modules;');
        this.#indexModules.safeIntegers();

        this.#getGrades = db.prepare(
            'SELECT grades FROM modules WHERE id=?;'
        );

        this.#addGrade = db.prepare(
            "UPDATE modules SET grades=? WHERE id=?;",
        );
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        return this.#indexModules.all() as Module[];
    }

        
    /**
     * Get a modules current grades.
     */
    getGrades(id: number | bigint) {
        return this.#getGrades.get(BigInt(id));
    }

    /**
     * Add a grade to a module.
     */
    addGrade(id: number | bigint, grades: any) {
        return this.#addGrade.get(BigInt(id), grades);
    }
}
