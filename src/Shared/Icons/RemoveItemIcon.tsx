import {rem} from '@mantine/core';
import React from "react";

interface RemoveItemIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function RemoveItemIcon({size, style, ...others}: RemoveItemIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      style={{width: rem(size), height: rem(size), ...style}}
      {...others}
    >
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g opacity="0.4">
        <path
          d="M6.98945 15.0798L8.92944 17.0198C9.56944 17.6598 10.6295 17.6598 11.2695 17.0198L17.0195 11.2698C17.6595 10.6298 17.6595 9.56975 17.0195 8.92975L15.0794 6.98977C14.4394 6.34977 13.3795 6.34977 12.7395 6.98977L6.98945 12.7398C6.33945 13.3798 6.33945 14.4298 6.98945 15.0798Z"
          stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.30859 10.4199L13.5786 14.6899" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </g>
    </svg>
  );
}