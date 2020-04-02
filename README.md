# atomico-rxjs-try1
Manage state with RxJS in Atomico

### Subjects
- Web component, Atomico, RxJS
- Implement the example "Who to follow" suggestions box following the original article of Andre Saltz: [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754#modellin)

### Takeaways
#### State management with RxJS
- Use Atomico web compoenent as a view which presents data, accepts user interactions and triggers appropriate stream events
- State was managed as RxJS stream

#### Functions for reuse

```bash
# Return a pair of stream and it's trigger
import { Subject } from 'rxjs'
export const streaming = () => {
  const stream$ = new Subject()
  const eventEmit = e => stream$.next(e)
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
```bash
# Emits event
# github-suggestion-list.js
...
<button onclick={emitters.refreshEmit}>Refresh</button>
...

# github-suggestion.js
...
<button onclick={closeEmit}>X</button>
```
