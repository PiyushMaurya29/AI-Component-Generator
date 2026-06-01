import { FaUser } from 'react-icons/fa'
import { HiSun } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'

const Navbar = () => {
  return (
    <header className="nav flex h-[90px] items-center justify-between border-b border-gray-800 px-6 sm:px-10 lg:px-[100px]">
      <div className="logo">
        <h1 className='sp-text text-[25px] font-[700]'>GenUI</h1>
      </div>
      <nav className="icons flex items-center gap-[15px]" aria-label="Application shortcuts">
        <button className="icon" type="button" aria-label="Toggle theme"><HiSun /></button>
        <button className="icon" type="button" aria-label="User profile"><FaUser /></button>
        <button className="icon" type="button" aria-label="Settings"><RiSettings3Fill /></button>
      </nav>
    </header>
  )
}

export default Navbar
