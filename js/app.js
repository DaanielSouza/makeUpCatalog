//RETORNA A STRING PARA PREENCHER O BODY, RECEBE UM PRODUTO COMO PARAM
function productItem(product) {
  return `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
  <figure class="product-figure">
    <img class="imagens" src="${product.image_link}" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="erroImagem(this)">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
    <span class="product-brand background-price">${precoFormatado(product.price)}</span></div>
  </section>
  <section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${precoFormatado(product.price)}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>
</div>`;
}

function precoFormatado(e){
  return (e > 0.0 ? e * 5.5 : 0.0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function erroImagem(e){
  e.src = "./img/unavailable.png";
}

let arrayFim;

//FUNCAO PARA PREENCHER OS SELECTS DO INDEX, RECEBE ID DO SELECT E UM SET COM OS VALORES
preencheSelectComDadosSet = (id, set)=>{
  let arrayOrdenado = Array.from(set).sort();
  let select = document.getElementById(id);
  for(let item of arrayOrdenado){
    if(item != null)
      select.innerHTML += `<option value="${item}">${item}</option>`;
  }
}

function atualizaConteudoBody(limpar = false, dados){
  if(dados == ""){
    return;
  }
  let conteudo = "";

  for(let i = 0; i < dados.length; i++){
    conteudo += productItem(dados[i]);
  };

  if(limpar){
    document.getElementById("catalog").innerHTML = conteudo;
    return;
  }
  document.getElementById("catalog").innerHTML += conteudo;
}

async function pausaCarregamentoPagina(){
  setTimeout(()=>{}, 4000);
}

function ordenaMaiorNota(dados){
  return dados.sort((a,b) => {
    if(a.rating == b.rating){
      return 0;
    }

    if(a.rating < b.rating){
      return 1;
    }

    if(a.rating > b.rating){
      return -1;
    }
  });
}

function ordenaMaiorPreco(dados){
  return dados.sort((a,b) => {
    if(a.price == b.price){
      return 0;
    }

    if(a.price > b.price){
      return 1;
    }

    if(a.price < b.price){
      return -1;
    }
  });
}

function ordenaMenorPreco(dados){
  return dados.sort((a,b) => {
    if(a.price == b.price){
      return 0;
    }

    if(a.price < b.price){
      return 1;
    }

    if(a.price > b.price){
      return -1;
    }
  });
}

function ordenaAZ(dados){
  return dados.sort((a,b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA > nameB) {
      return 1;
    }
    if (nameA < nameB) {
      return -1;
    }
    return 0;
  });
}

function ordenaZA(dados){
  return dados.sort((a,b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });
}

function ordenacoes(opcao = "1", dados = arrayFim){
  switch(opcao){
    case "2":
      return ordenaMaiorPreco(dados);
    case "3":
      return ordenaMenorPreco(dados);
    case "4":
      return ordenaAZ(dados);
    case "5":
      return ordenaZA(dados);
    default:
      return ordenaMaiorNota(dados);
  }
}

function filtrar(){
  let resultado = arrayFim;
  let marca = document.getElementById("filter-brand");
  let nome = document.getElementById("filter-name");
  let tipo = document.getElementById("filter-type");
  let ordenar = document.getElementById("sort-type").value;

  if(marca.value != ""){
    resultado = resultado.filter(item => item.brand == marca.value);
  }

  if(nome.value != ""){
    resultado = resultado.filter(item => item.name == nome.value);
  }

  if(tipo.value != ""){
    resultado = resultado.filter(item => item.product_type == tipo.value);
  }

  if(resultado.length == 0){
    alert("Nenhum resultado encontrado!");
  } else {
    atualizaConteudoBody(true, ordenacoes(ordenar, resultado)); 
  }  
}

function limparFiltros(){
  document.getElementById("filter-brand").value = "";
  document.getElementById("filter-name").value = "";
  document.getElementById("filter-type").value = "";
  let ordenar = document.getElementById("sort-type");

  ordenar.value = "1";

  atualizaConteudoBody(true, ordenacoes(ordenar, arrayFim));
}

function retornaZeroSeNulo(valor){
  if(valor == null)
    return 0.0
  return parseFloat(valor)
}

function carregaDados(result){
  arrayFim = ordenacoes("1", result);
  let marcas = new Set();
  let nomes = new Set();
  let tipos = new Set();
  textoFim = "";

  for(let i = 0; i < result.length; i++){
    arrayFim[i].rating = retornaZeroSeNulo(arrayFim[i].rating);
    arrayFim[i].price = retornaZeroSeNulo(arrayFim[i].price);
    arrayFim[i].name = arrayFim[i].name.trim()
    
    marcas.add(arrayFim[i].brand);
    nomes.add(arrayFim[i].name);
    tipos.add(arrayFim[i].product_type);
  };

  preencheSelectComDadosSet("filter-brand", marcas);
  preencheSelectComDadosSet("filter-name", nomes);
  preencheSelectComDadosSet("filter-type", tipos);
  atualizaConteudoBody(true, arrayFim)
}

document.getElementById("sort-type").addEventListener("change", (e)=>{
  filtrar();
})


requisicao = async () => { 
  let resp = await fetch("http://localhost:3000/produtos", {method: 'GET', redirect: 'follow'})
  let json = await resp.json();
  carregaDados(json);
  limparFiltros();
}
