import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef } from "react";
import styles from "./Rating.module.css";
import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";
import cn from "classnames";

const Rating = forwardRef(({
    isEditable = false,
    rating,
    setRating,
    error,
    className,
    tabIndex,
    ...props
}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
        new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating, tabIndex]);

    const computeFocus = (i: number): number => {
        if (!isEditable) {
            return -1;
        }
        if (!rating && i == 0) {
            return tabIndex ?? 0;
        }
        if (rating == i + 1) {
            return tabIndex ?? 0;
        }
        return -1;
    };

    const constructRating = (currentRating: number): void => {
        const updatedArray = ratingArray.map((_, i: number) => {
            return (
                <span
                    key={i}
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable,
                    })}
                    onMouseEnter={(): void => changeDisplay(i + 1)}
                    onMouseLeave={(): void => changeDisplay(rating)}
                    onClick={(): void => onClick(i + 1)}
                    tabIndex={computeFocus(i)}
                    onKeyDown={handleKey}
                    ref={(r): number | undefined => ratingArrayRef.current?.push(r)}
                    role={isEditable ? 'slider' : ''}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-valuemin={1}
                    aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг '+rating}
                    aria-invalid={error ? true : false}
                >
                    <StarIcon/>
                </span>
            );
        });
        setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number): void => {
        if (!isEditable) {
            return;
        }
        constructRating(i);
    };

    const onClick = (i: number): void => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleKey = (e: KeyboardEvent): void => {
        if (!isEditable || !setRating) {
            return;
        }
        if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
            e.preventDefault();
            if (!rating) {
                setRating(1);
            } else {
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    return (
        <div {...props} className={cn(className, styles.ratingWrapper, {
            [styles.error]: error
        })} ref={ref}>
            {ratingArray.map((r, i) => (
                <React.Fragment key={i}>{r}</React.Fragment>
            ))}
            {error && <span role="alert" className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});

export default Rating;
