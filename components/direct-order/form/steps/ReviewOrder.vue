<template>
    <div>
        <h4 class="text-center text-lg font-bold lg:text-2xl">REVIEW YOUR ORDER</h4>
        <div class="lg:flex justify-between mt-4 lg:gap-x-20 lg:mt-16">
            <div class="w-full lg:w-7/12">
                <!-- Contact/Delivery -->
                <section>
                    <div class="flex">
                        <div class="w-1/2 flex flex-col mt-5">
                            <span class="label">DATE & TIME</span>
                            <span class="mt-1">Dec 20 @ 9:00am</span>
                        </div>
                        <div class="w-1/2 flex flex-col mt-5">
                            <span class="label">ORDER TYPE</span>
                            <span class="mt-1">Delivery</span>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="w-1/2 flex flex-col mt-5">
                            <span class="label">CONTACT</span>
                            <span class="mt-1">
                                Firstname Lastname
                                email@foobar.com
                                312-555-1212
                            </span>
                        </div>
                        <div class="w-1/2 flex flex-col mt-5">
                            <span class="label">ADDRESS</span>
                            <span class="mt-1">
                                817 W Fulton
                                Market
                            </span>
                        </div>
                    </div>
                </section>
                <!-- Order info -->
                <section class="mt-10">
                    <span class="label">ORDER DETAILS</span>
                    <!-- Items -->
                    <div class="mt-3">
                        <div class="flex items-center">
                            <strong class="w-10 text-sm">55</strong>
                            <span>Howdy Breakfast Buns (dozen)</span>
                            <span class="flex-1 text-right">$236</span>
                        </div>
                        <span class="ml-10 text-gray-500 text-sm">Vegetarian mix</span>
                    </div>
                    <!-- Loop throught picked addons -->
                    <div class="mt-3">
                        <div class="flex items-center">
                            <strong class="w-10 text-sm">1</strong>
                            <span>Coffee carafe</span>
                            <span class="flex-1 text-right">$35</span>
                        </div>
                    </div>
                    <!-- Subtotal -->
                    <div class="ml-10 mt-10">
                        <div class="flex justify-between mt-2">
                            <span>Subtotal</span>
                            <span>$xx</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span>Taxes</span>
                            <span>$xx</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span>Delivery (10%)</span>
                            <span>$xx</span>
                        </div>
                        <div class="flex justify-between mt-2">
                            <span>Tip</span>
                            <div class="flex items-center">
                                <span>$</span>
                                <input type="text"
                                    class="ml-3 w-16 h-7 border border-gray-400 text-center focus:border-gray-500 focus:outline-none" />
                            </div>
                        </div>
                        <div class="flex justify-between mt-8">
                            <strong>Total</strong>
                            <strong>$xx</strong>
                        </div>
                    </div>
                </section>
            </div>
            <div class="hidden lg:block">
                <img src="~/assets/img/howdy2.png" alt="Howdy Breakfast Buns" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.label {
    @apply text-xs text-highlight !font-normal uppercase;
}
</style>