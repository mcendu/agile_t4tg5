import { Database } from 'better-sqlite3';
import { PageController, WidgetController } from './controllers';
import { ipcMain } from 'electron';

export default function setupIpcMainHandles(db: Database) {
    const page = new PageController(db);
    ipcMain.handle('page.index', () => page.index());
    ipcMain.handle('page.show', (e, id) => page.show(id));
    ipcMain.handle('page.add', () => page.add());
    ipcMain.handle('page.addWidget', (e, id, widget) =>
        page.addWidget(id, widget),
    );
    ipcMain.handle('page.rename', (e, id, name) => page.rename(id, name));
    ipcMain.handle('page.delete', (e, id) => page.delete(id));

    const widget = new WidgetController(db);
    ipcMain.handle('widget.edit', (e, id, data) => widget.edit(id, data));
    ipcMain.handle('widget.delete', (e, id) => widget.delete(id));
}
