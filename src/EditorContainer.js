import { request } from './api.js'
import { getItem, setItem } from './storage.js'
import Editor from './Editor.js'

export default function EditorContainer({ $target, initialState }) {

  const $editorContainer = document.createElement('div')
  $editorContainer.classList.add('editor-container')

  this.state = initialState

  let autoSaveLocalKey = `autoSaveData_${this.state.id}`

  const page = getItem(autoSaveLocalKey, {
    title: '',
    content: ''
  })

  let timer = null

  const editor = new Editor({
    $target: $editorContainer,
    initialState: page,
    autoSave: (page) => {
      if (timer !== null) {
        clearTimeout(timer)
      }

      timer = setTimeout(async () => {
        console.log(page)
        setItem(autoSaveLocalKey, {
          ...page,
          saveDate: new Date()
        })

        await request(`/${this.state.id}`, {
          method: 'PUT',
          body: JSON.stringify(page)
        })
      }, 2000)
    }
  })

  this.setState = async nextState => {
    if (this.state.id !== nextState.id) {
      autoSaveLocalKey = `autoSaveData_${nextState.id}`
      this.state = nextState
      await fetchPost()
      return
    }

    this.state = nextState
    this.render()
    editor.setState(this.state.page || {
      title: '',
      content: ''
    })
  }

  this.render = () => {
    if (this.state.id !== null) {
      $target.appendChild($editorContainer)
    }
  }

  this.render()

  const fetchPost = async () => {
    const { id } = this.state
    const page = await request(`/${id}`)

    const autoSavePage = getItem(autoSaveLocalKey, {
      title: '',
      content: ''
    })
    const { saveDate } = autoSavePage
    if (saveDate && saveDate > page.updatedAt) {
      if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
        this.setState({
          ...this.state,
          page: autoSavePage
        })
        return
      }
    }
    this.setState({
      ...this.state,
      page
    })
  }
}