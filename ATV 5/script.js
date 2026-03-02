// script.js
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const endereco = document.getElementById('endereco').value.trim();

    if (endereco === "") {
        alert("Por favor, insira um endereço válido.");
        return;
    }

    // Criação da URL para a API ViaCEP
    const url = `https://viacep.com.br/ws/${encodeURIComponent(endereco)}/json/`;

    // Requisição à API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.style.display = 'block';

            if (data.erro) {
                resultadoDiv.innerHTML = `<p class="error">Endereço não encontrado.</p>`;
            } else {
                const { cep, logradouro, bairro, localidade, uf } = data;
                resultadoDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${cep}</p>
                    <p><strong>Rua:</strong> ${logradouro}</p>
                    <p><strong>Bairro:</strong> ${bairro}</p>
                    <p><strong>Cidade:</strong> ${localidade}</p>
                    <p><strong>Estado:</strong> ${uf}</p>
                `;
            }
        })
        .catch(error => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.style.display = 'block';
            resultadoDiv.innerHTML = `<p class="error">Erro ao buscar o CEP. Tente novamente mais tarde.</p>`;
        });
});