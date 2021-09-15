<template lang="pug">
	.service
		transition(name="backdrop")
			.service__backdrop(@click="handleClickBackdrop" v-if="visibleBackdrop" :style="{ zIndex: baseZindex + visibleModals.length - 1}")
		.service__content
			component(
				v-for="modal, index in modals"
				:ref="`modal-${modal._uid}`"
				v-show="isVisible(modal)"
				:key="modal._uid"
				:is="modal.component"
				v-bind="modal.props"
				v-on="modal.on"
				@close="close(modal._uid)"
				:style="{ zIndex: baseZindex + index}"
			)
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import has from 'lodash/get'
import last from 'lodash/last'

export default {
	data: () => ({
		preloaded: []
	}),
	computed: {
		...mapState(['modals']),
		visibleModals() {
			return this.modals.filter(this.isVisible)
		},
		visibleBackdrop() {
			return this.visibleModals.length
		},
		baseZindex() {
			return 9999
		}
	},
	methods: {
        test() {
            console.log('v-on');
        },
		...mapMutations(['openModal', 'closeModal']),
		last,
		isVisible(modal) {
			return !has(modal, 'on.preload') || ~this.preloaded.indexOf(modal._uid) 
		},
		close(uid) {
			const index = this.preloaded.indexOf(uid)

			if(~index) {
				this.preloaded.splice(index, 1)
			}

			this.closeModal(uid)
		},
		handleClickBackdrop() {
			const lastId = last(this.visibleModals)._uid

			const lastRef = this.$refs[`modal-${lastId}`][0]

			if(typeof lastRef.closeOnBackdrop === 'undefined' || lastRef.closeOnBackdrop) {
				lastRef.$emit('close')

				document.body.classList.remove('--overlay')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
	.service {
		&__content {
			position: relative;
		}

		&__backdrop {
			position: fixed;
            width: 100vw;
            height: 100vh;
			background: rgba(#000, .4);
			display: flex;
			flex-direction: column;
			align-items: center;
			overflow: auto;
		}
	}

	.backdrop {
		&-enter-active, &-leave-active {
			transition: opacity 160ms linear;
		}
		&-enter, &-leave-to {
			opacity: 0;
		}
	}

	.modal-enter-active {
		transition: all 320ms;
	}
	.modal-enter {
		opacity: 0;
		transform: translateY(20px);
	}

</style>
