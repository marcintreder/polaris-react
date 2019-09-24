import {HSLColor, HSLAColor} from '../color-types';
import {colorToHsla, hslToString, hslToRgb} from '../color-transformers';
import {isLight} from '../color-validation';
import {CSSProperties, Theme} from './types';

// TODO: Pull from polaris-tokens
enum DefaultColor {
  Surface = '#FAFAFA',
  OnSurface = '#1F2225',
  InteractiveNeutral = '#EAEAEB',
  Interactive = '#0870D9',
  Branded = '#008060',
  Critical = '#E32727',
  Warning = '#FFC453',
  Highlight = '#59D0C2',
  Success = '#008060',
}

export function Colors(theme: Theme) {
  const {colors = {}} = theme;

  const isLightTheme = isLight(
    hslToRgb(colorToHsla(
      colors == null || colors.surface == null
        ? DefaultColor.Surface
        : colors.surface,
    ) as HSLColor),
  );

  const {
    surface = DefaultColor.Surface,
    onSurface = DefaultColor.OnSurface,
    interactive = DefaultColor.Interactive,
    branded = DefaultColor.Branded,
    critical = DefaultColor.Critical,
    warning = DefaultColor.Warning,
    highlight = DefaultColor.Highlight,
    success = DefaultColor.Success,
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
      actionOnDark: hslToString({
        hue,
        saturation,
        lightness: 76,
      }),
      actionOnLight: hslToString({
        hue,
        saturation,
        lightness: 36,
      }),
      actionOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 76 : 36,
      }),
      actionOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 36 : 76,
      }),
      actionDisabledOnDark: hslToString({
        hue,
        saturation,
        lightness: 66,
      }),
      actionDisabledOnLight: hslToString({
        hue,
        saturation,
        lightness: 46,
      }),
      actionDisabledOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 66 : 46,
      }),
      actionDisabledOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 46 : 66,
      }),
      actionHoveredOnDark: hslToString({
        hue,
        saturation,
        lightness: 86,
      }),
      actionHoveredOnLight: hslToString({
        hue,
        saturation,
        lightness: 26,
      }),
      actionHoveredOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 86 : 26,
      }),
      actionHoveredOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 26 : 86,
      }),
      actionPressedOnDark: hslToString({
        hue,
        saturation,
        lightness: 96,
      }),
      actionPressedOnLight: hslToString({
        hue,
        saturation,
        lightness: 16,
      }),
      actionPressedOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 96 : 16,
      }),
      actionPressedOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 16 : 96,
      }),
      dividerOnDark: hslToString({
        hue,
        saturation,
        lightness: 80,
      }),
      dividerOnLight: hslToString({
        hue,
        saturation,
        lightness: 75,
      }),
      dividerOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 80 : 75,
      }),
      dividerOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 75 : 80,
      }),
      dividerDisabledOnDark: hslToString({
        hue,
        saturation,
        lightness: 70,
      }),
      dividerDisabledOnLight: hslToString({
        hue,
        saturation,
        lightness: 95,
      }),
      dividerDisabledOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 70 : 95,
      }),
      dividerDisabledOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 95 : 70,
      }),
      dividerMutedOnDark: hslToString({
        hue,
        saturation,
        lightness: 75,
      }),
      dividerMutedOnLight: hslToString({
        hue,
        saturation,
        lightness: 85,
      }),
      dividerMutedOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 75 : 85,
      }),
      dividerMutedOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 85 : 75,
      }),
      iconOnDark: hslToString({
        hue,
        saturation,
        lightness: 98,
      }),
      iconOnLight: hslToString({
        hue,
        saturation,
        lightness: 18,
      }),
      iconOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 98 : 18,
      }),
      iconOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 18 : 98,
      }),
      iconDisabledOnDark: hslToString({
        hue,
        saturation,
        lightness: 75,
      }),
      iconDisabledOnLight: hslToString({
        hue,
        saturation,
        lightness: 68,
      }),
      iconDisabledOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 75 : 68,
      }),
      iconDisabledOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 68 : 75,
      }),
      iconMutedOnDark: hslToString({
        hue,
        saturation,
        lightness: 88,
      }),
      iconMutedOnLight: hslToString({
        hue,
        saturation,
        lightness: 43,
      }),
      iconMutedOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 88 : 43,
      }),
      iconMutedOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 43 : 88,
      }),
      textOnDark: hslToString({
        hue,
        saturation,
        lightness: 100,
      }),
      textOnLight: hslToString({
        hue,
        saturation,
        lightness: 13,
      }),
      textOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 100 : 13,
      }),
      textOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 13 : 100,
      }),
      textDisabledOnDark: hslToString({
        hue,
        saturation,
        lightness: 80,
      }),
      textDisabledOnLight: hslToString({
        hue,
        saturation,
        lightness: 63,
      }),
      textDisabledOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 80 : 63,
      }),
      textDisabledOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 63 : 80,
      }),
      textMutedOnDark: hslToString({
        hue,
        saturation,
        lightness: 90,
      }),
      textMutedOnLight: hslToString({
        hue,
        saturation,
        lightness: 38,
      }),
      textMutedOnOpposite: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 90 : 38,
      }),
      textMutedOnSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 38 : 90,
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
        lightness: isLightTheme ? 44 : 56,
      }),
      interactiveActionDisabled: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 58 : 42,
      }),
      interactiveActionHovered: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 37 : 63,
      }),
      interactiveActionMuted: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 51 : 49,
      }),
      interactiveActionPressed: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 31 : 69,
      }),
      interactiveFocus: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 58 : 42,
      }),
      interactiveSelected: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 96 : 4,
      }),
      interactiveSelectedHovered: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 89 : 11,
      }),
      interactiveSelectedPressed: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 82 : 18,
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

  function brandedColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    return {
      branded: hslToString(hslBaseColor),
      brandedAction: hslToString({
        hue,
        saturation,
        lightness: 25,
      }),
      brandedActionDisabled: hslToString({
        hue,
        saturation,
        lightness: 32,
      }),
      brandedActionHovered: hslToString({
        hue,
        saturation,
        lightness: 22,
      }),
      brandedActionPressed: hslToString({
        hue,
        saturation,
        lightness: 15,
      }),
      iconOnBranded: hslToString({
        hue,
        saturation,
        lightness: 98,
      }),
      iconMutedOnBranded: hslToString({
        hue,
        saturation,
        lightness: 88,
      }),
      textOnBranded: hslToString({
        hue,
        saturation,
        lightness: 100,
      }),
      textMutedOnBranded: hslToString({
        hue,
        saturation,
        lightness: 90,
      }),

      // TODO: Audit these branded selected colors.
      // Only did variable lightness here as it is used for nav and tabs.
      brandedSelected: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 95 : 5,
      }),
      brandedSelectedHovered: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 81 : 19,
      }),
      brandedSelectedPressed: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 74 : 26,
      }),
    };
  }

  function criticalColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    return {
      critical: hslToString(hslBaseColor),
      criticalDivider: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 52 : 48,
      }),
      criticalIcon: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 52 : 48,
      }),
      criticalSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 88 : 12,
      }),
      criticalSurfaceMuted: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 98 : 2,
      }),
      criticalText: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 30 : 70,
      }),
    };
  }

  function warningColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    return {
      warning: hslToString(hslBaseColor),
      warningDivider: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 66 : 34,
      }),
      warningIcon: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 66 : 34,
      }),
      warningSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 88 : 12,
      }),
      warningSurfaceMuted: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 98 : 2,
      }),
      warningText: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 30 : 70,
      }),
    };
  }

  function highlightColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    return {
      highlight: hslToString(hslBaseColor),
      highlightDivider: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 58 : 42,
      }),
      highlightIcon: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 58 : 42,
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

  function successColors(baseColor: string) {
    const hslBaseColor = colorToHsla(baseColor) as HSLAColor;
    const {hue, saturation} = hslBaseColor;

    return {
      success: hslToString(hslBaseColor),

      // Pulled this 35 lightness value from a dark mode playground for an icon
      successDivider: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 25 : 35,
      }),

      // Pulled this 35 lightness value from a dark mode playground for an icon
      successIcon: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 25 : 35,
      }),
      successSurface: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 88 : 12,
      }),
      successSurfaceMuted: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 98 : 2,
      }),
      successText: hslToString({
        hue,
        saturation,
        lightness: isLightTheme ? 15 : 85,
      }),
    };
  }
}

// TODO: Type name here is weird, we should either really type this so only camelCase key names are valid in the argument
// or use a more generic name for this type
function customPropertiesTransformer(colors: CSSProperties): CSSProperties {
  return Object.assign(
    {},
    ...Object.entries(colors).map(([key, value]) => ({
      [toCssCustomPropertySyntax(key)]: value,
    })),
  );
}

function toCssCustomPropertySyntax(camelCase: string) {
  return `--${camelCase.replace(/([A-Z0-9])/g, '-$1').toLowerCase()}`;
}

const colorsFromFigma = {
  'Surface/Background': '#FAFAFA',
  'Surface/Foreground': '#FFFFFF',
  'Surface/ForegroundMuted': '#E6E6E6',
  'Surface/Foreground/Opposite': '#050505',
  'Icon/OnSurface': '#2B2B31',
  'Text/OnSurface': '#1F2225',
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

log(colorsFromFigma);

function log(colors: CSSProperties) {
  console.log(
    'Colors from Figma as HSLA:',
    Object.assign(
      {},
      ...Object.entries(colors).map(([key, value]) => ({
        [key]: colorToHsla(value),
      })),
    ),
  );
}
