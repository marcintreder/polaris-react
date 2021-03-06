import React from 'react';
import tokens from '@shopify/polaris-tokens';

// eslint-disable-next-line shopify/strict-component-boundaries
import AppProvider from '../../../src/components/AppProvider';

const theme = {
  colors: {
    topBar: {
      background: '#357997',
    },
  },
  logo: {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    url: 'http://jadedpixel.com',
    accessibilityLabel: 'Jaded Pixel',
    contextualSaveBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
  },
};

// eslint-disable-next-line react/prop-types
export default function UXPinWrapper({children}) {
  return React.createElement('div', {
    // Simulate default 'body' styles
    style: {
      color: tokens.colorInk,
      fontFamily: tokens.fontStackBase,
      webkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
    },
  }, [React.createElement(AppProvider, {theme, i18n: {}}, children)]);
}
