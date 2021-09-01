export default function PageList({
  $target,
  initialState,
  onSelectPage,
  onDeletePage,
  onToggleList,
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

    $pageList.innerHTML = `
      <ul>
        ${this.state.map(page => `
          <li data-id="${page.id}">
            <div>
              <button class="btn-toggle-page open" type="button">page list toggle</button>
              <a name="title">${page.title}</a>
              <div class="hidden-box">
                <button class="btn-del-page" type="button" title="페이지 제거">Delete Page</button>
                <button class="btn-add-page" type="button" title="페이지 내에 하위페이지 추가하기">Add Page</button>
              </div>
            </div>
          </li>`).join('')}
      </ul>
    `
  }

  $pageList.addEventListener('click', (e) => {
    const $this = e.target
    const $li = $this.closest('li')
    const classList = $this.classList
    const id = Number($li.dataset.id)

    // 페이지 제목 클릭
    if ($this.name === 'title') {
      onSelectPage(id)
    }

    // 페이지 리스트 토글버튼
    if (classList.contains('btn-toggle-page')) {
      if (classList.contains('open')) {  // 리스트 열림상태
        onToggleList($li, id, 'open')
        classList.remove('open')
        classList.add('close')
      } else {  // 리스트 닫힘상태
        onToggleList($li, id, 'close')
        classList.remove('close')
        classList.add('open')
      }
    }

    // 페이지 삭제 버튼
    if (classList.contains('btn-del-page')) {
      onDeletePage(id)

    }

    // 페이지 추가 버튼
    if (classList.contains('btn-add-page')) {
      onAddPage(id)
    }

  })

  this.render()
}