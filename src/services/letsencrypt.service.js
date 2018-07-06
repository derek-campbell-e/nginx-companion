module.exports = function LetsEncrypt(){
  let service = {};
  service.name = 'letsencrypt';
  service.actions = {};
  
  service.actions.create = async function(ctx){
    const spawn = require('child_process').spawn;
    
    let result = await new Promise(function(resolve, reject){
  
      let child = spawn("certbot", ['--nginx', '-d',  'www.example.com', '--email', 'derek.campbell.e@gmail.com'], {
        stdio: 'pipe',
        uid:0,
        gid:9,
      });
      child.std
      child.on('close', function(code, signal){
        return resolve({code: code, signal:signal});
      });
      child.on('error', function(error){
        return reject(error);
      });
      child.stdout.on('data', (data) => {
        child.stdin.write(data);
      });
      
      child.stderr.on('data', (data) => {
        console.log(`ps stderr: ${data}`);
      });
    });

    return result;
  };

  service.actions.renew = async function(ctx){

  };

  return service;
};