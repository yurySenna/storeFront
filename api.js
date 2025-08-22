// Função de carregar categorias normalmente
async function carregarSecao(categorias, containerId) {
  try {
    const resposta = await fetch(`https://storebackend-5dsn.onrender.com/produtos/${categorias}`);
    const produtos = await resposta.json();

    const container = document.getElementById(containerId);
    container.innerHTML = '';


    produtos.forEach(produto => {
      const precoantigo = Number(produto.precoantigo).toLocaleString('pt-BR', {
        style: 'decimal',
        currency: 'BRL'
    });

    const precoatual = Number(produto.precoatual).toLocaleString('pt-BR', {
        style: 'decimal',
        currency: 'BRL'
    });
      const card = `
                 <div class="card" onclick='abrirModal(${JSON.stringify(produto)})'>
                    <div class="caixa-img">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                    </div>
                    <div class="texto-produto">
                        <h2>${produto.nome}</h2>
                        <p>${produto.descricao}</p>
                        <p>De <s>R$ ${precoantigo}</s></p>
                        <span><strong>Por R$ ${precoatual}</strong></span>
                        <button onclick="adicionarAoCarrinho('${produto.nome}', '${precoatual}')">
                             Compre Agora
                         </button>
                         
                        
                    </div>
                    
                </div>
            `;
      container.innerHTML += card;
    });
  } catch (erro) {
    console.error(`Erro ao carregar ${categorias}:`, erro);
  }
}

// Carregar seções normais
carregarSecao('Smartphones', 'secao-smartphones');
carregarSecao('Eletrodomesticos', 'secao-eletro');
carregarSecao('TVs', 'secao-tvs');
carregarSecao('Tablets', 'secao-tablets');
carregarSecao('Notebooks', 'secao-notebooks');
carregarSecao('Games', 'secao-games');
carregarSecao('Mais vendidos', 'secao-maisVendidos');
carregarSecao('Salao', 'secao-salao');
carregarSecao('promocao', 'secao-promocao');
carregarSecao('Smartwatches', 'secao-smartwatch');
carregarSecao('Drones', 'secao-drones');
carregarSecao('Airpods', 'secao-airpods');


// funcao de buscar pelo input no header
const searchInput = document.getElementById('searchInput');
const searchContainer = document.getElementById('secao-busca'); // crie uma seção para resultados

async function buscarProdutos(termo) {
  try {
    const resposta = await fetch(`https://storebackend-5dsn.onrender.com/buscar?q=${encodeURIComponent(termo)}`);
    const produtos = await resposta.json();

    searchContainer.innerHTML = ''; // limpa resultados anteriores

    if (produtos.length === 0) {
      searchContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }

    produtos.forEach(produto => {
      const precoantigo = Number(produto.precoantigo).toLocaleString('pt-BR', {
        currency: 'BRL'
    });

    const precoatual = Number(produto.precoatual).toLocaleString('pt-BR', {
        currency: 'BRL'
    });
      const card = `
        <div class="card">
          <div class="caixa-img">
            <img src="${produto.imagem}" alt="${produto.nome}">
          </div>
          <div class="texto-produto">
            <h2>${produto.nome}</h2>
            <p>${produto.descricao}</p>
            <p>De <s>R$ ${precoantigo}</s></p>
            <span><strong>Por R$ ${precoatual}</strong></span>
            <button onclick="adicionarAoCarrinho('${produto.nome}', '${precoatual}')">
              Compre Agora
            </button>
          </div>
        </div>
      `;
      searchContainer.innerHTML += card;
    });

  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
  }
}

// Evento no input (em tempo real)
searchInput.addEventListener('input', () => {
  const termo = searchInput.value.trim();
  if (termo) {
    buscarProdutos(termo);
  } else {
    searchContainer.innerHTML = '';
  }
});



