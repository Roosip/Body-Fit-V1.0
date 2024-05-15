window.addEventListener('storage', function(event) {
    if (event.key === 'username') {
        document.getElementById('name').value = event.newValue || '';
        startTimer();
    }
});

document.getElementById('name').value = localStorage.getItem('username') || '';
startTimer();

function startTimer() {
    const name = localStorage.getItem('username');
    if (!name) return; // Se não houver nome, não inicia o contador

    const entryTime = new Date();
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const entryCell = document.createElement('td');
    entryCell.textContent = formatTime(entryTime); // Mudança aqui
    row.appendChild(entryCell);

    const exitCell = document.createElement('td');
    row.appendChild(exitCell);

    const elapsedCell = document.createElement('td');
    const timerSpan = document.createElement('span');
    timerSpan.className = 'timer';
    elapsedCell.appendChild(timerSpan);
    row.appendChild(elapsedCell);

    const exitButtonCell = document.createElement('td');
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Saída';
    exitButton.addEventListener('click', function() {
        const exitTime = new Date();
        const elapsedTime = Math.abs(exitTime - entryTime);
        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        exitCell.textContent = formatTime(exitTime); // Mudança aqui
        elapsedCell.textContent = `${elapsedHours.toString().padStart(2, '0')}:${elapsedMinutes.toString().padStart(2, '0')}`;
        clearInterval(intervalId);
        exitButtonCell.removeChild(exitButton);
    });
    exitButtonCell.appendChild(exitButton);
    row.appendChild(exitButtonCell);

    const recordsTable = document.getElementById('records');
    recordsTable.appendChild(row);

    // Timer para mostrar o tempo decorrido desde a entrada
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.abs(currentTime - entryTime);
        const elapsedHours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const elapsedSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        timerSpan.textContent = `${elapsedHours.toString().padStart(2, '0')}:${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function formatTime(date) { // Função para formatar apenas hora e minutos
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('pt-BR', options);
}

// Exibindo a data atual
const currentDate = new Date();
document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('pt-BR');

// Adiciona o evento de clique à imagem de resetar o localStorage
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('resetModal').style.display = 'block';
});

// Fechar o modal ao clicar em Cancelar
document.querySelector('.cancel').addEventListener('click', function() {
    document.getElementById('resetModal').style.display = 'none';
});

// Confirmar o reset e limpar o localStorage ao clicar em OK
document.querySelector('.confirm').addEventListener('click', function() {
    localStorage.clear();
    document.getElementById('name').value = '';
    document.getElementById('records').innerHTML = '';
    document.getElementById('resetModal').style.display = 'none';
    location.reload(); // Recarregar a página para atualizar a tabela
});
