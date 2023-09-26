/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

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
        indexEnabled: () => ipcRenderer.invoke('module.indexEnabled'),
        toggle: (id: unknown, enabled: unknown) =>
            ipcRenderer.invoke('module.toggle', id, enabled),
    },
    grade: {
        getGrades: (id: unknown) => ipcRenderer.invoke('grade.getGrades', id),
        addGrade: (
            id: unknown,
            session: unknown,
            grade: unknown,
            weight: unknown,
        ) => ipcRenderer.invoke('grade.addGrade', id, session, grade, weight),
        editGrade: (
            id: unknown,
            session: unknown,
            grade: unknown,
            weight: unknown,
        ) => ipcRenderer.invoke('grade.editGrade', id, session, grade, weight),
        deleteGrade: (id: unknown) =>
            ipcRenderer.invoke('grade.deleteGrade', id),
    },
});
