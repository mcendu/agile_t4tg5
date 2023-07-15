import { Database } from 'better-sqlite3';
import initializeDatabase from './current_schema';
import migrations from './migrations/index';

/**
 * Migrate a database to the latest schema version.
 * @param db The database to migrate.
 */
export default function migrateDatabase(db: Database) {
    const checkMetadataTable = db.prepare(
        "SELECT name FROM sqlite_schema WHERE tbl_name='sa_metadata'",
    );
    const checkNotEmpty = db.prepare('SELECT name FROM sqlite_schema');

    if (!checkMetadataTable.get()) {
        if (!checkNotEmpty.get()) {
            initializeDatabase(db);
            return;
        }
        // TODO: overwrite database
        throw new TypeError(`Not a Study Assistant database: ${db.name}`);
    }

    const getSchemaVer = db.prepare(
        "SELECT value FROM sa_metadata WHERE key='schema_version'",
    );
    const updateSchemaVer = db.prepare<number>(
        "UPDATE sa_metadata SET value=? WHERE key='schema_version'",
    );

    const schemaVer = (getSchemaVer.get() as { value: number }).value;
    if (schemaVer == migrations.current_version) return;
    else if (schemaVer < migrations.current_version) {
        // migrate up
        for (let i = schemaVer; i < migrations.current_version; ++i) {
            migrations.migrations[i + 1].up(db);
        }
        updateSchemaVer.run(migrations.current_version);
    } else if (schemaVer > migrations.current_version) {
        // NOTE: To revert schema changes, see
        // /src/data/migrations/index.ts.
        throw new RangeError(
            `Database "${db.name}" is incompatible with this version of ` +
                'Study Assistant; multiple versions of Study Assistant might ' +
                'be installed. Please uninstall all except the latest version ' +
                'of this application.',
        );
    }
}
