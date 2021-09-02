export default function Editor({
  $target,
  initialState = {
    title: '',
    content: ''
  },
  autoSave
}) {
  const $editor = document.createElement('div')
  $target.appendChild($editor)

  this.state = initialState
  let isInitialized = false

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if (!isInitialized) {
      isInitialized = true
      $editor.innerHTML = `
        <input name="title" type="text" title="페이지 제목" style="width: 500px" value="${this.state.title}">
        <textarea name="content" style="width: 500px; height: 500px;">${this.state.content}</textarea>
      `
    }
    $editor.querySelector('[name=title]').value = this.state.title
    $editor.querySelector('[name=content]').value = this.state.content

  }
  this.render()

  $editor.addEventListener('keyup', e => {
    const { target } = e
    const name = target.name
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value
      }
      this.setState(nextState)
    }
    autoSave(this.state)
  })
}