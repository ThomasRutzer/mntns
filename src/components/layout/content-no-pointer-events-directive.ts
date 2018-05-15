const modifierClass: string = 'layout__content--no-pointer-events';

/**
 * directive to watch state property "experimentContainer.clickable"
 * If it´s false, applies class to DOM Node where
 * it´s bound
 */
export default {
    bind(el, bindings) {
        classCheck(el, bindings.value);
    },

    update(el, bindings) {
        classCheck(el, bindings.value);
    }
};

function classCheck(el: HTMLElement, propValue: boolean) {
    if (propValue === false) {
        el.classList.add(modifierClass);
    } else {
        el.classList.remove(modifierClass);
    }
}