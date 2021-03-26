node-red-contrib-tadpoledbhub
========================

A <a href="http://nodered.org" target="_new">Node-RED</a> 
node to get response to  <a href="https://tadpoledbhub.atlassian.net/wiki/spaces/TADPOLE/pages/21528941" target="_new"> tadpoledbhub api hub</a>.

Install
-------

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-sk11st, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-tadpoledbhub


Usage
-----

## Tadpole DB Hub API 
<i><a href="http://www.tadpolehub.com" target="_new">Tadpole DB Hub</a></i> api request node.

Expects a <b>msg.payload</b> with request params.

### API URL
The url to call the Tadpole DB Hub API.

### Access Key
The Access key value you put in the http header when calling the Tadpole DB Hub API.

### Secret Key
The Secret key value you put in the http header when calling the Tadpole DB Hub API.


## Sample flow

Flows can be imported and exported from the editor using their JSON format, making it very easy to share flows with others.

- Importing flows - pasting in the flow JSON directly
- Menu - Import - Clipboard - Ctrl+v - Import button 

```json
[{"id":"c7f155e4.d6dc28","type":"inject","z":"a24e59a0.1a2c28","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":160,"y":240,"wires":[["fd870060.d2d2"]]},{"id":"704dd95f.9f2d88","type":"tadpoledbhub","z":"a24e59a0.1a2c28","tadpoledbhubAPIURL":"http://demo.tadpolehub.com:8080/api/crm/clients/getbyuserid","accessKey":"5c44e79d-29c9-429f-bb8f-xxxxxxxxxxxxx","secretKey":"ff7635ea-41bc-413e-bf7c-xxxxxxxxxxxx","x":500,"y":240,"wires":[["d7a0637b.6dac9"]]},{"id":"1a4f295c.cdad17","type":"debug","z":"a24e59a0.1a2c28","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","x":830,"y":240,"wires":[]},{"id":"d7a0637b.6dac9","type":"json","z":"a24e59a0.1a2c28","name":"","property":"payload","action":"","pretty":false,"x":690,"y":240,"wires":[["1a4f295c.cdad17","c3dd001d.d32ef"]]},{"id":"fd870060.d2d2","type":"function","z":"a24e59a0.1a2c28","name":"function","func":"msg.payload = {};\nmsg.payload.userid = '1'\nreturn msg;","outputs":1,"noerr":0,"x":320,"y":240,"wires":[["704dd95f.9f2d88"]]},{"id":"a35c5113.52f1f","type":"http in","z":"a24e59a0.1a2c28","name":"","url":"/tadpole","method":"get","upload":false,"swaggerDoc":"","x":150,"y":280,"wires":[["6e4ab261.b54dec"]]},{"id":"6e4ab261.b54dec","type":"function","z":"a24e59a0.1a2c28","name":"function","func":"\nreturn msg;","outputs":1,"noerr":0,"x":320,"y":280,"wires":[["704dd95f.9f2d88"]]},{"id":"c3dd001d.d32ef","type":"http response","z":"a24e59a0.1a2c28","name":"","statusCode":"200","headers":{},"x":840,"y":280,"wires":[]}]
```
