// Função para atualizar a data em tempo real
function updateDate() {
    const currentDateElement = document.getElementById('currentDate');
    const currentDate = new Date();

    // Dias da semana em Português
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const currentWeekday = weekdays[currentDate.getDay()];

    // Obtém a data no formato 'DD/MM/AAAA'
    const formattedDate = currentDate.toLocaleDateString('pt-BR');

    currentDateElement.textContent = `${currentWeekday}, ${formattedDate}`;
}

// Função para atualizar a hora em tempo real
function updateTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const currentTime = new Date();

    // Obtém a hora e o minuto no formato 'HH:MM'
    const formattedTime = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit',  minute: '2-digit' });

    currentTimeElement.textContent = `Hora: ${formattedTime}`;
}

// Chama as funções de atualização inicialmente
updateDate();
updateTime();

// Atualiza a data a cada dia
setInterval(updateDate, 86400000); // 86400000 milissegundos = 1 dia

// Atualiza a hora a cada minuto
setInterval(updateTime, 60000); // 60000 milissegundos = 1 minuto

document.getElementById('accessCodeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const accessCodeInput = document.getElementById('accessCode');
    const accessCodeError = document.getElementById('accessCodeError');
    const enteredCode = accessCodeInput.value.trim();

    // Mapeamento de códigos de acesso para nomes de usuário
    const accessCodeMap = {
        'code1': 'Vitor Ribeiro',
        'code2': 'Letícia Barreto',
        'code3': 'Enrique Lopes',
        'code4': 'Thiago Negreiros',
        'code5': 'Gabriel Fonseca',
        'code6': 'Guilherme Gomes',
        'code7': 'Diego Dias',
        'code8': 'Beatriz Santos',
        'code9': 'Murilo Souza',
        'code10': 'Samuel Martins',
        'code11': 'Gabrielly Araujo',
        'code12': 'Rafael Lima',
        'code13': 'Anna Lima',
        'code14': 'Nicolas Souza',
        'code15': 'Luis Oliveira',
        'code16': 'João Rodrigues',
        'code17': 'Felipe Gomes',
        'code18': 'Igor Dias',
        'code19': 'Antônio Oliveira',
        'code20': 'Marisa Carvalho',

        // Adicione mais códigos e nomes conforme necessário
    };

    if (enteredCode in accessCodeMap) {
        const username = accessCodeMap[enteredCode];
        localStorage.setItem('username', username);
        accessCodeInput.value = ''; // Limpa o campo após salvar
        accessCodeError.textContent = `Acesso Liberado ${username}!`; // Exibe a mensagem de boas-vindas
    } else {
        accessCodeError.textContent = 'Código inválido!';
    }

    // Exibir a mensagem por 5 segundos
    setTimeout(() => {
        accessCodeError.textContent = '';
    }, 5000);
});

// Adiciona evento de clique para o botão "Cancelar"
document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('accessCode').value = ''; // Limpa o campo de código de acesso
});