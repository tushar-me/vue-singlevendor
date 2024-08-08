<script setup>

import { useCartStore } from "@/stores/useCartStore.js"
import { useAuthStore } from '@/stores/useAuthStore.js';
import CatNav from "@/components/CatNav.vue";
const cartStore = useCartStore();
const authStore = useAuthStore();



</script>

<template>
  <CatNav :category="false" />
    <section class="customer-section">
        <div class="product-cart container py-5">
<!--            <div class="d-flex align-items-center gap-2 py-8">-->
<!--                <img src="https://pdpone.syfpos.com/cs/groups/public/documents/et_imagetype/etimg063608.png" alt="..."-->
<!--                    style="width:70px;">-->
<!--                <p>Interest-free. $117/mo with 24-month financing.<RouterLink to="" class="text-danger fw-semibold"> Learn-->
<!--                        how</RouterLink>-->
<!--                </p>-->
<!--            </div>-->
            <div class="product-cart__head d-lg-flex align-items-center justify-content-between">
                <h2>Your Cart</h2>
                <div class="d-flex align-items-center gap-3 justify-content-between">
                    <div>
                        <p>Subtotal</p>
                        <h3>৳ {{ cartStore.getCartTotalPrice }}</h3>
                    </div>

                    <RouterLink v-if="authStore.isLoggedIn" to="/customer/checkout" class="secondary-button px-4 py-2">
                        <i class="bi bi-cart"></i> Check Out
                    </RouterLink>

                    <RouterLink v-else to="/login" class="secondary-button py-2 px-4">
                        <i class="bi bi-cart"></i> Check Out
                    </RouterLink>
                </div>
            </div>
            <div class="product-cart__items">
                <div class="product-cart__items-item bg-white" v-for="(item, i) in cartStore.getCartItems" :key="`cart-item-${i}`">
                    <div class="left">
                        <img :src="`${$API_URL}/storage/uploads/${item?.selectSku?.image ?? item?.data?.images[0]?.image}`"
                            alt="Chair">
                    </div>
                    <div class="right ms-3">
                        <div class="d-flex flex-column justify-content-center w-lg-50">
                            <RouterLink :to="`/product-details/${item?.data?.id}`"
                                class="d-inline-block product-title text-capitalize ">
                                <h2 class="text-start">
                                    {{ item?.data?.title+'-'+item?.selectSku?.varient?.replace(/\//g, '-').slice(0, -1).slice(0, 15) }}...
                                </h2>
                            </RouterLink>
                            <small v-if="item?.selectSku?.varient">Varient: {{ item?.selectSku?.varient?.replace(/\//g, '-').slice(0, -1) }}</small>
                            <p class="mb-1"><strong>Price</strong> ৳ {{ item.selectSku?.price }}</p>
                        </div>

                        <div class="d-lg-flex align-items-center gap-5">
                            <div>
                                <h3 class="card-title fw-semibold">
                                    Quantity
                                    <small class="fs-6 fw-normal text-capitalize">({{ item.selectSku?.qty }}
                                        Available)</small>
                                </h3>

                              <div class="quantity">
                                <button @click="cartStore.decrementQty(item?.selectSku?.id)">&mdash;</button>
                                <input type="text" :value="item.selectSku?.selectQty" readonly>
                                <button @click="cartStore.incrementQty(item?.selectSku?.id)">&#xff0b;</button>
                              </div>

<!--                                <div class="d-flex align-items-center">-->
<!--                                    <button class="btn btn-info"-->
<!--                                        @click="cartStore.decrementQty(item?.selectSku?.id)">-</button>-->
<!--                                    <input class="form-control founded-0" min="1" :value="item.selectSku?.selectQty">-->
<!--                                    <button class="btn btn-info"-->
<!--                                        @click="cartStore.incrementQty(item?.selectSku?.id)">+</button>-->
<!--                                </div>-->
                            </div>

                            <p>৳ {{ item.selectSku?.price * item.selectSku?.selectQty }}</p>
                            <button @click="cartStore.removeFromCart(item)" class="cancel-button">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-cart__footer border-top pt-5">
                <div class="d-flex align-items-center justify-content-between py-3">
                    <p class="fs-3 fw-medium text-capitalize">Subtotal</p>
                    <p class="fs-3 fw-medium">৳ {{ cartStore.getCartTotalPrice }}</p>
                </div>
                <p class="text-secondary mb-3">Taxes and shipping calculated at checkout</p>

                <RouterLink v-if="authStore.isLoggedIn" to="/customer/checkout" class="secondary-button py-2 px-4">
                    <i class="bi bi-cart"></i> Check Out
                </RouterLink>

                <RouterLink v-else to="/login" class="secondary-button py-2 px-4">
                    <i class="bi bi-cart"></i> Check Out
                </RouterLink>

                <div class="d-flex justify-content-center mt-8">
                    <RouterLink to="/" class="text-dark fs-4 d-flex align-items-center gap-2">
                        Continue Shopping <i class="bi bi-arrow-right"></i>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.quantity {
  border: 1px solid #C1CDDD;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    border: 0;
    max-width: 70px;
    min-width: 70;
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