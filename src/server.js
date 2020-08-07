// dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "91984719579",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Quimica",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Daniele Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "91984719579",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Quimica",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Mayke Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "91984719579",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Quimica",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220],
    }
]
const subjects = [
    "Biologia",
    "Artes",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

// funcionalidades
function getSubjects(subjectNumber) {
    const arrayPosition = subjectNumber - 1;
    return subjects[arrayPosition]
}
function pageLanding(req, res) {
    // req.query vem as informações da pagina, no caso o form
    //  __dirname retorna caminho do diretorio que esta o arquivo local
    return res.render("index.html");
}
function pageStudy(req, res) {
    const filters = req.query;
    return res.render("study.html", { proffys, filters, subjects, weekdays });
}
function pageGiveClass(req, res) {
    const data = req.query;
    const isNotEmpty = Object.keys(data).length > 0;
    // adiconar dados a lista de proffys
    if (isNotEmpty) {
        data.subject = getSubjects(data.subject)
        proffys.push(data);

        return res.redirect("/study");
    } else {
        return res.render("give-classes.html", { subjects, weekdays });
    }
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
// configurar nujucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// servidor
server
    // configurar  arquivos estaticos (css, scripts, imagens)
    .use(express.static("public"))
    // (req- é o que preciso, res- é o que exibe na tela) rotas das aplicações
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClass)
    .listen(5500)
