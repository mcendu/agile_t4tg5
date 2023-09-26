/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Database } from 'better-sqlite3';

export default class Controller {
    /**
     * The database cursor.
     */
    protected db: Database;

    constructor(db: Database) {
        this.db = db;
    }
}
