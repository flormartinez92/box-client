import { IconsInterface } from '../interfaces/IconsInterface';

export function CheckOn({ width, height, color, classNameCheck }: IconsInterface) {
  return (
    <div className={classNameCheck}>
      <svg
        width={width || '11'}
        height={height || '11'}
        viewBox="0 0 11 11"
        fill={color || 'none'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" y="0.5" width="10" height="10" rx="5" fill="#CEF169" stroke="#24424D" />
      </svg>
    </div>
  );
}
