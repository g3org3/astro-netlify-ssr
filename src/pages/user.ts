import type { APIContext } from 'astro';

export function get(context: APIContext) {
  const str = [{ name: "Alejandra" }, {name: "Jorge Adolfo"}]

  const action = context.url.searchParams.get('action')
  if (action === "login") {
    context.cookies.set("SID", "loggedin")
  } else {
    context.cookies.delete("SID")
  }

  return new Response(JSON.stringify(str), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    }
  })
}
