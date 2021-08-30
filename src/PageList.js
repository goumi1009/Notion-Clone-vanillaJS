export default function PageList({
  $target,
  initialState,
  onSelect,
  onTogglePage
}) {
  const $pageList = document.createElement('div')
  $target.appendChild($pageList)

  this.state = initialState
  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!this.state.length) {
      $pageList.innerHTML = `등록된 page가 없습니다!`
      return
    }

    $pageList.innerHTML = `
      <ul>
        ${this.state.map(page => `<li data-id="${page.id}"><button class="btn-page-toggle" type="button">🔻</button><a name="title">${page.title}</a></li>`).join('')}
      </ul>
    `
  }

  $pageList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    if (e.target.name === 'title') {
      onSelect($li)
    }
  })

  this.render()
}