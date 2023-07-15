import type { Database, Statement } from 'better-sqlite3';
import Controller from './controller';

export default class WidgetController extends Controller {
    #editWidget: Statement<{ id: bigint; data: string }>;
    #deleteWidget: Statement<bigint>;

    constructor(db: Database) {
        super(db);

        this.#editWidget = db.prepare(
            'UPDATE widgets SET data=$data WHERE id=$id',
        );
        this.#deleteWidget = db.prepare('DELETE FROM widgets WHERE id=$id');
    }

    /**
     * Update a specific widget's representation in database.
     * @param id The widget to update.
     * @param data The new data.
     */
    edit(id: number | bigint, data: any) {
        this.#editWidget.run({
            id: BigInt(id),
            data: JSON.stringify(data),
        });
    }

    /**
     * Delete a widget.
     * @param id The widget to delete.
     */
    delete(id: number | bigint) {
        this.#deleteWidget.run(BigInt(id));
    }
}
