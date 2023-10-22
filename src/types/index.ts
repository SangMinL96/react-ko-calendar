export type DayType = {
	day: number;
	isCurrentMonth: boolean;
	isWeekend?: boolean;
	weekendType?: '일' | '토' | '평일';
	goToClick?: 'back' | 'forward';
};

export type sDataType = {
	date: string;
	name: string;
};
