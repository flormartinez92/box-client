'use client';
//import { useEffect } from 'react';
import Image from 'next/image';
//router
import { usePathname, useRouter } from 'next/navigation';
//*Redux
//import { useAppDispatch } from '@/store/hooks';
//import { setUserInfo } from '@/store/slices/userSlice';
//*RTK QUERY
import { /* useGetProfileQuery, */ useLogoutUserMutation } from '@/store/services/userApi';
//commons
import LogoutButton from '@/commons/LogoutButton';

// type User = {
//   id_user: string;
//   name: string;
//   email: string;
//   isAdmin: boolean;
//   iat: number,
//   exp: number
// };

export default function Header() {
  //const dispatch: any = useAppDispatch();
  // const { userInfo } = useAppSelector((state) => state.user);

  const router = useRouter();
  const path = usePathname();
  const [logoutUser] = useLogoutUserMutation();
  // const { data, isError, isSuccess, isLoading } = useGetProfileQuery(null);

  // const isAdmin: any = data?.isAdmin;

  // useEffect(() => {
  //   if (isLoading) {
  //     if (isError) {
  //       router.push('/login');
  //     }
  //     if (isSuccess) dispatch(setUserInfo(data));

  //     if (data) {
  //       if (isAdmin) router.push('/admin-home');
  //       else router.push('/');
  //     }
  //   }
  // }, [data, dispatch, isAdmin, isError, isSuccess, router, isLoading]);

  const handleButtonLogout = async () => {
    try {
      logoutUser({});
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {path !== '/login' && (
        <header className="w-full flex justify-center items-center pt-3">
          <div className="w-[300px] flex justify-between items-center">
            <Image src={'/img/box.svg'} width={80} height={30} alt="Logo box" />
            {path === '/register' ? null : (
              <LogoutButton
                handleLogout={handleButtonLogout}
                text={'CERRAR SESIÓN'}
                classNameButton={'py-0.5 px-2.5'}
              />
            )}
          </div>
        </header>
      )}
    </>
  );
}
