/**
 * Represents a widget from backend's view.
 */
export default interface Widget {
    /**
     * The numeric identifier of this widget in the database.
     */
    id: BigInt;
    /**
     * The type of the widget.
     */
    type: string;
    /**
     * The widget-type-specific data of the widget. This is serialized
     * to JSON in the database.
     */
    data: any;
}
