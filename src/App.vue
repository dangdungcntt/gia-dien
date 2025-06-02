<script setup lang="ts">
import {reactive} from "vue";
import { Price6Levels, Price5Levels } from "./price";
import TablePrices from "./TablePrices.vue";
//@ts-ignore
import Chart from "./Chart.vue";

const state = reactive({
  totalKwh: undefined,
  vatPercent: 8
});

</script>

<template>
  <div class="container mx-auto p-4 space-y-4">
    <h1 class="text-center my-4 text-3xl font-medium">Tính tiền điện theo quyết định số 14/2025/QĐ-TTg của Thủ tướng Chính phủ</h1>
    <div class="grid md:grid-cols-2 gap-4 md:gap-8 mb-4">
      <div>
        <label>Nhập số kWh</label>
        <input class="w-full border px-3 py-1 rounded" v-model.number="state.totalKwh" type="number" inputmode="decimal"  />
      </div>
      <div>
        <label>Thuế VAT (%)</label>
        <input class="w-full border px-3 py-1 rounded" v-model.number="state.vatPercent" type="number" inputmode="decimal"  />
      </div>
    </div>
    <div class="grid md:grid-cols-2 gap-4 md:gap-8">
      <div>
        <h6 class="text-xl font-medium my-2">Bảng giá điện 6 bậc (áp dụng trước 29/05/2025):</h6>
        <TablePrices :price-levels="Price6Levels" :vat-percent="state.vatPercent" :total-k-wh="state.totalKwh"/>
      </div>
      <div>
        <h6 class="text-xl font-medium my-2">Bảng giá điện 5 bậc (áp dụng từ 29/05/2025):</h6>
        <TablePrices :price-levels="Price5Levels" :compare-price-levels="Price6Levels" :vat-percent="state.vatPercent" :total-k-wh="state.totalKwh"/>
      </div>
    </div>
    <div>
      <h6 class="text-xl font-medium my-2">Biểu đồ giá điện thay đổi theo số kWh</h6>
      <Chart class="w-full" />
    </div>
  </div>
</template>
