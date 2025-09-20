# Dimensionamento de Vigas à Flexão Normal Simples

Esta é uma aplicação web interativa para o dimensionamento de seções retangulares de concreto armado submetidas à flexão normal simples, baseada nos preceitos da norma brasileira ABNT NBR 6118/2014.

A ferramenta calcula a área de aço necessária (armadura de tração e, se necessário, de compressão) e apresenta visualmente a seção transversal, os diagramas de deformação e tensão, além de um passo a passo detalhado de todos os cálculos realizados.

<p align="center">
  <img src="./images/main.png" alt="Interface Principal" width="90%" />
</p>


## Como Utilizar

Para executar a aplicação, não é necessário um servidor web. Siga os passos abaixo:

1.  Clone ou faça o download deste repositório.
2.  Navegue até a pasta do projeto.
3.  **Abra o arquivo `index.html` diretamente em seu navegador de preferência** (Google Chrome, Firefox, etc.).

Após abrir a página:
-   No painel à esquerda, insira os dados de entrada para o concreto, aço, seção transversal e o momento fletor solicitante.
-   Clique no botão **"Calcular"**.
-   Os resultados, incluindo as áreas de aço e os diagramas, serão exibidos no painel à direita.
-   Role a página para baixo para ver o passo a passo detalhado do dimensionamento.

## Funcionalidades

-   Cálculo de armadura simples e dupla.
-   Visualização gráfica da seção, deformações e tensões.
-   Apresentação detalhada da metodologia de cálculo em formato de "acordeão".
-   Interface intuitiva para entrada de dados.
-   Validação de dados de entrada para evitar erros de cálculo.

## Metodologia de Cálculo

A aplicação detalha todo o processo de cálculo em um formato de "acordeão", permitindo que o usuário inspecione cada etapa do dimensionamento, desde a definição dos parâmetros iniciais até o cálculo final das armaduras.

<p align="center">
  <img src="./images/metodologia1.png" alt="Metodologia 1" width="90%" />
</p>
<p align="center">
  <img src="./images/metodologia2.png" alt="Metodologia 2" width="90%" />
</p>

## Tecnologias Utilizadas

-   HTML5
-   CSS3
-   JavaScript (ES6+)
-   Bootstrap 5

## Desenvolvedores

-   **Márcio Wrague Moura** - Professor EE - FURG
-   **Bruno Teixeira Santos** - Acadêmico EE - FURG

## Referência Bibliográfica

As rotinas computacionais e a metodologia de cálculo foram adaptadas da seguinte obra:

> ARAÚJO, José Milton de. **Programas para dimensionamento e verificação de concreto armado**. 2014.

---

*Este projeto foi desenvolvido como uma ferramenta de apoio acadêmico para a disciplina de Concreto Armado*
