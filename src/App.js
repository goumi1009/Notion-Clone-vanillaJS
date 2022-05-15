import SideContainer from './SideContainer.js';
import EditorContainer from './EditorContainer.js';
import { initRouter } from './router.js';
import { request } from './api.js';
import { push } from './router.js';
import { getItem, setItem } from './storage.js';

export default function App({ $target }) {
  this.state = {
    user: {
      name: 'GOUM',
      img: '/src/assets/img-profile-default.svg',
    },
    pages: [],
    currentPageId: null,
    currentPage: {},
  };

  this.setState = async (nextState) => {
    if (this.state.currentPageId !== nextState.currentPageId) {
      this.state = nextState;
      autoSaveLocalKey = `autoSaveData_${this.state.currentPageId}`;
      await fetchPost();
      return;
    }
    this.state = nextState;
    sideConatiner.setState(this.state);
    editorContainer.setState({
      id: this.state.currentPageId,
      page: this.state.currentPage,
    });
  };

  const sideConatiner = new SideContainer({
    $target,
    initialState: this.state,
    onDeletePage: async (id) => {
      const pageList = await request(`/${id}`, {
        method: 'DELETE',
      });
      await init();
      this.setState({
        ...this.state,
        pageList,
      });
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
  let timer = null;

  const editorContainer = new EditorContainer({
    $target,
    initialState: {
      id: this.state.currentPageId,
      page: this.state.currentPage,
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

        await request(`/${this.state.currentPageId}`, {
          method: 'PUT',
          body: JSON.stringify(page),
        });
      }, 2000);
    },
  });

  this.setState({
    ...this.state,
    currentPage: getItem(autoSaveLocalKey, {
      title: '',
      content: '',
    }),
  });

  const fetchPost = async () => {
    const { currentPageId } = this.state;
    const currentPage = await request(`/${currentPageId}`);

    const autoSavePage = getItem(autoSaveLocalKey, {
      title: '',
      content: '',
    });
    const { saveDate } = autoSavePage;
    if (saveDate && saveDate > currentPage.updatedAt) {
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
      currentPage,
    });
  };

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
    if (pathname.indexOf('/documents/') === 0) {
      const [, , id] = pathname.split('/');
      this.setState({
        ...this.state,
        currentPageId: id,
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
