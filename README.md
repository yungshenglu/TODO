# Vue TODO!

This repository is my practice to implement a simple TODO-list in Vue/Vuex. For now, we have a Beta version (v1.0) that enables users to add, remove, edit, and check your items in the TODO-list. Besides, we also provide a very simple classification for the status of each item (i.e, todo, done)

![](src/assets/TODO!-demo.png)

> **HINT:** If you have any questions, please feel free to ask me.

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
    > **NOTES:** See [Configuration Reference](https://cli.vuejs.org/config/).
4. Change directory to your project and show all files
    ```bash
    $ cd Vue-TodoList/ & ls
    README.md         package-lock.json public            tsconfig.json
    node_modules      package.json      src               tslint.json
    ```
5. How to run the project on local machine?
    ```bash
    $ npm run serve
    # You will NOT get any error meesage if compiled succeed
    ```
    * If compiled succeed, you can open your browser to `http://localhost:8080`

### Execution

1. To run our production, you need to clone our project first
    ```bash
    $ git clone https://github.com/yungshenglu/Vue-TodoList/
    ```
2. After cloning, change the your current directory into the repository and setup the project
    ```bash
    $ cd Vue-TodoList/ & npm install
    ```
    * The command `npm install` will install some necessary packages for this project
    * It will take few second for running above command
3. Compiles and hot-reloads for development
    ```bash
    $ npm run serve
    ```
    * It will take few second for running above command
    * You won't get any error messages if running successful
4. Congratulation! you can open your browser to `http://localhost:8080` and see our TODO-list

### Deploy on GitHub Pages

1. To deploy our production, make sure your current directory is the root of this repository and run the following command
    ```bash
    $ npm run build
    ```
    * It will take few second for ruuning above command
    * You will get a new folder `dist/` after building successful
    * You don't need to push `dist/` on your GitHub because `dist/` has already been ignored by git via `.gitignore`
2. Before deploying, make sure you have already created your repository on GitHub
3. Change the directory into `dist/` and create a new branch for deploying on your GitHub Pages
    ```bash
    $ cd dist/
    # You need to initialize git due to dist/ is ignored as default
    $ git init
    $ git add -A
    $ git commit -m "Deploy on GitHub Pages"
    # Deploy to your GitHub repository on branch "gh-pages"
    $ git push -f https://github.com/yungshenglu/Vue-TodoList.git master:gh-pages
    $ cd -
    ```
4. After deploying, you can find it on your GitHub with branch `gh-pages`
5. Open setting page of your repository and move to the section `GitHub Pages`
6. Select `Source` of your GitHub Pages to `gh-pages branch`
7. Congratulation! you can open your browser to the link of your GitHub Pages

---
## Contributor

> **NOTICE:** You can follow the contributing process [CONTRIBUTING.md](CONTRIBUTING.md) to join me. I am very welcome any issue!

* [David Lu](https://github.com/yungshenglu)

---
## License

[GNU GENERAL PUBLIC LICENSE Version 3](LICENSE)
