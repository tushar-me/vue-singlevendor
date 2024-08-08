<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import Gallery from "@/views/Gallery.vue";
import useAxios from "@/composables/useAxios.js";
import {useRoute} from "vue-router";
import QuantityCounter from "@/components/QuantityCounter.vue";
import {useCartStore} from "@/stores/useCartStore.js";


  const {sendRequest} = useAxios();
  const {params} = useRoute()
  const cartStore = useCartStore();

  const selectVarient = ref([]);
  const getThambImage = ref(null)

  const buyQty = ref(1)
  const varientPrice = ref(0)
  const data = ref(null)

  const selectVarientProduct = ref({});

  watch([selectVarient, buyQty], ([item, qty]) => {
  varientPrice.value = 10 * qty
  const title = Array.isArray(item) ? item.map(attr => attr.selectVariant).join('/') + "/" : "";
  const selectedVariant = data.value?.stocks?.find(stockItem => stockItem.varient === title);
  selectVarientProduct.value = { ...selectedVariant, totalPrice: selectedVariant?.price * qty }
}, { deep: true })



  const qtyUp = () => {
    if (buyQty.value < 10) {
      buyQty.value++
    }
  }

  const qtyDown = () => {
    if (buyQty.value > 1) {
      buyQty.value--
    }
  }

  const addToCart = () => {
    if(isNaN(selectVarientProduct.value?.totalPrice)){
      cartStore.addToCart({data, selectSku:{sku:data.value.sku, price:data.value?.price, selectQty: buyQty.value}})
    }else{
      cartStore.addToCart({ data, selectSku: {...selectVarientProduct.value, selectQty: buyQty.value }})
    }
  }

  onMounted(async () => {
    const res = await sendRequest({
      method: 'get',
      url: `/api/product/${params.id}`,
    });

    selectVarient.value = res?.data?.attributes
    data.value = res?.data

    document.title = "The title property sets or returns the title of the document."
  });

  const storeImage = computed(() =>{
    return data?.value?.images?.map(item => {
      return `${import.meta.env.VITE_API_URL}/storage/uploads/${item?.image}`
    });
  })


