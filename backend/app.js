const express = require('express');
const db = require('./connect');
const app = express();
const port = 3000;
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



// LOGIN 


app.post('/api/login', async (req, res) =>{
    try{
        const {email, senha} = req.body

        const usuario = await db('usuarios').select('*').where({email}).first()

        if (!usuario){
            return res.status(400).json({
                mensagem: "Erro ao fazer login"
            })
        }

        const senhaOk = await bcrypt.compare(senha, usuario.senha)

        if (!senhaOk){
            return res.status(400).json({
                mensagem: "Erro ao fazer login!"
            })
        } 

        const payload = {userid: usuario.id}
        const key = process.env.TOKEN;
        const token = jwt.sign(payload, key, {expiresIn: '20m'});

        return res.status(200).json({
            token: token,
            mensagem: "Login realizado com sucesso!"
        })

    } catch(error){
        res.status(400).json({        
            erro: error.message
        })
    }
})


// USUARIOS

app.post('/api/usuarios', async(req, res) =>{
    try{

        const {email, senha} = req.body

        let saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashSenha = await bcrypt.hash(senha, salt)



        const dados = await db('usuarios').insert({email: email, senha: hashSenha})
        res.status(201).json({
            sucesso: dados
        }) 
    }catch(error){
        res.status(400).json ({
            erro: error.message
        })
    }


})

// CONVIDADOS

app.get('/api/convidados', async (req, res) =>{
    try{
        const dados = await db('convidados').select('*')
        res.status(200).json(dados)
    } catch(error){
        res.status(400).json({
            Erro: "Erro ao carregar convidados." 
        })
    }
})

app.post('/api/convidados', async (req, res) =>{
    try{
        const {nome, email, cpf, mesa} = req.body
        const dados = await db ('convidados').insert({nome, email, cpf, mesa})
        res.status(201).json({
            sucesso: "Convidado cadastrado com sucesso!"
        }) 
    } catch(error){
        res.status(400).json({
            erro: error.message
        })
    }
})

app.patch('/api/convidados/:id', async(req, res) =>{
    try{
        const {nome, email, cpf, mesa} = req.body
        const { id } = req.params
        const dados = await db ('convidados').update({nome, email, cpf, mesa}).where('id', id)
            res.status(200).json({
                sucesso: "Convidado editado com sucesso!"
            })
    } catch(error){
        res.status(400).json({
            erro: error.message
        })
    } 
})

app.delete('/api/convidados/:id', async (req, res) =>{
    try{
        const {id} = req.params
        const dados = await db('convidados').select('id').where('id', id).delete()
        res.status(200).json({
            sucesso: "Convidado excluido com sucesso!"
        })
    } catch(error){
        res.status(400).json({
            erro: error.message 
        })
    }
})

// DASHBOARD

app.get('/api/dashboard/dados', async (req, res) =>{
    try{
        const total = await db('convidados').select('id').count('id as total').first()
        const pendentes = await db('convidados').select('id').count('id as pendentes').where({status: 0}).first()
        const confirmados = await db('convidados').select('id').count('id as confirmados').where({status: 1}).first()
        res.status(200).json({
            total: total.count,
            pendentes: pendentes.count,
            confirmados: confirmados.count
        })
    }catch(error){
        res.status(400).json({
            erro: error.message
        })
    }
})

app.get('/api/dashboard', async (req, res) =>{
    try{
        const dados = await db('convidados').select('*').where({status: 1}).orderBy("atualizado_em", "desc").limit(5)
        res.status(200).json(dados)
    } catch(error){
        res.status(400).json({
            erro: error.message
        })
    }
})


// CHECKIN

app.get('/api/checkin', async (req, res) =>{
    try{
        const dados = await db('convidados').select('*')
        res.status(200).json(dados)
    } catch(error){
        res.status(400).json({
            Erro: "Erro ao carregar convidados." 
        })
    }
})

app.patch('/api/checkin/:id', async(req, res) =>{
    try{
        const { id } = req.params
        const dados = await db ('convidados').update({status: 1}).where('id', id)
            res.status(200).json({
                sucesso: "Checkin realizado com sucesso!"
            })
    } catch(error){
        res.status(400).json({
            erro: error.message
        })
    }
})


app.listen(port, () =>{
    console.log("Servidor rodando na porta 3000")
})