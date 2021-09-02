import SideContainer from './SideContainer.js'
import EditorContainer from './EditorContainer.js'

export default function App({ $target }) {

  new SideContainer({ $target })
  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      id: 'new'
    }
  })

  editorContainer.setState({
    id: 3874
  })

}
