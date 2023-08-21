/**
 * Represents a computer science module.
 */
export default interface Module {
    /**
     * The numeric identifier of this module.
     */
    id: bigint;
    /**
     * The name of the module.
     */
    name: string;
    /**
     * The name of the module.
     */
    code: string;
    /**
     * Whether the module should be displayed or not.
     */
    enabled: boolean;
    /**
     * Modules grades for grade page.
     */
    grades: any;
    /**
     * Modules grades for grade page.
     */
    total: any;
}
