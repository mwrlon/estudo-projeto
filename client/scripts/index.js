async function login(event) {
    event.preventDefault();

    try{

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                senha
            }),
        });

        console.log(response)
        const dados = await response.json()


        console.log(dados)
        

        if (response.ok){
            localStorage.setItem('token', dados.token)
            alert('Login realizado com sucesso!')
            window.location.href = 'dashboard.html'
        } else{
            alert('Seu login falhou, tente novamente.')
        }
        
    } catch(error){
        console.error(error)
    }

}