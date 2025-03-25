
export function randomHexColor() {
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

export function hslToHex(h: number): string {
    const f = (n: number, k = (n + h / 30) % 12) =>
        Math.round(255 * (1 - Math.max(0, Math.min(k - 3, 9 - k, 1))));
    return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

export function hexToHsl(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const r = parseInt(result![1], 16);
    const g = parseInt(result![2], 16);
    const b = parseInt(result![3], 16);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}