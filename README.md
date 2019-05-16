# Build Ionic App with my IP

Build your application and serve it on your mobile. While on development you defintely need to use localhost as server address but the `localhost` domain is not valid in your mobile. `localhost` in your mobile device, is your mobile itself

### What it does
It replaces the {MYIP} placeholder on your environment file with your local IP, builds the application, serves it on your mobile and reverts back the {MYIP} placeholder to avoid committing it 

### Install
`npm install buildwithmyip -D`

### Prerequisite
On the `src/environments/environment.prod.ts` create a variable e.g. `serverAddress` with `{MYIP}` being your localhost IP. Note that this will be replaced with your local IP during build

> serverAddress: 'http://{MYIP}:3002',

### How to use 

1. Use the environment in your code. 

    ```
    import { environment } from 'src/environments/environment'
    ```
    
2. Use the environment on your service call

    ```
    @Injectable({
      providedIn: 'root',
    })
    export class AuthorizationService {
      private readonly endpoint = environment.serverAddress // <--- use it like this

      constructor(private http: HttpClient) {}

      login(email: string, password: string) {
        return this.http.post(`${this.endpoint}/login`, {
          email,
          password,
        })
      }
    }
    ```

3. In `package.json` file create a task with your desired name and call the script

    `"ondevice": "build-with-my-ip"`

4. Build your application with the newly created npm task

    `npm run ondevice`

5. Enjoy!

### Build with parameters

**Build on iphone**
`"ondevice": "build-with-my-ip device=iphone"`

**Use other environment name**
`"ondevice": "build-with-my-ip env=YOUR_ENV_NAME"`


### Options
|Option|Default|
|------|-------|
|device|android|
|env|-|
