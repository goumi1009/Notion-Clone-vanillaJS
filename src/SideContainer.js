import { request } from './api.js'
import ListHeader from './ListHeader.js'
import PageList from './PageList.js'

export default function SideContainer({ $target }) {
  const $sideContainer = document.createElement('div')
  $sideContainer.classList.add('side-container')
  $target.appendChild($sideContainer)

  this.state = {
    user: {
      name: 'GOUM',
      img: '/src/assets/img-profile-default.svg'
    },
    pages: []
  }

  const addPage = async (title, parent) => {
    await request('', {
      method: 'POST',
      body: JSON.stringify({
        title,
        parent
      })
    })

    await init()
  }

  this.render = () => {
    new ListHeader({
      $target: $sideContainer,
      initialState: this.state.user,
      onAddPage: () => {
        addPage('제목없음', null)
        pageList.render()
      }
    })

    this.setState = nextState => {
      this.state = nextState
      pageList.setState(this.state.pages)
    }
    const pageList = new PageList({
      $target: $sideContainer,
      initialState: this.state.pages,
      onSelectPage: (id) => {
        console.log(id)
      },
      onDeletePage: async (id) => {
        await request(`/${id}`, {
          method: 'DELETE'
        })
        await init()
        pageList.render()
      },
      onToggleList: async ($target, id, state) => {
        const page = await request(`/${id}`, {
          method: 'GET'
        })
        const subPages = page.documents
        const $subList = state === 'open' ? document.createElement('ul') : $target.querySelector('.sub-list')
        console.log(state, subPages)

        if (state === 'open') {
          $subList.classList.add('sub-list')
          await $target.appendChild($subList)

          if (!subPages.length) {
            $subList.innerHTML = `<li class="no-page"><div>하위페이지가 없습니다</div></li>`
            return
          }

          $subList.innerHTML = await `${subPages.map(page => `
            <li data-id="${page.id}">
              <div>
                <button class="btn-toggle-page open" type="button">page list toggle</button>
                <a name="title">${page.title}</a>
                <div class="hidden-box">
                  <button class="btn-del-page" type="button" title="페이지 제거">Delete Page</button>
                  <button class="btn-add-page" type="button" title="페이지 내에 하위페이지 추가하기">Add Page</button>
                </div>
              </div>
            </li>`).join('')}`
        } else if (state === 'close') {
          await $target.removeChild($subList)
        }
        console.log($subList)
      },
      onAddPage: (id) => {
        addPage('제목없음', id)

      }
    })

  }

  this.render()

  const init = async () => {
    const pages = await request('', {
      method: 'GET',
    })
    this.setState({
      ...this.state,
      pages
    })
  }
  init()
}