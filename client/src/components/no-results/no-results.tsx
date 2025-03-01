interface NoResultsProps {
	handleReset: () => void;
}

export default function NoResults({ handleReset }: NoResultsProps) {
	return (
		<div className="no-results">
			<h2>Your search did not match any results</h2>
			<button className="btn" onClick={handleReset}>
				Reset
			</button>
		</div>
	);
}
