<script setup>


import {ref} from "vue";
import useAxios from "@/composables/useAxios.js";
import {useRoute, useRouter} from "vue-router";

const {sendRequest, loading, error} = useAxios();
const router = useRouter();
const regData = ref({
  name:null,
  email:null,
  password:null
})


const handelRegistration = async () => {
  const data =await sendRequest({
    url:'/api/register',
    method:"POST",
    data:regData.value
  })
  if(data){
    $toast.success('Registration Successfully Done...')
    await router.push({name: "login"})
  }
  // return useRouter().push({name:"login"})

}


</script>

<template>
  <section>
    <div class="container-fluid">
      <div class="d-flex align-items-center justify-content-center">
        <div class="form mt-8">
          <h3>Registration</h3>
          <div class="form__content">
            <small v-if="error?.response?.data?.message" class="text-danger">{{ error?.response?.data?.message }}</small>
            <form @submit.prevent="handelRegistration">
              <input type="text" placeholder="Full Name" v-model="regData.name">
              <small v-if="error?.response?.data?.errors?.name" class="text-danger">{{ error?.response?.data?.errors?.name[0] }}</small>
              <input type="email" placeholder="Email" v-model="regData.email">
              <small v-if="error?.response?.data?.errors?.email" class="text-danger">{{ error?.response?.data?.errors?.email[0] }}</small>
              <input type="password" placeholder="Password" v-model="regData.password">
              <small v-if="error?.response?.data?.errors?.password" class="text-danger">{{ error?.response?.data?.errors?.password[0] }}</small>

              <button v-if="loading" type="submit" class="primary-button mt-3" :disabled="loading">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
              <button v-else type="submit" class="primary-button mt-3">Sign up</button>

            </form>
            <div class="d-flex align-items-center gap-2 py-3">
              <span>Already have Account?</span>
              <RouterLink to="/login" class="text-info">Login</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>