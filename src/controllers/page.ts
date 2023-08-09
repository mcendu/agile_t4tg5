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
    #indexUserCreatedPages: Statement;
    #addPage: Statement;
    #renamePage: Statement<[string, bigint]>;
    #deleteAllWidgetsFromPage: Statement<bigint>;
    #deletePage: Statement<bigint>;

    #showPage: Statement<bigint>;

    constructor(db: Database) {
        super(db);

        this.#indexPages = db.prepare(
            'SELECT id,name,userCreated FROM pages WHERE userCreated = 0;',
        );
        this.#indexPages.safeIntegers();
        this.#indexUserCreatedPages = db.prepare(
            'SELECT id,name,userCreated FROM pages WHERE userCreated = 1;',
        );
        this.#indexUserCreatedPages.safeIntegers();
        this.#addPage = db.prepare(
            "INSERT INTO pages(name) VALUES('New Page') RETURNING id,name,userCreated;",
        );
        this.#renamePage = db.prepare('UPDATE pages SET name=? WHERE id=?;');
        this.#deleteAllWidgetsFromPage = db.prepare(
            'DELETE FROM widgets WHERE page=?;',
        );
        this.#deletePage = db.prepare('DELETE FROM pages WHERE id=?;');

        this.#showPage = db.prepare(
            'SELECT id,type,data FROM widgets WHERE page=?;',
        );
        this.#showPage.safeIntegers();
    }

    /**
     * Get a list of pages native to the app.
     */
    indexAppCreated(): Page[] {
        return this.#indexPages.all() as Page[];
    }

    /**
     * Get a list of pages in the order as dictated by the user.
     */
    indexUserCreated(): Page[] {
        return this.#indexUserCreatedPages.all() as Page[];
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
        return this.#addPage.get() as Page;
    }

    /**
     * Delete a page and all widgets in it from the database.
     * @param id The page to delete.
     */
    delete(id: number | bigint) {
        this.#deleteAllWidgetsFromPage.run(BigInt(id));
        this.#deletePage.run(BigInt(id));
    }
}
