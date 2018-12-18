# react-use-redux-state

Use a Redux store.

## Install

```
npm install --save redux-use-redux-state
```

## Usage

The hook work in a way like `useState`, but for Redux.

```js
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
            onFocus={() => dispatch.inc({ value: 2 })}
        >
            {state}
        </p>
    )
}

<ReduxComponent />
```

`ReduxComponent` would render 0 in the beginning. Its value would increase 1 after each click, increase 2 after each focus.

To make an in-component Redux store, use this hook along with `useRef` or `useMemo`.

Notice you may pass action type as method name on environments with `Proxy` support.

## License

MIT
