import type { APIContext } from 'astro';

export async function get (context: APIContext) {
    const val = context.params['id']
    const data = await fetch(`https://rickandmortyapi.com/api/character/${val}`).then((r) => r.json())

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