import r2wc from '@r2wc/react-to-web-component';
import {TemplateCanvas as ReactTemplateCanvas, TemplateCanvasProps} from '../../react/TemplateCanvas';

export type {TemplateCanvasProps};

export const TemplateCanvas = r2wc(
    (props: TemplateCanvasProps) => (
        <ReactTemplateCanvas {...props}>
            <slot />
        </ReactTemplateCanvas>
    ),
    {
        shadow: 'closed',
        props: {
            subBrandLabel: 'string',
            subBrandLink: 'string',
            theme: 'string',
            title: 'string',
            ctaLabel: 'string',
            ctaLink: 'string',
            maxWidth: 'number',
            maxHeight: 'number',
            ctaTarget: 'string',
            fullScreen: 'boolean',
            minHeight: 'string',
            portal: 'boolean',
            frame: 'boolean',
        },
    },
);
