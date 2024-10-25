function generateContract() {
    // Validação para verificar se os campos estão preenchidos
    const locador = document.getElementById('locador').value.trim();
    const rgLocador = document.getElementById('rg-locador').value.trim();
    const cpfLocador = document.getElementById('cpf-locador').value.trim();
    const locatario = document.getElementById('locatario').value.trim();
    const rgLocatario = document.getElementById('rg-locatario').value.trim();
    const cpfLocatario = document.getElementById('cpf-locatario').value.trim();
    const imovel = document.getElementById('imovel').value.trim();
    const valor = document.getElementById('valor').value.trim();
    const prazo = document.getElementById('prazo').value.trim();
    const calcao = document.getElementById('calcao').value.trim();
    const testemunha1 = document.getElementById('testemunha1').value.trim();
    const testemunha2 = document.getElementById('testemunha2').value.trim();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!locador || !rgLocador || !cpfLocador || !locatario || !rgLocatario || !cpfLocatario || !imovel || !valor || !prazo || !calcao || !testemunha1 || !testemunha2) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Texto do contrato
    const contractText = `CONTRATO DE LOCAÇÃO DE IMÓVEL

LOCADOR: ${locador}, RG: ${rgLocador}, CPF: ${cpfLocador}
LOCATÁRIO: ${locatario}, RG: ${rgLocatario}, CPF: ${cpfLocatario}

1. OBJETO
O LOCADOR cede para locação ao LOCATÁRIO o imóvel situado em ${imovel}.

2. PRAZO
A locação terá o prazo de ${prazo} meses, iniciando-se em ${new Date().toLocaleDateString()}.

3. VALOR
O aluguel mensal será de R$ ${valor}, a ser pago até o dia 5 de cada mês.

4. CALÇÃO
O LOCATÁRIO pagará ao LOCADOR, a título de calção, o valor de R$ ${calcao}, que será devolvido ao final da locação, descontados eventuais débitos.

5. DISPOSIÇÕES GERAIS
5.1. O LOCATÁRIO declara ter vistoriado o imóvel e o recebe em perfeitas condições de uso.
5.2. É vedada a sublocação total ou parcial do imóvel sem prévia autorização do LOCADOR.
5.3. Quaisquer benfeitorias só poderão ser realizadas com autorização prévia do LOCADOR.

6. FORO
Fica eleito o foro da Comarca onde se situa o imóvel para dirimir quaisquer dúvidas provenientes deste contrato.

E por estarem justos e contratados, assinam o presente em duas vias de igual teor.

${new Date().toLocaleDateString()}

_______________________
${locador} (LOCADOR)

_______________________
${locatario} (LOCATÁRIO)

_______________________
${testemunha1} (TESTEMUNHA 1)

_______________________
${testemunha2} (TESTEMUNHA 2)`;

    // Exibe o contrato gerado
    document.getElementById('contract-output').innerText = contractText;
    document.getElementById('download-btn').disabled = false;
}

function downloadContract() {
    // Inicializa o jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Pega o texto do contrato
    const contractText = document.getElementById('contract-output').innerText;

    // Adiciona o texto ao PDF com controle de margens e quebra de linha
    const lineHeight = 10; // Altura entre as linhas
    const marginLeft = 10; // Margem esquerda
    const marginRight = 10; // Margem direita
    const pageWidth = doc.internal.pageSize.getWidth(); // Largura da página
    const maxLineWidth = pageWidth - marginLeft - marginRight; // Largura máxima de linha
    const lines = doc.splitTextToSize(contractText, maxLineWidth); // Divide o texto em várias linhas, respeitando a largura máxima

    // Adiciona o texto ao PDF, linha por linha
    let currentHeight = 10; // Posição inicial no eixo Y
    lines.forEach((line) => {
        if (currentHeight + lineHeight > doc.internal.pageSize.getHeight() - 10) {
            // Se o texto ultrapassar a página, adiciona uma nova página
            doc.addPage();
            currentHeight = 10; // Reseta a altura para o topo da nova página
        }
        doc.text(line, marginLeft, currentHeight);
        currentHeight += lineHeight; // Atualiza a altura atual
    });

    // Gera e baixa o PDF com o nome "contrato-locacao.pdf"
    doc.save('contrato-locacao.pdf');
}
