import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Toastify from "toastify-js"
import MovieForm from "../components/MovieForm"
import { baseUrl } from "../constant/baseUrl"

function EditMovie() {
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    trailerUrl: "",
    imgUrl: "",
    rating: 0,
    genreId: 0
  })
  const [genres, setGenres] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${baseUrl}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setForm(data.data)
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

      const { data } = await axios.put(`${baseUrl}/movies/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      navigate("/")

      Toastify({
        text: `Berhasil mengubah ${data.data.title}`,
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
    fetchMovie()
    fetchGenres()
  }, [])

  return (
    <main className="min-h-screen bg-neutral-950 p-6">
      <MovieForm
        title="Edit Movie"
        submitLabel="Update Movie"
        form={form}
        genres={genres}
        getFormData={getFormData}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default EditMovie
