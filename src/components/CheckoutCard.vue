<template>
  <v-card
    width="600"
    height="500"
  >
    <div class="checkout-cart">
      <h5 class="text-h5 ma-5">Cart Overview</h5>
      <v-list-item v-for="item in cartItems" :key="item.item_id">
        {{ item.quantity + "x " + item.item_name }}
      </v-list-item>
      <v-divider class="ma-5"/>
      <p>Items: {{ (total - (total * 0.19)).toFixed(2) }}€</p>
      <p>Tax: {{ (total * 0.19).toFixed(2) }}€</p>
      <p>Total: {{ total }}€</p>
      <h5 class="text-h5 ma-5">Order Information</h5>
      <v-sheet class="mx-auto" max-width="300">
        <v-form validate-on="submit lazy" @submit.prevent="submit">
          <v-text-field
            v-model="name"
            :rules="nameRules"
            hide-detailes="auto"
            label="Full Name"
          ></v-text-field>
          <v-text-field
            :rules="emailRules"
            hide-detailes="auto"
            label="E-Mail Address"
          ></v-text-field>
          <v-btn
            type="submit"
            text="Submit"
            :loading="loading"
          >
          </v-btn>
        </v-form>
      </v-sheet>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps(["cartItems", "total"])

const name = ref<string>("")
const email = ref<string>("")
const loading = ref<boolean>(false)

const nameRules = [
  (value: any) => !!value || "Name is required.",
]
const emailRules = [
  (value: any) => !!value || "E-Mail is required.",
  (value: any) => !!(/.+@.+\..+/.test(value)) || "E-Mail must be valid."
]

const submit = async (event: any) => {
  loading.value = true

  const results = await event

  loading.value = false

  alert(JSON.stringify(results, null, 2))
}
</script>

<style scoped>
.checkout-cart {
  overflow: hidden;
  overflow-y: scroll;
}

.checkout-cart h5 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-cart p {
  margin-left: 15px;
}
</style>
