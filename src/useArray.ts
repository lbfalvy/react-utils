import React from "react";

/**
 * Ensures referential equality of an array without changed
 * dependency array length warnings.
 * @param input Array
 * @returns Array but memo'd based on its entries.
 */
export function useArray<T extends unknown[]>(input: T): T {
    const ref = React.useRef<T>(input)
    const cur = ref.current
    if (input.length === cur.length
        && input.every((v, i) => v === cur[i]))
        return cur
    return ref.current = input
}