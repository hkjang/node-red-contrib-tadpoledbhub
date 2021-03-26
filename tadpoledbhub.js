module.exports = function(RED) {
    "use strict";

    var request = require('request');

    // set this to true to spam your console with stuff.
    var tadpoledbhubDebug = true;

    function tadpoledbhubOut(n) {
        RED.nodes.createNode(this,n);
        if (RED.nodes.getNode(n.creds)){
            this.accessKey = RED.nodes.getNode(n.creds).credentials.accessKey;
            this.secretKey = RED.nodes.getNode(n.creds).credentials.secretKey;
        } else {
            this.accessKey = "";
            this.secretKey = "";
        }

        this.tadpoledbhubAPIURL = n.tadpoledbhubAPIURL;
        var node = this;

        this.on('input', function (msg) {
            var tadpoledbhubAPIURL = node.tadpoledbhubAPIURL || msg.tadpoledbhubAPIURL;
            var accessKey = node.accessKey || msg.accessKey;
            var secretKey = node.secretKey || msg.secretKey;
            var data = msg.payload;

            if (this.credentials && this.credentials.accessKey && this.credentials.secretKey) {
                accessKey = this.credentials.accessKey;
                secretKey = this.credentials.secretKey;
            }

            if (tadpoledbhubDebug) { node.log(JSON.stringify(data)); }
            try {
                request({
                    method: 'GET',
                    url: tadpoledbhubAPIURL,
                    headers: {
                        'TDB_ACCESS_KEY': accessKey,
                        'TDB_SECRET_KEY': secretKey
                    },
                    qs: data
                }, function (err, res, body) {
                    if(err){
                        console.trace();
                        node.log(err,msg);
                    }else{
                        msg.payload = body;
                        node.send(msg);
                    }
                });
            }
            catch (err) {
                console.trace();
                node.log(err,msg);
            }
        });
    }

    RED.nodes.registerType("tadpoledbhub", tadpoledbhubOut, {
        credentials: {
            accessKey: {type:"text"},
            secretKey: {type:"text"}
        }
    });

    function tadpoleKey(n){
        RED.nodes.createNode(this, n);
        this.accessKey = n.accessKey;
        this.secretKey = n.secretKey;
    }

    RED.nodes.registerType("tadpoleKey", tadpoleKey,{
        credentials: {
            accessKey: {type:"text"},
            secretKey: {type:"text"}
        }
    });

};
