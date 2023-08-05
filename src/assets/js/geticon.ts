import _ from 'lodash';

export interface FaviconOptions {
    /**
     * The preferred icon resolution.
     */
    resolution?: number;
    /**
     * Whether to fallback to favicon.ico.
     */
    useFaviconIco?: boolean;
}

const domParser = new DOMParser();

function parseSize(size: string) {
    const match = /^(\d+)[xX](\d+)$/.exec(size);
    if (match === null) return { width: NaN, height: NaN };
    return { width: Number(match[1]), height: Number(match[2]) };
}

/**
 * Score an image's usability as an icon.
 * @param size The size of an image as specified in the sizes attribute.
 * @param preferred The preferred resolution.
 */
function scoreIcon(size: string, preferred: number) {
    const s = parseSize(size);
    const l = Math.max(s.width, s.height);
    const a = s.width / s.height;
    const result = Math.abs(l - preferred) * (1 / a + a);
    return result;
}

async function getIcon(
    url: string | URL,
    options?: FaviconOptions,
): Promise<URL | undefined> {
    const u = new URL(url);
    const res = options?.resolution ?? 16;
    const fallback = options?.useFaviconIco ?? true;

    // get the HTML or image, throwing on network error
    const htmlres = await fetch(url, {
        referrerPolicy: 'no-referrer',
        headers: {
            Accept: 'text/html, application/xhtml+xml, image/*;q=0.9',
        },
    });
    const contentType = htmlres.headers.get('Content-Type');

    // reject unknown Content-Type
    if (contentType === null) return undefined;
    // directly return any images
    if (/^image\//.test(contentType)) return u;

    // parse the document for favicon location
    const html = domParser.parseFromString(await htmlres.text(), 'text/html');
    const icons = html
        .getElementsByTagName('head')[0]
        .querySelectorAll<HTMLLinkElement>('link[rel~=icon]');

    // score each icon and use one with lowest score
    const scores = Array.from(icons).map((e) => {
        const result = {
            element: e,
            score: Number.MAX_VALUE,
        };
        const sizes = e.getAttribute('sizes')?.split(' ');
        if (!sizes || sizes.length === 0) {
            // treat as fallback
            return result;
        } else {
            let score: number = Number.MAX_VALUE;
            for (const s of sizes) {
                const itemScore = scoreIcon(s, res);
                score = Math.min(score, itemScore);
            }
            result.score = score;
        }
        return result;
    });
    const best = _.minBy(scores, (e) => e.score);
    if (best !== undefined) return new URL(best.element.href, u);

    // fallback to favicon.ico
    if (!fallback) return undefined;
    return new URL('/favicon.ico', u);
}

export default getIcon;
