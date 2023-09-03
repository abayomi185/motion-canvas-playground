import {
  all,
  createRef,
  createSignal,
  DEFAULT,
  easeInQuad,
  makeRef,
  range,
  Vector2,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  makeScene2D,
  Circle,
  Rect,
  Layout,
  Node,
  Txt,
  Line,
} from "@motion-canvas/2d";

export default makeScene2D(function* (view) {
  const myCircle = createRef<Circle>();
  const group = createRef<Node>();
  const text = createRef<Txt>();

  const radius = createSignal(0.1);
  const area = createSignal(() => Math.PI * radius() ** 2);
  const scale = 100;
  const textStyle = {
    fontWeight: 700,
    fontSize: 56,
    offsetY: -1,
    padding: 20,
    cache: true,
  };

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

  view.add(
    <Layout direction={"column"} width={960} gap={40} layout>
      <Node opacity={0.5} ref={group}>
        <Rect height={240} fill={"#ff6470"} />
        <Rect height={240} fill={"#ff6470"} />
      </Node>
      <Rect height={240} fill={"#ff6470"} />
    </Layout>
  );

  view.add(
    <Txt lineHeight={"150%"} ref={text}>
      Hello world!
    </Txt>
  );

  view.add(
    <>
      <Circle
        width={() => radius() * scale * 2}
        height={() => radius() * scale * 2}
        fill={"#e13238"}
      />
      <Line
        points={[Vector2.zero, () => Vector2.right.scale(radius() * scale)]}
        lineDash={[20, 20]}
        startArrow
        endArrow
        endOffset={8}
        lineWidth={8}
        stroke={"#242424"}
      />
      <Txt
        text={() => `r = ${radius().toFixed(2)}`}
        x={() => (radius() * scale) / 2}
        fill={"#242424"}
        {...textStyle}
      />
      <Txt
        text={() => `A = ${area().toFixed(2)}`}
        y={() => radius() * scale}
        fill={"#e13238"}
        {...textStyle}
      />
    </>
  );

  circle.moveToTop();

  yield* group().opacity(0.1, 1).to(1, 1);

  yield* all(
    myCircle().position.x(300, 1).to(-300, 1, easeInQuad),
    myCircle().fill("#e6a700", 1).to("#e13238", 1)
  );

  yield* all(
    ...rects.map((rect) => rect.position.y(100, 1).to(-100, 2).to(0, 1))
  );

  yield* waitUntil("circle_event");
  yield* radius(4, 2).to(DEFAULT, 2);
});
