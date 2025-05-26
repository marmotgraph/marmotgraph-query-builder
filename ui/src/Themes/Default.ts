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

import type { Theme } from './Theme';

const theme: Theme = {
  name: 'default',
  background: {
    gradient: {
      // Using the deep blue-black as base, no gradient needed
      // colorStart: '#0F1219',
      // colorEnd: '#171D26',
      // angle: '165deg'
    },
    color: '#0F1219',
    image: '/api/theme/background?darkMode=true',
    size: 'cover'
  },
  contrast1: {
    // Primary surface level
    backgroundColor: '#171D26', // Navy-tinted surface
    borderColor: '#0F1219'      // Deep blue-black
  },
  contrast2: {
    // Secondary surface level
    backgroundColor: '#242C38', // Medium elevation
    borderColor: '#171D26'      // Navy-tinted surface
  },
  contrast3: {
    // Tertiary surface level
    backgroundColor: '#2E3744'  // Highest elevation
  },
  contrast4: {
    // Quaternary surface level - for highlights
    backgroundColor: '#334155'  // Subtle highlight for dark surfaces
  },
  contrast5: {
    // Border accent
    borderColor: 'rgba(226, 232, 240, 0.1)' // Subtle borders
  },
  blendContrast1: {
    backgroundColor: 'rgba(15, 18, 25, 0.7)' // Semi-transparent background
  },
  /* Shadows */
  shadowSubtle: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
  },
  shadowMedium: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)'
  },
  shadowStrong: {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)'
  },
  separator: {
    borderColor: 'rgba(226, 232, 240, 0.1)', // Subtle light borders at 10% opacity
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  links: {
    default: {
      color: '#8EBBF2'
    },
    hover: {
      color: '#ADD2FF',
      textDecoration: 'underline'
    },
    visited: {
      color: '#B8A1E3'
    },
    active: {
      color: '#FFFFFF'
    }
  },
  cta: {
    primary: {
      background: '#E2E8F0',   // Light grey (primary text color)
      text: '#0F1219',         // Deep blue-black for readability
      hover: '#CBD5E1',        // Slightly darker grey on hover
      active: '#A1A1AA',       // Medium grey when pressed
      borderRadius: '6px',     // Rounded corners
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // Subtle shadow
    },
    secondary: {
      background: 'transparent',  // Transparent background
      text: '#E2E8F0',            // Light grey (primary text color)
      border: '#5A697E',          // Medium grey border (accent color)
      hover: '#171D26',           // Slightly darker background on hover
      active: '#2E3744',          // Even darker when pressed
      borderRadius: '6px'         // Match primary button radius
    }
  },
  // list: {
  //   hover: {
  //     backgroundColor: '#334155', // Subtle highlight
  //     borderColor: '#5A697E'      // Accent primary
  //   },
  //   selected: {
  //     backgroundColor: '#475569', // Accent secondary dark
  //     borderColor: '#A6B4CB'      // Secondary text (brightened blue-gray)
  //   }
  // },
  list: {
    hover: {
      backgroundColor: '#242C38',     // Slightly lighter than surface
      borderColor: '#5A697E',         // Your accent color
      textColor: '#E2E8F0'            // Primary text color
    },
    selected: {
      backgroundColor: '#2E3744',     // Even lighter (surface3)
      borderColor: '#A6B4CB',         // Secondary text - stands out more
      textColor: '#E2E8F0'            // Primary text color
    }
  },
  quiet: {
    color: 'rgba(166, 180, 203, 0.7)' // Secondary text with opacity
  },
  normal: {
    color: '#A6B4CB' // Secondary text (brightened blue-gray)
  },
  loud: {
    color: '#E2E8F0' // Primary text (cool off-white)
  },
  louder: {
    color: '#FFFFFF' // Pure white for maximum emphasis
  },
  error: {
    color: '#D87B80', // Muted rose-red
    quiet: {
      color: '#834A4D' // Darker variant
    },
    normal: {
      color: '#D87B80' // Muted rose-red
    },
    loud: {
      color: '#E66A77' // Brighter variant for emphasis
    }
  },
  warn: {
    quiet: {
      color: '#A67A4C' // Darker amber
    },
    normal: {
      color: '#E8A86C' // Soft amber
    },
    loud: {
      color: '#F59E0B' // Brighter amber for emphasis
    }
  },
  info: {
    color: '#6C91C2', // Calm blue
    normal: {
      color: '#6C91C2' // Calm blue
    }
  },
  pane: {
    boxShadow: {
      color: 'rgba(0, 0, 0, 0.5)' // Darker shadow for panes
    }
  },
  release: {
    status: {
      boxShadow: {
        color: 'rgba(0, 0, 0, 0.5)'
      },
      released: {
        backgroundColor: 'rgba(108, 145, 194, 0.25)', // Info color with opacity
        color: '#6C91C2' // Info color
      },
      notReleased: {
        backgroundColor: 'rgba(216, 123, 128, 0.25)', // Error color with opacity
        color: '#D87B80' // Error color
      },
      hasChanged: {
        backgroundColor: 'rgba(232, 168, 108, 0.25)', // Warning color with opacity
        color: '#E8A86C' // Warning color
      }
    },
    highlight: {
      backgroundColor: 'rgba(118, 185, 135, 0.25)', // Success color with opacity
      color: '#76B987' // Success color
    }
  },
  bookmark: {
    on: {
      color: '#E8A86C', // Soft amber (warning color)
      highlight: {
        color: '#F59E0B' // Brighter amber for emphasis
      }
    }
  }
};

export default theme;