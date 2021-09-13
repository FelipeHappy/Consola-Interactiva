require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const { pausa } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() =>{
    console.log('Hola')

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        //Establecer tareas
        tareas.cargarTareasArray(tareasDB)

    }
    
    await pausa();

    do {
        //Imprimir el menu
       opt = await inquirerMenu();
       console.log({opt})
       
        switch (opt) {
            case '1':
                //Crear Opcion
                const desc = await leerInput('Descripción: ');
                // console.log(desc);
                tareas.crearTarea(desc);
                break;

            case '2':
                //Listar Tareas
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr)
                break;

            case '3':
                //Listar Completadas
                tareas.listarPendientesCompletadas(true);
                break;
            
            case '4':
                //Listar Pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                //Completado | Pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr)
                // console.log(ids)
                //Validamos que las tareas esten o no esten completadas
                tareas.toggleCompletadas(ids)
                break;

            case '6':
                //Borrar Tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                console.log({id})
                //En caso de que ingrese por error y quiera salir
                if( id !== '0') {
                    //Preguntar si estamos seguros de eliminar la tarea
                    const ok = await confirmar('¿Está seguro?')
                    console.log(ok)
                    if(ok) {
                        tareas.borrarTareas(id)
                        console.log('Tarea Borrada')
                    }
                }

             break;
                
        
            default:
                break;
        }

        guardarDB(tareas.listadoArr);
       await pausa();
       
    } while(opt !== '0');

    // pausa();
}

main();