const colors = [
    "#FF6B6B",
    "#6E48AA",
    "#12FFF7",
    "#11FFBD",
    "#BB377D"
]

export const getRandomColor = (index) => {
    return colors[index % colors.length];
}