var http = require("http");

var express = require("express");
var app = express();

var mongodb = require("mongodb");

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb://gabriel:senhamongodb@ac-0pdb8qa-shard-00-00.upue8sn.mongodb.net:27017,ac-0pdb8qa-shard-00-01.upue8sn.mongodb.net:27017,ac-0pdb8qa-shard-00-02.upue8sn.mongodb.net:27017/?ssl=true&replicaSet=atlas-ap9a9t-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect()
.then(() => {
    console.log("Mongo conectado");
})
.catch((err) => {
    console.log(err);
});

var dbo = client.db("carros_bd");

var carro = dbo.collection("carro");
var usuario = dbo.collection("usuarios");

app.set("view engine", "ejs");

let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("./public"));

var server = http.createServer(app);

server.listen(1300);

console.log("Servidor Ativo");

app.get("/", function(req, res){
    res.redirect("projetos.html");
});


app.post('/cadastroCarro', function(req,res){
    var login = req.body.login;
    var senha = req.body.senha;
    var nome = req.body.nome;
    var data = {login: login, senha: senha, nome: nome};
    usuario.insertOne(data, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect('Carros/loginCarro.html');
        }
    });
});

app.post('/loginCarro', function(req,res){
    var login = req.body.login;
    var senha = req.body.senha;
    var data = {login: login, senha: senha}

    usuario.find(data).toArray(function(err, items){
    console.log(items);
    if(items.length == 0) {
            res.render("respostaLogin", {resposta: "Usuário/Senha não encontrados!"})
        } else if (err){
            res.render("respostaLogin", {resposta: "Erro ao logar usuário"})
        } else {
            res.redirect("carroListagem")
        };
    });
})

app.get('/gerenciarCarros', function(req, res){
    res.sendFile(__dirname + "/public/Carros/carroGerencia.html");
});
app.get('/carrologin', function(req, res){
    res.sendFile(__dirname + "/public/Carros/loginCarro.html");
});
app.get('/cadastrarcarro', function(req, res){
    res.sendFile(__dirname + "/public/Carros/cadastroCarro.html");
});


app.get('/carroListagem', function(req, res){
    carro.find({}).toArray(function(err, items){
        if(err){
            console.log(err);
        } else {
            res.render('carroListagem', {
                carros: items
            });
        }
    });
});

app.post('/novoCarro', function(req, res){

    var marca = req.body.marca;
    var modelo = req.body.modelo;
    var ano = req.body.ano;
    var qtde = parseInt(req.body.qtde);
    var data = {
        marca: marca,
        modelo: modelo,
        ano: ano,
        qtde: qtde
    };
    carro.insertOne(data, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("gerenciarCarros")
        }
    });
});

app.post('/removerCarro', function(req, res){
    var data = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano
    };
    carro.deleteOne(data, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/carroListagem');
        }
    });
});

app.post('/atualizarCarro', function(req, res){
    var filtro = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano
    };
    var novaQtde = parseInt(req.body.qtdenovo);
    var novosDados = {
        $set: {
            marca: req.body.marcanovo,
            modelo: req.body.modelonovo,
            ano: req.body.anonovo,
            qtde: novaQtde,
            esgotado: novaQtde == 0
        }
    };
    carro.updateOne(filtro, novosDados, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/carroListagem');
        }

    });

});

app.post('/venderCarro', function(req, res){
    var filtro = {
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano
    };
    carro.findOne(filtro, function(err, item){
        if(err || !item){
            res.redirect('/carroListagem')
        } else {
            var novaQtde = item.qtde - 1;
            if(novaQtde < 0){
                novaQtde = 0;
            }
            carro.updateOne(
                filtro,
                {
                    $set: {
                        qtde: novaQtde,
                        esgotado: novaQtde == 0
                    }
                },
                function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.redirect('/carroListagem');
                    }

                }
            );
        }
    });
});