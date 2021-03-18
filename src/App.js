import React, { Fragment, useState, useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'


function App() {

    const [busqueda, setBusqueda] = useState({    // Estado del formulario
        ciudad: '',
        pais: ''
    });
    const [consultar, setConsultar] = useState(false)    // Estado para saber cuando hacer la consulta a la API
    const [resultado, setResultado] = useState({})
    const [error, setError] = useState(false)


    const { ciudad, pais } = busqueda;    // extraer ciudad y pais


    // detecta los cambios que le pases como dependencias, en este caso ciudad y pais
    useEffect(() => {
      const consultarAPI = async () => {
        
        if(consultar){
          const appId = '80e01be77dc4c51513cf2c4712b0368f';
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          setResultado(resultado);
          setConsultar(false);

          if(resultado.cod === '404'){
            setError(true);
          } else{
            setError(false);
          }
        }
      }

      consultarAPI();
      // eslint-disable-next-line
    }, [consultar]);

    let componente;
    if(error){
      componente = <Error mensaje="No hay resultados"/>
    } else{
      componente =  <Clima
                      resultado={resultado}
                    />
    }

  return (
    <Fragment>
    <Header
      titulo="[ Clima React App ]...brandonVargas"
    />
    <div className="contenedor-form">
      <div className="container">
       <div className="row">
          <div className="col m6 s12">
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </div>
          <div className="col m6 s12">
              {componente}
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
