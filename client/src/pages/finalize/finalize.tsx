import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Test } from "../../types";
import Header from "../../components/header/header";
import Chevron from "../../assets/Chevron.png";

export default function Finalize() {
	const id = useParams().testId;
	const { data } = useFetch<Test>("http://localhost:3100/tests/" + id);

	return (
		<div className="finalize">
			<Header heading="Finalize" subHeading={data?.name} />
			<Link to="/" className="back">
				<img src={Chevron} alt="chevron-left" />
				Back
			</Link>
		</div>
	);
}
