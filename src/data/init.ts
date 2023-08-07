import * as fs from 'fs';
import { platform, homedir } from 'os';
import { join } from 'path';
import migrateDatabase from './migrate';
import Database from 'better-sqlite3';

let db: Database.Database | undefined = undefined;

/**
 * Get the data directory for an application, creating it if it does
 * not exist.
 * @param appName The name of the current application.
 * @returns The data directory of this application.
 */
function getDataDir(appName: string) {
    let baseDataDir = undefined;
    switch (platform()) {
        case 'win32':
            baseDataDir = join(homedir(), 'AppData', 'Roaming');
            console.log(baseDataDir)
            break;
        case 'darwin':
            baseDataDir = join(homedir(), 'Library', 'Application Support');
        // assume XDG conventions
        default:
            baseDataDir = join(homedir(), '.local', 'share');
            break;
    }

    const dataDir = join(baseDataDir, appName);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    } else {
        const dataDirFd = fs.openSync(dataDir, 'r');
        if (!fs.fstatSync(dataDirFd).isDirectory()) {
            fs.rmSync(dataDir);
            fs.mkdirSync(dataDir);
        }
        fs.closeSync(dataDirFd);
    }

    return dataDir;
}

function getDatabase() {
    if (db) return db;

    // load and set options
    db = new Database(join(getDataDir('studyassistant'), 'book.db'));
    db.pragma("encoding = 'UTF-8'");
    db.pragma('foreign_keys = ON');
    db.pragma('journal_mode = WAL');
    migrateDatabase(db);
    return db;
}

export default getDatabase;
