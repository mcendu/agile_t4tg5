import Widget from '../../models/widget';

export default class Page {
    /**
     * The in-database identifier of the page.
     */
    id: bigint;
    /**
     * The name of the page.
     */
    name: string;
    /**
     * The name of the page.
     */
    special: boolean;
    /**
     * A list of widgets on this page.
     */
    widgets?: Widget[] = undefined;

    constructor(id: bigint, name: string, special?: boolean) {
        this.id = id;
        this.name = name;
        if (special === undefined) {
            this.special = false;
        } else {
            this.special = special;
        }
    }
}
