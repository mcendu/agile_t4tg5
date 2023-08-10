import { expect, it, vi } from 'vitest';
import { ref, computed, Ref } from 'vue';
import FormState from '../js/composables/formstate';

it('constructor', () => {
    const r = ref({ foo: 'bar' });

    expect(r.value.foo).toEqual('bar');

    const f = new FormState(r);
    expect(f.data.foo).toEqual(r.value.foo);
});

it('change form data', () => {
    const setter = vi.fn();
    const r: Ref<{ foo: string }> = computed({
        get: () => Object({ foo: 'bar' }),
        set: setter,
    });
    const f = new FormState(r);

    f.data.foo = 'baz';
    expect(setter).not.toHaveBeenCalled();
    expect(f.data.foo).not.toEqual(r.value.foo);

    f.reset();
    expect(f.data.foo).toEqual(r.value.foo);
});

it('submit', () => {
    const setter = vi.fn();
    const r: Ref<{ foo: string }> = computed({
        get: () => Object({ foo: 'bar' }),
        set: setter,
    });
    const f = new FormState(r);

    f.data.foo = 'baz';
    expect(setter).not.toHaveBeenCalled();
    expect(f.data.foo).not.toEqual(r.value.foo);

    const data = f.data;
    f.save();
    expect(setter).toHaveBeenCalledWith(data);
});
