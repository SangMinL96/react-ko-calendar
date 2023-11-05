import { DayType } from '../types';

type Props = {
	days: DayType[];
	handleDayClick?: (date: string) => void;
	tileContent?: (date: string) => React.ReactElement;
};

function Days({ days,  tileContent, handleDayClick }: Props) {
	return (
		<div className="calendar-container__day_view">
			{days.map(({ day, date, isCurrentMonth, isWeekend, weekendType }, index) => {
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
				const is클릭막기 = !isCurrentMonth;
				return (
					<button
						type="button"
						key={index}
						className={classNames}
						onClick={() => {
							if (handleDayClick) {
								if (is클릭막기) return;
								handleDayClick(date);
							}
						}}
					>
						<span className="calendar-container__day_view__day__txt">{day}</span>
						{tileContent && tileContent(date)}
					</button>
				);
			})}
		</div>
	);
}

export default Days;
