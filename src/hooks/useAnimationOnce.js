import { useState, useEffect } from 'react';

export const useAnimationOnce = (key) => {
  const [shouldAnimate] = useState(() => {
    const hasAnimated = sessionStorage.getItem(key);
    if (hasAnimated) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (shouldAnimate) {
      sessionStorage.setItem(key, 'true');
    }
  }, [key, shouldAnimate]);

  return shouldAnimate;
};