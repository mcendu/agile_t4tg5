// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('controllers', {
    page: {
        index: () => ipcRenderer.invoke('page.index'),
        indexAppCreated: () => ipcRenderer.invoke('page.indexAppCreated'),
        indexUserCreated: () => ipcRenderer.invoke('page.indexUserCreated'),
        show: (id: unknown) => ipcRenderer.invoke('page.show', id),
        add: () => ipcRenderer.invoke('page.add'),
        rename: (id: unknown, name: unknown) =>
            ipcRenderer.invoke('page.rename', id, name),
        del: (id: unknown) => ipcRenderer.invoke('page.delete', id),
    },
    widget: {
        add: (page: unknown, widget: unknown) =>
            ipcRenderer.invoke('widget.add', page, widget),
        edit: (id: unknown, data: unknown) =>
            ipcRenderer.invoke('widget.edit', id, data),
        del: (id: unknown) => ipcRenderer.invoke('widget.delete', id),
    },
    module: {
        index: () => ipcRenderer.invoke('module.index'),
        getGrades: (id: unknown) => ipcRenderer.invoke('module.getGrades', id),
        addGrade: (
            id: unknown,
            session: unknown,
            grade: unknown,
            weight: unknown,
        ) => ipcRenderer.invoke('module.addGrade', id, session, grade, weight),
        editGrade: (id: unknown, grade: unknown, weight: unknown) =>
            ipcRenderer.invoke('module.editGrade', id, grade, weight),
        deleteGrade: (id: unknown) =>
            ipcRenderer.invoke('module.deleteGrade', id),
    },
});
