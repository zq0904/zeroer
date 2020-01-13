import { useEffect, useRef, useState, EffectCallback, Dispatch } from 'react'

export const useDidMount = (fn: () => any) => {
  useEffect(() => {
    fn()
  }, [])
}

export const useDidUpdate = (fn: () => any, deps: ReadonlyArray<any>) => {
  let flag = useRef(false)
  useEffect(() => {
    flag.current ? fn() : flag.current = true
  }, deps)
}

export const useWillMount = (fn: ReturnType<EffectCallback>) => {
  useEffect(() => fn, [])
}

type SetStateFn<S> = (prevState: S) => Partial<S>;
type SetState<S> = Partial<S> | SetStateFn<S>;

export const useMergeState = <S>(initial: S | (() => S)): [S, Dispatch<SetState<S>>] => {
  const [state, setState] = useState(initial)
  const set = (arg: SetState<S>) => {
    if (typeof arg === 'function') {
      const fn = arg as SetStateFn<S>
      setState(prevState => ({ ...prevState, ...fn(prevState) }))
    } else {
      setState(prevState => ({ ...prevState, ...arg }))
    }
  }
  return [state, set]
}
