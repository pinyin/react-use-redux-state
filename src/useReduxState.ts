import { Store, Action, Dispatch } from 'redux'
import { useEffect, useMemo, useState, InputIdentityList } from 'react'

export function useReduxState<S, A extends Action>(
    store: Store<S, A>,
): [S, Dispatch<A> & Dispatchers<A>] {
    const [state, setState] = useState(store.getState())

    const dispatch = useMemo(() => proxyDispatch(store.dispatch), [store])

    useEffect(() => store.subscribe(() => setState(store.getState())), [store])

    return [state, dispatch]
}

function hasProxySupport(): boolean {
    return typeof Proxy !== 'undefined'
}

function proxyDispatch<A extends Action>(
    dispatch: Dispatch<A>,
): Dispatch<A> & Dispatchers<A> {
    return hasProxySupport()
        ? (new Proxy(dispatch, {
              apply(target: Dispatch<A>, thisArg: any, argArray: any) {
                  return target(argArray[0])
              },
              get(target: Dispatch<A>, p: PropertyKey, receiver: any): any {
                  return (a: WithoutType<A>) => {
                      return target(Object.assign({ type: p }, a) as A)
                  }
              },
          }) as any)
        : (dispatch as any)
}

type Dispatchers<A extends Action> = {
    [type in A['type']]: <Action extends WithoutType<A>>(a: Action) => Action
}

type WithoutType<A extends Action> = { [K in Exclude<keyof A, 'type'>]: A[K] }
