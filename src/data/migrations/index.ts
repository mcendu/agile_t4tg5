/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Database } from 'better-sqlite3';

import m20230714_InitialRevision from './20230714_initial_revision';
import m20230807_AddModules from './20230807_add_modules';
import m20230807_AddGrades from './20230813_add_grades';
import m20230909_IndexEnabledModules from './20230909_index_enabled_modules';

/**
 * Represents a database migration.
 */
interface Migration {
    /**
     * Execute this migration.
     */
    up(db: Database): void;
    /**
     * Rollback changes made by this migration.
     */
    down(db: Database): void;
}

const migrations: Migration[] = [
    m20230714_InitialRevision,
    m20230807_AddModules,
    m20230807_AddGrades,
    m20230909_IndexEnabledModules,
];

const current_version = migrations.length - 1;

function revertMigration(m: Migration): Migration {
    return {
        up: m.down,
        down: m.up,
    };
}

export default {
    migrations,
    current_version,
};
