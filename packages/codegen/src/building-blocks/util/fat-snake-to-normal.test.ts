import { fatSnakeToNormal } from './fat-snake-to-normal';
import {expect} from "chai";

describe('fatSnakeToNormal()', () => {
  it('replaces FAT_SNAKE_CASE with Normal text', () => {
    expect(fatSnakeToNormal('ABC_DEF')).eq('Abc def');
  });
});