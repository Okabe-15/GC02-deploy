import axios from "axios";
import { baseUrl } from "../../../cms/src/constant/baseUrl";
import { Link, useParams } from "react-router";
import { useEffect, useState } from 'react';

function Detail() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  async function fetchMovies() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${baseUrl}/pub/movies/${id}`)

      setMovies(data.data)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <>

   <div className="bg-black min-h-screen p-5">

  <div className="flex gap-8 bg-neutral-900 p-5">

    <img
      src={movies.imgUrl}
      className="w-72 h-96 object-cover"
      alt={movies.title}
    />

    <div className="max-w-xl">

      <h2 className="text-white text-3xl">
        {movies.title}
      </h2>

      <p className="text-gray-400 mt-2">
        ID : {movies.id}
      </p>

      <p className="text-yellow-400 mt-2">
        Rating : {movies.rating}
      </p>

      <h3 className="text-white mt-5">
        Synopsis
      </h3>

      <p className="text-gray-400 mt-2">
        {movies.synopsis}
      </p>

      <a
        href={movies.trailerUrl}
        target="_blank"
        className="inline-block bg-yellow-500 text-black px-4 py-2 mt-5"
      >
        Tonton Trailer
      </a>

    </div>

  </div>

  <Link to="/" className="text-white inline-block mt-5">
    ← Kembali
  </Link>

</div>
    </>

  )
}

export default Detail