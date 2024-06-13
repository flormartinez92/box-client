'use client';
import React, { useState } from 'react';
//commons
import LemmonButton from '@/commons/LemmonButton';
//components
import ButtonBottom from '@/commons/ButtonBottom';
//icons
// import Link from 'next/link';
import QuestionConfirmation from '@/commons/QuestionConfirmation';
import { ToastContainer } from 'react-toastify';
import toastAlert from '@/utils/toastifyAlert';
import {
  useGetProfileQuery,
  useLogoutUserMutation,
  useUpdateIsSuitableMutation
} from '@/store/services/userApi';
import { useRouter } from 'next/navigation';

export default function SwornDeclaration() {
  const [isCheck, setIsCheck] = useState({
    drinkAlcohol: true,
    psychoactiveDrug: true,
    familyIssues: true
  });
  const [updateIsSuitable] = useUpdateIsSuitableMutation();
  const [logoutUser] = useLogoutUserMutation();
  const { data: userData } = useGetProfileQuery(null);
  const router = useRouter();

  console.log(isCheck);
  console.log(userData);

  const handleButtonStart = async () => {
    if (isCheck.drinkAlcohol || isCheck.familyIssues || isCheck.psychoactiveDrug) {
      await toastAlert('error', 'No estas apto para trabajar!');
      try {
        updateIsSuitable({ id_user: userData?.id_user, isSuitable: false });
        logoutUser({});
        setTimeout(() => {
          router.push('/login');
        }, 2500);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Esta entrando al ELSE');
      router.push('/');
    }
  };

  // const canContinue = !Object.values(isCheck).every((e) => e);

  return (
    <div className="flex flex-col items-center justify-center py-4 h-[92.5]">
      <ToastContainer />
      <div className="w-full max-w-[300px]">
        <div className="text-center mb-2 mt-2 tracking-normal">
          <LemmonButton
            classNameButton={'ml-7'}
            title={'declaración jurada'}
            width={'w-full'}
            icon={''}
          />
        </div>
        <div>
          <QuestionConfirmation
            handleCheck={() => setIsCheck({ ...isCheck, drinkAlcohol: !isCheck.drinkAlcohol })}
            isCheck={isCheck.drinkAlcohol}
            question={'¿Ha consumido bebidas alcohólicas en las últimas 12 horas?'}
            text={''}
          />
          <QuestionConfirmation
            handleCheck={() =>
              setIsCheck({ ...isCheck, psychoactiveDrug: !isCheck.psychoactiveDrug })
            }
            isCheck={isCheck.psychoactiveDrug}
            question={'¿Usted está haciendo uso de algún tipo de medicamento psicoactivo?'}
            text={'por ejemplo tranquilizantes, antigripales antialérgicos o para insomnio'}
          />
          <QuestionConfirmation
            handleCheck={() => setIsCheck({ ...isCheck, familyIssues: !isCheck.familyIssues })}
            isCheck={isCheck.familyIssues}
            question={
              '¿Tiene usted algún problema familiar, emocional o de cualquier tipo que lo distraiga?'
            }
            text={''}
          />
        </div>
        <div className="w-[300px] rounded-[15px]">
          <div className="bg-lightGreen gap-y-3 mt-[30px] relative">
            <ButtonBottom
              handleButton={handleButtonStart}
              titleButton={'continuar'}
              buttonClassName={'text-lemonGreen uppercase bg-darkGreen w-[300px] p-2'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
