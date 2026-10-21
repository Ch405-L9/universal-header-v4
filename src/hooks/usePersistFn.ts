import { useRef } from "react";

// Parameters must be `any` so handlers with specific event types are assignable (function params are contravariant).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PersistFn = (...args: any[]) => any;

/**
 * usePersistFn instead of useCallback to reduce cognitive load
 */
export function usePersistFn<T extends PersistFn>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args) {
      return fnRef.current!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}
