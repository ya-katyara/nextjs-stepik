import React from 'react';
import styles from "./Tag.module.css";
import { TagProps } from "./Tag.props";
import cn from "classnames";

const Tag = ({size = 's', children, color = "ghost", href, className, ...props}: TagProps):JSX.Element => {
  return (
	<div 
		className={cn(styles.tag, className, styles[size], styles[color])} 
		{...props}
	>
		{
			href 
				? <a href={href}>children</a> 
				: children
		}
	</div>
  );
};

export default Tag;