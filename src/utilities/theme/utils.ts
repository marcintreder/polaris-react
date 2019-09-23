import {HSLColor, HSLAColor} from '../color-types';
import {colorToHsla, hslToString, hslToRgb} from '../color-transformers';
import {isLight} from '../color-validation';
import {CSSProperties, Theme} from './types';

// TODO: Pull from polaris-tokens
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

export function colors(theme: Theme) {
  const {colors = {}} = theme;

  const isLightTheme = isLight(
    hslToRgb(colorToHsla(
      colors == null || colors.surface == null
        ? defaultRoleValues.surface
        : colors.surface,
    ) as HSLColor),
  );

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

  return customPropertiesTransformer({
    ...surfaceColors(surface, isLightTheme),
    ...onSurfaceColors(onSurface, isLightTheme),
    ...interactiveColors(interactive),
    ...interactiveNeutralColors(interactiveNeutral),
    ...brandedColors(branded),
    ...criticalColors(critical),
    ...warningColors(warning),
    ...highlightColors(highlight),
    ...successColors(success),
  });
}

function surfaceColors(
  baseColor: string,
  isLightTheme: boolean,
): CSSProperties {
  const hslBaseColor = colorToHsla(baseColor) as HSLColor;
  const {hue, saturation} = hslBaseColor;

  return {
    surfaceBackground: hslToString({
      hue,
      saturation,
      lightness: isLightTheme ? 98 : 2,
    }),
    surfaceForeground: hslToString({
      hue,
      saturation,
      lightness: isLightTheme ? 100 : 0,
    }),
    surfaceForegroundSubdued: hslToString({
      hue,
      saturation,
      lightness: isLightTheme ? 90 : 10,
    }),
    surfaceOpposite: hslToString({
      hue,
      saturation,
      lightness: isLightTheme ? 0 : 100,
    }),
  };
}

function onSurfaceColors(
  baseColor: string,
  isLightTheme: boolean,
): CSSProperties {
  const hslBaseColor = colorToHsla(baseColor) as HSLColor;
  const {hue, saturation} = hslBaseColor;

  return {
    iconOnSurface: hslToString({
      hue,
      saturation,
      lightness: isLightTheme ? 98 : 2,
    }),
    iconDisabledOnSurface: hslToString({
      hue,
      saturation,
      lightness: isLightTheme ? 98 : 2,
    }),
  };
}

function interactiveColors(baseColor: string): CSSProperties {
  const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
  const {hue, saturation, lightness} = hslBaseColor;

  return {
    interactiveAction: hslToString(hslBaseColor),
    interactiveActionDisabled: hslToString({
      hue,
      saturation,
      lightness: lightness + 14,
    }),
    interactiveActionHovered: hslToString({
      hue,
      saturation: saturation + 7,
      lightness: lightness - 7,
    }),
    interactiveActionMuted: hslToString({
      hue,
      saturation,
      lightness: lightness + 7,
    }),
    interactiveActionPressed: hslToString({
      hue,
      saturation: saturation + 7,
      lightness: lightness - 13,
    }),
    interactiveFocus: hslToString({
      hue,
      saturation: saturation + 7,
      lightness: lightness + 14,
    }),
    interactiveSelected: hslToString({
      hue,
      saturation: saturation + 7,
      lightness: lightness + 52,
    }),
    interactiveSelectedHovered: hslToString({
      hue,
      saturation: saturation - 30,
      lightness: lightness + 45,
    }),
    interactiveSelectedPressed: hslToString({
      hue,
      saturation: saturation - 30,
      lightness: lightness + 38,
    }),
  };
}

function interactiveNeutralColors(interactiveNeutral) {
  return {};
}

function brandedColors(branded) {
  return {};
}

function criticalColors(critical) {
  return {};
}

function warningColors(warning) {
  return {};
}

function highlightColors(highlight) {
  return {};
}

function successColors(success) {
  return {};
}

// TODO: Type name here is weird, we should either really type this so only camelCase key names are valid in the argument
// or use a more generic name for this type
function customPropertiesTransformer(colors: CSSProperties): CSSProperties {
  const transformedColors: CSSProperties = {};

  Object.keys(colors).map((key) => {
    transformedColors[toCssCustomPropertySyntax(key)] = colors[key];
  });

  return transformedColors;
}

