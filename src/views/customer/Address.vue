<script setup>
import { onMounted, ref } from "vue"
import useAxios from "@/composables/useAxios"
const { loading, error, sendRequest } = useAxios();
import { useAuthStore } from "@/stores/useAuthStore";
import CatNav from "@/components/CatNav.vue";

const modal = ref(false)
const authStore = useAuthStore();

const addressFrom = ref({
  title:'Home',
  email:null,
  phone: null,
  address: null,
  area: null,
})


const saveAddress = async () => {
  if(addressFrom.value.address === null) {
    $toast.error("Address field is required");
  }
  else if(addressFrom.value.area === null) {
    $toast.error("Area field is required");
  }
  else {
    const data = await sendRequest({
      method: 'post',
      data: {user_id: authStore?.user?.id, ...addressFrom.value},
      url: "/api/save-new-address",
    })
    await getMyAddresses()
    modal.value = true;
    resetForm();
  }
}
const resetForm = () => {
  addressFrom.value.title = "Home",
  addressFrom.value.address= null,
  addressFrom.value.area = null
  addressFrom.value.email = null
  addressFrom.value.phone = null
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
</script>

<template>
  <CatNav :category="false" />
  <section class="customer-section">
    <div class="container">
      <div class="dashboard-user mb-5">
        <div class="dashboard-user__icon">
          <i class="bi bi-person"></i>
        </div>
        <div>
          <p>Hello,</p>
          <h3 class="text-capitalize">{{authStore?.user?.full_name}}</h3>
        </div>
      </div>
      <div class="address">
        <div class="order-head justify-content-between mb-4">
          <div class="d-flex align-items-center gap-2">
            <RouterLink to="/customer/dashboard">
              <i class="bi bi-arrow-left"></i>
            </RouterLink>
            <h3>Address Book</h3>
          </div>
          <button  type="button" class="secondary-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="d-flex align-items-center">
              <i class="bi bi-plus text-white"></i>
              Add New Address
            </div>
          </button>
        </div>
        <div class="checkout__shipping-add bg-transparent p-0">
          <div class="d-flex flex-wrap created-address">
            <div class="col-md-6 col-12 p-3" v-for="address in areas" :key="`area-${address.id}`">
              <!-- Home Address -->
              <label for="add-1" class="w-100 p-5">
                <h3>{{ address?.title }}</h3>
                <div>
                  <p class="mb-2">{{ address?.address }}</p>
                  <p>{{ address?.email }}</p>
                  <p class="mb-2">{{ address?.phone }}</p>
                  <p>Area: {{ address?.order_area?.area_name }} & Delivery Charge: {{
                      address?.order_area?.delivery_charge }} ৳</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Address</h3>
          <button type="button"  data-bs-dismiss="modal" aria-label="Close">
            <i class="bi bi-x-lg secondary-color fs-3"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveAddress" class="d-flex flex-column gap-3">
            <div class="d-flex align-items-center gap-2">
              <div>
                <input type="radio" id="home" name="address" value="Home" checked hidden v-model="addressFrom.title">
                <label for="home" class="text-uppercase address-label">Home</label>
              </div>
              <div>
                <input type="radio" id="office" name="address" value="Office" hidden v-model="addressFrom.title">
                <label for="office" class="text-uppercase address-label">Office</label>
              </div>
            </div>

            <div class="">
              <textarea
                  rows="4"
                  type="text"
                  placeholder="Address"
                  class="w-100 rounded secondary-border  p-2"
                  v-model="addressFrom.address">

              </textarea>

            </div>
            <div class="w-100">
              <select v-model="addressFrom.area" class=" rounded p-2 w-100 secondary-border">
                <option value="null" selected disabled>Select Area</option>
                <option  v-for="area in orderAreas" :key="`single-i-${area.id}`" :value="area.id">{{ area?.area_name }}</option>
              </select>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <div class="w-100 w-lg-50 pe-2">
                <input
                    type="email"
                    placeholder="email"
                    v-model="addressFrom.email"
                    class="rounded p-2 secondary-border w-100"
                >
              </div>
              <div class="w-100 w-lg-50 ps-2">
                <input type="text"
                       placeholder="Phone Number"
                       v-model="addressFrom.phone"
                       class="rounded p-2 secondary-border w-100"
                >
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-end gap-3 mt-4">
              <button class="secondary-button rounded-0 border-0" type="reset" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
              <button class="secondary-button text-uppercase px-5" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.address-label {
padding: 6px 18px;
  border-radius:4px;
  background: #fff;
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
input[type="radio"]:checked + label.address-label {
  background-image: linear-gradient(to right, #667eea, #764ba2, #6B8DD6, #8E37D7);
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
  color: #fff;
  background-size: 300% 100%;
}
</style>
