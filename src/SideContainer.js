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

  this.render = () => {
    new ListHeader({
      $target: $sideContainer,
      initialState: this.state.user,
      onPageAdd: async (e) => {
        await request('', {
          method: 'POST',
          body: JSON.stringify({
            title: '제목없음',
            parent: 1760
          })
        })

        await init()
      }
    })

    this.setState = nextState => {
      this.state = nextState
      pageList.setState(this.state.pages)
    }
    const pageList = new PageList({
      $target: $sideContainer,
      initialState: this.state.pages,
      onSelect: (li) => {
        const { id } = li.dataset
        alert(id)
      },
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