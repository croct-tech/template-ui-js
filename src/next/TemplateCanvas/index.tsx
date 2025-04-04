'use client';

import {FunctionComponent} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import {
    embeddedFlag,
    TemplateCanvas as ReactTemplateCanvas,
    TemplateCanvasProps as ReactTemplateCanvasProps,
} from '../../react/TemplateCanvas';

export type TemplateCanvasProps = ReactTemplateCanvasProps;

export const TemplateCanvas: FunctionComponent<TemplateCanvasProps> = props => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (props.src === '#' && searchParams.has(embeddedFlag)) {
        return props.children;
    }

    return (
        <ReactTemplateCanvas
            {...props}
            src={props.src === '#' ? getEmbeddedUrl(pathname, searchParams) : props.src}
        />
    );
};

function getEmbeddedUrl(pathname: string, searchParams: URLSearchParams): string {
    const embeddedParams = new URLSearchParams(searchParams.toString());

    embeddedParams.set(embeddedFlag, 'true');

    const queryString = embeddedParams.toString();

    return `${pathname}${queryString === '' ? '' : `?${queryString}`}`;
}
