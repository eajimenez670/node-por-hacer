const fs = require('fs');

let listadoTareas = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoTareas);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('No se pudo guardar el archivo', err);
        }
    });
}

const cargarDB = () => {
    try {
        listadoTareas = require('../db/data.json');
    } catch (error) {
        listadoTareas = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoTareas.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoTareas;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoTareas.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoTareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listadoTareas.findIndex(busqueda => busqueda.descripcion === descripcion);
    if (index >= 0) {
        listadoTareas.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}