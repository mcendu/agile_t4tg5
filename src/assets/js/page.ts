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
     * Whether the page was created by user.
     */
    userCreated: boolean;
    /**
     * A list of widgets on this page.
     */
    widgets?: Widget[] = undefined;

    constructor(id: bigint, name: string, userCreated: boolean) {
        this.id = id;
        this.name = name;
        this.userCreated = userCreated;
    }
}
