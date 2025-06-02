<script lang="ts" setup>
import {formatNumber, PriceLevel} from "./model.ts";
import {GetOutputOfLevel, GetPrice, GetPriceOfLevel} from "./price.ts";
import {computed} from "vue";
import CompareLabel from "./CompareLabel.vue";

const props = defineProps<{
  priceLevels: PriceLevel[],
  comparePriceLevels?: PriceLevel[],
  totalKWh?: number,
  vatPercent: number,
}>()

const formatNumberDefaultEmpty = (num: number) => {
  if (num === 0) return "";
  return formatNumber(num);
}

const rawPrice = computed(() => {
  return GetPrice(props.priceLevels, props.totalKWh || 0)
})

const vatPrice = computed(() => {
  return Math.ceil(rawPrice.value * props.vatPercent / 100)
})

const totalPrice = computed(() => {
  return rawPrice.value + vatPrice.value
})

const totalPriceCompare = computed(() => {
  let raw = GetPrice(props.comparePriceLevels || [], props.totalKWh || 0);
  return raw + Math.ceil(raw * props.vatPercent / 100)
})

</script>

<template>
  <table class="text-left w-full">
    <thead>
    <tr>
      <th class="border p-2">Bậc</th>
      <th class="border p-2 text-center">Đơn giá<br>(đồng/kWh)</th>
      <th v-if="totalKWh" class="border p-2 text-center">Sản lượng<br>(kWh)</th>
      <th v-if="totalKWh" class="border p-2 text-center">Thành tiền<br>(đồng)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(priceLevel, index) in priceLevels" :key="index" :class="{ 'bg-gray-100': index % 2 == 0 }"
        class="hover:bg-gray-200">
      <td class="border p-2">
        Bậc {{ index + 1 }}: Từ <span class="font-bold">{{ priceLevel.min }}</span> <span v-if="priceLevel.max">đến <span
        class="font-bold">{{ priceLevel.max }}</span></span> KWh
      </td>
      <td class="text-center border p-2">{{ formatNumber(priceLevel.price) }}</td>
      <td v-if="totalKWh" class="text-center border p-2">{{ formatNumberDefaultEmpty(GetOutputOfLevel(priceLevel, totalKWh || 0)) }}</td>
      <td v-if="totalKWh" class="border p-2 text-right">{{ formatNumberDefaultEmpty(GetPriceOfLevel(priceLevel, totalKWh || 0)) }}</td>
    </tr>
    <tr v-if="priceLevels.length < 6">
      <td class="border p-2" colspan="4">&nbsp;</td>
    </tr>
    </tbody>
    <tfoot v-if="totalKWh">
    <tr>
      <th class="border p-2" colspan="2">Tổng điện năng tiêu thụ (kWh)</th>
      <th class="border p-2 text-center">{{ formatNumberDefaultEmpty(totalKWh) }}</th>
      <th class="border p-2 text-right"></th>
    </tr>
    <tr>
      <th class="border p-2" colspan="3">
        Tổng tiền chưa thuế (đồng) <span class="font-normal">(1)</span>
      </th>
      <th class="border p-2 text-right">{{ formatNumberDefaultEmpty(rawPrice) }}</th>
    </tr>
    <tr>
      <th class="border p-2" colspan="3">
        Thuế VAT {{ vatPercent }}% (đồng) <span class="font-normal">(2) = (1) * {{ vatPercent }}%</span>
      </th>
      <th class="border p-2 text-right">{{ formatNumberDefaultEmpty(vatPrice) }}</th>
    </tr>
    <tr>
      <th class="border p-2" colspan="3">
        Tổng tiền (đồng) <span class="font-normal">(3) = (1) + (2)</span>
        <CompareLabel v-if="totalPriceCompare" :base="totalPriceCompare" :value="totalPrice" class="ml-2" decrease-class="text-green-500"
                      increase-class="text-red-500"/>
      </th>
      <th class="border p-2 text-right">{{ formatNumberDefaultEmpty(totalPrice) }}</th>
    </tr>
    <tr>
      <th class="border p-2" colspan="3">Giá trung bình mỗi kWh (đồng) <span class="font-normal">(4) = (3) / {{ totalKWh }}</span></th>
      <th class="border p-2 text-right">{{ formatNumberDefaultEmpty(Math.ceil((rawPrice + vatPrice) / totalKWh)) }}</th>
    </tr>
    </tfoot>
  </table>
</template>
