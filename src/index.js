/* globals Vue */

const App = require("./App");
const createRouter = require("./router");
const createStore = require("./store");


function createApp() {
    const router = createRouter();
    const store = createStore();

    const app = new Vue({
        el: "#app",
        store,
        router,
        components: { App }
    });

    return {
        app,
        router,
        store
    };
}


const { app } = createApp();

window.app = app;