export default function ListHeader({
  $target,
  initialState
}) {
  const $header = document.createElement('div')
  $header.classList.add('header')
  $target.appendChild($header)
  this.state = initialState
  this.render = () => {
    $header.innerHTML = `
      <img src="${this.state.img}">
      <h1>${this.state.name}</</h1>
    `
  }

  this.render()
}