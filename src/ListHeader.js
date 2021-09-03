export default function ListHeader({
  $target,
  initialState,
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
    `
  }

  this.render()
}