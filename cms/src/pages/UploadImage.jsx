import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Toastify from "toastify-js"
import Button from "../components/Button"
import { baseUrl } from "../constant/baseUrl"

function UploadImage() {
  const [movie, setMovie] = useState({})
  const [image, setImage] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  async function fetchMovie() {
    try {
      const { data } = await axios.get(`${baseUrl}/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setMovie(data.data)
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

  async function handleSubmit(e) {
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.append("image", image)

      await axios.patch(`${baseUrl}/movies/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      navigate("/")

      Toastify({
        text: "Image movie berhasil diubah",
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
  }, [id])

  return (
    <main className="min-h-screen bg-neutral-950 p-6">
      <h1 className="text-white text-lg font-semibold mb-5">
        Upload Image Movie
      </h1>

      <form onSubmit={handleSubmit} className="bg-neutral-900 p-5 max-w-xl">
        <p className="text-white mb-4">{movie.title}</p>

        {movie.imgUrl && (
          <img
            src={movie.imgUrl}
            alt={movie.title}
            className="w-48 h-64 object-cover mb-4"
          />
        )}

        <label className="block text-sm text-gray-400 mb-1">
          Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="bg-neutral-800 text-white p-2 w-full mb-4"
        />

        <Button text="Upload Image" />
      </form>
    </main>
  )
}

export default UploadImage
