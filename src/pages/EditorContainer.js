import { request } from '../utils/api.js';
import { getItem, setItem } from '../utils/storage.js';
import Editor from '../components/Editor.js';

export default function EditorContainer({
  $target,
  initialState,
  autoSave,
  onEditing,
}) {
  const $editorContainer = document.createElement('div');
  $editorContainer.classList.add('editor-container');

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
    editor.setState(
      this.state.currentPage || {
        title: '',
        content: '',
      }
    );
  };

  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.currentPage,
    autoSave,
    onEditing,
  });

  this.render = () => {
    if (this.state.id !== null) {
      $target.appendChild($editorContainer);
    }
  };

  this.render();
}
