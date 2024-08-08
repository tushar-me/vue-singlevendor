<template>
  <CatNav :category="false" />
    <!-- Content -->
    <section class="pb-8">
        <div class="container">
          <div class="d-flex align-items-center justify-content-between">
            <nav aria-label="breadcrumb" class="my-4">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <RouterLink to="/" class="fs-4 secondary-color d-flex align-items-center gap-2">
                    <i class="bi bi-house-door"></i>Home
                  </RouterLink>
                </li>
                <li class="breadcrumb-item active fs-4" aria-current="page">All Products</li>
              </ol>
            </nav>
            <button class="d-flex align-items-center gap-1 d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
              <span class="secondary-button px-2 rounded">
                <i class="bi bi-funnel fs-4"></i>
              </span>
            </button>
          </div>

          <div class="d-flex">
            <div class="w-20 pe-lg-3 d-none d-lg-block">
              <div class="product-filters">

<!--                <div class="product-filters-filter">-->
<!--                  <h3>Price Range</h3>-->
<!--                  <div class="p-3">-->
<!--                    <PriceRangeSlider />-->
<!--                  </div>-->
<!--                </div>-->
                <div class="product-filters-filter">
                  <h3 type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseExample">
                      Category
                  </h3>
                  <div class="collapse show" id="collapseCategory">
                    <ul class="p-3">
                      <li v-for="category in categories" :key="category?.id">
                        <a :href="`/products/?category=${category?.id}`">{{category?.name}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="product-filters-filter">
                  <h3 type="button" data-bs-toggle="collapse" data-bs-target="#collapseBrand" aria-expanded="false" aria-controls="collapseBrand">
                    Brand
                  </h3>
                  <div class="collapse show" id="collapseBrand">
                    <ul class="p-3">
                      <li v-for="brand in brands" :key="brand?.id">
                        <a :href="`/products/?brand=${brand.id}`">{{brand.title}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
<!--                <button class="button-gradient">RESET</button>-->
              </div>
            </div>
            <div class="w-100 w-lg-80 ps-lg-3">
              <div class="row row-cols-2 row-cols-lg-4" v-if="data?.data.length">
                <SingleProductCard v-for="item in data?.data" :key="`product-${item?.id}`" :info="item"/>
              </div>
              <div v-else>
                <h2 class="secondary-color">Product Not Found...</h2>
              </div>
            </div>
          </div>
        </div>
    </section>

  <div class="offcanvas offcanvas-start bg-white border-none shadow" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h3 class="offcanvas-title fw-semibold" id="offcanvasScrollingLabel">Product Filters</h3>
      <button data-bs-dismiss="offcanvas">
        <i class="bi bi-x-lg primary-color fs-3"></i>
      </button>
    </div>
    <div class="offcanvas-body">
      <div class="product-filters">
<!--        <div class="product-filters-filter">-->
<!--          <h3>Price Range</h3>-->
<!--          <div class="p-3">-->
<!--            <PriceRangeSlider />-->
<!--          </div>-->
<!--        </div>-->
        <div class="product-filters-filter">
          <h3 type="button" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseExample">
            Category
          </h3>
          <div class="collapse" id="collapseCategory">
            <ul class="p-3">
              <li v-for="category in categories" :key="category?.id">
                <a :href="`/products/?category=${category?.id}`">{{category?.name}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="product-filters-filter">
          <h3 type="button" data-bs-toggle="collapse" data-bs-target="#collapseBrand" aria-expanded="false" aria-controls="collapseBrand">
            Brand
          </h3>
          <div class="collapse" id="collapseBrand">
            <ul class="p-3">
              <li v-for="brand in brands" :key="brand?.id">
                <a :href="`/products/?brand=${brand?.id}`">{{brand?.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import {onMounted, ref, watch} from 'vue'
    import SingleProductCard from "@/components/SingleProductCard.vue";
    import useAxios from "@/composables/useAxios"
    import {useRoute} from "vue-router";
    import CatNav from "@/components/CatNav.vue";
    import PriceRangeSlider from "@/components/PriceRangeSlider.vue";
    const { loading, error, sendRequest } = useAxios();
    const data = ref(null);
    const categories = ref(null);
    const brands = ref(null);

    const getData = async () => {
      const responseData = await sendRequest({
        method: 'get',
        url: '/api/product',
        params:{...useRoute()?.query}
      });
      data.value = responseData.data;
    }

    const getCategories = async() => {
      const responseCategory = await sendRequest({
        method: 'get',
        url: '/api/category?onlyData=true',
      });
      console.log("categories", responseCategory);
      categories.value = responseCategory.data;
    }

    const getBrands = async () => {
      const responseBrand = await sendRequest( {
        method: 'get',
        url: '/api/brand'
      });
      brands.value = responseBrand.data;
    }

    onMounted( () => {
      getData();
      getCategories();
      getBrands();
    });

</script>

<style scoped>
.offcanvas {
  width: 260px;
}
</style>