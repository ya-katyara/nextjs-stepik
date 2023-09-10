import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Htag } from "../components";
import Button from "../components/Button/Button";
import Paragraph from "../components/Paragraph/Paragraph";
import Rating from "../components/Rating/Rating";
import Tag from "../components/Tag/Tag";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import Input from "../components/Input/Input";
import Textarea from "../components/Textarea/Textarea";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
    const [counter, setCounter] = useState<number>(0);
    const [rating, setRating] = useState<number>(4);

    useEffect(() => {
        console.log("Counter " + counter);
    });

    return (
        <>
            <Htag tag="h1">{counter}</Htag>
            <Button
                appearance="primary"
                arrow="right"
                onClick={(): void => setCounter((x) => x + 1)}
            >
                Кнопка
            </Button>
            <Button appearance="ghost" arrow="down">
                Кнопка
            </Button>
            <Paragraph size="small">aaaaaaaaaaaaaaaaaaaaaaaaa</Paragraph>
            <Tag size="s" color="red">
                Red
            </Tag>
            <Tag size="s" color="green">
                Green
            </Tag>
            <Tag size="s" color="primary">
                Primary
            </Tag>
            <Rating rating={rating} isEditable setRating={setRating} />
            <Input placeholder="test" />
            <Textarea placeholder="test" />
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory: 0
    });

    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[],
    firstCategory: number;
}