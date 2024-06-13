import { IconsInterface } from '../interfaces/IconsInterface';

export function CheckOff({ classNameCheck, onClick }: IconsInterface) {
  return <div className={`rounded-full ${classNameCheck}`} onClick={onClick}></div>;
}
