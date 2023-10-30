import dayjs from 'dayjs';
import 'dayjs/locale/es'; // load on demand
import { useState } from 'react';
import Days from './components/Days';
import MonthViewBox from './components/MonthViewBox';
import SwiperProvider from './components/SwiperProvider';
import Week from './components/Week';
import { useSpecialDayData } from './hooks/useSpecialDayData';
import { createDays } from './lib/utils';

dayjs.locale('ko');

type Props = {
	tileContent?: (date: string) => React.ReactElement;
};
function Calendar({ tileContent }: Props) {
	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
	const [date, setDate] = useState<Date>(new Date());
	const year = dayjs(date).get('year');
	const month = dayjs(date).get('month') + 1;
	const sData = useSpecialDayData({ year, month });

	const prevMonth = () => {
		setDate((prev) => dayjs(prev).subtract(1, 'month').toDate());
	};
	const nextMonth = () => {
		setDate((prev) => dayjs(prev).add(1, 'month').toDate());
	};
	const onSwiper = (e: 'left' | 'right' | 'fail') => {
		if (e === 'left') {
			prevMonth();
		}
		if (e === 'right') {
			nextMonth();
		}
	};

	const handleMonthChange = (propsDate: string) => {
		setDate(dayjs(propsDate).toDate());
	};

	const handleDayClick = () => {};

	return (
		<SwiperProvider onSwiper={onSwiper}>
			<div data-testid="calendar-container" className="calendar-container">
				<MonthViewBox
					year={year}
					month={month}
					handleMonthChange={handleMonthChange}
					prevMonth={prevMonth}
					nextMonth={nextMonth}
				/>
				<Week daysOfWeek={daysOfWeek} />
				<Days
					tileContent={tileContent}
					days={createDays(date)}
					sData={sData}
					handleDayClick={handleDayClick}
				/>
			</div>
		</SwiperProvider>
	);
}

export default Calendar;
