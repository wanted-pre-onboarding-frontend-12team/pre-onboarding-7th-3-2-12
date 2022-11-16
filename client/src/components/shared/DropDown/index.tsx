type Props = {
	dropdownTarget: string;
	options: Array<{ id: number, value: string; renderText: string }>;
	onDropdownChange: (value: string, changeTarget: string) => void;
};

const DropDown = (props: Props) => {
	const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		props.onDropdownChange(event.currentTarget.value, event.currentTarget.dataset.dropdownTarget!);
	}

	return (
		<select
			data-dropdown-target={props.dropdownTarget}
			className="w-40 h-10 px-3 mx-2 border-solid border rounded outline-none appearance-none bg-no-repeat bg-[url('https://www.svgrepo.com/show/80156/down-arrow.svg')] bg-[length:10px_10px] bg-[center_right_1rem]"
			onChange={handleDropdownChange}
		>
			{props.options.map((option: { id: number, value: string; renderText: string }) => {
				return (
					<option key={option.id} value={option.value}>
						{option.renderText}
					</option>
				);
			})}
		</select>
	);
};

export default DropDown;
