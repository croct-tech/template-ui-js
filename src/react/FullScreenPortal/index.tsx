'use client';

import {FunctionComponent, ReactNode, useEffect, useId, useState} from 'react';
import {createPortal} from 'react-dom';

export type FullScreenPortalProps = {
    children: ReactNode,
};

export const FullScreenPortal: FunctionComponent<FullScreenPortalProps> = ({children}) => {
    const id = useId();
    const [element, setElement] = useState<HTMLDivElement|null>(null);

    useEffect(
        () => {
            const portal = document.createElement('div');

            portal.id = `full-screen-portal-${id}`;

            const originalOverflow = document.body.style.overflow;

            document.body.style.overflow = 'hidden';

            document.body.appendChild(portal);

            setElement(portal);

            return () => {
                document.body.style.overflow = originalOverflow;

                portal.remove();
            };
        },
        [id],
    );

    const portal = (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'white',
                overflow: 'auto',
            }}
        >
            {children}
        </div>
    );

    return element === null
        ? portal
        : createPortal(portal, element);
};
