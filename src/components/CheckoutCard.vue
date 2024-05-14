<template>
  <v-card class="checkout-card">
    <div class="checkout-cart">
      <h5 class="text-h5 ma-5">Cart Overview</h5>
      <v-list-item v-for="item in cartItems" :key="item.item_id">
        {{ item.quantity + "x " + item.item_name }}
      </v-list-item>
      <v-divider class="ma-5"/>
      <p>Items: {{ (total - (total * 0.19)).toFixed(2) }}€</p>
      <p>Tax: {{ (total * 0.19).toFixed(2) }}€</p>
      <p>Shipping: 5.99€</p>
      <p>Total: {{ total + 5.99 }}€</p>
      <h5 class="text-h5 ma-5">Order Information</h5>
      <v-sheet class="mx-auto order-information">
        <v-form validate-on="submit lazy" @submit.prevent="submit">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                hide-details="auto"
                label="Full Name"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                hide-details="auto"
                label="E-Mail Address"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="address"
                :rules="addressRules"
                hide-details="auto"
                label="Address"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="postal"
                :rules="postalRules"
                hide-details="auto"
                label="Postal Code"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-select
                v-model="country"
                :items="countries"
                :rules="countryRules"
                label="Country"
              ></v-select>
            </v-col>
            <v-col cols="12" class="text-center ">
              <v-btn
                type="submit"
                text="Submit"
              ></v-btn>
            </v-col>
          </v-row>
        </v-form>

      </v-sheet>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
import axios from "axios"

const props = defineProps(["cartItems", "total"])

const countries = ref<any[]>([])

const name = ref<string>("")
const email = ref<string>("")
const address = ref<string>("")
const postal = ref<string>("")
const country = ref<string>("Select a Country")

const nameRules = [
  (value: any) => !!value || "Name is required.",
]
const emailRules = [
  (value: any) => !!value || "E-Mail is required.",
  (value: any) => !!(/.+@.+\..+/.test(value)) || "E-Mail must be valid."
]
const addressRules = [
  (value: any) => !!value || "Address is required."
]
const postalRules = [
  (value: any) => !!value || "Postal Code is required"
]
const countryRules = [
  (value: any) => value !== "Select a Country" || "Country is required."
]

const fetchCountries = async () => {
  try {
    const res = await axios.get<any[]>('https://restcountries.com/v3.1/all')
    countries.value = res.data.map(country => country.name.common)
    countries.value.sort()
  } catch (err) {
    console.error('Error fetching countries: ', err)
  }
}

const submit = async (event: any) => {
  const nameValid = nameRules.every(rule => rule(name.value) === true)
  const emailValid = emailRules.every(rule => rule(email.value) === true)
  const addressValid = addressRules.every(rule => rule(address.value) === true)
  const postalValid = postalRules.every(rule => rule(postal.value) === true)
  const countryValid = countryRules.every(rule => rule(country.value) === true)

  if (!nameValid || !emailValid || !addressValid || !postalValid || !countryValid) {
    alert("Fix")
    return
  }

  const orderData = {
    name: name.value,
    email: email.value,
    address: address.value,
    postal: postal.value,
    country: country.value,
    items: props.cartItems,
    amount: props.total,
    currency: 'EUR'
  }

  try {
    const res = await axios.post('http://localhost:1337/save-order', orderData)
    alert(res)
  } catch (err) {
    console.error('Error: ', err)
  }

  // User Feedback
}

onMounted(fetchCountries)
</script>

<style scoped>
.checkout-card {
  width: 600px;
  height: 80vh;
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

.order-information {
  max-width: 80%;
}
</style>
