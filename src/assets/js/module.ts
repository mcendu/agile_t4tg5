export default class Module {
    /**
     * The in-database identifier of the Module.
     */
    id: bigint;
    /**
     * The name of the module.
     */
    name: string;
    /**
     * Modules code.
     */
    code: string;
    /**
     * Module shown or not.
     */
    enabled: boolean;
    /**
     * Grade data for the module.
     */
    grade: unknown

    constructor(id: bigint, name: string, code: string, enabled: boolean, grade: unknown) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.enabled = enabled;
        this.grade = grade;
    }
}
