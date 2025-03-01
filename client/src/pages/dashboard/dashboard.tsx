import { useEffect, useState } from "react";
import { FormattedData, Site, Test } from "../../types";
import Header from "../../components/header/header";
import Input from "../../components/input/input";
import Table from "../../components/table/table";
import useFetch from "../../hooks/useFetch";
import NoResults from "../../components/no-results/no-results";

interface SortSettings {
	[key: string]: string | null;
}

export default function Dashboard() {
	const [data, setData] = useState<FormattedData[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [searchData, setSearchData] = useState<FormattedData[]>([]);
	const [sortSettings, setSortSettins] = useState<SortSettings>({});
	const { data: sites } = useFetch<Site>("http://localhost:3100/sites");
	const {
		data: tests,
		isLoading: isTestsLoading,
		error: testsError,
	} = useFetch<Test>("http://localhost:3100/tests");

	useEffect(() => {
		setSearchData(
			data.filter((test) => test.name.toLowerCase().includes(searchTerm.trim().toLowerCase()))
		);
	}, [searchTerm]);

	useEffect(() => {
		if (sites && tests && Array.isArray(sites) && Array.isArray(tests)) {
			formatData(sites, tests);
		}
	}, [sites, tests]);

	useEffect(() => {
		const key = Object.keys(sortSettings)[0] as "name" | "type" | "status" | "siteUrl";

		if (key !== "status") {
			if (sortSettings[key] === "ASC") {
				setSearchData(sortAsc(searchData, key));
			}

			if (sortSettings[key] === "DESC") {
				setSearchData(sortDesc(searchData, key));
			}
		} else {
			setSearchData(sortStatus(searchData, sortSettings[key] as "ASC" | "DESC"));
		}
	}, [sortSettings]);

	function formatData(sites: Site[], tests: Test[]) {
		const formattedData = tests.map((test) => ({
			...test,
			siteUrl: sites.find((site) => site.id === test.siteId)!.url,
		}));

		setData(formattedData);
		setSearchData(formattedData);
	}

	function sortData(option: string) {
		setSortSettins((prevState) => {
			if (!prevState[option] || prevState[option] === "DESC") {
				return { [option]: "ASC" };
			} else {
				return { [option]: "DESC" };
			}
		});
	}

	function sortAsc(data: FormattedData[], key: "name" | "type" | "status" | "siteUrl") {
		return [...data].sort((a, b) => a[key].localeCompare(b[key]));
	}

	function sortDesc(data: FormattedData[], key: "name" | "type" | "status" | "siteUrl") {
		return [...data].sort((a, b) => b[key].localeCompare(a[key]));
	}

	function sortStatus(data: FormattedData[], option: "ASC" | "DESC") {
		let statusOrder = [];

		if (option === "ASC") {
			statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];
		} else {
			statusOrder = ["DRAFT", "STOPPED", "PAUSED", "ONLINE"];
		}

		return [...data].sort((a, b) => {
			return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
		});
	}

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value);
	}

	function handleReset() {
		setSearchTerm("");
		setSortSettins({});
		setSearchData(data);
	}

	return (
		<div>
			<Header heading="Dashboard" />
			<Input handleSearch={handleSearch} dataLength={searchData.length} value={searchTerm} />
			{isTestsLoading && <p>Loading...</p>}
			{testsError && <p>Something went wrong!</p>}
			{searchData.length > 0 && <Table data={searchData} handleSort={sortData} />}
			{!testsError && searchData.length === 0 && <NoResults handleReset={handleReset} />}
		</div>
	);
}
