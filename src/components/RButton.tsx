import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from '@adeora/solid-query'
import { Switch, Match } from 'solid-js'
import Pusher from 'pusher-js'

const queryClient = new QueryClient()


export const fetchTodos = async () => {
  const data = await fetch('/char', {}).then((r) => r.json())
  return data as { name: string }[]
}

function RButton () {
  const pusher = new Pusher("ca1a8fcbf331fd4fa594", { cluster: 'eu' })
  const channel = pusher.subscribe('my-channel')

  channel.bind("my-event", () => {
    queryClient.invalidateQueries(['todos'] as never)
  })

  const query = createQuery(() => ({
    queryKey: ['todos', 'todo-1'],
    queryFn: fetchTodos,
  }))

  const onClick = async () => {
    const res = await fetch('/char')
    console.log(res)
    const data = await res.json()
    console.log(data)
  }
  
  return <div>
    <Switch>
      <Match when={query.isFetching}>
        <p>loading..</p>
      </Match>
    </Switch>
    <pre>
      {JSON.stringify(query.data, null, 2)}
    </pre>
    <button class="bg-slate-100 px-4 py-2" onClick={onClick}>
      click to fetch?
    </button>
    <button>invalidate</button>
  </div>
}

export default function RButtonProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <RButton />
    </QueryClientProvider>
  )

}
