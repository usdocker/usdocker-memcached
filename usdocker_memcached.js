'use strict';

const usdocker = require('@usdocker/usdocker');

const SCRIPTNAME = 'memcached';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();
const CONTAINERNAME = SCRIPTNAME + configGlobal.get('container-suffix');

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(CONTAINERNAME)
        .port(config.get('port'), 11211)
        .volume(config.get('folder'), '/data')
        .env('TZ', configGlobal.get('timezone'))
        .isDetached(true)
        .isRemove(true)
        .imageName(config.get('image'))
        .commandParam('memcached')
        .commandParam('-m')
        .commandParam(config.get('memory'))
    ;
}

module.exports = {
    setup: function(callback)
    {
        config.setEmpty('image', 'memcached:alpine');
        config.setEmpty('folder', config.getDataDir());
        config.setEmpty('port', 11211);
        config.setEmpty('memory', 1);
        callback(null, 'setup loaded for ' + SCRIPTNAME);
    },

    debugcli(callback) {
        let result = usdocker.outputRaw('cli', getContainerDef());
        callback(result);
    },

    debugapi(callback) {
        let result = usdocker.outputRaw('api', getContainerDef());
        callback(result);
    },

    up: function(callback)
    {
        usdocker.up(CONTAINERNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(CONTAINERNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(CONTAINERNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(CONTAINERNAME, getContainerDef(), callback);
    }
};