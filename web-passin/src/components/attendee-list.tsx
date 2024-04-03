import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ChangeEvent, useState } from 'react'
import { attendees } from '@/data/attendees'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export const AttendeeList = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const TOTAL_PAGES = Math.ceil(attendees.length / 10)

  const goToNextPage = () => {
    setPage(page + 1)
  }

  const goToFirstPage = () => {
    setPage(1)
  }

  const goToLastPage = () => {
    setPage(TOTAL_PAGES)
  }
  const goToPreviousPage = () => {
    setPage(page - 1)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <section>
      <div className="flex gap-4 items-center">
        <h1 className="font-bold text-2xl">Participantes</h1>

        <div className="flex items-center gap-3 w-72 border border-white/10 px-3 py-1.5 rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />

          <Input
            onChange={handleSearch}
            placeholder="Buscar participantes"
            className="bg-transparent p-0 border-none ring-offset-0"
          />
        </div>
        {search}
      </div>

      <div className="mt-6 border border-white/10 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: 48 }}>
                <Checkbox className="border-white/10 size-5 rounded" />
              </TableHead>
              <TableHead className="text-sm text-zinc-300">Codigo</TableHead>
              <TableHead className="text-sm text-zinc-300">
                Participante
              </TableHead>
              <TableHead className="text-sm text-zinc-300">
                Data da inscrição
              </TableHead>
              <TableHead className="text-sm text-zinc-300">
                Data da check-in
              </TableHead>
              <TableHead style={{ width: 64 }} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendees.slice((page - 1) * 10, page * 10).map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell>
                  <Checkbox className="border-white/10 size-5 rounded" />
                </TableCell>
                <TableCell className="text-sm text-zinc-300">
                  {`#${attendee.id}`}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span className="text-sm text-zinc-300">
                      {attendee.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-zinc-300">
                  {dayjs().to(attendee.createdAt)}
                </TableCell>
                <TableCell className="text-sm text-zinc-300">
                  {dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell>
                  <Button
                    size={'icon'}
                    className="bg-black/20 border border-white/10 hover:bg-zinc-950 rounded-lg"
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow>
              <TableHead colSpan={3}>
                Mostrando 30 de {attendees.length} itens
              </TableHead>
              <TableHead className="text-right" colSpan={3}>
                <div className="inline-flex items-center gap-8">
                  <span>
                    Página {page} de {TOTAL_PAGES}
                  </span>
                  <div className="flex gap-1.5">
                    <Button
                      disabled={page === 1}
                      onClick={goToFirstPage}
                      size={'icon'}
                      className=" h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronsLeft className="size-4" />
                    </Button>

                    <Button
                      disabled={page === 1}
                      onClick={goToPreviousPage}
                      size={'icon'}
                      className=" h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>

                    <Button
                      disabled={page === TOTAL_PAGES}
                      onClick={goToNextPage}
                      size={'icon'}
                      className="h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronRight className="size-4" />
                    </Button>

                    <Button
                      disabled={page === TOTAL_PAGES}
                      onClick={goToLastPage}
                      size={'icon'}
                      className=" h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronsRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  )
}
