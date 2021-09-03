import { request } from './api.js'
import ListHeader from './ListHeader.js'
import PageList from './PageList.js'

export default function SideContainer({ $target }) {
  const $sideContainer = document.createElement('div')
  $sideContainer.classList.add('side-container')
  $target.appendChild($sideContainer)

  this.state = {
    user: {
      name: 'GOUM',
      img: '/src/assets/img-profile-default.svg'
    },
    pages: []
  }

  const addPage = async (title, parent) => {
    const pageList = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title,
        parent
      })
    })

    await init()
    this.setState({
      ...this.state,
      pageList
    })
  }

  this.render = () => {

    this.setState = nextState => {
      this.state = nextState
      pageList.setState(this.state.pages)
    }

    new ListHeader({
      $target: $sideContainer,
      initialState: this.state.user
    })

    const pageList = new PageList({
      $target: $sideContainer,
      initialState: this.state.pages,
      onSelectPage: (id) => {
        console.log(id)
      },
      onDeletePage: async (id) => {
        const pageList = await request(`/${id}`, {
          method: 'DELETE'
        })
        await init()
        this.setState({
          ...this.state,
          pageList
        })
      },
      onAddPage: (id = null) => {
        addPage('제목없음', id)
      }
    })

  }

  this.render()

  const init = async () => {
    const pages = await request('', {
      method: 'GET',
    })
    this.setState({
      ...this.state,
      pages
    })
  }
  init()
}