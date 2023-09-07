import { SortEnum } from "../../components/Sort/Sort.props";
import { ProductModel } from "../../interfaces/product.interface";

export type SortActions = { type: SortEnum.Price } | { type: SortEnum.Rating } | { type: 'updateProducts', products: ProductModel[] };

export interface SortReducerState {
    sort: SortEnum;
    products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
    const sortByRatingAsc = (a, b): number => a.initialRating - b.initialRating;
    const sortByPriceDesc = (a, b):number => b.price - a.price;
    switch(action.type) {
        case SortEnum.Rating:
            return {
                sort: SortEnum.Rating,
                products: state.products.sort(sortByRatingAsc)
            };
        case SortEnum.Price:
            return {
                sort: SortEnum.Price,
                products: state.products.sort(sortByPriceDesc)
            };
        case 'updateProducts':
            return {
                sort: SortEnum.Rating,
                products: action.products
            };
        default:
            throw new Error('Неверный тип сортировки');
    }
};