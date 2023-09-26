/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

/**
 * Represents a widget from backend's view.
 */
export default interface Widget {
    /**
     * The numeric identifier of this widget in the database.
     */
    id: bigint;
    /**
     * The type of the widget.
     */
    type: string;
    /**
     * The widget-type-specific data of the widget. This is serialized
     * to JSON in the database.
     */
    data: unknown;
}
