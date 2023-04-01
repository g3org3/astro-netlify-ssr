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
  const onSubmit = async (e: EventHandler) => {
    e.preventDefault()
    const { payload, onReset } = getPayload(e.target)
    try {
      await request('/user', payload)
      location.href = '/home'
    } catch {}
    onReset()
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="flex flex-col gap-4">
          <input placeholder="id" class="border-2 px-4 py-2" name="user-id" type="text" />
          <button type="submit" class="bg-blue-700 text-white px-10 py-2 text-lg rounded">login</button>
      </div>
    </form>
  )
}

export default Button
