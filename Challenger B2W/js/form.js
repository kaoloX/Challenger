const btnScheduleToNow = document.querySelector('#scheduleToNow');


btnScheduleToNow.addEventListener('click', e => {
    e.preventDefault();
    const initialDateInput = document.querySelector('#dataInicial');
    initialDateInput.value = dataAtual();

})

function dataAtual() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today
}