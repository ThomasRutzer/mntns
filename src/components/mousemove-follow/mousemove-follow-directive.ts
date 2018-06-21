/**
 * Directive listens to document.mousemove events  and
 * applies transforms based on given settings
 */

export default {
    /**
     * @param { HTMLElement } el
     * @param { Object } bindings
     * @namespace bindings.value
     * @property { number} activated where 1=activated, 2=deactivated, 0=paused
     * @property { Number=0 } initialOffsetX
     * @property { Number=0 } initialOffsetY
     * @property { Number=0 } maxOffsetX
     * @property { Number=0 } maxOffsetY
     * @property { Number=300 } transitionDuration
     */
    bind(el, bindings) {
        el.mousemoveOptions = {
            duration: bindings.value.transitionDuration || 300,
            initialOffsetX: bindings.value.initialOffsetX || 0,
            initialOffsetY: bindings.value.initialOffsetY || 0,

            maxOffsetX: bindings.value.maxOffsetX || 0,
            maxOffsetY: bindings.value.maxOffsetY || 0
        };

        el.mousemoveHandler = (e: MouseEvent) => {
            const options = el.mousemoveOptions;

            const XPercentage = (e.pageX / window.innerWidth) * 100;
            const offsetX = options.initialOffsetX + Math.round((options.maxOffsetX * (XPercentage / 100)));

            const YPercentage = (((window.innerHeight - e.pageY) / window.innerHeight) * 100);
            const offsetY = options.initialOffsetY + Math.round((options.maxOffsetY * (YPercentage / 100)));

            applyTransforms(el, offsetX, offsetY);
        };

        document.addEventListener('mousemove', el.mousemoveHandler);
        el.style.transition = `transform ${el.mousemoveOptions.duration}ms ease-out`;

        applyTransforms(
            el,
            el.mousemoveOptions.initialOffsetX,
            el.mousemoveOptions.initialOffsetY
        );
    },

    update(el, bindings) {

        switch (bindings.value.activated) {
            case 1:
                document.addEventListener('mousemove', el.mousemoveHandler);
                el.style.transition = `transform ${el.mousemoveOptions.duration}ms ease-out`;

                applyTransforms(
                    el,
                    el.mousemoveOptions.initialOffsetX,
                    el.mousemoveOptions.initialOffsetY
                );
                break;

            case 2:
                document.removeEventListener('mousemove', el.mousemoveHandler);
                el.style.transition = `none`;

                el.style.removeProperty('transform');
                break;

            case 0:
                document.removeEventListener('mousemove', el.mousemoveHandler);
                break;

            default:
        }
    },

    unbind(el) {
        document.removeEventListener('mousemove', el.mousemoveHandler);
        delete el.mousemoveOptions;
        el.style.cssText = '';
    }
};

function applyTransforms(el: HTMLElement, x: number, y: number) {
    el.style.transform = `translate(${x}px, ${y}px)`;
}