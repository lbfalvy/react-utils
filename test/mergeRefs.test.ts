import { mergeRefs } from "../src"

test('Appropriately updates a function and an object too', () => {
    const fakeRef = { current: null }
    const fakeFnRef = jest.fn()
    const merge = mergeRefs(fakeRef, fakeFnRef)
    expect(merge).not.toBeNull()
    if (typeof merge == 'function') merge('foo')
    // @ts-expect-error
    else merge.current = 'foo'
    expect(fakeRef.current).toBe('foo')
    expect(fakeFnRef).toHaveBeenCalledWith('foo')
})