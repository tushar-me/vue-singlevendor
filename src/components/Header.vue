<template>
  <div>

    <div class="top-bar d-none d-lg-block bg-secondary">
      <div class="container">
        <div class="top_nav d-flex align-items-center justify-content-between py-2">
          <ul class="d-flex align-items-center gap-2 gap-lg-5">
            <li>
              <a href="tel:01639200002" class="d-flex align-items-center gap-2 text-white">
                <i class="bi bi-telephone"></i>
                <span class="fs-5 fw-medium">+(353)894978151</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@creativetechpark.com" class="d-flex align-items-center gap-2  text-white">
                <i class="bi bi-envelope"></i>
                <span class="fs-5 fw-medium">nurulislam570@gmail.com</span>
              </a>
            </li>
          </ul>
          <p class="fs-5 fw-medium  text-white">EXTRA 10% OFF ON FIRST ORDER</p>
          <RouterLink to="/" class="fs-5 d-flex align-items-center justify-content-center gap-2  text-white">
            <i class="bi bi-headphones"></i>NeedHelp?
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Nav -->

  <nav class="navbar mobile-navbar d-lg-none">
    <div class="container-fluid px-0">
      <RouterLink to="/" class="navbar-brand">
        <img src="https://creativetechpark.com/wp-content/uploads/2021/09/Creative-Tech-Park-Website-Design-Company-in-Bangladesh-Logo.png" alt="Comfort" style="width:126px"/>
      </RouterLink>

      <div class="d-flex align-items-center gap-3">
        <RouterLink to="/customer/cart" class="cart">
          <span>{{ cartStore.getCartLength }}</span>
          <i class="bi bi-cart fs-3"></i>
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <i class="bi bi-list primary-color fs-2"></i>
        </button>
      </div>
      <div class="offcanvas offcanvas-end bg-white" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style="width:350px;">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            <RouterLink v-if="authStore.isLoggedIn" :to="{ name: 'dashboard' }"
                        class="login d-flex align-items-center gap-1">
              <i class="bi bi-person"></i>
              <span class="fs-4 fw-normal">ACCOUNT</span>
            </RouterLink>
            <RouterLink v-else to="/login" class="login d-flex align-items-center gap-1">
              <i class="bi bi-person"></i>
              <span class="fs-4 fw-normal">
              SIGN IN or REGISTER
            </span>
            </RouterLink>
          </h5>
          <button type="button"  data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="bi bi-x-lg primary-color fs-3"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <form class="d-flex mt-3" role="search">
            <input class="form-control me-2 primary-border-1" type="search" placeholder="Search" aria-label="Search">
            <button class="secondary-button px-2 rounded" type="submit">Search</button>
          </form>
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item" v-for="link in categories" :key="link?.id">
              <a :href="`/products/?category=${link?.id}`" class="nav-link">
                <span v-html="link?.icon"></span>
                {{ link?.name }}
              </a>
            </li>
