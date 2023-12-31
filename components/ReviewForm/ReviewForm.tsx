import React, { useState } from "react";
import styles from "./ReviewForm.module.css";
import { ReviewFormProps } from "./ReviewForm.props";
import cn from "classnames";
import Input from "../Input/Input";
import Rating from "../Rating/Rating";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";

const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm): Promise<void> => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId});
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles.reviewForm, className)} {...props}>
            <Input 
                {...register('name', { required: { value: true, message: 'Заполните имя'}})} 
                placeholder="Имя"
                error={errors.name}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.name ? true : false}
            />
            <Input 
                {...register('title', { required: { value: true, message: 'Заполните заголовок'}})} 
                placeholder="Заголовок отзыва" 
                className={styles.title} 
                error={errors.title}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.title ? true : false}
            />
            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller 
                    control={control}
                    name='rating'
                    rules={
                        { required: { value: true, message: 'Установите рейтинг'}}
                    }
                    render={({field}): JSX.Element => (
                        <Rating 
                            isEditable 
                            rating={field.value} 
                            ref={field.ref} 
                            setRating={field.onChange} 
                            tabIndex={isOpened ? 0 : -1}
                            error={errors.rating} 
                        />
                    )}
                />
            </div>
            <Textarea 
                {...register('description', { required: { value: true, message: 'Заполните описание'}})} 
                placeholder="Текст отзыва" 
                className={styles.description} 
                error={errors.description}
                tabIndex={isOpened ? 0 : -1}
                aria-label={'Текст отзыва'}
                aria-invalid={errors.description ? true : false}
            />
            <div className={styles.submit}>
                <Button appearance="primary" tabIndex={isOpened ? 0 : -1}>Отправить</Button>
                <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>
        </div>
        {isSuccess && <div role="alert" className={cn(styles.success, styles.panel)}>
            <div className={styles.successTitle}>Ваш отзыв отправлен</div>
            <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
            <CloseIcon role="button" tabIndex={0} aria-label={'Закрыть оповещение'} className={styles.close} onClick={(): void => setIsSuccess(false)} />
        </div>}
        {error && <div role="alert" className={cn(styles.error, styles.panel)}>
            Что-то пошло не так, попробуйте обновить страницу
            <CloseIcon role="button" tabIndex={0} aria-label={'Закрыть оповещение'} className={styles.close} onClick={(): void => setError(undefined)} />
        </div>}
    </form>
    );
};

export default ReviewForm;
