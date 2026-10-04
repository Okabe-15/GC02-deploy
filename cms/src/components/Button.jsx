function Button({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-yellow-500 text-black px-4 py-2"
    >
      {text}
    </button>
  )
}

export default Button
