import Button from "./Button"

function MovieForm({ title, submitLabel, form, genres, getFormData, handleSubmit }) {
  return (
    <form
      className="bg-neutral-900 p-5 max-w-xl"
      onSubmit={handleSubmit}
    >
      <h1 className="text-white text-lg font-semibold mb-5">{title}</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title"
            className="bg-neutral-800 text-white p-2 w-full"
            value={form.title}
            onChange={(event) => getFormData("title", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Synopsis
          </label>
          <input
            type="text"
            placeholder="Enter Synopsis"
            className="bg-neutral-800 text-white p-2 w-full"
            value={form.synopsis}
            onChange={(event) => getFormData("synopsis", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Trailer URL
          </label>
          <input
            type="text"
            placeholder="Enter Trailer URL"
            className="bg-neutral-800 text-white p-2 w-full"
            value={form.trailerUrl}
            onChange={(event) => getFormData("trailerUrl", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Enter Image URL"
            className="bg-neutral-800 text-white p-2 w-full"
            value={form.imgUrl}
            onChange={(event) => getFormData("imgUrl", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Rating
          </label>
          <input
            type="number"
            min={1}
            max={10}
            placeholder="Enter Rating"
            className="bg-neutral-800 text-white p-2 w-full"
            value={form.rating}
            onChange={(event) => getFormData("rating", +event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Genre
          </label>
          <select
            className="bg-neutral-800 text-white p-2 w-full"
            value={form.genreId}
            onChange={(event) => getFormData("genreId", +event.target.value)}
          >
            <option value={0} disabled>Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <Button text={submitLabel} />
      </div>
    </form>
  )
}

export default MovieForm
