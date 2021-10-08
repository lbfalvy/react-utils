import React from "react";

/**
 * useImperativeHandle but it changes when you say so.
 * @param ref Incoming ref object or callback
 * @returns Function to set the ref value
 */
export function useChangingHandle<T>(ref?: React.Ref<T>): null | undefined | ((value: T) => void) {
    return React.useMemo(
        () => typeof ref == 'function' || !ref ? ref
            : value => { (ref as React.MutableRefObject<T>).current = value },
        [ref]
    )
}