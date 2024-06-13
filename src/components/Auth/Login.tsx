'use client';
import React from 'react';
import Link from 'next/link';
//*Toast
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import toastAlert from '@/utils/toastifyAlert';
//*Redux
import { useAppDispatch } from '@/store/hooks';
import { setUserInfo } from '@/store/slices/userSlice';
//*Commons
import ButtonBottom from '@/commons/ButtonBottom';
import Input from '@/commons/Input';
import useInput from '@/hooks/useInput';
//*Icons
import { BoxTitleLogin } from '@/commons/icons/BoxTitleLogin';
//*axios
import axios, { AxiosError } from 'axios';

interface Message {
  statusCode: number;
  message: string;
}

export default function LoginClient() {
  //redux
  const dispatch: any = useAppDispatch();

  // const { data: users, isFetching } = useGetUsersQuery(null);
  //router
  const router = useRouter();
  const mail = useInput('mail');
  const password = useInput('password');

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mail.value.trim() == '' || password.value.trim() == '') {
      return toastAlert('error', '¡Completar todos los campos!');
    }
    try {
      const { data: userLogin } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/LoginUser`,
        {
          email: mail.value,
          password: password.value
        },
        { withCredentials: true }
      );

      if (userLogin.isDisabled || !userLogin.isSuitable) {
        await toastAlert('error', 'No estas habilitado para trabajar hoy!');
        return;
      } else {
        dispatch(setUserInfo(userLogin));
        await toastAlert('success', 'Bienvenido!');

        if (userLogin.isAdmin === true) {
          setTimeout(() => {
            router.push('/admin-home');
          }, 2500);
        } else {
          setTimeout(() => {
            router.push('/');
          }, 2500);
        }
      }
    } catch (error: any) {
      console.error(error);
      const axiosError: AxiosError = error;
      const message = axiosError.response?.data as unknown as Message;
      console.log(message);
      switch (message.message) {
        case 'User not found':
          toastAlert('error', 'Usuario no registrado!');
          break;
        case 'Invalid password':
          toastAlert('error', 'Contraseña incorrecta!');
          break;
        default:
          console.error(error);
          break;
      }
    }

    // if (!isFetching) {
    //   const user = users?.filter((user) => {
    //     return mail.value === user.email && user.password === password.value;
    //   });
    //   const userIsAuth = user?.length === 1;
    //   if (userIsAuth) {
    //     router.push('/');
    //   } else {
    //     console.error('error');
    //   }
    // }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <section className="h-screen w-full bg-darkGreen bg-[url(../../public/img/BgLogin.svg)] flex justify-center items-center py-4 px-7">
      <ToastContainer />
      <form
        onSubmit={handleOnSubmit}
        className="bg-lightGreen h-[305px] w-full max-w-[300px] relative rounded-[15px]"
      >
        <div className="flex flex-col gap-y-5 mb-8 mt-16 mx-5">
          <div className="flex flex-col gap-y-[5px]">
            <Input
              value={mail.value}
              onChange={mail.onChange}
              onBlur={mail.blur}
              onFocus={mail.focus}
              inputClasses="bg-lightGreen leading-normal tracking-tight font-light"
              type="email"
              placeholder="Email@contraseña.com"
            />
            <p className="h-[5px] text-[12px] text-[#B6371C]">{mail.message}</p>
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <Input
              value={password.value}
              onChange={password.onChange}
              onBlur={password.blur}
              onFocus={password.focus}
              inputClasses="bg-lightGreen leading-normal tracking-tight font-light"
              type="password"
              placeholder="contraseña"
              eyeOn={false}
            />
            <p className="h-[5px] text-[12px] text-[#B6371C]">{password.message}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 mt-10 mx-5 ">
          <ButtonBottom
            typeButton={true}
            titleButton="Ingresar"
            buttonClassName="uppercase bg-darkGreen w-[100%]"
            titleButtonClasses={'text-lemonGreen'}
          />
          <Link href="/register">
            <ButtonBottom
              handleButton={handleRegister}
              titleButton="Crear tu cuenta"
              buttonClassName="uppercase w-[100%]"
              titleButtonClasses="text-darkGreen "
            />
          </Link>
          <p className={'text-center text-darkGreen underline text-[13px]'}>Olvidé mi contraseña</p>
        </div>
        <div className=" bg-lemonGreen w-full max-w-[200px] h-[69px] absolute -top-9 left-0 rounded-t-[15px] rounded-r-[15px]">
          <div className="w-full h-full flex justify-center items-center">
            <BoxTitleLogin />
          </div>
        </div>
      </form>
    </section>
  );
}
