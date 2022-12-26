<template>
    <div class="relative w-9/12 mx-auto flex items-center justify-between lg:w-4/12">
        <div 
            v-for="step in steps" 
            :key="step" 
            @click="onSelect(step)"
            :class="{selected: step <= currentStep, 'cursor-pointer': isStepSelectable(step)}" 
            class="step"
            >
        </div>
        <div class="crossline progress" :style="{ '--step-index': currentStep - 1 }">
        </div>
        <div class="crossline"></div>
    </div>
</template>

<script>
export default {
    props: {
        steps: {
            required: true,
            type: Number
        },
        currentStep: {
            required: true,
            type: Number
        },
    },
    methods: {
        isStepSelectable(step){
            return step < this.currentStep // We can only go back to preceding steps
        },
        onSelect(step){
            if (!this.isStepSelectable(step)) return

            this.$emit('select', step)
        }
    }
}
</script>

<style scoped>
.step {
    @apply w-4 h-4 rounded-full;
    background: #d9d9d9;
}

.step.selected {
    background: #00b373;
}

.crossline {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #d9d9d9;
    z-index: -2;
}

.crossline.progress {
    --step-index: 0;
    width: calc(100% / 4 * var(--step-index));
    background: #00b373;
    z-index: -1;
}
</style>
