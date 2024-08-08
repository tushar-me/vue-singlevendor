<script setup>
    const {data} = defineProps({
        data:{
            type:Object,
            required:true
        }
    })
</script>

<template>
    <nav aria-label="breadcrumb" class="my-4">
        <ol class="breadcrumb">
          <RouterLink to="/" class="fs-4 secondary-color d-flex align-items-center gap-2">
            <i class="bi bi-house-door"></i>Home
          </RouterLink>
            <li class="breadcrumb-item active fs-4" aria-current="page">{{ data?.title }}</li>
        </ol>
    </nav>
</template>