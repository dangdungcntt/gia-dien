export interface PriceLevel {
    min: number
    max?: number
    price: number
}

export const formatNumber = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const roundNumber = (number: number, precision: number) => {
    return Math.round(number * precision) / precision;
}
