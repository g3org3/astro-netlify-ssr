interface Props {
  label: string
}
const Button = (props: Props) => {

  const onClick = () => {
    alert('begin!')
    fetch('/users').then(res => {
      console.log(res.status)
      return res.text()
    }).then((data) => {
      console.log({data})
    }).catch(err => {
      console.log(err)
    })
  }

  return <button class="bg-blue-700 text-white px-10 py-2 text-lg rounded" onClick={onClick}>{props.label}</button>
}
export default Button
