'use client';
import React, { useEffect } from 'react';
//commons
import LemmonButton from '@/commons/LemmonButton';
import HelloAdmin from '@/commons/HelloAdmin';
//components
import DateDetail from '@/commons/DateDetail';
import ButtonBottom from '@/commons/ButtonBottom';
//icons
import { Plus } from '@/commons/icons/Plus';
import DeliveriesAdmin from '@/components/DeliveriesAdmin';
import Link from 'next/link';
//redux
import { useGetDeliveryDetailsQuery } from '@/store/services/adminApi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setDeliveryDetails } from '@/store/slices/adminSlice';

export default function AdminHome() {
  const dispatch = useAppDispatch();
  const adminState = useAppSelector((state) => state.adminState);
  const { data, error, isLoading } = useGetDeliveryDetailsQuery(adminState.selectedDateCalendar);

  useEffect(() => {
    if (data && !error) {
      dispatch(setDeliveryDetails(data));
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('error', error);
    return <div>Error...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="w-full max-w-[300px]">
        <div className="text-center mb-2 mt-6  tracking-normal">
          <LemmonButton title={'gestionar pedidos'} width={'w-full'} icon={''} />
        </div>
        <div>
          <HelloAdmin
            name={'¡Hola Admin!'}
            editMode={false}
            subTitle={'Estos son los pedidos del día'}
          />
        </div>
        <div className="mb-4 mt-2 tracking-normal text-sm">
          <DateDetail />
        </div>
        <div className="px-3 max-w-[300px] max-h-[332px] bg-lightGreen text-xs flex flex-col justify-center items-center">
          <div className="w-[300px] rounded-[15px]">
            <DeliveriesAdmin data={data} />
            <div className="bg-lightGreen gap-y-3 mt-[10px] relative">
              <Link href={'/add-packages'}>
                <ButtonBottom
                  titleButton={'nuevo paquete'}
                  icon={<Plus />}
                  buttonClassName={'text-lemonGreen uppercase bg-darkGreen w-[300px] p-2'}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
