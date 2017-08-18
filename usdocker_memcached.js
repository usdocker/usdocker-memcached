'use strict';

const usdocker = require('usdocker');

const SCRIPTNAME = 'memcached';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(SCRIPTNAME + configGlobal.get('container-suffix'))
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
        usdocker.up(SCRIPTNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(SCRIPTNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(SCRIPTNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(SCRIPTNAME, getContainerDef(), callback);
    }
};