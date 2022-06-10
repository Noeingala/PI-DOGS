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
    try {
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
    } catch (error) {
        console.log(error)
    }
};

const getDbInfo = async () => {
    try {
        return await Dog.findAll({ 
            include:{ 
                model: Temperament, 
                attributes: ['name'], 
                through: {
                    temperaments: [],
                },
            }
        })
    } catch (error) {
        console.log(error)
    }
};

const getAllDogs = async () => {
    try {
        const apiInfo = await getApiInfo(); 
        const dbInfo = await getDbInfo(); 
        const totalInfo = apiInfo.concat(dbInfo) 
        return totalInfo
    } catch (error) {
        console.log(error)
    }
};

//---------------GET/DOGS-----------------//

router.get('/dogs', async (req, res, next) => {
    try {
        const { name } = req.query;
        const dogsTotal = await getAllDogs();
      
        if (!name) {
          res.status(200).json(dogsTotal);
        } else {
          const filtrados = dogsTotal.filter((e) => {
            const names = e.name.toUpperCase();
            if (names.includes(name.toUpperCase())) return names;
          });
          filtrados.length 
          ? res.status(200).json(filtrados)
          : res.status(400).send('Raza no encontrada');
        }
    } catch (error) {
        next(error)
    }
  });


//-------------GET/TEMPERAMENT------------//

router.get('/temperament', async (req, res, next)=>{
    try {
        const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds')
        const temperament = temperamentApi.data.map(e => e.temperament)
        .toString()
        .trim()
        .split(',');
        const filtrado = temperament.filter(e => e);
       const filtradoEach =[... new Set (filtrado)]; //
       //console.log(filtradoEach)
       filtradoEach.forEach(e =>{
          Temperament.findOrCreate({// se fija si esta y si no esta lo crea 
             where: {name: e},
          })
       })
       const todosTemperaments =await Temperament.findAll();
       res.json(todosTemperaments);
    } catch (error) {
        next(error)
    }

});

//---------------POST/DOG-----------------//

router.post('/dog', async(req, res, next)=>{
    try {
        const {
            name,
            height,
            weight,
            life_span,
            temperament,
            createdInDb,
            image,
          } = req.body;
            
          const [createDog] = await Dog.findOrCreate({
              where:{
                name: name,
                height: height,
                weight: weight,
                life_span: life_span,
                createdInDb: true,
                image: image,
             }
        })
        // console.log(createDog)
        temperament.forEach(async(t) => {
            const temperamentDb = await Temperament.findOne({where: {name : t}})
            await createDog.addTemperament(temperamentDb)
        })
        res.send('Raza creada con exito')
    } catch (error) {
        next(error)
    }
});

//---------------GET/DOGS/ID--------------//

router.get('/dogs/:id', async(req, res, next)=>{
    try {
        const { id } = req.params
        const dogsTotal = await getAllDogs()
        if(id){
            let dogId = await dogsTotal.filter(e => e.id == id)
            dogId.length 
            ? res.status(200).json(dogId) 
            : res.status(404).send('Raza no encontrada')
        }
    } catch (error) {
        next(error)
    }
});

// router.delete('/dogs/:id', async (req,res)=>{
//     const {id} = req.params;
//     const dogsTotal = await getAllDogs()
//       if(id){
//     try {
//       const unico = await dogsTotal.findByPk(id)
//       if(unico){
//         unico.destroy({where:{id:id}})
//         res.status(200).send('Perro eliminado correctamente')
//       }
//       res.status(400).send('no se logro eliminar el perro')
//     } catch (error) {
//       res.status(400).send('no se pudo eliminar el perro')
//     }
//   }
// })

// router.delete('/dogs/:id', async (req, res) => {
//     let { id } = req.params;
//     const dogsTotal = await getAllDogs()
//     const findeo = dogsTotal.find((p) => p.id === parseInt(id));
//     if (!id || !findeo) {
//       return res
//         .status(400)
//         .json('no se pudo eliminar el perro');
//     }
//     posts = dogsTotal.filter((f) => f.id !== parseInt(id));
//     res.json({ success: true });
//   });

// router.delete('/dogs/:id', async (req,res)=>{
//     try {
//         const { id } = req.params;
//         const dogsTotal = await getAllDogs()
//         if(id){
//             dogsTotal.destroy({where:{id:id}})
//             res.status(200).send('se elimino')
//         }
//     } catch (error) {
//         res.status(400).send('no se elimino')
//     }
// })

module.exports = router;
