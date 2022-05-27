const { Router } = require('express');
const { Dog, Temperament } = require("../db");
const { default: axios } = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const dogs = require('./dogs')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => { 
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds'); 
    const apiInfo = await apiUrl.data.map(e => {
        return {
            name: e.name,
            id: e.id,
            height: e.height.imperial,
            weight: e.weight.imperial,
            life_span: e.life_span,
            temperament: e.temperament, 
            image: e.image.url,
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({ 
        include:{ 
            model: Temperament, 
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    })
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo(); 
    const dbInfo = await getDbInfo(); 
    const totalInfo = apiInfo.concat(dbInfo) 
    return totalInfo
};

//---------------GET/DOGS-----------------//

router.get('/dogs', async(req,res) =>{
    const { name } = req.query
    let dogsTotal = await getAllDogs()
    if(name){ 
        let dogName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())); 
        dogName.length
        ? res.status(200).send(dogName) 
        : res.status(404).send('No se encontro la raza ingresada') 
    } else { 
        res.status(200).send(dogsTotal)
    }
});

//-------------GET/TEMPERAMENT------------//

router.get('/temperament', async (req, res)=>{
    const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds')
    const temperament = temperamentApi.data.map(e => e.temperament)
    .toString()
    .trim()
    .split(/\s*,\s*/);
    const filtrado = temperament.filter(e => e);
   const filtradoEach =[... new Set (filtrado)];
   //console.log(filtradoEach)
   filtradoEach.forEach(e =>{
      Temperament.findOrCreate({// se fija si esta y si no esta lo crea 
         where: {name: e},
      })
   })
   const todosTemperaments =await Temperament.findAll();
   res.json(todosTemperaments);

});

//-------------POST/DOG--------------//

router.post('/dog', async(req, res)=>{
    const {
        name,
        height,
        weight,
        life_span,
        temperament,
        createdInDb,
        image,
      } = req.body;

      const createDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        life_span: life_span,
        createdInDb: createdInDb,
        image: image,
      })

    const temperamentDb = await Temperament.findAll({where: {name : temperament}})
    createDog.addTemperament(temperamentDb)
    res.send('Raza creada con exito')
});

//--------------GET/DOGS/ID-------------//

router.get('/dogs/:id', async(req, res)=>{
    const { id } = req.params
    const dogsTotal = await getAllDogs()
    if(id){
        let dogId = await dogsTotal.filter(e => e.id == id)
        dogId.length 
        ? res.status(200).json(dogId) 
        : res.status(404).send('Raza no encontrada')
    }
});

module.exports = router;
