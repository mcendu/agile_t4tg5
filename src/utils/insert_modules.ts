/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Database } from 'better-sqlite3';
import modules from '../config/modules';

/**
 * Insert modules of the curriculum and their associated pages.
 */
export function insertModules(db: Database) {
    db.exec('SAVEPOINT insert_modules');
    const num_entries = db.prepare('SELECT count(*) FROM modules');
    const insertModule = db.prepare(
        'INSERT INTO modules(name, code, enabled) VALUES (?,?,?) RETURNING id',
    );
    const generatePage = db.prepare(
        'INSERT INTO pages(name, module) VALUES (?,?);',
    );

    modules.forEach((module) => {
        const module_id = insertModule.run(
            module.name,
            module.code,
            module.enabled,
        );
        generatePage.run(module.name, module_id.lastInsertRowid);
    });

    db.exec('RELEASE insert_modules');
}
