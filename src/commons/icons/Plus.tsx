import { IconsInterface } from '../interfaces/IconsInterface';

export function Plus({ width, height, color }: IconsInterface) {
  return (
    <svg
      width={width || '14'}
      height={height || '14'}
      viewBox="0 0 14 14"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 7.00005L7 7.00005M7 7.00005L1 7.00005M7 7.00005L7 1M7 7.00005L7 13"
        stroke="#CEF169"
        stroke-linecap="round"
      />
    </svg>
  );
}
