'use client';

import {FunctionComponent} from 'react';
import {useSearchParams} from 'next/navigation';
import {
    TemplateCanvas as ReactTemplateCanvas,
    TemplateCanvasProps as ReactTemplateCanvasProps,
} from '../../react/TemplateCanvas';

export type TemplateCanvasProps = ReactTemplateCanvasProps;

const embeddedFlag = '__embedded';

export const TemplateCanvas: FunctionComponent<TemplateCanvasProps> = ({src, ...props}) => {
    const searchParams = useSearchParams();

    if (src === '#' && searchParams.has(embeddedFlag)) {
        return props.children;
    }

    return (<ReactTemplateCanvas {...props} src={src === '#' ? `?${embeddedFlag}` : src} />);
};
