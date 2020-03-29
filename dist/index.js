(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    define("api/corona/endpoint", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.endpoint = "https://corona.blloc.com/";
    });
    define("api/corona/getCurrent", ["require", "exports", "api/corona/endpoint"], function (require, exports, endpoint_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getCurrent = (country) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("getCurrent");
            return yield fetch(`${endpoint_1.endpoint}/${country ? `current?country=${country}` : ""}`).then(body => body.json());
        });
    });
    define("api/corona/getCurrentLocation", ["require", "exports", "api/corona/endpoint"], function (require, exports, endpoint_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getCurrentLocation = (coordinates) => __awaiter(void 0, void 0, void 0, function* () {
            return yield fetch(`${endpoint_2.endpoint}/current/location`, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(coordinates) // b
            }).then(body => body.json());
        });
    });
    define("api/corona/getHistoric", ["require", "exports", "api/corona/endpoint"], function (require, exports, endpoint_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getHistoric = (country = "global") => __awaiter(void 0, void 0, void 0, function* () {
            return yield fetch(`${endpoint_3.endpoint}/history?country=${country}`).then(body => body.json());
        });
    });
    define("api/corona/index", ["require", "exports", "api/corona/getCurrent", "api/corona/getCurrentLocation", "api/corona/getHistoric"], function (require, exports, getCurrent_1, getCurrentLocation_1, getHistoric_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.corona = {
            getCurrent: getCurrent_1.getCurrent,
            getCurrentLocation: getCurrentLocation_1.getCurrentLocation,
            getHistoric: getHistoric_1.getHistoric
        };
    });
    define("api/population/getCountryPopulation", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const endpoint = "https://restcountries.eu/rest/v2";
        exports.getCountryPopulation = (countryCode) => __awaiter(void 0, void 0, void 0, function* () {
            return yield fetch(`${endpoint}/alpha/${countryCode}?fields=population`).then(body => body.json());
        });
    });
    define("api/population/getGlobalPopulation", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getGlobalPopulation = () => {
            return 7794798739; // Taken from https://www.worldometers.info/world-population/
        };
    });
    define("api/population/index", ["require", "exports", "api/population/getCountryPopulation", "api/population/getGlobalPopulation"], function (require, exports, getCountryPopulation_1, getGlobalPopulation_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.population = {
            getCountryPopulation: getCountryPopulation_1.getCountryPopulation,
            getGlobalPopulation: getGlobalPopulation_1.getGlobalPopulation
        };
    });
    define("api/index", ["require", "exports", "api/corona/index", "api/population/index"], function (require, exports, index_1, index_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.api = {
            corona: index_1.corona,
            population: index_2.population
        };
    });
    define("localstorage/schema", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    define("localstorage/index", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const prefix = "@data";
        const watchers = [];
        exports.write = (key, data) => {
            localStorage.setItem(`${prefix}/${key}`, JSON.stringify({ data }));
            watchers.forEach((watcher) => {
                if (watcher.key === key) {
                    watcher.callback(data);
                }
            });
        };
        exports.read = (key) => {
            const response = localStorage.getItem(`${prefix}/${key}`);
            if (!response) {
                return undefined;
            }
            const jsonResponse = JSON.parse(response);
            if (!jsonResponse) {
                return undefined;
            }
            const { data } = jsonResponse;
            return data;
        };
        exports.watch = (key, callback) => {
            callback(exports.read(key));
            watchers.push({ key, callback });
        };
    });
    define("components/DeathChance", ["require", "exports", "localstorage/index"], function (require, exports, index_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class DeathChance {
            constructor(element) {
                this.element = element;
                index_3.watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
                    this.undocumentedCasesMultiplicator = undocumentedCasesMultiplicator;
                    this.refresh();
                });
                index_3.watch("currentPopulation", currentPopulation => {
                    this.currentPopulation = currentPopulation;
                    this.refresh();
                });
                index_3.watch("currentDeaths", currentDeaths => {
                    this.currentDeaths = currentDeaths;
                    this.refresh();
                });
            }
            refresh() {
                if (typeof this.undocumentedCasesMultiplicator === "undefined" ||
                    typeof this.currentDeaths === "undefined" ||
                    typeof this.currentPopulation === "undefined") {
                    this.element.innerText = "-";
                    return;
                }
                const value = (this.currentDeaths / this.currentPopulation) *
                    this.undocumentedCasesMultiplicator *
                    100;
                this.element.innerText = Number((value >= 100 ? 100 : value).toFixed(4)).toString();
            }
        }
        exports.DeathChance = DeathChance;
        DeathChance.component = "death-chance";
    });
    define("components/TotalChance", ["require", "exports", "localstorage/index"], function (require, exports, index_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class TotalChance {
            constructor(element) {
                this.element = element;
                index_4.watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
                    this.undocumentedCasesMultiplicator = undocumentedCasesMultiplicator;
                    this.refresh();
                });
                index_4.watch("currentPopulation", currentPopulation => {
                    this.currentPopulation = currentPopulation;
                    this.refresh();
                });
                index_4.watch("currentConfirmed", currentConfirmed => {
                    this.currentConfirmed = currentConfirmed;
                    this.refresh();
                });
                index_4.watch("currentRecovered", currentRecovered => {
                    this.currentRecovered = currentRecovered;
                    this.refresh();
                });
            }
            refresh() {
                console.log([
                    this.undocumentedCasesMultiplicator,
                    this.currentPopulation,
                    this.currentConfirmed,
                    this.currentRecovered
                ]);
                if (typeof this.undocumentedCasesMultiplicator === "undefined" ||
                    typeof this.currentPopulation === "undefined" ||
                    typeof this.currentConfirmed === "undefined" ||
                    typeof this.currentRecovered === "undefined") {
                    this.element.innerText = "-";
                    return;
                }
                const value = ((this.currentConfirmed - this.currentRecovered) /
                    this.currentPopulation) *
                    this.undocumentedCasesMultiplicator *
                    100;
                this.element.innerText = Number((value >= 100 ? 100 : value).toFixed(4)).toString();
            }
        }
        exports.TotalChance = TotalChance;
        TotalChance.component = "total-chance";
    });
    define("components/UndocumentedCasesMultiplicator", ["require", "exports", "localstorage/index"], function (require, exports, index_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class UndocumentedCasesMultiplicator {
            constructor(element) {
                this.isFocused = false;
                this.element = element;
                this.element.addEventListener("focus", () => (this.isFocused = true));
                this.element.addEventListener("blur", () => (this.isFocused = false));
                index_5.watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
                    if (!this.isFocused) {
                        this.element.value = undocumentedCasesMultiplicator
                            ? `${undocumentedCasesMultiplicator}`
                            : "";
                    }
                });
                this.element.addEventListener("input", () => {
                    index_5.write("undocumentedCasesMultiplicator", this.element.value ? parseInt(this.element.value, 10) : 0);
                });
            }
        }
        exports.UndocumentedCasesMultiplicator = UndocumentedCasesMultiplicator;
        UndocumentedCasesMultiplicator.component = "undocumented-cases-multiplicator";
    });
    define("components/index", ["require", "exports", "components/DeathChance", "components/TotalChance", "components/UndocumentedCasesMultiplicator"], function (require, exports, DeathChance_1, TotalChance_1, UndocumentedCasesMultiplicator_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const components = [DeathChance_1.DeathChance, TotalChance_1.TotalChance, UndocumentedCasesMultiplicator_1.UndocumentedCasesMultiplicator];
        exports.refreshComponents = () => {
            components.forEach(Component => {
                const elements = document.querySelectorAll(`[data-${Component.component}]`);
                Array.from(elements).map(element => new Component(element));
            });
        };
        exports.initComponents = exports.refreshComponents;
    });
    define("index", ["require", "exports", "api/index", "components/index", "localstorage/index", "api/population/getGlobalPopulation"], function (require, exports, index_6, index_7, index_8, getGlobalPopulation_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const { corona, population } = index_6.api;
        console.log("Hello World");
        addEventListener("DOMContentLoaded", () => {
            index_7.initComponents();
        });
        // Clear data
        index_8.write("totalChance", 0);
        index_8.write("currentPopulation", getGlobalPopulation_2.getGlobalPopulation());
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield corona.getCurrent();
            index_8.write("currentConfirmed", data.confirmed);
            index_8.write("currentRecovered", data.recovered);
            index_8.write("currentDeaths", data.deaths);
        }))();
    });
    // const selects = document.
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();