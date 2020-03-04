module.exports = function(RED) {
    "use strict";

    var request = require('request');

    // set this to true to spam your console with stuff.
    var tadpoledbhubDebug = true;

    function tadpoledbhubOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;

        this.tadpoledbhubAPIURL = n.tadpoledbhubAPIURL;
        this.accessKey = n.accessKey || "";
        this.secretKey = n.secretKey || "";
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
                    uri: tadpoledbhubAPIURL,
                    headers: {
                        'TDB_ACCESS_KEY': accessKey,
                        'TDB_SECRET_KEY': secretKey
                    },
                    query: JSON.stringify(data)
                }, function (err, res, body) {
                    if(err){
                        console.trace();
                        node.log(err,msg);
                    }else{
                        msg.payload = body;
                        msg.res = res;
                        self.send(msg);
                    }
                });
            }
            catch (err) {
                console.trace();
                node.log(err,msg);
            }
        });
    }
    RED.nodes.registerType("tadpoledbhub", tadpoledbhubOut);
};
