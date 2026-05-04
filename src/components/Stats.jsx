import React from "react";
import { Camera, Users, Award, Star } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated, useSprings } from "@react-spring/web";

const Stats = () => {
  const stats = [
    { icon: Camera, value: 5000, label: "Photos Captured" },
    { icon: Users, value: 1200, label: "Happy Clients" },
    { icon: Award, value: 50, label: "Awards Won" },
    { icon: Star, value: 4.9, label: "Average Rating" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
    rootMargin: "-100px 0px",
  });

  const cardSprings = useSprings(
    stats.length,
    stats.map((_, i) => ({
      from: { opacity: 0, transform: "translateY(40px) scale(0.95)" },
      to: {
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0px) scale(1)"
          : "translateY(40px) scale(0.95)",
      },
      delay: i * 120,
      config: { tension: 280, friction: 22 },
    }))
  );

  const numberSprings = stats.map((stat) =>
    useSpring({
      from: { number: 0 },
      to: { number: inView ? stat.value : 0 },
      delay: 400 + stats.indexOf(stat) * 180,
      config: { mass: 1, tension: 180, friction: 14 },
    })
  );

  const iconSprings = useSprings(
    stats.length,
    stats.map((_, i) => ({
      from: { rotate: -12, scale: 0.7 },
      to: {
        rotate: inView ? 0 : -12,
        scale: inView ? 1 : 0.7,
      },
      delay: 250 + i * 100,
      config: { tension: 300, friction: 12 },
    }))
  );

  return (
    <section className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-red-100 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">By the numbers</p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our{" "}
            <span className="text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>
              Achievements
            </span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <animated.div
                key={index}
                style={cardSprings[index]}
                className="group relative"
              >
                <div className="relative bg-white border border-gray-100 hover:border-red-200 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-red-100 overflow-hidden">

                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl"></div>

                  {/* Icon */}
                  <animated.div style={iconSprings[index]} className="inline-block mb-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-red-50 group-hover:bg-red-600 rounded-2xl flex items-center justify-center transition-all duration-300">
                      <StatIcon className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </animated.div>

                  {/* Number */}
                  <h3
                    className="text-3xl sm:text-4xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <animated.span>
                      {numberSprings[index].number.to((n) =>
                        stat.value % 1 !== 0 ? n.toFixed(1) : Math.floor(n)
                      )}
                    </animated.span>
                    {stat.value % 1 === 0 ? "+" : ""}
                  </h3>

                  {/* Label */}
                  <p className="text-gray-500 text-sm sm:text-base font-medium group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              </animated.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </section>
  );
};

export default Stats;