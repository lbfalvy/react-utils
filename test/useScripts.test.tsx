import { timeout, XPromise } from '@lbfalvy/when'
import { JSDOM, DOMWindow } from 'jsdom'
import React from 'react'
import { create, ReactTestRenderer } from 'react-test-renderer'
import { SettledResult, useScripts } from '../src/useScripts'

function Mock({ s, cb }: { s: string[], cb: (p: XPromise<SettledResult[]>) => any }) {
    const p = useScripts(s)
    React.useLayoutEffect(() => cb(p), [cb, p])
    return null
}

let dom: JSDOM
let document: DOMWindow['document']
let cb: jest.Mock<void, [XPromise<SettledResult[]>]>
let component: ReactTestRenderer

beforeEach(() => {
    dom = new JSDOM()
    // @ts-expect-error
    global.window = dom.window
    global.document = document = dom.window.document
    cb = jest.fn()
    component = create(<Mock s={['a', 'b']} cb={cb} />)
})

test('creates and populates script div', () => {
    const scripts = document.getElementById('scripts')
    expect(scripts?.outerHTML).toMatchSnapshot()
})

test('removes script', () => {
    component.update(<Mock s={['a']} cb={cb} />)
})

test('inserts new script without touching later one', () => {
    const b = document.querySelector('[src="b"]')
    expect(b).not.toBeNull()
    component.update(<Mock s={['a', 'c', 'b']} cb={cb} />)
    expect(document.getElementById('scripts')?.outerHTML).toMatchSnapshot()
    expect(document.querySelector('[src="b"]')).toBe(b)
})

test('calls callback when every script settled', async () => {
    const promise: XPromise<any> = cb.mock.calls[0][0]
    promise.execute()
    expect(promise.status).toBe('pending')
    document.querySelector('[src="a"]')?.dispatchEvent(new dom.window.CustomEvent('error'))
    expect(promise.status).toBe('pending')
    document.querySelector('[src="b"]')?.dispatchEvent(new dom.window.CustomEvent('load'))
    await timeout(0)
    expect(promise.value).toHaveLength(2)
    expect(promise.value).toContainEqual({ status: 'fulfilled', value: 'b' })
    expect(promise.value).toContainEqual({ status: 'rejected', reason: 'a' })
})