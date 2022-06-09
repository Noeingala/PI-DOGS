import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs')
            return dispatch({
                type:'GET_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getTemperaments(){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/temperament')
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getName(name){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs?name='+name)
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        } catch (error) {
            alert('Nombre no encontrado')
        }
    }
};

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs/'+id)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function postDog(payload){
    return async function(dispatch){
        try {
            var json = await axios.post('http://localhost:3001/dog',payload)
            if(json) return json
        } catch (error) {
            console.log(error)
        }
    }
};

export function filterTemperament(payload){
    console.log(payload)
    return{
        type: 'FILTER_TEMPERAMENT',
        payload,
    }
};

export function filterExistingBreed(payload){
    console.log(payload)
    return{
        type: 'FILTER_EXISTING_BREED',
        payload,
    }
};

export function sortName(payload){
    console.log(payload)
    return{
        type: 'SORT_NAME',
        payload,
    }
};

export function sortByWeight(payload){
    console.log(payload)
    return{
        type: 'SORT_BY_WEIGHT',
        payload,
    }
};

export function sortByHeight(payload){
    return{
        type: 'SORT_BY_HEIGHT',
        payload,
    }
};



