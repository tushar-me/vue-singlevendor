<template>
    <div class="dashboard-user mb-5">
        <div class="dashboard-user__icon">
            <i class="bi bi-person"></i>
        </div>
        <div>
            <p>Hello,</p>
            <h3 class="text-capitalize">{{ user?.full_name }}</h3>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/useAuthStore";

    const {user} = useAuthStore();
</script>

<style></style>