function logout() {
    const prosseguir = confirm('Deseja mesmo sair?')

    if (prosseguir){
        window.location.href = 'index.html'
        localStorage.removeItem('token')
    
    }
}

// if (!localStorage.getItem('token')){
//     alert('Faça o login novamente.')
//     window.location.href = 'index.html'
// }

const sideBarToggle = document.getElementById('sideBarToggle')
const sidebar = document.getElementById('sidebar')
const nav = document.querySelector('nav')
const titulo = document.getElementById('titulo')
const main = document.querySelector('main')
const botaoSair = document.getElementById('botaoSair')

sidebar.addEventListener('click', () =>{
    sidebar.classList.toggle('w-72')
    nav.classList.toggle('hidden')
    titulo.classList.toggle('hidden')
    botaoSair.classList.toggle('hidden')
})

