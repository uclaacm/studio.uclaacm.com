import React from "react";

/**
 * Scales the canvas's width and height fields
 * to match the inline and block size of the container.
 * Uses device pixels if they exist.
 * @param containerRef the container of the canvas
 * @param canvasRef the canvas
 */
export function useOnResize(
	containerRef: React.MutableRefObject<HTMLElement>,
	callback: (size: ResizeObserverSize) => void,
    deps?: React.DependencyList,
    preferDevicePixel: boolean = true,
){
	React.useEffect(() => {
        if(!containerRef) return;
        const canvasContainer = containerRef.current;

        const resizeObserver = new ResizeObserver(entries => {
            if (entries.length === 0) return;
            const entry = entries[0];
            const size = preferDevicePixel
                ? (entry.devicePixelContentBoxSize ?? entry.contentBoxSize)[0]
                : entry.contentBoxSize[0];
            callback(size);
        })

        resizeObserver.observe(canvasContainer);

        return () => {
            resizeObserver.unobserve(canvasContainer);
        }
    }, [containerRef, ...deps ?? []]);
}