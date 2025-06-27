/*
 * Copyright 2018 - 2021 Swiss Federal Institute of Technology Lausanne (EPFL)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This open source software code was developed in part or in whole in the
 * Human Brain Project, funded from the European Union's Horizon 2020
 * Framework Programme for Research and Innovation under
 * Specific Grant Agreements No. 720270, No. 785907, and No. 945539
 * (Human Brain Project SGA1, SGA2 and SGA3).
 *
 */
import { createUseStyles, useTheme } from 'react-jss';

import type { Theme as AppTheme } from '../Themes/Theme';
import type { DefaultTheme, Styles as JssStyles } from 'react-jss';

const getUseStyles = () => createUseStyles((theme: Jss.Theme) => {
  const appTheme = theme as AppTheme;
  const styles = {
    '@global': {
      ':root': {
        '--bg-gradient-start':appTheme.background.gradient.colorStart,
        '--bg-gradient-end':appTheme.background.gradient.colorEnd,
        '--bg-gradient-angle':appTheme.background.gradient.angle,

        '--bg-color-ui-background':appTheme.background.color,

        '--bg-color-ui-contrast1':appTheme.contrast1.backgroundColor,
        '--bg-color-ui-contrast2':appTheme.contrast2.backgroundColor,
        '--bg-color-ui-contrast3':appTheme.contrast3.backgroundColor,
        '--bg-color-ui-contrast4':appTheme.contrast4.backgroundColor,

        '--border-color-ui-contrast1':appTheme.contrast1.borderColor,
        '--border-color-ui-contrast2':appTheme.contrast2.borderColor,
        '--border-color-ui-contrast5':appTheme.contrast5.borderColor,

        '--border-color-separator': appTheme.separator.borderColor,
        '--border-width-separator': appTheme.separator.borderWidth || '1px',
        '--border-style-separator': appTheme.separator.borderStyle || 'solid',

        '--border-separator': 'var(--border-width-separator) var(--border-style-separator) var(--border-color-separator)',

        '--box-shadow-ui-subtle': appTheme.shadowSubtle.boxShadow,
        '--box-shadow-ui-medium': appTheme.shadowMedium.boxShadow,
        '--box-shadow-ui-Strong': appTheme.shadowStrong.boxShadow,

        '--bg-color-blend-contrast1':appTheme.blendContrast1.backgroundColor,

        '--link-color-default': appTheme.links.default.color,
        '--link-color-hover': appTheme.links.hover.color,
        '--link-color-visited': appTheme.links.visited.color,
        '--link-color-active': appTheme.links.active.color,
        '--link-decoration-hover': appTheme.links.hover.textDecoration || 'underline',

        // CTA variables - Primary
        '--cta-primary-bg': appTheme.cta.primary.background,
        '--cta-primary-text': appTheme.cta.primary.text,
        '--cta-primary-hover-bg': appTheme.cta.primary.hover,
        '--cta-primary-active-bg': appTheme.cta.primary.active,
        '--cta-primary-border-radius': appTheme.cta.primary.borderRadius || '6px',
        '--cta-primary-box-shadow': appTheme.cta.primary.boxShadow || 'none',

        // CTA variables - Secondary
        '--cta-secondary-bg': appTheme.cta.secondary.background,
        '--cta-secondary-text': appTheme.cta.secondary.text,
        '--cta-secondary-border': appTheme.cta.secondary.border,
        '--cta-secondary-hover-bg': appTheme.cta.secondary.hover,
        '--cta-secondary-active-bg': appTheme.cta.secondary.active,
        '--cta-secondary-border-radius': appTheme.cta.secondary.borderRadius || '6px',

        // List item hover state
        '--list-hover-bg': appTheme.list.hover.backgroundColor,
        '--list-hover-border': appTheme.list.hover.borderColor,
        '--list-hover-text': appTheme.list.hover.textColor || 'inherit',

        // List item selected state
        '--list-selected-bg': appTheme.list.selected.backgroundColor,
        '--list-selected-border': appTheme.list.selected.borderColor,
        '--list-selected-text': appTheme.list.selected.textColor || 'inherit',

        // Common list item properties
        '--list-item-transition': 'all 0.2s ease',

        // '--list-bg-hover':appTheme.list.hover.backgroundColor,
        // '--list-border-hover':appTheme.list.hover.borderColor,
        // '--list-bg-selected':appTheme.list.selected.backgroundColor,
        // '--list-border-selected':appTheme.list.selected.borderColor,

        '--ft-color-quiet':appTheme.quiet.color,
        '--ft-color-normal':appTheme.normal.color,
        '--ft-color-loud':appTheme.loud.color,
        '--ft-color-louder':appTheme.louder.color,

        '--ft-color-error':appTheme.error.color,
        '--bg-color-error-quiet':appTheme.error.quiet.color,
        '--bg-color-error-normal':appTheme.error.normal.color,
        '--bg-color-error-loud':appTheme.error.loud.color,

        '--bg-color-warn-quiet':appTheme.warn.quiet.color,
        '--bg-color-warn-normal':appTheme.warn.normal.color,
        '--bg-color-warn-loud':appTheme.warn.loud.color,

        '--ft-color-info':appTheme.info.color,
        '--bg-color-info-normal':appTheme.info.normal.color,

        '--pane-box-shadow':appTheme.pane.boxShadow.color,

        '--release-status-box-shadow':appTheme.release.status.boxShadow,
        '--release-color-released':appTheme.release.status.released.color,
        '--release-bg-released':appTheme.release.status.released.backgroundColor,
        '--release-color-not-released':appTheme.release.status.notReleased.color,
        '--release-bg-not-released':appTheme.release.status.notReleased.backgroundColor,
        '--release-color-has-changed':appTheme.release.status.hasChanged.color,
        '--release-bg-has-changed':appTheme.release.status.hasChanged.backgroundColor,

        '--release-color-highlight':appTheme.release.highlight.color,
        '--release-bg-highlight':appTheme.release.highlight.backgroundColor,

        '--bookmark-on-color':appTheme.bookmark.on.color,
        '--bookmark-on-color-highlight':appTheme.bookmark.on.highlight.color,
        '--bookmark-off-color':'var(--ft-color-normal)',
        '--bookmark-off-color-highlight':'var(--bookmark-on-color-highlight)'
      }
    },
    '@global html, body, #root': {
      height: '100%',
      overflow: 'hidden',
      textRendering: 'optimizeLegibility',
      '-webkit-font-smoothing': 'antialiased',
      '-webkit-tap-highlight-color': 'transparent',
      fontFamily: 'Lato, sans-serif',
      fontSize: '14px'
    },
    '@global *': {
      boxSizing: 'border-box'
    },
    '@global button, @global input[type=button], @global a': {
      '-webkit-touch-callout': 'none',
      userSelect: 'none'
    },
    'a': {
      color: 'var(--link-color-default)',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    },
    'a:hover': {
      color: 'var(--link-color-hover)',
      textDecoration: 'var(--link-decoration-hover)',
    },
    'a:visited': {
      color: 'var(--link-color-visited)',
    },
    'a:active': {
      color: 'var(--link-color-active)',
    },
    '.list-item': {
      padding: '12px 16px',
      borderBottom: 'var(--border-separator)',
      transition: 'var(--list-item-transition)',
      borderLeft: '3px solid transparent',
      cursor: 'pointer',
    },

    '.list-item:hover': {
      backgroundColor: 'var(--list-hover-bg)',
      borderLeftColor: 'var(--list-hover-border)',
      color: 'var(--list-hover-text)',
    },

    '.list-item.selected': {
      backgroundColor: 'var(--list-selected-bg)',
      borderLeftColor: 'var(--list-selected-border)',
      color: 'var(--list-selected-text)',
    },

    // For list items that are links
    '.list-item-link': {
      display: 'block',
      color: 'var(--ft-color-normal)',
      textDecoration: 'none',
      padding: '12px 16px',
      borderBottom: 'var(--border-separator)',
      transition: 'var(--list-item-transition)',
      borderLeft: '3px solid transparent',
    },

    '.list-item-link:hover': {
      backgroundColor: 'var(--list-hover-bg)',
      borderLeftColor: 'var(--list-hover-border)',
      color: 'var(--list-hover-text)',
    },

    '.list-item-link.selected': {
      backgroundColor: 'var(--list-selected-bg)',
      borderLeftColor: 'var(--list-selected-border)',
      color: 'var(--list-selected-text)',
    }
  };

  if (appTheme.name === 'cupcake') {
    return {
      ...styles,
      '.copyright': {
        'background': 'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) !important',
        'background-size': '180% 180% !important',
        animation: 'rainbow 3s linear infinite !important',
        'border-top':'1px solid var(--border-color-ui-contrast2)'
      },
      '@keyframes rainbow': {
        '0%':{'background-position':'0% 82%'},
        '50%':{'background-position':'100% 19%'},
        '100%':{'background-position':'0% 82%'}
      },
      '.layout-logo': {
        backgroundImage:'url(https://vignette.wikia.nocookie.net/nyancat/images/f/fd/Taxac_Naxayn.gif/revision/latest/scale-to-width-down/2000?cb=20180518022723)',
        'background-size': '50px 30px',
        'background-repeat': 'no-repeat',
        'background-position': '5px 9px',
        'padding-left': '50px !important',
        'padding-top': '14px !important',
        '& img':{
          display:'none'
        }
      }
    } as JssStyles;
  }

  return styles as JssStyles;
});

const Styles = () => {

  const theme = useTheme<DefaultTheme>();

  const useStyles = getUseStyles();
  useStyles({ theme });

  return null;
};

export default Styles;