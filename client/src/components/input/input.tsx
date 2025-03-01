import Search from "../../assets/Search.png";

interface InputProps {
	value: string;
	handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
	dataLength: number;
}

export default function Input({ handleSearch, dataLength, value }: InputProps) {
	return (
		<div className="input-wrapper">
			<img src={Search} alt="search" />
			<input
				type="text"
				placeholder="What test are you looking for?"
				onChange={handleSearch}
				value={value}
			/>
			<span>{dataLength} tests</span>
		</div>
	);
}
