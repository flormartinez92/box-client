import { IconsInterface } from '../interfaces/IconsInterface';

export function ChevronDownBig({ width, height, color }: IconsInterface) {
  return (
    <svg
      width={width || '24'}
      height={height || '12'}
      viewBox="0 0 24 12"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M2 2L12 10L22 2"
        stroke="#24424D"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
