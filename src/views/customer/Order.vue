<script setup>
import useAxios from "@/composables/useAxios";
import { useAuthStore } from "@/stores/useAuthStore";
import { onMounted, ref } from "vue";
import CustomerUser from "@/components/CustomerUser.vue";
import CatNav from "@/components/CatNav.vue";
const { sendRequest, loading, error } = useAxios();
const orderrs = ref(null);

onMounted(async () => {
  const { user } = useAuthStore();
  const data = await sendRequest({
    method: 'get',
    url: "/api/my-orders",
    headers: {
      "Authorization": `Bearer ${user?.token}`
    }
  })
  orderrs.value = data?.data?.data;
  console.log(data)
})

</script>
<template>
  <CatNav :category="false" />
  <section class="customer-section">
    <div class="container">
        <CustomerUser/>
      <div class="order py-5">
        <div class="order-head">
          <RouterLink to="/customer/dashboard">
            <i class="bi bi-arrow-left"></i>
          </RouterLink>
          <h3>Order History</h3>
        </div>
        <div class="order-items row flex-column gap-5 mt-4">
          <template v-if="orderrs?.length">
            <div class="order-items__item" v-for="(item, i) in  orderrs" :key="`single-order-${i}`">
              <div class="order-items__item-head border-bottom">
                <div>
                  <h3 class="text-capitalize fs-3 fw-semibold">Order #{{ item.id }}</h3>
                  <p>Order Date: {{ item.order_date }}</p>
                </div>
                <p class="pending">
                  <i class="bi bi-check2-circle"></i> Pending
                </p>
              </div>
              <div class="order-items__item-body">
                <div class="thumbnail m-lg-4">
                  <img v-if="item?.orderdetails[0]?.product?.images[0]" :src="`${$API_URL}/storage/uploads/${item?.orderdetails[0]?.product?.images[0]?.image}`"
                       class="rounded-md"
                       alt="">
                </div>
                <div class="d-lg-flex justify-content-between align-items-center w-100">
                  <div class="w-lg-50">
                    <h3 class="title">
                      {{ item?.orderdetails[0]?.product?.title }}
                    </h3>
                    <p>+ {{ item?.orderdetails ? item?.orderdetails.length : ' ' }} item(s)</p>
                    <strong>Variations:</strong> {{ item?.orderdetails[0]?.stoke?.varient }}
                  </div>
                  <p class="fw-semibold fs-3">৳ {{ item?.grand_total }}</p>
                  <div>
                    <RouterLink :to="{name: 'orderInvoice', params:{id:item?.id}}" class="secondary-button px-3 d-inline-block mt-2">View</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <h2 v-else-if="loading">Loading.......</h2>
          <h2 v-else>No Orders Found...</h2>
        </div>

<!--        <div class="order-footer" v-if="orderrs?.data?.length">-->
<!--          <nav aria-label="Page navigation example">-->
<!--            <ul class="pagination">-->
<!--              <li class="page-item">-->
<!--                <a class="page-link" href="#" aria-label="Previous">-->
<!--                  <span aria-hidden="true">&laquo;</span>-->
<!--                </a>-->
<!--              </li>-->
<!--              <li class="page-item"><a class="page-link" href="#">1</a></li>-->
<!--              <li class="page-item"><a class="page-link" href="#">2</a></li>-->
<!--              <li class="page-item"><a class="page-link" href="#">3</a></li>-->
<!--              <li class="page-item">-->
<!--                <a class="page-link" href="#" aria-label="Next">-->
<!--                  <span aria-hidden="true">&raquo;</span>-->
<!--                </a>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </nav>-->
<!--        </div>-->
      </div>
    </div>
  </section>
</template>