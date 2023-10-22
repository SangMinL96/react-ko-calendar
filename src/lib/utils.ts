import dayjs from 'dayjs';
import { DayType } from '../types';

export const classes = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

export const newDateKo = () => {
	const now = new Date();
	const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
	const koreaTimeDiff = 9 * 60 * 60 * 1000;
	const korNow = new Date(utc + koreaTimeDiff);
	return korNow;
};

const onPrevMonthCheck = (month: number) => {
	if (month === 0) {
		return 12;
	}
	return month;
};

const onNextMonthCheck = (month: number) => {
	if (month === 0) {
		return 12;
	}
	return month;
};
export const ddFormat = (n: number) => (n < 10 ? `0${n}` : n);

export const createDays = (date: Date) => {
	const days = [];
	const year = dayjs(date).year();
	const month = dayjs(date).month() + 1;
	const firstDay = dayjs(date).date(1); // 현재 월의 첫 번째 날을 나타내는 Date 객체를 생성합니다.
	const lastDay = dayjs(date).endOf('month'); // 현재 월의 마지막 날을 나타내는 Date 객체를 생성합니다.
	const prevMonthLastDate = dayjs(date).subtract(1, 'month').endOf('month').date(); // 이전 달의 마지막 날을 가져옵니다.
	const firstDayOfWeek = dayjs(firstDay).day(); // 현재 월의 첫 번째 날의 요일을 가져옵니다.
	const lastDayOfWeek = dayjs(lastDay).day(); // 현재 월의 마지막 날의 요일을 가져옵니다.

	// 이전 달의 마지막 날짜를 추가
	for (let i = prevMonthLastDate - firstDayOfWeek + 1; i <= prevMonthLastDate; i++) {
		days.push({
			day: i,
			data: `${year}/${ddFormat(month - 1)}/${ddFormat(i)}`,
			isCurrentMonth: false,
			goToClick: 'back',
			label: `${year}년 ${ddFormat(onPrevMonthCheck(month - 1))}월 ${ddFormat(i)}일`,
		});
	}

	for (let i = 1; i <= dayjs(lastDay).date(); i++) {
		const is토요일 = (firstDayOfWeek + i) % 7 === 0;
		const is일요일 = (firstDayOfWeek + i) % 7 === 1;
		days.push({
			day: i,
			data: `${year}/${ddFormat(month)}/${ddFormat(i)}`,
			isCurrentMonth: true,
			isWeekend: is토요일 || is일요일,
			weekendType: is토요일 ? '토' : is일요일 ? '일' : '평일',
			label: `${year}년 ${ddFormat(month)}월 ${ddFormat(i)}일`,
		});
	}

	if (lastDayOfWeek !== 6) {
		for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
			days.push({
				day: i,
				data: `${year}/${ddFormat(month + 1)}/${ddFormat(i)}`,
				goToClick: 'forward',
				isCurrentMonth: false,
				label: `${year}년 ${ddFormat(onNextMonthCheck(month + 1))}월 ${i}일`,
			});
		}
	}
	return days as DayType[];
};
