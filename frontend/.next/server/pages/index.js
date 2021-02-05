module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const api = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./communication/index.js":
/*!********************************!*\
  !*** ./communication/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Comunicacao; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Comunicacao {
  autenticar(email, password) {
    return fetch('http://192.168.100.66:3001/funcionarios/login', {
      method: 'POST',
      body: `email=${email}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        const retorninho = res.headers.get('Authorization');
        return retorninho;
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  bearerGET(token, path) {
    return new Promise(function (resolve, reject) {
      fetch(`http://192.168.100.66:3001${path} `, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${token} `
        }
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (result) {
            console.log('Comms: ' + result);
            resolve(result);
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        alert(err);
      });
    });
  }

  bearerPOST(token, path, body) {
    return fetch(`http://192.168.100.66:3001${path}`, {
      method: 'POST',
      body: `${body}`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      if (res.ok) {
        console.log(res);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    }).catch(err => {
      alert(err);
    });
  }

}

/***/ }),

/***/ "./components/MenuAppBar/index.js":
/*!****************************************!*\
  !*** ./components/MenuAppBar/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MenuAppBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/AppBar */ "@material-ui/core/AppBar");
/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Toolbar */ "@material-ui/core/Toolbar");
/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/IconButton */ "@material-ui/core/IconButton");
/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Menu */ "@material-ui/icons/Menu");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "C:\\Projetos - estudos\\lib-app\\frontend\\components\\MenuAppBar\\index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








const useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
function MenuAppBar({
  funcionario
}) {
  const classes = useStyles();
  const [funcionarioLogado, setFuncionarioLogado] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState({});
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (funcionario) {
      setFuncionarioLogado(funcionario);
    }
  });
  return __jsx("div", {
    className: classes.root,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default.a, {
    position: "static",
    color: "primary",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }
  }, __jsx(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_6___default.a, {
    edge: "start",
    className: classes.menuButton,
    color: "inherit",
    "aria-label": "menu",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 11
    }
  }, __jsx(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 13
    }
  })), __jsx(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "h6",
    className: classes.title,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 11
    }
  }, "LibApp"), !funcionario && __jsx(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_5___default.a, {
    color: "inherit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 28
    }
  }, "Login"), funcionario && __jsx(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_4___default.a, {
    variant: "h6",
    start: "end",
    className: classes.title,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 13
    }
  }, "Seja bem vindo, ", funcionario.nome))));
}

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_MenuAppBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/MenuAppBar */ "./components/MenuAppBar/index.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api */ "./api.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _logged__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logged */ "./pages/logged.js");
/* harmony import */ var _communication__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../communication */ "./communication/index.js");
var _jsxFileName = "C:\\Projetos - estudos\\lib-app\\frontend\\pages\\index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const Title = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1`
  font-size: 50px;
  color: ${({
  theme
}) => theme.palette.primary.dark};
`;
function Home() {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  const [email, setEmail] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('');
  const [password, setPassword] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('');
  const [token, setToken] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('');
  const communication = new _communication__WEBPACK_IMPORTED_MODULE_7__["default"]();

  const handleInputEmail = event => {
    setEmail(event.target.value);
  };

  const handleInputPassword = event => {
    setPassword(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    communication.autenticar(email, password).then(res => {
      localStorage.setItem('token', res);
    });
    router.push('/logged');
  };

  return __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, __jsx(_components_MenuAppBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }), __jsx("form", {
    onSubmit: onSubmit,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, "Login Below!"), __jsx("input", {
    type: "email",
    name: "email",
    placeholder: "Enter email",
    value: email,
    onChange: handleInputEmail,
    required: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }), __jsx("input", {
    type: "password",
    name: "password",
    placeholder: "Enter password",
    value: password,
    onChange: handleInputPassword,
    required: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45,
      columnNumber: 9
    }
  }), __jsx("input", {
    type: "submit",
    value: "Submit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 9
    }
  })));
}

/***/ }),

/***/ "./pages/logged.js":
/*!*************************!*\
  !*** ./pages/logged.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Logged; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_MenuAppBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/MenuAppBar */ "./components/MenuAppBar/index.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api */ "./api.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _communication__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../communication */ "./communication/index.js");
var _jsxFileName = "C:\\Projetos - estudos\\lib-app\\frontend\\pages\\logged.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;







const Title = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.h1`
  font-size: 50px;
  color: ${({
  theme
}) => theme.palette.primary.dark};
`;
function Logged() {
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])(); //const [token, setToken] = React.useState('');

  const [funcionarioLogado, setFuncionarioLogado] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]);
  const [listaFuncionarios, setListaFuncionarios] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]);
  const [listaLivros, setListaLivros] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]);
  const communication = new _communication__WEBPACK_IMPORTED_MODULE_6__["default"]();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    communication.bearerGET(localStorage.token, '/profile').then(values => {
      console.log(values);
      setFuncionarioLogado(values);
    });
    communication.bearerGET(localStorage.token, '/livros').then(values => {
      setListaLivros(values.livros);
    });
  }, []);
  return __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 5
    }
  }, __jsx(_components_MenuAppBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    funcionario: funcionarioLogado,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 7
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableContainer"], {
    component: _material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"],
    style: {
      align: 'center',
      height: 400,
      width: '100%'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    size: "small",
    "aria-label": "a dense table",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 9
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableHead"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 11
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 15
    }
  }, "Nome"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 15
    }
  }, "Autor"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 15
    }
  }, "Pre\xE7o"))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableBody"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44,
      columnNumber: 11
    }
  }, listaLivros.map((livro, index) => {
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
      key: `livro_${index}`,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47,
        columnNumber: 17
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48,
        columnNumber: 19
      }
    }, livro.nome), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49,
        columnNumber: 19
      }
    }, livro.autor), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 19
      }
    }, livro.preco));
  })))));
}

/***/ }),

/***/ "@material-ui/core":
/*!************************************!*\
  !*** external "@material-ui/core" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core");

/***/ }),

/***/ "@material-ui/core/AppBar":
/*!*******************************************!*\
  !*** external "@material-ui/core/AppBar" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/IconButton":
/*!***********************************************!*\
  !*** external "@material-ui/core/IconButton" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),

/***/ "@material-ui/core/Toolbar":
/*!********************************************!*\
  !*** external "@material-ui/core/Toolbar" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/icons/Menu":
/*!******************************************!*\
  !*** external "@material-ui/icons/Menu" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/Menu");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpLmpzIiwid2VicGFjazovLy8uL2NvbW11bmljYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZW51QXBwQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2xvZ2dlZC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL0FwcEJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL0J1dHRvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL0ljb25CdXR0b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG1hdGVyaWFsLXVpL2NvcmUvVHlwb2dyYXBoeVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9pY29ucy9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3R5bGVkLWNvbXBvbmVudHNcIiJdLCJuYW1lcyI6WyJhcGkiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiQ29tdW5pY2FjYW8iLCJhdXRlbnRpY2FyIiwiZW1haWwiLCJwYXNzd29yZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXMiLCJvayIsInJldG9ybmluaG8iLCJnZXQiLCJlcnJvciIsIkVycm9yIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiYWxlcnQiLCJiZWFyZXJHRVQiLCJ0b2tlbiIsInBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImpzb24iLCJyZXN1bHQiLCJsb2ciLCJiZWFyZXJQT1NUIiwidXNlU3R5bGVzIiwibWFrZVN0eWxlcyIsInRoZW1lIiwicm9vdCIsImZsZXhHcm93IiwibWVudUJ1dHRvbiIsIm1hcmdpblJpZ2h0Iiwic3BhY2luZyIsInRpdGxlIiwiTWVudUFwcEJhciIsImZ1bmNpb25hcmlvIiwiY2xhc3NlcyIsImZ1bmNpb25hcmlvTG9nYWRvIiwic2V0RnVuY2lvbmFyaW9Mb2dhZG8iLCJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0Iiwibm9tZSIsIlRpdGxlIiwic3R5bGVkIiwiaDEiLCJwYWxldHRlIiwicHJpbWFyeSIsImRhcmsiLCJIb21lIiwicm91dGVyIiwidXNlUm91dGVyIiwic2V0RW1haWwiLCJzZXRQYXNzd29yZCIsInNldFRva2VuIiwiY29tbXVuaWNhdGlvbiIsImhhbmRsZUlucHV0RW1haWwiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlSW5wdXRQYXNzd29yZCIsIm9uU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwicHVzaCIsIkxvZ2dlZCIsImxpc3RhRnVuY2lvbmFyaW9zIiwic2V0TGlzdGFGdW5jaW9uYXJpb3MiLCJsaXN0YUxpdnJvcyIsInNldExpc3RhTGl2cm9zIiwidmFsdWVzIiwibGl2cm9zIiwiUGFwZXIiLCJhbGlnbiIsImhlaWdodCIsIndpZHRoIiwibWFwIiwibGl2cm8iLCJpbmRleCIsImF1dG9yIiwicHJlY28iXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFhRCxLQUFLLENBQUNwQyxJQUFuQixDQURGLEVBRUUsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQWFvQyxLQUFLLENBQUNFLEtBQW5CLENBRkYsRUFHRSxNQUFDLDJEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBYUYsS0FBSyxDQUFDRyxLQUFuQixDQUhGLENBREY7QUFPRCxHQVJBLENBREgsQ0FSRixDQURGLENBRkYsQ0FERjtBQTJCRCxDOzs7Ozs7Ozs7OztBQzFERCw4Qzs7Ozs7Ozs7Ozs7QUNBQSxxRDs7Ozs7Ozs7Ozs7QUNBQSxxRDs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxzRDs7Ozs7Ozs7Ozs7QUNBQSx5RDs7Ozs7Ozs7Ozs7QUNBQSxxRDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw4QyIsImZpbGUiOiJwYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbmNvbnN0IGFwaSA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH1cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IGFwaTsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb211bmljYWNhbyB7XHJcblxyXG4gICAgYXV0ZW50aWNhcihlbWFpbCwgcGFzc3dvcmQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHA6Ly8xOTIuMTY4LjEwMC42NjozMDAxL2Z1bmNpb25hcmlvcy9sb2dpbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IGBlbWFpbD0ke2VtYWlsfSZwYXNzd29yZD0ke3Bhc3N3b3JkfWAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXRvcm5pbmhvID0gcmVzLmhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldG9ybmluaG87XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGxvZ2dpbmcgaW4gcGxlYXNlIHRyeSBhZ2FpbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiZWFyZXJHRVQodG9rZW4sIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBmZXRjaChgaHR0cDovLzE5Mi4xNjguMTAwLjY2OjMwMDEke3BhdGh9IGAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ0FjY2VwdCc6ICcqLyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufSBgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbXM6ICcgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJlYXJlclBPU1QodG9rZW4sIHBhdGgsIGJvZHkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xOTIuMTY4LjEwMC42NjozMDAxJHtwYXRofWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IGAke2JvZHl9YCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ0FjY2VwdCc6ICcqLyonLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xyXG5pbXBvcnQgQXBwQmFyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0FwcEJhcic7XHJcbmltcG9ydCBUb29sYmFyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL1Rvb2xiYXInO1xyXG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5JztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b24nO1xyXG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9JY29uQnV0dG9uJztcclxuaW1wb3J0IE1lbnVJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9NZW51JztcclxuXHJcbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoKHRoZW1lKSA9PiAoe1xyXG4gIHJvb3Q6IHtcclxuICAgIGZsZXhHcm93OiAxLFxyXG4gIH0sXHJcbiAgbWVudUJ1dHRvbjoge1xyXG4gICAgbWFyZ2luUmlnaHQ6IHRoZW1lLnNwYWNpbmcoMiksXHJcbiAgfSxcclxuICB0aXRsZToge1xyXG4gICAgZmxleEdyb3c6IDEsXHJcbiAgfSxcclxufSkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudUFwcEJhcih7IGZ1bmNpb25hcmlvIH0pIHtcclxuICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XHJcbiAgY29uc3QgW2Z1bmNpb25hcmlvTG9nYWRvLCBzZXRGdW5jaW9uYXJpb0xvZ2Fkb10gPSBSZWFjdC51c2VTdGF0ZSh7fSk7XHJcbiAgdXNlRWZmZWN0KCgpPT4ge1xyXG4gICAgaWYoZnVuY2lvbmFyaW8pIHtcclxuICAgICAgc2V0RnVuY2lvbmFyaW9Mb2dhZG8oZnVuY2lvbmFyaW8pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yb290fT5cclxuICAgICAgPEFwcEJhciBwb3NpdGlvbj1cInN0YXRpY1wiIGNvbG9yPSdwcmltYXJ5Jz5cclxuICAgICAgICA8VG9vbGJhcj5cclxuICAgICAgICAgIDxJY29uQnV0dG9uIGVkZ2U9XCJzdGFydFwiIGNsYXNzTmFtZT17Y2xhc3Nlcy5tZW51QnV0dG9ufSBjb2xvcj1cImluaGVyaXRcIiBhcmlhLWxhYmVsPVwibWVudVwiPlxyXG4gICAgICAgICAgICA8TWVudUljb24gLz5cclxuICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiIGNsYXNzTmFtZT17Y2xhc3Nlcy50aXRsZX0+XHJcbiAgICAgICAgICAgIExpYkFwcFxyXG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAgeyFmdW5jaW9uYXJpbyAmJiA8QnV0dG9uIGNvbG9yPVwiaW5oZXJpdFwiPkxvZ2luPC9CdXR0b24+fVxyXG4gICAgICAgICAge2Z1bmNpb25hcmlvICYmIChcclxuICAgICAgICAgICAgPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgc3RhcnQ9J2VuZCcgY2xhc3NOYW1lPXtjbGFzc2VzLnRpdGxlfT5cclxuICAgICAgICAgICAgU2VqYSBiZW0gdmluZG8sIHtmdW5jaW9uYXJpby5ub21lfVxyXG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L1Rvb2xiYXI+XHJcbiAgICAgIDwvQXBwQmFyPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufSIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5pbXBvcnQgeyB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlJ1xuaW1wb3J0IE1lbnVBcHBCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9NZW51QXBwQmFyJ1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGknO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgTG9nZ2VkIGZyb20gJy4vbG9nZ2VkJztcbmltcG9ydCBDb211bmljYWNhbyBmcm9tICcuLi9jb21tdW5pY2F0aW9uJztcbmNvbnN0IFRpdGxlID0gc3R5bGVkLmgxYFxuICBmb250LXNpemU6IDUwcHg7XG4gIGNvbG9yOiAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLnBhbGV0dGUucHJpbWFyeS5kYXJrfTtcbmBcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gUmVhY3QudXNlU3RhdGUoJycpO1xuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Rva2VuLCBzZXRUb2tlbl0gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IGNvbW11bmljYXRpb24gPSBuZXcgQ29tdW5pY2FjYW8oKTtcbiAgY29uc3QgaGFuZGxlSW5wdXRFbWFpbCA9IChldmVudCkgPT4ge1xuICAgIHNldEVtYWlsKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cbiAgY29uc3QgaGFuZGxlSW5wdXRQYXNzd29yZCA9IChldmVudCkgPT4ge1xuICAgIHNldFBhc3N3b3JkKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIH1cbiAgY29uc3Qgb25TdWJtaXQgPSAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbW11bmljYXRpb24uYXV0ZW50aWNhcihlbWFpbCwgcGFzc3dvcmQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgcmVzKTtcbiAgICAgIH0pO1xuICAgIHJvdXRlci5wdXNoKCcvbG9nZ2VkJyk7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPE1lbnVBcHBCYXIgLz5cbiAgICAgIDxmb3JtIG9uU3VibWl0PXtvblN1Ym1pdH0+XG4gICAgICAgIDxoMT5Mb2dpbiBCZWxvdyE8L2gxPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBlbWFpbFwiXG4gICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbnB1dEVtYWlsfVxuICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgIC8+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHBhc3N3b3JkXCJcbiAgICAgICAgICB2YWx1ZT17cGFzc3dvcmR9XG4gICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUlucHV0UGFzc3dvcmR9XG4gICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgLz5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiIC8+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIClcbn0iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcclxuaW1wb3J0IHsgQnV0dG9uLCBEYXRhR3JpZCwgVGFibGVDZWxsLCBUYWJsZUJvZHksIFRhYmxlQ29udGFpbmVyLCBUYWJsZUhlYWQsIFRhYmxlUm93LCBUYWJsZSwgUGFwZXIgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSdcclxuaW1wb3J0IE1lbnVBcHBCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9NZW51QXBwQmFyJ1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xyXG5pbXBvcnQgQ29tdW5pY2FjYW8gZnJvbSAnLi4vY29tbXVuaWNhdGlvbic7XHJcbmNvbnN0IFRpdGxlID0gc3R5bGVkLmgxYFxyXG4gIGZvbnQtc2l6ZTogNTBweDtcclxuICBjb2xvcjogJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS5wYWxldHRlLnByaW1hcnkuZGFya307XHJcbmBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExvZ2dlZCgpIHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICAvL2NvbnN0IFt0b2tlbiwgc2V0VG9rZW5dID0gUmVhY3QudXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFtmdW5jaW9uYXJpb0xvZ2Fkbywgc2V0RnVuY2lvbmFyaW9Mb2dhZG9dID0gUmVhY3QudXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsaXN0YUZ1bmNpb25hcmlvcywgc2V0TGlzdGFGdW5jaW9uYXJpb3NdID0gUmVhY3QudXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFtsaXN0YUxpdnJvcywgc2V0TGlzdGFMaXZyb3NdID0gUmVhY3QudXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IGNvbW11bmljYXRpb24gPSBuZXcgQ29tdW5pY2FjYW8oKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29tbXVuaWNhdGlvbi5iZWFyZXJHRVQobG9jYWxTdG9yYWdlLnRva2VuLCAnL3Byb2ZpbGUnKVxyXG4gICAgLnRoZW4oKHZhbHVlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7XHJcbiAgICAgIHNldEZ1bmNpb25hcmlvTG9nYWRvKHZhbHVlcyk7XHJcbiAgICB9KSlcclxuXHJcbiAgICBjb21tdW5pY2F0aW9uLmJlYXJlckdFVChsb2NhbFN0b3JhZ2UudG9rZW4sICcvbGl2cm9zJylcclxuICAgIC50aGVuKCh2YWx1ZXMpID0+IHtcclxuICAgICAgc2V0TGlzdGFMaXZyb3ModmFsdWVzLmxpdnJvcyk7XHJcbiAgICB9KVxyXG4gIH0sIFtdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPE1lbnVBcHBCYXIgZnVuY2lvbmFyaW89e2Z1bmNpb25hcmlvTG9nYWRvfS8+XHJcbiAgICAgIDxUYWJsZUNvbnRhaW5lciBjb21wb25lbnQ9e1BhcGVyfSBzdHlsZT17eyBhbGlnbjogJ2NlbnRlcicsIGhlaWdodDogNDAwLCB3aWR0aDogJzEwMCUnIH19PlxyXG4gICAgICAgIDxUYWJsZSBzaXplPSdzbWFsbCcgYXJpYS1sYWJlbD0nYSBkZW5zZSB0YWJsZSc+XHJcbiAgICAgICAgICA8VGFibGVIZWFkPlxyXG4gICAgICAgICAgICA8VGFibGVSb3c+XHJcbiAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5Ob21lPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgICAgPFRhYmxlQ2VsbD5BdXRvcjwvVGFibGVDZWxsPlxyXG4gICAgICAgICAgICAgIDxUYWJsZUNlbGw+UHJlw6dvPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgICAgICA8L1RhYmxlSGVhZD5cclxuICAgICAgICAgIDxUYWJsZUJvZHk+XHJcbiAgICAgICAgICAgIHtsaXN0YUxpdnJvcy5tYXAoKGxpdnJvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtgbGl2cm9fJHtpbmRleH1gfT5cclxuICAgICAgICAgICAgICAgICAgPFRhYmxlQ2VsbCA+e2xpdnJvLm5vbWV9PC9UYWJsZUNlbGwgPlxyXG4gICAgICAgICAgICAgICAgICA8VGFibGVDZWxsID57bGl2cm8uYXV0b3J9PC9UYWJsZUNlbGwgPlxyXG4gICAgICAgICAgICAgICAgICA8VGFibGVDZWxsID57bGl2cm8ucHJlY299PC9UYWJsZUNlbGwgPlxyXG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9UYWJsZUJvZHk+XHJcbiAgICAgICAgPC9UYWJsZT5cclxuICAgICAgPC9UYWJsZUNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9jb3JlL0FwcEJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZS9CdXR0b25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2NvcmUvSWNvbkJ1dHRvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvY29yZS9Ub29sYmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9jb3JlL1R5cG9ncmFwaHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9NZW51XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=