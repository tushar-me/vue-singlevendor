<script>
import {defineComponent} from "vue";
import CustomerUser from "@/components/CustomerUser.vue";
import CatNav from "@/components/CatNav.vue";

export default defineComponent({
  components: {CatNav, CustomerUser}
})
</script>

<template>
  <CatNav :category="false" />
    <Section class="customer-section">
        <div class="container">

          <CustomerUser/>
            <div class="order-head">
                <RouterLink to="/customer/dashboard">
                    <i class="bi bi-arrow-left"></i>
                </RouterLink>
                <h3>Update Password</h3>
            </div>
            <div class="profile-info">
                <form>
                    <div class="mb-2">
                        <label for="current_password"><span class="text-danger me-1">*</span>Current Password</label>
                        <input type="text">
                    </div>
                    <div class="mb-2">
                        <label for="new_password"><span class="text-danger me-1">*</span>New Password</label>
                        <input type="text">
                    </div>
                    <div class="mb-2">
                        <label for="confirmed_password"><span class="text-danger me-1">*</span>Confirmed Password</label>
                        <input type="text">
                    </div>
                    <button class="primary-button mt-4">Update Password</button>
                </form>
            </div>
        </div>
    </Section>
</template>