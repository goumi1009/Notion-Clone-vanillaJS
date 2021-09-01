export default function ListHeader({
  $target,
  initialState,
  onAddPage
}) {
  const $header = document.createElement('div')
  $header.classList.add('header')
  $target.appendChild($header)
  this.state = initialState

  this.render = () => {
    const { name, img } = this.state
    $header.innerHTML = `
      <img src="${img}">
      <h1>${name}</h1>
      <button class="btn-add-page" type="button" title="페이지 추가">Add Page</button>
    `
  }

  this.render()


  $header.querySelector('button').addEventListener('click', (e) => {
    onAddPage()
  })
}