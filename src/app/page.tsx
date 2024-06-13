'use client';
//router
import { useRouter } from 'next/navigation';
//redux
import { useAppSelector } from '@/store/hooks';

//commons
import ButtonBottom from '@/commons/ButtonBottom';
import Deliveries from '@/components/Deliveries';

import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

import {
  usePackagePendingAndInCourseQuery,
  useUserHistoryQuery
} from '@/store/services/packageApi';
import { useGetProfileQuery } from '@/store/services/userApi';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/store/slices/userSlice';

export default function Home() {
  const { userInfo } = useAppSelector((store) => store.user);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { data: packages, refetch } = usePackagePendingAndInCourseQuery({
    userId: userInfo?.id_user || ''
  });
  const { data, refetch: userRefetch } = useGetProfileQuery(null);
  const packageState = useAppSelector((store) => store.packages);
  const { data: userHistory, refetch: historyRefetch } = useUserHistoryQuery({
    userId: userInfo?.id_user || ''
  });

  useEffect(() => {
    if (!userInfo && data) {
      userRefetch();
      dispatch(setUserInfo(data));
      // router.push('/login');
    }
  }, [data, router, userInfo, userRefetch, dispatch]);

  useEffect(() => {
    refetch();
    historyRefetch();
  }, [packageState, refetch, historyRefetch]);

  const handleButton = () => {
    router.push('/packages');
  };
  return (
    <main className=" h-[92.5vh] flex flex-col justify-between">
      <div className="h-[80%] mt-4 w-full flex flex-col justify-evenly">
        <div className="h-[40%] overflow-y-scroll">
          <Deliveries data={packages} deliveryType={'pending'} />
        </div>
        <div className="h-[50%] overflow-y-scroll ">
          <Deliveries
            lemmonTitle={'historial de repartos'}
            deliveryType={'history'}
            data={userHistory}
            total={userHistory?.length}
          />
        </div>
      </div>
      <Link href={'/get-packages'}>
        <ButtonBottom
          handleButton={handleButton}
          buttonClassName={'bg-darkGreen w-[270px] mb-2'}
          titleButtonClasses={'text-lemonGreen'}
          titleButton="obtener paquetes"
        />
      </Link>
    </main>
  );
}
