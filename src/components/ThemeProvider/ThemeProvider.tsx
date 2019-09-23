import React from 'react';
import isEqual from 'lodash/isEqual';
import {ThemeContext} from '../../utilities/theme';
import {Theme, CSSProperties} from '../../utilities/theme/types';
import {colors} from '../../utilities/theme/utils';

interface State {
  theme: Theme;
  colors: CSSProperties | undefined;
}

interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme: Theme;
  /** The content to display */
  children?: React.ReactNode;
}

export class ThemeProvider extends React.Component<ThemeProviderProps, State> {
  state: State = {
    theme: setThemeContext(this.props.theme),
    colors: colors(this.props.theme),
  };

  componentDidUpdate({theme: prevTheme}: ThemeProviderProps) {
    const {theme} = this.props;
    if (isEqual(prevTheme, theme)) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      theme: setThemeContext(theme),
      colors: colors(theme),
    });
  }

  render() {
    const {
      theme: {logo = null, ...rest},
    } = this.state;
    const {
      props: {children},
      state: {colors},
    } = this;

    const theme = {
      ...rest,
      logo,
    };

    return (
      <ThemeContext.Provider value={theme}>
        <div style={colors}>{children}</div>
      </ThemeContext.Provider>
    );
  }
}

function setThemeContext(ctx: Theme): Theme {
  const {colors, ...theme} = ctx;
  return {...theme};
}
