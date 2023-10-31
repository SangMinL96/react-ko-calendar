import dayjs from 'dayjs';
import { DayType, sDataType } from '../types';

type Props = {
	days: DayType[];
	handleDayClick?: (date: string) => void;
	tileContent?: (date: string) => React.ReactElement;
	sData?: sDataType[];
};

function Days({ days, sData, tileContent, handleDayClick }: Props) {
	return (
		<div className="calendar-container__day_view">
			{days.map(({ day, date, isCurrentMonth, isWeekend, weekendType }, index) => {
				const sDate = sData?.find((f) => dayjs(f.date).get('day') === day);
				let classNames;
				if (!isCurrentMonth) {
					classNames = `calendar-container__day_view__day disable`;
				} else if (isWeekend) {
					classNames = `calendar-container__day_view__day weekend_${
						weekendType === '토' ? 'saturday' : weekendType === '일' ? 'sunday' : ''
					}`;
				} else {
					classNames = 'calendar-container__day_view__day';
				}
				return (
					<button
						type="button"
						key={index}
						className={classNames}
						onClick={() => {
							if (handleDayClick) handleDayClick(date);
						}}
					>
						<span className="calendar-container__day_view__day__txt">{day}</span>
						{sDate?.name && (
							<strong className="calendar-container__day_view__day__sday">{sDate?.name}</strong>
						)}
						{tileContent && tileContent(date)}
					</button>
				);
			})}
		</div>
	);
}

export default Days;
