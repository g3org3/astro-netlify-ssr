export async function get () {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos").then((r) => r.text())

    return new Response(
        data, 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'max-age=30'
            },
        }
    )
}