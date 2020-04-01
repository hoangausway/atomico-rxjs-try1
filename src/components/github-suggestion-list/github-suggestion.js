import { h, customElement } from 'atomico'
import { useState$ } from './util-useState$'

const UserSuggestion = props => {
  const { suggestionStream, closeEmit } = props
  const suggestion = useState$(suggestionStream, null)
  return (
    <host shadowDom>
      <style>{style(suggestion)}</style>
      <div className='suggestion'>
        <img src={suggestion && suggestion.avatar_url} alt='avatar' />
        <a href={suggestion && suggestion.html_url}>
          {suggestion && suggestion.login}
        </a>
        <button onclick={closeEmit}>X</button>
      </div>
    </host>
  )
}
UserSuggestion.props = {
  suggestionStream: Object,
  closeEmit: Function
}
export default customElement('user-suggestion', UserSuggestion)

const style = suggestion => `
:host {
  width: 100%;
  height: 40px;
}
.suggestion {
  display: ${suggestion ? 'flex' : 'none'};
  justify-content: space-between;
  align-items: center;
  padding: 6px;
  border: solid 1px grey;
}
.suggestion > button {
  height: 20px;
}
img {
  width: 40x;
  height: 40px; 
  border-radius: 10px;
}
`
