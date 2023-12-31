/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { it, vi } from 'vitest';
import { ref, computed, Ref, watch, nextTick } from 'vue';
import FormState from '../../js/composables/formstate';

it('constructor', ({ expect }) => {
    const r = ref({ foo: 'bar' });

    expect(r.value.foo).toEqual('bar');

    const f = new FormState(r);
    expect(f.data.foo).toEqual(r.value.foo);
});

it('change form data', ({ expect }) => {
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

it('submit', ({ expect }) => {
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

it('reactivity', async ({ expect }) => {
    const r = ref({ foo: 'bar' });
    const f = new FormState(r);
    const watchCallback = vi.fn<[unknown, unknown, unknown], void>();
    const watcher = watch(r, watchCallback);

    f.data.foo = 'baz';
    f.save();
    // watchers does not trigger immediately
    await nextTick();
    expect(watchCallback).toHaveBeenCalledOnce();
});
