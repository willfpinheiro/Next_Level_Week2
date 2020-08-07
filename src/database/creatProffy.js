// para funcionar o await precisamos usar o async
module.exports = async function (db, { proffyValue, classValue, classScheduleValue }) {
    // inserir dados na tabela de teachers
    // espera a funçao fazer a sua função.
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            ${proffyValue.name},
            ${proffyValue.avatar},
            ${proffyValue.whatsapp},
            ${proffyValue.bio}
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
        ${proffyValue.subject},
        ${proffyValue.cost},
        ${proffy_id}
    );
`)

    const class_id = insertedProffy.lastID

    // inserir dados na tabela classes

};