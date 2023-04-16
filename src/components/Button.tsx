const Button = () => {
  const onClick = async () => {
    try {
      await fetch('/user')
      location.href = '/'
    } catch{}
  }

  return <button class="bg-indigo-600 hover:bg-indigo-500 focus:bg-indigo-700 text-white px-4 py-2 text-md capitalize rounded" onClick={onClick}>logout</button>
}

export default Button
