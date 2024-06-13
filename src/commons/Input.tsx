/* eslint-disable */
'use client';
import { useState, ChangeEvent } from 'react';
import { EyeClose } from './icons/EyeClose';
import { EyeOpen } from './icons/EyeOpen';
interface input {
  placeholder?: string;
  type?: string;
  eyeOn?: boolean;
  inputClasses?: string;
  name?: string;
  value?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder,
  type = 'text',
  eyeOn,
  inputClasses,
  ...formikProps
}: input) {
  const [isEyeClose, setIsEyeClose] = useState(eyeOn);

  function handleClickEye() {
    setIsEyeClose(!isEyeClose);
  }

  interface InputTypes {
    text: string;
    password: string;
    email: string;
  }
  interface InputTypes {
    [key: string]: string;
  }

  const inputTypes: InputTypes = {
    text: 'text',
    password: isEyeClose ? 'text' : 'password',
    email: 'email'
  };

  return (
    <>
      <div className="relative">
        <input
          className={`${inputClasses} outline-none w-full border-b-[0.5px] pb-0.5 text-sm`}
          type={inputTypes[type]}
          placeholder={placeholder}
          {...formikProps}
        />
        {isEyeClose === false && (
          <div className="absolute top-1 right-[5px] cursor-pointer" onClick={handleClickEye}>
            <EyeClose />
          </div>
        )}
        {isEyeClose === true && (
          <div className="absolute top-1 right-[5px] cursor-pointer" onClick={handleClickEye}>
            <EyeOpen />
          </div>
        )}
      </div>
    </>
  );
}
