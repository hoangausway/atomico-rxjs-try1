/*
  Utility function
  Returns state which is value emitted by stream.
  The stream, in it's turn, is a Subject which triggered by assoiciated events.
  (state$, initialState) -> state
*/
import { useState, useEffect } from 'atomico'

export const useState$ = (state$, initialState) => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    const sub = state$.subscribe(setState)
    return () => sub.unsubscribe()
  }, [])
  return state
}
