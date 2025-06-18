
import React from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export const PageTransition = ({ children }: PageTransitionProps) => (
  <div className="animate-fade-in transition-[opacity,transform] duration-500 ease-out">
    {children}
  </div>
);

