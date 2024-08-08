<template>
  <div class="range-slider">
    <div class="d-flex align-items-center justify-content-between">
      <input class="border-0 fs-5 secondary-border rounded p-2 w-45" type="number" v-model="sliderMinValue" :min="props.startMin" :max="props.startMax" @blur="changePriceRange"/>
      <input class="border-0 fs-5 secondary-border rounded p-2 w-45" type="number" v-model="sliderMaxValue" :min="props.startMin" :max="props.startMax" @blur="changePriceRange"/>
    </div>
    <div class="mt-4">
      <input v-model="sliderMinValue" :min="props.startMin" :max="props.startMax" :step="props.sliderStep" type="range" @mouseup="changePriceRange"/>
      <input v-model="sliderMaxValue" :min="props.startMin" :max="props.startMax" :step="props.sliderStep" type="range" @mouseup="changePriceRange"/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
let props = defineProps({
  minValue:{
    type:Number,
    default:0
  },
  maxValue:{
    type:Number,
    default:50000
  },
  startMin:{
    type:Number,
    default:0
  },
  startMax:{
    type:Number,
    default:120000
  },
  sliderStep:{
    type:Number,
    default:500
  }
})

const sliderMinValue = ref(props.minValue)
const sliderMaxValue = ref(props.maxValue)
const emit = defineEmits(["update:minValue", "update:maxValue", 'changePriceRange']);
emit("update:minValue", sliderMinValue.value);
emit("update:maxValue", sliderMaxValue.value);

const changePriceRange = () =>{
  if(parseInt(sliderMinValue.value) > parseInt(sliderMaxValue.value)){
    const temp = sliderMaxValue.value
    sliderMaxValue.value = sliderMinValue.value;
    sliderMinValue.value = temp;
  }
  emit('changePriceRange', {min:  parseInt(sliderMinValue.value), max: parseInt(sliderMaxValue.value)})
}

// onMounted(() =>{
//     var parent = document.querySelector(".range-slider");
//     if(!parent) return;
//     var rangeS = parent.querySelectorAll("input[type=range]"),
//         numberS = parent.querySelectorAll("input[type=number]");
//     // rangeS.forEach(function(el) {
//     //     el.onmouseup = function() {
//     //         if (sliderMinValue.value > sliderMaxValue.value){
//     //             const temp = sliderMinValue.value
//     //             sliderMaxValue.value = sliderMinValue.value
//     //             sliderMinValue.value = temp
//     //         }
//     //     }
//     // });
//
//
//     numberS.forEach(function(el) {
//         el.onblur = function() {
//             var number1 = parseFloat(numberS[0].value),
//                 number2 = parseFloat(numberS[1].value);
//             if (number1 > number2) {
//                 var tmp = number1;
//                 numberS[0].value = number2;
//                 numberS[1].value = tmp;
//             }
//             sliderMinValue.value = number1;
//             sliderMaxValue.value = number2;
//         }
//     });
// })

</script>

<style scoped>
.range-slider {
  /*width: 300px;*/
  margin: auto;
  text-align: center;
  position: relative;
  height: 4em;
}

.range-slider svg,
.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}
input[type=number]:focus{
  outline: none;
}
input[type=number] {
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1.6em;
  -moz-appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type=number]:invalid,
input[type=number]:out-of-range {
  border: 2px solid #ff6347;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #677BE5;
}

input[type=range]:focus::-ms-fill-lower {
  background: #677BE5;
}

input[type=range]:focus::-ms-fill-upper {
  background: #677BE5;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #677BE5;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 3px solid #677BE5;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #fff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #677BE5;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-moz-range-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 3px solid #677BE5;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #677BE5;
  cursor: pointer;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

input[type=range]::-ms-fill-lower,
input[type=range]::-ms-fill-upper {
  background: #677BE5;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-ms-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #677BE5;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
}
</style>