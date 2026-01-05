/**
 * useDocumentTitle Hook
 * Sets the browser tab title dynamically
 */

import { useEffect } from 'react';

export const BASE_TITLE = "Posyandu Terintergasi Layanan Primer Desa Tondomulyo";

export function useDocumentTitle(title?: string, appendBase = true) {
    useEffect(() => {
        if (title) {
            document.title = appendBase ? `${title} | ${BASE_TITLE}` : title;
        } else {
            document.title = BASE_TITLE;
        }

        // Optional: restore title on unmount
        return () => {
            // document.title = previousTitle;
        };
    }, [title, appendBase]);
}