<!--            <li class="nav-item dropdown" v-for="link in categories" :key="link.id">-->
<!--              <a :href="`/products/?category=${link.id}`" class="nav-link" data-bs-toggle="dropdown"-->
<!--                aria-expanded="true">-->
<!--                <span v-html="link.icon"></span>-->
<!--                {{ link.name }}-->
<!--              </a>-->
<!--              <ul class="dropdown-menu bg-transparent" v-if="link?.children_recursve">-->
<!--                <li v-for="item in link.children_recursve">-->
<!--                  <a :href="`/products/?category=${category.id}`" class="dropdown-item d-flex align-items-start gap-1">-->
<!--                    <span v-html="item.icon"></span>-->
<!--                    {{ item.name }}-->
<!--                  </a>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--            <li class="nav-item">-->
<!--              <a href="/customer/wishlist" class="nav-link d-flex align-items-center gap-2">-->
<!--                Wishlist <i class="bi bi-heart"></i>-->
<!--              </a>-->
<!--            </li>-->
            <li class="nav-item">
              <a href="/customer/cart" class="nav-link d-flex align-items-center gap-2">
                Cart <i class="bi bi-cart"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <!-- Desktop Nav -->
  <nav class="navbar navbar-desktop navbar-expand-lg flex-column p-0 d-none d-lg-flex" :class="{'scrolled-nav' : isScrolled}">
    <div class="container py-2">
      <RouterLink class="navbar-brand" to="/">
        <img src="https://creativetechpark.com/wp-content/uploads/2021/09/Creative-Tech-Park-Website-Design-Company-in-Bangladesh-Logo.png"  alt="TOP ONE" />
      </RouterLink>
      <div class="d-flex align-items-center gap-8">
        <div class="d-flex align-items-center flex-column position-relative">
          <form>
            <div class="search search__radius">
              <input type="text" v-model="form"  placeholder="What are you looking for?">
              <a :href="`/products/?search=${form}`" class="secondary-button">
                search
                <i class="bi bi-search"></i>
              </a>
            </div>
          </form>
          <div class="search-preview shadow w-100" :class="{'d-none' : isPreview}" id="search-preview" v-if="products?.data?.length">
            <div class="d-flex">
              <div>
                <ul class="search-preview-list">
                  <li v-for="product in products?.data">
                    <a href="#" class="search-preview-list-item">
                      <div>
                        <img class="search-image" :src="$API_URL+'/storage/uploads/'+product?.images[0]?.image" alt="">
                      </div>
                      <div>
                        <h4>
                          <a :href="`/product-details/${product?.id}`">
                            {{ product?.title?.slice(0, 50) }}...
                          </a>
                        </h4>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3">
         <!-- <RouterLink to="/customer/wishlist" class="wish">
           <span>{{ wishListStore.getWishListLength }}</span>
           <i class="bi bi-heart fs-3"></i>
           <p>WISHLIST</p>
         </RouterLink> -->
          <RouterLink to="/customer/cart" class="cart">
            <span>{{ cartStore.getCartLength }}</span>
            <i class="bi bi-cart fs-3"></i>
            <P>CART</P>
          </RouterLink>
          <RouterLink v-if="authStore.isLoggedIn" :to="{ name: 'dashboard' }"
                      class="login d-flex align-items-center gap-1">
            <i class="bi bi-person"></i>
            <span class="fs-4 fw-normal">ACCOUNT</span>
          </RouterLink>
          <RouterLink v-else to="/login" class="login d-flex align-items-center gap-1">
            <i class="bi bi-person"></i>
            <span class="fs-4 fw-normal">
              SIGN IN or REGISTER
            </span>
          </RouterLink>
        </div>
      </div>
    </div>

  </nav>
</template>

<script setup>
import useAxios from "@/composables/useAxios.js";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore"


import {useWishListStore} from "@/stores/useWishListStore.js";
const wishListStore = useWishListStore();
wishListStore.initWishList();

import {ref, onMounted, onBeforeUnmount, watch} from 'vue'
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
const { loading, error, sendRequest } = useAxios();
const categories = ref(null);
const router = useRoute();

onMounted( async () => {
  const getCats = await sendRequest({
    method: 'get',
    url: '/api/navbar-categories',
  });

  categories.value = getCats.data
})

const cartStore = useCartStore();
cartStore.initCart();

const authStore = useAuthStore();


const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});




const isPreview = ref(false);
const handleClickOutside = (event) => {
  const searchPreview = document.querySelector('#search-preview');
  if (searchPreview && !searchPreview.contains(event.target)) {
    isPreview.value = true;
  }
}


const products = ref(null)

const form = ref(router?.query?.search ?? null);



watch(form, async (query) => {
  isPreview.value = false;
  const response = await sendRequest({
    method: 'get',
    url: `/api/product-filter?search=${query}`,
  });
  products.value = response.data;
})



if(products.value?.length > 0) {
  isPreview.value = true;
}

</script>


<style>
.search__radius input{
  border-radius: 10px;
}
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all ease-in-out 0.4s;
}
.navbar-desktop {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100%;
  z-index: 999;
  transition: all ease-in-out 0.4s;
}
.scrolled-nav {
  top: 0;
  transition: all ease-in-out 0.4s;
}
.search-preview{
  position: absolute;
  top: 60px;
  left: 0;
  background: white;
  padding: 1rem;
  max-height: 500px;
  overflow-y: scroll;
}

.search-preview-list{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.search-preview-list-item{
  display: flex;
  align-items: start;
  gap: 1.5rem;
}

.search-preview-list-item h4{
  font-size: 15px;
}

.search-preview-list-item .search-image{
  width:120px;
  height:auto;
  object-fit: contain;
}
</style>
