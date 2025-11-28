# 📘  Pokédex — Projeto Web

Este projeto é uma Pokédex interativa desenvolvida em HTML, CSS e JavaScript, consumindo dados diretamente da PokéAPI.
O objetivo é permitir que o usuário visualize Pokémon das 1ª e 2ª gerações, aplique filtros, abra detalhes em um modal e alterne entre modo claro e modo escuro.

## 📌 Funcionalidades Principais

✔️ Listagem dos 251 Pokémon da 1ª e 2ª geração

✔️ Busca por nome

✔️ Filtro por tipo (fire, water, grass etc.)

✔️ Filtro por geração

✔️ Modo Claro / Escuro

✔️ Modal com detalhes completos

✔️ Interface inspirada na Pokédex clássica

✔️ Imagem do Ash e da Equipe Rocket fixas na tela

## 🛠️ Tecnologias Utilizadas
Tecnologia	Função
HTML5	Estrutura da página
CSS3	Estilização da interface (cores, layout, animações)
JavaScript	Lógica da aplicação
PokéAPI	Fonte de dados dos Pokémon
Ubuntu + VS Code	Ambiente de desenvolvimento

### 🔌 API Utilizada

O projeto usa a API:

https://pokeapi.co/api/v2/pokemon/{id}


Onde {id} é o número do Pokémon.
São feitas 251 requisições para carregar os Pokémon das duas primeiras gerações.


## 📂 Estrutura do Projeto
/  <br>
|-- index.html <br>
|-- style.css <br>
|-- script.js <br>
|-- ash.png <br>
|-- equipe-rocket.png <br>
|-- pokedex.png <br>
|-- pokebola-vermelha.png <br>
|-- pokebola-preta.png <br>

## ▶️ Como Executar o Projeto

Faça o download do projeto ou clone o repositório:

git clone https://github.com/JoaoAugustoFD/A3_Unisul_Pokedex.git


Abra a pasta no VS Code.

Clique com o botão direito no arquivo index.html → Open with Live Server,
ou simplesmente abra o arquivo no navegador.



## 🧠 Como Funciona a Lógica (Resumo)

O arquivo script.js faz 251 requisições à PokéAPI.

Os Pokémon são salvos em um array pokemons.

A função showPokemons() cria os cards de cada Pokémon.

filterPokemons() aplica busca, filtro de tipo e filtro de geração.

Ao clicar no card, abre um modal com detalhes completos.

O botão do canto ativa o modo escuro, trocando a aparência do site.
