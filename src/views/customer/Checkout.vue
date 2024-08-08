<script setup>
import {onMounted, ref} from 'vue';
import {useCartStore} from "@/stores/useCartStore.js";
import useAxios from "@/composables/useAxios.js"
import {useAuthStore} from "@/stores/useAuthStore.js";
import {useRouter, useRoute} from "vue-router"

const cartStore = useCartStore();
const {loading, error, sendRequest} = useAxios();
const router = useRouter()
const route = useRoute();

const deliveryCharg = ref({
  setDeliveryAddress: false,
  setDesiveryCharge: 0,
  addressId: null,
})

const addresses = ref(null);

const checkoutData = ref(null);
const setDeliveryAddress = (event) => {
  deliveryCharg.value.setDeliveryAddress = true;
  deliveryCharg.value.setDesiveryCharge = event.order_area?.delivery_charge;
  deliveryCharg.value.addressId = event.id
}

const payment = () => {
  if (deliveryCharg.value.setDeliveryAddress) {
    router.push({
      name: "payment",
      query: {
        addressId: deliveryCharg.value.addressId
      }
    })
  } else {
    $toast.error("Please Select Your Delivery Address...")
  }
}


const newAddress = ref(false)
const actionToggle = ref(false)
const authStore = useAuthStore();


const addressFrom = ref({
  title: null,
  email: null,
  phone: null,
  address: null,
  area: null,
  state: null,
  zip_code: null,
})


const saveAddress = async () => {
  const data = await sendRequest({
    method: 'post',
    data: {user_id: authStore?.user?.id, ...addressFrom.value},
    url: "/api/save-new-address",
  })

  if (data !== undefined) {
    newAddress.value = false;
    $toast.success('Address Added')
    await getAddresses()
  }
}

const areas = ref(null)
const orderAreas = ref(null)

