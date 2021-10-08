import React from "react";

function setPosition(ev: MouseEvent) {
    position.now = Date.now();
    position.x = ev.clientX;
    position.y = ev.clientY;
}

interface MousePosition {
    x: number
    y: number
    now: number
}

const position = { x: 0, y: 0, now: 0 };
let watchers = 0;

/**
 * Keep track of the mouse pointer, ref style.
 * @returns A function that always returns the corrent mouse position
 */
export function usePointer(handler: (p: MousePosition) => any): () => MousePosition {
    React.useEffect(() => {
        if (watchers++ == 0) window.addEventListener('mousemove', setPosition);
        return () => {
            if (--watchers == 0) window.removeEventListener('mousemove', setPosition);
        };
    }, []);
    React.useEffect(() => {
        if (!handler) return;
        const cb = () => handler({ ...position })
        window.addEventListener('mousemove', cb)
        return () => window.removeEventListener('mousemove', cb)
    }, [handler])
    return () => ({ ...position });
}