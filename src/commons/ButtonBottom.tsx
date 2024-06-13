import React from 'react';
interface button {
  titleButton?: string;
  titleButtonClasses?: string;
  buttonClassName?: string;
  typeButton?: boolean;
  icon?: React.ReactNode;
  handleButton?: () => void;
  isDisabled?: boolean;
}

export default function ButtonBottom({
  typeButton = false,
  handleButton,
  titleButton,
  icon,
  titleButtonClasses,
  buttonClassName,
  isDisabled = false
}: button) {
  return (
    <button
      disabled={isDisabled}
      type={typeButton ? 'submit' : 'button'}
      onClick={handleButton}
      className={`h-[30px] m-auto  border border-solid border-darkGreen flex justify-center items-center rounded-[10px] ${buttonClassName}`}
    >
      <h2 className={`text-xs uppercase font-normal  ${titleButtonClasses}`}>
        <span className="flex items-center gap-2">
          {titleButton} {icon}
        </span>
      </h2>
    </button>
  );
}
