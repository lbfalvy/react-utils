import React from "react"
import { act, create, ReactTestRenderer } from "react-test-renderer"
import { Bind } from "../src/Bind"

interface MockProps {
    value: any,
    onChange: (v: any) => void,
    input?: any,
    onValue: (v: any) => any
}

function Mock({ value, onChange, input, onValue }: MockProps) {
    React.useLayoutEffect(() => onChange(input), [input])
    React.useLayoutEffect(() => onValue(value), [value])
    return null
}

let object: Partial<Record<string, string|undefined>>
let onValue: jest.Mock<any, any>
let component: ReactTestRenderer
let defaultProps: {
    for: React.ComponentType<any>
    object: any
    index: string
    onValue: () => any
    input: string
}
beforeEach(() => {
    object = {}
    onValue = jest.fn()
    defaultProps = { for: Mock, object, index: 'foo', onValue, input: 'foo' }
    component = create(<Bind {...defaultProps} />)
})

test('Entry is set', () => expect(object['foo']).toBe('foo'))
test('Value is relayed back', () => expect(onValue).toHaveBeenCalledWith('foo'))

test('events are resolved', () => {
    act(() => component.update(<Bind {...defaultProps} dom input={{target:{value:'bar'}}} />))
    expect(object['foo']).toBe('bar')
})

describe('on input change', () => {
    beforeEach(() => {
        act(() => component.update(<Bind {...defaultProps} input='bar' />))
    })
    test('Entry is set', () => expect(object['foo']).toBe('bar'))
    test('Value is relayed back', () => expect(onValue).toHaveBeenCalledWith('bar'))
})

describe('on object change', () => {
    let newObject: typeof object
    beforeEach(() => {
        newObject = {}
        act(() => component.update(<Bind {...defaultProps} object={newObject} />))
    })
    test('Entry is set', () => expect(newObject['foo']).toBe('foo'))
})

describe('on index change', () => {
    beforeEach(() => {
        act(() => component.update(<Bind {...defaultProps} index='bar' />))
    })
    test('Entry is set', () => expect(object['bar']).toBe('foo'))
})