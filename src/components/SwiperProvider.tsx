import React, { useCallback, useRef, useState } from 'react';

type Props = {
	children: React.ReactNode;
	isSwipe?: boolean;
	onSwiper?: (value: 'left' | 'right' | 'fail') => void;
};

function SwiperProvider({ children, onSwiper, isSwipe = false }: Props) {
	const xMoveValue = useRef(0); // 현재 x 위치
	const xFirstTouchValue = useRef(0); // 처음 터치 이벤트 시작 위치
	const [isDragging, setIsDragging] = useState(false); // 터치후 드래그 진행 여부
	/**
	 * @const xValue 마우스 커서 x위치
	 */
	const handleTouchStart = useCallback((ev: any) => {
		const xValue = (ev as TouchEvent).touches ? (ev as TouchEvent).touches?.[0]?.clientX : (ev as MouseEvent)?.screenX;
		xMoveValue.current = xValue;
		xFirstTouchValue.current = xValue;
		setIsDragging(true);
	}, []);

	/**
	 * @const xValue 마우스 커서 x위치
	 * @const currentLeft 현재 위치해 있는 wrapper Left 값
	 * @const deltaX 실시간 X위치 값 차이
	 */
	const handleTouchMove = useCallback(
		(ev: any) => {
			if (isDragging) {
				const xValue = (ev as TouchEvent).touches ? (ev as TouchEvent).touches?.[0]?.clientX : (ev as MouseEvent)?.screenX;
				xMoveValue.current = xValue;
			}
		},
		[isDragging],
	);
	/**
	 * @const firstTouchDiffValue X값이 얼마나 움직였는지 확인
	 * @const leftMoveValue 슬라이드넓이 + 슬라이드Index 곱한후 (sideMargin)가운데 정렬을 위해 여백값 추가
	 */
	const handleTouchEnd = useCallback(() => {
		// 첫클릭 -> 움직인 값 차이
		const firstTouchDiffValue = xMoveValue.current - xFirstTouchValue.current;

		// 드래그 값이 작을때
		if (onSwiper) {
			if (Math.abs(firstTouchDiffValue) < 60) {
				onSwiper('fail');
			} else if (firstTouchDiffValue < 0) {
				onSwiper('right');
			} else {
				onSwiper('left');
			}
		}

		xFirstTouchValue.current = 0;
		setIsDragging(false);
	}, []);
	return (
		<div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
			{children}
		</div>
	);
}

export default SwiperProvider;
