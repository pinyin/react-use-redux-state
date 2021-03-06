# react-use-redux-state

[![Build Status](https://travis-ci.com/pinyin/react-use-redux-state.svg?branch=master)](https://travis-ci.com/pinyin/react-use-redux-state)

Use a Redux store.

## Install

```
npm install --save react-use-redux-state
```

## Usage

The hook works in a way like `useState`, but for Redux.

```js
import {createStore} from 'redux'
import {useReduxState} from 'react-use-redux-state'

const store = createStore(
    (state, action) => {
        const prevState = state || 0
        switch (action.type) {
            case 'inc':
                return prevState + action.value
            default:
                return prevState
        }
    },
)

const ReduxComponent = () => {
    const [state, dispatch] = useReduxState(store)
    return (
        <p
            onClick={() => dispatch({ type: 'inc', value: 1 })}
            onMouseMove={() => dispatch.inc({ value: 2 })}
        >
            {state}
        </p>
    )
}

<ReduxComponent />
```

[Play in browser](https://stackblitz.com/edit/react-use-redux-state)

`ReduxComponent` would render 0 in the beginning. Its value would increase 1 after each click, increase 2 after each mouse move.

To make an in-component Redux store, use this hook along with `useRef` or `useMemo`.

Notice you may pass action type as method name in environments with `Proxy` support. TypeScript support is also included.

## Limits

Due to the flexibility of hooks, some logic like extracting component state from Redux state is designed to be left to you.

You may want to write code like:

```js

const Component = props => {
    const store = useContext(StoreContext)
    const [appState, dispatch] = useReduxStore(store)
    const state = useMemo(()=> {/* compute & return component state from redux state */, [appState, props])}

    return /* use the variable `state` here */
}

```

Where `StoreContext` is your context, created by something like `React.createContext(store)`. Or you can just import a global store instance like the example above.

## Other Solutions

-   [`redux-react-hook`](https://github.com/facebookincubator/redux-react-hook)
-   [`use-substate`](https://github.com/philipp-spiess/use-substate)
-   [`react-use-redux`](https://github.com/martynaskadisa/react-use-redux)
-   [`react-use-dux`](https://github.com/richardpj/react-use-dux)

## License

MIT
