#Build with my IP

Build your application and serve it on your mobile. You defintely need to use a server address. The default one you have set for the development is no longer valid because it is `localhost` and localhost on your mobile device, is the device itself.

### Install
`npm install buildwithmyip -D`

### Prerequisite
On the `src/environments/environment.prod.ts` create a variable e.g. `serverAddress` with `{MYIP}` being your localhost IP. Note that this will be replaced with your local IP during build

> serverAddress: 'http://{MYIP}:3002',

### How to use 

### Options
|Option|Default|
|------|-------|
|device|android|
|env|dev|
