import {
  all,
  createRef,
  DEFAULT,
  Direction,
  range,
  slideTransition,
  waitFor,
} from "@motion-canvas/core";
import { Img, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { useLogger } from "@motion-canvas/core";
import {
  CodeBlock,
  edit,
  insert,
  lines,
  word,
} from "@motion-canvas/2d/lib/components/CodeBlock";
import { JETBRAINS_MONO_FONT } from "constants";

export default makeScene2D(function* (view) {
  const logger = useLogger();

  const rect = createRef<Rect>();
  const text = createRef<Txt>();
  const codeRef = createRef<CodeBlock>();

  // const imageRef = createRef<Img>();

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
        fontFamily={JETBRAINS_MONO_FONT}
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
  yield* rect().fill("#000000", 0.6);
  yield* text().text(DEFAULT, 0.6);
  yield view.add(
    <CodeBlock
      ref={codeRef}
      language="c#"
      code={`Console.WriteLine("Hello World!")`}
      fontFamily={JETBRAINS_MONO_FONT}
    />
  );
  // yield* codeRef().selection(lines(0), 1);
  // yield* codeRef().selection(word(0, 8, 9), 1);
  yield* waitFor(2);

  // yield* codeRef().selection(DEFAULT, 1);
  yield* codeRef().language("tsx").edit(1.2)`var myBool`;
  yield* codeRef().edit(1.2)`var myBool${insert(" = true")};`;
  yield* codeRef().selection(DEFAULT, 1);
  yield* codeRef().edit(1.2)`var myBool = ${edit("true", "false")};`;
  yield* codeRef().selection(DEFAULT, 1);
  yield* waitFor(2);
});
