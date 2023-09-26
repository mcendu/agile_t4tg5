/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Database } from 'better-sqlite3';

const upSql = `
BEGIN IMMEDIATE;

CREATE INDEX modules_enabled ON modules(enabled);

COMMIT;
`;

const downSql = `
BEGIN IMMEDIATE;

DROP INDEX modules_enabled;

COMMIT;
`;

export default {
    up(db: Database) {
        db.exec(upSql);
    },
    down(db: Database) {
        db.exec(downSql);
    },
};
