
export default class Rover {

  constructor(landingPosition = '0 0 N', grid = [10, 10]) {
    const position = landingPosition.split(' ');
    this.xAxisRover = position[0]
    this.yAxisRover = position[1]
    this.faceDirectionRover = position[2]
    this.grid = grid
  }


  moveRover(instructions) {
    const individualInstructions = instructions.split("");
    individualInstructions.forEach(instruction => {
      if (instruction === 'M') {
        this.moveFoward(this.faceDirectionRover)
      } else if (instruction === 'L' || instruction === 'R') {
        this.faceDirectionRover = this.turnRover(instruction)
      } else {
        throw new Error(
          'Instrução não reconhecida!'
        )
      }
    });

    return `${this.xAxisRover} ${this.yAxisRover} ${this.faceDirectionRover}`
  }

  turnRover(direction) {
    const cardinalsD = ['N', 'E', 'S', 'W']
    let cardinalNumber = cardinalsD.indexOf(this.faceDirectionRover)
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

  moveFoward(direction) {

    switch (direction) {
      case 'N':
        if (this.yAxisRover < this.grid[1]) {
          this.yAxisRover++
        }
        break;
      case 'E':
        if (this.xAxisRover < this.grid[0]) {
          this.xAxisRover++
        }
        break
      case 'S':
        if (this.yAxisRover > 0) {
          this.yAxisRover--
        }

        break;

      case 'W':
        if (this.xAxisRover > 0) {
          this.xAxisRover--
        }

        break;
      default:
        throw new Error(
          'Erro ao mover Rover!'
        )
    }

  }




}



