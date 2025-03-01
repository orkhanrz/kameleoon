interface HeaderProps {
	heading: string,
	subHeading?: string
}

export default function Header({heading, subHeading}: HeaderProps) {
	return (
		<header>
			<h1 className="page-heading">{heading}</h1>
			{subHeading && <p className="page-subheading">{subHeading}</p>}
		</header>
	);
}
