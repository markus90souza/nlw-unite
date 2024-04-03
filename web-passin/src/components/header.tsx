import logo from '@/assets/nlw-unite-logo.svg'

export const Header = () => {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={logo} alt="" />
      <nav className="flex items-center gap-5">
        <a className="font-medium text-sm text-zinc-300" href="">
          Eventos
        </a>
        <a className="font-medium text-sm" href="">
          Participantes
        </a>
      </nav>
    </header>
  )
}
