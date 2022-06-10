export function validacion(input){
    let errores ={};

    if(!input.name){
        errores.name ='Debe ingresar un nombre';
    }else if(input.name.search(/^[a-zA-Z\s]*$/) ){
        errores.name ='No puede contener números ni simbolos'
    }
    
    if(!input.minHeight){
        errores.minHeight ='Debe ingresas una altura minima';
    }else if( parseInt(input.minHeight) >= parseInt(input.maxHeight)){
        errores.minHeight = 'La altura minima no puede ser mayor que la altura maxima';
    }else if(input.minHeight <= 0){
        errores.minHeight = 'No pueden ser números negativos'
    }if(!input.maxHeight){
        errores.maxHeight ='Debe ingresas una altura maxima';
    }else if( parseInt(input.maxHeight) <= parseInt(input.minHeight) ){
        errores.maxHeight = 'La altura maxima no puede ser menor que la altura minima';
    }else if(input.maxHeight <= 0){
        errores.maxHeight = 'No pueden ser números negativos'
    }


    if(!input.minWeight){
        errores.minWeight ='Debe ingresar un peso minimo';
    }else if( parseInt(input.minWeight) >= parseInt(input.maxWeight)){
        errores.minWeight = 'El peso minimo no puede ser mayor que el peso maximo';
    }else if(input.minWeight <= 0){
        errores.minWeight = 'No pueden ser números negativos'
    }if(!input.maxWeight){
        errores.maxWeight ='Debe ingresar un peso maximo';
    }else if( parseInt(input.maxWeight) <= parseInt(input.minWeight) ){
        errores.maxWeight = 'El peso maximo no puede ser menor que el peso minimo';
    }else if(input.maxWeight <= 0){
        errores.maxWeight = 'No pueden ser números negativos'
    }
    

    if(!input.minlife_span){
        errores.minlife_span ='Debe ingresar un minimo de años de vida';
    }else if( parseInt(input.minlife_span) >= parseInt(input.maxlife_span)){
        errores.minlife_span ='El minimo de años de vida no puede ser mayor al maximo';
    }else if(input.minlife_span <= 0){
        errores.minlife_span = 'No pueden ser números negativos'
    }if(!input.maxlife_span){
        errores.maxlife_span ='Debe ingresar un maximo de años de vida';
    }else if( parseInt(input.maxlife_span) <= parseInt(input.minlife_span) ){
        errores.maxlife_span = 'El maximo de años de vida no puede ser menor que el minimo';
    }else if(input.maxlife_span <= 0){
        errores.maxlife_span = 'No pueden ser números negativos'
    }
    

    if(input.image.search(/(https?:\/\/.*\.(?:png|jpg))/) ){
        errores.image ='Debe ser una URL'
    }
    return errores;
    
}