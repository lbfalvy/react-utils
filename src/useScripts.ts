import React from "react";
import { flat, allSettled, XPromise, resolve } from '@lbfalvy/when'
import { useArray } from "./useArray";

export type SettledResult =
    | { status: 'fulfilled', value: string }
    | { status: 'rejected', reason: string }
    | { status: 'cancelled' }

export function useScripts(source: string[]): XPromise<SettledResult[]> {
    const scripts = React.useRef<HTMLScriptElement[]>([]);
    source = useArray(source)
    React.useEffect(() => () => {
        for (const script of scripts.current) script.remove();
    }, [])
    return React.useMemo(() => {
        for (const script of scripts.current) if (!source.includes(script.src)) script.remove();
        const newScripts: HTMLScriptElement[] = [];
        if (0 < source.length) {
            const onloads: XPromise<string>[] = [];
            const parent = document.getElementById('scripts') ?? document.createElement('div');
            parent.id = 'scripts';
            parent.style.display = 'none';
            // New scripts
            for (const url of source) if (!scripts.current.find(el => el.src == url)) {
                const script = document.createElement('script');
                script.src = url;
                const [promise, resolve, reject] = flat<string>();
                script.onload = () => resolve(url);
                script.onerror = () => reject(url);
                parent.appendChild(script);
                newScripts.push(script);
                onloads.push(promise);
            }
            if (!parent.parentElement) document.body.appendChild(parent);
            scripts.current = newScripts;
            return allSettled(onloads);
        } else {
            scripts.current = [];
            const elem = document.getElementById('scripts')
            if (elem?.childNodes.length == 0) elem.remove();
            return resolve<[]>([]);
        }
    }, [source]);
}