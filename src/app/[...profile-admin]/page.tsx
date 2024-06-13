'use client';
import React, { useState } from 'react';
//icons
//import { ChevronDownSmall } from '@/commons/icons/ChevronDownSmall';
import { ChevronDownBig } from '@/commons/icons/ChevronDownBig';
//commons
import LemmonButton from '@/commons/LemmonButton';
import HelloAdmin from '@/commons/HelloAdmin';
//components
import Deliveries from '@/components/Deliveries';
//use
import { useParams } from 'next/navigation';
import {
  usePackagePendingAndInCourseQuery,
  useUserHistoryQuery
} from '@/store/services/packageApi';

import { useGetUsersQuery } from '@/store/services/adminApi';

export default function ProfileAdmin() {
  const params = useParams()['profile-admin'];
  const userId: string = params[1];

  const [openHistory, setOpenHistory] = useState(false);

  const {
    data: packages,
    isLoading: isLoadingPackages,
    isSuccess: isSuccessPackages,
    isError: isErrorPackages
  } = usePackagePendingAndInCourseQuery({
    userId: userId || ''
  });

  console.log(packages);

  const {
    data: packagesHistory,
    isLoading: isLoadingPackagesHistory,
    isSuccess: isSuccessPackagesHistory,
    isError: isErrorPackagesHistory
  } = useUserHistoryQuery({
    userId: userId || ''
  });

  const {
    data: dataUsers,
    isSuccess: isSuccessUsers,
    isLoading: isLoadingUsers
  } = useGetUsersQuery(null);

  if (isLoadingUsers && !isSuccessUsers) return <div>Loading user.. </div>;

  const isLoading = isLoadingPackages && isLoadingPackagesHistory;
  const isSuccess = isSuccessPackages && isSuccessPackagesHistory;
  const isError = isErrorPackages || isErrorPackagesHistory;
  if (isLoading && !isSuccess) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const user = dataUsers?.find((user: any) => user._id === userId);

  return (
    <div className="flex flex-col items-center justify-center py-4 h-[92.5]">
      <div className="w-full max-w-[300px]">
        <div className="mb-2 tracking-normal">
          <LemmonButton title={'gestionar pedidos'} width={'w-full'} />
        </div>
        <div>
          <HelloAdmin
            subTitle={user.isDisabled ? 'DESHABILITADO' : 'HABILITADO'}
            isDisabled={user.isDisabled}
            userId={userId}
          />
        </div>
        {/* <div className="mb-4 mt-2 tracking-normal text-sm">
          <LemmonButton
            title={'repartos pendientes'}
            width={'w-full'}
            icon={<ChevronDownSmall />}
            subtitle={'sin repartos'}
          />
        </div> */}

        <div
          onClick={() => setOpenHistory((prev) => !prev)}
          className="px-3 max-w-[300px] max-h-[332px] bg-lightGreen text-xs flex flex-col justify-center items-center mt-[50px]"
        >
          <div className="w-[300px]">
            <Deliveries
              lemmonTitle={'historial de repartos'}
              data={packagesHistory}
              total={packagesHistory?.length || 0}
              deliveryType={'history'}
              roundedClass="rounded-t-[15px]"
            />

            {!openHistory && (
              <div className="bg-white flex justify-center items-center rounded-b-[15px] border-t-[0.5px] border-darkGreen h-[3rem] w-[300px]">
                <ChevronDownBig />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
