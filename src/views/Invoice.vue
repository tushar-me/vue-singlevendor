<script setup>
import useAxios from "@/composables/useAxios";
import { useAuthStore } from "@/stores/useAuthStore";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const order = ref(null)
const { sendRequest, loading, error } = useAxios();


const printInvoice = (areaID) =>{
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

onMounted(async () => {
    const route = useRoute();

    const { user } = useAuthStore();
    const data = await sendRequest({
        method: 'get',
        url: `/api/order-details/${route?.params?.id}`,
        headers: {
            "Authorization": `Bearer ${user?.token}`
        }
    })
    order.value = data?.data;
    console.log(data)
})


</script>

<template>
    <section class="customer-section overflow-hidden py-5">
            <button class="btn bg-info text-white" @click="printInvoice('areaOfPrient')">Print Invoice</button>
            <div class="row">
                <div class="col-md-9 mx-auto p-3" id="areaOfPrient">
                    <div class="card invoice-preview-card shadow-none py-5" >
                        <div class="card-body invoice-padding pb-0 mb-5">
                            <div class="d-flex align-items-center justify-content-between">
                                <div style="text-align:left; max-width: 35%">
                                    <div>
                                        <div class="logo-wrapper mb-5">
                                            <img src="https://creativetechpark.com/wp-content/uploads/2021/09/Creative-Tech-Park-Website-Design-Company-in-Bangladesh-Logo.png" alt="" height="40">
                                        </div>
                                        <h3 class="mt-1 fw-semibold fs-3 mb-3 text-capitalize">Invoice To: </h3>
                                        <p class="card-text mb-0 pb-0" v-if="order?.customer?.full_name">Name: <strong>{{ order?.customer?.full_name }}</strong></p>
                                        <p class="card-text mb-0 pb-0" v-if="order?.address?.phone">Phone: {{ order?.address?.phone }}</p>
                                        <p class="card-text mb-0 pb-0" v-if="order?.address?.email">Email: {{ order?.address?.email }}</p>
                                        <p class="card-text mb-0 pb-0" v-if="order?.address?.address">Address: {{ order?.address?.address }}</p>
                                    </div>
                                </div>
                                <div style="text-align: right">
                                    <div class="mt-md-0 mt-2">
                                        <h4 class="invoice-title">
                                            Invoice
                                            <span class="invoice-number">#5433</span>
                                        </h4>
                                        <div class="invoice-date-wrapper">
                                            <p class="invoice-date-title">Order Date: {{ order?.order_date }}</p>
                                        </div>
                                        <div class="invoice-date-wrapper">
                                            <p class="invoice-date-title text-capitalize">Order Status: <span
                                                    class="badge bg-info ms-1">{{ order?.order_status}}</span></p>
                                        </div>
                                        <div class="invoice-date-wrapper">
                                            <p class="invoice-date-title text-capitalize">Payment Status: <span
                                                    class="badge bg-info ms-1">{{ order?.payment_status }}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="invoice-spacing" />

                        <!-- Invoice Description starts -->
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="py-1" width="40%">Product Name</th>
                                        <th class="py-1">Price</th>
                                        <th class="py-1">size & Qty</th>
                                        <th class="py-1">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in  order?.orderdetails" :key="`single-details-item-${index}`">
                                        <td class="py-1">
                                            <a href="#" class="text-info text-capitalize">
                                                {{ item?.product?.title+"-"+item?.stoke?.varient?.replace(/\//g, '-').slice(0, -1).slice(0, 20) }}...
                                            </a>
                                        </td>
                                        <td class="py-1">
                                            <span class="fw-bold">{{ item?.stoke?.price ?? item?.product?.price }} ৳</span>
                                        </td>
                                        <td class="py-1">
                                            <span class="fw-bold">
                                                {{ item?.quantity }}
                                            </span>
                                        </td>
                                        <td class="py-1">
                                            <span class="fw-bold">
                                                {{ parseInt(item?.stoke?.price ?? item?.product?.price) * parseInt(item?.quantity) }} ৳
                                            </span> <!-- {{ $showPrice(item.product.price * item.quantity) }} --> 
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr>

                        <div class="card-body invoice-padding pb-0">
                            <div class="row invoice-sales-total-wrapper">
                                <div class="col-md-8 order-md-1 order-2 mt-md-0 mt-3">

                                </div>
                                <div class="col-md-4 d-flex justify-content-end order-md-2 order-1">
                                    <div class="invoice-total-wrapper w-100">
                                        <div class="invoice-total-item d-flex justify-content-between">
                                            <p class="invoice-total-title">Subtotal:</p>
                                            <p class="invoice-total-amount">{{ order?.sub_total }} ৳</p>
                                        </div>
                                        <!-- <div class="invoice-total-item d-flex justify-content-between"
                                            v-if="order?.coupon_discount">
                                            <p class="invoice-total-title">Coupon Discount:</p>
                                            <p class="invoice-total-amount"> - {{ $showPrice(order?.coupon_discount) }}</p>
                                        </div> -->
                                        <div class="invoice-total-item d-flex justify-content-between">
                                            <p class="invoice-total-title">Delivery Charge:</p>
                                            <p class="invoice-total-amount"> + {{ order?.address?.order_area?.delivery_charge }} ৳</p>
                                        </div>


                                        <hr class="my-50" />
                                        <div class="invoice-total-item d-flex justify-content-between">
                                            <p class="invoice-total-title text-black fw-bolder">Grand Total:</p>
                                            <p class="invoice-total-amount text-black fw-bolder">{{ order?.grand_total }} ৳</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Invoice Description ends -->

                        <hr class="invoice-spacing" />

                        <!-- Invoice Note starts -->
                        <div class="card-body invoice-padding pt-0">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <span class="fw-bold me-1">Have a great day ! </span>
                                </div>
                            </div>
                        </div>
                        <!-- Invoice Note ends -->
                    </div>
                </div>
            </div>
        </section>
</template>

<style lang="sass">

</style>