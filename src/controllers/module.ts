import type { Database, Statement } from 'better-sqlite3';
import type Module from '../models/module';
import type Grade from '../models/grade';
import type TotalGrade from '../models/totalGrade';
import Controller from './controller';

export default class ModuleController extends Controller {
    #indexModules: Statement;
    #indexEnabled: Statement;
    #getGradesModules: Statement<bigint>;
    #toggle: Statement<{ id: bigint; enabled: boolean }>;

    constructor(db: Database) {
        super(db);

        this.#indexModules = db.prepare(
            'SELECT id,name,code,enabled,grades FROM modules;',
        );
        this.#indexModules.safeIntegers();

        this.#indexEnabled = db.prepare(
            'SELECT id,name,code,enabled,grades FROM modules WHERE enabled=TRUE;',
        );
        this.#indexEnabled.safeIntegers();

        this.#getGradesModules = db.prepare(
            'SELECT * FROM grades WHERE module_id=?;',
        );

        this.#toggle = db.prepare(
            'UPDATE modules SET enabled=:enabled WHERE id=:id;',
        );
    }

    /**
     * Transform database rows for consumption by frontend.
     * @param row The raw module data.
     */
    #transform(row: Module): Module {
        // SQLite stores booleans as integers
        row.enabled = Boolean(row.enabled);

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
    }

    /**
     * Get a list of all modules.
     */
    index(): Module[] {
        const rows = this.#indexModules.all() as Module[];
        return rows.map((row) => this.#transform(row));
    }

    /**
     * Get a list of modules currently enrolled in.
     */
    indexEnabled(): Module[] {
        const rows = this.#indexEnabled.all() as Module[];
        return rows.map((row) => this.#transform(row));
    }

    toggle(id: number | bigint, enabled: boolean) {
        this.#toggle.run({ id: BigInt(id), enabled });
    }
}
