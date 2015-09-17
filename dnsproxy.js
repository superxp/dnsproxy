var dgram = require("dgram");
 
const DNSADDRESS = "8.8.8.8";
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
		
		
        buf = msg
        if (tid) clearTimeout(tid);
        tid = setTimeout(function () {
            tid = 0;
			
			console.log("QR:"+buf[0])
			console.log("AA:"+buf[5])
			console.log("TC:"+buf[6])
			console.log('RD:'+buf[7])
			console.log('num:'+buf[12])
			console.log('q:'+buf[13])
			console.log('q:'+buf[16])
			console.log('q:'+buf[17])
            server.send(buf, 0, buf.length, port, address);
            client.close();
        }, 15);
    });
}).bind(53, "127.0.0.1");


