import type { Database, Statement } from 'better-sqlite3';
import type Page from '../models/page';
import type Widget from '../models/widget';
import Controller from './controller';

interface WidgetRow {
    id: bigint;
    type: string;
    data: string;
}

export default class PageController extends Controller {
    #indexPages: Statement;
    #addPage: Statement;
    #getNewPage: Statement;
    #renamePage: Statement<[string, bigint]>;
    #deleteAllWidgetsFromPage: Statement<bigint>;
    #deletePage: Statement<bigint>;

    #showPage: Statement<bigint>;
    #addWidget: Statement<{ page: bigint; type: string; data: string }>;
    #getLastRowid: Statement;

    constructor(db: Database) {
        super(db);

        this.#indexPages = db.prepare('SELECT id,name FROM pages;');
        this.#indexPages.safeIntegers();
        this.#addPage = db.prepare(
            "INSERT INTO pages(name) VALUES('New Page');",
        );
        this.#getNewPage = db.prepare(
            'SELECT id,name FROM pages WHERE id=last_insert_rowid();',
        );
        this.#renamePage = db.prepare(
            'UPDATE pages SET name=$name WHERE id=$id;',
        );
        this.#deleteAllWidgetsFromPage = db.prepare(
            'DELETE FROM widgets WHERE page=?;',
        );
        this.#deletePage = db.prepare('DELETE FROM pages WHERE id=?;');

        this.#showPage = db.prepare(
            'SELECT id,type,data FROM widgets WHERE page=?;',
        );
        this.#showPage.safeIntegers();

        this.#addWidget = db.prepare(
            'INSERT INTO widgets(page,type,data) VALUES($page,$type,$data);',
        );

        this.#getLastRowid = db.prepare('SELECT last_insert_rowid();');
        // "SELECT last_insert_rowid()" don't produce a good column name
        this.#getLastRowid.raw().safeIntegers();
    }

    /**
     * Get a list of pages in the order as dictated by the user.
     */
    index(): Page[] {
        return this.#indexPages.all() as Page[];
    }

    /**
     * Get the widgets of a page.
     * @param id Refers to the page to show.
     */
    show(id: number | bigint): Widget[] {
        const rows = this.#showPage.all(BigInt(id)) as WidgetRow[];
        return rows.map<Widget>((row) => {
            return Object.assign({}, row, {
                data: JSON.parse(row.data),
            });
        });
    }

    /**
     * Rename a page.
     * @param id Refers to the page to rename.
     * @param name The new name.
     * @returns The new name as passed in `name`.
     */
    rename(id: number | bigint, name: string): string {
        this.#renamePage.run(name, BigInt(id));
        return name;
    }

    /**
     * Add a new page.
     */
    add(): Page {
        this.#addPage.run();
        return this.#getNewPage.get() as Page;
    }

    /**
     * Delete a page and all widgets in it from the database.
     * @param id The page to delete.
     */
    delete(id: number | bigint) {
        this.#deleteAllWidgetsFromPage.run(BigInt(id));
        this.#deletePage.run(BigInt(id));
    }

    /**
     * Add a new widget to a page.
     * @param id The page to add a widget to.
     * @param widget The new widget.
     */
    addWidget(id: number | bigint, widget: Widget): Widget {
        // lock db cursor to get consistent results when assinging widget id
        this.#addWidget.run({
            page: BigInt(id),
            type: widget.type,
            data: JSON.stringify(widget.data),
        });
        widget.id = (this.#getLastRowid.get() as [bigint])[0];
        return widget;
    }
}
