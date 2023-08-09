import { Ref, toRaw, toRef } from 'vue';

export default class FormState<T> {
    #data: Ref<T>;
    #formdata: T;

    constructor(data: Ref<T>) {
        this.#data = toRef(data);
        this.#formdata = structuredClone(toRaw(data.value));
    }

    get data() {
        return this.#formdata;
    }

    reset() {
        this.#formdata = structuredClone(toRaw(this.#data.value));
    }

    save() {
        this.#data.value = this.#formdata;
    }
}
