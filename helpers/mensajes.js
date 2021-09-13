require('colors');

const mostrarMenu = () => {
    console.clear();

    return new Promise( resolve => {
        console.log('============================'.green)
        console.log('===== Seleccione una opcion ======\n'.green)
        console.log('============================'.green)

        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tarea`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea(s)`);
        console.log(`${'0.'.green} Salir\n`);

    //Leemos la respuesta
    const readLine = require('readline').createInterface({
        //Esperamos respuesta del usuario
        input: process.stdin,
        //Mostrar un mensaje en consola
        output: process.stdout
    });

    readLine.question('Selecciones una opcion: ', (opt) => {
        // console.log({opt})
        //Luego de que recibe la opcion del usuario
        readLine.close();
        resolve(opt);
    })
    })
    

}

const pausa = () => {

    return new Promise( resolve => {

        const readLine = require('readline').createInterface({
            //Esperamos respuesta del usuario
            input: process.stdin,
            //Mostrar un mensaje en consola
            output: process.stdout
        });
    
        readLine.question(`Presione ${'ENTER'.green} para continuar`, (opt) => {
            //Luego de que recibe la opcion del usuario
            readLine.close();
            resolve(opt)
        })
        
    })
    
}


module.exports = {
    mostrarMenu,
    pausa
}