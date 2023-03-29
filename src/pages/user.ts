export function get() {
  const str = { name: "Alejandra" }

  return new Response(JSON.stringify(str), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    }
  })
}
