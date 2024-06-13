import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { usePatchUpdateUserStatusMutation } from '@/store/services/adminApi';

interface hello {
  name?: string;
  editMode?: boolean;
  imagen?: string;
  subTitle?: string;
  className?: string;
  classNamediv1?: string;
  classNamediv2?: string;
  classNameh2?: string;
  classNameGroup?: string;
  icon?: React.ReactNode;
  userId?: string;
  isDisabled?: boolean;
}

export default function HelloAdmin({
  name = 'Victoria',
  editMode = true,
  imagen = '/img/Mask group.png',
  subTitle = 'HABILITADO',
  classNamediv1,
  classNamediv2,
  classNameh2,
  userId,
  isDisabled = false
}: hello) {
  const pathname = usePathname();

  const [changeMode, setchangeMode] = useState({ state: isDisabled, subtitle: 'HABILITADO' });
  const [updateUserStatus, handlers] = usePatchUpdateUserStatusMutation();

  const handleSwitchChange = async () => {
    setchangeMode({
      state: !changeMode.state,
      subtitle: changeMode.state ? 'DESHABILITADO ' : 'HABILITADO'
    });

    const isDisabled: boolean = changeMode.state;
    if (handlers.isLoading) {
      console.log('cargando...');
    }

    try {
      await updateUserStatus({ id: userId, isDisabled }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-[300px] min-h-[90px] rounded-[15px] m-auto  bg-white flex items-center${
        classNamediv1 || ''
      }`}
    >
      <div className={`ml-2 flex flex-row items-center ${classNamediv2 || ''}`}>
        <Image src={imagen} alt="" height={60} width={60} className="mr-2" />
        <div className={'flex flex-col ml-1'}>
          <h1 className={'text-darkGreen font-bold'}>{name}</h1>
          {pathname.split('/')[1] === 'profile-admin' ? (
            <h2
              className={`text-darkGreen text-sm bg-lightGreen rounded font-bold ${
                classNameh2 || ''
              }`}
            >
              {changeMode.state ? 'DESHABILITADO ' : 'HABILITADO'}
            </h2>
          ) : (
            <h2 className={`text-darkGreen text-sm ${classNameh2 || ''}`}>{subTitle}</h2>
          )}
        </div>
        {editMode ? (
          <label className="relative inline-flex items-center cursor-pointer ml-16">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={handleSwitchChange}
            />
            <div className="w-11 h-6 bg-darkGreen rounded-full peer dark:bg-gray-700 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-lemonGreen after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-lemonGreen after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-darkGreen peer-checked:bg-green-600"></div>
          </label>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
