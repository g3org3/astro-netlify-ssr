import { createSignal } from "solid-js"

type EventHandler = {
  preventDefault: () => void
  target: any
}

const getPayload = (target: any) => {
  const inputs = Array.from(target).filter((x: any) => x?.name)
  const payload : any = inputs.reduce((byName: any, input: any) => {
    byName[input.name] = input.value
    return byName
  }, {})

  const onReset = () => {
    inputs.forEach((input: any) => {
      input.value = ''
    })
  }

  return { payload, onReset }
}

const request = async (url: string, payload?: Record<string, any>) => {
  let res = null
  if (payload) {
    res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    })
  } else {
    res = await fetch(url)
  }

  if (res.status !== 200) {
    throw new Error(`${res.status}: ${res.statusText}`)
  }

  if (res.headers.get('content-type') === 'application/json') {
    return res.json()
  }

  return res.text()
}

const Button = () => {
  const [isLoading, setLoading] = createSignal(false)

  const onSubmit = async (e: EventHandler) => {
    e.preventDefault()
    setLoading(true)
    const { payload, onReset } = getPayload(e.target)
    try {
      await request('/user', payload)
      location.href = '/home'
    } catch {}
    onReset()
    setLoading(true)
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="flex flex-col gap-4">
        <input disabled={isLoading()} placeholder="id" class="rounded border-2 px-4 py-2" name="user-id" type="text" />
        <button disabled={isLoading()} type="submit" class="bg-indigo-600 focus:bg-indigo-700 hover:bg-indigo-500 text-white px-10 py-2 text-lg rounded">
          {isLoading() ? 'Loading...' : 'Login'}
        </button>
      </div>
    </form>
  )
}

export default Button
