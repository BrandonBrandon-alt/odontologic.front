/** @type { import('@storybook/nextjs-vite').Preview } */
import "../src/app/globals.css";
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
