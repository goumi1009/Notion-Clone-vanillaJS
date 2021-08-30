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
      initialState: this.state.user
    })

    new PageList({
      $target: $sideContainer,
      initialState: this.state.pages,
      onSelect: (li) => {
        const { id } = li.dataset
        alert(id)
      }
    })

  }

  this.render()

  const init = async () => {
    const pages = await request('', {
      method: 'GET',
      headers: {
        'x-username': 'goumi1009'
      }
    })
    console.log(pages)
  }
  init()
}