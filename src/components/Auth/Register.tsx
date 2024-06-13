'use client';

import ButtonBottom from '@/commons/ButtonBottom';
import Input from '@/commons/Input';
import LemmonButton from '@/commons/LemmonButton';
import { CameraPlus } from '@/commons/icons/CameraPlus';
import useInput from '@/hooks/useInput';
import { useRegisterUserMutation } from '@/store/services/userApi';
import toastAlert from '@/utils/toastifyAlert';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterClient = () => {
  const name = useInput('name');
  const lastname = useInput('lastname');
  const mail = useInput('mail');
  const password = useInput('password');
  const repeatPassword = useInput('password');
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  const handleSessionInit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.value !== repeatPassword.value) {
      return toastAlert('error', 'Las contraseñas deben coincidir!');
    }
    try {
      await registerUser({
        name: name.value,
        lastname: lastname.value,
        email: mail.value,
        password: password.value
      }).unwrap();

      toastAlert('success', 'Usuario creado exitosamente!');
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } catch (error) {
      console.error('Error al procesar el registro:', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-4 px-7">
      <ToastContainer />
      <div className={'w-full max-w-[300px] '}>
        <div className="mb-3 tracking-normal w-full">
          <LemmonButton title="creá tu cuenta" width={'w-full'} />
        </div>
        <div className="w-full">
          <div className="bg-white  p-5 rounded-[13px] ">
            <form onSubmit={handleSessionInit} className="flex flex-col gap-y-4">
              <div className="flex justify-center items-center mb-2">
                <div className="p-8 bg-lightWhite rounded-[1.7rem]">
                  <CameraPlus />
                </div>
              </div>

              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={name.value}
                  onChange={name.onChange}
                  onFocus={name.focus}
                  onBlur={name.blur}
                  placeholder="Nombre"
                  type="text"
                  inputClasses=""
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{name.message}</p>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={lastname.value}
                  onChange={lastname.onChange}
                  onFocus={lastname.focus}
                  onBlur={lastname.blur}
                  placeholder="Apellido"
                  type="text"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{lastname.message}</p>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={mail.value}
                  onChange={mail.onChange}
                  onFocus={mail.focus}
                  onBlur={mail.blur}
                  placeholder="Email@domain.com"
                  type="email"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{mail.message}</p>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={password.value}
                  onChange={password.onChange}
                  onFocus={password.focus}
                  onBlur={password.blur}
                  placeholder="Contraseña"
                  type="password"
                  eyeOn={true}
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{password.message}</p>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={repeatPassword.value}
                  onChange={repeatPassword.onChange}
                  onFocus={repeatPassword.focus}
                  onBlur={repeatPassword.blur}
                  placeholder="Confirmar contraseña"
                  type="password"
                  eyeOn={false}
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{repeatPassword.message}</p>
              </div>

              <div className="flex flex-col gap-y-3 mt-8">
                <ButtonBottom
                  typeButton={true}
                  titleButton="Crear"
                  buttonClassName="uppercase bg-darkGreen w-[100%]"
                  titleButtonClasses={'text-lightGreen'}
                />
                <Link href="/login">
                  <ButtonBottom
                    titleButton="Iniciar sesión"
                    buttonClassName="uppercase w-[100%]"
                    titleButtonClasses="text-darkGreen "
                  />
                </Link>
                <Link href="/login">
                  <p className={'text-center text-darkGreen underline text-[14px]'}>
                    ¿Ya tenés tu cuenta?
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
