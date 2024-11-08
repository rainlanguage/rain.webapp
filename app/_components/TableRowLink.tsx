import { createContext, useContext } from 'react';
import { Table } from 'flowbite-react'; // Assuming you're importing from a library

const LinkContext = createContext<string | null>(null);

const useLinkContext = () => {
	return useContext(LinkContext);
};

export const TableRowLink = ({
	link,
	children
}: {
	link: string | null;
	children: React.ReactNode;
}) => {
	return (
		<LinkContext.Provider value={link}>
			<Table.Row
				style={{ cursor: link ? 'pointer' : 'default', height: '1px' }}
				data-testid="order-row"
			>
				{children}
			</Table.Row>
		</LinkContext.Provider>
	);
};

export const TableCellLink = ({ children }: { children: React.ReactNode }) => {
	const link = useLinkContext();

	return (
		<Table.Cell className="p-0 relative" style={{ height: 'inherit' }}>
			{link ? (
				<a
					href={link}
					data-testid="order-row-link"
					className="flex items-center justify-start w-full p-4 text-inherit no-underline hover:bg-gray-50 visited:text-gray-500"
				>
					{children}
				</a>
			) : (
				<div className="p-4">{children}</div>
			)}
		</Table.Cell>
	);
};
