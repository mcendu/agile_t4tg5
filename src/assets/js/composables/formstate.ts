import { Ref, toRef } from 'vue';
import { cloneDeep } from 'lodash';

export default class FormState<T> {
    #data: Ref<T>;
    #formdata: T;

    constructor(data: Ref<T>) {
        this.#data = toRef(data);
        this.#formdata = cloneDeep(data.value);
    }

    get data() {
        return this.#formdata;
    }

    reset() {
        this.#formdata = cloneDeep(this.#data.value);
    }

    save() {
        this.#data.value = this.#formdata;
    }
}