const getMyAddresses = async () => {
  const token = await authStore.getToken();
  const data = await sendRequest({
    method: 'get',
    url: "/api/address",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  areas.value = data?.data?.addresses
}

onMounted(async () => {
  await getMyAddresses();
  const getAreas = await sendRequest({
    method: 'get',
    url: "/api/all-areas"
  })
  orderAreas.value = getAreas?.data
})
const getAddresses = async () => {
  const token = await authStore.getToken();
  const data = await sendRequest({
    method: 'get',
    url: "/api/address",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  addresses.value = data?.data?.addresses
}

onMounted(async () => {

  await getAddresses()
  if (route.query.invalidAddressId) {
    $toast.error("Please Select Your Shipping Details Before Payment.")
  }
})

</script>

<template>
  <section class="checkout">
    <div class="container-fluid my-5">
      <div class="row">
        <div class="col-lg-7 col-12">
          <div class="checkout__shipping-add">
            <h3>Shipping Address</h3>
            <div class="d-flex flex-wrap created-address">
              <div class="col-md-6 col-12 pe-2 mb-3" v-for="(address, i) in addresses" :key="`add-${i}`">
                <!-- Home Address -->
                <input type="radio" name="address" :id="`add-${i}`" @input="setDeliveryAddress(address)"
                       :value="i" class="address-radio address-radio--one">
                <!-- when set default enabled -->
                <!-- :checked="address?.set_default" -->
                <label :for="`add-${i}`" role="button" class="w-100 h-100">
                  <h3>{{ address?.title }}</h3>
                  <div>
                    <p class="mb-2">{{ address?.address }}</p>
                    <p>{{ address?.email }}</p>
                    <p class="mb-2">{{ address?.phone }}</p>
                    <p>Area: {{ address?.order_area?.area_name }} & Delivery Charge:
                      {{ address?.order_area?.delivery_charge }} ৳</p>
                  </div>
                </label>
              </div>

              <div class="col-md-6 col-12 pe-2">
                <button class="add-new-add m-0" v-show="!newAddress" @click="newAddress = true">
                  <div class="d-flex flex-column align-items-center">
                    <i class="bi bi-plus"></i>
                    Add New Address
                  </div>
                </button>
              </div>
            </div>
            <div v-if="newAddress" class="checkout__shipping-add-wrapper">
              <div class="checkout__shipping-add-wrapper-new">
                <h3>New Address</h3>
                <form @submit.prevent="saveAddress">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Full Name"
                           v-model="addressFrom.title">
                    <label for="floatingInput">Full Name</label>
                    <small class="text-danger" v-if="error?.response?.data?.errors?.title">{{
                        error?.response?.data?.errors?.title[0]
                      }}</small>
                  </div>

                  <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Address"
                           v-model="addressFrom.address">
                    <label for="floatingInput">Address</label>
                    <small class="text-danger" v-if="error?.response?.data?.errors?.address">{{
                        error?.response?.data?.errors?.address[0]
                      }}</small>
                  </div>

                  <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="email"
                           v-model="addressFrom.email">
                    <label for="floatingInput">Email</label>
                    <small class="text-danger" v-if="error?.response?.data?.errors?.email">{{
                        error?.response?.data?.errors?.email[0]
                      }}</small>
                  </div>
                  <div class="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
                    <select v-model="addressFrom.area" class="form-select"
                            aria-label="Default select example">
                      <option value="null" selected disabled>Add New City</option>
                      <option v-for="area in orderAreas" :key="`single-i-${area.id}`" :value="area.id">
                        {{ area?.area_name }}
                      </option>
                    </select>
                    <div class="form-floating">
                      <input type="text" class="form-control" id="floatingInput" placeholder="State"
                             v-model="addressFrom.state">
                      <label for="floatingInput">State</label>
                    </div>
                    <div class="form-floating">
                      <input type="text" class="form-control" id="floatingInput"
                             placeholder="ZIP Code" v-model="addressFrom.zip_code">
                      <label for="floatingInput">ZIP Code</label>
                    </div>
                  </div>
                  <small class="text-danger"
                         v-if="error?.response?.data?.errors?.area">{{ error?.response?.data?.errors?.area[0] }}</small>
                  <div>
                    <div class="form-floating">
                      <input type="text" class="form-control" id="floatingInput"
                             placeholder="Phone Number" v-model="addressFrom.phone">
                      <label for="floatingInput">Phone Number</label>
                      <small class="text-danger" v-if="error?.response?.data?.errors?.phone">{{
                          error?.response?.data?.errors?.phone[0]
                        }}</small>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-end gap-3">

                    <button v-if="loading" class="primary-button" :disabled="authStore.loading">
                      <div class="spinner-border fs-3" role="status">
                        <span class="visually-hidden ">Loading...</span>
                      </div>
                    </button>

                    <div v-else class="d-flex align-items-center justify-content-end gap-3">
                      <button class="primary-button" type="submit">Save</button>
                      <button class="secondary-button" @click="newAddress = !newAddress">Close</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-12">
          <div class="row flex-column gap-3">
            <div class="col-12">
              <div class="checkout__product">
                <div class="checkout__product-items">
                  <div class="checkout__product-items__item" v-for="(item, i) in cartStore.getCartItems"
                       :key="`cart-item-${i}`">
                    <div class="d-flex align-items-center">

                      <img
                          :src="`${$API_URL}/storage/uploads/${item?.selectSku?.image ?? item?.data?.images[0]?.image}`"
                          style="width: 70px;height: auto;" alt="Chair">

                      <div class="pe-2">
                        <p>{{ item?.data?.title && item?.data?.title?.length > 25 ? item?.data?.title?.slice(0, 15)+'...' : item?.data?.title }}</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center justify-content-between w-50 ps-5">
                      <div>
                        <p>Qty: {{ item.selectSku?.selectQty }}</p>
                      </div>
                      <div>{{ item.selectSku?.price * item.selectSku?.selectQty }} ৳</div>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="pt-3 text-end fw-bold">{{ cartStore.getCartLength }} Items. Subtotal: <span
                      class="text-info">{{ cartStore.getCartTotalPrice }} ৳</span></p>
                </div>
              </div>
            </div>

            <div class="col-12">
              <div class="checkout__payment">
                <p class="text-dark fw-semibold fs-3">Order Summary</p>
                <ul>
                  <li>
                    <span>Items Total</span>
                    <span>{{ cartStore.getCartTotalPrice }} ৳</span>
                  </li>
                  <li>
                    <span>Delivery Fee</span>
                    <span>{{ deliveryCharg?.setDesiveryCharge }} ৳</span>
                  </li>
                  <li class="border-top border-2">
                    <strong>Total Payment</strong>
                    <strong>{{ parseInt(cartStore.getCartTotalPrice) + parseInt(deliveryCharg?.setDesiveryCharge) }} ৳</strong>
                  </li>
                </ul>
                <button @click="payment" class="primary-button text-center">Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>