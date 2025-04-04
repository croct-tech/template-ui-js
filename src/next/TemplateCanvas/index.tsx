'use client';

import {FunctionComponent} from 'react';
import {useSearchParams} from 'next/navigation';
import {
    embeddedFlag,
    TemplateCanvas as ReactTemplateCanvas,
    TemplateCanvasProps as ReactTemplateCanvasProps,
} from '../../react/TemplateCanvas';

export type TemplateCanvasProps = ReactTemplateCanvasProps;

export const TemplateCanvas: FunctionComponent<TemplateCanvasProps> = props => {
    const searchParams = useSearchParams();

    if (props.src === '#' && searchParams.has(embeddedFlag)) {
        return props.children;
    }

    return (<ReactTemplateCanvas {...props} />);
};
