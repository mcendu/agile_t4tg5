// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('controllers', {
    page: {
        index: () => ipcRenderer.invoke('page.index'),
        show: (id: unknown) => ipcRenderer.invoke('page.show', id),
        add: () => ipcRenderer.invoke('page.add'),
        addWidget: (id: unknown, widget: unknown) =>
            ipcRenderer.invoke('page.addWidget', id, widget),
        rename: (id: unknown, name: unknown) =>
            ipcRenderer.invoke('page.rename', id, name),
        del: (id: unknown) => ipcRenderer.invoke('page.delete', id),
    },
    widget: {
        edit: (id: unknown, data: unknown) =>
            ipcRenderer.invoke('widget.edit', id, data),
        del: (id: unknown) => ipcRenderer.invoke('widget.delete', id),
    },
});
