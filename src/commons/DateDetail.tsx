'use client';
import React, { useState } from 'react';
//icons
import { ArrowLeftBox } from './icons/ArrowLeftBox';
import { ArrowRightBox } from './icons/ArrowRightBox';
//font
import { saira } from '../../public/fonts/fonts';
import BoxTitle from '../commons/BoxTitle';
import { useAppDispatch } from '@/store/hooks';
import { setSelectedDateCalendar } from '@/store/slices/adminSlice';
import { convertDateToString } from '@/utils/convertDateToString';

export default function DateDetail() {
  const todayDate = new Date();
  const weekDays = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const dates = [];

  const dispatch = useAppDispatch();

  for (let i = -2; i <= 2; i++) {
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() + i);
    dates.push(date);
  }

  const handleDateClick = (date: Date) => {
    if (date <= todayDate) {
      const dateToString: string = convertDateToString(date);

      dispatch(setSelectedDateCalendar(dateToString));
      setSelectedDate(date);
    }
  };

  const currentMonth =
    dates.length > 0 ? dates[0].toLocaleString('default', { month: 'long' }) : '';

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    direction === 'prev'
      ? newDate.setDate(newDate.getDate() - 1)
      : newDate.setDate(newDate.getDate() + 1);

    setSelectedDate(newDate);
  };

  return (
    <>
      <div className="max-w-[300px] w-full m-auto">
        <BoxTitle
          titleBoxClasses="font-bold uppercase text-sm"
          boxClasses={'justify-between h-[30px] mx-5 '}
          titleBox={currentMonth}
        />
      </div>
      <div className="max-w-[300px] w-full h-[54px] m-auto bg-white flex justify-center items-center rounded-b-[15px] ">
        <div className="flex justify-around items-center w-[96%]">
          <div onClick={() => handleDateChange('prev')}>
            <ArrowLeftBox />
          </div>
          {dates.map((date, index) => (
            <div
              key={index}
              className={`text-center leading-4 text-darkGreen ${
                date.getDate() === selectedDate.getDate()
                  ? 'bg-lemonGreen w-[34px] h-[34px] rounded-[5px]'
                  : ''
              } ${index > 0 && date > todayDate ? 'opacity-50' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-xs">{weekDays[date.getDay()]}</div>
              <div className={`${saira.className} font-bold`}>
                {date.getDate().toString().padStart(2, '0')}
              </div>
            </div>
          ))}
          <div onClick={() => handleDateChange('next')}>
            <ArrowRightBox />
          </div>
        </div>
      </div>
    </>
  );
}
