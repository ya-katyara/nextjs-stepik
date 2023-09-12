import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import styles from "./Up.module.css";
import UpIcon from "./up.svg";

const Up = (): JSX.Element => {
	const controls = useAnimation();
	const y = useScrollY();

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

	useEffect(() => {
		controls.start({opacity: y / document.body.scrollHeight});
	}, [y, controls]);

    return (
        <motion.button 
			className={styles.up} 
			onClick={scrollToTop}
			animate={controls}
			initial={{opacity: 0}}
		>
            <UpIcon />
        </motion.button>
    );
};

export default Up;
