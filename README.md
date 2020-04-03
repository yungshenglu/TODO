# Vue Simple TodoList

This reposiotory is my practice to implement a simple TODO-list in Vue/Vuex. For now, we have a Beta version (v0.1) which enable user to add, remove, and check your items in the TODO-list.

> **HINT:** If you have any questions, please feel free to ask me.

---
## Execution

1. Project setup
    ```bash
    $ npm install
    ```
2. Compiles and hot-reloads for development
    ```bash
    $ npm run serve
    ```
3. Compiles and minifies for production
    ```bash
    $ npm run build
    ```
4. Lints and fixes files
    ```bash
    $ npm run lint
    ```

> **NOTES:** See [Configuration Reference](https://cli.vuejs.org/config/).

---
## Descriptions

### Implementation

#### Prerequisite

1. Make sure you have already install Node.js
2. Install Vue-CLI for initializing the project
    ```bash
    $ npm install -g "@vue/cli"
    ```
3. Create a Vue project via Vue-CLI
    ```bash
    $ vue create vue-todolist
    # You will need to do some settings below if succeed
    Vue CLI v4.2.3
    ? Please pick preset: Manually select features
    ? Check the feautures needed for your projects: TS, Vuex, CSS Pre-processors, Linter
    ? Use class-style component syntax? Yes
    ? Use Babel alognside Typescript? No
    ? Pick a CSS pre-processor? Sass/SCSS (with dart-sass)
    ? Pick a linter / formatter config: TSLint
    ? Pick a additional lint feautres: Lint on save
    ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
    ? Save this as a preset for future projects? No
    ...
    ```
    * This will take a while for initializing the project
    * You will get the following message if initialized succeed.
        ```bash
        🎉  Successfully created project todolist.
        👉  Get started with the following commands:

        $ cd todolist
        $ npm run serve

        ```
4. Change directory to your project and show all files
    ```bash
    $ cd vue-todolist/ & ls
    README.md         package-lock.json public            tsconfig.json
    node_modules      package.json      src               tslint.json
    ```
5. How to run the project on local machine?
    ```bash
    $ npm run serve
    # You will NOT get any error meesage if compiled succeed
    ```
    * If compiled succeed, you can open your browser to `http://localhost:8080`

### Development 

(To be updated.)

---
## Logs

* **03 APR 2020** - Release Beta version (v0.1)
    * Features:
        * User can add, remove, and check each item into list.
        * Item can be distinguished whether it is completed or not.
        * This version without using Vuex.
    * TODO:
        * Display the completeed date on each item
        * Using Veux for managing for all events

(To be updated.)

---
## Contributor

> **NOTICE:** You can follow the contributing process [CONTRIBUTING.md](CONTRIBUTING.md) to join me. I am very welcome any issue!

* [David Lu](https://github.com/yungshenglu)

---
## License

[GNU GENERAL PUBLIC LICENSE Version 3](LICENSE)
