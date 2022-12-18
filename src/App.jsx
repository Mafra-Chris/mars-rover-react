import { useState, useEffect } from 'react';
import roverImg from './assets/rover.png';
import Rover from './rover/Rover';
import { roverSchema } from './validations/RoverMoves';
import { postMove } from './services/marsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [map, setMap] = useState([]);
  const [mars, setMars] = useState(new Rover());
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
            className="flex justify-center rounded-lg h-16 w-16 col-span-1 border border-orange-300"
            key={`${col} ${row}`}
          >
            {(mars.splitPosition[0] == col) & (mars.splitPosition[1] == row) ? (
              <img src={roverImg} alt="" className={mars.splitPosition[2]} />
            ) : (
              ''
            )}
          </div>
        );
      }
    }

    setMap(
      <div
        className={`grid gap-2 grid-cols-${mars.grid[0]} grid-rows-${mars.grid[1]}`}
      >
        {mapTemp}
      </div>
    );
  };

  const handleMove = async (event) => {
    event.preventDefault();

    let formData = {
      row: row,
      col: col,
      position: position,
      instructions: instructions,
    };
    const isValid = await roverSchema.isValid(formData);

    if (isValid) {
      try {
        mars.grid = [col, row];
        mars.setPosition(position);
        mars.moveRover(instructions);
        setPosition(mars.position);
        makeMap(mars.grid);
        await postMove(instructions);
      } catch (error) {
        toast.error(error.message);
      }
    }

    //enviar para db
  };

  useEffect(() => {
    makeMap(mars.grid);
  }, [mars.grid]);

  return (
    <div className="App flex flex-col items-center min-h-screen pb-4 gap-4">
      <ToastContainer />
      <div id="map-container" className=" px-4 grow py-2">
        {map}
      </div>
      <form
        id="controls"
        onSubmit={handleMove}
        className="bg-white rounded-lg lg:w-1/2 p-4 flex flex-wrap justify-between gap-2 font-medium"
      >
        <label>
          Altura
          <input
            type="number"
            value={row}
            min={1}
            max={8}
            onChange={(e) => setRow(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-20"
            required
          />
        </label>

        <label>
          Largura
          <input
            type="number"
            min={1}
            max={10}
            value={col}
            onChange={(e) => setCol(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-20"
            required
          />
        </label>
        <label>
          Posição
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-32"
            required
          />
        </label>
        <label>
          Instruções
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="p-2 border border-gray-600 bg-gray-200 rounded outline-none shadow-lg block w-32"
            required
          />
        </label>
        <div className="flex flex-col justify-end">
          <button
            className="bg-orange-500 py-2 px-5 rounded text-white "
            type="submit"
          >
            Mover
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
