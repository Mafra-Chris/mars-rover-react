import { describe, expect, test } from 'vitest'
import Rover from './Rover'

describe('Rover receives landing position and instruction to move', () => {
  test('final position equal to 1 3 N', () => {
    let mars = new Rover('1 2 N')
    expect(mars.moveRover('LMLMLMLMM')).toBe('1 3 N');
  });
  test('final position equal to 2 3 S', () => {
    let mars = new Rover('3 3 E')
    expect(mars.moveRover('MRRMMRMRRM')).toBe('2 3 S');
  });

});