// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('controllers', {
    page: {
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
    },
});
