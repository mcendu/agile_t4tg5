/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { join } from 'path';
import { app } from 'electron';
import Database from 'better-sqlite3';
import migrateDatabase from './migrate';

let db: Database.Database | undefined = undefined;

function getDatabase() {
    if (db) return db;

    // load and set options
    db = new Database(join(app.getPath('userData'), 'book.db'));
    db.pragma("encoding = 'UTF-8'");
    db.pragma('foreign_keys = ON');
    db.pragma('journal_mode = WAL');
    migrateDatabase(db);
    return db;
}

export default getDatabase;
