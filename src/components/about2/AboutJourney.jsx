import React, { forwardRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border-2 border-red-900 bg-white shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] overflow-hidden ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = React.useMemo(() => React.Children.toArray(children), [children]);
  const refs = React.useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);

  const order = React.useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = React.useRef(null);
  const intervalRef = React.useRef();
  const container = React.useRef(null);

  React.useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(() => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, undefined, "return");
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs, config]);

  const rendered = childArr.map((child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className="absolute top-2/3 left-1/2 -translate-x-1/3 -translate-y-1/2 perspective-[900px] overflow-visible sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2"
      style={{
        width: "100%",
        maxWidth: width,
        height: "auto",
      }}
    >
      {rendered}
    </div>
  );
};

export default function PhotoStudioLanding() {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-300 rounded-full mix-blend-soft-light filter blur-3xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-amber-200 rounded-full mix-blend-soft-light filter blur-3xl opacity-15 animate-pulse"></div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Section */}
        <div className="flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 py-12 md:py-20">
          <div className="max-w-xl space-y-6 sm:space-y-8 text-center lg:text-left">
            <p className="text-red-900 text-sm font-semibold uppercase tracking-widest">
              About
            </p>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Journey in Capturing Moments
            </h2>

            <div className="w-16 h-1 bg-red-900 rounded-full mx-auto lg:mx-0"></div>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
  Kanchan Studio is a premier creative hub specializing in professional photography and videography services. With expertise in weddings, pre-wedding shoots, portrait sessions, maternity shoots, events, and commercial projects, we aim to capture every precious moment with artistic precision and attention to detail. Our team of skilled photographers and videographers use state-of-the-art equipment and creative storytelling techniques to create timeless memories that you can cherish forever. Whether it’s intimate portraits, grand celebrations, or corporate campaigns, Kanchan Studio delivers exceptional quality and a seamless experience tailored to your vision.
</p>


            <div>
                <Link to="/contact">
                <button className="bg-red-900 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  Book a Session
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section (Card Stack) */}
        {/* Hidden on mobile, visible only on large screens */}
        <div className="relative hidden lg:flex items-center justify-end px-4 sm:px-8 py-10 md:py-0 mt-20">
          <CardSwap
            width={550}
            height={400}
            cardDistance={50}
            verticalDistance={60}
            delay={4000}
            pauseOnHover={true}
            skewAmount={5}
            easing="elastic"
          >
            <Card>
              <img
                src="/wedd-img/wedding3.jfif"
                alt="Wedding Photography"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white text-lg sm:text-2xl font-bold">
              Wedding Photography
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">
                  Professional headshots & personal branding
                </p>
              </div>
            </Card>

            <Card>
              <img
                src="wedd-ci/wedd-cin3.jpg"
                alt="Wedding Cinematography"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white text-lg sm:text-2xl font-bold">
                Wedding Cinematography
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">
                  Capturing your special day beautifully
                </p>
              </div>
            </Card>

            <Card>
              <img
                src="/product-img/pro5.jfif"
                alt="Product Photography"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white text-lg sm:text-2xl font-bold">
                  Product Shoots
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">
                  Elevate your brand with stunning visuals
                </p>
              </div>
            </Card>

            <Card>
              <img
                src="/birthday-img/birthday11.jfif"
                alt="Birthday Photography"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white text-lg sm:text-2xl font-bold">
                  Birthday Photography
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">
                  Bold creative direction & styling
                </p>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </div>
  );
}
