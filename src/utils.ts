export const roundNumber = (number: number, precision: number) => {
    return Math.round(number * precision) / precision;
}
