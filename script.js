
// Aqui o JavaScript pega todos os elementos da página que serão usados lista de pokémons, barra de busca, filtros, botão de modo escuro, modal de detalhes etc.


const list = document.getElementById('pokemon-list')
const search = document.getElementById('search')
const loading = document.getElementById('loading')
const btn = document.getElementById("darkModeToggle")
const pokeIcon = document.getElementById("pokeIcon")
const darkLabel = document.getElementById("darkLabel")
const typeFilter = document.getElementById('typeFilter')
const generationFilter = document.getElementById('generationFilter')
const modal = document.getElementById('pokemonModal')
const modalBody = document.getElementById('modalBody')
const closeModal = document.getElementById('closeModal')


// Guarda todos os pokémons carregados da API (1ª e 2ª geração).
let pokemons = []



// Faz 251 requisições para buscar todos os pokémons,Espera todas as respostas com Promise.all.
async function loadPokemons() {
    loading.style.display = "block"
    const requests = []
    for (let i = 1; i <= 251; i++) {
        requests.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()))
    }
    pokemons = await Promise.all(requests)
    loading.style.display = "none"
    showPokemons(pokemons)
}



// Remove o efeito de seleção quando um card é desmarcado.
function clearActiveCard() {
    document.querySelectorAll('.card.active').forEach(c => c.classList.remove('active'))
}



// Limpa a lista,Cria um card para cada Pokémon com as informações básicas (imagem, nome, ID, tipos).Adiciona evento de clique para abrir o modal com detalhes.
function showPokemons(listData) {
    list.innerHTML = ''
    listData.forEach(p => {
        const types = p.types.map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`).join('')
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
            <img src="${p.sprites.other['official-artwork'].front_default}">
            <h3 class="pokemon-name">${p.name}</h3>
            <p class="pokemon-id">#${p.id}</p>
            <div class="types">${types}</div>
        `

        card.addEventListener('click', (e) => {
            e.stopPropagation()        
            clearActiveCard()
            card.classList.add('active') 
            openModal(p)
        })

        list.appendChild(card)
    })
}


// Filtra por Nome, Tipo e Geração, atualiza a lista na tela, removendo a seleção de qualquer card ativo.
function filterPokemons() {
    const value = search.value.toLowerCase()
    const type = typeFilter.value
    const gen = generationFilter.value

    const results = pokemons.filter(p => {
        const matchesName = p.name.includes(value)
        const matchesType = !type || (p.types && p.types.length > 0 && p.types.some(t => t.type.name === type))

        let matchesGen = true
        if (gen !== "") {
            const id = p.id
            if (gen == "1") matchesGen = id >= 1 && id <= 151
            if (gen == "2") matchesGen = id >= 152 && id <= 251
        }

        return matchesName && matchesType && matchesGen
    })

    clearActiveCard() 
    showPokemons(results)
}
// abre o modal com detalhes do pokémon selecionado.
function openModal(pokemon) {
    const types = pokemon.types.map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`).join('')
    modalBody.innerHTML = `
        <h2>${pokemon.name} (#${pokemon.id})</h2>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" style="width:200px">
        <p><strong>Tipos:</strong> ${types}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    `
    modal.style.display = 'block'
}
// Ativa o filtro quando o usuário digita ou muda opções.
search.addEventListener('input', filterPokemons)
typeFilter.addEventListener('change', filterPokemons)
generationFilter.addEventListener('change', filterPokemons)


// Alterna entre claro/escuro e troca a pokébola do botão.
btn.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    if (document.body.classList.contains("dark")) {
        pokeIcon.src = "pokebola-preta.png"
        darkLabel.innerText = "Modo escuro"
    } else {
        pokeIcon.src = "pokebola-vermelha.png"
        darkLabel.innerText = "Modo claro"
    }
})


// Fecha o modal ao clicar no X ou fora da caixa.
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'
    clearActiveCard()
})

window.addEventListener('click', e => {
    if (e.target == modal) {
        modal.style.display = 'none'
        clearActiveCard()
    }
})


// Chama a função que carrega tudo quando a página abre.
loadPokemons()
