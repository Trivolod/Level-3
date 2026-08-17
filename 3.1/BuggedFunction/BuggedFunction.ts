interface A {
    [key: string]: {
        cvalue?: string | number | A;
    } | undefined;
}

function summ(a?: A): number {
    if (!a || typeof a !== 'object') return 2022;

    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === 'undefined' || !elem) return 2022;

        const val = elem.cvalue;
        if (typeof val === 'undefined') return 2022;

        if (typeof val === 'number') {
            return isNaN(val) ? 2022 : val;
        }

        if (typeof val === 'string') {
            const parsed = Number(val);
            return val.trim() !== '' && !isNaN(parsed) ? parsed : 2022;
        }

        if (typeof val === 'object' && val !== null) {
            return summ(val);
        }

        return 2022;
    });

    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }

    return sum;
}