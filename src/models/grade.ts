/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { Integer } from '../assets/js/controllers';

/**
 * Represents a computer science module grade.
 */
export default interface Grade {
    /**
     * The numeric identifier of this grade.
     */
    id: bigint;
    /**
     * The module id this grade is associated to.
     */
    module_id: bigint;
    /**
     * The type of grade. eg. midterm.
     */
    type: string;
    /**
     *  Grade score.
     */
    grade: number;
    /**
     *  Weight of the score.
     */
    weight: number;
}
