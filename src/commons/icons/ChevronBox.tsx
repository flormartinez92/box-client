import { IconsInterface } from '../interfaces/IconsInterface';

export function ChevronBox({ width, height, color }: IconsInterface) {
  return (
    <svg
      width={width || '26'}
      height={height || '18'}
      viewBox="0 0 26 18"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 37426">
        <path
          id="Vector"
          d="M7 6L13 12L19 6"
          stroke="#24424D"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          id="Rectangle 39549"
          x="0.5"
          y="0.5"
          width="25"
          height="17"
          rx="4.5"
          stroke="#24424D"
        />
      </g>
    </svg>
  );
}
