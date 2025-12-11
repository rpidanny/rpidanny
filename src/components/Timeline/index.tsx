import "./styles.css";

import React from "react";

export const VerticalTimeline: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`vertical-timeline ${className}`}>{children}</div>;
};

interface VerticalTimelineElementProps {
  children: React.ReactNode;
  iconStyle?: React.CSSProperties;
  className?: string;
}

export const VerticalTimelineElement: React.FC<
  VerticalTimelineElementProps
> = ({ children, className = "" }) => {
  return (
    <div className={`vertical-timeline-element ${className}`}>
      <div className="vertical-timeline-element-content">{children}</div>
    </div>
  );
};
