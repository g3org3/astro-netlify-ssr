const Button = () => {
  const onClick = async () => {
    try {
      await fetch('/user')
      location.href = '/'
    } catch{}
  }

  return <button class="bg-slate-600 text-white px-10 py-2 text-md capitalize rounded" onClick={onClick}>logout</button>
}

export default Button
