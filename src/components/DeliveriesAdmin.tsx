'use client';
import React, { useState } from 'react';
//icon
import { ChevronDownSmall } from '@/commons/icons/ChevronDownSmall';
//commons
import LemmonButton from '@/commons/LemmonButton';
import DeliveryAvailability from '@/commons/DeliveryAvailability';

// interface data {
//   imgDeliveries?: string;
//   title?: 'Repartidores' | 'Paquetes';
//   percentage?: number;
//   enabledDeliveries?: number;
//   totalDeliveries?: number;
//   packagesDistributed?: number;
//   totalPackages?: number;
// }

interface deliveriesAdmin {
  lemmonTitle?: string;
  data?: object | undefined;
  deliveryType?: string;
  roundedClass?: string;
}

export default function DeliveriesAdmin({
  lemmonTitle = 'detalles',
  deliveryType,
  roundedClass = 'rounded-[15px]',
  data
}: deliveriesAdmin) {
  const [toggleList, setToggleList] = useState(false);

  const useHandleLemmonToggle = () => {
    setToggleList((prev) => !prev);
  };

  const usersData = (data as { users?: any })?.users;
  const packageData = (data as { packages?: any })?.packages;

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

      <ul className={`w-full h-fit ${!toggleList ? 'flex' : 'hidden'}   flex-col  items-center`}>
        {deliveryType === 'history' && (
          <>
            <li className={'text-[12px] text-start w-full pl-5 font-[500] text-darkGreen'}>
              <p className="m-2">58 paquetes entregados</p>
            </li>
            <div className={'w-[275px] border-b-[.1px] border-b-darkGreen '} />
          </>
        )}
        <div className={'w-[275px] border-b-[.1px] border-b-darkGreen '}>
          <DeliveryAvailability
            title={'Repartidores'}
            enabledDeliveries={usersData.availablesLength}
            percentage={Math.ceil(usersData.percentage)}
            totalDeliveries={usersData.totalUsersLength}
          />
          <div className={'w-[275px] border-b-[.1px] border-b-darkGreen '} />
          <DeliveryAvailability
            totalPackages={packageData.totalPackagesLength}
            packagesDistributed={packageData.packagesDeliveredLength}
            title={'Paquetes'}
            percentage={packageData.percentage ? packageData.percentage : 0}
          />
        </div>
      </ul>
    </section>
  );
}
