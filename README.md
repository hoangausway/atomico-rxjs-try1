# atomico-rxjs
### Learning RxJS with Atomico

An example of a "Who to follow" suggestions box built with the Reactive Programming library **RxJS** and **Atomico**

Original article of Andre Saltz:
[The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754#modellin)

### Takeaways
#### Architecture
- Use Atomico web compoenent as a view which presents data, accepts user interactions and triggers appropriate stream events
- State was managed as RxJS stream

#### Functions for reuse

```bash
# Return a pair of stream and it's trigger
import { Subject } from 'rxjs'
export const streaming = () => {
  const stream$ = new Subject()
  const eventEmit = e => eventStream$.next(e)
  return [stream$, eventEmit]
}
```
```bash
# Returns state which is the value emitted by input stream.
# The stream is a Subject which triggered by assoiciated events.
# (state$, initialState) -> state
import { useState, useEffect } from 'atomico'
export const useState$ = (state$, initialState) => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    const sub = state$.subscribe(setState)
    return () => sub.unsubscribe()
  }, [])
  return state
}

```
