import React from "react";
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { useArray } from "../src";

function Mock({ v, cb }: { v: any[], cb: () => void }) {
    v = useArray(v)
    React.useEffect(cb, [v])
    return null
}

let cb: jest.Mock<void, any>
let component: ReactTestRenderer
beforeEach(() => {
    cb = jest.fn()
    component = create(<Mock v={[1, 2]} cb={cb} />)
})

test('reloads on change', () => {
    act(() => component.update(<Mock v={[1, 3]} cb={cb} />))
    expect(cb).toHaveBeenCalledTimes(2)
})

test('does not reload when only the instance changes', () => {
    act(() => component.update(<Mock v={[1, 2]} cb={cb} />))
    expect(cb).toHaveBeenCalledTimes(1)
})

test('reloads with shorter array', () => {
    act(() => component.update(<Mock v={[1]} cb={cb} />))
    expect(cb).toHaveBeenCalledTimes(2)
})

test('reloads with longer array', () => {
    act(() => component.update(<Mock v={[1, 2, 3]} cb={cb} />))
    expect(cb).toHaveBeenCalledTimes(2)
})

test('reloads on changing back', () => {
    act(() => component.update(<Mock v={[1, 3]} cb={cb} />))
    act(() => component.update(<Mock v={[1, 2]} cb={cb} />))
    expect(cb).toHaveBeenCalledTimes(3)
})