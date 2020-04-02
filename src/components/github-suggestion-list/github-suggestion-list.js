import { h, customElement } from 'atomico'
import streamsEmitters from './streams-emitters'
import './github-suggestion'

const GithubSuggestionList = props => {
  const [streams, emitters] = streamsEmitters

  return (
    <host shadowDom>
      <style>{style()}</style>
      <header>
        <div>Who to follow</div>
        <div>
          <button onclick={emitters.refreshEmit}>Refresh</button>
          <button>View all</button>
        </div>
      </header>
      <main>
        <user-suggestion
          suggestionStream={streams.suggestion1Stream}
          closeEmit={emitters.close1Emit}
        />
        <user-suggestion
          suggestionStream={streams.suggestion2Stream}
          closeEmit={emitters.close2Emit}
        />
        <user-suggestion
          suggestionStream={streams.suggestion3Stream}
          closeEmit={emitters.close3Emit}
        />
      </main>
    </host>
  )
}
GithubSuggestionList.props = {}

export default customElement('github-suggestion-list', GithubSuggestionList)

// Helpers CSS
const style = () => `
:host {
  width: 100%;
  height: 100vh;
}
header {
  display: flex;
  justify-content: space-between;
  padding: 6px;
}

header > div > button {
  margin-left: 6px;
}
`
