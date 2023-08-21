import { Integer } from '../assets/js/controllers';

/**
 * Represents a computer science module.
 */
export default interface Grade {
    /**
     * The numeric identifier of this module.
     */
    id: bigint;
    /**
     * The name of the module.
     */
    module_id: bigint;
    /**
     * The name of the module.
     */
    type: string;
    /**
     *  grade
     */
    grade: Number;
    /**
     * weight.
     */
    weight: Number;
}
