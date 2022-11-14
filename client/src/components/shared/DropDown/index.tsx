const DropDown = ({ list }: any) => {
	return (
		<select
			className="w-36 h-10 px-3 mx-2 border-solid border rounded outline-none"
			onChange={(e) => console.log(e.target.value)}
		>
			{list.map((item: any) => {
				return <option value={item}>{item}</option>;
			})}
		</select>
	);
};

export default DropDown;
