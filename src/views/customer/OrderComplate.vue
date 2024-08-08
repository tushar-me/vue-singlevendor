<template>
  <CatNav :category="false" />
  <div class="payment-continer">
    <div class="payment-flex">
        <h1>Thanks For Shopping...</h1>
        <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id in magnam facere nam nobis incidunt officia? Dolor, architecto ex, a molestiae dolores aspernatur id mollitia blanditiis deleniti quia eaque veritatis?</small>
        <RouterLink class="secondary-button px-4" :to="{name: 'dashboard'}">Go To Dashbaord</RouterLink>
    </div>
  </div>
</template>

<script setup>

import CatNav from "@/components/CatNav.vue";
</script>

<style>
  .payment-continer{
    min-height: 70vh;
    display: grid !important;
    place-items: center;
    align-items: center;
  }
  .payment-continer .payment-flex{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 50%;
    gap:1rem;
    text-align: center;
  }
</style>