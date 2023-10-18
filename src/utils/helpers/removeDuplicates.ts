export function removeModelDuplicates<T>(array: T[], key: keyof T): T[] {
    const uniqueKeys = new Set<T[keyof T]>();
    return array.filter((obj) => {
        const keyValue = obj[key];
        if (!uniqueKeys.has(keyValue)) {
            uniqueKeys.add(keyValue);
            return true;
        }
        return false;
    });
}