const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function randomString(length: number = 10, chars?: string): string {

    let str = '';
    const c = chars || charSet;

    for (let i = 0; i < length; i++) {
        str += c.charAt(Math.floor(Math.random() * c.length));
    }

    return str;
}
