import styles from "./Menu.module.css";
import cn from "classnames";
import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion, useReducedMotion } from "framer-motion";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();

    const openSecondLevel = (secondCategory: string): void => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened');
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
                // when: 'beforeChildren'
                staggerChildren: 0.05
            },
        },
        hidden: {
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            maxHeight: 50
        },
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            maxHeight: 0
        }
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string): void => {
        if (key.code == 'Space' || key.code == 'Enter') {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const buildFirstLevel = (): JSX.Element => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map((menu) => (
                    <li key={menu.route} aria-expanded={menu.id == firstCategory}>
                        <Link href={`/${menu.route}`}>
                                <div
                                    className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]:
                                            menu.id == firstCategory,
                                    })}
                                    tabIndex={0}
                                >
                                    {menu.icon}
                                    <span>{menu.name}</span>
                                </div>
                        </Link>
                        {menu.id == firstCategory && buildSecondLevel(menu)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map((m) => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                className={styles.secondLevel} 
                                onKeyDown={(key: KeyboardEvent): void => openSecondLevelKey(key, m._id.secondCategory)}
                                onClick={(): void => openSecondLevel(m._id.secondCategory)}
                                aria-expanded={m.isOpened}
                            >
                                {m._id.secondCategory}
                            </button>
                            <motion.ul 
                                className={styles.secondLevelBlock} 
                                layout
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                variants={variants}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element[] => {
        return (
            pages.map(page => {
                const isActive = `/${route}/${page.alias}` == router.asPath;
                return (
                <motion.li key={page._id} variants={variantsChildren}>
                    <Link href={`/${route}/${page.alias}`}>
                        <a 
                            tabIndex={isOpened ? 0 : -1} 
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: isActive,
                            })}
                            aria-current={isActive ? 'page' : false}
                        >
                            {page.category}
                        </a>
                    </Link>
                </motion.li>
            )})
        );
    };

    return (
        <nav className={styles.menu} role="navigation">
            {announce && <span role="log" className="visuallyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    );
};

export default Menu;
