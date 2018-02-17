import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';

/**
 * abstract component. May extend every "common" router component,
 * e.g. any content pages like contact etc, to abstract common behavior
 */

@Component
export class RouterDefaultComponentAbstract extends Vue {
    beforeCreate() {
        this.$store.commit(mutationTypes.REDUCE_BACKGROUND);
    }
}