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
  
  
  
  
  return <nav className="flex flex-row">
      
      {providers && Object.values(providers).map((provider) =>{
        return  (
        <button className="w-20 h-20 cursor-pointer" key={provider.name} onClick={() => signIn(provider.id)}>
             {provider.name}
        </button>
        )
      })}
        <button className="ml-5" onClick={signOut}>
            Sign out
        </button>
        {session && <h1 className="text-3xl">SESSION VERIFIED</h1>}
  </nav>;
};

export default Nav;
