import { IconsInterface } from '../interfaces/IconsInterface';

export function Trash({ width, height, color }: IconsInterface) {
  return (
    <svg
      width={width || '31'}
      height={height || '20'}
      viewBox="0 0 31 20"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6693 4.47368C13.9358 3.61512 14.6548 3 15.5 3C16.3452 3 17.0643 3.61512 17.3307 4.47368"
        stroke="#24424D"
        strokeLinecap="round"
      />
      <path d="M21 5.94737H10" stroke="#24424D" strokeLinecap="round" />
      <path
        d="M19.9216 7.78947L19.624 12.873C19.5095 14.8293 19.4522 15.8074 18.8925 16.4037C18.3328 17 17.4719 17 15.7502 17H15.2498C13.5281 17 12.6673 17 12.1076 16.4037C11.5479 15.8074 11.4906 14.8293 11.3761 12.873L11.0785 7.78947"
        stroke="#24424D"
        strokeLinecap="round"
      />
      <path d="M13.8824 9.63158L14.206 13.3158" stroke="#24424D" strokeLinecap="round" />
      <path d="M17.1177 9.63158L16.7942 13.3158" stroke="#24424D" strokeLinecap="round" />
      <rect x="0.5" y="0.5" width="30" height="19" rx="4.5" stroke="#24424D" />
    </svg>
  );
}
