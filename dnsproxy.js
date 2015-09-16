var dgram = require("dgram");
 
const DNSADDRESS = "10.28.160.102";
const DNSPORT = "53";
 
console.log("DNS Server: " + DNSADDRESS + ":" + DNSPORT);
 
var server  = dgram.createSocket("udp4", function (msg, rinfo) {
    var server = this;
    var client = dgram.createSocket("udp4");
    var address = rinfo.address;
    var port = rinfo.port;
    client.send(msg, 0, msg.length, DNSPORT, DNSADDRESS);
    var tid = 0, buf = null;
    client.on("message", function (msg, rinfo) {
		console.log(msg.toString('UTF-8', 0, msg.length))
		var tbuf = new Buffer(msg,'Binary');
		console.log(tbuf)
        buf = msg
        if (tid) clearTimeout(tid);
        tid = setTimeout(function () {
            tid = 0;
			console.log("»º³åÇø³¤¶È:"+buf.length)
			console.log("QR:"+buf[0])
			console.log("QR:"+tbuf[0])
			console.log("AA:"+buf[5])
			console.log("TC:"+buf[6])
			console.log('RD:'+buf[7])
            server.send(buf, 0, buf.length, port, address);
            client.close();
        }, 15);
    });
}).bind(53, "127.0.0.1");


