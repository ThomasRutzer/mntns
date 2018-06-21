import Vue from 'vue';
import { Component, Provide, Prop, Watch } from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';
import FocusTrap from 'focus-trap';
import { ModalServiceInterface } from './modal-service-interface';

/**
 * Component setup
 *
 * template uses slots where content can be
 * included and distributed, like:
 *
 *  <modal name="test">
 *    <template slot="content">
 *       Add your content like this
 *    </template>
 *  </modal>
 */
@Component({
    template: `<div v-show="isOpen" 
         :aria-hidden="isOpen ? false: true" 
         aria-role="dialog" 
         class="modal">
        <div class="modal__backdrop">
            <div class="modal__wrapper">
                <div class="modal__container"
                     @mouseenter="mouseMove = 0"
                     @mouseleave="mouseMove = 1"
                     v-mousemove-follow="{activated: mouseMove, maxOffsetY: -32, maxOffsetX: 32, transitionDuration: 1700}">
                    <transition name="modal__content-">
                        <div ref="content" 
                             v-show="isOpen"
                             class="modal__content"
                        >                
                            <button ref="closeButton" class="modal__close" @click="close()">
                                <span class="small-text-appearance">Close (esc)</span>      
                            </button>
                            <slot name="content">           
                                             
                            </slot>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>`
})
export class ModalComponent extends Vue {
    private focusTrap;
    private modalService: ModalServiceInterface;

    $refs: {
        closeButton: HTMLButtonElement,
        content: HTMLElement
    };

    @Prop({ required: true })
    name: string;

    @Provide()
    isOpen: boolean = false;

    @Provide()
    mouseMove: number = 1;

    @Watch('$store.state.activeModal')
    activeModalChangeHandler(newVal) {
        if (newVal === null) {
            this.onClose();
        }

        if (!this.isOpen && newVal === this.name) {
            this.onOpen();
        }
    }

    created() {
        this.modalService = diContainer.get(types.ModalService);
        this.modalService.register(this.name);
    }

    mounted() {
        this.focusTrap = FocusTrap(this.$el);
    }

    destroyed() {
        this.modalService.unregister(this.name);
    }

    /**
     * always use service to trigger close
     */
    close() {
        this.modalService.close();
    }

    private onOpen() {
        this.isOpen = true;
        this.bindEvents();

        Vue.nextTick(() => {
            this.focusTrap.activate();
        });
    }

    private onClose() {
        this.unbindEvents();
        this.isOpen = false;
        this.focusTrap.deactivate();
    }

    private bindEvents() {
        document.addEventListener('keyup', this.keyupHandler.bind(this), false);
    }

    private unbindEvents() {
        document.removeEventListener('keyup', this.keyupHandler, false);
    }

    private keyupHandler(event) {
        switch (event.keyCode) {
            // Esc
            case 27:
                this.close();
                break;
        }
    }
}