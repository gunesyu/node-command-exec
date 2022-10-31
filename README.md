### Guide
-------
1. Clone this repo.
2. Run following command(s)
- a. If you prefer Docker environment:

    > `docker build .`

    > `docker run -d -p 3333:3333 -v $(pwd):/home/node/app -v /home/node/app/node_modules [HASH_FROM_ABOVE_CMD_HERE]`
    - b. If not

    > `npm install`

    > `npm run start`
3. App will be ready on `http://0.0.0.0:3333/`
4. The *Command* endpoint is the `POST /command` with body:
    ```
    {
        userID: string
        command: string
        params: string
    }
    ```
5. Logs will be written to a file placed on root directory.


#### TODOs
---
- sanitization
- command restriction
- concurrency
- interactive commands
- unit tests
- scheduling
- logrotate
- persistent storage
- authentication
- authorization
- cleanup cron
