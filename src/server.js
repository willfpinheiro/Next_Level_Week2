const { pageLanding, pageStudy, pageGiveClass } = require('./pages')

// servidor
const express = require('express')
const server = express()


// configurar nujucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})


server
    // configurar  arquivos estaticos (css, scripts, imagens)
    .use(express.static("public"))
    // (req- é o que preciso, res- é o que exibe na tela) rotas das aplicações
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClass)
    .listen(5500)
