declare module '*.svg' {
    const content: any;
    export default content;
}

type BemModifiers = string | string[]

interface ClassName {
    className?: string
}

interface LooseObject {
    [key: string]: any
}
