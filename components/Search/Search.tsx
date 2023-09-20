import React, { useState } from "react";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from "classnames";
import Input from "../Input/Input";
import Button from "../Button/Button";
import SearchIcon from "./search.svg";
import { useRouter } from "next/router";

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>("");
	const router = useRouter();

	const goToSearch = (): void => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};

	const handleKeydown = (e): void => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	};

    return (
        <form className={cn(className, styles.search)} {...props} role="search">
            <Input
                placeholder="Поиск..."
                value={search}
                className={styles.input}
                onChange={(e): void => setSearch(e.target.value)}
				onKeyDown={handleKeydown}
            />
            <Button
                appearance="primary"
                className={styles.button}
                onClick={goToSearch}
                aria-label="Искать по сайту"
            >
                <SearchIcon />
            </Button>
        </form>
    );
};

export default Search;
