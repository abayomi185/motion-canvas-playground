import {
  all,
  createRef,
  Direction,
  slideTransition,
  useRandom,
  useScene,
  waitFor,
} from "@motion-canvas/core";
import { Img, makeScene2D, Rect, Txt, useScene2D } from "@motion-canvas/2d";
import { useLogger } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const logger = useLogger();

  const rect = createRef<Rect>();
  const text = createRef<Txt>();

  const imageRef = createRef<Img>();

  const circleFill = useScene2D().variables.get("circleFill", "blue");

  const random = useRandom(1024); // seed

  view.fill("#242424");

  view.add(
    <Rect
      ref={rect}
      width={"100%"}
      height={"100%"}
      fill={"lightcoral"}
      layout
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Txt
        ref={text}
        fontSize={160}
        fontWeight={700}
        fill={"#fff"}
        fontFamily={'"JetBrains Mono", monospace'}
      >
        SECOND SCENE
      </Txt>
    </Rect>
  );

  yield* slideTransition(Direction.Left);
  logger.info("Transition started");

  yield* waitFor(2);
  yield* all(
    rect().fill("lightseagreen", 0.6),
    text().text("FIRST SCENE", 0.6)
  );
  yield* waitFor(2);
});
