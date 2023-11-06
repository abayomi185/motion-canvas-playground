import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        "./src/playground-project/project.ts",
        "./src/another-project/project.ts",
        "./src/youtube/project.ts",
        "./src/instagram-story/project.ts",
      ],
    }),
    ffmpeg(),
  ],
});
