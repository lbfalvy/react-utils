/**
 * Decide whether each class gets applied with a simple boolean expression
 * @param classes An array of strings, arrays of strings.
 * @returns A composed class list string
 */
export function classList(...classes: any[]): string {
    return classes.flat().filter(c => typeof c == 'string').join(' ')
}