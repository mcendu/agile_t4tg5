import type { Database, Statement } from 'better-sqlite3';
// import type Module from '../models/grade';
import Controller from './controller';
import { Integer } from '../assets/js/controllers';

interface GradeRow {
    id: bigint;
    module_id: bigint;
    type: string;
    grade: Integer;
    weight: Integer;
}

export default class GradeController extends Controller {
    #getGrades: Statement;

    constructor(db: Database) {
        super(db);

        this.#getGrades = db.prepare('SELECT * FROM grades WHERE module_id = ?;');
        this.#getGrades.safeIntegers();

    }
        
    /**
     * Get a modules current grades as JSON.
     */
    get(id: number | bigint) {
        const res = this.#getGrades.get(BigInt(id));
    }
}
