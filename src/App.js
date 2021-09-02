import SideContainer from './SideContainer.js'
import EditorContainer from './EditorContainer.js'

export default function App({ $target }) {

  const sideConatiner = new SideContainer({ $target })
  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      id: 'new'
    }
  })

  this.route = () => {
    const { pathname } = window.location
    if (pathname === '/') {
      sideConatiner.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/')
      editorContainer.setState({ id })
    }
  }

  this.route()

}
