import { Link } from "react-router-dom";
import { Button, FormattedData, Type } from "../../types";
import { useMemo } from "react";

interface TableProps {
	data: FormattedData[];
	handleSort: (options: string) => void;
}

interface TableRowProps {
	item: FormattedData;
}

function TableRow({ item }: TableRowProps) {
	const memoizedRow = useMemo(() => {
		let itemType = "";
		let rowClass = "";
		let btnType = Math.random() < 0.5 ? Button.FINALIZE : Button.RESULTS;
		let actionUrl = "";
		let siteUrl = item.siteUrl.replace(/https?:\/\/(www\.)?|www\./g, "");

		if (item.type === Type.MVT) {
			itemType = "MVT";
		} else if (item.type === Type.CLASSIC) {
			itemType = "Classic";
		} else if (item.type === Type.SERVER_SIDE) {
			itemType = "Server-side";
		}

		if (siteUrl.includes("market")) {
			rowClass = "tr-red";
		} else if (siteUrl.includes("delivery")) {
			rowClass = "tr-light-purple";
		} else if (siteUrl.includes("games")) {
			rowClass = "tr-purple";
		}

		actionUrl = btnType === Button.FINALIZE ? `/finalize/${item.id}` : `/results/${item.id}`;

		return (
			<tr className={rowClass} key={item.id}>
				<td className="td-name">{item.name}</td>
				<td className="td-type td-type-classic">{itemType}</td>
				<td className={`td-status td-status-${item.status?.toLowerCase()}`}>{item.status}</td>
				<td className="td-site">{siteUrl}</td>
				<td className="td-btn">
					<Link to={actionUrl} className={`btn ${btnType === Button.FINALIZE ? "btn-gray" : ""}`}>
						{btnType === Button.FINALIZE ? "Finalize" : "Results"}
					</Link>
				</td>
			</tr>
		);
	}, [item]);

	return memoizedRow;
}

export default function Table({ data, handleSort }: TableProps) {
	return (
		<table>
			<thead>
				<tr>
					<td>
						<p onClick={() => handleSort('name')}>Name</p>
					</td>
					<td>
						<p onClick={() => handleSort('type')}>Type</p>
					</td>
					<td>
						<p onClick={() => handleSort('status')}>Status</p>
					</td>
					<td>
						<p onClick={() => handleSort('siteUrl')}>Site</p>
					</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				{data.map((item) => (
					<TableRow key={item.id} item={item} />
				))}
			</tbody>
		</table>
	);
}
