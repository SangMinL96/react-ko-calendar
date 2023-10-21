import { DayType } from '../types';

type Props = {
	days: DayType[];
	handleDayClick: () => void;
};

function Days({ days }: Props) {
	console.log(days);
	return (
		<div className="calendar-container__day_view">
			{days.map(({ day, isCurrentMonth, isWeekend, weekendType }, index) => {
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
					<button type="button" key={index} className={classNames}>
						{day}
					</button>
				);
			})}
		</div>
	);
}

export default Days;
