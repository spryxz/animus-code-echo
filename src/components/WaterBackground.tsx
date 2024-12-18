import { useEffect } from 'react';

const WaterBackground = () => {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'water-effect';
    document.body.appendChild(container);

    // Add waves
    for (let i = 0; i < 3; i++) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.opacity = `${0.1 - i * 0.02}`;
      wave.style.animationDelay = `${i * 2}s`;
      container.appendChild(wave);
    }

    // Create bubbles
    const createBubble = () => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * 100}vw`;
      bubble.style.width = `${Math.random() * 30 + 10}px`;
      bubble.style.height = bubble.style.width;
      bubble.style.setProperty('--duration', `${Math.random() * 4 + 2}s`);
      container.appendChild(bubble);

      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    };

    // Create initial bubbles
    for (let i = 0; i < 20; i++) {
      setTimeout(createBubble, i * 300);
    }

    // Continue creating bubbles
    const bubbleInterval = setInterval(createBubble, 300);

    return () => {
      clearInterval(bubbleInterval);
      document.body.removeChild(container);
    };
  }, []);

  return null;
};

export default WaterBackground;