import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import ClientService from './services/ClientService.js'
import OrderService from './services/OrderService.js'
import ProductService from './services/ProductService.js'
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/lojaValmir", {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static("public"))

app.set('view engine', 'ejs')

// Rota Principal
app.get("/",function(req,res){
    res.render("index")
})


//----------------------------------------------------------------------------------------//
//                                    Rotas Clientes                                      //
// Rota Clientes
app.get("/clientes", (req,res) => {
    ClientService.GetAll().then(Clients => {
        res.render("clientes", {
            Clients: Clients        
        })
    })
})

// Rota criar cliente
app.post("/createClient", (req, res) => {
    ClientService.Create(
        req.body.name,
        req.body.cpf,
        req.body.address
    )
    res.redirect("/clientes")
})

// Rota excluir cliente
app.get("/deleteClient/:id", (req, res) => {
    const id = req.params.id
    ClientService.Delete(id)
    res.redirect("/clientes")  
})

// Rota buscar cliente
app.get("/findClient/:id", (req, res) => {
    const id = req.params.id
    ClientService.GetOne(id).then(Client => {
        res.render("dadoscliente", {
            Client : Client
        })
    })
})

// Rota alterar cliente
app.post("/updateClient/:id", (req, res) => {
        ClientService.Update(
            req.body.id,
            req.body.name,
            req.body.cpf,
            req.body.address
        )
        res.redirect("/clientes")
})

//----------------------------------------------------------------------------------------//
//                                    Rotas Produtos                                      //
//Rotas produtos
app.get("/produtos",(req,res)=>{
    ProductService.GetAll().then(Product=>{
        res.render("produtos",{
            Product:Product
        })
    } )
})

//Rota criar produto
app.post("/createProduct", (req,res) =>{
    ProductService.Create(
        req.body.name,
        req.body.price,
        req.body.category
    ) 
    res.redirect("/produtos")
})

// Rota excluir produto
app.get("/deleteProduct/:id", (req, res) => {
    const id = req.params.id
    ProductService.Delete(id)
    res.redirect("/produtos")  
})

// Rota buscar produto
app.get("/findProduct/:id", (req, res) => {
    const id = req.params.id
    ProductService.GetOne(id).then(Product => {
        res.render("dadosproduto", {
            Product : Product
        })
    })
})

// Rota alterar produto
app.post("/updateProduct/:id", (req, res) => {
    ProductService.Update(
        req.body.id,
        req.body.name,
        req.body.price,
        req.body.category
    )
    res.redirect("/produtos")
})


//----------------------------------------------------------------------------------------//
//                                    Rotas Pedidos                                       //
// Rota pedidos
app.get("/pedidos", (req,res) => {
    OrderService.GetAll().then(Order => {
        res.render("pedidos", {
            Order: Order       
        })
    })
})

//Rota criar produto
app.post("/createOrder", (req,res) =>{
    OrderService.Create(
        req.body.code,
        req.body.total
    ) 
    res.redirect("/pedidos")
})

// Rota excluir pedido
app.get("/deleteOrder/:id", (req, res) => {
    const id = req.params.id
    OrderService.Delete(id)
    res.redirect("/pedidos")  
})

// Rota buscar pedido
app.get("/findOrder/:id", (req, res) => {
    const id = req.params.id
    OrderService.GetOne(id).then(Order => {
        res.render("dadospedido", {
            Order : Order
        })
    })
})

// Rota alterar pedido
app.post("/updateOrder/:id", (req, res) => {
    OrderService.Update(
        req.body.id,
        req.body.code,
        req.body.total
    )
    res.redirect("/pedidos")
})


//----------------------------------------------------------------------------------------//

// INICIA O SERVIDOR NA PORTA 8080
app.listen(8080,function(erro){
    if(erro) {
        console.log("Ocorreu um erro!")

    }else{
        console.log("Servidor iniciado com sucesso!")
    }
})