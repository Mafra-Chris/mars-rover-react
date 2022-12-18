export default class Rover {

  constructor(landingPosition = '0 0 N', grid = [5, 5]) {

    this.position = landingPosition
    this.splitPosition = this.position.split(' ');
    this.xAxisRover = this.splitPosition[0]
    this.yAxisRover = this.splitPosition[1]
    this.faceDirectionRover = this.splitPosition[2]
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

    this.setPosition(`${this.xAxisRover} ${this.yAxisRover} ${this.faceDirectionRover}`)

    //return `${this.xAxisRover} ${this.yAxisRover} ${this.faceDirectionRover}`
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
        if (this.yAxisRover < this.grid[1] - 1) {
          this.yAxisRover++
        }
        break;
      case 'E':
        if (this.xAxisRover < this.grid[0] - 1) {
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


  setPosition(newPosition) {
    this.position = newPosition
    this.splitPosition = this.position.split(' ');
    this.xAxisRover = this.splitPosition[0]
    this.yAxisRover = this.splitPosition[1]
    this.faceDirectionRover = this.splitPosition[2]
  }

}



