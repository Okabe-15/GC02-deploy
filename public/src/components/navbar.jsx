import logo from '../assets/logo.png'

function Navbar({setSearch}) {
    return (
        <>
 <nav className="bg-neutral-900 px-6 py-4">
  <div className="flex items-center">
    <div className="flex items-center gap-2">
      <img
        src={logo}
        className="h-8"
        alt="Issac Movie"
      />

      <h1 className="text-white text-lg font-semibold">
        Issac Movie
      </h1>
    </div>

    <div className="ml-auto">
      <input
        type="text"
        placeholder="Cari movie..."
        className="w-60 bg-neutral-800 border border-neutral-700 text-white px-3 py-2 text-sm outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>
</nav>
        </>
    )
}

export default Navbar


