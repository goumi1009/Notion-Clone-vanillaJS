import SideContainer from './SideContainer.js'
import EditorContainer from './EditorContainer.js'
import { initRouter } from './router.js'

export default function App({ $target }) {

  const sideConatiner = new SideContainer({ $target })
  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      id: null
    }
  })

  this.route = () => {
    const { pathname } = window.location
    if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/')
      editorContainer.setState({ id })
    }
  }

  this.route()

  initRouter(() => this.route())
}
