import React from "react";

interface OpenAIIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
}

export const OpenAIIcon: React.FC<OpenAIIconProps> = ({
  width = 12,
  height = 12,
  className,
  fill = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M4.971 5.613a4.978 4.978 0 0 1 8.203-2.86 6 6 0 0 0-.251.137L7.232 6.176a.5.5 0 0 0-.25.435l.033 7.357-2.118-1.21V6.476a5 5 0 0 1 .074-.863m15.25-.036a4.96 4.96 0 0 1 .565 3.486 7 7 0 0 0-.244-.15L14.85 5.629a.5.5 0 0 0-.502.001L7.994 9.336l-.01-2.44 5.439-3.14a4.98 4.98 0 0 1 6.798 1.821M8.017 14.541 8 10.49l3.499-2.041 3.516 2.01.018 4.05-3.498 2.04-3.517-2.01Zm10.866-3.023-6.388-3.65 2.107-1.229 5.44 3.14a4.978 4.978 0 0 1-.914 9.03q.006-.142.007-.285v-6.572a.5.5 0 0 0-.252-.434m-2.834 6.871-.032-7.357 2.118 1.21v6.282a4.978 4.978 0 0 1-8.277 3.724q.126-.066.25-.138l5.691-3.285a.5.5 0 0 0 .25-.436m-7.367.982 6.355-3.707.011 2.44-5.44 3.14a4.978 4.978 0 0 1-7.364-5.306q.12.076.245.149l5.691 3.285a.5.5 0 0 0 .502 0Zm-4.533-5.89 6.387 3.65-2.107 1.23-5.44-3.14a4.978 4.978 0 0 1 .914-9.03q-.006.142-.006.285v6.572a.5.5 0 0 0 .252.434Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default OpenAIIcon;