function toCssCustomPropertySyntax(camelCase: string) {
  return `--${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
}

const allColors: any = {
  'Surface/Background': '#FAFAFA',
  'Surface/Foreground': '#FFFFFF',
  'Surface/ForegroundMuted': '#E6E6E6',
  'Surface/Foreground/Opposite': '#050505',
  'Icon/OnSurface': '#2B2B31',
  'Text/OnSurface': '#1F1F25',
  'ActionDisabled/OnSurface': '#6B7580',
  'Action/OnSurface': '#545C64',
  'ActionHovered/OnSurface': '#3D4248',
  'ActionPressed/OnSurface': '#25282C',
  'DividerMuted/OnSurface': '#D3D9DE',
  'Divider/OnSurface': '#B6BFC9',
  'DividerDisabled/OnSurface': '#F0F2F4',
  'IconDisabled/OnSurface': '#A8A8B3',
  'TextDisabled/OnSurface': '#9A9AA7',
  'IconMuted/OnSurface': '#666675',
  'TextMuted/OnSurface': '#5A5A68',
  'Text/OnOpposite': '#FFFFFF',
  'Icon/OnOpposite': '#F8F8FA',
  'ActionDisabled/OnOpposite': '#A1A8B0',
  'Action/OnOpposite': '#BCC2C7',
  'ActionHovered/OnOpposite': '#D8DBDE',
  'ActionPressed/OnOpposite': '#F4F5F6',
  'IconDisabled/OnOpposite': '#B8B4CA',
  'TextDisabled/OnOpposite': '#C3C3D5',
  'IconMuted/OnOpposite': '#DBDBE6',
  'TextMuted/OnOpposite': '#E1E1EA',
  'Divider/OnOpposite': '#C4CCD4',
  'DividerMuted/OnOpposite': '#B6C0C8',
  'DividerDisabled/OnOpposite': '#A7B3BE',
  'Icon/OnDark': '#F8F8FA',
  'Text/OnDark': '#FFFFFF',
  'IconDisabled/OnDark': '#B8B4CA',
  'TextDisabled/OnDark': '#C3C3D5',
  'IconMuted/OnDark': '#DBDBE6',
  'TextMuted/OnDark': '#E1E1EA',
  'Icon/OnLight': '#2B2B31',
  'Text/OnLight': '#202024',
  'IconDisabled/OnLight': '#5A5A68',
  'TextDisabled/OnLight': '#4E4E5A',
  'IconMuted/OnLight': '#42424C',
  'TextMuted/OnLight': '#37373F',
  'InteractiveNeutral/Elevation00': '#FFFFFF',
  'InteractiveNeutral/Elevation01': '#EFEFF0',
  'InteractiveNeutral/Elevation02': '#EAEAEB',
  'InteractiveNeutral/Elevation03': '#D9D9DC',
  'InteractiveNeutral/Elevation04': '#C2C2C3',
  'InteractiveNeutral/Elevation05': '#A8A8A9',
  'Interactive/Selected': '#EAF5FF',
  'Interactive/SelectedHovered': '#D3E4F5',
  'Interactive/Focus': '#2A94FF',
  'Interactive/Action': '#0870D9',
  'Interactive/ActionHovered': '#005DBB',
  'Interactive/ActionPressed': '#004F9E',
  'Interactive/SelectedPressed': '#B4D1EE',
  'Interactive/ActionDisabled': '#3094F8',
  'Interactive/ActionMuted': '#0E81F6',
  'Branded/Selected': '#F0F7F5',
  'Branded/SelectedHovered': '#C5DAD5',
  'Branded/Action': '#008060',
  'Branded/ActionHovered': '#006E53',
  'Branded/ActionPressed': '#004C39',
  'Branded/OnIconMuted': '#DBDBE6',
  'Branded/OnTextMuted': '#E1E1EA',
  'Branded/OnIcon': '#F8F8FA',
  'Branded/OnText': '#FFFFFF',
  'Branded/SelectedPressed': '#AECBC4',
  'Branded/ActionDisabled': '#00A37A',
  'Critical/SurfaceMuted': '#FEF6F6',
  'Critical/Icon': '#E32727',
  'Critical/Text': '#7A1F1F',
  'Critical/Divider': '#E32727',
  'Critical/Surface': '#FAC7C7',
  'Warning/SurfaceMuted': '#FFFCF6',
  'Warning/Icon': '#FFC453',
  'Warning/Text': '#996300',
  'Warning/Divider': '#FFC453',
  'Warning/Surface': '#FFEBC2',
  'Highlight/Surface': '#CEF3ED',
  'Highlight/Icon': '#59D0C2',
  'Highlight/Text': '#22776D',
  'Highlight/Divider': '#59D0C2',
  'Highlight/SurfaceMuted': '#F7FDFC',
  'Success/Surface': '#D5ECE5',
  'Success/Icon': '#008060',
  'Success/Text': '#004D39',
  'Success/Divider': '#008060',
  'Success/SurfaceMuted': '#F8FCFB',
};

const allColorsHsl: any = {};

Object.keys(allColors).map((key) => {
  allColorsHsl[key] = colorToHsla(allColors[key]);
});

console.log(allColorsHsl);
