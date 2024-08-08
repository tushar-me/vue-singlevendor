<template>
  <CatNav :category="true" />
    <!-- Page header -->
    <section class="main-section">
        <div>
          <swiper
              :effect="'fade'"
              :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
                      :pagination="{
              clickable: true,
            }"
              :navigation="true"
              :modules="modules"
              class="mySwiper"
            >
            <swiper-slide>
              <img src="https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg" class="w-100 h-100">
            </swiper-slide>
          </swiper>
        </div>
    </section>

  <!-- End Page header slider section-->


    <section class="top-categories py-4 py-lg-8">
      <span class="top-categories-vector bg-secondary"></span>
      <div class="top-categories-left-vector bg-secondary">
      </div>
      <div class="container position-relative z-3">
        <h2 class="mb-3 title-big text-primary">Top Categories</h2>
        <div class="row row-cols-2 row-cols-lg-4 title-big-content">

          <template v-if="categories?.length > 0">
          <div class="col p-2" v-for="category in categories?.slice(0, 12)" :key="category.id">
            <RouterLink :to="`/products/?category=${category.id}`">
              <div class="top-categories__card">
                <div v-html="category?.icon">
                </div>
                <div>
                  <h3>{{ category?.name }}</h3>
                </div>
              </div>
            </RouterLink>
          </div>
          </template>
        </div>
      </div>
    </section>
    <section class="py-4 py-lg-8">
        <div class="container pt-4">
          <div class="d-flex align-items-center justify-content-center gap-4">
            <h2 class="holiday-title">HOLIDAY</h2>
            <h2 class="holiday-title"> SPECIALS</h2>
          </div>

            <div class="row row-cols-2 row-cols-lg-5 holiday-title-content">
                <SingleProductCard v-for="item in data" :key="`product-${item.id}`" :info="item"/>
            </div>
        </div>
    </section>

<!--   category products sections start-->

    <section v-for="(category, i) in homeProducts" class="category-product-section">
      <div class="container">
        <h2  class="category-product-section-title" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">{{category?.name}}</h2>
        <RouterLink to="/" class="category-product-section-banner" :style="`background-image:url(${$API_URL+'/storage/'+category?.photo})`">
          <div class="category-product-section-banner-vector-1 bg-secondary" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800"></div>
          <div class="category-product-section-banner-vector-2 bg-secondary" data-aos="fade-down" data-aos-duration="500"></div>
        </RouterLink>
        <div class="row row-cols-2 row-cols-lg-5 mt-5">
          <SingleProductCard v-for="item in category?.products" :key="`product-${item.id}`" :info="item"/>
        </div>
      </div>
    </section>

    <section class="py-4 py-lg-8">
        <div class="container">
            <div class="row banner">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="d-flex flex-column mb-5 mb-lg-0 button-primary py-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                        <div class="banner-icon">
                            <i class="bi bi-truck"></i>
                        </div>
                        <div class="text-center">
                            <h4 class="text-capitalize">FREE SHIPPING</h4>
                            <p>When you spend over ৳5000</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="d-flex flex-column mb-5 mb-lg-0 button-primary py-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                        <div class="banner-icon">
                            <i class="bi bi-phone-vibrate"></i>
                        </div>
                        <div class="text-center">
                            <h4 class="text-capitalize">Give Us a Call</h4>
                            <a href="tel:">+1 (800) 222-5728</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <RouterLink to="" class="d-flex flex-column mb-5 mb-lg-0 button-primary py-4"  data-aos="fade-up" data-aos-duration="1000" data-aos-delay="700">
                        <div class="banner-icon">
                            <i class="bi bi-shop-window"></i>
                        </div>
                        <div class="text-center">
                            <h4 class="text-capitalize">Locations</h4>
                            <p>Find a store near you</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import {onMounted, ref} from 'vue'
    import SingleProductCard from "@/components/SingleProductCard.vue";
    import useAxios from "@/composables/useAxios"
    import {demoLinks} from '@/navlinks'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/effect-fade';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
    import CatNav from "@/components/CatNav.vue";


    const modules = [Autoplay, Pagination, Navigation, EffectFade];

    const links = demoLinks;
    const { loading, error, sendRequest } = useAxios();
    const data = ref(null);
    const categories = ref(null);
    const homeProducts = ref(null);

    
    const getNavCats = async() => {
      const response  = await sendRequest({
        method: 'get',
        url: '/api/navbar-categories',
      })
      if(response){
        categories.value = getCats?.data
      }
    }

    const getHomeCats = async() => {
      const response  = await sendRequest({
        method: 'get',
        url: '/api/home-categories',
      });

      if(response){
        homeProducts.value = homeCats?.data
      }
    }

    const getProducts = async () => {
      const response = await sendRequest({
        method: 'get',
        url: '/api/product-with-variations',
      });
      if(response) {
        data.value = response?.data
      }
    }

    onMounted(async () => {
      await getNavCats();
      await getHomeCats();
      await getProducts();
    });
</script>
