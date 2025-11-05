// App.tsx  (or any .tsx/.jsx file)
'use client';                     // <-- remove if you’re not using Next 13+ app dir

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';   // <-- Bootstrap CSS

function Curtain() {
  const [drop, setDrop] = useState(false);

  // Auto-drop after mount (optional)
  useEffect(() => {
    const t = setTimeout(() => setDrop(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden">
        
        {/* ---------- Curtain ---------- */}
        <motion.div
          className="position-relative bg-gradient"
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, #8b0000 0%, #4a0000 100%)',
            boxShadow: 'inset 0 -20px 40px rgba(0,0,0,.5), 0 20px 40px rgba(0,0,0,.7)',
            borderRadius: '8px',
          }}
          initial={{ y: -window.height }}               // start above the viewport
          animate={drop ? { y: 0 } : {}}       // animate only when `drop` is true
          transition={{
            type: 'spring',
            stiffness: 90,   // how “tight” the spring is
            damping: 22,     // how quickly the bounce fades
            mass: 2.2,       // heavier = slower drop
            restDelta: 0.5,
          }}
        >
          {/* ---- Folds (decorative) ---- */}
          <div className="position-absolute inset-0 opacity-25">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="position-absolute w-100"
                style={{
                  top: `${i * 16}%`,
                  height: '80px',
                  background:
                    'linear-gradient(to bottom, transparent, rgba(255,255,255,.2), transparent)',
                  filter: 'blur(6px)',
                }}
              />
            ))}
          </div>

          {/* ---- Bottom tassels ---- */}
          <div
            className="position-absolute bottom-0 start-0 end-0 d-flex justify-content-center align-items-start gap-2 px-4"
            style={{ height: '60px', background: 'linear-gradient(to top, #b8860b, #ffd700)' }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-warning rounded-bottom"
                style={{ width: '8px', height: '48px' }}
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.06,
                }}
              />
            ))}
          </div>

          {/* ---- Center emblem ---- */}
          <div className="position-absolute inset-0 d-flex align-items-center justify-content-center">
            <span className="fs-1 fw-bold text-warning opacity-20">Star</span>
          </div>
        </motion.div>

        {/* ---------- Trigger button (Bootstrap style) ---------- */}
        <button
          className="btn btn-warning position-absolute top-0 start-0 m-4 fw-bold"
          onClick={() => setDrop(true)}
        >
          Drop Curtain
        </button>
      </div>
    </>
  );
}

export default Curtain