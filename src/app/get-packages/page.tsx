'use client';

import Address from '@/commons/Address';
import ButtonBottom from '@/commons/ButtonBottom';
import BoxTitle from '@/commons/BoxTitle';
import LemmonButton from '@/commons/LemmonButton';
import React, { useEffect, useState } from 'react';
import { ChevronDownBig } from '@/commons/icons/ChevronDownBig';
import { useGetPackagesQuery, usePostPackageMutation } from '@/store/services/packageApi';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery } from '@/store/services/userApi';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setPackage } from '@/store/slices/packageSlice';
import { useAppSelector } from '@/store/hooks';

export default function GetPackages() {
  const { data: packages } = useGetPackagesQuery(null);
  const { data: userData } = useGetProfileQuery(null);
  const [postPackage] = usePostPackageMutation();
  const [packagesUser, setpackagesUser] = useState(packages);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const packageState = useAppSelector((store) => store.packages);

  useEffect(() => {
    if (packages) {
      setpackagesUser(packages.map((item) => ({ ...item, toggleStatus: false })));
    }
  }, [packages]);

  function onClickButton(id: any) {
    setpackagesUser((prevCart: any) =>
      prevCart.map((item: any) =>
        item._id === id ? { ...item, toggleStatus: !item.toggleStatus } : item
      )
    );
  }
  const handleButtonStart = async () => {
    const packages = packagesUser?.filter((idem) => idem.toggleStatus);
    if (packages?.length == 0) return;
    console.log(packages);
    const packagesFilter = packages?.map((idem) => {
      return idem._id;
    });

    try {
      await postPackage({
        packagesIds: packagesFilter,
        userId: userData?.id_user
      }).unwrap();
      dispatch(setPackage(!packageState));
      router.push('/sworn-declaration');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-5 min-h-[calc(100vh-70px)]">
      {/* {JSON.stringify(packagesUser?.map((e) => e.toggleStatus))} */}
      <div className="w-full max-w-[300px]">
        <div className="mb-3 tracking-normal">
          <Link href={'/'}>
            <LemmonButton title={'obtener paquetes'} width={'w-full'} />
          </Link>
        </div>
      </div>
      <div className="px-3 max-w-[300px] bg-lightGreen text-xs flex flex-col justify-center items-center">
        <div className="w-[300px] max-h-[35px]">
          <BoxTitle
            titleBox={'¿Cuántos paquetes repartirás hoy?'}
            titleBoxClasses={'text-center mb-5'}
            boxClasses={'justify-center h-10'}
          />
        </div>
        <div className="w-[300px] h-[353.6px] overflow-y-scroll">
          {packagesUser?.map((item) => {
            return (
              <Address
                key={item._id}
                address={item.address}
                city={item.city}
                addressNumber={item.addressNumber}
                onClickButton={() => {
                  onClickButton(item._id);
                }}
                status={item.toggleStatus}
              />
            );
          })}
        </div>
        <div className="bg-white flex justify-center items-center rounded-b-[15px] h-[3rem] w-[300px]">
          <ChevronDownBig />
        </div>
      </div>
      <div className="bg-lightGreen flex flex-col gap-y-3 mt-5 mb-8">
        <ButtonBottom
          handleButton={handleButtonStart}
          titleButton={'iniciar jornada'}
          buttonClassName={'text-lemonGreen uppercase bg-darkGreen w-[300px] p-2'}
        />
      </div>
    </div>
  );
}
