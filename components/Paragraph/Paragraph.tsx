import React from 'react';
import styles from "./Paragraph.module.css";
import { ParagraphProps } from "./Paragraph.props";
import cn from "classnames";

const Paragraph = ({size = 'medium', children, className, ...props}: ParagraphProps):JSX.Element => {
  return (
	<p 
		className={cn(styles.p, className, styles[size])} 
		{...props}
	>
		{children}
	</p>
  );
};

export default Paragraph;