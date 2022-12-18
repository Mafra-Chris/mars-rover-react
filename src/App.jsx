import { useState, useEffect } from 'react';
import roverImg from './assets/rover.png';
import Rover from './rover/Rover';
function App() {
  const [map, setMap] = useState([]);
  const [mars, setMars] = useState(new Rover());
  const [gridElements, setGridElements] = useState([]);
  const [col, setCol] = useState(mars.grid[0]);
  const [row, setRow] = useState(mars.grid[1]);
  const [position, setPosition] = useState(mars.position);
  const [instructions, setInstructions] = useState('');

  const makeMap = (gridSize) => {
    let mapTemp = [];

    for (let row = gridSize[1] - 1; row >= 0; row--) {
      for (let col = 0; col < gridSize[0]; col++) {
        mapTemp.push(
          <div
            className="flex justify-center rounded-lg h-16 w-16 col-span-1 border border-orange-400"
            key={`${col} ${row}`}
          >
            {`${col} ${row}`}

            {(mars.splitPosition[0] == col) & (mars.splitPosition[1] == row) ? (
              <img src={roverImg} alt="" className={mars.splitPosition[2]} />
            ) : (
              ''
            )}
          </div>
        );
      }
    }
    setGridElements();
    setMap(
      <div
        className={
          'grid gap-2 ' +
          'grid-cols-' +
          mars.grid[0] +
          ' ' +
          'grid-rows-' +
          mars.grid[1]
        }
      >
        {mapTemp}
      </div>
    );
  };

  const handleMove = () => {
    //validate

    mars.grid = [col, row];
    mars.setPosition(position);
    mars.moveRover(instructions);
    setPosition(mars.position);

    makeMap(mars.grid);
    //enviar para db
  };

  useEffect(() => {
    makeMap(mars.grid);
  }, [mars.grid]);

  return (
    <div className="App flex flex-col items-center">
      <div id="map-container" className=" h-screen px-4">
        {map}
      </div>
      <div
        id="controls"
        className="bg-white rounded-lg lg:w-1/2 p-4 flex flex-wrap justify-between gap-2 fixed bottom-4"
      >
        <label>
          Altura
          <input
            type="text"
            name=""
            id=""
            value={row}
            onChange={(e) => setRow(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-20"
          />
        </label>

        <label>
          Largura
          <input
            type="text"
            name=""
            id=""
            value={col}
            onChange={(e) => setCol(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-20"
          />
        </label>
        <label>
          Posição
          <input
            type="text"
            name=""
            id=""
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-32"
          />
        </label>
        <label>
          Instruções
          <input
            type="text"
            name=""
            id=""
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-32"
          />
        </label>
        <div className="flex flex-col justify-end">
          <button
            className="bg-orange-500 py-2 px-5 rounded text-white "
            onClick={handleMove}
          >
            Mover
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
