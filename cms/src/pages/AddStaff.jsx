import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import Toastify from "toastify-js"
import Button from "../components/Button"
import { baseUrl } from "../constant/baseUrl"

function AddStaff() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  })
  const navigate = useNavigate()

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

      await axios.post(`${baseUrl}/users/add-user`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      navigate("/")

      Toastify({
        text: "Staff berhasil ditambahkan",
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

  return (
    <main className="min-h-screen bg-neutral-950 p-6">
      <h1 className="text-white text-lg font-semibold mb-5">
        Add Staff
      </h1>

      <form onSubmit={handleSubmit} className="bg-neutral-900 p-5 max-w-xl">
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Username</label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => getFormData("username", e.target.value)}
            className="bg-neutral-800 text-white p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => getFormData("email", e.target.value)}
            className="bg-neutral-800 text-white p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => getFormData("password", e.target.value)}
            className="bg-neutral-800 text-white p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
          <input
            type="text"
            value={form.phoneNumber}
            onChange={(e) => getFormData("phoneNumber", e.target.value)}
            className="bg-neutral-800 text-white p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => getFormData("address", e.target.value)}
            className="bg-neutral-800 text-white p-2 w-full"
          />
        </div>

        <Button text="Add Staff" />
      </form>
    </main>
  )
}

export default AddStaff
