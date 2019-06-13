type ClassFunction = () => string | Array<string>;
export type Classes = string | Array<string> | ClassFunction;

export function cl(...classes: Classes[]): string[] {
    let list: string[] = [];
    classes.forEach(c => {
        const cla = typeof c === 'function' ? c() : c;
        list = list.concat(Array.isArray(cla) ? cla : [cla]);
    });
    return list;
}

export function clPush(list: string[], classes: Classes, condition?: any): string[] {

    const con = arguments.length === 2 ? true : condition;

    const addToList = (c: Classes) => {
        const cl = typeof c === 'function' ? c() : c;
        return list.concat(Array.isArray(cl) ? cl : [cl]);
    };

    if (typeof con === 'function') {
        if (con()) {
            return addToList(classes);
        }
    } else if (con) {
        return addToList(classes);
    }

    return list;
}

export function clPrint(list: string[]): string {
    return list.join(' ');
}
