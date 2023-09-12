import { it } from 'vitest';
import { mount } from '@vue/test-utils';

import Page from '../../../js/page';
import PageTab from '../../../vue/pagelist/pagetab.vue';

it('basic', ({ expect }) => {
    const pagename = 'Test page';
    const tab = mount(PageTab, {
        props: {
            page: new Page(0n, pagename),
        },
    });

    expect(tab.classes('sa-pagetab')).toBe(true);
    expect(tab.find('[data-testlabel=name]').text()).toContain(pagename);
});

it.concurrent('select', async ({ expect }) => {
    const tab = mount(PageTab, {
        props: {
            page: new Page(0n, 'Test page'),
        },
    });

    expect(tab.classes('sa-pagetab--current')).toBe(false);

    // clicking emits select event
    expect(tab.emitted()).not.toHaveProperty('select');
    await tab.get('[data-testlabel=name]').trigger('click');
    expect(tab.emitted()).toHaveProperty('select');

    // select the tab
    await tab.setProps({
        selected: true,
    });
    expect(tab.classes('sa-pagetab--current')).toBe(true);

    // if already selected, click should not have any effect
    await tab.get('[data-testlabel=name]').trigger('click');
    expect(tab.emitted('select')).toHaveLength(1);
});

it.concurrent('actions', async ({ expect }) => {
    const tab = mount(PageTab, {
        props: {
            page: new Page(0n, 'Test page'),
            editable: false,
        },
    });

    // non-editable tabs have no edit controls
    expect(tab.find('[data-testlabel=edit]').exists()).toBe(false);
    expect(tab.find('[data-testlabel=delete]').exists()).toBe(false);

    // make tab editable
    await tab.setProps({
        editable: true,
    });

    // now edit controls should exist
    expect(tab.find('[data-testlabel=edit]').exists()).toBe(true);
    expect(tab.find('[data-testlabel=delete]').exists()).toBe(true);

    await tab.setProps({
        selected: true,
    });

    // clicking edit controls triggers appropriate events
    expect(tab.emitted()).not.toHaveProperty('edit');
    await tab.get('[data-testlabel=edit]').trigger('click');
    expect(tab.emitted()).toHaveProperty('edit');

    expect(tab.emitted()).not.toHaveProperty('delete');
    await tab.get('[data-testlabel=delete]').trigger('click');
    expect(tab.emitted()).toHaveProperty('delete');
});
