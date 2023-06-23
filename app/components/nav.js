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
    <nav className="">
      <div className="flex flex-row justify-end items-center w-full border fixed">
        

        <div className="mr-10">
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
        </div>
      </div>

    </nav>
  );
};

export default Nav;
