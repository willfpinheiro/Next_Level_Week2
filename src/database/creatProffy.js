// para funcionar o await precisamos usar o async
module.exports = async function (db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na tabela de teachers
    // espera a funçao fazer a sua função.
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela classes
    const insertedClass = await db.run(`
    INSERT INTO classes (
        subject,
        cost,
        proffy_id
    ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
    );
`)

    const class_id = insertedClass.lastID

    // inserir dados na tabela classes
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
        INSERT INTO classes_schedule (
            class_id,
            weekday,
            time_from,
            time_to
        ) VALUES (
            "${class_id}",
            "${classScheduleValue.weekday}",
            "${classScheduleValue.time_from}",
            "${classScheduleValue.time_to}"
        );
        `)
    })

    // aqui vou executar todos os db.runs() das class_schedule
    // promisse.all serve para esperar todas as execuções
    await Promise.all(insertedAllClassScheduleValues)

};