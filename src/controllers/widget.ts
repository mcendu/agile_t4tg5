/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import type { Database, Statement } from 'better-sqlite3';
import Controller from './controller';
import Widget from '../models/widget';

export default class WidgetController extends Controller {
    #addWidget: Statement<{ page: bigint; type: string; data: string }>;
    #editWidget: Statement<{ id: bigint; data: string }>;
    #deleteWidget: Statement<bigint>;

    constructor(db: Database) {
        super(db);

        this.#addWidget = db.prepare(
            `INSERT INTO widgets(page,type,data) VALUES($page,$type,$data)
                RETURNING id;`,
        );
        this.#editWidget = db.prepare(
            `UPDATE widgets SET data=$data WHERE id=$id
                RETURNING id,type,data;`,
        );
        this.#deleteWidget = db.prepare('DELETE FROM widgets WHERE id=?');
    }

    /**
     * Add a new widget to a page.
     * @param page The page to add a widget to.
     * @param widget The widget to add.
     */
    add(page: number | bigint, widget: Widget): Widget {
        // lock db cursor to get consistent results when assinging widget id
        widget.id = (
            this.#addWidget.get({
                page: BigInt(page),
                type: widget.type,
                data: JSON.stringify(widget.data),
            }) as { id: bigint }
        ).id;
        return widget;
    }

    /**
     * Update a specific widget's representation in database.
     * @param id The widget to update.
     * @param data The new data.
     * @returns The updated widget.
     */
    edit(id: number | bigint, data: any) {
        return this.#editWidget.get({
            id: BigInt(id),
            data: JSON.stringify(data),
        }) as Widget;
    }

    /**
     * Delete a widget.
     * @param id The widget to delete.
     */
    delete(id: number | bigint) {
        this.#deleteWidget.run(BigInt(id));
    }
}
