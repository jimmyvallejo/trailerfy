'use client'
import Image from 'next/image'
import { useContext } from 'react'
import  { MovieContext }  from './components/movieprovider'
import LargeMovieCard from './components/largeMovieCard'

export default function Home() {
  
  const { allMovies } = useContext(MovieContext)

   
  
  
  return (
    <section className="flex h-screen  justify-center flex-col ">
      <LargeMovieCard allMovies={allMovies}/>
      <div className='w-full mt-10'> 

      </div>
    </section>
  );
}
