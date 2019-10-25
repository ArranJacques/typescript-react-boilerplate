declare module '*.svg' {
    const content: any;
    export default content;
}

interface Window {
    [key: string]: any
}

// Runtime config from .env file
declare const EXAMPLE: string;
