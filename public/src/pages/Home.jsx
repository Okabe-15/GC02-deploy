import { useState } from 'react'
import axios from "axios";
import { baseUrl } from '../../../cms/src/constant/baseUrl';
import { useEffect } from 'react';
import Card from '../components/Card';
import Loading from '../assets/loading.gif'
import { useOutletContext } from "react-router"


function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const pagination = handlePage()
  const [sortBy, setSortBy] = useState("title")
  const [sort, setSort] = useState("ASC")
  const [filter, setFilter] = useState("")
  const [genres, setGenres] = useState([])
  const { search } = useOutletContext()

  console.log(pagination);

  function handlePage() {
    let result = []
    for (let i = 1; i <= totalPage; i++) {
      result.push(i)
    }

    return result

  }

  async function fetchMovie() {
    try {
      setLoading(true)
      const { data } = await axios.get(`${baseUrl}/pub/movies/?page=${currentPage}&search=${search}&filter=${filter}&sortBy=${sortBy}&sort=${sort}`)

      setMovies(data.data)
      setTotalPage(data.meta.totalPages)
      setCurrentPage(data.meta.currentPage)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  async function fetchGenre() {
    try {
      const { data } = await axios.get(`${baseUrl}/pub/genres`)

      setGenres(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  function handlePrev() {
    console.log("prev ditekan")
    console.log(currentPage)
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [search, currentPage, sortBy, sort, filter])

  useEffect(() => {
    fetchGenre()
  }, [])


  return (
    <>

      <div className="p-5">
        <h2 className="text-white text-xl mb-4">Daftar Movie</h2>

        <div className="flex gap-2 mb-5">
          <select
            className="p-2"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="">Semua Genre</option>

            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              )
            })}
          </select>

          <select
            className="p-2"
            onChange={(e) => {
              const [sortBy, sort] = e.target.value.split("-")

              setSortBy(sortBy)
              setSort(sort)
              setCurrentPage(1)
            }}
          >
            <option value="title-ASC">Judul A-Z</option>
            <option value="rating-DESC">Rating</option>
          </select>
        </div>

        <>
          {loading ? (
            <div className="flex justify-center mt-28">
              <img src={Loading} className="w-1/5" />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {movies.map((movie, index) => {
                return <Card movies={movie} index={index} key={movie.id} />
              })}
            </div>
          )}
        </>
        <div className="flex justify-center gap-2 mt-6">
          <button
            type='button'
            className="bg-neutral-700 text-white px-3 py-2 transition hover:bg-yellow-500 disabled:bg-yellow-500" onClick={handlePrev} disabled={currentPage === 1}>Previous</button>

          {pagination.map((page, index) => {
            return (
              <div key={index}>
                <button className={`bg-neutral-700 text-white px-3 py-2 ${page === currentPage ? "bg-yellow-500" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}


                </button>
              </div>
            )
          })}
          <button
            className="bg-neutral-700 text-white px-3 py-2 transition hover:bg-yellow-500 disabled:bg-yellow-500" onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
        </div>
      </div>
    </>
  )
}

export default Home