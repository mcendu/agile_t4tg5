import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import Controller from './controller';

export default class ModuleController extends Controller {
    #indexModules: Statement;

    constructor(db: Database) {
        super(db);

        this.#indexModules = db.prepare('SELECT id,name,code FROM modules;');
        this.#indexModules.safeIntegers();
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        return this.#indexModules.all() as Module[];
    }
}
