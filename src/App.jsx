import { useState, useEffect } from 'react';
import roverImg from './assets/rover.png';
function App() {
  const [map, setMap] = useState([]);
  const [grid, setGrid] = useState([12, 12]);
  const makeMap = (gridSize) => {
    let mapTemp = [];

    for (let row = gridSize[1] - 1; row >= 0; row--) {
      for (let col = 0; col < gridSize[0]; col++) {
        mapTemp.push(
          <div
            className="flex justify-center  rounded-lg"
            key={`${col} ${row}`}
          >
            {/* {`${col} ${row}`} */}
            {/* <img src={roverImg} alt="" className="E" /> */}
          </div>
        );
      }
    }
    setMap(mapTemp);
  };

  useEffect(() => {
    makeMap(grid);
  }, []);

  return (
    <div className="App flex flex-col items-center h-screen max-h-screen">
      <div
        id="map"
        className={`h-4/5 w-full p-4 grid grid-cols-12 grid-rows-${grid[1]}`}
      >
        {/* <div className="flex justify-center">
          
        </div> */}

        {map}
      </div>
      <div
        id="controls"
        className="bg-white rounded-lg w-1/2 p-4 flex justify-between"
      >
        <label>
          Altura
          <input
            type="text"
            name=""
            id=""
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-20"
          />
        </label>

        <label>
          Largura
          <input
            type="text"
            name=""
            id=""
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-20"
          />
        </label>
        <label>
          Posição
          <input
            type="text"
            name=""
            id=""
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-32"
          />
        </label>
        <label>
          Instruções
          <input
            type="text"
            name=""
            id=""
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-32"
          />
        </label>

        <button className="bg-orange-500 py-2 px-5 rounded text-white">
          Mover
        </button>
      </div>
    </div>
  );
}

export default App;
