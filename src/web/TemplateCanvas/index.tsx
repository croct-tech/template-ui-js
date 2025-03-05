import r2wc from '@r2wc/react-to-web-component';
import {Fragment} from 'react';
import buttonCss from '../../react/LinkButton/styles.module.css?inline';
import canvasCss from '../../react/TemplateCanvas/styles.module.css?inline';
import {TemplateCanvas as ReactTemplateCanvas, TemplateCanvasProps} from '../../react/TemplateCanvas';

export type {TemplateCanvasProps};

export const TemplateCanvas = r2wc(
    (props: TemplateCanvasProps) => (
        <Fragment>
            <style>{canvasCss}</style>
            <style>{buttonCss}</style>
            <ReactTemplateCanvas {...props}>
                <slot />
            </ReactTemplateCanvas>
        </Fragment>
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
        },
    },
);