</script>
<template>
  <div class="content-top-margin">
  <div class="container">
    <nav aria-label="breadcrumb" class="my-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/" class="fs-4 secondary-color d-flex align-items-center gap-2">
            <i class="bi bi-house-door"></i>Home
          </RouterLink>
        </li>
        <li class="breadcrumb-item active fs-4" aria-current="page">{{ data?.title?.length && data?.title?.length > 25 ? data?.title?.slice(0, 25)+'...' : data?.title }}</li>
      </ol>
    </nav>
  </div>
    <div class="container py-5">
        <div class="row">
            <div class="col-lg-3 col-12  mb-3">
              <Gallery :images="storeImage"/>
            </div>
            <div class="col-lg-6 col-12 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="bg-white p-3 h-100">
                    <h3 class="mb-2">
                      {{ data?.title }}
                    </h3>
                    <ul class="d-flex align-items-center gap-2">
                      <li>
                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                      </li>
                      <li>
                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                      </li>
                      <li>
                        <i class="bi bi-star fs-5 primary-color"></i>
                      </li>
                      <li class="text-dark">
                        (10) Rattings
                      </li>
                    </ul>
                    {{ data?.sku }}
                    <p>Brand: Apple</p>
                    <h3 class="price">৳ {{ data?.attributes?.length ? selectVarientProduct?.totalPrice : data?.price }}</h3>
                    <!--                    <s>৳ 259</s>-->

                      <div v-if="data?.attributes?.length">
                        <hr>
                          <div class="d-flex align-items-center" v-for="attribute in data?.attributes" :key="attribute.id">
                            <h3 class="me-3 fw-bold">{{ attribute?.option?.name }}:</h3>
                            <div class="d-flex">
                              <div v-for="(tag, index) in attribute?.tags" :key="index">
                                <label class="radio-label d-flex align-items-center justify-content-center">
                                  <input class="d-none" type="radio" v-model="attribute.selectVariant" :name="attribute?.option?.name" :value="tag">
    <!--                              <span class="radio-button"></span>-->
                                  <span class="radio-button">{{ tag }}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        <hr>
                      </div>
                    <div class="d-flex align-items-center gap-3 mt-3 flex-wrap">
                      <QuantityCounter v-model="buyQty"/>
                      <button class="primary-button btn button-primary--outline" @click="addToCart">Add To Cart</button>
                    </div>
                    <hr>
                    <div class="mt-5">
                      {{ data?.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-12 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="bg-white p-3 h-100">
                    <div class="mb-2">
                        <p class="mb-2">Delevery</p>
                        <div class="d-flex align-items-center gap-2 ms-2">
                            <i class="bi bi-cash-coin"></i>
                            <p>Cash on Delivery Available</p>
                        </div>
                    </div>
                    <div class="mb-2">
                        <p  class="mb-2">Service</p>
                        <div class="d-flex align-items-center gap-2 mb-2 ms-2">
                            <i class="bi bi-arrow-clockwise"></i>
                            <p>7 Days Returns</p>
                        </div>
                        <div class="d-flex align-items-center gap-2 ms-2">
                            <i class="bi bi-shield-check"></i>
                            <p>1 Year Warranty</p>
                        </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-12">
                <div class="product-detail-tab bg-white p-5">
                    <ul class="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-desc-tab" data-bs-toggle="pill" data-bs-target="#pills-desc" type="button" role="tab" aria-controls="pills-desc" aria-selected="true">Description</button>
                        </li>
<!--                        <li class="nav-item" role="presentation">-->
<!--                            <button class="nav-link" id="pills-review-tab" data-bs-toggle="pill" data-bs-target="#pills-review" type="button" role="tab" aria-controls="pills-review" aria-selected="false">Reviews</button>-->

<!--                        </li>-->
                        <!-- <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-qa-tab" data-bs-toggle="pill" data-bs-target="#pills-qa" type="button" role="tab" aria-controls="pills-qa" aria-selected="false"> Q/A </button>
                        </li> -->
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-desc" role="tabpanel" aria-labelledby="pills-desc-tab" tabindex="0">
                            <h3>Product Description</h3>
                            <div class="mt-5" v-html="data?.details"/>
                        </div>
                        <div class="tab-pane fade" id="pills-review" role="tabpanel" aria-labelledby="pills-review-tab" tabindex="0">
                          <div class="card">
                            <div class="card-body">
                              <h3>Ratings & Reviews</h3>
                              <div class="border-bottom pb-3">
                                <h2 class="fs-2">4.1</h2>
                                <ul class="d-flex align-items-center gap-2">
                                  <li>
                                    <i class="bi bi-star-fill fs-5 primary-color"></i>
                                  </li>
                                  <li>
                                    <i class="bi bi-star-fill fs-5 primary-color"></i>
                                  </li>
                                  <li>
                                    <i class="bi bi-star-fill fs-5 primary-color"></i>
                                  </li>
                                  <li>
                                    <i class="bi bi-star-fill fs-5 primary-color"></i>
                                  </li>
                                  <li>
                                    <i class="bi bi-star fs-5 primary-color"></i>
                                  </li>
                                  <li class="text-dark">
                                    (10) Rattings
                                  </li>
                                </ul>
                              </div>


                              <div class="border-bottom py-4">
                                <div class="d-flex align-items-center justify-content-between">
                                  <div class="d-flex align-items-center gap-3">
                                    <ul class="d-flex align-items-center gap-1">
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star fs-5 primary-color"></i>
                                      </li>
                                    </ul>
                                    <p>Tushar</p>
                                  </div>
                                  <span>7 months ago</span>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, illum!</p>
                              </div>

                              <div class="border-bottom py-4">
                                <div class="d-flex align-items-center justify-content-between">
                                  <div class="d-flex align-items-center gap-3">
                                    <ul class="d-flex align-items-center gap-1">
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star-fill fs-5 primary-color"></i>
                                      </li>
                                      <li>
                                        <i class="bi bi-star fs-5 primary-color"></i>
                                      </li>
                                    </ul>
                                    <p>Tushar</p>
                                  </div>
                                  <span>7 months ago</span>
                                </div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, illum!</p>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div class="tab-pane fade" id="pills-qa" role="tabpanel" aria-labelledby="pills-qa-tab" tabindex="0">
                            <h3 class="mb-4">Questions About This Product (1126)</h3>


                            <div class="py-3 border-bottom">
                                <div class="d-flex gap-3 mb-4">
                                    <span class="mt-1">
                                        <i class="bi bi-chat-square-fill primary-color"></i>
                                    </span>
                                    <div>
                                        <p>Is this product still available?</p>
                                        <span>MD.SHAMIM S. - 29 Nov 2023</span>
                                    </div>
                                </div>

                                <div class="d-flex gap-3">
                                    <span class="mt-1">
                                        <i class="bi bi-chat-square-fill text-secondary"></i>
                                    </span>
                                    <div>
                                        <p>Yes Sir.</p>
                                        <span>Shop - answered within 1 hour</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="col-lg-2 col-12">
                <div class="d-flex flex-column gap-3">
                    <div class="card bg-white p-2">
                        <div class="bg-secondary rounded w-100 mb-2" style="height: 200px;"></div>
                        <div class="bg-secondary-soft rounded my-1" style="height: 26px;"></div>
                        <div class="bg-secondary-soft rounded my-1" style="height: 26px;"></div>
                    </div>

                    <div class="card bg-white p-2">
                        <div class="bg-secondary rounded w-100 mb-2" style="height: 200px;"></div>
                        <div class="bg-secondary-soft rounded my-1" style="height: 26px;"></div>
                        <div class="bg-secondary-soft rounded my-1" style="height: 26px;"></div>
                    </div>
                </div>
            </div>-->
        </div>

    </div>
  </div>
</template>

<style>
</style>