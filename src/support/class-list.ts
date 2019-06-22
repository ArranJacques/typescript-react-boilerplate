type ClassFunction = () => string | string[];
export type Classes = string | string[] | ClassFunction;
export type ClassList = string[]

export function cl(...classes: Classes[]): ClassList {
    let list: string[] = [];
    classes.forEach(c => {
        const cla = typeof c === 'function' ? c() : c;
        list = list.concat(Array.isArray(cla) ? cla : [cla]);
    });
    return list;
}

export function clPush(list: ClassList, classes: Classes, condition?: any): ClassList {

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

export function clPrint(list: ClassList): string {
    return list.join(' ');
}

export function clApplyBemModifiers(classList: ClassList, base: string, modifiers: BemModifiers): ClassList {
    const mods = Array.isArray(modifiers) ? modifiers : [modifiers];
    return clPush(classList, mods.map(m => base + '--' + m));
}
