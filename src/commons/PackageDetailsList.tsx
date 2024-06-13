'use client';

import React, { useEffect, useState } from 'react';
import { Box } from './icons/Box';
import { Trash } from './icons/Trash';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import {
  usePutCancelAssignedPackageMutation,
  usePutPackageInCourseMutation
} from '@/store/services/packageApi';
import toastAlert from '@/utils/toastifyAlert';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

interface packageDetailsList {
  deliveryCode?: string;
  direction?: string;
  location?: string;
  status?: 'in course' | 'pending' | 'delivered';
  icon?: any;
  _id?: string;
  type?: string;
  packageId?: string;
}

export default function PackageDetailsList({
  deliveryCode = '#0A235',
  direction = 'Amenabar 2356,',
  location = 'CABA',
  status = 'pending',
  _id
}: packageDetailsList) {
  const pathName = usePathname();
  const statusChanges = {
    'in course': { bgCircle: 'bg-lightGreen', textStatus: 'en curso' },
    pending: { bgCircle: 'bg-orange', textStatus: 'pendiente' },
    delivered: { bgCircle: 'bg-darkGreen', textStatus: 'entregado' }
  };

  const { userInfo } = useAppSelector((store) => store.user);
  const [putPackageInCourse] = usePutPackageInCourseMutation();
  const [putCancelAssignedPackage] = usePutCancelAssignedPackageMutation();
  const [packageState, setPackageState] = useState(status);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [router, userInfo]);

  const handleStartClick = async () => {
    try {
      await putPackageInCourse({ packageId: _id, userId: userInfo?.id_user }).unwrap();
      setPackageState('in course');
    } catch (error: any) {
      if (error.data.message === 'User already has package in course') {
        toastAlert('error', 'No puedes tener mas de un paquete en curso!');
      } else {
        console.error(error);
      }
    }
  };

  const handleDeleteClick = async () => {
    try {
      await putCancelAssignedPackage({ packageId: _id, userId: userInfo?.id_user }).unwrap();
      console.log('estoy en el TRYYYY');
    } catch (error: any) {
      console.error(error);
      console.log('estoy en el CATCHHHH');
    }
  };

  return (
    <li
      className={
        'list-none flex justify-between items-center  max-w-[300px] w-full h-[75px] m-auto  pl-3'
      }
    >
      <ToastContainer />
      <figure className="bg-lightPurple w-[50px] h-[50px] grid place-content-center rounded-2xl">
        <Link href={`/shipment/${status}/${_id}`}>
          <Box width="45" height="45" />
        </Link>
      </figure>
      <div className={'w-[85%] h-full flex items-center justify-betweenn'}>
        <div
          className={
            'leading-[15px] h-full text-[12px] flex flex-col  justify-center  text-darkGreen  font-[400] w-[55%] p-2'
          }
        >
          <h4 className={'font-[500]  '}>{deliveryCode}</h4>
          <p>{direction}</p>
          <p>{location}</p>
        </div>

        <div
          className={`leading-[15px] py-3 h-full text-[12px] items-end flex flex-col  ${
            pathName === '/packages' ? 'justify-center pr-4' : 'justify-between '
          }  text-darkGreen font-[400] w-[45%] `}
        >
          {pathName === '/packages' ? (
            <Trash />
          ) : (
            <>
              <div
                className={'flex h-[15px] items-center min-w-[78px] bg-lightWhite rounded-s-[5px]'}
              >
                <div
                  className={`w-[7px] h-[7px] rounded-full ${statusChanges[packageState]?.bgCircle} mx-1.5`}
                />
                <h4 className={'font-[500] uppercase text-[10px] '}>
                  {statusChanges[packageState]?.textStatus}
                </h4>
              </div>
              <figure className={'pr-3 w-full flex justify-end'}>
                {packageState === 'in course' ? (
                  <button onClick={handleDeleteClick}>
                    <Trash />
                  </button>
                ) : packageState === 'pending' ? (
                  <button
                    onClick={handleStartClick}
                    className={
                      'font-[400] min-w-[62px] w-[62px] uppercase text-darkGreen border-x-darkGreen border rounded-[5px] text-[12px]'
                    }
                  >
                    Iniciar
                  </button>
                ) : (
                  ''
                )}
              </figure>
            </>
          )}
        </div>
      </div>
    </li>
  );
}
