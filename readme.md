This is a project for managing multiple openvpn connections at the same time.

Will need to update the code with your username (in `vpn_connection.js`).

To start:

```
npm install
sudo npm start
```

The sudo is required for openvpn to successfully connect.

TODO
====
1) Use sudo() to remove the start as sudo requirement: https://www.npmjs.com/package/sudo
2) Add option to have VPNs without authentication with TFA and normal username/pass
