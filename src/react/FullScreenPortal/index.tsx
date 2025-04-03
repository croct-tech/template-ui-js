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
    const id = useId();
    const [host, setHost] = useState<HTMLDivElement|null>(null);

    useEffect(
        () => {
            const container = document.createElement('div');

            container.id = `full-screen-portal-${id}`;

            const originalOverflow = document.body.style.overflow;

            document.body.style.overflow = 'hidden';

            document.body.appendChild(container);

            setHost(container);

            return () => {
                document.body.style.overflow = originalOverflow;

                container.remove();
            };
        },
        [id],
    );

    return host === null
        ? <div style={overlayStyle} />
        : createPortal(<div style={overlayStyle}>{children}</div>, host);
};
