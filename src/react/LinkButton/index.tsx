import {Fragment, FunctionComponent, HTMLAttributeAnchorTarget} from 'react';
import cls from 'clsx';
import styles from './styles.module.css';
import css from './styles.module.css?inline';

type Size = 'md' | 'lg';

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
    /**
     * The size of the button.
     */
    size?: Size,
    /**
     * The target of the link.
     */
    target?: HTMLAttributeAnchorTarget,
};

const sizeStyleMap: Record<Size, string> = {
    md: styles.md,
    lg: styles.lg,
};

export const LinkButton: FunctionComponent<LinkButtonProps> = props => {
    const {href, theme = '', branded = false, position = '', label, size = 'md', target} = props;

    return (
        <Fragment>
            {/* eslint-disable-next-line react/no-danger -- Needed to inject raw CSS without escaping */}
            <style dangerouslySetInnerHTML={{__html: css}} />
            <a
                target={target}
                href={href}
                className={
                    cls(styles.button, styles[position], styles[theme], sizeStyleMap[size], {
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
        </Fragment>
    );
};

const ArrowRightIcon: FunctionComponent = () => (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.4567 9.99829C17.4567 10.4125 17.1209 10.7483 16.7067 10.7483L3.29001 10.7483C2.87579 10.7483
            2.54001 10.4125 2.54001 9.99829C2.54001 9.58408 2.87579 9.24829 3.29001 9.24829L16.7067 9.24829C17.1209
            9.24829 17.4567 9.58408 17.4567 9.99829Z"
        />
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.46801 17.237C9.17512 16.9441 9.17512 16.4692 9.46801 16.1763L15.646 9.99833L9.46801 3.82033C9.17512
            3.52743 9.17512 3.05256 9.46801 2.75967C9.76091 2.46677 10.2358 2.46677 10.5287 2.75967L17.237
            9.468C17.5299 9.76089 17.5299 10.2358 17.237 10.5287L10.5287 17.237C10.2358 17.5299 9.7609 17.5299
            9.46801 17.237Z"
        />
    </svg>
);

const Logo: FunctionComponent = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M0 16V0H16V16H14.6591C14.6591 12.3227 11.6781 9.34087 8 9.34087C4.32266 9.34087 1.34087 12.3219 1.34087 16H0ZM4.54063 15.9994C4.54063 14.0993 6.08071 12.5594 7.98098 12.5594C9.88125 12.5594 11.4213 14.1 11.4206 15.9994H4.54063Z" fill="#4DD684" />
    </svg>
);
