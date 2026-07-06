// testDns.js

const dns = require("node:dns/promises");
const dnsSync = require("node:dns"); // for getServers()

// // set custom DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

(async () => {
  console.log("Current DNS servers:", dnsSync.getServers());

  try {
    const result = await dns.resolveSrv(
      "_mongodb._tcp.m.a1t7bdw.mongodb.net"
    );
    console.log("SRV records:", result);
  } catch (err) {
    console.error("Error resolving SRV:", err);
  }
})();
