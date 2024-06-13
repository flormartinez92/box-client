import Image from 'next/image';
import React from 'react';
import ButtonBottom from './ButtonBottom';
import { useRouter } from 'next/navigation';

interface details {
  imgDeliveries?: string;
  title?: 'Repartidores' | 'Paquetes';
  percentage?: number;
  enabledDeliveries?: number;
  totalDeliveries?: number;
  packagesDistributed?: number;
  totalPackages?: number;
}

interface dummyData {
  name: string;
  status: 'enabled' | 'disabled';
  profileImg: string;
}
const dummyData: dummyData[] = [
  {
    name: 'Ivan',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Florencia',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Victoria',
    status: 'enabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Nico',
    status: 'enabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Pedro',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Alan',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Laura',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Florencia',
    status: 'enabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'Carlos',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  },
  {
    name: 'German',
    status: 'disabled',
    profileImg: '/img/perfil.png'
  }
];

export default function DeliveryAvailability({
  imgDeliveries = '/img/perfil.png',
  title = 'Paquetes',
  percentage = 0,
  enabledDeliveries = 0,
  totalDeliveries = dummyData.length,
  packagesDistributed = 13,
  totalPackages = 20
}: details) {
  const router = useRouter();
  const displayValue =
    title === 'Repartidores'
      ? `${enabledDeliveries}/${totalDeliveries}`
      : `${packagesDistributed}/${totalPackages}`;
  const handleClick = () => {
    if (title === 'Repartidores') router.push('/deliveries');
    if (title === 'Paquetes') router.push('/packages-admin');
  };

  return (
    <li className={'list-none flex max-w-[300px] w-full h-[100px] m-auto bg-white  '}>
      <div className="basis-[30%] flex justify-center items-center ">
        <div className="w-[80px] h-[80px] relative flex justify-center items-center">
          <div className="w-[71px] h-[71px] absolute border-lightWhite border-4 rounded-full"></div>
          <div className="w-[71px] h-[71px] absolute rounded-full border-4 border-lightPurple ">
            <span className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-darkGreen">
              {percentage}%
            </span>
          </div>
        </div>
      </div>
      <div className="basis-[45%] h-full flex items-center justify-start pl-2">
        <div
          className={
            'leading-[15px] h-full text-[12px] flex flex-col  justify-center  text-darkGreen font-[400] w-auto space-y-[2px]'
          }
        >
          <h4 className="font-[700] text-sm">{title}</h4>
          <h3 className="text-xs">{`${displayValue} ${
            title === 'Repartidores' ? 'Habilitados' : 'Repartidos'
          }`}</h3>
          <div className="pt-1 flex">
            <div className="bg-white rounded-full w-[1.7rem] h-[1.7rem] flex justify-center items-center">
              <div className=" w-[1.563rem] h-[1.563rem] rounded-full relative bg-darkGreen">
                <Image
                  src={imgDeliveries}
                  alt="profile"
                  layout="fill"
                  objectFit="cover"
                  className=" rounded-full"
                ></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-[25%] flex">
        <ButtonBottom
          titleButton="VER"
          buttonClassName="bg-darkGreen w-[52px]"
          titleButtonClasses="text-lemonGreen "
          handleButton={handleClick}
        />
      </div>
    </li>
  );
}
