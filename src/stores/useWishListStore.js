import {defineStore} from "pinia";


export const useWishListStore = defineStore('wishList',{

    state: () => ({
        wishList:[]
    }),

    actions:{
        addToWishList(product){
            this.wishList.push(product);
            this.setInLocalStorage();
            $toast.info("Added To WishList")
        },
        removeFromWishList(item) {
            let index = this.wishList.findIndex(obj => obj.id === item.id);
            console.log(index);
            if (index > -1) {
                this.wishList.splice(index, 1);
                localStorage.setItem('wishList', JSON.stringify(this.wishList));
            }
        },
        setInLocalStorage(){
            localStorage.setItem('wishList', JSON.stringify(this.wishList));
        },
        initWishList() {
            const storedWishList = localStorage.getItem('wishList');
            if (storedWishList) {
                this.wishList = JSON.parse(storedWishList);
            }
        },
        clearWishList(){
            this.items = [];
            localStorage.removeItem("wishList");
        }
    },

    getters:{
        getWishListLength(){
            return this.wishList.length;
        },
        getWishListItems(){
            return this.wishList;
        },
    }

})