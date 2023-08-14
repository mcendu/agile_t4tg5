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
     * Whether the module should be displayed or not.
     */
    grade: Integer;
    /**
     * Modules grades for grade page.
     */
    grades: Integer;
}
