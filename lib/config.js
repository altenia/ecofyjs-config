/*****************************************************************************
 * utils.js
 * Includes various utility functions
 */

var path = require('path');
var fs = require('fs');

var nconf = require('nconf');

var internals = {};

internals.configInited = false;

internals.Config = {}

/**
 * Loads the config from specific file if specified
 * @param {string} configFilePath
 */
internals.Config.load = function(configFilePath)
{
    if (!configFilePath) {
        var fileInfo = path.parse(process.argv[1]);
        configFilePath = './config/' + fileInfo.name + '.conf.json';
    }
    if (!fs.existsSync(configFilePath))
    {
        var errMsg = 'Config failed to open file: ' + configFilePath;
        console.log(errMsg);
        throw new Error(errMsg);
    }

    console.log('Config loading from file: ' + configFilePath);
    nconf.argv()
       .env()
       .file({ file: configFilePath });
    internals.configInited = true;
};

/**
 * Retrieves a property in the config
 * @param {string} key -  The key of the config
 * @param {*} defaultVal - THe default value if key is not found
 */
internals.Config.get = function(key, defaultVal)
{
    if (!internals.configInited)
    {
        internals.Config.load();
    }
    var val = nconf.get(key) 
    if (val === undefined) {
        return defaultVal;
    } 
    return val;
};

module.exports = internals.Config;
