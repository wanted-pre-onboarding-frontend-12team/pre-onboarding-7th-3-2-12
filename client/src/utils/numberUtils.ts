export const numberWithCommasConverter = (n: string) => n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
