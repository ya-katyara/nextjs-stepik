import React from "react";
import styles from "./Sort.module.css";
import { SortEnum, SortProps } from "./Sort.props";
import cn from "classnames";
import SortIcon from "./sort.svg";

const Sort = ({
    sort,
    setSort,
    className,
    ...props
}: SortProps): JSX.Element => {
    return (
        <div className={cn(styles.sort, className)} {...props}>
            <button
                onClick={(): void => setSort(SortEnum.Rating)}
                className={cn({
                    [styles.active]: sort == SortEnum.Rating,
                })}
            >
                <SortIcon className={styles.sortIcon} />
                По рейтингу
            </button>
            <button
                onClick={(): void => setSort(SortEnum.Price)}
                className={cn({
                    [styles.active]: sort == SortEnum.Price,
                })}
            >
                <SortIcon className={styles.sortIcon} />
                По цене
            </button>
        </div>
    );
};

export default Sort;
