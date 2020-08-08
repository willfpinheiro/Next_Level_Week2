const Database = require('./database/db')

const { subjects, weekdays, convertHoursToMinutes, getSubjects } = require('./utils/format')


// funcionalidades
function pageLanding(req, res) {
    // req.query vem as informações da pagina, no caso o form
    //  __dirname retorna caminho do diretorio que esta o arquivo local
    return res.render("index.html");
}


async function pageStudy(req, res) {
    const filters = req.query;

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays });
    }

    // console.log('Não tem campos vazios')

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = '${filters.subject}'
    `
    // caso haja erro na consulta do banco de dados
    try {
        const db = await Database;
        const proffys = await db.all(query);

        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error);
    }


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

module.exports = {
    pageLanding, pageStudy, pageGiveClass
}