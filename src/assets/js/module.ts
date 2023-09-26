/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { InjectionKey, Ref } from 'vue';
import Grade from '../../models/grade';
import TotalGrade from '../../models/totalGrade';

export default class Module {
    /**
     * The in-database identifier of the Module.
     */
    id: bigint;
    /**
     * The name of the module.
     */
    name: string;
    /**
     * Modules code.
     */
    code: string;
    /**
     * Module shown or not.
     */
    enabled: boolean;
    /**
     * Grade data for the module.
     */
    grades?: Grade[];
    /**
     * Total grade data for the module.
     */
    total?: TotalGrade;

    constructor(
        id: bigint,
        name: string,
        code: string,
        enabled: boolean,
        grades: any,
        total: any,
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.enabled = enabled;
        this.grades = grades;
        this.total = total;
    }
}

export const enabledModulesKey: InjectionKey<Ref<Module[]>> = Symbol();
