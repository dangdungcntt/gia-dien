import { PriceLevel } from "./model";

export const Price6Levels: PriceLevel[] = [
    { min: 0, max: 50, price: 1984 },
    { min: 51, max: 100, price: 2050 },
    { min: 101, max: 200, price: 2380 },
    { min: 201, max: 300, price: 2998 },
    { min: 301, max: 400, price: 3350 },
    { min: 401, price: 3460 },
];

export const Price5Levels: PriceLevel[] = [
    { min: 0, max: 100, price: 1984 },
    { min: 101, max: 200, price: 2380 },
    { min: 201, max: 400, price: 2998 },
    { min: 401, max: 700, price: 3571 },
    { min: 701, price: 3967 },
];

export function GetPrice(priceLevels: PriceLevel[], kwh: number) {
    return priceLevels.reduce((res, priceLevel) => res + GetPriceOfLevel(priceLevel, kwh), 0);
}

export function GetPriceOfLevel(priceLevel: PriceLevel, kwh: number) {
    return GetOutputOfLevel(priceLevel, kwh) * priceLevel.price
}

export function GetOutputOfLevel(priceLevel: PriceLevel, kwh: number) {
    if (kwh < priceLevel.min || kwh == 0) {
        return 0
    }
    return (priceLevel.max ? Math.min(kwh, priceLevel.max) : kwh) - priceLevel.min + Number(priceLevel.min > 0)
}
