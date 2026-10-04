import { useState } from "react"
import logo from "../assets/logo.png"
import axios from 'axios'
import { baseUrl } from "../constant/baseUrl"
import { useNavigate } from "react-router"
import Toastify from 'toastify-js'
import Button from "../components/Button"


function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    try {
        const {data} = await axios.post(`${baseUrl}/users/login`, {email, password})

        console.log(data.access_token)

        localStorage.setItem("token", data.access_token)

        navigate('/')

         Toastify({
                text: "Login success",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#34D399",
                    color: "#000000"
                },
            }).showToast();

    } catch (error) {
          Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#F87171",
                    color: "#000000"
                }
            }).showToast();
    }
  }

  return (
    <>
    <div className="bg-black min-h-screen flex items-center justify-center">

      <div className="w-full max-w-sm bg-[#111111] p-8">

        <div className="flex items-center justify-center gap-2 mb-8">
          <img
            src={logo}
            className="h-10"
            alt="Issac Movie"
          />

          <span className="text-white text-xl font-semibold">
            Issac Movie
          </span>
        </div>

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block text-sm text-neutral-400 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@issacmovie.com"
              className="w-full px-3 py-2 bg-neutral-800 text-white text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-neutral-400 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              className="w-full px-3 py-2 bg-neutral-800 text-white text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button text="Login" />

        </form>

      </div>

    </div>
    </>

  )
}

export default Login
