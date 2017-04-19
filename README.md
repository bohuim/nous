UC Berkeley Spring 2017 CS160 - Group 21.

Nous
---
Interview simulator for Alexa with web integration.

### Project
This project uses [`React`](https://github.com/facebook/react) for the web client, and [`alexa-app`](https://github.com/alexa-js/alexa-app) framework for the Alexa skill.  ## 
The react related files are at the upper-most level, with Alexa files under `/alexa/nous`.

**NOTE**: `node_modules` are not included in the repo, so run the `get-modules` script described below.

---

### Useful Scripts
Run all scripts with `npm run <script>`
- Web
    - `start` - dev site at `localhost:3000`
    - `surge` - build the site and trigger `surge` for domain `nous.surge.sh`
- Alexa
    - `alexa` - start the alexa app tester UI at `localhost:8000/alexa/nous`
    - `lint`  - included since `alexa-app` doesn't come with a linter
