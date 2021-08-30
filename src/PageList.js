export default function PageList({
  $target,
  initialState,
  onSelect,
  onTogglePage
}) {
  const $pageList = document.createElement('div')
  $target.appendChild($pageList)

  this.state = initialState
  this.setSate = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!this.state.length) {
      $pageList.innerHTML = `등록된 page가 없습니다!`
      return
    }

    $pageList.innerHTML = `
      <em>PRIVATE</em>
      <ul>
        ${this.state.map(page => `<li data-id="${page.id}"><button class="btn-page-toggle" type="button">🔻</button><a>${page.title}</a></li>`).join('')}
      </ul>
    `
  }

  $pageList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    onSelect($li)
  })

  this.render()
}