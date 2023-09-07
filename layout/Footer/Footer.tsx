import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";
import cn from "classnames";
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
            <footer className={cn(className, styles.footer)} {...props}>
                <div className={styles.footerLeft}>
                    OwlTop © 2020 - {format(Date.now(), 'Y')} Все права защищены
                </div>
                <div className={styles.footerAgreement}>
                    <a href="#" target="_blank">Пользовательское соглашение</a>
                </div>
                <div className={styles.footerPrivacy}>
                    <a href="#" target="_blank">Политика конфиденциальности</a>
                </div>
            </footer>
    );
};

export default Footer;
