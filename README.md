# React utils

A set of small utilities for react that I needed at least
twice in the past

## classList

This is an omnipresent function, it appears in one form or another in nearly 
every React project because conditionally applying classes is incredibly
common. This variant can be called with logical expressions and returns a
well-formatted class list composed of those entries that evaluated to a
string or string array.

## useArray

React's dependency arrays have a fixed length, which creates a huge
problem in the perfectly normal case when you need to react to changes in
an array of changing length. useArray simply takes a variable length
array and returns its memo'd version. I explain how this can be used to
unambiguously represent nested arrays or other datastructures
[in this issue at React](https://github.com/facebook/react/issues/18229#issuecomment-781478424)

## useScripts

This hook takes an array of URLs and loads the scripts under those URLs
into the document. The scripts are removed on component unload, but
otherwise never touched on reloads as long as they're present in both
the previous and current version of the array. Returns a promise that
resolves when everything is loaded.

## useChangingHandle

useImperativeHandle, except it returns a function that you can call when
you like, allowing you full control over the ref value.

## mergeRefs

Takes multiple refs, returns a single old-style ref function. Calling this
function updates all refs.

## Bind

Turns an input into an uncontrolled component that updates a particular
entry on an object. Can be used with input events if the `dom` flag is
set, but it uses plain value onChange callbacks by default which is more
common among custom input components.

## usePointer

takes an optional handler that will be called on every mousemove. Returns
a function that can be used to get the last mouse position. The latter
uses a single global handler which is removed when the last hook is
unloaded.

## useWindowDimensions

Returns a tuple containing the current window dimensions. Since this is
unlikely to change a lot, it's easier this way than with the complicated
approach taken by usePointer

## useVariable

Read the value of a `@lbfalvy/mini-events` variable, and automatically rerender when it changes. This is a very small hook, but there are a few gotchas that I got wrong repeatedly in the past which ultimately justified adding it here with a test suite.

# Status

Everything has automatic tests except [usePointer] and
[useWindowDimensions] because I couldn't figure out how to test them.
Help in this regard is appreciated.