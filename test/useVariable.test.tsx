import { Emit, Variable, variable } from "@lbfalvy/mini-events";
import { useVariable } from "../src/useVariable";
import React from "react";
import { ReactTestRenderer, act, create } from "react-test-renderer";

function Mock<T>({ v }: { v: Variable<T> }) {
  cb(useVariable(v));
  return null;
}

let setV: Emit<[string]>;
let v: Variable<string>;
let cb: jest.Mock<string, any>;
let component: ReactTestRenderer;
beforeEach(() => {
  [setV, v] = variable<string>("foo");
  cb = jest.fn();
  component = create(<Mock v={v} />);
})

test("reads the correct text", () => {
  expect(cb).toHaveBeenCalledWith("foo");
})

test("Responds to updates", async () => {
  await act(() => setV("bar"));
  expect(cb).toHaveBeenLastCalledWith("bar");
})

test("Responds to changes to the variable", async () => {
  const [setU, u] = variable("bar");
  await act(() => component.update(<Mock v={u}/>));
  expect(cb).toHaveBeenLastCalledWith("bar");
  await act(() => setU("sample"));
  expect(cb).toHaveBeenLastCalledWith("sample");
  await act(() => setV("quiver"));
  expect(cb).toHaveBeenLastCalledWith("sample");
})

test("Can handle functions",async  () => {
  const arg = () => {};
  const [setV, v] = variable<() => void>(arg);
  const component = create(<Mock v={v} />);
  expect(cb).toHaveBeenLastCalledWith(arg);
  const arg2 = () => {};
  await act(() => setV(arg2));
  expect(cb).toHaveBeenLastCalledWith(arg2);
})
