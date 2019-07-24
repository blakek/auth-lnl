import { book } from '@mdx-deck/themes';

const custom = {
  code: {
    fontFamily:
      'IBM Plex Mono, Fira Code, Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace !important'
  },
  css: {
    'li code, p code': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: 3,
      color: 'inherit',
      fontSize: '1.25rem',
      padding: '.125rem .25rem'
    }
  },
  googleFont:
    'https://fonts.googleapis.com/css?family=Crimson+Text:400,400i,600,600i,700,700i'
};

export const themes = [book, custom];
