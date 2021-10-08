import React from "react"
import { create, ReactTestRenderer } from "react-test-renderer"
import { useChangingHandle } from "../src"

const Mock = React.forwardRef(({ refValue }: { refValue: string }, ref: React.ForwardedRef<string>) => {
    const handle = useChangingHandle(ref)
    React.useLayoutEffect(() => handle?.(refValue), [handle, refValue])
    return null
})

test('calls function ref', () => {
    const cb = jest.fn()
    create(<Mock ref={cb} refValue='foo' />)
    expect(cb).toHaveBeenCalledWith('foo')
})

test('sets object ref', () => {
    const fakeRef = { current: '' }
    create(<Mock ref={fakeRef} refValue='foo' />)
    expect(fakeRef.current).toBe('foo')
})