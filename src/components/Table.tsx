import {
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
} from '@tanstack/solid-table'
import { createSignal, For } from 'solid-js'


const defaultColumns: ColumnDef<{title: string}>[] = [
  { accessorKey: 'id' },
  { accessorKey: 'title' },
]

export default function Table() {
  const [data, setData] = createSignal([])
  const [sorting, setSorting] = createSignal<SortingState>([])

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(todos => setData(todos))
  
  const table = createSolidTable({
    get data() {
      return data()
    },
    columns: defaultColumns,
    state: {
      get sorting() {
        return sorting()
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return <div class="border shadow-md rounded border-slate-400">
    <table class="table-auto w-full border-collapse">
      <thead>
        <For each={table.getHeaderGroups()}>
          {headerGroup => (
            <tr>
              <For each={headerGroup.headers}>
                {header => (
                  <th class="border-y capitalize cursor-pointer select-none bg-slate-50 p-2 pt-4 border-slate-300" onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <tbody>
        <For each={table.getRowModel().rows}>
          {row => (
            <tr>
              <For each={row.getVisibleCells()}>
                {cell => (
                  <td class="border-y p-2 border-slate-300">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
    <div class="flex gap-2 p-2">
      <div class="flex-1"></div>
      <select>
        <option>10</option>
        <option>20</option>
      </select>
      <button
        class="border rounded px-4 py-1 text-sm disabled:shadow-slate-50 disable:bg-slate-100 shadow hover:shadow-md active:shadow active:bg-slate-50 disabled:text-slate-300"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        prev
      </button>
      <div class="items-center flex">page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</div>
      <button
        class="border rounded px-4 py-1 text-sm disabled:shadow-slate-50 disable:bg-slate-100 shadow hover:shadow-md hover:bg-slate-50 active:shadow- active:bg-slate-100 disabled:text-slate-300"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        next
      </button>
    </div>

  </div>
}
