import { ref, Ref, toRef, UnwrapRef } from 'vue';
import { cloneDeep } from 'lodash';

export default class FormState<T> {
    #data: Ref<T>;
    #formdata: Ref<T>;

    constructor(data: Ref<T>) {
        this.#data = toRef(data);
        // ref() has a weird return type annotation
        this.#formdata = ref(cloneDeep(data.value)) as Ref<T>;
    }

    get data() {
        return this.#formdata.value;
    }

    reset() {
        this.#formdata.value = cloneDeep(this.#data.value);
    }

    save() {
        this.#data.value = this.#formdata.value;
    }
}
