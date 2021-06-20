import { Shaders, Node } from "gl-react";
import { Surface } from "gl-react-dom";
import { oceanShader, OceanUniforms } from "./shader";
import { useEffect, useRef, useState } from "react";
const shaders = Shaders.create({
  ocean: {
    frag: oceanShader,
  },
});

const Ocean = ({ iTime, iResolutionX, iResolutionY }: OceanUniforms) => {
  return (
    <Node
      shader={shaders.ocean}
      uniforms={{ iTime, iResolutionX, iResolutionY }}
    />
  );
};

const Canvas = () => {
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
  const [iTime, setITime] = useState(0);

  const requestRef = useRef<undefined | number>();
  const prevTime = useRef<undefined | number>();

  const animate = (ts: number) => {
    if (prevTime.current == undefined) {
      prevTime.current = ts;
    }

    const elapsed = ts - prevTime.current;

    if (elapsed > 100.0 / 6.0) {
      setITime((prevITime) => prevITime + elapsed / 1000.0);
      prevTime.current = ts;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    requestRef.current = requestAnimationFrame(animate);

    const resizeListener = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      cancelAnimationFrame(requestRef.current!);
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
	  <div style={{ position: "fixed", zIndex: -1, top: 0, left: 0, width:"100%", height:"100%" }}>
		  <Surface width={width} height={height}>
        <Ocean iTime={iTime} iResolutionX={width} iResolutionY={height} />
      </Surface>
    </div>
  );
};

export default Canvas;
