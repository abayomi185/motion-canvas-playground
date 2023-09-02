import { makeScene2D, Circle, Rect, Layout } from "@motion-canvas/2d";
import { all, createRef, makeRef, range, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();

  const rects: Rect[] = [];

  const node = <Layout />;

  view.add(node);

  const circle = node.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      x={-300}
      width={140}
      height={140}
      fill="#e13238"
    />
  );

  view.add(
    <>
      {range(5).map((i) => (
        <Rect
          ref={makeRef(rects, i)}
          width={100}
          height={100}
          x={-250 + 125 * i}
          fill="#88C0D0"
          radius={10}
        />
      ))}
    </>
  );

  circle.moveToTop();

  yield* all(
    myCircle().position.x(300, 1).to(-300, 1),
    myCircle().fill("#e6a700", 1).to("#e13238", 1)
  );

  yield* all(
    ...rects.map((rect) => rect.position.y(100, 1).to(-100, 2).to(0, 1))
  );
});
