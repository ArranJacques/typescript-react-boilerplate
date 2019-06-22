declare module '*.svg' {
    const content: any;
    export default content;
}

interface Window {
    __PRELOADED_STATE__: {};
}

type BemModifiers = string | string[]

interface ClassName {
    className?: string
}

interface LooseObject {
    [key: string]: any
}
