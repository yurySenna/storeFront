// menu lateral
function mostrarMenu() {
  document.getElementById('menu-lateral').classList.toggle('mostrar');

   const botoes = [
  { nome: 'Iphone', link: 'paginas/smartphones.html' },
  { nome: 'iPad', link: '/paginas/tablets.html' },
  { nome: 'Macbook', link: '/paginas/notebooks.html' },
  { nome: 'PS5', link: '/paginas/games.html' },
  { nome: 'DJI', link: '/paginas/drones.html' },
  { nome: 'AirPods', link: '/paginas/airpods.html' },
  { nome: 'Salão', link: '/paginas/salao.html' },
  { nome: 'TVs', link: '/paginas/tv-video.html' },
  { nome: 'Smartwatches', link: '/paginas/smartwatch.html' },
  { nome: 'Áudio', link: '/paginas/audio.html' }
];

// Pega o menu do HTML
const botoesFloat = document.getElementById('btn-nav-menu');
botoesFloat.innerHTML = "";

// Cria cada botão com link
botoes.forEach(i => {
  const a = document.createElement('a'); 
  a.href = i.link;                     
  a.className = 'item-menu';              
  a.innerHTML = `
    <span>${i.nome}</span>
  `;
  botoesFloat.appendChild(a); 
});

 const itemMenu = [
  { nome: 'Smartphones', link: '/paginas/smartphones.html' },
  { nome: 'Tablets', link: '/paginas/tablets.html' },
  { nome: 'Notebooks', link: '/paginas/notebooks.html' },
  { nome: 'Games', link: '/paginas/games.html' },
  { nome: 'Informática', link: '/paginas/informatica.html' },
  { nome: 'Drones', link: '/paginas/drones.html' },
  { nome: 'Eletrodomésticos', link: '/paginas/eletrodomesticos.html' },
  { nome: 'Salão', link: '/paginas/salao.html' },
  { nome: 'Tv e Video', link: '/paginas/tv-video.html' },
  { nome: 'Smartwatches', link: '/paginas/smartwatches.html' },
  { nome: 'Áudio', link: '/paginas/audio.html' }
];


const menu = document.getElementById('menu');
menu.innerHTML = "";


itemMenu.forEach(item => {
  const a = document.createElement('a');  
  a.href = item.link;                     
  a.className = 'item-menu';              
  a.innerHTML = `
    <span>${item.nome}</span>
    <button><img src="img/iconright.png" alt=""></button>
  `;
  menu.appendChild(a); 
});

const itemMarca = [
  { nome: 'Apple', link: 'smartphones.html' },
  { nome: 'Samsung', link: 'smartwatches.html' },
  { nome: 'Redimi', link: 'smartphones.html' },
  { nome: 'Motorola', link: 'smartphones.html' },
  { nome: 'LG', link: 'smartphones.html' },
  { nome: 'Lenovo', link: 'smartphones.html' },
  { nome: 'Dell', link: 'informatica.html' },
  { nome: 'Mondial', link: 'informatica.html' },
  { nome: 'Eletrolux', link: 'eletrodomesticos.html' }

];
const marca = document.getElementById('marca');
marca.innerHTML = '';

// Cria cada botão com link
itemMarca.forEach(ite => {
  const a = document.createElement('a');  
  a.href = ite.link;                     
  a.className = 'item-menu';              
  a.innerHTML = `
    <span>${ite.nome}</span>
    <button><img src="img/iconright.png" alt=""></button>
  `;
  marca.appendChild(a);
});
}

function fecharMenu() {
  document.getElementById('menu-lateral').classList.remove('mostrar');
}

function mostrarCep() {
  document.getElementById('fundo-cep').classList.toggle('aberto');
  

}

async function buscarCep() {
  let cep = document.getElementById('txt-cep').value
  let res = document.getElementById('res')

  const URL = 'https://brasilapi.com.br/api/cep/v1/'

  let response = await fetch(URL + cep)

  let data = await response.json()

  res.innerHTML = `${data.street},<br> ${data.neighborhood},<br>  ${data.city}-${data.state}

`

}

function fecharCep() {
  document.getElementById('fundo-cep').classList.remove('aberto');

}

function abrirLogin() {
  document.getElementById('card-login').classList.add('active');
}

function fecharLogin() {
  document.getElementById('card-login').classList.remove('active');
}

