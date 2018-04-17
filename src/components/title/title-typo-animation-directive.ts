import TweenMax from 'gsap';
import { Store } from 'vuex';
import { diContainer, types} from './../dependency-injection';

import { innerHTMLToWords } from '../string-operations/';
import { shuffle } from '../array-operations';
import { mutationTypes } from '../../store';

export default {
    bind() {
        const store: Store<any> = diContainer.get(types.Store);
        // commit mutation to store
        store.commit(mutationTypes.CURRENT_TITLE_INVISIBLE);
    },

    /**
     *
     * @param { HTMLElement } el
     * @param { Object } bindings
     * @namespace bindings
     * @property { boolean } tween, whether tween or not
     * @return { Promise<any> }
     */
    async inserted(el, bindings): Promise<any> {
        const store: Store<any> = diContainer.get(types.Store);
        const splittedWords = innerHTMLToWords(el);
        let shuffledIndexes = [];
        let elements = [];

        el.innerHTML = null;

        splittedWords.forEach((word, key) => {
           const span = document.createElement('span');

           // add space to each span except
           // last one
           if (key !== splittedWords.length - 1) {
               span.innerHTML = word + '&nbsp;';
           } else {
               span.innerHTML = word;
           }

           span.style.opacity = '0';
           span.style.display = 'inline-block';

           shuffledIndexes[key] = key;
           elements[key] = span;

           el.appendChild(span);
        });

        if (bindings.value.tween !== false) {
            // workaround for current native Promise,
            // to resolve it later
            let animationCompleteClb = new Function();
            const animationCompletePromise = new Promise( (res) => {
                animationCompleteClb = res;
            });

            // store a Promise for each Tween,
            // so we can handle onComplete more conveniently
            const allAnimationPromises: Promise<any> | any = [];
            allAnimationPromises.push(animationCompletePromise);

            // shuffle Indexes for non-sequential animation
            shuffledIndexes = shuffle(shuffledIndexes);

            let i = 0;
            let l = shuffledIndexes.length;

            for (i; i < l; i++) {
                const currentElement = elements[shuffledIndexes[i]];

                // apply some blur
                currentElement.blur = 2;

                TweenMax.to(currentElement, 3,
                    {
                        opacity:  1,
                        blur: 0,
                        delay: 0.05 * i,
                        onComplete: animationCompleteClb,
                        onUpdateParams: [elements[shuffledIndexes[i]]],
                        onUpdate: function (el) {
                            TweenMax.set(el, { filter: 'blur(' + el.blur + 'px)' });
                        }
                    },
                );
            }

            await Promise.all(allAnimationPromises);
        } else {
            await Promise.resolve();
        }

        // commit mutation to broadcast that title anim is finished
        store.commit(mutationTypes.CURRENT_TITLE_VISIBLE);
    },
};
