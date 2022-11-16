import { Button } from '@src/components';
import { useCallback } from 'react';

type Props = {
	currentPage: number;
	totalPage: number;
	onPagenationChange: (newPage: number) => void;
};

const INITAL_PAGE = 1;

const Pagenation = (props: Props) => {
	const numberArrayGenerator = useCallback(
		(size: number) =>
			Array(size)
				.fill(null)
				.map((_, index) => index + 1),
		[props.totalPage],
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
				className="hover:text-blue-500"
				onClick={handlePagenationClick}
			>{`<<`}</Button>
			<div className="flex items-center mx-4">
				{numberArrayGenerator(props.totalPage).map((number) => {
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
				data-page={props.totalPage}
				className="hover:text-blue-500"
				onClick={handlePagenationClick}
			>{`>>`}</Button>
		</div>
	);
};

export default Pagenation;
