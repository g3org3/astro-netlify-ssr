interface Props {
  label: string
}
const Button = (props: Props) => {

  return <button class="bg-blue-700 text-white px-10 py-2 text-lg rounded" onClick={() => alert('hello')}>{props.label}</button>
}
export default Button
