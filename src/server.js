
// servidor
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

// configurar nujucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})


server
    // receber os dados do req.body, pois padrão é req.query
    .use(express.urlencoded({ extended: true }))
    // configurar  arquivos estaticos (css, scripts, imagens)
    .use(express.static("public"))
    // (req- é o que preciso, res- é o que exibe na tela) rotas das aplicações
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    .listen(5500)
