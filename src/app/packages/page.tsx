'use client';
import React from 'react';
//router
import { useRouter } from 'next/navigation';
//commons
import BoxTitle from '@/commons/BoxTitle';
import PackageDetailsList from '@/commons/PackageDetailsList';
import LemmonButton from '@/commons/LemmonButton';

//icons
import { ChevronDownBig } from '@/commons/icons/ChevronDownBig';

const fakeDataHistory = [
  {
    packageID: '#0G370',
    direction: 'Heredia 785',
    location: 'CABA',
    status: 'delivered'
  },
  {
    packageID: '#0G370',
    direction: 'Heredia 785',
    location: 'CABA',
    status: 'delivered'
  },
  {
    packageID: '#0G370',
    direction: 'Heredia 785',
    location: 'CABA',
    status: 'delivered'
  },
  {
    packageID: '#0G370',
    direction: 'Heredia 785',
    location: 'CABA',
    status: 'delivered'
  },
  {
    packageID: '#0G370',
    direction: 'Heredia 785',
    location: 'CABA',
    status: 'delivered'
  }
];

//verificar any
// interface dataProps {
//   packageID?: string;
//   direction?: string;
//   location?: string;
//   status: 'in course' | 'pending' | 'delivered';
// }

interface packageProps {}

export default function Package({}: packageProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <section className="h-[100vh] flex flex-col justify-between pt-5">
      <div className={'h-[90%] flex flex-col items-center w-full'}>
        <LemmonButton hanleLemmonButton={handleRedirect} title="paquetes" />

        <article
          className={
            'w-[300px] mt-2 h-[490px] flex flex-col justify-between bg-white rounded-[15px] '
          }
        >
          <BoxTitle
            titleBox={'Enero'}
            titleBoxClasses={'uppercase font-bold '}
            boxClasses={'justify-between h-[35px] px-5 h-10 text-[14px]'}
            dateBoxClasses={'font-[400]'}
            dateBox="mie / 03"
          />

          <ul className={'w-full h-fit flex  flex-col  items-center'}>
            {
              <>
                <li className={'text-[12px] text-start w-full pl-5 font-[500] text-darkGreen'}>
                  <p>58 paquetes entregados</p>
                </li>
                <div className={'w-[275px] border-b-[.1px] border-b-darkGreen '} />
              </>
            }
            {fakeDataHistory?.map(
              ({ packageID, location, status, direction }: any, index: number, array) => (
                <React.Fragment key={index}>
                  <PackageDetailsList
                    status={status}
                    location={location}
                    direction={direction}
                    packageId={packageID}
                  />
                  {index !== array.length - 1 && (
                    <li
                      key={`separator-${index}`}
                      className={'w-[275px] border-b-[.1px] border-b-darkGreen '}
                    />
                  )}
                </React.Fragment>
              )
            )}
          </ul>
          <div className="bg-white flex border-t border-t-darkGreen justify-center items-center rounded-b-[15px] h-[3rem] w-full">
            <ChevronDownBig />
          </div>
        </article>
      </div>
    </section>
  );
}
