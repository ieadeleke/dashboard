export function cleanString(value: string) {
    return value.replace(/[^\w]/gi, '');
}