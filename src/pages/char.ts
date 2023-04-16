import type { APIContext } from 'astro';
import Pusher from 'pusher'

const data = {
  items: [{name: "bob"}]
}

const delay = (t: number) => new Promise((r) => setTimeout(r, t))

const pusher = new Pusher({
  appId: "1585343",
  key: "ca1a8fcbf331fd4fa594",
  secret: "4b02f90c96d1b2cac2f0",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world"
});

export const get = async (context: APIContext) => {
  // setTimeout(() => data.items.push({name: "mike"}), 5000)
  console.log('> request')
  await delay(5000)

  return new Response(
    JSON.stringify(data), 
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'max-age=30'
      },
    }
  )
}
