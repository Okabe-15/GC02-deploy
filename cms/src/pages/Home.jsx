import axios from "axios"
import { useState, useEffect } from "react"
import { baseUrl } from "../constant/baseUrl"
import { Link } from "react-router"
import Toastify from "toastify-js"

function showToast(text, isError = false) {
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    style: {
      background: isError ? "#F87171" : "#34D399",
      color: "#000000"
    }
  }).showToast()
}

function Home() {
  const [movies, setMovies] = useState([])

  async function handleDelete(movie) {
    const shouldDelete = window.confirm(`Hapus movie ${movie.title}?`)
    if (!shouldDelete) return

    try {
      const { data } = await axios.delete(`${baseUrl}/movies/${movie.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setMovies((currentMovies) => (
        currentMovies.filter((currentMovie) => currentMovie.id !== movie.id)
      ))
      showToast(data.message)
    } catch (error) {
      showToast(error.response?.data?.message || "Gagal menghapus movie", true)
    }
  }

  useEffect(() => {
    let isActive = true

    axios.get(`${baseUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(({ data }) => {
        if (isActive) setMovies(data.data)
      })
      .catch((error) => {
        showToast(error.response?.data?.message || "Gagal mengambil data movie", true)
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <main className="flex-1 min-h-screen bg-neutral-950 p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-white text-lg font-semibold">
          Daftar Movie
        </h1>

        <Link
          to={'/add'}
          className="bg-yellow-500 text-black text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-400"
        >
          + Add Movie
        </Link>
      </div>

      <table className="w-full bg-[#111111] border border-neutral-800 rounded text-sm">
        <thead>
          <tr className="border-b border-neutral-800 text-left text-neutral-400">
            <th className="px-4 py-3 w-16">No</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3 w-24">Rating</th>
            <th className="px-4 py-3 w-72">Action</th>
          </tr>
        </thead>

        <tbody className="text-white">
          {movies.map((movie, index) => {
            return (
              <tr
                key={movie.id}
                className="border-b border-neutral-800"
              >
                <td className="px-4 py-3 text-neutral-400">
                  {index + 1}
                </td>

                <td className="px-4 py-3">
                  {movie.title}
                </td>

                <td className="px-4 py-3">
                  {movie.rating}
                </td>

                <td className="px-4 py-3">
                  <Link
                    to={`/edit/${movie.id}`}
                    className="border border-neutral-600 text-neutral-300 px-3 py-1.5 rounded hover:text-white hover:border-white"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/movies/${movie.id}/upload-image`}
                    className="border border-neutral-600 text-neutral-300 px-3 py-1.5 rounded hover:text-white hover:border-white ml-1"
                  >
                    Upload Image
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(movie)}
                    className="border border-red-800 text-red-400 px-3 py-1.5 rounded hover:bg-red-900/40 ml-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}

export default Home
