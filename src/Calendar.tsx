import { useEffect, useState } from 'react';
import Days from './components/Days';
import Divide from './components/Divide';
import MonthViewBox from './components/MonthViewBox';
import Week from './components/Week';
import { useSpecialDayData } from './hooks/useSpecialDayData';
import { createDays } from './lib/utils';
import SwiperProvider from './components/SwiperProvider';

const ko_Date = (date: Date) => {
	const localeDate = new Intl.DateTimeFormat('ko-KR', {
		timeZone: 'Asia/Seoul',
	})
		.format(date)
		.replace(/[. ]/g, ',')
		.split(',')
		.filter(Boolean)
		.map((item) => parseInt(item));
	return new Date(`${localeDate[0]}/${localeDate[1]}/${localeDate[2]}`);
};
function Calendar() {
	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
	const [date, setDate] = useState<Date>(new Date());
	const year = date.getFullYear();
	console.log(ko_Date(date).getUTCMonth());
	const month = ko_Date(date).getMonth();
	const sData = useSpecialDayData({ year, month });
	const prevMonth = () => {
		const lastMonth = new Date(date);
		lastMonth.setMonth(lastMonth.getMonth() - 1);
		console.log(lastMonth);
		setDate(lastMonth);
	};
	const nextMonth = () => {
		const newDate = new Date(year, date.getMonth() + 1);
		setDate(newDate);
	};
	const onSwiper = (e: 'left' | 'right' | 'fail') => {
		console.log('Adsf');
		if (e === 'left') {
			prevMonth();
		}
		if (e === 'right') {
			nextMonth();
		}
	};
	const handleDayClick = () => {};
	return (
		<SwiperProvider onSwiper={onSwiper}>
			<div data-testid="calendar-container" className="calendar-container">
				<MonthViewBox date={date} setDate={setDate} prevMonth={prevMonth} nextMonth={nextMonth} />
				<Week daysOfWeek={daysOfWeek} />
				<Divide />
				<Days days={createDays(date)} handleDayClick={handleDayClick} />
			</div>
		</SwiperProvider>
	);
}

export default Calendar;
