import React, { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animationEntered, setAnimationEntered] = useState(false);

  const enterAnimation = () => {
    setAnimationEntered(true);
  };

  return (
    <AnimationContext.Provider value={{ animationEntered, enterAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  return useContext(AnimationContext);
};
