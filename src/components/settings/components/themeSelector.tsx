import {css} from '@emotion/css';
import React, {ReactNode} from 'react';

import defaultDarkTheme from '../../../assets/dark-themes/default-dark.png';
import lightTheme from '../../../assets/dark-themes/light.png';
import lightsOut from '../../../assets/dark-themes/lights-out.png';
import oldDark from '../../../assets/dark-themes/old-dark.png';
import {BetterTweetDeckThemes} from '../../../features/themeTweaks';
import {HandlerOf} from '../../../helpers/typeHelpers';
import {SettingsRow, SettingsRowContent, SettingsRowTitle} from './settingsRow';

interface CustomDarkThemeProps {
  initialValue: BetterTweetDeckThemes | 'light';
  onChange: HandlerOf<BetterTweetDeckThemes | 'light'>;
  disabled?: boolean;
  onlyDark?: boolean;
  label?: ReactNode;
}

const darkThemeRow = css`
  align-items: flex-start;
  padding-top: 30px;
  padding-bottom: 30px;
  grid-template-columns: 150px 1fr;
`;

const themeBlock = css`
  display: grid;
  /* grid-template-columns: repeat(2, auto); */
  grid-template-columns: repeat(auto-fill, minmax(auto, 120px));
  grid-gap: 14px;
  justify-items: flex-start;
`;

const optionBlock = css`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  grid-gap: 10px;
  justify-content: center;

  input {
    display: none;
  }
`;

const optionLabel = css`
  text-align: center;
  font-size: 14px;
`;

const optionImageBlock = css`
  width: 120px;
  height: 60px;
  border-radius: 8px;
  background-size: 160px;
  position: relative;
  border: 2px solid var(--settings-modal-separator);

  input:checked + & {
    border-color: var(--twitter-blue);
  }
`;

const themes = [
  {
    value: BetterTweetDeckThemes.DARK,
    label: 'Dark',
    image: defaultDarkTheme,
  },
  {
    value: BetterTweetDeckThemes.LEGACY_DARK,
    label: 'Old Gray',
    image: oldDark,
  },
  {
    value: BetterTweetDeckThemes.ULTRA_DARK,
    label: 'Super Black',
    image: lightsOut,
  },
];

let id = 0;
const generateId = () => {
  id++;
  return id;
};

export function ThemeSelector(props: CustomDarkThemeProps) {
  const inputId = generateId();
  return (
    <SettingsRow className={darkThemeRow} disabled={props.disabled}>
      <SettingsRowTitle>{props.label ?? 'Theme'}</SettingsRowTitle>
      <SettingsRowContent className={themeBlock}>
        {!props.onlyDark && (
          <label className={optionBlock} htmlFor={'light'}>
            <input
              type="radio"
              name={`customDarkTheme-${inputId}`}
              id={'light'}
              onChange={() => props.onChange('light')}
              checked={props.initialValue === 'light'}
              disabled={props.disabled}
            />
            <div className={optionImageBlock} style={{backgroundImage: `url(${lightTheme})`}}></div>
            <span className={optionLabel}>Light</span>
          </label>
        )}
        {themes.map((theme) => {
          return (
            <label
              key={theme.value + inputId}
              className={optionBlock}
              htmlFor={theme.value + inputId}>
              <input
                type="radio"
                name={`customDarkTheme-${inputId}`}
                id={theme.value + inputId}
                onChange={() => props.onChange(theme.value)}
                checked={props.initialValue === theme.value}
                disabled={props.disabled}
              />
              <div
                className={optionImageBlock}
                style={{backgroundImage: `url(${theme.image})`}}></div>
              <span className={optionLabel}>{theme.label}</span>
            </label>
          );
        })}
      </SettingsRowContent>
    </SettingsRow>
  );
}
