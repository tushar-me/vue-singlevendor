<template>
    <div class="col mb-3 px-2">
        <div class="product-card card">
            <RouterLink :to="`/product-details/${info?.id}`" class="product-card__thumbnail">
              <img :src="`${$API_URL}/storage/uploads/${info?.images?.[0]?.image}`" alt="" class="card-img-top" />
              <RouterLink :to="`/product-details/${info?.id}`" class="view-detail">View Detail</RouterLink>
            </RouterLink>
              <div class="product-card__body card-body d-flex flex-column justify-content-between">
                  <RouterLink :to="`/product-details/${info?.id}`" class="product-card__body-title mb-3">{{ info.title.length > 20 ? info.title.slice(0, 38)+'...' : info.title }}</RouterLink>
                <p>{{ showpiece }}</p>
              </div>
        </div>
    </div>

</template>

<script setup>
  import {computed} from "vue"
    const {info} = defineProps({
        info:{
            type:Object,
            default:{},
            required:false,
        }
    })
    const showpiece = computed(()=>{
      if(info?.stocks?.length > 0){
        const freestPrice = info?.stocks?.[0]?.price
        const lastPrice = info?.stocks?.[info?.stocks?.length - 1]?.price
        return freestPrice > lastPrice ? lastPrice+'৳'+'   -    '+freestPrice+"৳" : freestPrice+"৳"+'-'+lastPrice+"৳"
      }
    })

</script>

<style lang="scss" scoped>
    .card {
        &:hover {
            .card-btns {
                opacity: 1;
                transition: all ease-in-out 0.4s;
            }
        }
    }
    .card-btns {
        opacity: 0;
        transition: all ease-in-out 0.4s;
    }

    
</style>
