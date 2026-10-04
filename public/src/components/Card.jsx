import { Link } from "react-router"

function Card( { movies } ) {
    return (
        <>
            <div className="bg-neutral-900 mb-4" key={movies.id}>
              <img
                src={movies.imgUrl}
                className="w-full h-48 object-cover"
              />

              <div className="p-3">
                <h3 className="text-white">{movies.title}</h3>
                <p className="text-yellow-400 mt-2">
                  Rating: {movies.rating}
                </p>

                <Link to={`detail/${movies.id}`} className="text-blue-400 text-sm">
                  Lihat Detail
                </Link>
              </div>
            </div>
        
        </>
    )
}

export default Card