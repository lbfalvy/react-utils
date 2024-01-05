import { Variable } from "@lbfalvy/mini-events";
import React from "react";

/** Use the value of a variable (from `mini-events`) in a React component */
export function useVariable<T>(v: Variable<T>): T {
  const [value, setValue] = React.useState(() => v.get());
  React.useLayoutEffect(() => {
    setValue(() => v.get());
    return v.changed(val => setValue(() => val), true)
  }, [v]);
  return value;
}