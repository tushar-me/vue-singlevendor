
<template>
    <div class="quantity">
        <button class="w-100" @click="decrement()">&mdash;</button>
        <input type="text" v-model="quantity" @input="updateQuantity" readonly>
        <button class="w-100" @click="increment()">&#xff0b;</button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Number,
    maxQty: {
        type:Number,
        default:10
    },
})

const quantity = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const increment = () => {
    if(quantity.value < props.maxQty){
        quantity.value++;
        emit("update:modelValue", quantity.value)

    }
};
const decrement = () => {
    if (quantity.value > 1) {
        quantity.value--;
        emit("update:modelValue", quantity.value)
    }
};

const updateQuantity = () => {
    if (Number.isInteger(quantity.value) && quantity.value > 0) {
        emit("update:modelValue", quantity.value)
    }
};
</script>
<style lang="scss" scoped>
.quantity {
    border: 1px solid #C1CDDD;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
        border: 0;
        max-width: 90px;
        min-width: 70px;
        border-left: 1px solid #C1CDDD;
        border-right: 1px solid #C1CDDD;
        padding: 15px;
        text-align: center;
    }

    button {
        padding: 15px;
    }
}
</style>