function abrirModal(produto) {
  document.getElementById("modal-nome").innerText = produto.nome;
  document.getElementById("modal-desc").innerText = produto.descricao;
  document.getElementById("modal-preco-antigo").innerHTML = "De <s>R$ " + produto.precoantigo + "</s>";
  document.getElementById("modal-preco").innerText = "Por R$ " + produto.precoatual;
  document.getElementById("modal-img").src = produto.imagem;

  // botão de compra dentro do modal
  document.getElementById("modal-btn").onclick = () => {
    adicionarAoCarrinho(produto.nome, produto.precoatual);
  };

  // exibe modal
  document.getElementById("modal").style.display = "flex";
}

// fechar modal
document.getElementById("fechar").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

  //  codigo banner carrocel
let current = 0;
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');

function showSlide(index, direction) {
  const currentItem = items[current];
  const nextItem = items[index];

  currentItem.classList.remove('active');
  currentItem.style.transform = `translateX(${direction > 0 ? '-100%' : '100%'})`;
  currentItem.style.opacity = 0;

  nextItem.style.transform = `translateX(${direction > 0 ? '100%' : '-100%'})`;
  nextItem.style.opacity = 0;


  requestAnimationFrame(() => {
    nextItem.classList.add('active');
    nextItem.style.transform = 'translateX(0)';
    nextItem.style.opacity = 1;
  });

  dots[current].classList.remove('active');
  dots[index].classList.add('active');
  current = index;
}

document.getElementById('next').addEventListener('click', () => {
  let next = (current + 1) % items.length;
  showSlide(next, 1);
});

document.getElementById('prev').addEventListener('click', () => {
  let prev = (current - 1 + items.length) % items.length;
  showSlide(prev, -1);
});

//codigo carrinho compras
function adicionarAoCarrinho(produto, precoatual) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push({ produto, precoatual });
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContador();
  alert(`${produto} foi adicionado ao carrinho!`);

}

function atualizarContador() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  document.getElementById('contador-carrinho').textContent = carrinho.length;
}

function abrirCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const container = document.getElementById('itens-carrinho');

  container.innerHTML = carrinho.map((item, index) => `
    <div class="item-carrinho">
      <strong>${item.produto}</strong><br>
      R$ ${item.precoatual}
      <button onclick="removerItem(${index})">X</button>
    </div>
  `).join('');

  document.getElementById('carrinho').classList.add('aberto');

}

function fecharCarrinho() {
  document.getElementById('carrinho').classList.remove('aberto');
}

function finalizar() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const tot = document.getElementById('total');

  const total = carrinho.reduce((soma, item) => {
    const precoAtual = parseFloat(item.precoatual) || 0; // garante número
    const quantidade = parseInt(item.quantidade) || 1;

    return soma + (precoAtual * quantidade);
  }, 0);

  // Formatar em Real (BRL)
  tot.innerHTML = `Total: ${total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })}`;

  atualizarContador();
}


const toggle = document.getElementById("menu");

const nav = document.getElementById("nav");

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  atualizarContador();
  document.getElementById('itens-carrinho').innerHTML = '';
  document.getElementById('total').innerHTML = 'R$ 0,00';

}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  abrirCarrinho();
  atualizarContador();
}

// const prevButton = document.getElementById('prev')
// const nextButton = document.getElementById('next')
// const items = document.querySelectorAll('.item')
// const dots = document.querySelectorAll('.dot')
// const numberIndicator = document.querySelector('.numbers')
// const list = document.querySelector('.list')


// let active = 0;
// const total = items.length
// let timer;


// function update(direction) {

//     document.querySelector('.item.active').classList.remove('active')
//     document.querySelector('.dot.active').classList.remove('active')


//     if (direction > 0) {
//         active = active + 1
//         if (active === total) {
//             active = 0
//         }
//     }

//     else if (direction < 0) {
//         active = active - 1

//         if (active < 0) {
//             active = total - 1
//         }

//     }

//     items[active].classList.add('active')
//     dots[active].classList.add('active')

//     numberIndicator.textContent = String(active + 1).padStart(2, '0')
// }
// clearInterval(timer)
// timer = setInterval(() => {
//     update(1)
// }, 5000);



// prevButton.addEventListener('click', () => {
//     update(-1)

// })

// nextButton.addEventListener('click', () => {
//     update(1)
// })






