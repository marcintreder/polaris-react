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

export function Colors(theme: Theme) {
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
    branded = defaultRoleValues.branded,
    critical = defaultRoleValues.critical,
    warning = defaultRoleValues.warning,
    highlight = defaultRoleValues.highlight,
    success = defaultRoleValues.success,
  } = colors;

  return customPropertiesTransformer({
    ...surfaceColors(surface),
    ...onSurfaceColors(onSurface),
    ...interactiveColors(interactive),
    ...interactiveNeutralColors(onSurface),
    ...brandedColors(branded),
    ...criticalColors(critical),
    ...warningColors(warning),
    ...highlightColors(highlight),
    ...successColors(success),
  });

  function surfaceColors(baseColor: string): CSSProperties {
    const hslBaseColor = colorToHsla(baseColor) as HSLColor;
    const {hue, saturation} = hslBaseColor;

    return {
      surface: hslToString(hslBaseColor),
      surfaceBackground: hslToString({
        hue,
        saturation,
        // TODO: Should the dark version be 0 lightness to save battery?
        lightness: isLightTheme ? 98 : 7,
      }),
      surfaceForeground: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 100 : 13,
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

  function onSurfaceColors(baseColor: string): CSSProperties {
    const hslBaseColor = colorToHsla(baseColor) as HSLColor;
    const {hue, saturation} = hslBaseColor;

    return {
      onSurface: hslToString(hslBaseColor),
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
    const {hue, saturation} = hslBaseColor;

    return {
      interactive: hslToString(hslBaseColor),
      interactiveAction: hslToString({
        hue,
        saturation,
        lightness: 44,
      }),
      interactiveActionDisabled: hslToString({
        hue,
        saturation,
        lightness: 58,
      }),
      interactiveActionHovered: hslToString({
        hue,
        // was +7 saturation
        saturation,
        lightness: 37,
      }),
      interactiveActionMuted: hslToString({
        hue,
        saturation,
        lightness: 51,
      }),
      interactiveActionPressed: hslToString({
        hue,
        // was +7 saturation
        saturation,
        lightness: 31,
      }),
      interactiveFocus: hslToString({
        hue,
        saturation: saturation + 7,
        lightness: 58,
      }),
      interactiveSelected: hslToString({
        hue,
        // was +7 saturation
        saturation,
        lightness: 96,
      }),
      interactiveSelectedHovered: hslToString({
        hue,
        // was -30 saturation
        saturation,
        lightness: 89,
      }),
      interactiveSelectedPressed: hslToString({
        hue,
        // was -30 saturation
        saturation,
        lightness: 82,
      }),
    };
  }

  function interactiveNeutralColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    return {
      interactive: hslToString(hslBaseColor),
      interactiveNeutralElevation0: hslToString({
        hue,
        saturation,
        // TODO: Should the dark version be 0 lightness to save battery?
        lightness: isLightTheme ? 100 : 7,
      }),
      interactiveNeutralElevation1: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 94 : 13,
      }),
      interactiveNeutralElevation2: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 92 : 22,
      }),
      interactiveNeutralElevation3: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 86 : 29,
      }),
      interactiveNeutralElevation4: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 76 : 39,
      }),
      interactiveNeutralElevation5: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 66 : 49,
      }),
    };
  }

  function brandedColors(branded) {
    return {};
  }

  function criticalColors(critical) {
    // Critical/Divider: {hue: 0, saturation: 77, lightness: 52, alpha: 1}
    // Critical/Icon: {hue: 0, saturation: 77, lightness: 52, alpha: 1}
    // Critical/Surface: {hue: 0, saturation: 84, lightness: 88, alpha: 1}
    // Critical/SurfaceMuted: {hue: 0, saturation: 80, lightness: 98, alpha: 1}
    // Critical/Text: {hue: 0, saturation: 59, lightness: 30, alpha: 1}

    return {};
  }

  function warningColors(warning) {
    // Warning/Divider: {hue: 39, saturation: 100, lightness: 66, alpha: 1}
    // Warning/Icon: {hue: 39, saturation: 100, lightness: 66, alpha: 1}
    // Warning/Surface: {hue: 40, saturation: 100, lightness: 88, alpha: 1}
    // Warning/SurfaceMuted: {hue: 40, saturation: 100, lightness: 98, alpha: 1}
    // Warning/Text: {hue: 39, saturation: 100, lightness: 30, alpha: 1}

    return {};
  }

  function highlightColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    // Highlight/Divider: {hue: 173, saturation: 56.00000000000001, lightness: 57.99999999999999, alpha: 1}
    // Highlight/Icon: {hue: 173, saturation: 56.00000000000001, lightness: 57.99999999999999, alpha: 1}
    // Highlight/Surface: {hue: 170, saturation: 61, lightness: 88, alpha: 1}
    // Highlight/SurfaceMuted: {hue: 170, saturation: 60, lightness: 98, alpha: 1}
    // Highlight/Text: {hue: 173, saturation: 56.00000000000001, lightness: 30, alpha: 1}

    return {
      highlight: hslToString(hslBaseColor),
      highlightDivider: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 60 : 40,
      }),
      highlightIcon: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 60 : 40,
      }),
      highlightSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 88 : 12,
      }),
      highlightSurfaceMuted: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 98 : 2,
      }),
      highlightText: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 98 : 2,
      }),
    };
  }

  function successColors(success) {
    // Success/Divider: {hue: 165, saturation: 100, lightness: 25, alpha: 1}
    // Success/Icon: {hue: 165, saturation: 100, lightness: 25, alpha: 1}
    // Success/Surface: {hue: 162, saturation: 38, lightness: 88, alpha: 1}
    // Success/SurfaceMuted: {hue: 165, saturation: 40, lightness: 98, alpha: 1}
    // Success/Text: {hue: 164, saturation: 100, lightness: 15, alpha: 1}

    return {};
  }
}

// TODO: Type name here is weird, we should either really type this so only camelCase key names are valid in the argument
// or use a more generic name for this type
function customPropertiesTransformer(colors: CSSProperties): CSSProperties {
  return Object.entries(colors).reduce(
    (state, [key, value]) => ({
      ...state,
      [toCssCustomPropertySyntax(key)]: value,
    }),
    {},
  );
}

function toCssCustomPropertySyntax(camelCase: string) {
  return `--${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
}

const allColors = {
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
  'Dark/Elevation00': '#111213',
  'Dark/Elevation01': '#1F2225',
  'Dark/Elevation02': '#35383B',
  'Dark/Elevation03': '#484A4D',
  'Dark/Elevation04': '#606367',
};

console.log(
  Object.entries(allColors).reduce(
    (state, [key, value]) => ({...state, [key]: colorToHsla(value)}),
    {},
  ),
);
