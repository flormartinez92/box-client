'use client';

import React from 'react';
import { saira } from '../../public/fonts/fonts';

import { ArrowBack } from './icons/ArrowBack';

interface LemmonButtonProps {
  height?: string;
  width?: string;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  tracking?: string;
  classNameButton?: string;
  hanleLemmonButton?: () => void;
}

const LemmonButton: React.FC<LemmonButtonProps> = ({
  height = 'h-[40px]',
  width = 'w-[300px]',
  icon = <ArrowBack />,
  title = 'repartos pendientes',
  subtitle = null,
  tracking = 'tracking-[.5px]',
  classNameButton,
  hanleLemmonButton
}) => {
  return (
    <button
      onClick={hanleLemmonButton}
      type="button"
      className={`bg-lemonGreen flex justify-between items-center rounded-[15px] pl-5 pr-5 max-w-[300px] ${height} ${width} ${tracking}`}
    >
      <figcaption
        className={`text-start flex flex-col justify-center ${saira.className} antialiased h-full text-darkGreen ${classNameButton}`}
      >
        <h3 className={'font-bold leading-4 tracking-[.5px] text-start text-lg uppercase'}>
          {title}
        </h3>
        {subtitle && <h5 className="lowercase tracking-wide text-xs font-thin">{subtitle}</h5>}
      </figcaption>
      <figure className={subtitle ? '-rotate-90' : ''}>{icon}</figure>
    </button>
  );
};
export default LemmonButton;
