<script setup>

</script>

<template>
    <!-- Product Review Head -->
    <div class="product-review border-top border-bottom pb-7">
        <div class="product-review__head py-4">
            <div class="d-flex align-items-center justify-content-center gap-1">
                <span class="star-rating text-secondary fs-2 fw-semibold">5.0</span>
                <span class="stars text-dark fs-3">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                </span>
                <span class="fs-4 text-dark">2 Reviews</span>
            </div>
        </div>
        <!-- Product Review & Question -->
        <div>
            <ul class="nav nav-pills mb-3 border-bottom d-flex align-items-center gap-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Reviews</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Questions</button>
                </li>
            </ul>
        </div>
        <div class="mt-5">
            <div class="review-question-tab">
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <div class="product-review__form">
                                    <form>
                                        <h2 class="fw-normal text-uppercase fs-3">WRITE A REVIEW</h2>
                                        <p class="text-secondary fs-4"><span class="text-danger me-1">*</span>Indicates a required field</p>
                                        <div class="d-flex flex-column my-4">
                                            <label class="text-secondary fs-4"><span class="text-danger">*</span>Score:</label>
                                            <span>
                                                Stars....
                                            </span>
                                        </div>
                                        <div class="d-flex flex-column my-4">
                                            <label for="review_title" class="mb-2"><span class="text-danger me-1">*</span>Title:</label>
                                            <input type="text" name="review_title" v-model="review_title" class="p-1">
                                        </div>
                                        <div class="d-flex flex-column my-4">
                                            <label for="review_content" class="mb-2"><span class="text-danger me-1">*</span>Review:</label>
                                            <textarea type="text" name="review_title" v-model="review_content" class="p-1" spellcheck="false"></textarea>
                                        </div>
                                        <div class="d-flex gap-5 my-4">
                                            <div class="d-flex flex-column w-100">
                                                <label for="user_name" class="mb-2"><span class="text-danger me-1">*</span>Your Name:</label>
                                                <input type="text" name="user_name" v-model="user_name" class="p-1">
                                            </div>
                                            <div class="d-flex flex-column w-100">
                                                <label for="user_email" class="mb-2"><span class="text-danger me-1">*</span>Email:</label>
                                                <input type="email" name="user_email" v-model="user_email" class="p-1">
                                            </div>
                                        </div>
                                        <div class="text-end">
                                            <button class="primary-button" type="submit">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                            <div class="review">
                                <h3 class="text-secondary mb-5">2 Reviews</h3>
                                <div class="review-items d-flex flex-column gap-5">
                                    <div class="review-items__item">
                                        <div class="review-items__item-head d-flex justify-content-between">
                                            <div class="d-flex gap-3">
                                                <span class="user-profile" style="background:rgb(146, 117, 249);">
                                                    <span class="user-letter">P</span>
                                                </span>
                                                <div>
                                                    <h3 class="fs-4 fw-semibold text-dark m-0">Porfie M.</h3>
                                                    <span class="text-info">
                                                        <i class="bi bi-star-fill"></i>
                                                        <i class="bi bi-star-fill"></i>
                                                        <i class="bi bi-star-fill"></i>
                                                        <i class="bi bi-star-fill"></i>
                                                        <i class="bi bi-star-fill"></i>
                                                    </span>
                                                    <div class="review-items__item-content">
                                                        <h3 class="text-capitalize fs-4 fw-medium">Love my Cozzia Qi XE PRO</h3>
                                                        <p class="text-secondary">We have had this chair for about a month, and I am so happy with my purchase. The chair doctor program really does give you a custom massage based</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="m-0">04/12/23</p>
                                        </div>
                            
                                        <div class="review-items__item-footer d-flex align-items-center justify-content-end gap-3">
                                            <p class="m-0">Was This Review Helpful?</p>
                                            <div class="d-flex gap-3">
                                                <div class="d-flex align-items-center gap-1">
                                                    <button class="d-flex align-items-center justify-content-center p-0 m-0 bg-transparent border-0">
                                                        <i class="bi bi-hand-thumbs-up"></i>
                                                    </button>
                                                    <span>
                                                        10
                                                    </span>
                                                </div>
                                                <div class="d-flex align-items-center gap-1">
                                                    <button class="d-flex align-items-center justify-content-center p-0 m-0 bg-transparent border-0">
                                                        <i class="bi bi-hand-thumbs-down"></i>
                                                    </button>
                                                    <span>
                                                        1
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review-items__item">
                                        <div class="review-items__item-head d-flex justify-content-between">
                                                <div class="d-flex gap-3">
                                                    <span class="user-profile" style="background:rgb(249, 117, 240);">
                                                        <span class="user-letter">P</span>
                                                    </span>
                                                    <div>
                                                        <h3 class="fs-4 fw-semibold text-dark m-0">Porfie M.</h3>
                                                        <span class="text-info">
                                                            <i class="bi bi-star-fill"></i>
                                                            <i class="bi bi-star-fill"></i>
                                                            <i class="bi bi-star-fill"></i>
                                                            <i class="bi bi-star-fill"></i>
                                                            <i class="bi bi-star-fill"></i>
                                                        </span>
                                                        <div class="review-items__item-content">
                                                            <h3 class="text-capitalize fs-4 fw-medium">Love my Cozzia Qi XE PRO</h3>
                                                            <p class="text-secondary">We have had this chair for about a month, and I am so happy with my purchase. The chair doctor program really does give you a custom massage based on the information it gathers after it scans your back. The variety of the massage options, and types of massage has something sure to please everyone. This also gives you heat in the lower back, lumba</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="m-0">04/12/23</p>
                                            </div>
                                        <div class="review-items__item-footer d-flex align-items-center  justify-content-end gap-3">
                                            <p class="m-0">Was This Review Helpful?</p>
                                            <div class="d-flex gap-3">
                                                <div class="d-flex align-items-center gap-1">
                                                    <button class="d-flex align-items-center justify-content-center p-0 m-0 bg-transparent border-0">
                                                        <i class="bi bi-hand-thumbs-up"></i>
                                                    </button>
                                                    <span>
                                                        10
                                                    </span>
                                                </div>
                                                <div class="d-flex align-items-center gap-1">
                                                    <button class="d-flex align-items-center justify-content-center p-0 m-0 bg-transparent border-0">
                                                        <i class="bi bi-hand-thumbs-down"></i>
                                                    </button>
                                                    <span>
                                                        1
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="question-items__item-answer">
                                            <div class="question-items__item-head d-flex justify-content-between">
                                                <div class="d-flex gap-3">
                                                    <span class="user-profile" style="background:rgb(131, 131, 137);">
                                                        <span class="user-letter"><i class="bi bi-shop-window"></i></span>
                                                    </span>
                                                    <div>
                                                        <h3 class="fs-4 fw-semibold text-dark m-0 text-uppercase">Comfort Wings</h3>
                                                        <p>Hi Porfie M.!</p>
                                                        <p class="m-0 text-secondary">We are so happy to hear you how much you love the Qi Massage Chair. Thank you for being a loyal customer and we hope to be of help again soon!</p>
                                                    </div>
                                                </div>
                                                <p class="m-0">04/12/23</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <!-- Question Form -->
                                <div class="product-question__form">
                                    <form>
                                        <h2 class="fw-normal text-uppercase fs-3">ASK A QUESTION</h2>
                                        <p class="text-secondary fs-4"><span class="text-danger me-1">*</span>Indicates a required field</p>
                                        <div class="d-flex flex-column my-4">
                                            <label for="question_content" class="mb-2"><span class="text-danger me-1">*</span>Question:</label>
                                            <textarea type="text" name="question_content" v-model="question_content" class="p-1" spellcheck="false"></textarea>
                                        </div>
                                        <div class="d-flex gap-5 my-4">
                                            <div class="d-flex flex-column w-100">
                                                <label for="user_name" class="mb-2"><span class="text-danger me-1">*</span>Your Name:</label>
                                                <input type="text" name="user_name" v-model="user_name" class="p-1">
                                            </div>
                                            <div class="d-flex flex-column w-100">
                                                <label for="user_email" class="mb-2"><span class="text-danger me-1">*</span>Email:</label>
                                                <input type="email" name="user_email" v-model="user_email" class="p-1">
                                            </div>
                                        </div>
                                        <div class="text-end">
                                            <button class="question-submit text-uppercase fw-normal bg-info border-0 text-white" type="submit">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <h3 class="text-secondary mb-5">1 Question</h3>
                                <div class="question-items d-flex flex-column gap-5">
                                <div class="question-items__item">
                                    <div class="question-items__item-head d-flex justify-content-between">
                                        <div class="d-flex gap-3">
                                            <span class="user-profile" style="background:rgb(146, 117, 249);">
                                                <span class="user-letter">P</span>
                                            </span>
                                            <div>
                                                <h3 class="fs-4 fw-semibold text-dark m-0">Porfie M.</h3>
                                                <p><span>Q:</span>I need to know if you will ship to Kolkata India for me</p>
                                            </div>
                                        </div>
                                        <p class="m-0">04/12/23</p>
                                    </div>
                                    <div class="question-items__item-answer">
                                        <div class="question-items__item-head d-flex justify-content-between">
                                            <div class="d-flex gap-3">
                                                <span class="user-profile" style="background:rgb(131, 131, 137);">
                                                    <span class="user-letter"><i class="bi bi-shop-window"></i></span>
                                                </span>
                                                <div>
                                                    <h3 class="fs-4 fw-semibold text-dark m-0 text-uppercase">Comfort Wings</h3>
                                                    <p><span>A:</span>Hello,</p>
                                                    <p class="m-0 text-secondary">Thank you for contacting Comfort Wings. Unfortunately, we can only ship within the United States at this time. I apologize for any inconvenience this may have caused. Please let us know if we can assist with anything else!</p>
                                                </div>
                                            </div>
                                            <p class="m-0">04/12/23</p>
                                        </div>
                                        <div class="review-items__item-footer d-flex align-items-center justify-content-end gap-3">
                                            <p class="m-0">Was This Answer Helpful?</p>
                                            <div class="d-flex gap-3">
                                                <div class="d-flex align-items-center gap-1">
                                                    <button class="d-flex align-items-center justify-content-center p-0 m-0 bg-transparent border-0">
                                                        <i class="bi bi-hand-thumbs-up"></i>
                                                    </button>
                                                    <span>
                                                        10
                                                    </span>
                                                </div>
                                                <div class="d-flex align-items-center gap-1">
                                                    <button class="d-flex align-items-center justify-content-center p-0 m-0 bg-transparent border-0">
                                                        <i class="bi bi-hand-thumbs-down"></i>
                                                    </button>
                                                    <span>
                                                        1
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.user-profile {
    min-width: 60px;
    height: 60px;
    border-radius: 999px;
    background-color: #9b91dc;
    display: flex;
    align-items: center;
    justify-content: center;
}
.user-letter {
    font-size: 28px;
    font-weight: 600;
    color: #fff;
}
.review-submit,.question-submit {
    padding: 8px 50px;
}
.nav-link {
    color: #000;
    text-transform: uppercase;
    border-radius: 0;
    padding-inline: 0;
    border-bottom: 1px solid transparent;
}
.nav-link.active {
    background: transparent !important;
    border-color: black;
    color: #000;
}
.question-items__item-answer {
    margin: 30px 0 0 30px;
    padding: 30px 0 30px 30px;
    position: relative;
}
.question-items__item-answer::after {
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: rgb(131, 131, 137);
}
</style>