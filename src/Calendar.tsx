import { useEffect, useState } from 'react';
import Days from './components/Days';
import Divide from './components/Divide';
import MonthViewBox from './components/MonthViewBox';
import Week from './components/Week';
import { useSpecialDayData } from './hooks/useSpecialDayData';
import { createDays } from './lib/utils';
import SwiperProvider from './components/SwiperProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // load on demand

dayjs.locale('ko');

function Calendar() {
	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
	const [date, setDate] = useState<Date>(new Date());
	// const sData = useSpecialDayData({ year, month });
	const prevMonth = () => {
		setDate((prev) => dayjs(prev).subtract(1, 'day').toDate());
	};
	const nextMonth = () => {
		setDate((prev) => dayjs(prev).add(1, 'day').toDate());
	};
	const onSwiper = (e: 'left' | 'right' | 'fail') => {
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
