<script setup>

import { computed, onMounted } from "vue";

const props = defineProps({
    order: Object | null,
    url: [] | null,
})

onMounted(() => {
    window.print();
})

</script>

<template>
    <section class="customer-section overflow-hidden py-5">
            <div class="row">
                <div class="col-md-9 mx-auto p-3">
                    <div class="card invoice-preview-card shadow-none py-5">
                        <div class="card-body invoice-padding pb-0 mb-5">
                            <div class="d-flex align-items-center justify-content-between">
                                <div style="text-align:left; max-width: 35%">
                                    <div>
                                        <div class="logo-wrapper mb-5">
                                            <img src="/logo.png" alt="" height="40">
                                        </div>
                                        <h3 class="mt-1 fw-semibold fs-3 mb-3 text-capitalize">Invoice To: </h3>
                                        <p class="card-text mb-0 pb-0">Name: <strong>Customer name</strong></p>
                                        <p class="card-text mb-0 pb-0">Phone: 8999 000 88</p>
                                        <p class="card-text mb-0 pb-0">Email: customer@gmail.com</p>
                                        <p class="card-text mb-0 pb-0">Address: Dhaka,Bangladesh</p>

                                    </div>
                                </div>
                                <div style="text-align: right">
                                    <div class="mt-md-0 mt-2">
                                        <h4 class="invoice-title">
                                            Invoice
                                            <span class="invoice-number">#5433</span>
                                        </h4>
                                        <div class="invoice-date-wrapper">
                                            <p class="invoice-date-title">Order Date: 2-1-2024</p>
                                        </div>
                                        <div class="invoice-date-wrapper">
                                            <p class="invoice-date-title text-capitalize">Order Status: <span
                                                    class="badge bg-info ms-1">Shipped</span></p>
                                        </div>
                                        <div class="invoice-date-wrapper">
                                            <p class="invoice-date-title text-capitalize">Payment Status: <span
                                                    class="badge bg-info ms-1">Pending</span></p>
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
                                    <tr > <!-- v-for="(item, index) in  order.order_details -->
                                        <td class="py-1">
                                            <a href="#" class="text-info">
                                                <!-- {{ item.product.title }} -->
                                                Mid Back Ultimate Executive Office Chair
                                            </a>
                                        </td>
                                        <td class="py-1">
                                            <span class="fw-bold"> 8000</span>
                                        </td>
                                        <td class="py-1">
                                            <span class="fw-bold">%ft</span> * <span>3</span>
                                        </td>
                                        <td class="py-1">
                                            <span class="fw-bold">8000</span> <!-- {{ $showPrice(item.product.price * item.quantity) }} --> 
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
                                            <p class="invoice-total-amount">8000</p>
                                        </div>
                                        <div class="invoice-total-item d-flex justify-content-between"
                                            v-if="order?.coupon_discount">
                                            <p class="invoice-total-title">Coupon Discount:</p>
                                            <p class="invoice-total-amount"> - {{ $showPrice(order?.coupon_discount) }}</p>
                                        </div>
                                        <div class="invoice-total-item d-flex justify-content-between">
                                            <p class="invoice-total-title">Delivery Charge:</p>
                                            <p class="invoice-total-amount"> + 300</p>
                                        </div>


                                        <hr class="my-50" />
                                        <div class="invoice-total-item d-flex justify-content-between">
                                            <p class="invoice-total-title text-black fw-bolder">Total:</p>
                                            <p class="invoice-total-amount text-black fw-bolder">1000</p>
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
                                    <span>Thank you for shopping 
                                        <a href="www.comfortwings.com"> www.comfortwings.com</a>
                                    </span>
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