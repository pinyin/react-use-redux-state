import { create } from 'react-test-renderer'
import * as React from 'react'
import { useReduxState } from './useReduxState'
import { createStore } from 'redux'

describe(`${useReduxState.name}`, () => {
    const store = createStore(
        (state: number | undefined, action: { type: 'inc'; value: number }) => {
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

    it(`should emit default value`, () => {
        const renderer = create(<ReduxComponent />)
        expect(renderer.root.findAllByType('p')[0].children[0]).toEqual('0')
    })

    it(`should update returned value with redux state`, async () => {
        const renderer = create(<ReduxComponent />)
        await new Promise(resolve => setTimeout(resolve, 100))
        renderer.root.findAllByType('p')[0].props['onClick']()
        expect(renderer.root.findAllByType('p')[0].children[0]).toEqual('1')
    })

    it(`should support short dispatch syntax when Proxy is available`, async () => {
        const renderer = create(<ReduxComponent />)
        await new Promise(resolve => setTimeout(resolve, 100))
        renderer.root.findAllByType('p')[0].props['onFocus']()
        expect(renderer.root.findAllByType('p')[0].children[0]).toEqual('3')
    })

    // todo: test unsubscribe & resubscribe
})
