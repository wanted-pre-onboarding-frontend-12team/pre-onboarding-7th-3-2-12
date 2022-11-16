type Props = {
	options: Array<{ value: string | number, renderText: string }>
}

const DropDown = (props: Props) => {
	return (
		<select
			className="w-36 h-10 px-3 mx-2 border-solid border rounded outline-none appearance-none bg-no-repeat bg-[url('https://www.svgrepo.com/show/80156/down-arrow.svg')] bg-[length:10px_10px] bg-[center_right_1rem]"
			onChange={(e) => console.log(e.target.value)}
		>
			{props.options.map((option: { value: string | number; renderText: string }) => {
				return (
					<option key={option.renderText} value={option.value}>
						{option.renderText}
					</option>
				);
			})}
		</select>
	);
};

export default DropDown;
