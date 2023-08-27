import type { Database, Statement } from 'better-sqlite3';
import Grade from '../models/grade';
import Controller from './controller';

export default class GradeController extends Controller {
    #getGradesModules: Statement<bigint>;
    #addGradeModules: Statement<[bigint, string, number, number]>;
    #editGradeModules: Statement<{
        id: bigint;
        type: string;
        grade: number;
        weight: number;
    }>;
    #deleteGradeModules: Statement<bigint>;

    constructor(db: Database) {
        super(db);

        this.#getGradesModules = db.prepare(
            'SELECT * FROM grades WHERE module_id=?;',
        );

        this.#addGradeModules = db.prepare(
            'INSERT INTO grades(module_id, type, grade, weight) VALUES(?,?,?,?);',
        );

        this.#editGradeModules = db.prepare(
            'UPDATE grades \
                SET type=:type, grade=:grade, weight=:weight \
                WHERE id=:id \
                RETURNING *;',
        );

        this.#deleteGradeModules = db.prepare('DELETE FROM grades WHERE id=?;');
    }

    /**
     * Get a module's current grades.
     */
    getGrades(id: number | bigint): Grade[] {
        return this.#getGradesModules.all(BigInt(id)) as Grade[];
    }

    /**
     * Add a grade to a module.
     */
    addGrade(
        id: number | bigint,
        session: string,
        grade: number,
        weight: number,
    ): void {
        this.#addGradeModules.run(BigInt(id), session, grade, weight);
    }

    /**
     * Edit a modules grade.
     */
    editGrade(
        id: number | bigint,
        type: string,
        grade: number,
        weight: number,
    ) {
        return this.#editGradeModules.get({
            id: BigInt(id),
            type,
            grade,
            weight,
        });
    }

    /**
     * Delete a grade from a module.
     */
    deleteGrade(id: number | bigint): void {
        this.#deleteGradeModules.run(BigInt(id));
    }
}
