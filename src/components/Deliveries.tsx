'use client';
import React, { useState } from 'react';
//icon
import { ChevronDownSmall } from '@/commons/icons/ChevronDownSmall';
//commons
import LemmonButton from '@/commons/LemmonButton';
import PackageDetailsList from '@/commons/PackageDetailsList';
import { Package } from '@/commons/interfaces/PackagesInterface';

interface deliveries {
  lemmonTitle?: string;
  data?: Package[];
  deliveryType?: string;
  roundedClass?: string;
  total?: number;
}

export default function Deliveries({
  lemmonTitle = 'repartos pendientes',
  data,
  deliveryType,
  roundedClass = 'rounded-[15px]',
  total = 0
}: deliveries) {
  const [toggleList, setToggleList] = useState(false);

  const useHandleLemmonToggle = () => {
    setToggleList((prev) => !prev);
  };

  return (
    <section
      className={`w-[300px] min-h-[100px] ${roundedClass} m-auto ${!toggleList ? 'bg-white' : ''}`}
    >
      <LemmonButton
        hanleLemmonButton={useHandleLemmonToggle}
        height={'h-[43px]'}
        title={lemmonTitle}
        icon={<ChevronDownSmall />}
      />

      <ul
        className={`w-full h-fit ${
          !toggleList ? 'flex' : 'hidden'
        } bg-lightWhite   flex-col  items-center `}
      >
        {deliveryType === 'history' && (
          <>
            <li className={'text-[12px] text-start w-full pl-5 font-[500] text-darkGreen'}>
              <p className="m-2">{total} paquetes entregados</p>
            </li>
            <div className={'w-[275px] border-b-[.1px] border-b-darkGreen '} />
          </>
        )}

        {data?.map(
          ({ deliveryCode, city, status, address, _id }: Package, index: number, array) => (
            <React.Fragment key={index}>
              {/* <Link href={`/shipment/${deliveryType}/${_id}`} className="w-full"> */}
              <PackageDetailsList
                status={status}
                location={city}
                direction={address}
                deliveryCode={deliveryCode}
                _id={_id}
                type={deliveryType}
              />
              {/* </Link> */}
              {/* <PackageDetailsList
                status={status}
                location={city}
                direction={address}
                deliveryCode={deliveryCode}
                _id={_id}
                type={deliveryType}
              /> */}
              {index !== array.length - 1 && (
                <li
                  key={`separator-${index}`}
                  className={'w-[275px] border-b-[.1px] border-b-darkGreen '}
                />
              )}
            </React.Fragment>
          )
        )}
      </ul>
    </section>
  );
}
