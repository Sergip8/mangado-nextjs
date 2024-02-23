import Link from "next/link";
import DropdownItem from "./dropdown-item";
import Image from "next/image";
import ThemeSwitch from "./ToggleThemeBtn";
import SearchBar from "./SearchBar";




function Navbar({isView}:{isView:boolean}) {
  const nav = true;
  

  return (
    <div className={`${isView? 'relative':'fixed'} bg-gray-100 dark:bg-slate-500 left-0 top-0 w-full z-10 ease-in duration-300`}>
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-1 text-gray">
        <Link href="/">
          <h1 className="font-bold md:text-2xl lg:text-4xl text-sm">Mangado</h1>
        </Link>
        <div>
          <SearchBar/>
        </div>
        <ul className="flex items-center">
          <li className="p-4 ">
            <Link href="/biblioteca">Biblioteca</Link>
          </li>
          <li className="p-4">
          <ThemeSwitch/>
          </li>
        
        </ul>

        {/* Mobile Button */}
        {/* <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div> */}
        {/* Mobile Menu */}
        {/* <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-slate-200 text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-slate-200 text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              //   onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              //   onClick={}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li
              //   onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#portfolio">My roads</Link>
            </li>
            <li
              //   onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
