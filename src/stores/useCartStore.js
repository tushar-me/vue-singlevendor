import { defineStore } from "pinia";


export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: []
    }),

    actions: {
        addToCart(product) {
            console.log(product)
            this.initCart();
            const index = this.cart.findIndex(item => {
                return item?.selectSku.sku === product?.selectSku.sku
            });

            if (index > -1) {
                this.cart[index].selectSku.selectQty = product?.selectSku?.selectQty;
            } else {
                this.cart.push(product);
            }
            this.setInLocalStorage();
            $toast.info("Added To Cart...")
        },
        removeFromCart(item) {
            const index = this.cart.indexOf(item);
            if (index > -1) {
                this.cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(this.cart));
            }
            
            $toast.info("Remove From Cart...")
        },
        incrementQty(id) {
            const index = this.cart.findIndex(item => {
                return item?.selectSku.id === id
            });
            this.cart[index].selectSku.selectQty++;
            this.setInLocalStorage();
            $toast.info("Quantity Updated...")
        },
        decrementQty(id) {

            const index = this.cart.findIndex(item => {
                return item?.selectSku.id === id
            });

            if (this.cart[index].selectSku.selectQty > 1) {
                this.cart[index].selectSku.selectQty--;
            }

            // if you want to remove this product if qty 0
            // if (this.cart[itemIndex].quantity <= 0) {
            //     this.removeFromCart(this.cart[itemIndex]);
            // }

            this.setInLocalStorage();
            $toast.info("Quantity Updated...")
        },
        setInLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        initCart() {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                this.cart = JSON.parse(storedCart);
            }
        },
        clearCart() {
            this.cart = [];
            localStorage.removeItem("cart");
            this.initCart();
        }
    },

    getters: {
        getCartLength() {
            return this.cart.length;
        },
        getCartItems() {
            return this.cart;
        },
        getCartTotalPrice() {
            return this.cart.reduce((total, item) => total + item.selectSku?.price * item.selectSku?.selectQty, 0)
        }
    }

})
