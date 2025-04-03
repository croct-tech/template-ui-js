'use client';

import {CSSProperties, FunctionComponent, ReactNode, useEffect, useId, useState} from 'react';
import {createPortal} from 'react-dom';

export type FullScreenPortalProps = {
    children: ReactNode,
};

const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'white',
    overflow: 'auto',
};

export const FullScreenPortal: FunctionComponent<FullScreenPortalProps> = ({children}) => {
    const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
    const id = useId();

    useEffect(
        () => {
            const host = document.createElement('div');

            host.id = `template-ui-portal-${id}`;

            const originalOverflow = document.body.style.overflow;

            document.body.style.overflow = 'hidden';
            document.body.appendChild(host);

            const shadow = host.attachShadow({mode: 'open'});

            setShadowRoot(shadow);

            return () => {
                document.body.style.overflow = originalOverflow;

                host.remove();
            };
        },
        [id],
    );

    return shadowRoot === null
        ? <div style={overlayStyle} />
        : createPortal(<div style={overlayStyle}>{children}</div>, shadowRoot);
};
