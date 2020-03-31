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
    define("api/index", ["require", "exports", "api/corona/index"], function (require, exports, index_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.api = {
            corona: index_1.corona
        };
    });
    define("components/ui/Collapse", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class Collapse {
            constructor(element) {
                this.open = false;
                this.element = element;
                this.header = this.element.querySelector(`[data-${Collapse.component}-header]`);
                this.trigger = this.element.querySelector(`[data-${Collapse.component}-trigger]`);
                this.triggerLabel = this.element.querySelector(`[data-${Collapse.component}-trigger-label]`);
                this.content = this.element.querySelector(`[data-${Collapse.component}-content]`);
                this.openElements = Array.from(this.element.querySelectorAll(`[data-${Collapse.component}-open]`));
                this.closedElements = Array.from(this.element.querySelectorAll(`[data-${Collapse.component}-closed]`));
                if (this.trigger) {
                    this.trigger.addEventListener("click", () => {
                        this.open = !this.open;
                        this.refresh();
                    });
                }
                this.refresh();
            }
            refresh() {
                if (this.triggerLabel) {
                    this.triggerLabel.innerText = this.open ? "Hide" : "Show";
                }
                if (this.content) {
                    this.content.style.display = this.open ? "block" : "none";
                }
                this.closedElements.map(element => (element.style.display = this.open ? "none" : "inline"));
                this.openElements.map(element => (element.style.display = this.open ? "inline" : "none"));
            }
        }
        exports.Collapse = Collapse;
        Collapse.component = "collapse";
    });
    define("components/ui/DisabledSection", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class DisabledSection {
            constructor(element) {
                this.element = element;
                this.element.style.pointerEvents = "none";
                this.element.style.opacity = "0.2";
            }
        }
        exports.DisabledSection = DisabledSection;
        DisabledSection.component = "disabled-section";
    });
    define("components/utils/Component", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class Component {
            constructor(element) {
                this.element = element;
            }
        }
        exports.Component = Component;
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
        exports.clear = () => {
            localStorage.clear();
        };
    });
    define("components/people/AddPerson", ["require", "exports", "components/utils/Component", "localstorage/index"], function (require, exports, Component_1, index_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class AddPerson extends Component_1.Component {
            constructor(element) {
                super(element);
                this.letters = "ABCDEFGHIKLMNOPQRSTVXYZ";
                this.element.addEventListener("click", () => {
                    const people = index_2.read("people");
                    people.push({
                        name: this.getNewName(),
                        day: 0
                    });
                    index_2.write("people", people);
                });
            }
            getNewName(additionalIndex = 0) {
                const people = index_2.read("people");
                if (people.length === 0) {
                    return "A";
                }
                const lastName = people[people.length - 1].name;
                if (lastName === "Z") {
                    return "1";
                }
                else if (isNaN(+lastName)) {
                    return this.letters[this.letters.indexOf(lastName) + 1];
                }
                return `${+lastName + 1}`;
            }
        }
        exports.AddPerson = AddPerson;
        AddPerson.component = "add-person";
    });
    define("components/people/People", ["require", "exports", "components/utils/Component", "localstorage/index"], function (require, exports, Component_2, index_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class People extends Component_2.Component {
            constructor(element) {
                super(element);
                this.personTemplate = document.getElementById("template-person");
                index_3.watch("people", people => {
                    this.people = people;
                    this.refreshPeopleList();
                });
            }
            renderPerson() {
                const personElement = this.personTemplate.content.children[0];
                return personElement;
            }
            refreshPeopleList() {
                console.log("refreshPeopleList");
                console.log(this.personTemplate);
            }
        }
        exports.People = People;
        People.component = "people";
    });
    define("data/population", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.population = [
            {
                country: "Afghanistan",
                population: 35530081
            },
            {
                country: "Albania",
                population: 2930187
            },
            {
                country: "Algeria",
                population: 41318142
            },
            {
                country: "American Samoa",
                population: 55641
            },
            {
                country: "Andorra",
                population: 76965
            },
            {
                country: "Angola",
                population: 29784193
            },
            {
                country: "Anguilla",
                population: 14909
            },
            {
                country: "Antarctica",
                population: null
            },
            {
                country: "Antigua and Barbuda",
                population: 102012
            },
            {
                country: "Argentina",
                population: 44271041
            },
            {
                country: "Armenia",
                population: 2930450
            },
            {
                country: "Aruba",
                population: 105264
            },
            {
                country: "Australia",
                population: 24450561
            },
            {
                country: "Austria",
                population: 8735453
            },
            {
                country: "Azerbaijan",
                population: 9827589
            },
            {
                country: "Bahamas",
                population: 395361
            },
            {
                country: "Bahrain",
                population: 1492584
            },
            {
                country: "Bangladesh",
                population: 164669751
            },
            {
                country: "Barbados",
                population: 285719
            },
            {
                country: "Belarus",
                population: 9468338
            },
            {
                country: "Belgium",
                population: 11429336
            },
            {
                country: "Belize",
                population: 374681
            },
            {
                country: "Benin",
                population: 11175692
            },
            {
                country: "Bermuda",
                population: 61349
            },
            {
                country: "Bhutan",
                population: 807610
            },
            {
                country: "Bolivia",
                population: 11051600
            },
            {
                country: "Bosnia and Herzegovina",
                population: 3507017
            },
            {
                country: "Botswana",
                population: 2291661
            },
            {
                country: "Bouvet Island",
                population: null
            },
            {
                country: "Brazil",
                population: 209288278
            },
            {
                country: "British Indian Ocean Territory",
                population: null
            },
            {
                country: "Brunei",
                population: 428697
            },
            {
                country: "Bulgaria",
                population: 7084571
            },
            {
                country: "Burkina Faso",
                population: 19193382
            },
            {
                country: "Burundi",
                population: 10864245
            },
            {
                country: "Cambodia",
                population: 16005373
            },
            {
                country: "Cameroon",
                population: 24053727
            },
            {
                country: "Canada",
                population: 36624199
            },
            {
                country: "Cape Verde",
                population: 546388
            },
            {
                country: "Cayman Islands",
                population: 61559
            },
            {
                country: "Central African Republic",
                population: 4659080
            },
            {
                country: "Chad",
                population: 14899994
            },
            {
                country: "Chile",
                population: 18054726
            },
            {
                country: "China",
                population: 1409517397
            },
            {
                country: "Christmas Island",
                population: 2500
            },
            {
                country: "Cocos (Keeling) Islands",
                population: 600
            },
            {
                country: "Colombia",
                population: 49065615
            },
            {
                country: "Comoros",
                population: 813912
            },
            {
                country: "Congo",
                population: 5260750
            },
            {
                country: "Cook Islands",
                population: 17380
            },
            {
                country: "Costa Rica",
                population: 4905769
            },
            {
                country: "Croatia",
                population: 4189353
            },
            {
                country: "Cuba",
                population: 11484636
            },
            {
                country: "Cyprus",
                population: 1179551
            },
            {
                country: "Czechia",
                population: 10618303
            },
            {
                country: "Denmark",
                population: 5733551
            },
            {
                country: "Djibouti",
                population: 956985
            },
            {
                country: "Dominica",
                population: 73925
            },
            {
                country: "Dominican Republic",
                population: 10766998
            },
            {
                country: "East Timor",
                population: 1296311
            },
            {
                country: "Ecuador",
                population: 16624858
            },
            {
                country: "Egypt",
                population: 97553151
            },
            {
                country: "El Salvador",
                population: 6377853
            },
            {
                country: "England",
                population: null
            },
            {
                country: "Equatorial Guinea",
                population: 1267689
            },
            {
                country: "Eritrea",
                population: 5068831
            },
            {
                country: "Estonia",
                population: 1309632
            },
            {
                country: "Ethiopia",
                population: 104957438
            },
            {
                country: "Falkland Islands",
                population: 2910
            },
            {
                country: "Faroe Islands",
                population: 49290
            },
            {
                country: "Fiji Islands",
                population: 905502
            },
            {
                country: "Finland",
                population: 5523231
            },
            {
                country: "France",
                population: 64979548
            },
            {
                country: "French Guiana",
                population: 282731
            },
            {
                country: "French Polynesia",
                population: 283007
            },
            {
                country: "French Southern territories",
                population: null
            },
            {
                country: "Gabon",
                population: 2025137
            },
            {
                country: "Gambia",
                population: 2100568
            },
            {
                country: "Georgia",
                population: 3912061
            },
            {
                country: "Germany",
                population: 82114224
            },
            {
                country: "Ghana",
                population: 28833629
            },
            {
                country: "Gibraltar",
                population: 34571
            },
            {
                country: "Greece",
                population: 11159773
            },
            {
                country: "Greenland",
                population: 56480
            },
            {
                country: "Grenada",
                population: 107825
            },
            {
                country: "Guadeloupe",
                population: 449568
            },
            {
                country: "Guam",
                population: 164229
            },
            {
                country: "Guatemala",
                population: 16913503
            },
            {
                country: "Guinea",
                population: 12717176
            },
            {
                country: "Guinea-Bissau",
                population: 1861283
            },
            {
                country: "Guyana",
                population: 777859
            },
            {
                country: "Haiti",
                population: 10981229
            },
            {
                country: "Heard Island and McDonald Islands",
                population: null
            },
            {
                country: "Holy See (Vatican City State)",
                population: 1000
            },
            {
                country: "Honduras",
                population: 9265067
            },
            {
                country: "Hong Kong",
                population: 7364883
            },
            {
                country: "Hungary",
                population: 9721559
            },
            {
                country: "Iceland",
                population: 335025
            },
            {
                country: "India",
                population: 1339180127
            },
            {
                country: "Indonesia",
                population: 263991379
            },
            {
                country: "Iran",
                population: 81162788
            },
            {
                country: "Iraq",
                population: 38274618
            },
            {
                country: "Ireland",
                population: 4761657
            },
            {
                country: "Israel",
                population: 8321570
            },
            {
                country: "Italy",
                population: 59359900
            },
            {
                country: "Ivory Coast",
                population: 24294750
            },
            {
                country: "Jamaica",
                population: 2890299
            },
            {
                country: "Japan",
                population: 127484450
            },
            {
                country: "Jordan",
                population: 9702353
            },
            {
                country: "Kazakhstan",
                population: 18204499
            },
            {
                country: "Kenya",
                population: 49699862
            },
            {
                country: "Kiribati",
                population: 116398
            },
            {
                country: "Kuwait",
                population: 4136528
            },
            {
                country: "Kyrgyzstan",
                population: 6045117
            },
            {
                country: "Laos",
                population: 6858160
            },
            {
                country: "Latvia",
                population: 1949670
            },
            {
                country: "Lebanon",
                population: 6082357
            },
            {
                country: "Lesotho",
                population: 2233339
            },
            {
                country: "Liberia",
                population: 4731906
            },
            {
                country: "Libyan Arab Jamahiriya",
                population: 5605000
            },
            {
                country: "Liechtenstein",
                population: 37922
            },
            {
                country: "Lithuania",
                population: 2890297
            },
            {
                country: "Luxembourg",
                population: 583455
            },
            {
                country: "Macao",
                population: 473000
            },
            {
                country: "North Macedonia",
                population: 2024000
            },
            {
                country: "Madagascar",
                population: 25570895
            },
            {
                country: "Malawi",
                population: 18622104
            },
            {
                country: "Malaysia",
                population: 31624264
            },
            {
                country: "Maldives",
                population: 436330
            },
            {
                country: "Mali",
                population: 18541980
            },
            {
                country: "Malta",
                population: 430835
            },
            {
                country: "Marshall Islands",
                population: 53127
            },
            {
                country: "Martinique",
                population: 384896
            },
            {
                country: "Mauritania",
                population: 4420184
            },
            {
                country: "Mauritius",
                population: 1265138
            },
            {
                country: "Mayotte",
                population: 253045
            },
            {
                country: "Mexico",
                population: 129163276
            },
            {
                country: "Micronesia, Federated States of",
                population: null
            },
            {
                country: "Moldova",
                population: 4051212
            },
            {
                country: "Monaco",
                population: 38695
            },
            {
                country: "Mongolia",
                population: 3075647
            },
            {
                country: "Montserrat",
                population: 5177
            },
            {
                country: "Morocco",
                population: 35739580
            },
            {
                country: "Mozambique",
                population: 29668834
            },
            {
                country: "Myanmar",
                population: 53370609
            },
            {
                country: "Namibia",
                population: 2533794
            },
            {
                country: "Nauru",
                population: 11359
            },
            {
                country: "Nepal",
                population: 29304998
            },
            {
                country: "Netherlands",
                population: 17035938
            },
            {
                country: "Netherlands Antilles",
                population: 217000
            },
            {
                country: "New Caledonia",
                population: 276255
            },
            {
                country: "New Zealand",
                population: 4705818
            },
            {
                country: "Nicaragua",
                population: 6217581
            },
            {
                country: "Niger",
                population: 21477348
            },
            {
                country: "Nigeria",
                population: 190886311
            },
            {
                country: "Niue",
                population: 1618
            },
            {
                country: "Norfolk Island",
                population: 2000
            },
            {
                country: "North Korea",
                population: 25490965
            },
            {
                country: "Northern Ireland",
                population: null
            },
            {
                country: "Northern Mariana Islands",
                population: 55144
            },
            {
                country: "Norway",
                population: 5305383
            },
            {
                country: "Oman",
                population: 4636262
            },
            {
                country: "Pakistan",
                population: 197015955
            },
            {
                country: "Palau",
                population: 21729
            },
            {
                country: "Palestine",
                population: 4920724
            },
            {
                country: "Panama",
                population: 4098587
            },
            {
                country: "Papua New Guinea",
                population: 8251162
            },
            {
                country: "Paraguay",
                population: 6811297
            },
            {
                country: "Peru",
                population: 32165485
            },
            {
                country: "Philippines",
                population: 104918090
            },
            {
                country: "Pitcairn",
                population: 50
            },
            {
                country: "Poland",
                population: 38170712
            },
            {
                country: "Portugal",
                population: 10329506
            },
            {
                country: "Puerto Rico",
                population: 3663131
            },
            {
                country: "Qatar",
                population: 2639211
            },
            {
                country: "Reunion",
                population: 699000
            },
            {
                country: "Romania",
                population: 19679306
            },
            {
                country: "Russian Federation",
                population: 143989754
            },
            {
                country: "Rwanda",
                population: 12208407
            },
            {
                country: "Saint Helena",
                population: 4049
            },
            {
                country: "Saint Kitts and Nevis",
                population: 55345
            },
            {
                country: "Saint Lucia",
                population: 178844
            },
            {
                country: "Saint Pierre and Miquelon",
                population: 6320
            },
            {
                country: "Saint Vincent and the Grenadines",
                population: 109897
            },
            {
                country: "Samoa",
                population: 196440
            },
            {
                country: "San Marino",
                population: 33400
            },
            {
                country: "Sao Tome and Principe",
                population: 204327
            },
            {
                country: "Saudi Arabia",
                population: 32938213
            },
            {
                country: "Scotland",
                population: null
            },
            {
                country: "Senegal",
                population: 15850567
            },
            {
                country: "Seychelles",
                population: 94737
            },
            {
                country: "Sierra Leone",
                population: 7557212
            },
            {
                country: "Singapore",
                population: 5708844
            },
            {
                country: "Slovakia",
                population: 5447662
            },
            {
                country: "Slovenia",
                population: 2079976
            },
            {
                country: "Solomon Islands",
                population: 611343
            },
            {
                country: "Somalia",
                population: 14742523
            },
            {
                country: "South Africa",
                population: 56717156
            },
            {
                country: "South Georgia and the South Sandwich Islands",
                population: null
            },
            {
                country: "South Korea",
                population: 50982212
            },
            {
                country: "South Sudan",
                population: 12575714
            },
            {
                country: "Spain",
                population: 46354321
            },
            {
                country: "SriLanka",
                population: 20876917
            },
            {
                country: "Sudan",
                population: 40533330
            },
            {
                country: "Suriname",
                population: 563402
            },
            {
                country: "Svalbard and Jan Mayen",
                population: 3200
            },
            {
                country: "Swaziland",
                population: 1008000
            },
            {
                country: "Sweden",
                population: 9910701
            },
            {
                country: "Switzerland",
                population: 8476005
            },
            {
                country: "Syria",
                population: 18269868
            },
            {
                country: "Tajikistan",
                population: 8921343
            },
            {
                country: "Tanzania",
                population: 57310019
            },
            {
                country: "Thailand",
                population: 69037513
            },
            {
                country: "The Democratic Republic of Congo",
                population: null
            },
            {
                country: "Togo",
                population: 7797694
            },
            {
                country: "Tokelau",
                population: 1300
            },
            {
                country: "Tonga",
                population: 108020
            },
            {
                country: "Trinidad and Tobago",
                population: 1369125
            },
            {
                country: "Tunisia",
                population: 11532127
            },
            {
                country: "Turkey",
                population: 80745020
            },
            {
                country: "Turkmenistan",
                population: 5758075
            },
            {
                country: "Turks and Caicos Islands",
                population: 35446
            },
            {
                country: "Tuvalu",
                population: 11192
            },
            {
                country: "Uganda",
                population: 42862958
            },
            {
                country: "Ukraine",
                population: 44222947
            },
            {
                country: "United Arab Emirates",
                population: 9400145
            },
            {
                country: "United Kingdom",
                population: 66181585
            },
            {
                country: "US",
                population: 324459463
            },
            {
                country: "United States Minor Outlying Islands",
                population: null
            },
            {
                country: "Uruguay",
                population: 3456750
            },
            {
                country: "Uzbekistan",
                population: 31910641
            },
            {
                country: "Vanuatu",
                population: 276244
            },
            {
                country: "Venezuela",
                population: 31977065
            },
            {
                country: "Vietnam",
                population: 95540800
            },
            {
                country: "Virgin Islands, British",
                population: null
            },
            {
                country: "Virgin Islands, U.S.",
                population: null
            },
            {
                country: "Wales",
                population: null
            },
            {
                country: "Wallis and Futuna",
                population: 11773
            },
            {
                country: "Western Sahara",
                population: 552628
            },
            {
                country: "Yemen",
                population: 28250420
            },
            {
                country: "Yugoslavia",
                population: 10640000
            },
            {
                country: "Zambia",
                population: 17094130
            },
            {
                country: "Zimbabwe",
                population: 16529904
            }
        ];
    });
    define("data/utils/getPopulation", ["require", "exports", "data/population"], function (require, exports, population_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.getPopulation = (country = "World") => {
            if (country === "World") {
                return 7794798739; // Taken from https://www.worldometers.info/world-population/
            }
            else {
                const result = population_1.population.find(item => item.country === country);
                if (!result) {
                    console.error(new Error(`Population for ${country} not found`));
                    return 7794798739; // Taken from https://www.worldometers.info/world-population/
                }
                return result.population;
            }
        };
    });
    define("api/corona/getCorona", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        let cachedData;
        let fetchPromise = fetch("https://pomber.github.io/covid19/timeseries.json").then(response => response.json());
        exports.getCorona = () => __awaiter(void 0, void 0, void 0, function* () {
            if (cachedData) {
                return cachedData;
            }
            const data = yield fetchPromise;
            const dataKeys = Object.keys(data);
            if (!data["World"]) {
                const World = data["China"].map((chinaDatapoint, chinaIndex) => {
                    const worldDataPoint = {
                        date: chinaDatapoint.date,
                        confirmed: 0,
                        deaths: 0,
                        recovered: 0
                    };
                    dataKeys.forEach(key => {
                        const current = data[key][chinaIndex];
                        worldDataPoint.confirmed += current.confirmed;
                        worldDataPoint.deaths += current.deaths;
                        worldDataPoint.recovered += current.recovered;
                    });
                    return worldDataPoint;
                });
                data.World = World;
            }
            cachedData = data;
            return data;
        });
    });
    define("localstorage/utils/getChance", ["require", "exports", "localstorage/index", "data/utils/getPopulation", "api/corona/getCorona"], function (require, exports, index_4, getPopulation_1, getCorona_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.watchChances = (callback) => {
            index_4.watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
                callback();
            });
            index_4.watch("currentPopulation", currentPopulation => {
                callback();
            });
            index_4.watch("currentConfirmed", currentConfirmed => {
                callback();
            });
            index_4.watch("currentRecovered", currentRecovered => {
                callback();
            });
            index_4.watch("currentDeaths", currentDeaths => {
                callback();
            });
        };
        exports.getChance = (day = 0) => __awaiter(void 0, void 0, void 0, function* () {
            const undocumentedCasesMultiplicator = index_4.read("undocumentedCasesMultiplicator");
            const country = index_4.read("country") || "World";
            const currentPopulation = getPopulation_1.getPopulation(country);
            const corona = yield getCorona_1.getCorona();
            if (typeof corona === "undefined") {
                return;
            }
            const coronaData = corona[country];
            const coronaDataPoint = coronaData[coronaData.length - 1 - Math.abs(day)];
            const currentConfirmed = coronaDataPoint.confirmed;
            const currentRecovered = coronaDataPoint.recovered;
            const currentDeaths = coronaDataPoint.deaths;
            if (typeof undocumentedCasesMultiplicator === "undefined" ||
                typeof currentPopulation === "undefined" ||
                typeof currentConfirmed === "undefined" ||
                typeof currentRecovered === "undefined" ||
                typeof currentDeaths === "undefined") {
                return;
            }
            return (((currentConfirmed * undocumentedCasesMultiplicator -
                currentRecovered -
                currentDeaths) /
                currentPopulation) *
                100);
        });
    });
    define("localstorage/utils/normalizeOutput", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.normalizeOutput = (value) => {
            return Number((value >= 100 ? 100 : value).toFixed(4)).toString();
        };
    });
    define("components/people/PeopleList", ["require", "exports", "components/utils/Component", "localstorage/index", "components/people/AddPerson", "localstorage/utils/getChance", "localstorage/utils/normalizeOutput"], function (require, exports, Component_3, index_5, AddPerson_1, getChance_1, normalizeOutput_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class PeopleList extends Component_3.Component {
            constructor(element) {
                super(element);
                this.itemTemplate = document.getElementById("template-person-list-item");
                this.emptyItemTemplate = document.getElementById("template-person-list-empty-item");
                index_5.watch("people", people => {
                    this.people = people;
                    this.refreshPeopleList();
                });
                getChance_1.watchChances(() => {
                    this.refreshPeopleList();
                });
            }
            renderEmptyItem() {
                const template = this.emptyItemTemplate.content.children[0];
                const emptyItem = template.cloneNode(true);
                new AddPerson_1.AddPerson(emptyItem.querySelector("[data-add-person]"));
                return emptyItem;
            }
            renderItem(person, index) {
                return __awaiter(this, void 0, void 0, function* () {
                    const template = this.itemTemplate.content.children[0];
                    const personItem = template.cloneNode(true);
                    personItem.addEventListener("mouseover", () => personItem.classList.add("is-highlighted"));
                    personItem.addEventListener("mouseout", () => personItem.classList.remove("is-highlighted"));
                    personItem.querySelector("[data-name]").innerText = person.name;
                    personItem.querySelector("[data-day]").innerText =
                        person.day === 0
                            ? "Today"
                            : person.day === 1
                                ? "Yesterday"
                                : `${-person.day}`;
                    personItem.querySelector("[data-remove]").addEventListener("click", () => {
                        var _a;
                        (_a = this.people) === null || _a === void 0 ? void 0 : _a.splice(index, 1);
                        index_5.write("people", this.people);
                    });
                    const chance = yield getChance_1.getChance(person.day);
                    personItem.querySelector("[data-chance]").innerText = chance
                        ? normalizeOutput_1.normalizeOutput(chance)
                        : "-";
                    return personItem;
                });
            }
            clearChildren() {
                this.element.innerHTML = "";
            }
            refreshPeopleList() {
                var _a;
                return __awaiter(this, void 0, void 0, function* () {
                    this.clearChildren();
                    const emptyItem = this.renderEmptyItem();
                    this.element.appendChild(emptyItem);
                    (_a = this.people) === null || _a === void 0 ? void 0 : _a.forEach((person, index) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            this.element.insertBefore(yield this.renderItem(person, index), emptyItem);
                        }
                        catch (e) { }
                    }));
                });
            }
        }
        exports.PeopleList = PeopleList;
        PeopleList.component = "people-list";
    });
    define("components/people/PeopleTimeline", ["require", "exports", "components/utils/Component", "localstorage/utils/getChance", "localstorage/utils/normalizeOutput", "localstorage/index"], function (require, exports, Component_4, getChance_2, normalizeOutput_2, index_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class PeopleTimeline extends Component_4.Component {
            constructor(element) {
                super(element);
                console.log("people-timeline");
                this.itemTemplate = document.getElementById("template-timeline-item");
                this.containers = Array.from(document.querySelectorAll("[data-drag-container]"));
                this.refreshChances();
                this.refreshTimeline();
                new Draggable.Sortable(document.querySelectorAll("[data-drag-container]"), {
                    draggable: `.item-person`,
                    mirror: {
                        constrainDimensions: true
                    },
                    classes: {
                        // mirror: 'is-ghosted',
                        // 'source:origina': 'is-ghosted',
                        'source:dragging': 'is-ghosted',
                    },
                    plugins: [Draggable.Plugins.ResizeMirror]
                });
            }
            renderItem(person) {
                const template = this.itemTemplate.content.children[0];
                const personItem = template.cloneNode(true);
                personItem.addEventListener("mouseover", () => personItem.classList.add("is-highlighted"));
                personItem.addEventListener("mouseout", () => personItem.classList.remove("is-highlighted"));
                personItem.querySelector("[data-name]").innerText = person.name;
                return personItem;
            }
            refreshTimeline() {
                const people = index_6.read('people');
                people === null || people === void 0 ? void 0 : people.forEach((person) => {
                    this.renderItem(person);
                });
            }
            refreshChances() {
                const elements = this.element.querySelectorAll("[data-chance]");
                elements.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const day = parseInt(element.getAttribute("data-chance"), 10);
                    const chance = yield getChance_2.getChance(day);
                    element.innerText = chance ? normalizeOutput_2.normalizeOutput(chance) : "-";
                }));
            }
        }
        exports.PeopleTimeline = PeopleTimeline;
        PeopleTimeline.component = "people-timeline";
    });
    define("components/utils/InputComponent", ["require", "exports", "components/utils/Component"], function (require, exports, Component_5) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class InputComponent extends Component_5.Component {
            constructor(element) {
                super(element);
                this.isFocused = false;
                this.element = element;
                this.element.addEventListener("focus", () => (this.isFocused = true));
                this.element.addEventListener("blur", () => (this.isFocused = false));
            }
            getValueInt() {
                return parseInt(this.element.value, 10);
            }
        }
        exports.InputComponent = InputComponent;
    });
    define("components/undocumentedCasesMultiplicator/UndocumentedCasesMultiplicator", ["require", "exports", "localstorage/index", "components/utils/InputComponent"], function (require, exports, index_7, InputComponent_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class UndocumentedCasesMultiplicator extends InputComponent_1.InputComponent {
            constructor(element) {
                super(element);
                index_7.watch("undocumentedCasesMultiplicator", undocumentedCasesMultiplicator => {
                    if (!this.isFocused) {
                        this.element.value = undocumentedCasesMultiplicator
                            ? `${undocumentedCasesMultiplicator}`
                            : "";
                    }
                });
                this.element.addEventListener("input", () => {
                    index_7.write("undocumentedCasesMultiplicator", this.element.value ? parseInt(this.element.value, 10) : 0);
                });
            }
        }
        exports.UndocumentedCasesMultiplicator = UndocumentedCasesMultiplicator;
        UndocumentedCasesMultiplicator.component = "undocumented-cases-multiplicator";
    });
    define("components/undocumentedCasesMultiplicator/UndocumentedCasesMultiplicatorLoadData", ["require", "exports", "localstorage/index", "components/utils/Component"], function (require, exports, index_8, Component_6) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class UndocumentedCasesMultiplicatorLoadData extends Component_6.Component {
            constructor(element) {
                super(element);
                this.element.addEventListener("click", () => {
                    index_8.write("undocumentedCasesMultiplicator", 10);
                });
            }
        }
        exports.UndocumentedCasesMultiplicatorLoadData = UndocumentedCasesMultiplicatorLoadData;
        UndocumentedCasesMultiplicatorLoadData.component = "undocumented-cases-multiplicator-load-data";
    });
    define("components/TotalChance", ["require", "exports", "components/utils/Component", "localstorage/utils/getChance", "localstorage/utils/normalizeOutput", "localstorage/index"], function (require, exports, Component_7, getChance_3, normalizeOutput_3, index_9) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class TotalChance extends Component_7.Component {
            constructor(element) {
                super(element);
                getChance_3.watchChances(() => {
                    this.refresh();
                });
                index_9.watch("people", () => {
                    this.refresh();
                });
            }
            getTotalChance() {
                return __awaiter(this, void 0, void 0, function* () {
                    const people = index_9.read("people");
                    const peopleChances = [];
                    for (let i = 0; i < people.length; ++i) {
                        peopleChances.push((yield getChance_3.getChance(people[i].day)));
                    }
                    return ((1 -
                        peopleChances.reduce((previous, current) => {
                            return previous * (1 - current / 100);
                        }, 1)) *
                        100);
                });
            }
            getNormalizedOutput(value) {
                return normalizeOutput_3.normalizeOutput(value);
            }
            refresh() {
                return __awaiter(this, void 0, void 0, function* () {
                    const value = yield this.getTotalChance();
                    if (value) {
                        this.element.innerText = this.getNormalizedOutput(value);
                    }
                    else {
                        this.element.innerText = "-";
                    }
                });
            }
        }
        exports.TotalChance = TotalChance;
        TotalChance.component = "total-chance";
    });
    define("components/hospitalization/HospitalizationChance", ["require", "exports", "localstorage/index", "components/TotalChance"], function (require, exports, index_10, TotalChance_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class HospitalizationChance extends TotalChance_1.TotalChance {
            constructor(element) {
                super(element);
                index_10.watch('age', (age) => {
                    this.age = age;
                    this.refresh();
                });
                index_10.watch('hospitalizationRates', (hospitalizationRates) => {
                    this.hospitalizationRates = hospitalizationRates;
                    this.refresh();
                });
            }
            refresh() {
                return __awaiter(this, void 0, void 0, function* () {
                    const currentHospitalizationProbability = this.getCurrentHospitalizationProbability();
                    const totalChance = yield this.getTotalChance();
                    if (typeof currentHospitalizationProbability === "undefined" ||
                        typeof totalChance === "undefined") {
                        this.element.innerText = "-";
                    }
                    else {
                        this.element.innerText = this.getNormalizedOutput(totalChance * (currentHospitalizationProbability / 100));
                    }
                });
            }
            getCurrentHospitalizationProbability() {
                const hospitalizationRates = index_10.read("hospitalizationRates");
                const age = index_10.read("age");
                if (!hospitalizationRates)
                    return;
                if (age === "average") {
                    return (hospitalizationRates.reduce((previous, current) => previous + current, 0) / hospitalizationRates.length);
                }
                else if (typeof age !== "undefined") {
                    return hospitalizationRates[age];
                }
            }
        }
        exports.HospitalizationChance = HospitalizationChance;
        HospitalizationChance.component = "hospitalization-chance";
    });
    define("components/hospitalization/HospitalizationInput", ["require", "exports", "localstorage/index", "components/utils/InputComponent"], function (require, exports, index_11, InputComponent_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class HospitalizationInput extends InputComponent_2.InputComponent {
            constructor(element) {
                super(element);
                this.isAverage = false;
                const attributeValue = this.element.getAttribute(`data-${HospitalizationInput.component}`);
                if (attributeValue === "average") {
                    this.isAverage = true;
                }
                else {
                    this.index = parseInt(this.element.getAttribute(`data-${HospitalizationInput.component}`), 10);
                }
                index_11.watch("hospitalizationRates", hospitalizationRates => {
                    if (!this.isFocused && hospitalizationRates) {
                        if (typeof this.index !== "undefined" &&
                            typeof hospitalizationRates[this.index] !== "undefined" &&
                            parseInt(this.element.value, 10) !== hospitalizationRates[this.index]) {
                            this.element.value = `${hospitalizationRates[this.index]}`;
                        }
                        else if (this.isAverage) {
                            this.element.value = `${hospitalizationRates.reduce((previous, current) => previous + current, 0) / hospitalizationRates.length}`;
                        }
                    }
                });
                this.element.addEventListener("input", () => {
                    const hospitalizationRates = index_11.read("hospitalizationRates");
                    if (typeof this.index !== "undefined" && hospitalizationRates) {
                        hospitalizationRates[this.index] = this.getValueInt();
                        index_11.write("hospitalizationRates", hospitalizationRates);
                    }
                });
            }
        }
        exports.HospitalizationInput = HospitalizationInput;
        HospitalizationInput.component = "hospitalization-input";
    });
    define("data/hospitalizationRate", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.hospitalizationRate = {
            spain: [20, 27, 7, 15, 21, 21, 40, 40, 58, 58],
            usa: [20, 1.6, 1.6, 16, 16, 27, 26, 37, 41, 38],
            average: [20, 5.72, 1.76, 6.24, 18.5, 24, 33, 38.5, 49.5, 48]
        };
    });
    define("components/hospitalization/HospitalizationInputLoadData", ["require", "exports", "localstorage/index", "data/hospitalizationRate", "components/utils/Component"], function (require, exports, index_12, hospitalizationRate_1, Component_8) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class HospitalizationInputLoadData extends Component_8.Component {
            constructor(element) {
                super(element);
                this.key = this.element.getAttribute(`data-${HospitalizationInputLoadData.component}`);
                this.element.addEventListener("click", () => {
                    const rates = hospitalizationRate_1.hospitalizationRate[this.key];
                    if (rates) {
                        index_12.write("hospitalizationRates", rates);
                    }
                });
            }
        }
        exports.HospitalizationInputLoadData = HospitalizationInputLoadData;
        HospitalizationInputLoadData.component = "hospitalization-input-load-data";
    });
    define("components/death/DeathChance", ["require", "exports", "localstorage/index", "components/TotalChance"], function (require, exports, index_13, TotalChance_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class DeathChance extends TotalChance_2.TotalChance {
            constructor(element) {
                super(element);
                index_13.watch("age", age => {
                    this.age = age;
                    this.refresh();
                });
                index_13.watch("deathRates", deathRates => {
                    this.deathRates = deathRates;
                    this.refresh();
                });
            }
            refresh() {
                return __awaiter(this, void 0, void 0, function* () {
                    const currentDeathProbability = this.getCurrentDeathProbability();
                    const totalChance = yield this.getTotalChance();
                    if (typeof currentDeathProbability === "undefined" ||
                        typeof totalChance === "undefined") {
                        this.element.innerText = "-";
                    }
                    else {
                        this.element.innerText = this.getNormalizedOutput(totalChance * (currentDeathProbability / 100));
                    }
                });
            }
            getCurrentDeathProbability() {
                const deathRates = index_13.read("deathRates");
                const age = index_13.read("age");
                if (!deathRates)
                    return;
                if (age === "average") {
                    return (deathRates.reduce((previous, current) => previous + current, 0) /
                        deathRates.length);
                }
                else if (typeof age !== "undefined") {
                    return deathRates[age];
                }
            }
        }
        exports.DeathChance = DeathChance;
        DeathChance.component = "death-chance";
    });
    define("components/death/DeathInput", ["require", "exports", "localstorage/index", "components/utils/InputComponent"], function (require, exports, index_14, InputComponent_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class DeathInput extends InputComponent_3.InputComponent {
            constructor(element) {
                super(element);
                this.isAverage = false;
                const attributeValue = this.element.getAttribute(`data-${DeathInput.component}`);
                if (attributeValue === "average") {
                    this.isAverage = true;
                }
                else {
                    this.index = parseInt(this.element.getAttribute(`data-${DeathInput.component}`), 10);
                }
                index_14.watch("deathRates", deathRates => {
                    if (!this.isFocused && deathRates) {
                        if (typeof this.index !== "undefined" &&
                            typeof deathRates[this.index] !== "undefined" &&
                            parseInt(this.element.value, 10) !== deathRates[this.index]) {
                            this.element.value = `${deathRates[this.index]}`;
                        }
                        else if (this.isAverage) {
                            this.element.value = `${deathRates.reduce((previous, current) => previous + current, 0) / deathRates.length}`;
                        }
                    }
                });
                this.element.addEventListener("input", () => {
                    const deathRates = index_14.read("deathRates");
                    if (typeof this.index !== "undefined" && deathRates) {
                        deathRates[this.index] = this.getValueInt();
                        index_14.write("deathRates", deathRates);
                    }
                });
            }
        }
        exports.DeathInput = DeathInput;
        DeathInput.component = "death-input";
    });
    define("data/deathRate", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.deathRate = {
            china: [3.4, 0, 0.2, 0.2, 0.2, 0.4, 1.3, 3.6, 8, 14.8],
            italy: [3.4, 0, 0, 0, 0.3, 0.7, 1.7, 5.7, 16.9, 24.4],
            netherlands: [3.4, 0, 0, 0, 0, 0, 0.3, 3.7, 9.3, 19.1],
            southKorea: [3.4, 0, 0, 0, 0.1, 0.1, 0.6, 1.8, 6.5, 15.2],
            spain: [3.4, 0, 0.3, 0.2, 0.2, 0.4, 0.6, 2.1, 5.7, 15.3],
            average: [3.4, 0, 0.1, 0.08, 0.16, 0.32, 0.9, 3.38, 9.28, 17.76]
        };
    });
    define("components/death/DeathInputLoadData", ["require", "exports", "localstorage/index", "data/deathRate", "components/utils/Component"], function (require, exports, index_15, deathRate_1, Component_9) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class DeathInputLoadData extends Component_9.Component {
            constructor(element) {
                super(element);
                this.key = this.element.getAttribute(`data-${DeathInputLoadData.component}`);
                this.element.addEventListener("click", () => {
                    const rates = deathRate_1.deathRate[this.key];
                    if (rates) {
                        index_15.write("deathRates", rates);
                    }
                });
            }
        }
        exports.DeathInputLoadData = DeathInputLoadData;
        DeathInputLoadData.component = "death-input-load-data";
    });
    define("components/AgeSelect", ["require", "exports", "localstorage/index", "components/utils/InputComponent"], function (require, exports, index_16, InputComponent_4) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class AgeSelect extends InputComponent_4.InputComponent {
            constructor(element) {
                super(element);
                this.isAverage = false;
                index_16.watch("age", age => {
                    const ageString = `${age}`;
                    if (ageString !== this.element.value && age) {
                        this.element.value = ageString;
                    }
                });
                this.element.addEventListener("change", () => {
                    if (this.element.value === "average") {
                        index_16.write("age", this.element.value);
                    }
                    else {
                        index_16.write("age", parseInt(this.element.value, 10));
                    }
                });
            }
        }
        exports.AgeSelect = AgeSelect;
        AgeSelect.component = "age-select";
    });
    define("components/utils/SelectComponent", ["require", "exports", "components/utils/Component"], function (require, exports, Component_10) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class SelectComponent extends Component_10.Component {
            constructor(element) {
                super(element);
                this.element = element;
            }
        }
        exports.SelectComponent = SelectComponent;
    });
    define("components/CountrySelect", ["require", "exports", "components/utils/SelectComponent", "localstorage/index", "data/utils/getPopulation", "api/corona/getCorona"], function (require, exports, SelectComponent_1, index_17, getPopulation_2, getCorona_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        class CountrySelect extends SelectComponent_1.SelectComponent {
            constructor(element) {
                super(element);
                this.element.addEventListener("change", () => __awaiter(this, void 0, void 0, function* () {
                    index_17.write("country", this.element.value);
                    this.country = this.element.value;
                    if (!this.country)
                        return;
                    const data = (yield getCorona_2.getCorona())[this.country];
                    const lastDataPoint = data[data.length - 1];
                    if (!data || !lastDataPoint || !this.element.value)
                        return;
                    index_17.write("currentConfirmed", lastDataPoint.confirmed);
                    index_17.write("currentDeaths", lastDataPoint.deaths);
                    index_17.write("currentRecovered", lastDataPoint.recovered);
                    index_17.write("currentPopulation", getPopulation_2.getPopulation(this.element.value));
                }));
            }
        }
        exports.CountrySelect = CountrySelect;
        CountrySelect.component = "country-select";
    });
    define("components/index", ["require", "exports", "components/ui/Collapse", "components/ui/DisabledSection", "components/people/AddPerson", "components/people/People", "components/people/PeopleList", "components/people/PeopleTimeline", "components/undocumentedCasesMultiplicator/UndocumentedCasesMultiplicator", "components/undocumentedCasesMultiplicator/UndocumentedCasesMultiplicatorLoadData", "components/hospitalization/HospitalizationChance", "components/hospitalization/HospitalizationInput", "components/hospitalization/HospitalizationInputLoadData", "components/death/DeathChance", "components/death/DeathInput", "components/death/DeathInputLoadData", "components/AgeSelect", "components/CountrySelect", "components/TotalChance"], function (require, exports, Collapse_1, DisabledSection_1, AddPerson_2, People_1, PeopleList_1, PeopleTimeline_1, UndocumentedCasesMultiplicator_1, UndocumentedCasesMultiplicatorLoadData_1, HospitalizationChance_1, HospitalizationInput_1, HospitalizationInputLoadData_1, DeathChance_1, DeathInput_1, DeathInputLoadData_1, AgeSelect_1, CountrySelect_1, TotalChance_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const components = [
            // ui
            Collapse_1.Collapse,
            DisabledSection_1.DisabledSection,
            // people
            AddPerson_2.AddPerson,
            People_1.People,
            PeopleList_1.PeopleList,
            PeopleTimeline_1.PeopleTimeline,
            // undocumented cases multiplicator
            UndocumentedCasesMultiplicator_1.UndocumentedCasesMultiplicator,
            UndocumentedCasesMultiplicatorLoadData_1.UndocumentedCasesMultiplicatorLoadData,
            // hospitalization probability
            HospitalizationChance_1.HospitalizationChance,
            HospitalizationInput_1.HospitalizationInput,
            HospitalizationInputLoadData_1.HospitalizationInputLoadData,
            // death probability
            DeathChance_1.DeathChance,
            DeathInput_1.DeathInput,
            DeathInputLoadData_1.DeathInputLoadData,
            // components
            AgeSelect_1.AgeSelect,
            CountrySelect_1.CountrySelect,
            TotalChance_3.TotalChance
        ];
        exports.refreshComponents = () => {
            components.forEach(Component => {
                const elements = document.querySelectorAll(`[data-${Component.component}]`);
                Array.from(elements).map(element => new Component(element));
            });
        };
        exports.initComponents = exports.refreshComponents;
    });
    define("index", ["require", "exports", "api/index", "components/index", "localstorage/index", "data/deathRate", "data/hospitalizationRate", "data/utils/getPopulation", "api/corona/getCorona"], function (require, exports, index_18, index_19, index_20, deathRate_2, hospitalizationRate_2, getPopulation_3, getCorona_3) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        const { corona } = index_18.api;
        addEventListener("DOMContentLoaded", () => {
            index_19.initComponents();
        });
        // Clear data
        // TODO: Load data from url
        index_20.write('country', 'World');
        index_20.write("undocumentedCasesMultiplicator", 10);
        index_20.write("deathRates", deathRate_2.deathRate.average);
        index_20.write("hospitalizationRates", hospitalizationRate_2.hospitalizationRate.average);
        index_20.write("age", 0);
        index_20.write("people", [
            {
                day: 0,
                name: "A"
            },
            {
                day: 1,
                name: "B"
            }
        ]);
        index_20.write("currentPopulation", getPopulation_3.getPopulation("World"));
        console.log("Hello World");
        (() => __awaiter(void 0, void 0, void 0, function* () {
            // await corona.getCurrent();
            const worldData = (yield getCorona_3.getCorona())["World"];
            const data = worldData[worldData.length - 1];
            index_20.write("currentConfirmed", data.confirmed);
            index_20.write("currentRecovered", data.recovered);
            index_20.write("currentDeaths", data.deaths);
        }))();
    });
    
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