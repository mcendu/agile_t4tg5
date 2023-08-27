import { Database } from 'better-sqlite3';
import {
    PageController,
    WidgetController,
    ModuleController,
} from './controllers';
import { ipcMain } from 'electron';
import GradeController from './controllers/grade';

export default function setupIpcMainHandles(db: Database) {
    const page = new PageController(db);
    ipcMain.handle('page.index', () => page.index());
    ipcMain.handle('page.indexAppCreated', () => page.indexAppCreated());
    ipcMain.handle('page.indexUserCreated', () => page.indexUserCreated());
    ipcMain.handle('page.show', (e, id) => page.show(id));
    ipcMain.handle('page.add', () => page.add());
    ipcMain.handle('page.rename', (e, id, name) => page.rename(id, name));
    ipcMain.handle('page.delete', (e, id) => page.delete(id));

    const widget = new WidgetController(db);
    ipcMain.handle('widget.add', (e, page, w) => widget.add(page, w));
    ipcMain.handle('widget.edit', (e, id, data) => widget.edit(id, data));
    ipcMain.handle('widget.delete', (e, id) => widget.delete(id));

    const module = new ModuleController(db);
    ipcMain.handle('module.index', () => module.index());

    const grade = new GradeController(db);
    ipcMain.handle('grade.getGrades', (e, id) => grade.getGrades(id));
    ipcMain.handle('grade.addGrade', (e, id, session, g, weight) =>
        grade.addGrade(id, session, g, weight),
    );
    ipcMain.handle('grade.editGrade', (e, id, session, g, weight) =>
        grade.editGrade(id, session, g, weight),
    );
    ipcMain.handle('grade.deleteGrade', (e, id) => grade.deleteGrade(id));
}
