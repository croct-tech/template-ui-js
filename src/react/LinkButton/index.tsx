/* eslint-disable max-len -- Disabled for better readability */
import {FunctionComponent} from 'react';
import cls from 'clsx';
import styles from './styles.module.css';
import css from './styles.module.css?inline';

export {css};

export type LinkButtonProps = {
    /**
     * The URL to navigate to when the button is clicked.
     */
    href: string,
    /**
     * Whether the button should display the Croct logo.
     */
    branded?: boolean,
    /**
     * The theme of the button.
     */
    theme?: 'light' | 'dark',
    /**
     * The floating position of the button.
     */
    position?: 'bottom-right' | 'bottom-left',
    /**
     * The label of the button.
     */
    label: string,
};

export const LinkButton: FunctionComponent<LinkButtonProps> = props => {
    const {href, theme = '', branded = false, position = '', label} = props;

    return (
        <a
            href={href}
            className={
                cls(styles.button, styles[position], styles[theme], {
                    [styles.branded]: branded,
                })
            }
        >
            {branded && (
                <div className={styles.logo}>
                    <Logo />
                </div>
            )}
            {label}
            <div className={styles.icon}>
                <ArrowRightIcon />
            </div>
        </a>
    );
};

const ArrowRightIcon: FunctionComponent = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.4734 6.27504C10.4734 6.52357 10.272 6.72504 10.0234 6.72504L1.97344 6.72504C1.72491 6.72504 1.52344 6.52357 1.52344 6.27504C1.52344 6.02652 1.72491 5.82504 1.97344 5.82504L10.0234 5.82504C10.272 5.82504 10.4734 6.02652 10.4734 6.27504Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.68024 10.6182C5.5045 10.4425 5.5045 10.1576 5.68024 9.98185L9.38704 6.27505L5.68024 2.56825C5.5045 2.39251 5.5045 2.10759 5.68024 1.93185C5.85598 1.75611 6.1409 1.75611 6.31664 1.93185L10.3416 5.95685C10.5174 6.13259 10.5174 6.41751 10.3416 6.59325L6.31664 10.6182C6.1409 10.794 5.85598 10.794 5.68024 10.6182Z" fill="currentColor" />
    </svg>
);

const Logo: FunctionComponent = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 16V0H16V16H14.6591C14.6591 12.3227 11.6781 9.34087 8 9.34087C4.32266 9.34087 1.34087 12.3219 1.34087 16H0ZM4.54063 15.9994C4.54063 14.0993 6.08071 12.5594 7.98098 12.5594C9.88125 12.5594 11.4213 14.1 11.4206 15.9994H4.54063Z" fill="#4DD684" />
    </svg>
);
