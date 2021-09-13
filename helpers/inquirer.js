const inquirer = require('inquirer');
require('colors');

//Preguntas

//Variable Opciones
const menuOption = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [

            {
                value: '1',
                name: `${ '1.'.green} Crear Tarea`
            },

            {
                value: '2',
                name: `${ '2.'.green} Listar Tareas`
            },

            {
                value: '3',
                name: `${ '3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green} Completar Tareas`
            },
            {
                value: '6',
                name: `${ '6.'.green} Borrar Tareas`
            },
            {
                value: '7',
                name: `${ '0.'.green} Salir`
            },

        ]
    }
];


const inquirerMenu = async() => {

    console.clear();

    console.log('============================'.green)
    console.log('===== Seleccione una opcion ======\n'.white)
    console.log('============================'.green)

    //Definimos las preguntas
    const { opcion } = await inquirer.prompt(menuOption);
    //Retornamos la opcion
    return opcion;

}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'Enter',
            message: `Presione ${ 'Enter'.green} para continuar`
        }
    ]

    await inquirer.prompt(question)
    
}

const leerInput = async(mensaje) =>{

    const lectura = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value) {
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ];

    const { desc } = await inquirer.prompt(lectura);
    return desc;

}

const listadoTareasBorrar = async( tareas = []) =>{

    //Definimos las opciones, manipular el arreglo
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name:`${idx} ${tarea.desc}`
        }
    })
    console.log(choices);

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [{

        type:'list',
        name: 'id',
        message: 'Borrar',
        choices

    }]
    //Llamamos el prompt con las preguntas al escoger la opcion
    const { id } = await inquirer.prompt(preguntas);
    //Retornamos el id de la tarea eliminada
    return id;
}

const confirmar = async(message) => {

    const questionConfirm = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    //Llamamos el prompt con las preguntas al escoger la opcion
    const { ok } = await inquirer.prompt(questionConfirm);

    //Retornamos el ok
    return ok;
}

const mostrarListadoCheckList = async( tareas = []) =>{

    //Definimos las opciones, manipular el arreglo
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name:`${idx} ${tarea.desc}`,
            checked: (tarea.diaCompletado) ? true : false
        }
    })
    console.log(choices);

    const preguntas = [{

        type:'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices

    }]
    //Llamamos el prompt con las preguntas al escoger la opcion
    const { ids } = await inquirer.prompt(preguntas);
    //Retornamos el id de la tarea eliminada
    return ids;
}





module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}