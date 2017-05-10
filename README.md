UC Berkeley Spring 2017 CS160 - Group 21.

Nous
---
Interview simulator for Alexa with web integration.

### Domain
There is no dedicated domain and server for the site, as it needs a ssl certificate (which costs money).  
To run and test locally, follow the steps below.

### Running Locally
To run this project, you'll need `node >= 6.10` and `npm >= 3.3.10`  
Go ahead and start by install the dependencies
```sh
npm install
```

Run the local `webpack-dev-server` with the following script
```sh
npm run start
```

Now head over `https://localhost:3000/`  

Note that this **will** give an untrusted site, because we don't have valid certificate.  
The https protocol is required for Amazon login.

Basic steps:
- service requires an Amazon account
- to start a mock interview, browse the categories and add questions to your cart
- fire up the `Nous Alexa skill` from an Alexa device and say 'yes'
- this triggers a notification on the web portal
- from your `Cart`, press the `Start Interview` button to start
- after the session, you can review the session from `Previous Sessions`
