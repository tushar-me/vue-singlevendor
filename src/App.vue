<template>
  <!-- Page content -->
  <Header/>
    <main class="min-vh-100 content-top-margin">
      <RouterView></RouterView>
    </main>
  <Footer/>
</template>

<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import PreLoader from "@/components/PreLoader.vue";
import { useAuthStore } from "./stores/useAuthStore";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(async ()=> await authStore.fetchUser())

</script>

<style>

.content-top-margin{
  margin-top:114px;
}
</style>
