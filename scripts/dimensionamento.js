// Trecho JS do código

function dimensionamento() {
  reset(); //Reseta os gráficos caso não seja a primeira vez que o usuário aperta no calcular

  if (typeof dominio !== "undefined") {
    //Essa variável só é definida no final do processo, de modo que haverá o reset quando o operador apertar o calcular da segunda vez em diante
    desenhoinicial();
  }


  // Entrada de dados - Leitura dos valores do formulário
  let fckEl = document.getElementById("fck");
  let fykEl = document.getElementById("fyk");
  let esEl = document.getElementById("es");
  let gamacEl = document.getElementById("gamac");
  let gamasEl = document.getElementById("gamas");
  let gamafEl = document.getElementById("gamaf");
  let bductEl = document.getElementById("bduct");
  let bEl = document.getElementById("b");
  let hEl = document.getElementById("h");
  let dlEl = document.getElementById("dl");
  let amkEl = document.getElementById("amk");
  
  fck1 = Number(fckEl.value);
  fyk1 = Number(fykEl.value);
  es1 = Number(esEl.value);
  gamac1 = Number(gamacEl.value);
  gamas1 = Number(gamasEl.value);
  gamaf1 = Number(gamafEl.value);
  bduct1 = Number(bductEl.value);
  b1 = Number(bEl.value);
  h1 = Number(hEl.value);
  dl1 = Number(dlEl.value);
  d1 = h1 - dl1;
  amk1 = Number(amkEl.value);

  // Parâmetros do diagrama retangular
  if (fck1 <= 50) {
    alamb = 0.8;
    alfac = 0.85;
    eu = 3.5;
    qlim = 0.8 * bduct1 - 0.35;
  } else {
    alamb = 0.8 - (fck1 - 50) / 400;
    alfac = 0.85 * (1 - (fck1 - 50) / 200);
    eu = 2.6 + 35 * ((90 - fck1) / 100) ** 4;
    qlim = 0.8 * bduct1 - 0.45;
  }
  // Conversão de unidades: transformando para kN e cm
  let amk_calc = 100 * amk1;
  let fck_calc = fck1 / 10;
  let fyk_calc = fyk1 / 10;
  let es_calc = 100 * es1;
  // Resistências de cálculo
  fcd = fck_calc / gamac1;
  tcd = alfac * fcd;

  fyd = fyk_calc / gamas1;
  amd = gamaf1 * amk_calc;

  // Parâmetro geométrico
  delta = dl1 / d1;
  // Momento limite
  amilim = alamb * qlim * (1 - 0.5 * alamb * qlim);
  // Momento reduzido solicitante
  ami = amd / (b1 * d1 * d1 * tcd);

  if (ami <= amilim) {
    // Armadura simples
    qsi = (1 - Math.sqrt(1 - 2 * ami)) / alamb;

    aas = (alamb * qsi * b1 * d1 * tcd) / fyd;
    asl = 0;
  } else {
    // Armadura dupla
    qsia = eu / (eu + 10);
    if (qlim < qsia) {
      // Evitando armadura dupla no domínio 2
      var test = 1;
      var aviso = "Aumentar a seção transversal!";
    }
    if (qlim <= delta) {
      // Evitando armadura comprimida sob tração
      var test = 1;
      var aviso = "Aumentar a seção transversal!";
    }
    // Deformação da armadura de compressão
    esl = (eu * (qlim - delta)) / qlim;
    esl = esl / 1000;
    ess = Math.abs(esl);
    eyd = fyd / es_calc;
    // Cálculo da tensão no aço
    if (ess < eyd) {
      tsl = es_calc * ess;
    } else {
      tsl = fyd;
    }
    if (esl < 0) {
      tsl = -tsl;
    }

    // Cálculo das áreas de aço quando armadura dupla
    asl = ((ami - amilim) * b1 * d1 * tcd) / ((1 - delta) * tsl);
    aas = ((alamb * qlim + (ami - amilim) / (1 - delta)) * b1 * d1 * tcd) / fyd;
  }
  // Armadura mínima
  a = 2 / 3;
  let fck_romin = fck_calc * 10; // Revertendo a conversão para o cálculo de romin
  let fyd_romin = 10 * fyd;
  if (fck_romin <= 50) {
    romin = (0.078 * fck_romin ** a) / fyd_romin;
  } else {
    romin = (0.5512 * Math.log10(1 + 0.11 * fck_romin)) / fyd_romin;
  }
  if (romin < 0.0015) {
    romin = 0.0015;
  }
  asmin = romin * b1 * h1;
  if (aas < asmin) {
    aas = asmin;
  }

  // Verificação de erros e saída de resultados
  while (
    fck1 == 0 ||
    fyk1 == 0 ||
    es1 == 0 ||
    gamac1 == 0 ||
    gamas1 == 0 ||
    gamaf1 == 0 ||
    bduct1 == 0 ||
    b1 == 0 ||
    h1 == 0 ||
    dl1 == 0
  ) {
    var test = 2;
    window.alert("[ERRO] Problema na inserção dos dados de entrada!");
    break;
  }
  if (test == 1) {
    resAco.innerHTML = `<strong>${aviso}</strong>`;
  } else if (test == 2) {
    resAco.innerHTML = `<strong>Entre com os dados corretamente!</strong>`;
  } else {
    resAco.innerHTML = `<strong>A área de aço tracionada é ${aas.toFixed(
      2
    )} cm².</strong>`;
    res1.innerHTML = `<strong>A área de aço comprimida é ${asl.toFixed(
      2
    )} cm².</strong>`;
  }

  segundodesenho();
  passoapasso();
}
