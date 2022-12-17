
export default function Rover(instruction, landingPosition = '0 0 N', grid = [10, 10]) {
  const individualInstructions = instruction.split("");

  const position = landingPosition.split(' ');
  let xAxisRover = position[0]
  let yAxisRover = position[1]
  let faceDirectionRover = position[2]

  function moveRover(instructions) {
    instructions.forEach(instruction => {
      if (instruction === 'M') {
        moveFoward(faceDirectionRover)
      } else if (instruction === 'L' || instruction === 'R') {
        faceDirectionRover = turnRover(instruction)
      } else {
        throw new Error(
          'Instrução não reconhecida!'
        )
      }
    });
  }

  function turnRover(direction) {
    const cardinalsD = ['N', 'E', 'S', 'W']
    let cardinalNumber = cardinalsD.indexOf(faceDirectionRover)
    if (direction === 'L') {
      return cardinalsD[(cardinalNumber + 4 - 1) % 4];
    } else if (direction === 'R') {
      return cardinalsD[(cardinalNumber + 1) % 4];
    } else {
      throw new Error(
        'Erro ao direcionar Rover!'
      )
    }

  }

  function moveFoward(direction) {

    switch (direction) {
      case 'N':
        if (yAxisRover < grid[1]) {
          yAxisRover++
        }
        break;
      case 'E':
        if (xAxisRover < grid[0]) {
          xAxisRover++
        }
        break
      case 'S':
        if (yAxisRover > 0) {
          yAxisRover--
        }

        break;

      case 'W':
        if (xAxisRover > 0) {
          xAxisRover--
        }

        break;
      default:
        throw new Error(
          'Erro ao mover Rover!'
        )
    }

  }

  moveRover(individualInstructions)

  return `${xAxisRover} ${yAxisRover} ${faceDirectionRover}`
}



