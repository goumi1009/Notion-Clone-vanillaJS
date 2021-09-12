import ListHeader from './ListHeader.js'
import PageList from './PageList.js'

export default function SideContainer({ $target, initialState, onDeletePage, onAddPage }) {
  const $sideContainer = document.createElement('div')
  $sideContainer.classList.add('side-container')

  this.state = initialState

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
    onDeletePage,
    onAddPage
  })

  this.render = () => {
    $target.appendChild($sideContainer)
  }
  this.render()
}