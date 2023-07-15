// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import Widget from '../../models/widget';

contextBridge.exposeInMainWorld('controllers', {
    page: {
        index: () => ipcRenderer.invoke('page.index'),
        show: (id: number | bigint) => ipcRenderer.invoke('page.show', id),
        add: () => ipcRenderer.invoke('page.add'),
        addWidget: (id: number | bigint, widget: Widget) =>
            ipcRenderer.invoke('page.addWidget', id, widget),
        rename: (id: number | bigint) => ipcRenderer.invoke('page.rename', id),
        delete: (id: number | bigint) => ipcRenderer.invoke('page.delete', id),
    },
    widget: {
        edit: (id: number | bigint, data: any) =>
            ipcRenderer.invoke('widget.edit', id, data),
        delete: (id: number | bigint) =>
            ipcRenderer.invoke('widget.delete', id),
    },
});
