// import { useAppDispatch } from '@/store/hooks';
// import { setUserAuth } from '@/store/slices/userSlice';
import React from 'react';

interface LogoutButtonProps {
  classNameButton?: string;
  text?: string;
  handleLogout?: () => void;
}

export default function LogoutButton({ text, classNameButton, handleLogout }: LogoutButtonProps) {
  // const dispatch = useAppDispatch();
  // const handleLogout = () => {
  //   dispatch(setUserAuth(false));
  // };

  return (
    <button
      onClick={handleLogout}
      className={`bg-lightGreen text-sm text-darkGreen rounded-xl border-darkGreen border-2 ${classNameButton}`}
    >
      {text}
    </button>
  );
}
