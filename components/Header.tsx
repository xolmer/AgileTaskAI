import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

function Header() {
  return (
    <header>
      <div className="flex flex-col items-center justify-between p-5 md:flex-row bg-gray-500/10 rounded-b-2xl">
        <Image
          src="/logo.svg"
          alt="Agile Task AI"
          width={300}
          height={100}
          className="object-contain pb-10 w-44 md:w-56 md:pb-0 fill-purple-600"
        />
        <div className="">
          {/* Search Box */}
          <form
            className="flex items-center flex-1 p-2 space-x-5 bg-white rounded-md shadow-md md:flex-initial"
            action=""
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input className="flex-1 p-2 outline-none" placeholder="Search" type="text" />
            <button type="submit">Search</button>
          </form>

          {/* Avatar */}
        </div>
      </div>
    </header>
  );
}

export default Header;
