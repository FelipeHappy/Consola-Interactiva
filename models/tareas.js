const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        //Retorna un arreglo recibiendo objetos en llaves
        Object.keys(this._listado).forEach( key => {
            console.log(key)
            const tarea = this._listado[key]
            listado.push(tarea)
        });
        return listado;
    }

    constructor () {
        this._listado = {}
    }

    borrarTareas(id = ''){

        if(this._listado[id]) {
            delete this._listado[id];
        }
        
    }

    cargarTareasArray(tareas){
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        //Buscamos en el get y lo recorremos las tareas dandole tarea como parametro y el i como indice a recorrer
        this.listadoArr.forEach( (tarea, i) => {
            //Almacenamos el indice
            const idx = `${i + 1}`.green;
            console.log(idx)
            //Desestructuramos los parametros que necesitamos de tarea
            const { desc, diaCompletado} = tarea;   
            //Revisamos el estado de la tarea
            const estado = (diaCompletado) 
                            ? 'Completado'.green 
                            : 'Pendiente'.red
            console.log(`${idx} ${desc} :: ${estado}`)
            
        })

    }

    listarPendientesCompletadas( Completadas = true){

        let contador = 0;

        this.listadoArr.forEach((tarea) =>{
            //Desestructuramos los parametros que necesitamos de tarea
            const { desc, diaCompletado} = tarea;   
            //Revisamos el estado de la tarea
            const estado = (diaCompletado) 
                            ? 'Completado'.green 
                            : 'Pendiente'.red

            if(Completadas){

                if(diaCompletado){
                      //Mostrar Completadas 
                        contador += 1;
                        console.log(`${contador.toString().green}. ${desc} :: ${diaCompletado.green}`)
                }
             

            } else 
            {
                //Mostrar Pendientes
                if(!diaCompletado){
                    //Mostrar Completadas 
                      contador += 1;
                      console.log(`${contador.toString().green}. ${desc} :: ${estado}`)
              }
            }
            
          
        })
    }

    toggleCompletadas(ids = []){
        //Completar
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.diaCompletado){
                tarea.diaCompletado = new Date().toISOString()
            }
        
        })
        //Pendiente
        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                //Extraemos el id y quitamos el completado
                this._listado[tarea.id].diaCompletado = null;  
            }
        })
    }

    
}

module.exports = Tareas;