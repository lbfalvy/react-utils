import React from "react";

/**
 * Get the window dimensions in pixels whenever it changes.
 * @returns Size of the window in pixels
 */
export function useWindowDimensions(): [number, number] {
    const [width, setWidth] = React.useState(0);
    const [height, setHeight] = React.useState(0);
    const recalculate = React.useCallback(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, []);
    React.useLayoutEffect(() => {
        recalculate();
        window.addEventListener('resize', recalculate);
        return () => window.removeEventListener('resize', recalculate);
    }, [recalculate]);
    return [width, height];
}