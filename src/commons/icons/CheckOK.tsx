import { IconsInterface } from '../interfaces/IconsInterface';

export function CheckOK({ width, height, color, classNameCheck }: IconsInterface) {
  return (
    <div className={classNameCheck}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || '20'}
        height={height || '20'}
        viewBox="0 0 24 24"
        fill={color || 'rgba(0, 0, 0, 1)'}
        transform=""
      >
        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
      </svg>
    </div>
  );
}
