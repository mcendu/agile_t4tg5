import { ref, Ref, toRef } from 'vue';
import { cloneDeep } from 'lodash';

/**
 * Represents the state of a data source backed form.
 */
export default class FormState<T> {
    #data: Ref<T>;
    #formdata: Ref<T>;

    /**
     * Create a form state with associated source data.
     * @param data The source data.
     */
    constructor(data: Ref<T>) {
        this.#data = toRef(data);
        // ref() has a weird return type annotation
        this.#formdata = ref(cloneDeep(this.#data.value)) as Ref<T>;
    }

    /**
     * The form data.
     */
    get data() {
        return this.#formdata.value;
    }

    /**
     * Discard the form data and replace it with the source data.
     */
    reset() {
        this.#formdata.value = cloneDeep(this.#data.value);
    }

    /**
     * Save the form data.
     */
    save() {
        this.#data.value = this.#formdata.value;
    }
}
