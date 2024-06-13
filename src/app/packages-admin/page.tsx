'use client';

import BoxTitle from '@/commons/BoxTitle';
import LemmonButton from '@/commons/LemmonButton';
import React, { useState } from 'react';
import { ChevronDownBig } from '@/commons/icons/ChevronDownBig';

import { Box } from '@/commons/icons/Box';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { dayAndMonthConverter } from '@/utils/dayAndMonthConverter';

import {
  useGetDeliveryDetailsQuery,
  useToggleHiddenHistoryAdminMutation
} from '@/store/services/adminApi';
import { EyeClose } from '@/commons/icons/EyeClose';
import { EyeOpen } from '@/commons/icons/EyeOpen';

export default function PackagesAdmin() {
  const { selectedDateCalendar } = useAppSelector((state) => state.adminState);
  const { data, isLoading, isSuccess, refetch } = useGetDeliveryDetailsQuery(selectedDateCalendar);
  const [toggleHistory] = useToggleHiddenHistoryAdminMutation();
  const [toggleShowAllPackages, setToggleShowAllPackages] = useState(false);
  const router = useRouter();
  if (isLoading || !isSuccess) {
    return <div>Loading...</div>;
  }
  const handleToggleHistory = async (id: string) => {
    try {
      await toggleHistory(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleShowAllPackages = () => {
    setToggleShowAllPackages(!toggleShowAllPackages);
  };
  const somePackagesAreHidden = data.packages.totalPackages.some(
    (packageData: any) => packageData.hiddenHistory
  );
  const totalPackages = toggleShowAllPackages
    ? data.packages.totalPackages
    : data.packages.totalPackages.filter((packageData: any) => !packageData.hiddenHistory);

  const packagesDelivered = data.packages.totalPackages.filter(
    (packageData: any) => packageData.status === 'delivered'
  ).length;

  const handleBackToAdminHome = () => {
    router.push('/admin-home');
  };

  const dates = dayAndMonthConverter(selectedDateCalendar);
  const day = dates.day;
  const month = dates.month;

  return (
    <div className="w-full flex flex-col items-center justify-center mt-5 min-h-[calc(100vh-70px)]">
      <div className="w-full max-w-[300px]">
        <div className="mb-3 tracking-normal">
          <LemmonButton
            hanleLemmonButton={handleBackToAdminHome}
            title={'PAQUETES'}
            width={'w-full'}
          />
        </div>
      </div>
      <div className="px-3 max-w-[300px] bg-lightGreen text-xs flex flex-col justify-center items-center">
        <div className="w-[300px] max-h-[35px]">
          <BoxTitle
            titleBox={month}
            titleBoxClasses={'text-[12px] font-[700] text-darkGreen'}
            boxClasses={'justify-between h-[2rem] align-center  px-4'}
            dateBox={day}
          />
        </div>
        <div className="w-[300px] bg-white  h-[353.6px] overflow-y-scroll">
          {somePackagesAreHidden && (
            <>
              <p
                onClick={handleToggleShowAllPackages}
                className="text-[12px] text-darkGreen font-[500] text-center cursor-pointer hover:text-lightPurple hover:border-b-darkGreen p-2"
              >
                {toggleShowAllPackages ? 'Ocultar deseados' : 'Mostrar todos los paquetes'}
              </p>
              <div className={'w-[275px] m-auto border-b-[.1px] border-b-darkGreen '} />
            </>
          )}
          <ul className="w-full h-full">
            <>
              <li className={'text-[12px] text-start w-full pl-5 font-[500] text-darkGreen'}>
                <p className="m-2">
                  {packagesDelivered}{' '}
                  {packagesDelivered !== 1 ? 'paquetes entregados' : 'paquete entregado'}
                </p>
              </li>
              <div className={'w-[275px] m-auto border-b-[.1px] border-b-darkGreen '} />
            </>
            {totalPackages.map((packageData: any, index: number) => (
              <React.Fragment key={index}>
                <PackageDetails
                  handleToggleHistory={handleToggleHistory}
                  packageData={packageData}
                />
                {index !== totalPackages.length - 1 && (
                  <li
                    key={`separator-${index}`}
                    className={'w-[275px] m-auto border-b-[.1px] border-b-darkGreen '}
                  />
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className="bg-white flex justify-center items-center rounded-b-[15px] h-[3rem] w-[300px]">
          <ChevronDownBig />
        </div>
      </div>
    </div>
  );
}

const PackageDetails = ({ packageData, handleToggleHistory }: any) => {
  const deliveryCode = packageData.deliveryCode;
  const direction = ` ${packageData.address} ${
    packageData.addressNumber ? packageData.addressNumber : ''
  } `;
  const location = packageData.city;

  return (
    <li
      className={
        'list-none flex justify-between items-center bg-white  max-w-[300px] w-full h-[75px] m-auto  pl-3'
      }
    >
      <figure className="bg-lightPurple w-[50px] h-[50px] grid place-content-center rounded-2xl">
        <Box width="45" height="45" />
      </figure>
      <div className={'w-[85%] h-full flex items-center justify-betweenn'}>
        <div
          className={
            'leading-[15px] h-full text-[12px] flex flex-col  justify-center  text-darkGreen  font-[400] w-[55%] p-2'
          }
        >
          <h4 className={'font-[500]'}>{deliveryCode}</h4>
          <p>{direction}</p>
          <p>{location}</p>
        </div>

        <div
          onClick={() => handleToggleHistory(packageData._id)}
          className={
            'leading-[15px] pr-4 text-[12px] cursor-pointer items-end flex flex-col justify-between  text-darkGreen font-[400] w-[45%] '
          }
        >
          <div className="border-[1px] border-x-darkGreen py-0 px-1 rounded">
            {packageData.hiddenHistory ? <EyeClose /> : <EyeOpen />}
          </div>
        </div>
      </div>
    </li>
  );
};
