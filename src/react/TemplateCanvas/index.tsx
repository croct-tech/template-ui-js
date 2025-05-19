'use client';

import {
    FunctionComponent,
    HTMLAttributeAnchorTarget,
    IframeHTMLAttributes,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import cls from 'clsx';
import FrameModule, {useFrame} from 'react-frame-component';
import styles from './styles.module.css';
import css from './styles.module.css?inline';
import {LinkButton} from '../LinkButton';
import {FullScreenPortal} from '../FullScreenPortal';

const Frame = getDefaultExport(FrameModule);

export type TemplateCanvasProps = {
    /**
     * The sub-brand label to show on the side of the logo.
     */
    subBrandLabel?: string,

    /**
     * The URL of the sub-brand.
     */
    subBrandLink?: string,

    /**
     * The title of the template.
     */
    title: string,

    /**
     * The label of the call-to-action button.
     */
    ctaLabel: string,

    /**
     * The URL of the call-to-action button.
     */
    ctaLink: string,

    /**
     * The target of the call-to-action button.
     */
    ctaTarget?: HTMLAttributeAnchorTarget,

    /**
     * The theme of the template.
     */
    theme?: 'light' | 'dark',

    /**
     * Render the template in an iframe.
     */
    isolated?: boolean,

    /**
     * The template component to be shown.
     */
    children?: ReactNode,

    /**
     * The template max width.
     */
    maxWidth?: string | number,

    /**
     * The template min height.
     */
    minHeight?: string | number,

    /**
     * The template max height.
     */
    maxHeight?: string | number,

    /**
     * Whether to render the template in a portal.
     */
    portal?: boolean,

    /**
     * Whether to render the template in full screen.
     */
    fullScreen?: boolean,
};

export const TemplateCanvas: FunctionComponent<TemplateCanvasProps> = props => {
    if (props.portal === true) {
        return (
            <FullScreenPortal>
                <TemplateCanvas {...props} portal={false} />
            </FullScreenPortal>
        );
    }

    const {
        subBrandLabel = 'templates',
        subBrandLink = 'https://croct.com/templates',
        title,
        children,
        theme,
        ctaLink,
        ctaLabel,
        maxWidth,
        minHeight,
        maxHeight,
        fullScreen = false,
        isolated = false,
        ctaTarget,
    } = props;

    return (
        <div>
            {/* eslint-disable-next-line react/no-danger -- Needed to inject raw CSS without escaping */}
            <style dangerouslySetInnerHTML={{__html: css}} />
            <div className={cls(styles.canvas, styles[theme ?? ''], {[styles['full-screen']]: fullScreen})}>
                <div className={styles.backgrounds}>
                    <div className={styles['left-glow']} />
                    <div className={styles['right-glow']} />
                    <div className={styles['bottom-fade']} />
                </div>
                <div
                    style={{
                        maxWidth: maxWidth,
                    }}
                    className={
                        cls(styles.body, {
                            [styles['fit-content']]: maxWidth !== undefined,
                        })
                    }
                >
                    <header className={styles.header}>
                        <div className={styles.logo}>
                            <Logo />
                            <a className={styles.subbrand} href={subBrandLink}>
                                / {subBrandLabel}
                            </a>
                        </div>
                        <div className={styles['heading-group']}>
                            <h1 className={styles.heading}>
                                {title}
                            </h1>
                            <div className={styles.action}>
                                <LinkButton
                                    theme={theme}
                                    href={ctaLink}
                                    label={ctaLabel}
                                    target={ctaTarget}
                                />
                            </div>
                        </div>
                    </header>
                    <div
                        className={styles.template}
                        style={{
                            minHeight: minHeight,
                            maxHeight: maxHeight,
                        }}
                    >
                        {
                            isolated
                                ? (
                                    <IframePreview className={styles.iframe} title={title}>
                                        {children}
                                    </IframePreview>
                                )
                                : children
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Fixes the import of a module that is wrapped with `__toESM`.
 *
 * Esbuild wraps `require` calls with `__toESM`.
 * Since this library uses `type: "module"`, `__toESM` assigns the required module to the `default` property.
 *
 * References:
 * - https://github.com/egoist/tsup/issues/658
 * - https://github.com/evanw/esbuild/issues/2023
 *
 * However, some libraries already apply this default export transformation themselves,
 * resulting in a double `default` export that breaks the code.
 *
 * This function is a workaround to normalize the import and prevent that issue.
 */
function getDefaultExport<T>(object: T|{default: T}): T {
    if (object !== null && typeof object === 'object' && 'default' in object) {
        return object.default;
    }

    return object;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function IframePreview({children, ...props}: IframeHTMLAttributes<HTMLIFrameElement>): ReactNode {
    const [mounted, setMounted] = useState(false);

    useIsomorphicLayoutEffect(
        () => {
            setMounted(true);
        },
        [],
    );

    if (!mounted) {
        return null;
    }

    return (
        <Frame {...props}>
            <FrameStyles />
            {children}
        </Frame>
    );
}

function FrameStyles(): ReactNode {
    const {document: doc} = useFrame();

    useIsomorphicLayoutEffect(
        () => {
            const selector = 'style, [as="style"], [rel="stylesheet"]';
            const cloneMap = new WeakMap();

            const syncStyles = (added: HTMLElement[], removed: HTMLElement[] = []): void => {
                const head = doc?.head;

                if (head === undefined) {
                    return;
                }

                for (const element of removed) {
                    const clone = cloneMap.get(element);

                    if (clone !== undefined) {
                        clone.remove();
                        cloneMap.delete(element);
                    }
                }

                for (const element of added) {
                    const clone = cloneMap.get(element);

                    if (clone !== undefined) {
                        continue;
                    }

                    const cloneElement = element.cloneNode(true) as HTMLElement;

                    head.appendChild(cloneElement);

                    cloneMap.set(element, cloneElement);
                }
            };

            const observer = new MutationObserver(mutations => {
                const addedNodes: HTMLElement[] = [];
                const removedNodes: HTMLElement[] = [];

                for (const mutation of mutations) {
                    for (const node of mutation.addedNodes) {
                        if (node instanceof HTMLElement && node.matches(selector)) {
                            addedNodes.push(node);
                        }
                    }

                    for (const node of mutation.removedNodes) {
                        if (node instanceof HTMLElement && node.matches(selector)) {
                            removedNodes.push(node);
                        }
                    }
                }

                if (addedNodes.length > 0 || removedNodes.length > 0) {
                    syncStyles(addedNodes, removedNodes);
                }
            });

            observer.observe(document.head, {childList: true, subtree: true});

            syncStyles([...document.head.querySelectorAll(selector)] as HTMLElement[]);

            return () => observer.disconnect();
        },
        [doc],
    );

    return null;
}

const Logo: FunctionComponent = () => (
    <svg width="94" height="20" viewBox="0 0 94 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="19.9996" height="19.9996" fill="white" />
        <path d="M0 0V19.9996H1.67605C1.67605 15.4021 5.40321 11.6758 9.9998 11.6758C14.5973 11.6758 18.3235 15.403 18.3235 19.9996H19.9996V0H0Z" fill="#4DD684" />
        <path d="M9.98005 15.7028C7.60475 15.7028 5.67969 17.6276 5.67969 20.0027H14.2795C14.2804 17.6285 12.3553 15.7028 9.98005 15.7028Z" fill="#4DD684" />
        <path fillRule="evenodd" clipRule="evenodd" d="M93.3297 4.46594V7.11718H90.072V15.0386C90.072 16.4112 90.6355 17.0976 92.1712 17.0976C92.5475 17.0976 93.0795 17.0358 93.3307 16.973V19.4684C93.0795 19.5615 92.3279 19.7488 91.325 19.7488C88.7549 19.7488 87.1256 18.1898 87.1256 15.4758V7.11718H84.2422V4.46594H87.4293L87.393 1.32609L90.071 0V4.46594H93.3297ZM34.04 19.7755C29.7473 19.7755 26.2539 16.2858 26.2539 11.9966C26.2539 7.70743 29.7473 4.21866 34.04 4.21866C36.12 4.21866 38.0748 5.02765 39.5455 6.49681L37.583 8.45727C36.6366 7.51186 35.3789 6.99098 34.04 6.99098C31.2772 6.99098 29.0301 9.23668 29.0301 11.9956C29.0301 14.7556 31.2781 17.0013 34.04 17.0013C35.3779 17.0013 36.6366 16.4804 37.583 15.535L39.5455 17.4954C38.0758 18.9665 36.12 19.7755 34.04 19.7755ZM58.9909 19.8066C54.6925 19.8066 51.1953 16.3131 51.1953 12.0192C51.1953 7.72521 54.6925 4.23168 58.9909 4.23168C63.2894 4.23168 66.7866 7.72521 66.7866 12.0192C66.7866 16.3131 63.2894 19.8066 58.9909 19.8066ZM58.9909 7.01258C56.2272 7.01258 53.9791 9.25829 53.9791 12.0192C53.9791 14.78 56.2272 17.0257 58.9909 17.0257C61.7547 17.0257 64.0028 14.78 64.0028 12.0192C64.0028 9.25829 61.7537 7.01258 58.9909 7.01258ZM50.0425 7.66831C49.5812 7.47465 49.0751 7.36781 48.5441 7.36781C46.4794 7.36781 44.7919 8.98292 44.6783 11.0178C44.641 11.3059 44.621 11.9813 44.621 11.9813V19.5246H41.6758V4.46861H44.5589V7.09878C45.6562 4.78248 47.5356 4.21867 49.0713 4.21867C49.4781 4.21867 49.8859 4.28068 50.0425 4.31216V7.66831ZM76.7041 19.781C72.4104 19.781 68.918 16.2913 68.918 12.0031C68.918 7.71489 72.4113 4.22517 76.7041 4.22517C78.784 4.22517 80.7389 5.03416 82.2096 6.50332L80.2471 8.46378C79.3007 7.51837 78.043 6.99749 76.7041 6.99749C73.9412 6.99749 71.6941 9.24319 71.6941 12.0022C71.6941 14.7621 73.9422 17.0078 76.7041 17.0078C78.042 17.0078 79.3007 16.4869 80.2471 15.5415L82.2096 17.5019C80.7389 18.972 78.784 19.781 76.7041 19.781Z" fill="currentColor" />
    </svg>
);
