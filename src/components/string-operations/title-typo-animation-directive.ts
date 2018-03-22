import TweenMax from 'gsap';
import innerHTMLToWords from './innerhtml-to-words';
import store, { mutationTypes } from '../../store/';


export default {
    bind() {
        store.commit(mutationTypes.CURRENT_TITLE_INVISIBLE);
    },

    async inserted(el) {
        const splittedWords = innerHTMLToWords(el);
        let shuffledIndexes = [];
        let elements = [];

        // workaround for current native Promise,
        // to resolve it later
        let animationCompleteClb = new Function();
        const animationCompletePromise = new Promise( (res) => {
            animationCompleteClb = res;
        });

        // store a Promise for each Tween,
        // so we can handle onComplete more conveniently
        const allAnimationPromises: Promise<any> | any = [];

        el.innerHTML = null;

        splittedWords.forEach((word, key) => {
           const span = document.createElement('span');

           // add space to each span except
           // last one
           if (key !== splittedWords.length) {
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

        // shuffledIndexes = shuffle(shuffledIndexes);
        allAnimationPromises.push(animationCompletePromise);

        let i = 0;
        let l = elements.length;
        for (i; i < l; i++) {
            TweenMax.fromTo(elements[i], 1.5 + elements.length * 0.1,
                {
                    opacity: 0,
                },
                {
                    opacity:  1,
                    delay: 0.05 * i,
                    onComplete: animationCompleteClb
                },
            );
        }

        await Promise.all(allAnimationPromises);
        store.commit(mutationTypes.CURRENT_TITLE_VISIBLE);
    },
};

