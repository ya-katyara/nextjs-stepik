import React from 'react';
import styles from "./Divider.module.css";
import { DividerProps } from "./Divider.props";
import cn from "classnames";

const Divider = ({className, ...props}: DividerProps):JSX.Element => {
  return (
	<hr className={cn(className, styles.hr)} {...props} />
  );
};

export default Divider;