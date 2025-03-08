import React, { useState, useEffect } from 'react';

type AnimatedCounterProps = {
  value: number;
  duration?: number; // общая длительность анимации (fade-out + fade-in) в мс, по умолчанию 500
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 500 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (value !== displayValue) {
      // Запускаем анимацию исчезновения (fade-out)
      setOpacity(0);
      // После fade-out (половина duration) обновляем значение и запускаем fade-in
      const timeout = setTimeout(() => {
        setDisplayValue(value);
        setOpacity(1);
      }, duration / 2);
      return () => clearTimeout(timeout);
    }
  }, [value, displayValue, duration]);

  return (
    <span
      style={{
        transition: `opacity ${duration / 2}ms ease-in-out`,
        opacity,
      }}
    >
      {displayValue}
    </span>
  );
};

export default AnimatedCounter;
