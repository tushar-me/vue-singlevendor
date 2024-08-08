<template>
    <footer class="footer border-top">
        <div class="container position-relative z-10">
            <div class="row justify-content-between g-0 py-2">
                <div class="col-xl-4 col-md-6 col-12 mb-3">
                    <div class="pe-md-5">
                        <div class="logo pb-3">
                            <img src="https://creativetechpark.com/wp-content/uploads/2021/09/Creative-Tech-Park-Website-Design-Company-in-Bangladesh-Logo.png" alt="Logo" />
                        </div>
                        <p class="mb-5">TOP ONE (CRO Registration # 742475) represents Sugandha Fashion & Stationery Limited CRO Registration # 759391
                          Top One committed to consumer to deliver super high quaity product affordable prices.
                        </p>
                        <div>
                            <ul class="list-unstyled d-flex align-items-center gap-3 mb-4 footer-socials">
                                <li>
                                    <a href="#" target="_blank">
                                        <i class="bi bi-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <i class="bi bi-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <i class="bi bi-pinterest"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <i class="bi bi-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank">
                                        <i class="bi bi-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


              <div class="col-xl-2 col-md-6" v-for="setting in settings">
                <div>
                  <h3 class="fw-semibold">{{ setting?.title }}</h3>
                  <ul>
                    <li v-for="page in setting?.pages">
                      <a :href="`/page/${page?.slug}`" class="footer-link">{{ page?.title }}</a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
        </div>
        <div class="py-5  d-block" style="background: #222836;">
            <div class="container">
              <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between mt-2">
                <p class="text-center text-lg-start">&copy; {{ new Date().getFullYear() }}
                  <RouterLink to='/' class="secondary-color">
                    Top One
                  </RouterLink>
                  All rights reserved.</p>
                <p class="text-center text-lg-start">
                  <a href="https://creativetechpark.com" target="_blank" class="secondary-color">Web Development Company </a>
                  Creative Tech Park.
                </p>
              </div>
            </div>
        </div>
    </footer>
</template>
<script setup>
import {onMounted, ref} from "vue";
import useAxios from "@/composables/useAxios.js";

const {sendRequest, loading, error} = useAxios();

const settings = ref([])

onMounted(async () => {
  const response = await sendRequest('/api/get-footer-settings');
  settings.value = response?.data;
})

</script>
