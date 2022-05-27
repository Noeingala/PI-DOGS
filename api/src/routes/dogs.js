// const { Router } = require("express");
// // Importar todos los routers;
// const { Dog, Temperament } = require("../db");
// const { API_KEY } = process.env;
// const { default: axios } = require("axios");
// const router = Router();

// const getBd = async () => {
//   return await Dog.findAll({
//     include: {
//       model: Temperament,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
// };

// const getApiInfo = async () => {
//     try {
//       const apiUrl = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//       apiUrl.data.map(async (e) => {
//         await Dog.findOrCreate({
//           where: {
//             name: e.name,
//             id: e.id,
//             weight: e.weight.imperial,
//             height: e.height.imperial,
//             life_span: e.life_span,
//             temperament: e.temperament,
//             image: e.image.url,
//           },
//         });
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };


// const getAllDogs = async () => {
//   const apiInfo = await getApiInfo();
//   const bdInfo = await getBd();
//   const allInfo = apiInfo.concat(bdInfo);
//   return allInfo;
// };

// router.get("/", async (req, res) => {
//   const { name } = req.query;
//   const allBreeds = await getAllDogs();

//   if (!name) {
//     res.status(200).json(allBreeds);
//   } else {
//     const filtrados = allBreeds.filter((e) => {
//       const names = e.name.toUpperCase();
//       if (names.includes(name.toUpperCase())) return names;
//     });
//     filtrados.length 
//     ? res.status(200).json(filtrados)
//     : res.status(400).send("Raza no encontrada");
//   }
// });

// router.get('/dogs', async(req,res) =>{
//     const name = req.query.name
//     let dogsTotal = await getAllDogs();
//     if(name){ //si me pasan algo por query
//         let dogName = await dogsTotal.filter(x => x.name.toLowerCase().includes(name.toLowerCase)); //creo constante dogsName donde se guade, dentro de dogstotal, hago un filter y busco si esta incluido el nombre que me pasan por query
//         dogName.lenght ? //pregunto si lo encontro, osea si se guardo en la variable
//         res.status(200).send(dogName) : //si encontro el mismo hago un send status y le mando el dogname
//         res.status(404).send('No se encontro la raza ingresada') //sino
//     } else { //si no me pasan algo por query
//         res.status(200).send(dogsTotal)
//     }
// });



// module.exports = router;