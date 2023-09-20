import styles from "./Menu.module.css";
import cn from "classnames";
import { useContext, KeyboardEvent } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion } from "framer-motion";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const router = useRouter();

    const openSecondLevel = (secondCategory: string): void => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
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
            opacity: 0,
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
            <>
                {firstLevelMenu.map((menu) => (
                    <div key={menu.route}>
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
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div 
                                tabIndex={0} 
                                className={styles.secondLevel} 
                                onKeyDown={(key: KeyboardEvent): void => openSecondLevelKey(key, m._id.secondCategory)}
                                onClick={(): void => openSecondLevel(m._id.secondCategory)}
                            >
                                {m._id.secondCategory}
                            </div>
                            <motion.div 
                                className={cn(styles.secondLevelBlock)} 
                                layout
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                variants={variants}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element[] => {
        return (
            pages.map(page => (
                <motion.div key={page._id} variants={variantsChildren}>
                    <Link href={`/${route}/${page.alias}`}>
                        <a tabIndex={isOpened ? 0 : -1} className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath,
                        })}>
                            {page.category}
                        </a>
                    </Link>
                </motion.div>
            ))
        );
    };

    return (
        <nav className={styles.menu} role="navigation">
            {buildFirstLevel()}
        </nav>
    );
};

export default Menu;
