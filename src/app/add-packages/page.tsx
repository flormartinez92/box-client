'use client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronBox } from '@/commons/icons/ChevronBox';
import { useState } from 'react';

import Input from '@/commons/Input';
import ButtonBottom from '@/commons/ButtonBottom';
import LemmonButton from '@/commons/LemmonButton';
import useInput from '@/hooks/useInput';
import { usePostAddPackageMutation } from '@/store/services/adminApi';

import toastAlert from '@/utils/toastifyAlert';
import { convertDateToString } from '@/utils/convertDateToString';
import Link from 'next/link';

interface AddPackageProps {
  // props?
}

type PackageStructure = {
  address: string;
  addressNumber: number;
  city: string;
  deadLine: string | Date;
  receptorName: string;
  weight: number;
  postalCode: number;
  // coordinates: number[];
};

const AddPackage: React.FC<AddPackageProps> = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const address = useInput('address');
  const city = useInput('city');
  const name = useInput('name');

  const package_weight = useInput('package_weight');
  const postalCode = useInput('postalCode');
  const addressNumber = useInput('addressNumber');

  const [postPackage, handlers] = usePostAddPackageMutation();

  const handleAddPackage = async () => {
    const packageStructure: PackageStructure = {
      city: city.value,
      address: address.value,
      addressNumber: parseInt(addressNumber.value),

      deadLine: convertDateToString(startDate),
      receptorName: name.value,
      weight: parseInt(package_weight.value),
      postalCode: parseInt(postalCode.value)
      // coordinates: [-1.7667, -2.09878]
    };
    try {
      await postPackage(packageStructure).unwrap();
      await toastAlert('success', 'Paquete agregado correctamente!');
      // Clear inputs
      const arrayInputs = [address, city, name, package_weight, postalCode, addressNumber];
      arrayInputs.forEach((input) => input.setValue(''));
      setStartDate(new Date());
      alert('Paquete agregado correctamente!');
    } catch (err) {
      console.error(err);
      alert('Error al agregar paquete');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start pt-2 px-7">
      <div>
        <div className="mb-3 mt-4  tracking-normal w-full">
          <Link href={'admin-home'}>
            <LemmonButton title="agregar paquetes" width={'w-full'} />
          </Link>
        </div>
        <div className="w-full ">
          <div className="bg-white  pt-[35px] pr-[20px] pb-5 pl-[20px] rounded-[13px] ">
            <form action="" className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={city.value}
                  onChange={city.onChange}
                  onBlur={city.blur}
                  onFocus={city.focus}
                  placeholder="City"
                  type="text"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{address.message}</p>
              </div>

              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={address.value}
                  onChange={address.onChange}
                  onBlur={address.blur}
                  onFocus={address.focus}
                  placeholder="Dirección"
                  type="text"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{address.message}</p>
              </div>

              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={addressNumber.value}
                  onChange={addressNumber.onChange}
                  onBlur={addressNumber.blur}
                  onFocus={addressNumber.focus}
                  placeholder="Numero de dirección"
                  type="text"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{address.message}</p>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={postalCode.value}
                  onChange={postalCode.onChange}
                  onBlur={postalCode.blur}
                  onFocus={postalCode.focus}
                  placeholder="Código postal"
                  type="text"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{postalCode.message}</p>
              </div>

              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={name.value}
                  onChange={name.onChange}
                  onBlur={name.blur}
                  onFocus={name.focus}
                  placeholder="Nombre de quien recibe"
                  type="text"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{name.message}</p>
              </div>

              <div className="flex flex-col gap-y-[5px]">
                <Input
                  value={package_weight.value}
                  onChange={package_weight.onChange}
                  onBlur={package_weight.blur}
                  onFocus={package_weight.focus}
                  placeholder="Peso del paquete (Kg)"
                  type="email"
                />
                <p className="h-[5px] text-[12px] text-[#B6371C]">{package_weight.message}</p>
              </div>

              <div className="relative mt-1">
                <span>Fecha de entrega</span>
                <div className="border border-black rounded-md pt-[6px] pr-[11px] pb-[5px] pl-[15px] ">
                  <DatePicker
                    className="outline-none w-[232px] cursor-pointer"
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </div>
                <div className="absolute bottom-[8px] right-[11px] pointer-events-none">
                  <ChevronBox />
                </div>
              </div>
            </form>
          </div>
          <div className="bg-lightGreen flex flex-col gap-y-3 mt-[10px] relative">
            <ButtonBottom
              isDisabled={handlers.isLoading}
              titleButton={'AGREGAR'}
              buttonClassName={`text-lemonGreen uppercase ${
                handlers.isLoading ? 'bg-gray' : 'bg-darkGreen'
              }  w-[300px] p-2`}
              handleButton={handleAddPackage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
