<script setup>
import CatNav from "@/components/CatNav.vue";
</script>

<template>
  <CatNav :category="false" />
    <section>

        <div class="container-fluid">
            <div class="contact mt-5">
                <div class="icon-box">
                    <div class="icon">
                        <span>
                            <i class="bi bi-telephone"></i>
                        </span>
                    </div>
                    <div class="text">
                        <h4>Our Customer Care Team is ready to answer your questions</h4>
                        <p>Monday - Friday 7 am to 3:30 pm PT.</p>
                        <a href="tel:8005728">Call Us - 800.222.5728</a>
                    </div>
                </div>
                <div class="contact-form">
                    <h3>Contact Us</h3>
                    <form>
                        <div>
                            <input type="text" placeholder="Name" id="name" v-model="name">
                            <input type="email" placeholder="Email" id="email" v-model="email">
                        </div>
                        <div>
                            <input type="text" placeholder="Phone Number" id="phone" v-model="phone">
                        </div>
                        <div>
                            <textarea id="message" v-model="message" placeholder="Message"></textarea>
                        </div>
                        <button type="submit" class="primary-button">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>