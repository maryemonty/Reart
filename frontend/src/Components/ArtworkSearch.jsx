import { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";

function ArtworkSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Effettua una chiamata all'API per cercare le opere d'arte
      const response = await fetch(`API_ENDPOINT?title=${searchTerm}`);
      const data = await response.json();

      // Aggiorna i risultati della ricerca con i dati ottenuti
      setSearchResults(data);
    } catch (error) {
      console.error("Si è verificato un errore durante la ricerca:", error);
    }
  };

  return (
    <div>
      <div className="position-relative divSearch mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Inserisci il titolo del quadro"
        />
        <button className="position-absolute bg-transparent border-0" onClick={handleSearch}>
          <BsSearchHeart />
        </button>
      </div>

      <div>
        {/* Mostra i risultati della ricerca */}
        {searchResults.map((artwork) => (
          <div key={artwork.id}>
            <h3>{artwork.title}</h3>
            <p>{artwork.artist}</p>
            {/* Mostra altre informazioni sull'opera d'arte */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtworkSearch;
