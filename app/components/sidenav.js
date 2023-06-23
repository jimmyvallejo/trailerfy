import React from 'react'
import Link from 'next/link';

export const SideNav = () => {
  return (
    <div className="flex flex-col border w-60 h-full  items-center justify-around fixed">
      <h1 className="text-2xl">Trailerfy</h1>
      <Link className="mb-10" href={"/"}>
        Home
      </Link>
      <Link className="mb-10 mt-10" href={"/trending"}>
        Trending
      </Link>
      <Link className="mb-10 mt-10" href={"/future"}>
        Want to See
      </Link>
      <Link className="mb-10 mt-10" href={"/watched"}>
        Watched
      </Link>
      <Link className="mb-10 mt-10" href={"/settings"}>
        Settings
      </Link>
    </div>
  );
}
