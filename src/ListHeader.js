export default function ListHeader({
  $target,
  initialState = {
    name: 'anonymous',
    img: '/src/assets/img-profile-default.svg'
  },
  onPageAdd
}) {
  const $header = document.createElement('div')
  $header.classList.add('header')
  $target.appendChild($header)
  this.state = initialState

  this.render = () => {
    const { name, img } = this.state
    $header.innerHTML = `
      <img src="${img}">
      <h1>${name}</</h1>
      <button class="" type="button">Add Page</button>
    `
  }

  this.render()


  $header.querySelector('button').addEventListener('click', (e) => {
    onPageAdd(e)
  })
}