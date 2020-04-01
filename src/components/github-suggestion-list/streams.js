/*
  Atomico's implementation of the example from Andre Saltz's article:
  "The introduction to Reactive Programming you've been missing"
  https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
*/
import { of, merge, combineLatest } from 'rxjs'
import {
  map,
  flatMap,
  switchMap,
  catchError,
  startWith,
  tap
} from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'
import { streaming } from './util-streaming'

// streams and triggers
const [refreshClickStream, refreshEmit] = streaming()
const [close1ClickStream, close1Emit] = streaming()
const [close2ClickStream, close2Emit] = streaming()
const [close3ClickStream, close3Emit] = streaming()

// ---'n'---r---r--------------->
const requestStream = refreshClickStream.pipe(
  startWith('startup click'),
  map(
    click =>
      `https://api.github.com/users?since=${Math.floor(Math.random() * 500)}`
  ),
  tap(console.log)
)

// -------R-----R-----R--------->
const responseStream = requestStream.pipe(
  flatMap(url => fromFetch(url)),
  switchMap(res => (res.ok ? res.json() : of(`Error ${res.status}`))),
  catchError(err => of(err.message))
)

// -N--s-----N----s----N-s-->
const createSuggestionStream = closeClickStream => {
  const closeStream = closeClickStream.pipe(startWith('startup click'))

  // emits suggestion from cached response when click 'X' button
  const latestResponseStream = combineLatest(closeStream, responseStream).pipe(
    map(([click, users]) => users[Math.floor(Math.random() * users.length)])
  )

  // emits null suggestion whenver refreshing happen
  const nullRefreshStream = refreshClickStream.pipe(map(() => null))

  // resulted suggestion stream
  return merge(latestResponseStream, nullRefreshStream).pipe(startWith(null))
}

const suggestion1Stream = createSuggestionStream(close1ClickStream)
const suggestion2Stream = createSuggestionStream(close2ClickStream)
const suggestion3Stream = createSuggestionStream(close3ClickStream)

export default [
  { suggestion1Stream, suggestion2Stream, suggestion3Stream },
  { close1Emit, close2Emit, close3Emit, refreshEmit }
]
