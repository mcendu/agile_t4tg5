/*
 * Copyright (C) 2023 Goldsmiths, University of London.
 * All rights reserved.
 */

import { it } from 'vitest';
import { mount } from '@vue/test-utils';

import Page from '../../../js/page';
import EditPage from '../../../vue/pagelist/edit.vue';
import { nextTick } from 'vue';

it('presentation', ({ expect }) => {
    const page = new Page(0n, 'New Page');
    const form = mount(EditPage, {
        props: {
            page,
        },
    });

    expect(form.get('[data-testlabel=heading]').text()).toContain(
        'Editing New Page',
    );

    page.name = '';
    expect(form.get('[data-testlabel=heading]').text()).toContain('Editing ');
});

it('open and close', async ({ expect }) => {
    const page = new Page(0n, 'My Page');
    const form = mount(EditPage, {
        props: {
            page,
        },
    });

    form.vm.showModal();
    expect(form.attributes()).toHaveProperty('open');

    // initial value of input element
    expect(
        form.get<HTMLInputElement>('[data-testlabel=name]').element.value,
    ).toContain('My Page');

    // reopening resets the input
    await form.get('[data-testlabel=name]').setValue('Foo');
    expect(
        form.get<HTMLInputElement>('[data-testlabel=name]').element.value,
    ).toContain('Foo');

    await form.get('[data-testlabel=cancel]').trigger('click');
    expect(form.attributes()).not.toHaveProperty('open');
    form.vm.showModal();
    await nextTick();
    expect(
        form.get<HTMLInputElement>('[data-testlabel=name]').element.value,
    ).toContain('My Page');
});

it.concurrent('form submission', async ({ expect }) => {
    const page = new Page(0n, 'New Page');
    const form = mount(EditPage, {
        props: {
            page: undefined,
            onSubmit: (page, name) => (page.name = name),
        },
    });
    form.vm.showModal();

    // lack of active page blocks saving
    await form.get('[data-testlabel=save]').trigger('click');
    expect(form.emitted()).not.toHaveProperty('submit');

    await form.setProps({ page });

    // empty input should not be submitted
    await form.get('[data-testlabel=name]').setValue('');
    await form.get('[data-testlabel=save]').trigger('click');
    expect(form.emitted()).not.toHaveProperty('submit');

    // any other input should submit fine
    await form.get('[data-testlabel=name]').setValue('Foo');
    await form.get('[data-testlabel=save]').trigger('click');
    expect(form.emitted()).toHaveProperty('submit');
    expect(page.name).toBe('Foo');
});
