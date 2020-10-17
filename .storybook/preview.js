// TODO: this will most likely only work locally
import "../dist/index.css";
import "../src/stories/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ['Introduction', 'Components'], 
    },
  },
};
