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
			<div className={styles.sortName} id="sortName">Сортировка</div>
            <button
				id="rating"
                onClick={(): void => setSort(SortEnum.Rating)}
                className={cn({
                    [styles.active]: sort == SortEnum.Rating,
                })}
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby="sortName rating"
            >
                <SortIcon className={styles.sortIcon} />
                По рейтингу
            </button>
            <button
				id="price"
                onClick={(): void => setSort(SortEnum.Price)}
                className={cn({
                    [styles.active]: sort == SortEnum.Price,
                })}
				aria-selected={sort == SortEnum.Price}
				aria-labelledby="sortName price"
            >
                <SortIcon className={styles.sortIcon} />
                По цене
            </button>
        </div>
    );
};

export default Sort;
