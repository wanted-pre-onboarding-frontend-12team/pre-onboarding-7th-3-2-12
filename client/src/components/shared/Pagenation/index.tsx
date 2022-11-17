import { Button } from '@src/components';
import React, { startTransition, useCallback, useEffect, useState } from 'react';

type Props = {
	currentPage: number;
	totalPage: number;
	onPagenationChange: (newPage: number) => void;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	filterObj: object;
	searchKeyword: string;
};

const INITAL_PAGE = 1;
const PagePerView = 10;

const Pagenation = (props: Props) => {
	const [startPage, setStartPage] = useState(INITAL_PAGE);
	const [endPage, setEndPage] = useState(PagePerView);

	useEffect(() => {
		if (props.totalPage > PagePerView) {
			setEndPage(PagePerView);
		} else {
			setEndPage(props.totalPage);
		}
	}, [props.totalPage]);

	useEffect(() => {
		props.setCurrentPage(INITAL_PAGE);
		setStartPage(INITAL_PAGE);
		if (props.totalPage > PagePerView) {
			setEndPage(PagePerView);
		} else {
			setEndPage(props.totalPage);
		}
	}, [props.filterObj, props.searchKeyword]);

	const numberArrayGenerator = useCallback(
		(startPage: number, endPage: number) => {
			let array = [];
			for (let i = startPage; i < endPage + 1; i++) {
				array.push(i);
			}
			console.log(array);
			return array;
		},
		[endPage, startPage],
	);

	const handlePagenationClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const newPage = event.currentTarget.dataset.page;
		props.onPagenationChange(Number(newPage));
	};

	return (
		<div className="flex items-center justify-center w-full pt-8">
			<Button
				type="button"
				data-page={INITAL_PAGE}
				disabled={props.currentPage === 1}
				className="hover:text-blue-25 disabled:opacity-50"
				onClick={(e) => {
					handlePagenationClick(e);
					setStartPage(INITAL_PAGE);
					if (props.totalPage < PagePerView) setEndPage(props.totalPage);
					setEndPage(PagePerView);
				}}
			>{`<<`}</Button>
			<Button
				type="button"
				data-page={props.currentPage - 1}
				disabled={props.currentPage === 1}
				className="hover:text-blue-500 disabled:opacity-50"
				onClick={(e) => {
					handlePagenationClick(e);
					if (props.currentPage % PagePerView === 1) {
						setStartPage(props.currentPage - PagePerView);
						setEndPage(props.currentPage - 1);
					}
				}}
			>{`이전`}</Button>

			<div className="flex items-center mx-4">
				{numberArrayGenerator(startPage, endPage).map((number) => {
					return (
						<Button
							key={number}
							type="button"
							data-page={number}
							className={`px-4 py-2 ${props.currentPage === number && 'bg-blue-500 text-white'}`}
							onClick={handlePagenationClick}
						>
							{number}
						</Button>
					);
				})}
			</div>
			<Button
				type="button"
				data-page={props.currentPage + 1}
				disabled={props.currentPage === props.totalPage}
				className="hover:text-blue-500 disabled:opacity-25"
				onClick={(e) => {
					handlePagenationClick(e);
					if (props.currentPage % PagePerView === 0) {
						setStartPage(startPage + PagePerView);
						if (props.currentPage + PagePerView > props.totalPage) {
							setEndPage(props.totalPage);
						} else {
							setEndPage(endPage + PagePerView);
						}
					}
				}}
			>{`다음`}</Button>

			<Button
				type="button"
				data-page={props.totalPage}
				disabled={props.currentPage === props.totalPage}
				className="hover:text-blue-500 disabled:opacity-25"
				onClick={(e) => {
					handlePagenationClick(e);
					setEndPage(props.totalPage);
					setStartPage(props.totalPage - ((props.totalPage % PagePerView) - 1));
				}}
			>{`>>`}</Button>
		</div>
	);
};

export default Pagenation;
