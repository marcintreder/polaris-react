import {Colors} from '../utils';

describe('Colors', () => {
  it('returns an object of css custom properties', () => {
    const theme = {colors: {branded: '#eeeeee'}};
    const colorScheme = Colors(theme);
    expect(colorScheme).toStrictEqual({});
  });
});
