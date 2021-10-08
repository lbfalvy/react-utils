type Writable<T> = { -readonly [P in keyof T]: T[P] };

function upCastRef<T, U extends T>(ref: React.Ref<T>): (u: U | null) => void {
    return (u: U | null) => {
        if (typeof ref === 'function') {
            ref(u);
        } else if (ref) {
            const writableRef = ref as Writable<React.RefObject<T>>;
            writableRef.current = u;
        }
    };
}

/**
 * Make all provided refs follow the value of the returned ref
 * @param refs tracking refs
 * @returns master ref
 */
export function mergeRefs<T, U extends T>(...refs: React.Ref<T>[]): React.Ref<U> {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return upCastRef<T, U>(filteredRefs[0]);
    const upcasts: ((u: U | null) => void)[] = refs.map(upCastRef);
    return inst => {
        for (const ref of upcasts) ref(inst); 
    };
};