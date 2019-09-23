import {colors} from '../utils';

describe('colors', () => {
  it('returns an object of css custom properties', () => {
    const theme = {colors: {branded: '#eeeeee'}};
    const colorScheme = colors(theme);
    expect(colorScheme).toStrictEqual({});
  });
});
