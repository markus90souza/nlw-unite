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

export const AttendeeList = () => {
  return (
    <section>
      <div className="flex gap-4 items-center">
        <h1 className="font-bold text-2xl">Participantes</h1>

        <div className="flex items-center gap-3 w-72 border border-white/10 px-3 py-1.5 rounded-lg text-sm">
          <Search className="size-4 text-emerald-300" />

          <Input
            placeholder="Buscar participantes"
            className="bg-transparent p-0 border-none ring-offset-0"
          />
        </div>
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
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Checkbox className="border-white/10 size-5 rounded" />
                </TableCell>
                <TableCell className="text-sm text-zinc-300">12345</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      Marcos de souza
                    </span>
                    <span className="text-sm text-zinc-300">m@email.com</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-zinc-300">
                  7 dias atrás
                </TableCell>
                <TableCell className="text-sm text-zinc-300">
                  12 dias atrás
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
              <TableHead colSpan={3}>Mostrando 30 de 300 itens</TableHead>
              <TableHead className="text-right" colSpan={3}>
                <div className="inline-flex items-center gap-8">
                  <span>Página 1 de 10</span>
                  <div className="flex gap-1.5">
                    <Button
                      size={'icon'}
                      className=" h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronsLeft className="size-4" />
                    </Button>

                    <Button
                      size={'icon'}
                      className=" h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>

                    <Button
                      size={'icon'}
                      className="h-8 w-8 bg-white/10 border border-white/10 hover:bg-zinc-950 rounded-lg"
                    >
                      <ChevronRight className="size-4" />
                    </Button>

                    <Button
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
