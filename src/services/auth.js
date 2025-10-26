export const Auth = {
async login({ email, password }) {
await new Promise(r => setTimeout(r, 400));
if (email === 'usuario1@mitienda.com' && password === 'password') {
return { id: 100, name: 'Usuario Demo', email };
}
throw new Error('Credenciales inválidas');
},
};