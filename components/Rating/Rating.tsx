import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";
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
    ...props
}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
        new Array(5).fill(<></>)
    );

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number): void => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
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
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(
                            e: KeyboardEvent<SVGElement>
                        ): false | void => isEditable && handleSpace(i + 1, e)}
                    />
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

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>): void => {
        if (e.code != "Space" || !setRating) {
            return;
        }
        setRating(i);
    };

    return (
        <div {...props} className={cn(className, styles.ratingWrapper)} ref={ref}>
            {ratingArray.map((r, i) => (
                <span key={i}>{r}</span>
            ))}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});

export default Rating;
