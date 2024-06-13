import { IconsInterface } from '../interfaces/IconsInterface';

export function Box({ width, height, color }: IconsInterface) {
  return (
    <svg
      width={width || '36'}
      height={height || '36'}
      viewBox="0 0 36 36"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Home_ Iniciar jornada">
        <path
          id="Vector"
          d="M29.9812 15.6C29.9368 14.0267 29.7872 13.0237 29.2831 12.1677C28.5662 10.9503 27.2752 10.2728 24.6932 8.91782L22.2933 7.65836C20.1865 6.55279 19.1331 6 18 6C16.8669 6 15.8135 6.55279 13.7067 7.65836L11.3068 8.91782C8.72475 10.2728 7.43375 10.9503 6.71688 12.1677C6 13.3851 6 14.9 6 17.9298V18.0702C6 21.1 6 22.6149 6.71688 23.8323C7.43375 25.0497 8.72475 25.7272 11.3068 27.0822L13.7067 28.3416C15.8135 29.4472 16.8669 30 18 30C19.1331 30 20.1865 29.4472 22.2933 28.3416L24.6932 27.0822C27.2752 25.7272 28.5662 25.0497 29.2831 23.8323C29.7872 22.9763 29.9368 21.9733 29.9812 20.4"
          stroke="#24424D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          id="Vector_2"
          d="M28.8 12.6L24 15M18 18L7.20001 12.6M18 18V29.4M18 18C18 18 21.2912 16.3544 23.4 15.3C23.6343 15.1828 24 15 24 15M24 15V19.2M24 15L12.6 9"
          stroke="#24424D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
