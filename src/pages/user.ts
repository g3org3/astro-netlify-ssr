import type { APIContext } from 'astro';

const res = (data: any, status?: number) => 
  new Response(
    JSON.stringify(data), 
    {
      status: status || 200,
      headers: { 'content-type': 'application/json' },
    }
  )

export async function get(context: APIContext) {
  context.cookies.delete("SID")

  return res({ message: "ok" })
}

export async function post(context: APIContext) {
  const payload = await context.request.json()
  const userId = payload['user-id'] 
  if (userId) {
    // const expires = new Date(Date.now() + 10 * 1000)
    // context.cookies.set("SID", userId, { expires })
    context.cookies.set("SID", userId)

    return res({status: 'ok'})
  }

  return res({message: 'user not found'}, 404)
}
