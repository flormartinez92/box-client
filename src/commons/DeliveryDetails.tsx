import React from 'react';
// import { Circle } from './icons/Circle.tsx';
import Image from 'next/image';
//import { usePackagePendingAndInCourseQuery, useUserHistoryQuery } from '@/store/services/packageApi';

interface delivery {
  percentage?: number;
  name?: string;
  imgProfile?: string;
  status?: 'in course' | 'disabled' | 'delivered' | string;
  textStatus: 'DESHABILITADO' | 'COMPLETADO' | 'INACTIVO' | 'EN CURSO';
  idUser?: string;
}

export default function DeliveryDetails({
  percentage = 0,
  name = 'Farid',
  status = 'disabled',
  imgProfile = '/img/perfil.png',
  textStatus = 'DESHABILITADO',
  idUser
}: delivery) {
  // const rotationAngle = (percentage / 100) * 360;
  // const purpleCircleStyle = {
  //   transform: `rotate(${rotationAngle}deg)`
  // };
  // const centralPointStyle = {
  //   top: `${50 - Math.cos((rotationAngle - 90) * (Math.PI / 180)) * 41}%`,
  //   left: `${50 + Math.sin((rotationAngle - 90) * (Math.PI / 180)) * 41}%`
  // };
  console.log(idUser);

  const statusChanges: any = {
    'in course': { bgCircle: 'bg-lightGreen', textStatus: 'en curso' },
    disabled: { bgCircle: 'bg-darkGrey', textStatus: 'deshabilitado' },
    delivered: { bgCircle: 'bg-darkGreen', textStatus: 'entregado' }
  };

  return (
    <li
      className={'list-none flex max-w-[300px] w-full h-[100px] m-auto bg-white border-b-[0.5px] '}
    >
      <div className="basis-[30%] flex justify-center items-center">
        <div className="w-[80px] h-[80px] relative flex justify-center items-center">
          <div className="w-[71px] h-[71px] absolute border-lightWhite border-4 rounded-full"></div>
          <div
            // style={purpleCircleStyle}
            className="w-[71px] h-[71px] absolute rounded-full border-4 border-lightPurple "
          >
            <span className="text-lg font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-darkGreen">
              {percentage}%
            </span>
          </div>
        </div>
        {/* <Circle /> */}
        {/* <div
            style={centralPointStyle}
            className="w-[11px] h-[11px] absolute bg-lightPurple rounded-full shadow"></div> */}
        {/* </div> */}
      </div>
      <div className="basis-[40%] h-full flex items-center justify-start pl-2">
        <div
          className={
            'leading-[15px] h-full text-[12px] flex flex-col  justify-center  text-darkGreen font-[400] w-auto'
          }
        >
          <h4 className="font-[500]">{name}</h4>
          <div className={'flex h-[15px] items-center bg-lightWhite rounded-[5px] mt-1'}>
            <div
              className={`w-[7px] h-[7px] rounded-full ${statusChanges[status].bgCircle} mx-1.5`}
            />
            <h4 className={'font-[500] uppercase text-[10px] mr-1.5'}>{textStatus}</h4>
          </div>
        </div>
      </div>
      <div className="basis-[30%] flex justify-center items-center">
        <div className="w-10 h-10 rounded-full relative bg-darkGreen">
          <Image
            src={imgProfile}
            alt="profile"
            layout="fill"
            objectFit="cover"
            className=" rounded-full"
          ></Image>
        </div>
      </div>
    </li>
  );
}

// Esto tengo que reveer, es la parte del %
{
  /* <div className="flex items-center justify-center p-3">
        <div className="w-[80px] h-[80px] relative">
          <div className="w-[71px] h-[71px] absolute border-lightWhite border-4 rounded-full"></div>
          <div
            style={purpleCircleStyle}
            className="w-[71px] h-[71px] absolute rounded-full border-4 border-lightPurple -rotate-125 "></div>
          <div
            style={centralPointStyle}
            className="w-[11px] h-[11px] absolute bg-lightPurple rounded-full shadow"></div>
        </div>
      </div> */
}

{
  /* <li
      className={
        'list-none flex justify-between items-center  max-w-[300px] w-full h-[100px] m-auto  pl-3 bg-white border-b-[0.5px]'
      }>
      <div>
        <Circle />
      </div>
      <div className={'w-[60%] h-full flex items-center justify-between '}>
        <div
          className={
            'leading-[15px] h-full text-[12px] flex flex-col  justify-center  text-darkGreen font-[400] w-auto p-2'
          }>
          <h4 className="font-[500]">{name}</h4>
          <div className={'flex h-[15px] items-center bg-lightWhite rounded-[5px] mt-1'}>
            <div
              className={`w-[7px] h-[7px] rounded-full ${statusChanges[status].bgCircle} mx-1.5`}
            />
            <h4 className={'font-[500] uppercase text-[10px] mr-1.5'}>
              {statusChanges[status].textStatus}
            </h4>
          </div>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full relative bg-darkGreen">
        <Image
          src={'/img/perfil.png'}
          alt="profile"
          layout="fill"
          objectFit="cover"
          className=" rounded-full"></Image>
      </div>
    </li> */
}
