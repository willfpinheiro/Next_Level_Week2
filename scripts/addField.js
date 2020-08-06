// procurar o botao
document.querySelector("#add-time").addEventListener('click', cloneField);
// executar uma acao
function cloneField() {
    console.log('aqui')
    // Node serve para pegar elementos HTML
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    // pegar os campos
    const fields = newFieldContainer.querySelectorAll('input');
    // para cada
    fields.forEach(function (field) {
        field.value = "";
    });

    // colocar na pagina
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}
