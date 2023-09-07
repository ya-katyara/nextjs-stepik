import React from 'react';
import styles from "./Advantage.module.css";
import { AdvantageProps } from "./Advantage.props";
import CheckIcon from "./check.svg";

const Advantage = ({ title, description }: AdvantageProps):JSX.Element => {
  return (
	<div className={styles.advantage}>
		<CheckIcon/>
		<div className={styles.title}>{title}</div>
		<div className={styles.bar}></div><div>{description}</div>
	</div>
  );
};

export default Advantage;