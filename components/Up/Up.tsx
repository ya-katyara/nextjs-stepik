import { useAnimation, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import styles from "./Up.module.css";

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
        <motion.div 
			className={styles.up}
			animate={controls}
			initial={{opacity: 0}}
		>
            <ButtonIcon appearance="primary" aria-label="Наверх" icon="up" onClick={scrollToTop} />
        </motion.div>
    );
};

export default Up;
