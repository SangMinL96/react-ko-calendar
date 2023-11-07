import dayjs from 'dayjs';
import 'dayjs/locale/es'; // load on demand
import { useState } from 'react';
import Days from './components/Days';
import MonthViewBox from './components/MonthViewBox';
import SwiperProvider from './components/SwiperProvider';
import Week from './components/Week';
import { createDays } from './lib/utils';

dayjs.locale('ko');

type Props = {
	tileContent?: (date: string) => React.ReactElement;
	handleDayClick?: (date: string) => void;
};
function Calendar({ tileContent, handleDayClick }: Props) {
	const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
	const [date, setDate] = useState<Date>(new Date());
	const year = dayjs(date).get('year');
	const month = dayjs(date).get('month') + 1;

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
					handleDayClick={handleDayClick}
				/>
			</div>
		</SwiperProvider>
	);
}

export default Calendar;
// "dependencies": {
// 	"@encarpkg/api": "workspace:^",
// 	"@encarpkg/shared": "workspace:^",
// 	"app": "link:./src",
// 	"body-scroll-lock": "^3.1.5",
// 	"classnames": "^2.3.2",
// 	"gulp": "^4.0.2",
// 	"gulp.spritesmith": "^6.13.0",
// 	"js-cookie": "^3.0.1",
// 	"merge-stream": "^2.0.0",
// 	"query-string": "^8.1.0",
// 	"react": "17.0.2",
// 	"react-dom": "17.0.2",
// 	"swiper": "6.8.4",
// 	"yargs": "^17.7.2"
//   },
//   "devDependencies": {
// 	"@mdx-js/react": "^1.6.22",
// 	"@rollup/plugin-alias": "^4.0.3",
// 	"@rollup/plugin-node-resolve": "^15.0.1",
// 	"@rollup/plugin-typescript": "^11.1.2",
// 	"@storybook/addon-actions": "^6.5.13",
// 	"@storybook/addon-docs": "^6.5.13",
// 	"@storybook/addon-essentials": "^6.5.13",
// 	"@storybook/addon-links": "^6.5.13",
// 	"@storybook/builder-webpack5": "^6.5.13",
// 	"@storybook/manager-webpack5": "^6.5.13",
// 	"@storybook/preset-scss": "^1.0.3",
// 	"@storybook/react": "^6.5.13",
// 	"@types/body-scroll-lock": "^3.1.0",
// 	"@types/gulp": "^4.0.9",
// 	"@types/js-cookie": "^3.0.0",
// 	"@types/mdx-js__react": "^1.5.5",
// 	"@types/node": "^18.14.2",
// 	"@types/query-string": "^6.3.0",
// 	"@types/react": "^17.0.51",
// 	"@types/react-dom": "^17.0.17",
// 	"@types/yargs": "^17",
// 	"@yarnpkg/pnpify": "^3.1.6",
// 	"css-loader": "^6.8.1",
// 	"env-cmd": "^10.1.0",
// 	"sass": "^1.55.0",
// 	"sass-loader": "^13.3.2",
// 	"style-loader": "^3.3.3",
// 	"tslib": "^2.6.2",
// 	"vite": "^4.1.4",
// 	"vite-tsconfig-paths": "^4.0.5"
//   },