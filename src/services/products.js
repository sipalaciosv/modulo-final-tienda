const _data = [
{ id: 1, name: 'Teclado Mecánico', price: 39990, stock: 8, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_655084-MLA96145933151_102025-F.webp' },
{ id: 2, name: 'Mouse Gamer', price: 29990, stock: 0, image: 'https://picsum.photos/seed/mouse/200/120' },
{ id: 3, name: 'Monitor 24"', price: 129990, stock: 5, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_661395-MLA96146250033_102025-F.webp' },
{ id: 4, name: 'Headset Pro', price: 49990, stock: 2, image: 'https://http2.mlstatic.com/D_NQ_NP_2X_693562-MLA95935366389_102025-F.webp' },
];


export const Products = {
all() {
return new Promise((resolve) => {
setTimeout(() => resolve([..._data]), 600);
});
},
};