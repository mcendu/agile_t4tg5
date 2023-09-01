import { it } from 'vitest';
import { mount } from '@vue/test-utils';

import WidgetBase from '../../../vue/widgets/base.vue';

it.concurrent('default edit actions', async ({ expect }) => {
    const w = mount(WidgetBase);
    expect(w.emitted()).not.toHaveProperty('delete');
    expect(w.emitted()).not.toHaveProperty('edit');
    expect(w.get('[data-testlabel=dialog]').attributes()).not.toHaveProperty(
        'open',
    );

    // delete button triggers delete event
    await w.get('[data-testlabel=delete]').trigger('click');
    expect(w.emitted()).toHaveProperty('delete');

    // edit button triggers edit event (for initializing the dialog)
    // and opens edit dialog
    await w.get('[data-testlabel=edit]').trigger('click');
    expect(w.emitted()).toHaveProperty('edit');
    expect(w.get('[data-testlabel=dialog]').attributes()).toHaveProperty(
        'open',
    );
});

it.concurrent('default dialog', async ({ expect }) => {
    const w = mount(WidgetBase);
    expect(w.get('[data-testlabel=dialog]').attributes()).not.toHaveProperty(
        'open',
    );

    // edit button opens edit dialog
    await w.get('[data-testlabel=edit]').trigger('click');
    expect(w.get('[data-testlabel=dialog]').attributes()).toHaveProperty(
        'open',
    );

    // cancel button closes the dialog
    await w.get('[data-testlabel=close]').trigger('click');
    expect(w.get('[data-testlabel=dialog]').attributes()).not.toHaveProperty(
        'open',
    );
});
