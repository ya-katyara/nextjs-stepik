import React, { ForwardedRef, forwardRef, useRef, useState } from "react";
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import cn from "classnames";
import Card from "../Card/Card";
import Rating from "../Rating/Rating";
import Tag from "../Tag/Tag";
import Button from "../Button/Button";
import { declOfNum, priceRu } from "../../helpers/helpers";
import Divider from "../Divider/Divider";
import Image from "next/image";
import Review from "../Review/Review";
import ReviewForm from "../ReviewForm/ReviewForm";
import { motion } from "framer-motion";

const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = (): void => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const variants = {
        opened: {
            opacity: 1,
            height: 'auto',
        },
        closed: {
            overflow: 'hidden',
            opacity: 0,
            height: 0
        }
    };
    
    return (
    <div className={className} {...props} ref={ref}>
        <Card className={styles.product}>
            <div className={styles.logo}>
                <Image 
                    src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
                    alt={product.title}
                    width={70}
                    height={70}
                />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
                {priceRu(product.price)}
                {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
            </div>
            <div className={styles.credit}>
                {priceRu(product.credit)}<span className={styles.month}>/мес</span>
            </div>
            <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
            <div className={styles.tags}>{product.categories.map(c =><Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}</div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
                {product.characteristics.map(c => (
                    <div className={styles.characteristics} key={c.name}>
                        <span className={styles.characteristicsName}>{c.name}</span>
                        <span className={styles.dots}></span>
                        <span className={styles.characteristicsValue}>{c.value}</span>
                    </div>
                ))}
            </div>
            <div className={styles.advBlock}>
                {product.advantages && <div className={styles.advantages}>
                    <div className={styles.advTitle}>Преимущества</div>
                    <div>{product.advantages}</div>
                </div>}
                {product.disadvantages && <div className={styles.disadvantages}>
                    <div className={styles.advTitle}>Недостатки</div>
                    <div>{product.disadvantages}</div>
                </div>}
            </div>
            <Divider className={styles.hr2} />
            <div className={styles.actions}>
                <Button appearance="primary">Узнать подробнее</Button>
                <Button 
                    appearance="ghost" 
                    arrow={isReviewOpened ? 'down' : 'right'} 
                    className={styles.reviewButton}
                    onClick={():void => setIsReviewOpened(!isReviewOpened)}
                >
                        Читать отзывы
                </Button>
            </div>
            
        </Card>
        <motion.div
            initial={isReviewOpened ? 'opened' : 'closed'}
            animate={isReviewOpened ? 'opened' : 'closed'}
            variants={variants}
        >
            <Card color="blue" ref={reviewRef} className={styles.reviews}>
                {
                    product.reviews.map(r => (
                        <React.Fragment key={r._id}>
                            <Review review={r} />
                            <Divider />
                        </React.Fragment>
                    ))
                }
                <ReviewForm productId={product._id} />
            </Card>
        </motion.div>
    </div>
    );
}));

export default Product;
