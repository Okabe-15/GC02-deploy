import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Toastify from "toastify-js"
import MovieForm from "../components/MovieForm"
import { baseUrl } from "../constant/baseUrl"

function AddMovie() {
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    trailerUrl: "",
    imgUrl: "",
    rating: 0,
    genreId: 0
  })
  const [genres, setGenres] = useState([])
  const navigate = useNavigate()

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
        text: error.response?.data?.message || "Gagal mengambil data genre",
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

  function getFormData(fieldName, value) {
    setForm((previousForm) => {
      return {
        ...previousForm,
        [fieldName]: value
      }
    })
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault()

      const { data } = await axios.post(`${baseUrl}/movies`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      navigate("/")

      Toastify({
        text: `Berhasil menambahkan ${data.data.title}`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#34D399",
          color: "#000000"
        }
      }).showToast()
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Gagal menambahkan movie",
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
    <main className="min-h-screen bg-neutral-950 p-6">
      <MovieForm
        title="Add New Movie"
        submitLabel="Add New Movie"
        form={form}
        genres={genres}
        getFormData={getFormData}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default AddMovie
