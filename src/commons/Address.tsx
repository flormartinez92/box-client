import React from 'react';
//icons
import { CheckOK } from './icons/CheckOK';
import { CheckOff } from './icons/CheckOff';

interface Props {
  address?: string;
  addressNumber?: number;
  city?: string;
  status?: boolean | number;
  onClickButton?(): void;
}

export default function Address({ status, onClickButton, address, city, addressNumber }: Props) {
  return (
    <div className="bg-white flex justify-start items-center border-b-[1px] border-darkGreen">
      <div
        className={'w-[30rem] h-[3.1rem] flex items-center gap-x-4 ml-6 font-Roboto text-darkGreen'}
        onClick={onClickButton}
      >
        {status ? (
          <CheckOK
            height="27px"
            width="27px"
            color="#24424D"
            classNameCheck="bg-[#CEF169] rounded-full"
          />
        ) : (
          <CheckOff classNameCheck="border-darkGreen border-[1px] w-[27px] h-[27px]" />
        )}
        <h2>
          {address} {addressNumber}, {city}
        </h2>
      </div>
    </div>
  );
}
