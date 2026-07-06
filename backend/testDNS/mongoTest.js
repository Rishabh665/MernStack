// mongoTest.js

const dns = require("node:dns");
const dnsPromises = require("node:dns/promises");

(async () => {
    console.log("Current DNS servers:", dns.getServers());

    try {
        const records = await dnsPromises.resolveSrv(
            "_mongodb._tcp.m.a1t7bdw.mongodb.net"
        );

        console.log("SRV records:", records);
    }
    catch(err){
        console.error(err);
    }
})();