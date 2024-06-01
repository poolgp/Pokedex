<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Pokémon List</h1>
    
    <!-- Secció per l'equip de Pokémon -->
    <div class="team-container mb-4">
      <div v-for="(pokemon, index) in team" :key="index" class="team-slot" @click="removeFromTeam(index)">
        <img v-if="pokemon" :src="pokemon.sprites.front_default" class="team-img" alt="team pokemon" />
      </div>
      <!-- Afegir quadrats buits si l'equip no té 6 membres -->
      <div v-for="index in 6 - team.length" :key="'empty-' + index" class="team-slot"></div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4" v-for="pokemon in pokemonList" :key="pokemon.id">
        <div class="card h-100 position-relative">
          <img :src="pokemon.sprites.front_default" class="card-img-top" :alt="pokemon.name" />
          <div class="plus-icon" @click="addToTeam(pokemon)">
            <i :class="isFavorite(pokemon) ? 'fas fa-heart text-danger' : 'far fa-plus'"></i>
          </div>
          <div class="favorite-icon" @click="toggleFavorite(pokemon)">
            <i :class="isFavorite(pokemon) ? 'fas fa-heart text-danger' : 'far fa-heart'"></i>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <p class="card-text">nº {{ pokemon.id }}</p>
            <p class="card-text">
              Type:
              <span v-for="(type, index) in pokemon.types" :key="index">
                {{ type.type.name }}<span v-if="index < pokemon.types.length - 1">, </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPokemon } from "../services/pokemonService";

export default {
  data() {
    return {
      pokemonList: [],
      favorites: [], // Llista d'IDs dels Pokémon favorits
      team: [], // Equip de Pokémon
      error: null,
    };
  },
  async created() {
    try {
      this.pokemonList = await fetchPokemon();
    } catch (err) {
      this.error = "Error fetching Pokémon data.";
    }
  },
  methods: {
    toggleFavorite(pokemon) {
      const index = this.favorites.indexOf(pokemon.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(pokemon.id);
      }
    },
    isFavorite(pokemon) {
      return this.favorites.includes(pokemon.id);
    },
    addToTeam(pokemon) {
      if (this.team.length < 6 && !this.team.includes(pokemon)) {
        this.team.push(pokemon);
      }
    },
    removeFromTeam(index) {
      this.team.splice(index, 1);
    }
  },
};
</script>

<style scoped>
.card-img-top {
  height: 150px; /* Ajusta l'altura per fer les cartes més petites */
  object-fit: contain;
}

.favorite-icon {
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

.plus-icon {
  height: 38px;
  width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 50px;
  cursor: pointer;
  font-size: 24px;
}

.text-danger {
  color: red !important;
}

.text-white {
  color: white !important;
}

/* Estils per l'equip de Pokémon */
.team-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.team-slot {
  width: 80px; /* Ajusta l'ample per fer els quadrats més petits */
  height: 80px; /* Ajusta l'altura per fer els quadrats més petits */
  border: 2px solid #ccc;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.team-img {
  max-width: 100%;
  max-height: 100%;
}
</style>
