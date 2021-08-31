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
    },
    pages: []
  }

  const addPage = async (title, parent) => {
    await request('', {
      method: 'POST',
      body: JSON.stringify({
        title,
        parent
      })
    })

    await init()
  }

  this.render = () => {
    new ListHeader({
      $target: $sideContainer,
      initialState: this.state.user,
      onAddPage: () => {
        addPage('제목없음', null)
        pageList.render()
      }
    })

    this.setState = nextState => {
      this.state = nextState
      pageList.setState(this.state.pages)
    }
    const pageList = new PageList({
      $target: $sideContainer,
      initialState: this.state.pages,
      onSelectPage: (id) => {
        console.log(id)
      },
      onDeletePage: async (id) => {
        await request(`/${id}`, {
          method: 'DELETE'
        })
        await init()
        pageList.render()
      },
      onToggleList: () => {

      },
      onAddPage: (id) => {
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