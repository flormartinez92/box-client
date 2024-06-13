'use client';

import { ChevronDownBig } from '@/commons/icons/ChevronDownBig';
import BoxTitle2 from '@/commons/BoxTitle';

import LemmonButton from '@/commons/LemmonButton';
import DeliveryDetails from '@/commons/DeliveryDetails';
import Link from 'next/link';
import { useGetDeliveryUsersQuery } from '@/store/services/adminApi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUsersDelivery } from '@/store/slices/adminSlice';
import { useEffect } from 'react';
import { dayAndMonthConverter } from '@/utils/dayAndMonthConverter';

type StatusType = 'DESHABILITADO' | 'COMPLETADO' | 'INACTIVO' | 'EN CURSO';
export default function Deliveries() {
  const dispatch: any = useAppDispatch();
  const { selectedDateCalendar } = useAppSelector((state) => state.adminState);
  const { data, error, isSuccess, isLoading } = useGetDeliveryUsersQuery(selectedDateCalendar);

  useEffect(() => {
    if (data && !error) {
      dispatch(setUsersDelivery(data));
    }
  }, [data, error, dispatch]);

  if (isLoading || !isSuccess) {
    return <div>Loading...</div>;
  }

  const dates = dayAndMonthConverter(selectedDateCalendar);
  const day = dates.day;
  const month = dates.month;

  const statusConverter: Record<StatusType, string> = {
    DESHABILITADO: 'disabled',
    COMPLETADO: 'delivered',
    INACTIVO: 'disabled',
    'EN CURSO': 'in course'
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-4 px-7">
      <div className={'w-full max-w-[300px]'}>
        <div className="mb-3 mt-3 tracking-normal w-full">
          <Link href={'admin-home'}>
            <LemmonButton title="repartidores" width={'w-full'} />
          </Link>
        </div>
        <div className="w-full h-[490px]">
          <BoxTitle2
            titleBox={month}
            dateBox={day}
            titleBoxClasses="font-bold"
            dateBoxClasses="font-bold"
            boxClasses={'justify-between h-[35px] mx-5'}
          />
          <div className="bg-white rounded-b-[13px] px-[.56rem] ">
            {data?.map((user: any, i: number) => {
              const status: StatusType = user.status;
              const translatedStatus = statusConverter[status];
              return (
                <Link key={i} href={`/profile-admin/${user.id}`}>
                  <DeliveryDetails
                    name={user.name}
                    percentage={user.percentage}
                    status={translatedStatus}
                    textStatus={status}
                    idUser={user.id}
                  />
                </Link>
              );
            })}
            <div className="flex items-center justify-center h-[3rem]">
              <ChevronDownBig />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
