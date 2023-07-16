import type { Database, Statement } from 'better-sqlite3';
import Controller from './controller';
import Widget from '../models/widget';

export default class WidgetController extends Controller {
    #addWidget: Statement<{ page: bigint; type: string; data: string }>;
    #getLastRowid: Statement;
    #editWidget: Statement<{ id: bigint; data: string }>;
    #deleteWidget: Statement<bigint>;

    constructor(db: Database) {
        super(db);

        this.#addWidget = db.prepare(
            'INSERT INTO widgets(page,type,data) VALUES($page,$type,$data);',
        );

        this.#getLastRowid = db.prepare('SELECT last_insert_rowid();');
        // "SELECT last_insert_rowid()" don't produce a good column name
        this.#getLastRowid.raw().safeIntegers();
        this.#editWidget = db.prepare(
            'UPDATE widgets SET data=$data WHERE id=$id',
        );
        this.#deleteWidget = db.prepare('DELETE FROM widgets WHERE id=$id');
    }

    /**
     * Add a new widget to a page.
     * @param page The page to add a widget to.
     * @param widget The widget to add.
     */
    add(page: number | bigint, widget: Widget): Widget {
        // lock db cursor to get consistent results when assinging widget id
        this.#addWidget.run({
            page: BigInt(page),
            type: widget.type,
            data: JSON.stringify(widget.data),
        });
        widget.id = (this.#getLastRowid.get() as [bigint])[0];
        return widget;
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
