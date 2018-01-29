import TweenMax from 'gsap';
import { shuffle } from './../array-operations';
import innerHTMLToWords from './innerhtml-to-words';

export default {
    inserted(el) {
        const splittedWords = innerHTMLToWords(el);
        let shuffledIndexes = [];
        let elements = [];

        el.innerHTML = null;

        splittedWords.forEach((word, key) => {
           const span = document.createElement('span');

           // add space to each span except
           // last one
           if (key !== splittedWords.length) {
               span.innerHTML = word + ' ';
           } else {
               span.innerHTML = word;
           }

           span.style.opacity = "0";

           shuffledIndexes[key] = key;
           elements[key] = span;

           el.appendChild(span);
        });

        shuffledIndexes = shuffle(shuffledIndexes);

        let i = 0;
        let l = shuffledIndexes.length;
        for (i; i < l; i++) {
            TweenMax.to(elements[shuffledIndexes[i]], 3, {
                opacity:  1,
                delay: 0.05 * i
            });
        }
    }
};
