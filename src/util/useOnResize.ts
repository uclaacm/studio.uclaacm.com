import React from "react";

export function useOnResize(
	containerRef: React.MutableRefObject<HTMLElement>,
	callback: (size: ResizeObserverSize) => void,
    deps?: React.DependencyList,
    preferDevicePixel: boolean = true,
){
	React.useEffect(() => {
        if(!containerRef) return;
        const container = containerRef.current;

        const resizeObserver = new ResizeObserver(entries => {
            if (entries.length === 0) return;
            const entry = entries[0];
            const size = preferDevicePixel
                ? (entry.devicePixelContentBoxSize ?? entry.contentBoxSize)[0]
                : entry.contentBoxSize[0];
            callback(size);
        })

        resizeObserver.observe(container);

        return () => {
            resizeObserver.unobserve(container);
        }
    }, [containerRef, ...deps ?? []]);
}

export function useSize(
	containerRef: React.MutableRefObject<HTMLElement>,
    devicePixel: boolean = false,
){
    const [size, setSize] = React.useState<ResizeObserverSize>(null);

	React.useEffect(() => {
        if(!containerRef) return;
        const container = containerRef.current;

        const resizeObserver = new ResizeObserver(entries => {
            if (entries.length === 0) return;
            const entry = entries[0];
            const newSize = devicePixel
                ? (entry.devicePixelContentBoxSize ?? entry.contentBoxSize)[0]
                : entry.contentBoxSize[0];
            setSize(newSize);
        })

        resizeObserver.observe(container);

        return () => {
            resizeObserver.unobserve(container);
        }
    }, [containerRef, devicePixel]);

    return size;
}