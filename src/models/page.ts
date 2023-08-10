/**
 * Represents a named set of widgets.
 */
export default interface Page {
    /**
     * The numeric identifier of this page.
     */
    id: bigint;
    /**
     * The name of this page.
     */
    name: string;
    /**
     * The module associated with this page.
     */
    module?: bigint;
}
