import { createSignal } from 'solid-js'

interface Props {
  label: string
}

const Button = (props: Props) => {
  const [data, setData] = createSignal([])
  
  const onClick = async () => {
    try {
      const res = await fetch('/user')
      if (res.status !== 200)  return
      const _data = await res.json()
      setData(_data)
    } catch {
      console.log('failed')
    }
  }

  return <>
  <button class="bg-blue-700 text-white px-10 py-2 text-lg rounded" onClick={onClick}>{props.label}</button>
    <pre>
      {JSON.stringify(data(), null, 2)}
    </pre>
  </>
}
export default Button
