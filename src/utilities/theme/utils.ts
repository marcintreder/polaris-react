import {HSLColor} from '../color-types';
import {
  colorToHsla,
  hslToString,
  hslToRgb,
} from '../color-transformers';
import {isLight} from '../color-validation';

import {CSSProperties, Theme} from './types';

const defaultRoleValues = {
  surface: '#FAFAFA',
  onSurface: '#202024',
  interactiveNeutral: '#EAEAEB',
  interactive: '#0870D9',
  branded: '#008060',
  critical: '#E32727',
  warning: '#FFC453',
  highlight: '#59D0C2',
  success: '#008060',
};

const alpha = 1.0;

export function setColors(theme: Theme) {
  return customPropertiesTransformer(new ColorFactory(theme).colors);
}

function customPropertiesTransformer(colors: CSSProperties): CSSProperties {
  const transformedColors: CSSProperties = {};

  Object.keys(colors).map((value) => {
    transformedColors[toCssCustomPropertySyntax(value)] = colors[value];
  });

  return transformedColors;
}

function toCssCustomPropertySyntax(key: string) {
  return `--${key.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
}

class ColorFactory {
  colors: CSSProperties = {};

  private isLightTheme: boolean;

  constructor(theme: Theme) {
    const {colors} = theme;
    const surface =
      colors == null || colors.surface == null
        ? defaultRoleValues.surface
        : colors.surface;

    this.setColors(theme);
    this.isLightTheme = isLight(hslToRgb(colorToHsla(surface) as HSLColor));
  }

  private setColors(theme: Theme): void {
    const {colors = {}} = theme;
    const {surfaceColors, onSurfaceColors} = this;
    const {
      surface = defaultRoleValues.surface,
      onSurface = defaultRoleValues.onSurface,
      interactive = defaultRoleValues.interactive,
      interactiveNeutral = defaultRoleValues.interactiveNeutral,
      branded = defaultRoleValues.branded,
      critical = defaultRoleValues.critical,
      warning = defaultRoleValues.warning,
      highlight = defaultRoleValues.highlight,
      success = defaultRoleValues.success,
    } = colors;

    this.colors = {
      ...surfaceColors(surface),
      ...onSurfaceColors(onSurface),
    };
  }

  private surfaceColors = (baseColor: string): CSSProperties => {
    const {isLightTheme} = this;
    const hslBaseColor = colorToHsla(baseColor) as HSLColor;
    const colorRole = 'surface';

    return {
      [`${colorRole}Background`]: hslToString({
        hue: hslBaseColor.hue,
        saturation: hslBaseColor.saturation,
        lightness: isLightTheme ? 98 : 2,
        alpha,
      }),
      [`${colorRole}Foreground`]: hslToString({
        hue: hslBaseColor.hue,
        saturation: hslBaseColor.saturation,
        lightness: isLightTheme ? 100 : 0,
        alpha,
      }),
      [`${colorRole}ForegroundSubdued`]: hslToString({
        hue: hslBaseColor.hue,
        saturation: hslBaseColor.saturation,
        lightness: isLightTheme ? 90 : 10,
        alpha,
      }),
      [`${colorRole}Opposite`]: hslToString({
        hue: hslBaseColor.hue,
        saturation: hslBaseColor.saturation,
        lightness: isLightTheme ? 0 : 100,
        alpha,
      }),
    };
  };

  private onSurfaceColors = (baseColor: string): CSSProperties => {
    const {isLightTheme} = this;
    const hslBaseColor = colorToHsla(baseColor) as HSLColor;
    const colorRole = 'text';

    return {
      [`Icon${colorRole}`]: hslToString({
        hue: hslBaseColor.hue,
        saturation: hslBaseColor.saturation,
        lightness: isLightTheme ? 98 : 2,
        alpha,
      }),
      [`IconDisabled${colorRole}`]: hslToString({
        hue: hslBaseColor.hue,
        saturation: hslBaseColor.saturation,
        lightness: isLightTheme ? 98 : 2,
        alpha,
      }),
  }
}
