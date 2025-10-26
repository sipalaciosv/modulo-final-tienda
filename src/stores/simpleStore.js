import { reactive, computed } from 'vue';


// ——— AUTH ———
const _userFromLS = (() => {
try { return JSON.parse(localStorage.getItem('user')) || null; } catch { return null; }
})();


const authState = reactive({ user: _userFromLS });


function setUser(u) {
authState.user = u;
if (u) localStorage.setItem('user', JSON.stringify(u));
else localStorage.removeItem('user');
}


export const authStore = {
state: authState,
isAuth: computed(() => !!authState.user),
login(user) { setUser(user); },
logout() { setUser(null); },
};


// ——— CART ———
const cartState = reactive({ items: [] });


function findIndex(id) { return cartState.items.findIndex(i => i.id === id); }


export const cartStore = {
state: cartState,
add(product, qty = 1) {
const i = findIndex(product.id);
if (i === -1) cartState.items.push({ ...product, qty });
else cartState.items[i].qty = Math.min(cartState.items[i].qty + qty, product.stock);
},
remove(id) {
const i = findIndex(id);
if (i !== -1) cartState.items.splice(i, 1);
},
setQty(id, qty, stock) {
const i = findIndex(id);
if (i !== -1) cartState.items[i].qty = Math.max(1, Math.min(qty, stock ?? 9999));
},
clear() { cartState.items = []; },
count: computed(() => cartState.items.reduce((a, i) => a + i.qty, 0)),
total: computed(() => cartState.items.reduce((a, i) => a + i.price * i.qty, 0)),
};