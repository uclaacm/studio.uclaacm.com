export type TableProps = {
	children?: React.ReactNode,
	rowHeaders?: number,
	columnHeaders?: number,
};

export default function Table({
  children,
  rowHeaders = 0,
  columnHeaders = 0,
}: TableProps) {
	return (
		<div></div>
	);
}