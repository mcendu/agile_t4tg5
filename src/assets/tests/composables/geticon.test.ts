import { beforeAll, afterAll, afterEach, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import getIcon from '../../js/geticon';

const handlers = Object.freeze([
    rest.get('https://example.com/', (req, res, ctx) => {
        return res(
            ctx.set('Content-Type', 'text/html; charset=UTF-8'),
            ctx.body(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <link rel="icon" href="/favicon.png" />
                    </head>
                </html>`),
        );
    }),
    rest.get('https://example.com/multisize', (req, res, ctx) => {
        return res(
            ctx.set('Content-Type', 'text/html; charset=UTF-8'),
            ctx.body(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <link rel="icon" sizes="16x16" href="/favicon16.png" />
                        <link rel="icon" sizes="32x32" href="/favicon32.png" />
                        <link rel="icon" sizes="64x64" href="/favicon64.png" />
                    </head>
                </html>`),
        );
    }),
    rest.get('https://example.com/multisize-ico', (req, res, ctx) => {
        return res(
            ctx.set('Content-Type', 'text/html; charset=UTF-8'),
            ctx.body(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                        <link rel="icon"
                            sizes="16x16 64x64"
                            href="/favicon.ico"
                        />
                        <link rel="icon" sizes="32x32" href="/favicon32.png" />
                    </head>
                </html>`),
        );
    }),
    rest.get('https://example.com/fallback', (req, res, ctx) => {
        return res(
            ctx.set('Content-Type', 'text/html; charset=UTF-8'),
            ctx.body(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="UTF-8" />
                    </head>
                </html>`),
        );
    }),
]);

const srv = setupServer(...handlers);

beforeAll(() => {
    srv.listen({
        onUnhandledRequest: 'error',
    });
});

it('<link rel="icon">', async () => {
    const url = await getIcon('https://example.com/');
    expect(url?.pathname).toEqual('/favicon.png');
});

it('<link rel="icon" sizes="{single entry}">', async () => {
    // default to 16px
    const url = await getIcon('https://example.com/multisize');
    expect(url?.pathname).toEqual('/favicon16.png');

    // exact values specified
    const url16 = await getIcon('https://example.com/multisize', {
        resolution: 16,
    });
    expect(url16?.pathname).toEqual('/favicon16.png');
    const url32 = await getIcon('https://example.com/multisize', {
        resolution: 32,
    });
    expect(url32?.pathname).toEqual('/favicon32.png');
    const url64 = await getIcon('https://example.com/multisize', {
        resolution: 64,
    });
    expect(url64?.pathname).toEqual('/favicon64.png');

    // no exact value
    const url56 = await getIcon('https://example.com/multisize', {
        resolution: 56,
    });
    expect(url56?.pathname).toEqual('/favicon64.png');
});

it('<link rel="icon" sizes="{multiple entries}">', async () => {
    const url16 = await getIcon('https://example.com/multisize-ico', {
        resolution: 16,
    });
    expect(url16?.pathname).toEqual('/favicon.ico');

    const url32 = await getIcon('https://example.com/multisize-ico', {
        resolution: 32,
    });
    expect(url32?.pathname).toEqual('/favicon32.png');

    const url64 = await getIcon('https://example.com/multisize-ico', {
        resolution: 64,
    });
    expect(url64?.pathname).toEqual('/favicon.ico');
});

it('favicon.ico', async () => {
    const url = await getIcon('https://example.com/fallback');
    expect(url?.pathname).toEqual('/favicon.ico');

    const urlNoFallback = await getIcon('https://example.com/fallback', {
        useFaviconIco: false,
    });
    expect(urlNoFallback).toBeUndefined();
});

afterEach(() => {
    srv.resetHandlers();
});

afterAll(() => {
    srv.close();
});
