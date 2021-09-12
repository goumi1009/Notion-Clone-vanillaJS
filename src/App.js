import SideContainer from './SideContainer.js'
import EditorContainer from './EditorContainer.js'
import { initRouter } from './router.js'
import { request } from './api.js'
import { push } from './router.js'

export default function App({ $target }) {
  this.state = {
    user: {
      name: 'GOUM',
      img: '/src/assets/img-profile-default.svg'
    },
    pages: []
  }

  this.setState = (nextState) => {
    this.state = nextState
    sideConatiner.setState(this.state)
  }

  const sideConatiner = new SideContainer({
    $target,
    initialState: this.state,
    onDeletePage: async (id) => {
      const pageList = await request(`/${id}`, {
        method: 'DELETE'
      })
      await init()
      this.setState({
        ...this.state,
        pageList
      })
      push(`/`)
    },
    onAddPage: (id = null) => {
      addPage('제목없음', id)
    }
  })

  const addPage = async (title, parent) => {
    const pageList = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title,
        parent
      })
    })
    push(`/documents/${pageList.id}`)
    await init()
    this.setState({
      ...this.state,
      pageList
    })
  }

  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      id: null
    }
  })

  const init = async () => {
    const pages = await request('', {
      method: 'GET',
    })
    this.setState({
      ...this.state,
      pages
    })
    console.log(this.state)
  }
  init()

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
