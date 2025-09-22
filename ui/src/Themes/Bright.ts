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
  name: 'bright',
  background: {
    gradient: {
      colorStart: '#F8FAFC', // Very light blue-grey
      colorEnd: '#E2E8F0',   // Medium blue-grey
      angle: '165deg'
    },
    color: '#F8FAFC',
    image: 'api/favicon/background?darkMode=false',
    position: '50% 50%'
  },
  contrast1: {
    backgroundColor: '#FFFFFF', // Pure white surface
    borderColor: '#CBD5E1'      // Light grey accent
  },
  contrast2: {
    backgroundColor: '#F1F5F9', // Light blue-grey
    borderColor: '#FFFFFF'      // Pure white
  },
  contrast3: {
    borderColor: '#E2E8F0'      // Medium blue-grey
  },
  contrast4: {
    backgroundColor: '#CBD5E1'  // Light grey accent
  },
  contrast5: {
    borderColor: 'rgba(30, 41, 59, 0.1)' // Subtle borders
  },
  blendContrast1: {
    backgroundColor: 'rgba(241, 245, 249, 0.7)' // Semi-transparent surface2
  },
  separator: {
    borderColor: 'rgba(30, 41, 59, 0.1)', // Subtle dark borders at 10% opacity
    borderWidth: '1px',
    borderStyle: 'solid'
  },
  /* Shadows */
  shadowSubtle: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
  },
  shadowMedium: {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  },
  shadowStrong: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)'
  },
  links: {
    default: {
      color: '#0369A1'  // Darker blue for light theme
    },
    hover: {
      color: '#0284C7',  // Slightly brighter blue
      textDecoration: 'underline'
    },
    visited: {
      color: '#7E22CE'  // Purple
    },
    active: {
      color: '#0C4A6E'  // Deep blue
    }
  },
  cta: {
    primary: {
      background: '#475569', // Slate grey (your accent color)
      text: '#FFFFFF',       // White text
      hover: '#334155',      // Darker slate on hover
      active: '#1E293B',     // Even darker when pressed
      borderRadius: '6px',   // Rounded corners
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' // Subtle shadow
    },
    secondary: {
      background: 'transparent',  // Transparent background
      text: '#1E293B',            // Dark slate blue (primary text)
      border: '#64748B',          // Medium slate border
      hover: '#F1F5F9',           // Very light blue-grey on hover
      active: '#E2E8F0',          // Slightly darker when pressed
      borderRadius: '6px'         // Match primary button radius
    }
  },
  list: {
    hover: {
      backgroundColor: '#F1F5F9',     // Very light blue-grey (surface2)
      borderColor: '#475569',         // Your accent color
      textColor: '#1E293B'            // Primary text color
    },
    selected: {
      backgroundColor: '#E2E8F0',     // Medium blue-grey (surface3)
      borderColor: '#334155',         // Darker slate grey (accent dark)
      textColor: '#1E293B'            // Primary text color
    }
  },
  // list: {
  //   hover: {
  //     backgroundColor: '#F1F5F9', // Light blue-grey (surface2)
  //     borderColor: '#64748B'      // Medium slate (slightly lighter accent)
  //   },
  //   selected: {
  //     backgroundColor: '#E2E8F0', // Medium blue-grey (surface3)
  //     borderColor: '#475569'      // Slate grey accent
  //   }
  // },
  quiet: {
    color: '#64748B' // Medium slate (slightly lighter accent)
  },
  normal: {
    color: '#5A697E' // Darkened slate (secondary text)
  },
  loud: {
    color: '#1E293B' // Dark slate blue (primary text)
  },
  louder: {
    color: '#0F172A' // Darker variant for maximum emphasis
  },
  error: {
    color: '#F87171', // Soft red
    quiet: {
      color: '#EF4444' // Less saturated red
    },
    normal: {
      color: '#DC2626' // Standard red
    },
    loud: {
      color: '#B91C1C' // Deeper red for emphasis
    }
  },
  warn: {
    quiet: {
      color: '#FBBF24' // Light amber
    },
    normal: {
      color: '#F59E0B' // Standard amber
    },
    loud: {
      color: '#D97706' // Deeper amber for emphasis
    }
  },
  info: {
    color: '#38BDF8', // Light blue
    normal: {
      color: '#0EA5E9' // Standard blue
    }
  },
  pane: {
    boxShadow: {
      color: 'rgba(0, 0, 0, 0.1)' // Lighter shadow for panes
    }
  },
  release: {
    status: {
      boxShadow: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      released: {
        backgroundColor: 'rgba(56, 189, 248, 0.2)', // Light blue with opacity
        color: '#0EA5E9' // Standard blue
      },
      notReleased: {
        backgroundColor: 'rgba(248, 113, 113, 0.2)', // Soft red with opacity
        color: '#DC2626' // Standard red
      },
      hasChanged: {
        backgroundColor: 'rgba(245, 158, 11, 0.2)', // Amber with opacity
        color: '#D97706' // Deeper amber
      }
    },
    highlight: {
      backgroundColor: 'rgba(74, 222, 128, 0.2)', // Fresh green with opacity
      color: '#16A34A' // Standard green
    }
  },
  bookmark: {
    on: {
      color: '#F59E0B', // Amber yellow
      highlight: {
        color: '#FBBF24' // Lighter amber for hover
      }
    }
  }
};

export default theme;