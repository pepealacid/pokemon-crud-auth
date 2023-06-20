import axios from 'axios'

class PokemonService {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:5005/api/pokemons"
        })
    }

    create(data){
        return this.api.post("/", data);
    }

    edit(id, data){
        return this.api.put(`/${id}`, data);
    }

    delete(id){
        return this.api.delete(`/${id}`);
    }

    getAll(){
        return this.api.get(`/`);
    }

    getOne(id){
        return this.api.get(`/${id}`);
    }

    addPokemon(id){
            return this.api.post(`/add-pokemon/${id}`)
        }
    }

const pokemonService = new PokemonService()

export default pokemonService;