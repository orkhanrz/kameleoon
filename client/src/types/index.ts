export enum Type {
	CLASSIC = "CLASSIC",
	SERVER_SIDE = "SERVER_SIDE",
	MVT = "MVT",
}

export enum Status {
	DRAFT = "DRAFT",
	ONLINE = "ONLINE",
	PAUSED = "PAUSED",
	STOPPED = "STOPPED",
}

export enum Button {
	FINALIZE = "FINALIZE",
	RESULTS = "RESULTS",
}

export interface Site {
	id: number;
	url: string;
}

export interface Test {
	id: number;
	name: string;
	type: Type;
	status: Status;
	siteId: number;
}

export interface FormattedData {
	id: number;
	name: string;
	type: Type;
	status: Status;
	siteId: number;
	siteUrl: string;
}
