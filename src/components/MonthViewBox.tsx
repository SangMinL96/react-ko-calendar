import React, { useState } from 'react';
import { months } from '../constants/common';

type Props = {
	year: number;
	month: number;
	prevMonth: () => void;
	nextMonth: () => void;
	handleMonthChange: (month: string) => void;
};

function MonthViewBox({ year, month, prevMonth, nextMonth, handleMonthChange }: Props) {
	const [isDropdown, setIsDropdown] = useState(false);
	const handleDropDown = (value: boolean) => {
		setIsDropdown(value);
	};

	return (
		<div className="calendar-container__month_view">
			<button
				type="button"
				className="calendar-container__month_view__prev_btn"
				onClick={prevMonth}
			>
				{prevIcon}
			</button>
			<strong
				tabIndex={0}
				role="button"
				onBlur={() => {
					setTimeout(() => handleDropDown(false), 0);
				}}
				onClick={() => handleDropDown(true)}
				className="calendar-container__month_view cur_month"
			>{`${year}년 ${month}월`}</strong>
			<button
				type="button"
				className="calendar-container__month_view__next_btn"
				onClick={nextMonth}
			>
				{nextIcon}
			</button>
			{isDropdown && (
				<div className="calendar-container__month_dropbox">
					{months.map((item) => {
						const isActive = item === month ? ' active' : '';
						return (
							<button
								key={`${item}_month_dropbox_key`}
								type="button"
								className={`calendar-container__month_dropbox__button${isActive}`}
								onClick={() => handleMonthChange(`${year}/${item}/01`)}
							>
								{item}월
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default MonthViewBox;

const nextIcon = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289Z"
			fill="#181818"
		/>
	</svg>
);
const prevIcon = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z"
			fill="#181818"
		/>
	</svg>
);
