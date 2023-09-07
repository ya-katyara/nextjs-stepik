import { HTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	color: 'ghost' | 'red' | 'grey' | 'green' | 'primary';
	size?: 's' | 'm';
	href?: string;
}