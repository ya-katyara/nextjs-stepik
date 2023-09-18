import { Htag } from "../../components";
import Tag from "../../components/Tag/Tag";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from "./TopPageComponent.module.css";
import HhData from "../../components/HhData/HhData";
import { TopLevelCategory } from "../../interfaces/page.interface";
import Advantage from "../../components/Advantage/Advantage";
import { SortEnum } from "../../components/Sort/Sort.props";
import Sort from "../../components/Sort/Sort";
import { useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import Product from "../../components/Product/Product";

const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps):JSX.Element => {
    useEffect(() => {
      dispatchSort({type: 'updateProducts', products});
    }, [products]);
    
    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});

    const setSort = (sort: SortEnum): void => {
        dispatchSort({type: sort});
    };

    return (<>
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && (<Tag color="grey" size="m" aria-label={products.length + 'элементов'}>{products.length}</Tag>)}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div>
                {sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p} />))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="m">hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length && (<>
                <Htag tag="h2">Преимущества</Htag>
                <div className={styles.advantages}>
                    {page.advantages.map(item => <Advantage key={item._id} {...item} /> )}
                </div>
                {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
            </>)}
            <Htag tag="h2">Получаемые навыки</Htag>
            <div className={styles.skillsList}>
                {page.tags.map(tag => <Tag size="s" color="primary" key={tag}>{tag}</Tag>)}
            </div>
        </div>
    </>);
};

export default TopPageComponent;