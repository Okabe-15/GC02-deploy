import axios from "axios"
import { useEffect, useState } from "react"
import Toastify from "toastify-js"
import { baseUrl } from "../constant/baseUrl"

function GenreList() {
  const [genres, setGenres] = useState([])

  async function fetchGenres() {
    try {
      const { data } = await axios.get(`${baseUrl}/genres`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setGenres(data.data)
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#F87171",
          color: "#000000"
        }
      }).showToast()
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  return (
    <main className="flex-1 min-h-screen bg-neutral-950 p-6">
      <h1 className="text-white text-lg font-semibold mb-5">
        Daftar Genre
      </h1>

      <table className="w-full bg-[#111111] border border-neutral-800 rounded text-sm">
        <thead>
          <tr className="border-b border-neutral-800 text-left text-neutral-400">
            <th className="px-4 py-3 w-16">No</th>
            <th className="px-4 py-3">Name</th>
          </tr>
        </thead>

        <tbody className="text-white">
          {genres.map((genre, index) => (
            <tr key={genre.id} className="border-b border-neutral-800">
              <td className="px-4 py-3 text-neutral-400">{index + 1}</td>
              <td className="px-4 py-3">{genre.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default GenreList
