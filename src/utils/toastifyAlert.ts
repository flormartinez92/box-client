import { Bounce, ToastOptions, toast } from 'react-toastify';

export default async function toastAlert(status: string, message: string) {
  const options: ToastOptions = {
    style: { width: '300px', margin: 'auto' },
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce
  };

  switch (status) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    // Puedes agregar más casos según tus necesidades
    default:
      toast(message, options);
      break;
  }
}
