<script setup>
import useAxios from "@/composables/useAxios";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const {sendRequest, error, loading}= useAxios();
const page = ref({})

onMounted(async () => {
  const route = useRoute();
  const data = await sendRequest(`/api/pages/${route.params?.slug}`)
  page.value = data?.data
})


</script>

<template>
  <CatNav :category="true" />
  <section class="customer-section overflow-hidden py-5">
    <div class="card">
      <div class="card-body">
        <h2 class="text-start">{{ page?.title }}</h2>
        <hr>
        <div v-html="page?.summery"/>
      </div>
    </div>
  </section>
</template>

<style lang="sass">

</style>