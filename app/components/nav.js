"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      console.log(response)

      setProviders(response);
    };
    setProvider();
  },[]);
  
  useEffect(() => {
  console.log(session)
  },[session])
  
  
  return (
    <nav>
      <div className="flex flex-row justify-between items-center border fixed w-screen">
        <h1 className="text-2xl">Trailerfy</h1>
        <div>
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <button
                  className="w-20 h-20 cursor-pointer"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </button>
              );
            })}
          <button className="ml-5" onClick={signOut}>
            Sign out
          </button>
          {session && <h1 className="text-3xl">SESSION VERIFIED</h1>}
        </div>
      </div>
      <div className="flex flex-col border w-60 min-h-screen items-center justify-around fixed">
        <Link className="mb-10 mt-20" href={"/"}>
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
    </nav>
  );
};

export default Nav;
