import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";

export default makeProject({
  name: "Instagram Story",
  scenes: [example],
  variables: {
    circleFill: "red",
  },
});
