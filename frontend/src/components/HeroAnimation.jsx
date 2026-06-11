import { useEffect, useRef, useState } from "react";

const heroLayers = [
  {
    key: "map",
    src: "/heroMap.png",
    alt: "Map of Europe",
    className:
      "pointer-events-none absolute left-1/2 top-0 w-[73.25%] max-w-none opacity-65",
    introFrom: "translate3d(-50%, -125%, 0)",
    rest: "translate3d(-50%, 0, 0)",
    scrollMove: { x: 0, y: -125 },
    duration: 1200,
    delay: 0,
  },
  {
    key: "leftLady",
    src: "/heroLeftLady.png",
    alt: "Healthcare worker",
    className:
      "absolute top-[39%] left-[6.7%] w-[20.85%] max-w-none object-contain",
    introFrom: "translate3d(-140%, -38%, 0)",
    rest: "translate3d(0, 0, 0)",
    scrollMove: { x: -140, y: -38 },
    duration: 1100,
    delay: 160,
  },
  {
    key: "leftMan",
    src: "/heroLeftMan.png",
    alt: "Worker with folded arms",
    className:
      "absolute top-45 left-[-0.35%] w-[20.85%] max-w-none object-contain",
    introFrom: "translate3d(-152%, -34%, 0)",
    rest: "translate3d(0, 0, 0)",
    scrollMove: { x: -152, y: -34 },
    duration: 1180,
    delay: 80,
  },
  {
    key: "rightMan",
    src: "/heroRightMan.png",
    alt: "Worker holding clipboard",
    className:
      "absolute top-[39%] right-[6.7%] w-[20.85%] max-w-none object-contain",
    introFrom: "translate3d(140%, -38%, 0)",
    rest: "translate3d(0, 0, 0)",
    scrollMove: { x: 140, y: -38 },
    duration: 1100,
    delay: 160,
  },
  {
    key: "rightLady",
    src: "/heroRightLady.png",
    alt: "Chef smiling",
    className:
      "absolute top-45 right-[-0.2%] w-[20.85%] max-w-none object-contain",
    introFrom: "translate3d(152%, -34%, 0)",
    rest: "translate3d(0, 0, 0)",
    scrollMove: { x: 152, y: -34 },
    duration: 1180,
    delay: 80,
  },
  {
    key: "shadow",
    src: "/heroShadow.png",
    alt: "",
    ariaHidden: true,
    className:
      "pointer-events-none absolute inset-x-0 bottom-0 w-full max-w-none object-cover",
    introFrom: "translate3d(0, 125%, 0)",
    rest: "translate3d(0, 0, 0)",
    scrollMove: { x: 0, y: 125 },
    duration: 1200,
    delay: 0,
  },
];

function parseTranslate3d(transform) {
  const match = /translate3d\(([^,]+),([^,]+),([^)]+)\)/.exec(transform);

  if (!match) {
    return { x: 0, y: 0, z: 0, unitX: "px", unitY: "px", unitZ: "px" };
  }

  const readValue = (value) => {
    const trimmed = value.trim();
    const number = Number.parseFloat(trimmed);
    const unit = trimmed.replace(String(number), "").trim() || "px";

    return { number, unit };
  };

  const x = readValue(match[1]);
  const y = readValue(match[2]);
  const z = readValue(match[3]);

  return {
    x: x.number,
    y: y.number,
    z: z.number,
    unitX: x.unit,
    unitY: y.unit,
    unitZ: z.unit,
  };
}

function buildScrollTransform(baseTransform, scrollMove, progress) {
  const parsed = parseTranslate3d(baseTransform);
  const nextX = parsed.x + scrollMove.x * progress;
  const nextY = parsed.y + scrollMove.y * progress;

  return `translate3d(${nextX}${parsed.unitX}, ${nextY}${parsed.unitY}, ${parsed.z}${parsed.unitZ})`;
}

function HeroLayer({ layer, isEntered, isIntroDone, scrollProgress }) {
  const transform = isEntered
    ? buildScrollTransform(layer.rest, layer.scrollMove, scrollProgress)
    : layer.introFrom;
  const opacity = isEntered ? Math.max(0, 1 - scrollProgress * 1.35) : 0;

  return (
    <img
      src={layer.src}
      alt={layer.alt}
      aria-hidden={layer.ariaHidden ? "true" : undefined}
      className={`${layer.className} transform-gpu`}
      style={{
        transform,
        opacity,
        transitionProperty: "transform, opacity",
        transitionDuration: isIntroDone
          ? "120ms, 160ms"
          : `${layer.duration}ms, 520ms`,
        transitionTimingFunction: isIntroDone
          ? "linear, linear"
          : "cubic-bezier(0.22, 1, 0.36, 1), ease-out",
        transitionDelay:
          isEntered && !isIntroDone
            ? `${layer.delay}ms, ${layer.delay + 120}ms`
            : "0ms, 0ms",
        willChange: "transform, opacity",
      }}
    />
  );
}

function HeroAnimation() {
  const [isEntered, setIsEntered] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sceneRef = useRef(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsEntered(true);
    });
    const timeoutId = window.setTimeout(() => {
      setIsIntroDone(true);
    }, 1500);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!sceneRef.current) {
        return;
      }

      const rect = sceneRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sceneRef} className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_58%)]" />

      <div className="absolute left-1/2 top-1/2 aspect-[16/9] w-[max(100vw,calc(100vh*1.7778))] -translate-x-1/2 -translate-y-1/2">
        {heroLayers.map((layer) => (
          <HeroLayer
            key={layer.key}
            layer={layer}
            isEntered={isEntered}
            isIntroDone={isIntroDone}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroAnimation;
