'use client';

import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Avatar from 'react-avatar';
import Logo from './Logo';
import { useBoardStore } from '@/store/BoardStore';
import { useEffect, useState } from 'react';
import fetchSuggestion from '@/lib/fetchSuggestion';

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<string>('');

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestions(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col items-center p-5 md:flex-row ">
        <div
          className="
            absolute
            top-0
            left-0
            w-full
            h-96
            bg-gradient-to-r from-rose-100 to-teal-100
            rounded-md
            filter
            blur-3xl 
            opacity-70
            -z-50
          "
        />

        {/* Logo */}
        <Logo />

        <div className="flex items-center justify-end flex-1 space-x-5 w-full">
          {/* Search Box */}
          <form
            className="flex items-center flex-1 p-2 space-x-5 bg-white rounded-md shadow-md md:flex-initial"
            action=""
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />

            <input
              className="flex-1 p-2 outline-none"
              placeholder="Search"
              type="text"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button hidden type="submit">
              Search
            </button>
          </form>

          {/* Avatar */}
          <Avatar className="w-10 h-10" name="Guest" round color="purple" size="50" />
        </div>
      </div>

      {/* Suggestion */}
      <div className="flex items-center justify-center px-5 md:py-5 py-2">
        <p className="flex items-center text-sm font-light pr-5 p-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-purple-900">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-purple-800 mr-1
          ${loading && 'animate-spin'}
          `}
          />
          {suggestions && !loading ? suggestions : 'GPT is summarizing your board...'}
        </p>
      </div>
    </header>
  );
}

export default Header;
