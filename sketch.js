let tabela;
let contagem = {};

// Quantidade de leis para aquele ano
let total = [0,0,0,2138, 2141, 2146, 2196, 0, 0, 2196, 0, 2199, 2200, 2200, 2211, 2211, 2212, 2213, 2215, 0, 0, 2214, 2215, 0, 2154, 2156, 2163, 2367, 2374, 2410, 2410, 2413, 2415, 2415, 2416, 2418, 2438, 2500, 2495, 2495, 0, 0, 2488, 2489, 2497, 2497, 2497, 0, 2498, 2488, 0, 2489, 2496, 2446, 2451, 2456, 2457, 2459, 2468, 2478, 2557, 2594, 2623, 0, 0, 2625, 2628, 2635, 2639, 2639, 2639, 2650, 2656, 2659, 2700, 2724, 2726, 3106, 3107, 2979, 2744, 2749, 2831, 2840, 2834];

let textos = []; // Array dos textos
let area_circulos = []; // Array para armazenar as informações da área do circulo
let circles = [];
let circles_total = [];
let ar = 4.5; // multiplicador dos raios e diametros


// Carrega o arquivo com as leis
function preload() {
  tabela = loadTable("leis_ordenadas_ano.csv", "csv", "header");
  
}

function setup() {

  createCanvas(1300, 5200);
  noLoop();
  
  // Cria um objeto que carrega a quantidade de vezes que cada ano se repete
  
  // Iterar sobre as linhas do CSV e contar os anos da primeira coluna
  for(let i = 0; i < tabela.getRowCount(); i++) {
    let year = tabela.getString(i, 0); // Pega o valor da primeira coluna (índice 0)
    
    
    // Se o valor já existe no objeto contagem, incrementa
    if (contagem[year]) {
      contagem[year] += 1;
    } else {
      contagem[year] = 1; // Caso o valor ainda não tenha sido encontrado
    }
  }
  
  // Armazena as informações da tabela no array
  for(let li of tabela.rows) {
    let texto = li.getString("Lei");
    textos.push(texto);
  }
  
/* --- COMEÇO DO DESENHO DOS CÍRCULOS ---  */
let x = 130; // x inicial
let y = 200; // y inicial

  for(let ano = 1940; ano <= 2024; ano++) {
    noStroke();
    if(ano % 5 == 0 && ano !== 1940) {
      y += 300;
      x = 130;
    }
    
    
    
    // drawCircles(x, y, Quantidade de círculos, raio max, raio de cada circulo)
    drawCircles(x, y, contagem[ano], sqrt(total[ano-1940]) * (ar / 2), sqrt(total[ano-1940]) * (ar / 2) / (sqrt(total[ano-1940])));
    
    
    // ACHO Q NAO TO USANDO MAS TBM N TA NA HORA DE FICAR EXLCUINO COISA
    //Guarda as informações do círculo no array
    // area_circulos.push({x: x, y: y, r: 0.798})
    
      
    x += 260; // Incrementa x
    
    
    // Desce a linha incrementando y e fazendo x voltar pra posicição inicial

  }
  console.log(circles_total);
  console.log(contagem)
  circles_total.forEach((obj, index) => {
    obj.mod = tabela.getString(index, "Modificação")
  });
}


function draw() {
  
  let x = 130; // x inicial
  let y = 200; // y inicial
  
  background("#ededf4");
  
  // Circulo total de leis
  fill("#c0c0cc"); 
  for(let ano = 1940; ano <= 2024; ano++) {
    
    if(ano % 5 == 0 && ano !== 1940) {
      
      y += 300;
      x = 130; 
      
    } 
    
    // Parametros do texto
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    
    if(ano >= 1943) {
      text(ano, x, y - sqrt(total[ano-1940]) * (ar / 2) - 20);
    }
    else {}
    
    if(contagem[ano] !== undefined) {
      textSize(11);
      text(total[ano - 1940] + " Leis / " + contagem[ano] + " Alterações", x, y + sqrt(total[ano-1940]) * (ar / 2) + 20);
    }
    else if (contagem[ano] == undefined && ano >= 1943) {
      text("Nenhuma alteração no ano", x, y)
    }
    else {}
    
    // Desenho do círculo
    circle(x, y, sqrt(total[ano-1940]) * ar);

    x += 260;  // Incrementa x
    
  }
  
  
  // Desenho dos círculos pequenos
  // Incluído → 0
  // Revogado → 1
  // Redação → 2
    for(let c of circles_total) {
      if(c.mod == "0") {
        fill("#84cc69");
      }
      else if(c.mod == "1") {
        fill("#ed7d74");
      }
      else {
        fill("#72b0f2");
      }
      ellipse(c.x, c.y, c.r * 2, c.r * 2);

    }
}


function mouseMoved() {
  let textToShow = "";

      for(let i = 0; i < circles_total.length; i++) {
        let c = circles_total[i];
        let d = dist(mouseX, mouseY, c.x, c.y);

        // Verifica se o mouse está sobre o círculo
        if (d < c.r) {
          textToShow = textos[i]; // Pega o texto correspondente ao círculo
          break;
        }
  }

  // Atualiza o canvas mostrando o texto se necessário
  redraw(); // Redesenha os círculos
  if(textToShow) {
    fill("#3e3e42");
    textSize(14);
    textStyle(BOLDITALIC);
    if(mouseX > width / 2) {
      textAlign(RIGHT, CENTER);
    }
    else {
      textAlign(LEFT, CENTER);
    }
    
    text(textToShow, mouseX, mouseY - 10); // Exibe o texto acima do mouse
    
  }
}