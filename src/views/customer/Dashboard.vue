<script setup>
    import CustomerUser from "@/components/CustomerUser.vue";
    import { useAuthStore } from "@/stores/useAuthStore";
    import CatNav from "@/components/CatNav.vue";


    const authStore = useAuthStore();

</script>

<template>
  <CatNav :category="false" />
    <section class="dashboard customer-section">
        <div class="container">
            <CustomerUser/>

            <div class="row flex-wrap mt-5 dashboard-items">
                <div class="col-lg-3 col-md-6 col-12">
                    <RouterLink to="/customer/order" class="dashboard-items__box">
                        <div class="dashboard-items__box-icon">
                            <i class="bi bi-bag-check"></i>
                        </div>
                        <p class="dashboard-items__box-text text-capitalize">Orders</p>
                    </RouterLink>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <RouterLink to="/customer/profile" class="dashboard-items__box">
                        <div class="dashboard-items__box-icon">
                            <i class="bi bi-person"></i>
                        </div>
                        <p class="dashboard-items__box-text text-capitalize">Profile</p>
                    </RouterLink>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <RouterLink to="/customer/reset-password" class="dashboard-items__box">
                        <div class="dashboard-items__box-icon">
                            <i class="bi bi-shield-lock"></i>
                        </div>
                        <p class="dashboard-items__box-text text-capitalize">Password</p>
                    </RouterLink>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <RouterLink to="/customer/address" class="dashboard-items__box">
                        <div class="dashboard-items__box-icon">
                            <i class="bi bi-geo-alt"></i>
                        </div>
                        <p class="dashboard-items__box-text text-capitalize">Address</p>
                    </RouterLink>
                </div>
<!--                <div class="col-lg-3 col-md-6 col-12">-->
<!--                    <RouterLink to="/customer/wishlist" class="dashboard-items__box">-->
<!--                        <div class="dashboard-items__box-icon">-->
<!--                            <i class="bi bi-heart"></i>-->
<!--                        </div>-->
<!--                        <p class="dashboard-items__box-text text-capitalize">Wishlist</p>-->
<!--                    </RouterLink>-->
<!--                </div>-->
                <div class="col-lg-3 col-md-6 col-12">
                    <a href="javascript:void(0)" @click="authStore.logout" class="dashboard-items__box">
                        <div class="dashboard-items__box-icon">
                            <i class="bi bi-box-arrow-right"></i>
                        </div>
                        <p class="dashboard-items__box-text text-capitalize">Logout</p>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>