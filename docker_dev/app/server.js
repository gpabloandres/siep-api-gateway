// include dependencies
var express = require('express');
var proxy = require('http-proxy-middleware');
var cmd = require('child_process');

var config = require('./config');
var routes = require('./routes');
var app = express();

var master = require('./master');

/*
function execPromise(command) {
    return new Promise(function(resolve, reject) {
        cmd.exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.trim());
        });
    });
}
*/

app.get('/', async function (req, res) {
  /*
  try {
      let origin = await execPromise('git remote -v');
      origin = origin.replace('origin','').replace('\t','');
      origin = origin.split(" ")[0];
      config.index.github.url = origin;
      config.index.github.tag  = await execPromise('git describe --always --tags');
  } catch (e) {
      console.error(e.message);
  }
  */

  if(req.query.env==1)
  {
    config.index.env = process.env;
  }

  config.index.github = {
	commit: master.sha.substring(0,7),
  	sha: master.sha,
	message: master.commit.message
  }

  res.json(config.index);
});

routes.forEach(function(gw) {
  let route_path= {};
  route_path[`^${gw.path}`] = gw.target_path;

  app.use(`${gw.path}**`, proxy({
    changeOrigin: true,
    target: gw.target,
    pathRewrite: route_path
  }));
});

console.log("proxy listening on port",config.port);
app.listen(config.port);
