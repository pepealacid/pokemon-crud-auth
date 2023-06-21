import apiInstace from './apiInstance';

class PokemonService {
    constructor() {
        this.api = apiInstace
        }
    

    create(data){
        return this.api.post("/pokemons/", data);
    }

    edit(id, data){
        return this.api.put(`/pokemons/${id}`, data);
    }

    delete(id){
        return this.api.delete(`/pokemons/${id}`);
    }

    getAll(){
        return this.api.get(`/pokemons/`);
    }

    getOne(id){
        return this.api.get(`/pokemons/${id}`);
    }

    addPokemon(id){
            return this.api.put(`/pokemons/add-pokemon`, {id})
        }
    
    quitPokemon(id){
            return this.api.put(`/pokemons/quit-pokemon`, {id})
    }
    }

const pokemonService = new PokemonService()

export default pokemonService;