import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import example2 from "./scenes/example2?scene";

import "../global.css";

export default makeProject({
  name: "Playground",
  scenes: [example, example2],
});
