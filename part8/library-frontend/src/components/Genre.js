const Genre = ({ genres, setGenre }) => (
  <div>
    {genres.map((genre) => (
      <button key={genre} onClick={() => setGenre(genre)}>
        {genre}
      </button>
    ))}
  </div>
)

export default Genre
