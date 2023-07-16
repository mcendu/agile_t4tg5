import Widget from "../../models/widget";

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
     * A list of widgets on this page.
     */
    widgets?: Widget[] = undefined;

    constructor(id: bigint, name: string) {
        this.id = id;
        this.name = name;
    }
}
