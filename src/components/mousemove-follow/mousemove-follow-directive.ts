/**
 * Directive listens to document.mousemove events  and
 * applies transforms based on given settings
 */

export default {
    /**
     * @param { HTMLElement } el
     * @param { Object } bindings
     * @namespace bindings.value
     * @property { Number=0 } initialOffsetX
     * @property { Number=0 } initialOffsetY
     * @property { Number=0 } maxOffsetX
     * @property { Number=0 } maxOffsetY
     * @property { Number=300 } transitionDuration
     */
    bind(el, bindings) {
        const initialOffsetX = bindings.value.initialOffsetX || 0;
        const initialOffsetY = bindings.value.initialOffsetY || 0;

        const maxOffsetX = bindings.value.maxOffsetX || 0;
        const maxOffsetY = bindings.value.maxOffsetY || 0;

        const duration = bindings.value.transitionDuration || 300;

        // store handler as property of el to make it removable again
        el.mousemoveHandler = (e: MouseEvent) => {
            const XPercentage = (e.pageX / window.innerWidth) * 100;
            const offsetX = initialOffsetX + Math.round((maxOffsetX * (XPercentage / 100)));

            const YPercentage = (((window.innerHeight - e.pageY) / window.innerHeight) * 100);
            const offsetY = initialOffsetY + Math.round((maxOffsetY * (YPercentage / 100)));

            applyTransforms(offsetX, offsetY);
        };

        const applyTransforms = (x: number, y: number) => {
            el.style.transform = `translate(${x}px, ${y}px)`;
        };

        el.style.transition = `transform ${duration}ms ease-out`;
        applyTransforms(initialOffsetX, initialOffsetY);
        document.addEventListener('mousemove', el.mousemoveHandler);
    },

    unbind(el) {
        document.removeEventListener('mousemove', el.mousemoveHandler);
    }
};
