import { request } from './api.js'
import { getItem, setItem } from './storage.js'
import Editor from './Editor.js'

export default function EditorContainer({ $target, initialState }) {

  const $editorContainer = document.createElement('div')
  $editorContainer.classList.add('editor-container')

  this.state = initialState

  let PAGE_AUTO_SAVE_KEY = `autoSaveData_${this.state.id}`

  const page = getItem(PAGE_AUTO_SAVE_KEY, {
    title: '',
    content: ''
  })

  let timer = null

  const editor = new Editor({
    $target: $editorContainer,
    initialState: page,
    autoSave: (data) => {
      if (timer !== null) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        setItem(PAGE_AUTO_SAVE_KEY, {
          ...data,
          saveDate: new Date()
        })

        console.log(data)
      }, 1000)
    }
  })

  this.setState = async nextState => {
    if (this.state.id !== nextState.id) {
      this.state = nextState
      await fetchPost()
      return
    }

    this.state = nextState
    this.render()
    editor.setState(this.state.page)
  }

  this.render = () => {
    $target.appendChild($editorContainer)
  }

  this.render()

  const fetchPost = async () => {
    const { id } = this.state
    if (id !== 'new') {
      const page = await request(`/${id}`)
      this.setState({
        ...this.state,
        page
      })
    }

  }
}