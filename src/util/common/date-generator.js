export const yesterdayDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate() - 1).toString().padStart(2, '0')}`;
}

export const date6MonthPrior = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    return `${date.getFullYear()}-${(date.getMonth() + 2).toString().padStart(2, '0')}-${(date.getDate() - 1).toString().padStart(2, '0')}`;
}