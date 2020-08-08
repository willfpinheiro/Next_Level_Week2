const Database = require('./db.js');
const creatProffy = require('./creatProffy');

Database.then(async (db) => {
    // inserir dados

    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "91984719579",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1,
        cost: "20",
        // Proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class id vem pelo banco de dados
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    // await creatProffy(db, { proffyValue, classValue, classScheduleValues })

    // consultar os dados inseridos
    // todos os porffys
    const selectedProffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedProffys)

    // Consultar as classes de um determinado professor e trazer junto os dados dele
    const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
    `);
    // console.log(selectClassesAndProffys)

    // time_from <= horario_solicitado < time_to
    const selectClassesSchedules = await db.all(`
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "420"
    AND class_schedule.time_to > "520"
    `)

    // console.log(selectClassesSchedules)
})