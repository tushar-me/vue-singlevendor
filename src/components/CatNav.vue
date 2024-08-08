<script setup>
import { defineProps } from 'vue';
import useAxios from "@/composables/useAxios.js";
import {ref, onMounted, onBeforeUnmount} from 'vue'

const props = defineProps({
  category: {
    type: Boolean,
    default: true
  },
});

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});



const { loading, error, sendRequest } = useAxios();

const categories = ref(null);


onMounted( async () => {
  const getCats = await sendRequest({
    method: 'get',
    url: '/api/navbar-categories',
  });

  categories.value = getCats.data
})
</script>

<template>
  <div class="bg-primary w-100 py-3 d-none d-lg-block" >
    <div class="container">
      <ul class="d-flex align-items-center gap-5">
        <li>
          <RouterLink to="/products" class="bg-white text-black category-link position-relative">
            <span>Category</span>
            <span>See All</span>
              <div class="position-absolute cat" v-if="category"  :class="{'cat-hidden' : isScrolled}">
                <div class="dropDown position-relative">
                  <ul class="d-flex flex-column bg-white h-100 overflow-y-scroll nav__scrollbar">
                    <li class="dropDownLink" v-for="link in categories" :key="link.id">
                      <RouterLink :to="`/products/?category=${link.id}`" class="navLink">
                        <span v-html="link.icon"></span>
                        <span class="text-uppercase fw-normal">{{ link.name }}</span>
                      </RouterLink>
                      <div v-if="link?.children_recursive?.length > 0" class="dropDownHoverItems">
                        <ul class="navItems">
                          <li v-for="item in link?.children_recursive">
                            <RouterLink :to="`/products/?category=${item.id}`" class="navLink">
                              <span v-html="item.icon"/>
                              <span>{{ item.name }}</span>
                            </RouterLink>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
          </RouterLink>
        </li>
        <li>
          <a href="/page/about-us"  class="text-white fw-semibold d-flex align-items-center gap-2 text-uppercase">
            <i class="bi bi-arrow-down-left-square"></i> About us</a>
        </li>
        <li>
          <a href="/page/services"  class="text-white fw-semibold d-flex align-items-center gap-2 text-uppercase">
            <i class="bi bi-gear "></i> Services
          </a>
        </li>
        <li>
          <a href="/page/contact-us"  class="text-white fw-semibold d-flex align-items-center gap-2 text-uppercase">
            <i class="bi bi-chat-text"></i> Contact Us
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>