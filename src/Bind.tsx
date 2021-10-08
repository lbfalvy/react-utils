import React, { SyntheticEvent } from "react";

type Props<T, Key extends keyof T, U> = Omit<U, 'value' | 'onChange'> & { 
    object: T
    index: Key
    for: React.ComponentType<{ 
        value?: any,
        onChange?: ((value: any) => any) | undefined
    } & U>
    dom?: boolean
}

/**
 * Link an input or other component to an entry on an object. The input
 * will own the entry, and capping or setting the value on the receiving
 * end will not be possible.
 */
export function Bind<T, K extends keyof T, U>(props: Props<T, K, U>): React.ReactElement {
    const {for: Component, object, index, dom, ...restProps} = props;
    const [value, setValue] = React.useState(object[index]);
    React.useLayoutEffect(() => { object[index] = value; }, [object, index, value]);
    return <Component value={value} onChange={(ev: any) => {
        if (!dom) return setValue(ev)
        setValue(ev.target?.value)
    }} {...restProps as unknown as U} />;
}