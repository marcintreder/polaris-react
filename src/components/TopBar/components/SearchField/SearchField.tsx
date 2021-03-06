import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {CircleCancelMinor, SearchMinor} from '@shopify/polaris-icons';
import {classNames} from '../../../../utilities/css';

import Icon from '../../../Icon';
import VisuallyHidden from '../../../VisuallyHidden';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../utilities/with-app-provider';

import styles from './SearchField.scss';

const getUniqueId = createUniqueIDFactory('SearchField');

export interface Props {
  /** Initial value for the input */
  value: string;
  /** Hint text to display */
  placeholder?: string;
  /** Force the focus state on the input */
  focused?: boolean;
  /** Force a state where search is active but the text field component is not focused */
  active?: boolean;
  /** Callback when value is changed */
  onChange(value: string): void;
  /** Callback when input is focused */
  onFocus?(): void;
  /** Callback when focus is removed */
  onBlur?(): void;
  /** Callback when search field cancel button is clicked */
  onCancel?(): void;
}

export type ComposedProps = Props & WithAppProviderProps;

/**
 * @uxpincomponent
 * @uxpinnamespace TopBar
 * */
export class SearchField extends React.Component<ComposedProps, never> {
  private input: React.RefObject<HTMLInputElement> = React.createRef();
  private searchId = getUniqueId();

  componentDidMount() {
    const {focused} = this.props;
    const {
      input: {current: input},
    } = this;

    if (input && focused) {
      input.focus();
    }
  }

  componentDidUpdate({focused: wasFocused}: Props) {
    const {
      input: {current: input},
    } = this;
    if (input == null) {
      return;
    }

    const {focused} = this.props;

    if (focused && !wasFocused) {
      input.focus();
    } else if (!focused && wasFocused) {
      input.blur();
    }
  }

  render() {
    const {
      value,
      focused,
      active,
      placeholder,
      polaris: {intl},
    } = this.props;

    const clearMarkup = value !== '' && (
      <button
        type="button"
        aria-label={intl.translate(
          'Polaris.TopBar.SearchField.clearButtonLabel',
        )}
        className={styles.Clear}
        onClick={this.handleClear}
      >
        <Icon source={CircleCancelMinor} />
      </button>
    );

    const className = classNames(
      styles.SearchField,
      (focused || active) && styles.focused,
    );

    return (
      <div
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <VisuallyHidden>
          <label htmlFor={this.searchId}>
            {intl.translate('Polaris.TopBar.SearchField.search')}
          </label>
        </VisuallyHidden>
        <input
          id={this.searchId}
          className={styles.Input}
          placeholder={placeholder}
          type="search"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          ref={this.input}
          value={value}
          onChange={this.handleChange}
          onKeyDown={preventDefault}
        />
        <span className={styles.Icon}>
          <Icon source={SearchMinor} />
        </span>

        {clearMarkup}
        <div className={styles.Backdrop} />
      </div>
    );
  }

  private handleFocus = () => {
    const {onFocus} = this.props;

    if (onFocus) {
      onFocus();
    }
  };

  private handleBlur = () => {
    const {onBlur} = this.props;

    if (onBlur) {
      onBlur();
    }
  };

  private handleClear = () => {
    const {onCancel = noop, onChange} = this.props;
    const {
      input: {current: input},
    } = this;

    onCancel();

    if (input != null) {
      input.value = '';
      onChange('');
      input.focus();
    }
  };

  private handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const {onChange} = this.props;
    onChange(currentTarget.value);
  };
}

function noop() {}

function preventDefault(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
}
export default withAppProvider<Props>()(SearchField);
