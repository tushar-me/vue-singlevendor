<script setup>
import CustomerUser from "@/components/CustomerUser.vue";
import CatNav from "@/components/CatNav.vue";
import {useWishListStore} from "@/stores/useWishListStore.js";
import {useCartStore} from "@/stores/useCartStore.js";


const wishListStore = useWishListStore();
wishListStore.initWishList();

const removeFormWishlist =(item) => {
  wishListStore.initWishList();
  wishListStore.removeFromWishList(item)
}

const cartStore = useCartStore();
// const addToCart = () => {
//   // console.log(data.value)
//   // console.log('selected', selectVarientProduct.value)
//
//   if(isNaN(selectVarientProduct.value?.totalPrice)){
//     cartStore.addToCart({data, selectSku:{sku:data.value.sku, price:data.value?.price, selectQty: buyQty.value}})
//   }else{
//     cartStore.addToCart({ data, selectSku: {...selectVarientProduct.value, selectQty: buyQty.value }})
//   }
// }

</script>

<template>
  <CatNav :category="false" />
    <section class="customer-section">
        <div class="container">
            <CustomerUser/>
            <div class="order-head">
                <RouterLink to="/customer/dashboard">
                    <i class="bi bi-arrow-left"></i>
                </RouterLink>
                <h3>My Wishlist</h3>
            </div>
            <div class="product-cart__items mb-0 pb-0">
                <div class="product-cart__items-item bg-white gap-2" v-for="item in  wishListStore?.getWishListItems">
                    <div class="left">
                        <img :src="`${$API_URL}/storage/uploads/${item?.images['0'].image}`" alt="Chair">
                    </div>
                    <div class="right">
                        <div class="d-flex flex-column justify-content-center">
                            <RouterLink :to="`/product-details/${item?.id}`" class="d-inline-block product-title mb-3">{{ item?.title}}</RouterLink>
                            <p><strong>Price</strong> ৳{{ item.price }}</p>
                        </div>
                
                        <div class="d-flex align-items-center justify-content-lg-around w-100">

                            <button @click="removeFormWishlist(item)" class="cancel-button">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
<!--            <div class="order-footer">-->
<!--                <nav aria-label="Page navigation example">-->
<!--                    <ul class="pagination">-->
<!--                        <li class="page-item">-->
<!--                            <a class="page-link" href="#" aria-label="Previous">-->
<!--                                <span aria-hidden="true">&laquo;</span>-->
<!--                            </a>-->
<!--                        </li>-->
<!--                        <li class="page-item"><a class="page-link" href="#">1</a></li>-->
<!--                        <li class="page-item"><a class="page-link" href="#">2</a></li>-->
<!--                        <li class="page-item"><a class="page-link" href="#">3</a></li>-->
<!--                        <li class="page-item">-->
<!--                            <a class="page-link" href="#" aria-label="Next">-->
<!--                                <span aria-hidden="true">&raquo;</span>-->
<!--                            </a>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </nav>-->
<!--            </div>-->
        </div>
    </section>
</template>