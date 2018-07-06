module.exports = function NginxService(){
  const ejs = require('ejs');
  const path = require('path');
  const fs = require('fs');
  const config = path.join(__dirname, '..', '..', 'config');
  const template = path.join(__dirname, '../templates', 'site.ejs');
  

  let nginx = {};
  nginx.name = 'nginx';

  nginx.actions = {};
  nginx.actions.site = async function(ctx){
    let data = generateData(ctx);
    let result = await generateConfig(data);
    let saveResult = await saveConfig(data, result);
    return saveResult;
  };

  let generateData = function(ctx){
    let data = {};
    data.folderName = ctx.params.name;
    data.serverName = ctx.params.server.split(",");
    if(!Array.isArray(data.serverName)){
      data.serverName = [data.serverName];
    }
    data.ip = ctx.params.ip;
    data.port = ctx.params.port;
    data.ssl = new Boolean(ctx.params.ssl).valueOf() || false;
    data.time = require('moment')().format('dddd, MMMM Do YYYY, h:mm:ss a');
    return data;
  };

  let generateConfig = function(data){
    return new Promise(function(resolve, reject){
      ejs.renderFile(template, data, {}, function(error, string){
        if(error){
          return reject(error);
        }
        return resolve(string);
      });
    });
  };

  let saveConfig = function(data, string){
    return new Promise(function(resolve, reject){
      let configFile = path.join(config, data.folderName + ".conf");
      fs.writeFile(configFile, string, function(error){
        if(error){
          return reject(error);
        }
        return resolve(null);
      });
    });
  };

  return nginx;
};