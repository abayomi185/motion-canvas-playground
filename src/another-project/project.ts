import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import example2 from "./scenes/example2?scene";

export default makeProject({
  scenes: [example, example2],
  variables: {
    circleFill: "red",
  },
});
