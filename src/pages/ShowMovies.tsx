import React, {useState, useEffect} from 'react'
import { getMovies } from '../scripts/dynamo/getMovies'
import {MovieTypes} from '../types/MovieTypes'

export default function ShowMovies () {
  const [movies, setMovies] = useState<MovieTypes[]>([])

  useEffect(()=>{
    getMovies(1999).then((value) =>{
      console.log(value)
      setMovies(value.Items)
    })
  }, [])
  return (
    <>
    <div>show Movies for dynamo</div>
      {movies.map(movie=>{
        return <div>{movie.title}:{movie.year}</div>
      })}
    </>
  )
}
