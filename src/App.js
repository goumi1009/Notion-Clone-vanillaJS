import SideContainer from './components/SideContainer.js';
import EditorContainer from './pages/EditorContainer.js';
import { initRouter, push } from './utils/router.js';
import { request } from './utils/api.js';
import { setItem, getItem } from './utils/storage.js';

export default function App({ $target }) {
  this.state = {
    user: {
      name: 'GOUM',
      img: '/src/assets/img-profile-default.svg',
    },
    currentPageId: 0,
    currentPage: {},
    pages: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    sideConatiner.setState(this.state);
    editorContainer.setState({
      currentPageId: this.state.currentPageId,
      currentPage: this.state.currentPage,
    });
  };

  const sideConatiner = new SideContainer({
    $target,
    initialState: this.state,
    onDeletePage: async (id) => {
      const pages = await request(`/${id}`, {
        method: 'DELETE',
      });
      await init();

      this.setState({
        ...this.state,
        pages,
      });
      console.log(this.state);
      push(`/`);
    },
    onAddPage: (id = null) => {
      addPage('제목없음', id);
    },
  });

  const addPage = async (title, parent) => {
    const pageList = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title,
        parent,
      }),
    });
    push(`/documents/${pageList.id}`);
    await init();
    this.setState({
      ...this.state,
      pageList,
    });
  };

  let autoSaveLocalKey = `autoSaveData_${this.state.currentPageId}`;

  const page = getItem(autoSaveLocalKey, {
    title: '',
    content: '',
  });

  let timer = null;

  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      currentPageId: this.state.currentPageId,
      currentPage: this.state.currentPage,
    },
    autoSave: (page) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(autoSaveLocalKey, {
          ...page,
          saveDate: new Date(),
        });

        await request(`/${this.state.id}`, {
          method: 'PUT',
          body: JSON.stringify(page),
        });
      }, 800);
    },
    onEditing: async () => {
      await init();
    },
  });

  const init = async () => {
    const pages = await request('', {
      method: 'GET',
    });
    this.setState({
      ...this.state,
      pages,
    });
  };
  init();

  this.route = () => {
    const { pathname } = window.location;
    console.log(pathname);
    if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/');
      fetchPage(id);
    } else {
      console.log('none');
    }
  };

  const fetchPage = async (pageId) => {
    const currentPage = await request(`/${pageId}`);
    const autoSavePage = getItem(autoSaveLocalKey, {
      title: '',
      content: '',
    });
    const { saveDate } = autoSavePage;
    if (saveDate && saveDate > page.updatedAt) {
      if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
        this.setState({
          ...this.state,
          currentPage: autoSavePage,
        });
        return;
      }
    }
    this.setState({
      ...this.state,
      currentPageId: pageId,
      currentPage,
    });
  };

  this.route();

  initRouter(() => this.route());
}
