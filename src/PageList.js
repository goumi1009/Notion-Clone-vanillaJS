export default function PageList({
  $target,
  initialState,
  onSelectPage,
  onDeletePage,
  onAddPage
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

    const loadList = (list) => {
      return `<ul>
        ${list.map(page => `
          <li data-id="${page.id}">
            <div>
              <button class="btn-toggle-page" type="button">page list toggle</button>
              <a name="title">${page.title}</a>
              <div class="hidden-box">
                <button class="btn-del-page" type="button" title="페이지 제거">Delete Page</button>
                <button class="btn-add-page" type="button" title="페이지 내에 하위페이지 추가하기">Add Page</button>
              </div>
            </div>
            ${page.documents.length ? loadList(page.documents) : `<ul><li class="no-page"><div>하위페이지가 없습니다</div></li></ul>`}
          </li>
        `).join('')}
      </ul>`
    }

    $pageList.innerHTML = loadList(this.state)

    const $addPageButton = document.createElement('div')
    $addPageButton.innerHTML = `<button class="btn-add-root">페이지 추가</button>`
    $pageList.appendChild($addPageButton)
  }

  $pageList.addEventListener('click', (e) => {
    const $this = e.target
    const $li = $this.closest('li')

    if ($li) {
      const id = Number($li.dataset.id)

      // 페이지 제목 클릭
      if ($this.name === 'title') {
        onSelectPage(id)

      }

      // 페이지 리스트 토글버튼
      if ($this.classList.contains('btn-toggle-page')) {
        $li.classList.toggle('open')
      }

      // 페이지 삭제 버튼
      if ($this.classList.contains('btn-del-page')) {
        onDeletePage(id)

      }

      // 페이지 추가 버튼
      if ($this.classList.contains('btn-add-page')) {
        onAddPage(id)
      }
    }

    if ($this.classList.contains('btn-add-root')) {
      onAddPage()
    }
  })

  this.render()
}