import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [universidades, setUniversidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerUniversidades = async () => {
      try {
        const respuesta = await axios.get('/api/universities');
        setUniversidades(respuesta.data);
        setCargando(false);
      } catch (err) {
        console.error('Error:', err);
        setError(`Error al cargar las universidades: ${err.message}`);
        setCargando(false);
      }
    };
    
    obtenerUniversidades();
  }, []);

 
  const universitadesFiltradas = universidades.filter((uni) =>
    uni.name.toLowerCase().includes(busqueda.toLowerCase())
  );


  const recargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await axios.get('/api/universities');
      setUniversidades(respuesta.data);
      setCargando(false);
    } catch (err) {
      console.error('Error:', err);
      setError(`Error al cargar las universidades: ${err.message}`);
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <h1 className="titulo">PC3 - React</h1>
      <div className="pregunta">
        <h2>Pregunta 1</h2>

        <p>
          Universidades de Perú - API CONSUMIDA
        </p>

   
        {cargando && <p>Cargando universidades...</p>}
        {error && <p style={{ color: '#d32f2f' }}>{error}</p>}
        
        {universidades.length > 0 && (
          <div>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Buscar universidad por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button 
                onClick={recargarDatos} 
                className="btn-recargar"
                disabled={cargando}
              >
                {cargando ? 'Recargando...' : ' Recargar'}
              </button>
            </div>
            
            <h3>
              Total de universidades encontradas: {universitadesFiltradas.length} / {universidades.length}
            </h3>
            
            {universitadesFiltradas.length === 0 ? (
              <p style={{ color: '#999' }}>No se encontraron universidades con ese nombre</p>
            ) : (
              <ul>
                {universitadesFiltradas.map((uni, index) => (
                  <li key={index}>
                    <strong>{uni.name}</strong>
                    {uni.domains && uni.domains[0] && <p>Dominio: {uni.domains[0]}</p>}
                    {uni.web_pages && uni.web_pages[0] && <p>Web: <a href={uni.web_pages[0]} target="_blank" rel="noopener noreferrer">{uni.web_pages[0]}</a></p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;