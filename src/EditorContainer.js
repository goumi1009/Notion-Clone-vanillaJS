import Editor from './Editor.js';

export default function EditorContainer({ $target, initialState, autoSave }) {
  const $editorContainer = document.createElement('div');
  $editorContainer.classList.add('editor-container');

  this.state = initialState;

  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.page,
    autoSave,
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    this.render();
    editor.setState(
      this.state.page || {
        title: '',
        content: '',
      }
    );
  };

  this.render = () => {
    if (this.state.id !== null) {
      $target.appendChild($editorContainer);
    }
  };

  this.render();
}
