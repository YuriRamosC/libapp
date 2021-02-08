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
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/icons/Menu */ "@material-ui/icons/Menu");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "@material-ui/icons/AccountCircle");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_5__);
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
  funcionario,
  listarLivros,
  listarClientes
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
      lineNumber: 29,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_2___default.a, {
    position: "static",
    color: "primary",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Toolbar"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["IconButton"], {
    edge: "start",
    className: classes.menuButton,
    color: "inherit",
    "aria-label": "menu",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 11
    }
  }, __jsx(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 13
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], {
    variant: "h6",
    className: classes.title,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 11
    }
  }, "LibApp"), funcionario && __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Typography"], {
    variant: "h6",
    className: classes.title,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 29
    }
  }, " Seja bem vindo, ", funcionario.nome), !funcionario && __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    color: "inherit",
    href: "/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 28
    }
  }, "Login"), funcionario && __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 13
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    color: "inherit",
    onClick: listarLivros,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 15
    }
  }, "Livros"), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    color: "inherit",
    onClick: listarClientes,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 15
    }
  }, "Clientes")))));
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
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_MenuAppBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/MenuAppBar */ "./components/MenuAppBar/index.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api */ "./api.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _logged__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logged */ "./pages/logged.js");
/* harmony import */ var _communication__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../communication */ "./communication/index.js");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/Menu */ "@material-ui/icons/Menu");
/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ "@material-ui/icons/AccountCircle");
/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/LockOutlined */ "@material-ui/icons/LockOutlined");
/* harmony import */ var _material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../theme */ "./theme.js");
var _jsxFileName = "C:\\Projetos - estudos\\lib-app\\frontend\\pages\\index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;











const stylesLogin = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["makeStyles"])(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
function Home() {
  const classes = stylesLogin();
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  const [email, setEmail] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('');
  const [password, setPassword] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('');
  const [token, setToken] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState('');
  const communication = new _communication__WEBPACK_IMPORTED_MODULE_6__["default"]();

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
      lineNumber: 55,
      columnNumber: 5
    }
  }, __jsx(_components_MenuAppBar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    maxWidth: "xs",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Paper"], {
    elevation: 4,
    align: "center",
    className: classes.paper,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 9
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 11
    }
  }, __jsx(_material_ui_icons_LockOutlined__WEBPACK_IMPORTED_MODULE_9___default.a, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 13
    }
  })), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Typography"], {
    component: "h1",
    variant: "h5",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 11
    }
  }, "Logar"), __jsx("form", {
    onSubmit: onSubmit,
    align: "center",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 11
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    id: "email-input",
    type: "email",
    name: "email",
    fullWidth: true,
    variant: "outlined",
    autoComplete: "email",
    margin: "normal",
    autoFocus: true,
    value: email,
    onChange: handleInputEmail,
    required: true,
    label: "Digite o email",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 13
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["TextField"], {
    id: "type-password",
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    autoComplete: "current-password",
    value: password,
    onChange: handleInputPassword,
    required: true,
    label: "Digite a sua senha",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 13
    }
  }), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    fullWidth: true,
    type: "submit",
    variant: "contained",
    color: "primary",
    className: classes.submit,
    value: "Submit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 13
    }
  }, "Confirmar")))));
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
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../theme */ "./theme.js");
var _jsxFileName = "C:\\Projetos - estudos\\lib-app\\frontend\\pages\\logged.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;








const screenStates = {
  LIVROS: 'LIVROS',
  CLIENTES: 'CLIENTES',
  FUNCIONARIOS: 'FUNCIONARIOS',
  DEFAULT: 'DEFAULT'
};
const StyledTableCell = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.contrastText
  },
  body: {
    fontSize: 14
  }
}))(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"]);
function Logged() {
  const [screenState, setScreenState] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(screenStates.LIVROS);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_5__["useRouter"])();
  const [funcionarioLogado, setFuncionarioLogado] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]);
  const [listaLivros, setListaLivros] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]);
  const [listaClientes, setListaClientes] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]);
  const communication = new _communication__WEBPACK_IMPORTED_MODULE_6__["default"]();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    communication.bearerGET(localStorage.token, '/profile').then(values => {
      setFuncionarioLogado(values);
    });
    communication.bearerGET(localStorage.token, '/livros').then(values => {
      setListaLivros(values.livros);
    });
    communication.bearerGET(localStorage.token, '/clientes').then(values => {
      setListaClientes(values.clientes);
    });
  }, []);

  function listarLivros() {
    setScreenState(screenStates.LIVROS);
  }

  function listarClientes() {
    setScreenState(screenStates.CLIENTES);
  }

  return __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55,
      columnNumber: 5
    }
  }, __jsx(_components_MenuAppBar__WEBPACK_IMPORTED_MODULE_3__["default"], {
    funcionario: funcionarioLogado,
    listarLivros: listarLivros,
    listarClientes: listarClientes,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56,
      columnNumber: 7
    }
  }), screenState === screenStates.LIVROS && __jsx(TabelaLivros, {
    listaLivros: listaLivros,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 48
    }
  }), screenState === screenStates.CLIENTES && __jsx(TabelaClientes, {
    listaClientes: listaClientes,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 49
    }
  }));
}

function TabelaLivros({
  listaLivros
}) {
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableContainer"], {
    component: _material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"],
    style: {
      align: 'center',
      height: 400,
      width: '100%'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    size: "small",
    "aria-label": "a dense table",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableHead"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68,
      columnNumber: 9
    }
  }, __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 11
    }
  }, "Nome"), __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 11
    }
  }, "Autor"), __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 11
    }
  }, "Pre\xE7o"))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableBody"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }
  }, listaLivros.map((livro, index) => {
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
      key: `livro_${index}`,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 77,
        columnNumber: 13
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 15
      }
    }, livro.nome), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 79,
        columnNumber: 15
      }
    }, livro.autor), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80,
        columnNumber: 15
      }
    }, livro.preco));
  }))));
}

function TabelaClientes({
  listaClientes
}) {
  return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableContainer"], {
    component: _material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Paper"],
    style: {
      align: 'center',
      height: 400,
      width: '100%'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Table"], {
    size: "small",
    "aria-label": "a dense table",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93,
      columnNumber: 5
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableHead"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 7
    }
  }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95,
      columnNumber: 9
    }
  }, __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96,
      columnNumber: 11
    }
  }, "Nome"), __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97,
      columnNumber: 11
    }
  }, "CPF"), __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98,
      columnNumber: 11
    }
  }, "Email"), __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 11
    }
  }, "Telefone"), __jsx(StyledTableCell, {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100,
      columnNumber: 11
    }
  }, "Multa atual"))), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableBody"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }
  }, listaClientes.map((cliente, index) => {
    return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableRow"], {
      key: `cliente_${index}`,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 13
      }
    }, __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 15
      }
    }, cliente.nome), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 15
      }
    }, cliente.cpf), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 15
      }
    }, cliente.email), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 110,
        columnNumber: 15
      }
    }, cliente.telefone), __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["TableCell"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 111,
        columnNumber: 15
      }
    }, cliente.multa));
  }))));
}

/***/ }),

/***/ "./theme.js":
/*!******************!*\
  !*** ./theme.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core */ "@material-ui/core");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__);


const theme = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__["createMuiTheme"])({
  palette: {
    primary: {
      light: '#7e5dc0',
      main: '#5e35b1',
      dark: '#41257b',
      contrastText: '#fff'
    },
    secondary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
      contrastText: '#fff'
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (theme);

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

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),

/***/ "@material-ui/icons/AccountCircle":
/*!***************************************************!*\
  !*** external "@material-ui/icons/AccountCircle" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AccountCircle");

/***/ }),

/***/ "@material-ui/icons/LockOutlined":
/*!**************************************************!*\
  !*** external "@material-ui/icons/LockOutlined" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/LockOutlined");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBpLmpzIiwid2VicGFjazovLy8uL2NvbW11bmljYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZW51QXBwQmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3BhZ2VzL2xvZ2dlZC5qcyIsIndlYnBhY2s6Ly8vLi90aGVtZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbWF0ZXJpYWwtdWkvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL0FwcEJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9pY29ucy9BY2NvdW50Q2lyY2xlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQG1hdGVyaWFsLXVpL2ljb25zL0xvY2tPdXRsaW5lZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBtYXRlcmlhbC11aS9pY29ucy9NZW51XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3R5bGVkLWNvbXBvbmVudHNcIiJdLCJuYW1lcyI6WyJhcGkiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiQ29tdW5pY2FjYW8iLCJhdXRlbnRpY2FyIiwiZW1haWwiLCJwYXNzd29yZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXMiLCJvayIsInJldG9ybmluaG8iLCJnZXQiLCJlcnJvciIsIkVycm9yIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwiYWxlcnQiLCJiZWFyZXJHRVQiLCJ0b2tlbiIsInBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImpzb24iLCJyZXN1bHQiLCJsb2ciLCJiZWFyZXJQT1NUIiwidXNlU3R5bGVzIiwibWFrZVN0eWxlcyIsInRoZW1lIiwicm9vdCIsImZsZXhHcm93IiwibWVudUJ1dHRvbiIsIm1hcmdpblJpZ2h0Iiwic3BhY2luZyIsInRpdGxlIiwiTWVudUFwcEJhciIsImZ1bmNpb25hcmlvIiwibGlzdGFyTGl2cm9zIiwibGlzdGFyQ2xpZW50ZXMiLCJjbGFzc2VzIiwiZnVuY2lvbmFyaW9Mb2dhZG8iLCJzZXRGdW5jaW9uYXJpb0xvZ2FkbyIsIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJub21lIiwic3R5bGVzTG9naW4iLCJwYXBlciIsIm1hcmdpblRvcCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImF2YXRhciIsIm1hcmdpbiIsImJhY2tncm91bmRDb2xvciIsInBhbGV0dGUiLCJzZWNvbmRhcnkiLCJtYWluIiwiZm9ybSIsIndpZHRoIiwic3VibWl0IiwiSG9tZSIsInJvdXRlciIsInVzZVJvdXRlciIsInNldEVtYWlsIiwic2V0UGFzc3dvcmQiLCJzZXRUb2tlbiIsImNvbW11bmljYXRpb24iLCJoYW5kbGVJbnB1dEVtYWlsIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZUlucHV0UGFzc3dvcmQiLCJvblN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInB1c2giLCJzY3JlZW5TdGF0ZXMiLCJMSVZST1MiLCJDTElFTlRFUyIsIkZVTkNJT05BUklPUyIsIkRFRkFVTFQiLCJTdHlsZWRUYWJsZUNlbGwiLCJ3aXRoU3R5bGVzIiwiaGVhZCIsImRhcmsiLCJjb2xvciIsImNvbnRyYXN0VGV4dCIsImZvbnRTaXplIiwiVGFibGVDZWxsIiwiTG9nZ2VkIiwic2NyZWVuU3RhdGUiLCJzZXRTY3JlZW5TdGF0ZSIsImxpc3RhTGl2cm9zIiwic2V0TGlzdGFMaXZyb3MiLCJsaXN0YUNsaWVudGVzIiwic2V0TGlzdGFDbGllbnRlcyIsInZhbHVlcyIsImxpdnJvcyIsImNsaWVudGVzIiwiVGFiZWxhTGl2cm9zIiwiUGFwZXIiLCJhbGlnbiIsImhlaWdodCIsIm1hcCIsImxpdnJvIiwiaW5kZXgiLCJhdXRvciIsInByZWNvIiwiVGFiZWxhQ2xpZW50ZXMiLCJjbGllbnRlIiwiY3BmIiwidGVsZWZvbmUiLCJtdWx0YSIsImNyZWF0ZU11aVRoZW1lIiwicHJpbWFyeSIsImxpZ2h0Il0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsSUFBSTtRQUNKO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDeEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsTUFBTUEsR0FBRyxHQUFHQyw0Q0FBSyxDQUFDQyxNQUFOLENBQWE7QUFDckJDLFNBQU8sRUFBRSx1QkFEWTtBQUVyQkMsU0FBTyxFQUFFO0FBQ0wsY0FBVSxrQkFETDtBQUVMLG9CQUFnQjtBQUZYO0FBRlksQ0FBYixDQUFaO0FBT2VKLGtFQUFmLEU7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDZSxNQUFNSyxXQUFOLENBQWtCO0FBRTdCQyxZQUFVLENBQUNDLEtBQUQsRUFBUUMsUUFBUixFQUFrQjtBQUN4QixXQUFPQyxLQUFLLENBQUMsK0NBQUQsRUFBa0Q7QUFDMURDLFlBQU0sRUFBRSxNQURrRDtBQUUxREMsVUFBSSxFQUFHLFNBQVFKLEtBQU0sYUFBWUMsUUFBUyxFQUZnQjtBQUcxREosYUFBTyxFQUFFO0FBQ0wsd0JBQWdCLG1DQURYO0FBQ2dELGtCQUFVO0FBRDFEO0FBSGlELEtBQWxELENBQUwsQ0FPRlEsSUFQRSxDQU9HQyxHQUFHLElBQUk7QUFDVCxVQUFJQSxHQUFHLENBQUNDLEVBQVIsRUFBWTtBQUNSLGNBQU1DLFVBQVUsR0FBR0YsR0FBRyxDQUFDVCxPQUFKLENBQVlZLEdBQVosQ0FBZ0IsZUFBaEIsQ0FBbkI7QUFDQSxlQUFPRCxVQUFQO0FBQ0gsT0FIRCxNQUdPO0FBQ0gsY0FBTUUsS0FBSyxHQUFHLElBQUlDLEtBQUosQ0FBVUwsR0FBRyxDQUFDSSxLQUFkLENBQWQ7QUFDQSxjQUFNQSxLQUFOO0FBQ0g7QUFDSixLQWZFLEVBZ0JGRSxLQWhCRSxDQWdCSUMsR0FBRyxJQUFJO0FBQ1ZDLGFBQU8sQ0FBQ0osS0FBUixDQUFjRyxHQUFkO0FBQ0FFLFdBQUssQ0FBQyxtQ0FBRCxDQUFMO0FBQ0gsS0FuQkUsQ0FBUDtBQW9CSDs7QUFFREMsV0FBUyxDQUFDQyxLQUFELEVBQVFDLElBQVIsRUFBYztBQUNuQixXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQ25CLFdBQUssQ0FBRSw2QkFBNEJnQixJQUFLLEdBQW5DLEVBQXVDO0FBQ3hDZixjQUFNLEVBQUUsS0FEZ0M7QUFFeENOLGVBQU8sRUFBRTtBQUNMLDBCQUFnQixrQkFEWDtBQUMrQixvQkFBVSxLQUR6QztBQUVMLDJCQUFrQixVQUFTb0IsS0FBTTtBQUY1QjtBQUYrQixPQUF2QyxDQUFMLENBT0laLElBUEosQ0FPUyxVQUFVQyxHQUFWLEVBQWU7QUFDaEIsWUFBSUEsR0FBRyxDQUFDQyxFQUFSLEVBQVk7QUFDUkQsYUFBRyxDQUFDZ0IsSUFBSixHQUFXakIsSUFBWCxDQUFnQixVQUFVa0IsTUFBVixFQUFrQjtBQUM5QlQsbUJBQU8sQ0FBQ1UsR0FBUixDQUFZLFlBQVlELE1BQXhCO0FBQ0FILG1CQUFPLENBQUNHLE1BQUQsQ0FBUDtBQUNILFdBSEQ7QUFJSCxTQUxELE1BS087QUFDSCxnQkFBTWIsS0FBSyxHQUFHLElBQUlDLEtBQUosQ0FBVUwsR0FBRyxDQUFDSSxLQUFkLENBQWQ7QUFDQSxnQkFBTUEsS0FBTjtBQUNIO0FBQ0osT0FqQkwsRUFpQk9FLEtBakJQLENBaUJhQyxHQUFHLElBQUk7QUFDWkUsYUFBSyxDQUFDRixHQUFELENBQUw7QUFDSCxPQW5CTDtBQW9CSCxLQXJCTSxDQUFQO0FBc0JIOztBQUNEWSxZQUFVLENBQUNSLEtBQUQsRUFBUUMsSUFBUixFQUFjZCxJQUFkLEVBQW9CO0FBQzFCLFdBQU9GLEtBQUssQ0FBRSw2QkFBNEJnQixJQUFLLEVBQW5DLEVBQXNDO0FBQzlDZixZQUFNLEVBQUUsTUFEc0M7QUFFOUNDLFVBQUksRUFBRyxHQUFFQSxJQUFLLEVBRmdDO0FBRzlDUCxhQUFPLEVBQUU7QUFDTCx3QkFBZ0Isa0JBRFg7QUFDK0Isa0JBQVUsS0FEekM7QUFFTCx5QkFBa0IsVUFBU29CLEtBQU07QUFGNUI7QUFIcUMsS0FBdEMsQ0FBTCxDQVFGWixJQVJFLENBUUdDLEdBQUcsSUFBSTtBQUNULFVBQUlBLEdBQUcsQ0FBQ0MsRUFBUixFQUFZO0FBQ1JPLGVBQU8sQ0FBQ1UsR0FBUixDQUFZbEIsR0FBWjtBQUNILE9BRkQsTUFFTztBQUNILGNBQU1JLEtBQUssR0FBRyxJQUFJQyxLQUFKLENBQVVMLEdBQUcsQ0FBQ0ksS0FBZCxDQUFkO0FBQ0EsY0FBTUEsS0FBTjtBQUNIO0FBQ0osS0FmRSxFQWVBRSxLQWZBLENBZU1DLEdBQUcsSUFBSTtBQUNaRSxXQUFLLENBQUNGLEdBQUQsQ0FBTDtBQUNILEtBakJFLENBQVA7QUFrQkg7O0FBcEU0QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRGpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU1hLFNBQVMsR0FBR0MsMkVBQVUsQ0FBRUMsS0FBRCxLQUFZO0FBQ3ZDQyxNQUFJLEVBQUU7QUFDSkMsWUFBUSxFQUFFO0FBRE4sR0FEaUM7QUFJdkNDLFlBQVUsRUFBRTtBQUNWQyxlQUFXLEVBQUVKLEtBQUssQ0FBQ0ssT0FBTixDQUFjLENBQWQ7QUFESCxHQUoyQjtBQU92Q0MsT0FBSyxFQUFFO0FBQ0xKLFlBQVEsRUFBRTtBQURMO0FBUGdDLENBQVosQ0FBRCxDQUE1QjtBQVllLFNBQVNLLFVBQVQsQ0FBb0I7QUFBRUMsYUFBRjtBQUFlQyxjQUFmO0FBQTZCQztBQUE3QixDQUFwQixFQUFtRTtBQUNoRixRQUFNQyxPQUFPLEdBQUdiLFNBQVMsRUFBekI7QUFDQSxRQUFNLENBQUNjLGlCQUFELEVBQW9CQyxvQkFBcEIsSUFBNENDLDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxFQUFmLENBQWxEO0FBQ0FDLHlEQUFTLENBQUMsTUFBTTtBQUNkLFFBQUlSLFdBQUosRUFBaUI7QUFDZkssMEJBQW9CLENBQUNMLFdBQUQsQ0FBcEI7QUFDRDtBQUNGLEdBSlEsQ0FBVDtBQUtBLFNBQ0U7QUFBSyxhQUFTLEVBQUVHLE9BQU8sQ0FBQ1YsSUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsK0RBQUQ7QUFBUSxZQUFRLEVBQUMsUUFBakI7QUFBMEIsU0FBSyxFQUFDLFNBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHlEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLDREQUFEO0FBQVksUUFBSSxFQUFDLE9BQWpCO0FBQXlCLGFBQVMsRUFBRVUsT0FBTyxDQUFDUixVQUE1QztBQUF3RCxTQUFLLEVBQUMsU0FBOUQ7QUFBd0Usa0JBQVcsTUFBbkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsOERBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLENBREYsRUFJRSxNQUFDLDREQUFEO0FBQVksV0FBTyxFQUFDLElBQXBCO0FBQXlCLGFBQVMsRUFBRVEsT0FBTyxDQUFDTCxLQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBSkYsRUFPR0UsV0FBVyxJQUFNLE1BQUMsNERBQUQ7QUFBWSxXQUFPLEVBQUMsSUFBcEI7QUFBeUIsYUFBUyxFQUFFRyxPQUFPLENBQUNMLEtBQTVDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQXFFRSxXQUFXLENBQUNTLElBQWpGLENBUHBCLEVBUUcsQ0FBQ1QsV0FBRCxJQUFnQixNQUFDLHdEQUFEO0FBQVEsU0FBSyxFQUFDLFNBQWQ7QUFBd0IsUUFBSSxFQUFDLEdBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFSbkIsRUFTR0EsV0FBVyxJQUNWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLHdEQUFEO0FBQVEsU0FBSyxFQUFDLFNBQWQ7QUFBd0IsV0FBTyxFQUFFQyxZQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsRUFFRSxNQUFDLHdEQUFEO0FBQVEsU0FBSyxFQUFDLFNBQWQ7QUFBd0IsV0FBTyxFQUFFQyxjQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUZGLENBVkosQ0FERixDQURGLENBREY7QUFzQkQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTVEsV0FBVyxHQUFHbkIsb0VBQVUsQ0FBRUMsS0FBRCxLQUFZO0FBQ3pDbUIsT0FBSyxFQUFFO0FBQ0xDLGFBQVMsRUFBRXBCLEtBQUssQ0FBQ0ssT0FBTixDQUFjLENBQWQsQ0FETjtBQUVMZ0IsV0FBTyxFQUFFLE1BRko7QUFHTEMsaUJBQWEsRUFBRSxRQUhWO0FBSUxDLGNBQVUsRUFBRTtBQUpQLEdBRGtDO0FBT3pDQyxRQUFNLEVBQUU7QUFDTkMsVUFBTSxFQUFFekIsS0FBSyxDQUFDSyxPQUFOLENBQWMsQ0FBZCxDQURGO0FBRU5xQixtQkFBZSxFQUFFMUIsS0FBSyxDQUFDMkIsT0FBTixDQUFjQyxTQUFkLENBQXdCQztBQUZuQyxHQVBpQztBQVd6Q0MsTUFBSSxFQUFFO0FBQ0pDLFNBQUssRUFBRSxNQURIO0FBQ1c7QUFDZlgsYUFBUyxFQUFFcEIsS0FBSyxDQUFDSyxPQUFOLENBQWMsQ0FBZDtBQUZQLEdBWG1DO0FBZXpDMkIsUUFBTSxFQUFFO0FBQ05QLFVBQU0sRUFBRXpCLEtBQUssQ0FBQ0ssT0FBTixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEI7QUFERjtBQWZpQyxDQUFaLENBQUQsQ0FBOUI7QUFtQmUsU0FBUzRCLElBQVQsR0FBZ0I7QUFDN0IsUUFBTXRCLE9BQU8sR0FBR08sV0FBVyxFQUEzQjtBQUNBLFFBQU1nQixNQUFNLEdBQUdDLDZEQUFTLEVBQXhCO0FBQ0EsUUFBTSxDQUFDL0QsS0FBRCxFQUFRZ0UsUUFBUixJQUFvQnRCLDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxFQUFmLENBQTFCO0FBQ0EsUUFBTSxDQUFDMUMsUUFBRCxFQUFXZ0UsV0FBWCxJQUEwQnZCLDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxFQUFmLENBQWhDO0FBQ0EsUUFBTSxDQUFDMUIsS0FBRCxFQUFRaUQsUUFBUixJQUFvQnhCLDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxFQUFmLENBQTFCO0FBQ0EsUUFBTXdCLGFBQWEsR0FBRyxJQUFJckUsc0RBQUosRUFBdEI7O0FBQ0EsUUFBTXNFLGdCQUFnQixHQUFJQyxLQUFELElBQVc7QUFDbENMLFlBQVEsQ0FBQ0ssS0FBSyxDQUFDQyxNQUFOLENBQWFDLEtBQWQsQ0FBUjtBQUNELEdBRkQ7O0FBR0EsUUFBTUMsbUJBQW1CLEdBQUlILEtBQUQsSUFBVztBQUNyQ0osZUFBVyxDQUFDSSxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsS0FBZCxDQUFYO0FBQ0QsR0FGRDs7QUFHQSxRQUFNRSxRQUFRLEdBQUlKLEtBQUQsSUFBVztBQUMxQkEsU0FBSyxDQUFDSyxjQUFOO0FBQ0FQLGlCQUFhLENBQUNwRSxVQUFkLENBQXlCQyxLQUF6QixFQUFnQ0MsUUFBaEMsRUFBMENJLElBQTFDLENBQStDQyxHQUFHLElBQUk7QUFDcERxRSxrQkFBWSxDQUFDQyxPQUFiLENBQXFCLE9BQXJCLEVBQThCdEUsR0FBOUI7QUFDRCxLQUZEO0FBR0F3RCxVQUFNLENBQUNlLElBQVAsQ0FBWSxTQUFaO0FBQ0QsR0FORDs7QUFPQSxTQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLDhEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVFLE1BQUMsMkRBQUQ7QUFBVyxZQUFRLEVBQUMsSUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsdURBQUQ7QUFBTyxhQUFTLEVBQUUsQ0FBbEI7QUFBcUIsU0FBSyxFQUFDLFFBQTNCO0FBQW9DLGFBQVMsRUFBRXRDLE9BQU8sQ0FBQ1EsS0FBdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsd0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsc0VBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLENBREYsRUFJRSxNQUFDLDREQUFEO0FBQVksYUFBUyxFQUFDLElBQXRCO0FBQTJCLFdBQU8sRUFBQyxJQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSkYsRUFPRTtBQUFNLFlBQVEsRUFBRTBCLFFBQWhCO0FBQTBCLFNBQUssRUFBQyxRQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywyREFBRDtBQUNFLE1BQUUsRUFBQyxhQURMO0FBRUUsUUFBSSxFQUFDLE9BRlA7QUFHRSxRQUFJLEVBQUMsT0FIUDtBQUlFLGFBQVMsTUFKWDtBQUtFLFdBQU8sRUFBQyxVQUxWO0FBTUUsZ0JBQVksRUFBQyxPQU5mO0FBT0UsVUFBTSxFQUFDLFFBUFQ7QUFRRSxhQUFTLE1BUlg7QUFTRSxTQUFLLEVBQUV6RSxLQVRUO0FBVUUsWUFBUSxFQUFFb0UsZ0JBVlo7QUFXRSxZQUFRLE1BWFY7QUFXVyxTQUFLLEVBQUMsZ0JBWGpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQWFFLE1BQUMsMkRBQUQ7QUFDRSxNQUFFLEVBQUMsZUFETDtBQUVFLFdBQU8sRUFBQyxVQUZWO0FBR0UsVUFBTSxFQUFDLFFBSFQ7QUFJRSxZQUFRLE1BSlY7QUFLRSxhQUFTLE1BTFg7QUFNRSxRQUFJLEVBQUMsVUFOUDtBQU9FLFNBQUssRUFBQyxVQVBSO0FBUUUsUUFBSSxFQUFDLFVBUlA7QUFTRSxNQUFFLEVBQUMsVUFUTDtBQVVFLGdCQUFZLEVBQUMsa0JBVmY7QUFXRSxTQUFLLEVBQUVuRSxRQVhUO0FBWUUsWUFBUSxFQUFFdUUsbUJBWlo7QUFhRSxZQUFRLE1BYlY7QUFhVyxTQUFLLEVBQUMsb0JBYmpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFiRixFQTJCRSxNQUFDLHdEQUFEO0FBQ0UsYUFBUyxNQURYO0FBRUUsUUFBSSxFQUFDLFFBRlA7QUFHRSxXQUFPLEVBQUMsV0FIVjtBQUlFLFNBQUssRUFBQyxTQUpSO0FBS0UsYUFBUyxFQUFFakMsT0FBTyxDQUFDcUIsTUFMckI7QUFNRSxTQUFLLEVBQUMsUUFOUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQTNCRixDQVBGLENBREYsQ0FGRixDQURGO0FBb0RELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6R0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1rQixZQUFZLEdBQUc7QUFDbkJDLFFBQU0sRUFBRSxRQURXO0FBRW5CQyxVQUFRLEVBQUUsVUFGUztBQUduQkMsY0FBWSxFQUFFLGNBSEs7QUFJbkJDLFNBQU8sRUFBRTtBQUpVLENBQXJCO0FBTUEsTUFBTUMsZUFBZSxHQUFHQyxvRUFBVSxDQUFFeEQsS0FBRCxLQUFZO0FBQzdDeUQsTUFBSSxFQUFFO0FBQ0ovQixtQkFBZSxFQUFFMUIsS0FBSyxDQUFDMkIsT0FBTixDQUFjQyxTQUFkLENBQXdCOEIsSUFEckM7QUFFSkMsU0FBSyxFQUFFM0QsS0FBSyxDQUFDMkIsT0FBTixDQUFjaUM7QUFGakIsR0FEdUM7QUFLN0NwRixNQUFJLEVBQUU7QUFDSnFGLFlBQVEsRUFBRTtBQUROO0FBTHVDLENBQVosQ0FBRCxDQUFWLENBUXBCQywyREFSb0IsQ0FBeEI7QUFVZSxTQUFTQyxNQUFULEdBQWtCO0FBQy9CLFFBQU0sQ0FBQ0MsV0FBRCxFQUFjQyxjQUFkLElBQWdDbkQsNENBQUssQ0FBQ0MsUUFBTixDQUFlbUMsWUFBWSxDQUFDQyxNQUE1QixDQUF0QztBQUNBLFFBQU1qQixNQUFNLEdBQUdDLDZEQUFTLEVBQXhCO0FBQ0EsUUFBTSxDQUFDdkIsaUJBQUQsRUFBb0JDLG9CQUFwQixJQUE0Q0MsNENBQUssQ0FBQ0MsUUFBTixDQUFlLEVBQWYsQ0FBbEQ7QUFDQSxRQUFNLENBQUNtRCxXQUFELEVBQWNDLGNBQWQsSUFBZ0NyRCw0Q0FBSyxDQUFDQyxRQUFOLENBQWUsRUFBZixDQUF0QztBQUNBLFFBQU0sQ0FBQ3FELGFBQUQsRUFBZ0JDLGdCQUFoQixJQUFvQ3ZELDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxFQUFmLENBQTFDO0FBQ0EsUUFBTXdCLGFBQWEsR0FBRyxJQUFJckUsc0RBQUosRUFBdEI7QUFDQThDLHlEQUFTLENBQUMsTUFBTTtBQUNkdUIsaUJBQWEsQ0FBQ25ELFNBQWQsQ0FBd0IyRCxZQUFZLENBQUMxRCxLQUFyQyxFQUE0QyxVQUE1QyxFQUNDWixJQURELENBQ082RixNQUFNLElBQUk7QUFDZnpELDBCQUFvQixDQUFDeUQsTUFBRCxDQUFwQjtBQUNELEtBSEQ7QUFLQS9CLGlCQUFhLENBQUNuRCxTQUFkLENBQXdCMkQsWUFBWSxDQUFDMUQsS0FBckMsRUFBNEMsU0FBNUMsRUFDQ1osSUFERCxDQUNPNkYsTUFBRCxJQUFZO0FBQ2hCSCxvQkFBYyxDQUFDRyxNQUFNLENBQUNDLE1BQVIsQ0FBZDtBQUNELEtBSEQ7QUFJQWhDLGlCQUFhLENBQUNuRCxTQUFkLENBQXdCMkQsWUFBWSxDQUFDMUQsS0FBckMsRUFBNEMsV0FBNUMsRUFDQ1osSUFERCxDQUNPNkYsTUFBRCxJQUFZO0FBQ2hCRCxzQkFBZ0IsQ0FBQ0MsTUFBTSxDQUFDRSxRQUFSLENBQWhCO0FBQ0QsS0FIRDtBQUlELEdBZFEsRUFjTixFQWRNLENBQVQ7O0FBZUEsV0FBUy9ELFlBQVQsR0FBd0I7QUFDdEJ3RCxrQkFBYyxDQUFDZixZQUFZLENBQUNDLE1BQWQsQ0FBZDtBQUNEOztBQUNELFdBQVN6QyxjQUFULEdBQTBCO0FBQ3pCdUQsa0JBQWMsQ0FBQ2YsWUFBWSxDQUFDRSxRQUFkLENBQWQ7QUFDQTs7QUFFRCxTQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLDhEQUFEO0FBQVksZUFBVyxFQUFFeEMsaUJBQXpCO0FBQTRDLGdCQUFZLEVBQUVILFlBQTFEO0FBQXdFLGtCQUFjLEVBQUVDLGNBQXhGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixFQUVHc0QsV0FBVyxLQUFLZCxZQUFZLENBQUNDLE1BQTdCLElBQXdDLE1BQUMsWUFBRDtBQUFjLGVBQVcsRUFBRWUsV0FBM0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUYzQyxFQUdHRixXQUFXLEtBQUtkLFlBQVksQ0FBQ0UsUUFBN0IsSUFBeUMsTUFBQyxjQUFEO0FBQWdCLGlCQUFhLEVBQUVnQixhQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSDVDLENBREY7QUFPRDs7QUFFRCxTQUFTSyxZQUFULENBQXNCO0FBQUVQO0FBQUYsQ0FBdEIsRUFBdUM7QUFDckMsU0FDRSxNQUFDLGdFQUFEO0FBQWdCLGFBQVMsRUFBRVEsdURBQTNCO0FBQWtDLFNBQUssRUFBRTtBQUFFQyxXQUFLLEVBQUUsUUFBVDtBQUFtQkMsWUFBTSxFQUFFLEdBQTNCO0FBQWdDN0MsV0FBSyxFQUFFO0FBQXZDLEtBQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDQSxNQUFDLHVEQUFEO0FBQU8sUUFBSSxFQUFDLE9BQVo7QUFBb0Isa0JBQVcsZUFBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMkRBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsMERBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsZUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsRUFFRSxNQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUZGLEVBR0UsTUFBQyxlQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBSEYsQ0FERixDQURGLEVBUUUsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dtQyxXQUFXLENBQUNXLEdBQVosQ0FBZ0IsQ0FBQ0MsS0FBRCxFQUFRQyxLQUFSLEtBQWtCO0FBQ2pDLFdBQ0UsTUFBQywwREFBRDtBQUFVLFNBQUcsRUFBRyxTQUFRQSxLQUFNLEVBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRSxNQUFDLDJEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBYUQsS0FBSyxDQUFDN0QsSUFBbkIsQ0FERixFQUVFLE1BQUMsMkRBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFhNkQsS0FBSyxDQUFDRSxLQUFuQixDQUZGLEVBR0UsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQWFGLEtBQUssQ0FBQ0csS0FBbkIsQ0FIRixDQURGO0FBT0QsR0FSQSxDQURILENBUkYsQ0FEQSxDQURGO0FBd0JEOztBQUVELFNBQVNDLGNBQVQsQ0FBd0I7QUFBRWQ7QUFBRixDQUF4QixFQUEyQztBQUN6QyxTQUNFLE1BQUMsZ0VBQUQ7QUFBZ0IsYUFBUyxFQUFFTSx1REFBM0I7QUFBa0MsU0FBSyxFQUFFO0FBQUVDLFdBQUssRUFBRSxRQUFUO0FBQW1CQyxZQUFNLEVBQUUsR0FBM0I7QUFBZ0M3QyxXQUFLLEVBQUU7QUFBdkMsS0FBekM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNBLE1BQUMsdURBQUQ7QUFBTyxRQUFJLEVBQUMsT0FBWjtBQUFvQixrQkFBVyxlQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQywwREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxlQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQUVFLE1BQUMsZUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRkYsRUFHRSxNQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUhGLEVBSUUsTUFBQyxlQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBSkYsRUFLRSxNQUFDLGVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFMRixDQURGLENBREYsRUFVRSxNQUFDLDJEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR3FDLGFBQWEsQ0FBQ1MsR0FBZCxDQUFrQixDQUFDTSxPQUFELEVBQVVKLEtBQVYsS0FBb0I7QUFDckMsV0FDRSxNQUFDLDBEQUFEO0FBQVUsU0FBRyxFQUFHLFdBQVVBLEtBQU0sRUFBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUNFLE1BQUMsMkRBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFhSSxPQUFPLENBQUNsRSxJQUFyQixDQURGLEVBRUUsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQWFrRSxPQUFPLENBQUNDLEdBQXJCLENBRkYsRUFHRSxNQUFDLDJEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBYUQsT0FBTyxDQUFDL0csS0FBckIsQ0FIRixFQUlFLE1BQUMsMkRBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFhK0csT0FBTyxDQUFDRSxRQUFyQixDQUpGLEVBS0UsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQWFGLE9BQU8sQ0FBQ0csS0FBckIsQ0FMRixDQURGO0FBU0QsR0FWQSxDQURILENBVkYsQ0FEQSxDQURGO0FBNEJELEM7Ozs7Ozs7Ozs7OztBQ3RIRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBLE1BQU10RixLQUFLLEdBQUd1Rix3RUFBYyxDQUFDO0FBQ3pCNUQsU0FBTyxFQUFFO0FBQ1A2RCxXQUFPLEVBQUU7QUFDUEMsV0FBSyxFQUFFLFNBREE7QUFFUDVELFVBQUksRUFBRSxTQUZDO0FBR1A2QixVQUFJLEVBQUUsU0FIQztBQUlQRSxrQkFBWSxFQUFFO0FBSlAsS0FERjtBQU9QaEMsYUFBUyxFQUFFO0FBQ1Q2RCxXQUFLLEVBQUUsU0FERTtBQUVUNUQsVUFBSSxFQUFFLFNBRkc7QUFHVDZCLFVBQUksRUFBRSxTQUhHO0FBSVRFLGtCQUFZLEVBQUU7QUFKTDtBQVBKO0FBRGdCLENBQUQsQ0FBNUI7QUFnQmU1RCxvRUFBZixFOzs7Ozs7Ozs7OztBQ25CQSw4Qzs7Ozs7Ozs7Ozs7QUNBQSxxRDs7Ozs7Ozs7Ozs7QUNBQSxxRDs7Ozs7Ozs7Ozs7QUNBQSw2RDs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw4QyIsImZpbGUiOiJwYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0gcmVxdWlyZSgnLi4vc3NyLW1vZHVsZS1jYWNoZS5qcycpO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHR2YXIgdGhyZXcgPSB0cnVlO1xuIFx0XHR0cnkge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRcdHRocmV3ID0gZmFsc2U7XG4gXHRcdH0gZmluYWxseSB7XG4gXHRcdFx0aWYodGhyZXcpIGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGFnZXMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbmNvbnN0IGFwaSA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH1cclxufSk7XHJcbmV4cG9ydCBkZWZhdWx0IGFwaTsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb211bmljYWNhbyB7XHJcblxyXG4gICAgYXV0ZW50aWNhcihlbWFpbCwgcGFzc3dvcmQpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHA6Ly8xOTIuMTY4LjEwMC42NjozMDAxL2Z1bmNpb25hcmlvcy9sb2dpbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IGBlbWFpbD0ke2VtYWlsfSZwYXNzd29yZD0ke3Bhc3N3b3JkfWAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXRvcm5pbmhvID0gcmVzLmhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldG9ybmluaG87XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGxvZ2dpbmcgaW4gcGxlYXNlIHRyeSBhZ2FpbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiZWFyZXJHRVQodG9rZW4sIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBmZXRjaChgaHR0cDovLzE5Mi4xNjguMTAwLjY2OjMwMDEke3BhdGh9IGAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ0FjY2VwdCc6ICcqLyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufSBgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLm9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5qc29uKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29tbXM6ICcgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGVycik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGJlYXJlclBPU1QodG9rZW4sIHBhdGgsIGJvZHkpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xOTIuMTY4LjEwMC42NjozMDAxJHtwYXRofWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGJvZHk6IGAke2JvZHl9YCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywgJ0FjY2VwdCc6ICcqLyonLFxyXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMub2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9zdHlsZXMnO1xyXG5pbXBvcnQgQXBwQmFyIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0FwcEJhcic7XHJcbmltcG9ydCB7IFRvb2xiYXIsIFR5cG9ncmFwaHksIEJ1dHRvbiwgSWNvbkJ1dHRvbiwgSW5wdXRBZG9ybm1lbnQsIElucHV0TGFiZWwgfSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIjtcclxuaW1wb3J0IE1lbnVJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9NZW51JztcclxuaW1wb3J0IEFjY291bnRDaXJjbGUgZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0FjY291bnRDaXJjbGUnXHJcblxyXG5jb25zdCB1c2VTdHlsZXMgPSBtYWtlU3R5bGVzKCh0aGVtZSkgPT4gKHtcclxuICByb290OiB7XHJcbiAgICBmbGV4R3JvdzogMSxcclxuICB9LFxyXG4gIG1lbnVCdXR0b246IHtcclxuICAgIG1hcmdpblJpZ2h0OiB0aGVtZS5zcGFjaW5nKDIpLFxyXG4gIH0sXHJcbiAgdGl0bGU6IHtcclxuICAgIGZsZXhHcm93OiAxLFxyXG4gIH0sXHJcbn0pKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1lbnVBcHBCYXIoeyBmdW5jaW9uYXJpbywgbGlzdGFyTGl2cm9zLCBsaXN0YXJDbGllbnRlcyB9KSB7XHJcbiAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xyXG4gIGNvbnN0IFtmdW5jaW9uYXJpb0xvZ2Fkbywgc2V0RnVuY2lvbmFyaW9Mb2dhZG9dID0gUmVhY3QudXNlU3RhdGUoe30pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoZnVuY2lvbmFyaW8pIHtcclxuICAgICAgc2V0RnVuY2lvbmFyaW9Mb2dhZG8oZnVuY2lvbmFyaW8pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yb290fT5cclxuICAgICAgPEFwcEJhciBwb3NpdGlvbj1cInN0YXRpY1wiIGNvbG9yPSdwcmltYXJ5Jz5cclxuICAgICAgICA8VG9vbGJhcj5cclxuICAgICAgICAgIDxJY29uQnV0dG9uIGVkZ2U9XCJzdGFydFwiIGNsYXNzTmFtZT17Y2xhc3Nlcy5tZW51QnV0dG9ufSBjb2xvcj1cImluaGVyaXRcIiBhcmlhLWxhYmVsPVwibWVudVwiPlxyXG4gICAgICAgICAgICA8TWVudUljb24gLz5cclxuICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiIGNsYXNzTmFtZT17Y2xhc3Nlcy50aXRsZX0+XHJcbiAgICAgICAgICAgIExpYkFwcFxyXG4gICAgICAgICAgPC9UeXBvZ3JhcGh5PlxyXG4gICAgICAgICAge2Z1bmNpb25hcmlvICYmICggPFR5cG9ncmFwaHkgdmFyaWFudD1cImg2XCIgY2xhc3NOYW1lPXtjbGFzc2VzLnRpdGxlfT4gU2VqYSBiZW0gdmluZG8sIHtmdW5jaW9uYXJpby5ub21lfTwvVHlwb2dyYXBoeT4pfVxyXG4gICAgICAgICAgeyFmdW5jaW9uYXJpbyAmJiA8QnV0dG9uIGNvbG9yPVwiaW5oZXJpdFwiIGhyZWY9Jy8nPkxvZ2luPC9CdXR0b24+fVxyXG4gICAgICAgICAge2Z1bmNpb25hcmlvICYmIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPSdpbmhlcml0JyBvbkNsaWNrPXtsaXN0YXJMaXZyb3N9PkxpdnJvczwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9J2luaGVyaXQnIG9uQ2xpY2s9e2xpc3RhckNsaWVudGVzfT5DbGllbnRlczwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9Ub29sYmFyPlxyXG4gICAgICA8L0FwcEJhcj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn0iLCJpbXBvcnQgeyB9IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlJ1xuaW1wb3J0IE1lbnVBcHBCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9NZW51QXBwQmFyJ1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGknO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgTG9nZ2VkIGZyb20gJy4vbG9nZ2VkJztcbmltcG9ydCBDb211bmljYWNhbyBmcm9tICcuLi9jb21tdW5pY2F0aW9uJztcbmltcG9ydCB7XG4gIG1ha2VTdHlsZXMsIEF2YXRhciwgVG9vbGJhciwgVHlwb2dyYXBoeSwgQ29udGFpbmVyLFxuICBCdXR0b24sIEljb25CdXR0b24sIElucHV0QWRvcm5tZW50LCBJbnB1dExhYmVsLCBJbnB1dCwgR3JpZCwgVGV4dEZpZWxkLCBQYXBlclxufSBmcm9tIFwiQG1hdGVyaWFsLXVpL2NvcmVcIjtcbmltcG9ydCBNZW51SWNvbiBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvTWVudSc7XG5pbXBvcnQgQWNjb3VudENpcmNsZSBmcm9tICdAbWF0ZXJpYWwtdWkvaWNvbnMvQWNjb3VudENpcmNsZSdcbmltcG9ydCBMb2NrT3V0bGluZWRJY29uIGZyb20gJ0BtYXRlcmlhbC11aS9pY29ucy9Mb2NrT3V0bGluZWQnO1xuaW1wb3J0IHRoZW1lIGZyb20gJy4uL3RoZW1lJ1xuY29uc3Qgc3R5bGVzTG9naW4gPSBtYWtlU3R5bGVzKCh0aGVtZSkgPT4gKHtcbiAgcGFwZXI6IHtcbiAgICBtYXJnaW5Ub3A6IHRoZW1lLnNwYWNpbmcoOCksXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICB9LFxuICBhdmF0YXI6IHtcbiAgICBtYXJnaW46IHRoZW1lLnNwYWNpbmcoMSksXG4gICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5wYWxldHRlLnNlY29uZGFyeS5tYWluLFxuICB9LFxuICBmb3JtOiB7XG4gICAgd2lkdGg6ICcxMDAlJywgLy8gRml4IElFIDExIGlzc3VlLlxuICAgIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZygxKSxcbiAgfSxcbiAgc3VibWl0OiB7XG4gICAgbWFyZ2luOiB0aGVtZS5zcGFjaW5nKDMsIDAsIDIpLFxuICB9LFxufSkpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgY2xhc3NlcyA9IHN0eWxlc0xvZ2luKCk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSBSZWFjdC51c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFt0b2tlbiwgc2V0VG9rZW5dID0gUmVhY3QudXNlU3RhdGUoJycpO1xuICBjb25zdCBjb21tdW5pY2F0aW9uID0gbmV3IENvbXVuaWNhY2FvKCk7XG4gIGNvbnN0IGhhbmRsZUlucHV0RW1haWwgPSAoZXZlbnQpID0+IHtcbiAgICBzZXRFbWFpbChldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG4gIGNvbnN0IGhhbmRsZUlucHV0UGFzc3dvcmQgPSAoZXZlbnQpID0+IHtcbiAgICBzZXRQYXNzd29yZChldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG4gIGNvbnN0IG9uU3VibWl0ID0gKGV2ZW50KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb21tdW5pY2F0aW9uLmF1dGVudGljYXIoZW1haWwsIHBhc3N3b3JkKS50aGVuKHJlcyA9PiB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCByZXMpO1xuICAgIH0pO1xuICAgIHJvdXRlci5wdXNoKCcvbG9nZ2VkJyk7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPE1lbnVBcHBCYXIgLz5cbiAgICAgIDxDb250YWluZXIgbWF4V2lkdGg9J3hzJz5cbiAgICAgICAgPFBhcGVyIGVsZXZhdGlvbj17NH0gYWxpZ249J2NlbnRlcicgY2xhc3NOYW1lPXtjbGFzc2VzLnBhcGVyfT5cbiAgICAgICAgICA8QXZhdGFyPlxuICAgICAgICAgICAgPExvY2tPdXRsaW5lZEljb24gLz5cbiAgICAgICAgICA8L0F2YXRhcj5cbiAgICAgICAgICA8VHlwb2dyYXBoeSBjb21wb25lbnQ9XCJoMVwiIHZhcmlhbnQ9XCJoNVwiPlxuICAgICAgICAgICAgTG9nYXJcbiAgICAgICAgPC9UeXBvZ3JhcGh5PlxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtvblN1Ym1pdH0gYWxpZ249J2NlbnRlcic+XG4gICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgIGlkPVwiZW1haWwtaW5wdXRcIlxuICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgICAgdmFyaWFudD0nb3V0bGluZWQnXG4gICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT0nZW1haWwnXG4gICAgICAgICAgICAgIG1hcmdpbj0nbm9ybWFsJ1xuICAgICAgICAgICAgICBhdXRvRm9jdXNcbiAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRFbWFpbH1cbiAgICAgICAgICAgICAgcmVxdWlyZWQgbGFiZWw9XCJEaWdpdGUgbyBlbWFpbFwiIC8+XG4gICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgIGlkPSd0eXBlLXBhc3N3b3JkJ1xuICAgICAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIlxuICAgICAgICAgICAgICBtYXJnaW49XCJub3JtYWxcIlxuICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJQYXNzd29yZFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgdmFsdWU9e3Bhc3N3b3JkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW5wdXRQYXNzd29yZH1cbiAgICAgICAgICAgICAgcmVxdWlyZWQgbGFiZWw9XCJEaWdpdGUgYSBzdWEgc2VuaGFcIiAvPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgICAgdHlwZT0nc3VibWl0J1xuICAgICAgICAgICAgICB2YXJpYW50PVwiY29udGFpbmVkXCJcbiAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLnN1Ym1pdH1cbiAgICAgICAgICAgICAgdmFsdWU9XCJTdWJtaXRcIj5cbiAgICAgICAgICAgICAgQ29uZmlybWFyXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L1BhcGVyPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC9kaXY+XG4gIClcbn0iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcclxuaW1wb3J0IHsgd2l0aFN0eWxlcywgQnV0dG9uLCBEYXRhR3JpZCwgVGFibGVDZWxsLCBUYWJsZUJvZHksIFRhYmxlQ29udGFpbmVyLCBUYWJsZUhlYWQsIFRhYmxlUm93LCBUYWJsZSwgUGFwZXIgfSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZSdcclxuaW1wb3J0IE1lbnVBcHBCYXIgZnJvbSAnLi4vY29tcG9uZW50cy9NZW51QXBwQmFyJ1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xyXG5pbXBvcnQgQ29tdW5pY2FjYW8gZnJvbSAnLi4vY29tbXVuaWNhdGlvbic7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi90aGVtZSdcclxuY29uc3Qgc2NyZWVuU3RhdGVzID0ge1xyXG4gIExJVlJPUzogJ0xJVlJPUycsXHJcbiAgQ0xJRU5URVM6ICdDTElFTlRFUycsXHJcbiAgRlVOQ0lPTkFSSU9TOiAnRlVOQ0lPTkFSSU9TJyxcclxuICBERUZBVUxUOiAnREVGQVVMVCdcclxufVxyXG5jb25zdCBTdHlsZWRUYWJsZUNlbGwgPSB3aXRoU3R5bGVzKCh0aGVtZSkgPT4gKHtcclxuICBoZWFkOiB7XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLnBhbGV0dGUuc2Vjb25kYXJ5LmRhcmssXHJcbiAgICBjb2xvcjogdGhlbWUucGFsZXR0ZS5jb250cmFzdFRleHQsXHJcbiAgfSxcclxuICBib2R5OiB7XHJcbiAgICBmb250U2l6ZTogMTQsXHJcbiAgfSxcclxufSkpKFRhYmxlQ2VsbCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dnZWQoKSB7XHJcbiAgY29uc3QgW3NjcmVlblN0YXRlLCBzZXRTY3JlZW5TdGF0ZV0gPSBSZWFjdC51c2VTdGF0ZShzY3JlZW5TdGF0ZXMuTElWUk9TKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBbZnVuY2lvbmFyaW9Mb2dhZG8sIHNldEZ1bmNpb25hcmlvTG9nYWRvXSA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbGlzdGFMaXZyb3MsIHNldExpc3RhTGl2cm9zXSA9IFJlYWN0LnVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbGlzdGFDbGllbnRlcywgc2V0TGlzdGFDbGllbnRlc10gPSBSZWFjdC51c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgY29tbXVuaWNhdGlvbiA9IG5ldyBDb211bmljYWNhbygpO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb21tdW5pY2F0aW9uLmJlYXJlckdFVChsb2NhbFN0b3JhZ2UudG9rZW4sICcvcHJvZmlsZScpXHJcbiAgICAudGhlbigodmFsdWVzID0+IHtcclxuICAgICAgc2V0RnVuY2lvbmFyaW9Mb2dhZG8odmFsdWVzKTtcclxuICAgIH0pKVxyXG5cclxuICAgIGNvbW11bmljYXRpb24uYmVhcmVyR0VUKGxvY2FsU3RvcmFnZS50b2tlbiwgJy9saXZyb3MnKVxyXG4gICAgLnRoZW4oKHZhbHVlcykgPT4ge1xyXG4gICAgICBzZXRMaXN0YUxpdnJvcyh2YWx1ZXMubGl2cm9zKTtcclxuICAgIH0pXHJcbiAgICBjb21tdW5pY2F0aW9uLmJlYXJlckdFVChsb2NhbFN0b3JhZ2UudG9rZW4sICcvY2xpZW50ZXMnKVxyXG4gICAgLnRoZW4oKHZhbHVlcykgPT4ge1xyXG4gICAgICBzZXRMaXN0YUNsaWVudGVzKHZhbHVlcy5jbGllbnRlcyk7XHJcbiAgICB9KVxyXG4gIH0sIFtdKTtcclxuICBmdW5jdGlvbiBsaXN0YXJMaXZyb3MoKSB7XHJcbiAgICBzZXRTY3JlZW5TdGF0ZShzY3JlZW5TdGF0ZXMuTElWUk9TKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gbGlzdGFyQ2xpZW50ZXMoKSB7XHJcbiAgIHNldFNjcmVlblN0YXRlKHNjcmVlblN0YXRlcy5DTElFTlRFUyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPE1lbnVBcHBCYXIgZnVuY2lvbmFyaW89e2Z1bmNpb25hcmlvTG9nYWRvfSBsaXN0YXJMaXZyb3M9e2xpc3RhckxpdnJvc30gbGlzdGFyQ2xpZW50ZXM9e2xpc3RhckNsaWVudGVzfS8+XHJcbiAgICAgIHtzY3JlZW5TdGF0ZSA9PT0gc2NyZWVuU3RhdGVzLkxJVlJPUyAgJiYgPFRhYmVsYUxpdnJvcyBsaXN0YUxpdnJvcz17bGlzdGFMaXZyb3N9IC8+fVxyXG4gICAgICB7c2NyZWVuU3RhdGUgPT09IHNjcmVlblN0YXRlcy5DTElFTlRFUyAmJiA8VGFiZWxhQ2xpZW50ZXMgbGlzdGFDbGllbnRlcz17bGlzdGFDbGllbnRlc30vPn1cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gVGFiZWxhTGl2cm9zKHsgbGlzdGFMaXZyb3MgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VGFibGVDb250YWluZXIgY29tcG9uZW50PXtQYXBlcn0gc3R5bGU9e3sgYWxpZ246ICdjZW50ZXInLCBoZWlnaHQ6IDQwMCwgd2lkdGg6ICcxMDAlJyB9fT5cclxuICAgIDxUYWJsZSBzaXplPSdzbWFsbCcgYXJpYS1sYWJlbD0nYSBkZW5zZSB0YWJsZSc+XHJcbiAgICAgIDxUYWJsZUhlYWQ+XHJcbiAgICAgICAgPFRhYmxlUm93PlxyXG4gICAgICAgICAgPFN0eWxlZFRhYmxlQ2VsbD5Ob21lPC9TdHlsZWRUYWJsZUNlbGw+XHJcbiAgICAgICAgICA8U3R5bGVkVGFibGVDZWxsPkF1dG9yPC9TdHlsZWRUYWJsZUNlbGw+XHJcbiAgICAgICAgICA8U3R5bGVkVGFibGVDZWxsPlByZcOnbzwvU3R5bGVkVGFibGVDZWxsPlxyXG4gICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgIDwvVGFibGVIZWFkPlxyXG4gICAgICA8VGFibGVCb2R5PlxyXG4gICAgICAgIHtsaXN0YUxpdnJvcy5tYXAoKGxpdnJvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRhYmxlUm93IGtleT17YGxpdnJvXyR7aW5kZXh9YH0+XHJcbiAgICAgICAgICAgICAgPFRhYmxlQ2VsbCA+e2xpdnJvLm5vbWV9PC9UYWJsZUNlbGwgPlxyXG4gICAgICAgICAgICAgIDxUYWJsZUNlbGwgPntsaXZyby5hdXRvcn08L1RhYmxlQ2VsbCA+XHJcbiAgICAgICAgICAgICAgPFRhYmxlQ2VsbCA+e2xpdnJvLnByZWNvfTwvVGFibGVDZWxsID5cclxuICAgICAgICAgICAgPC9UYWJsZVJvdz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9KX1cclxuICAgICAgPC9UYWJsZUJvZHk+XHJcbiAgICA8L1RhYmxlPlxyXG4gIDwvVGFibGVDb250YWluZXI+XHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBUYWJlbGFDbGllbnRlcyh7IGxpc3RhQ2xpZW50ZXMgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VGFibGVDb250YWluZXIgY29tcG9uZW50PXtQYXBlcn0gc3R5bGU9e3sgYWxpZ246ICdjZW50ZXInLCBoZWlnaHQ6IDQwMCwgd2lkdGg6ICcxMDAlJyB9fT5cclxuICAgIDxUYWJsZSBzaXplPSdzbWFsbCcgYXJpYS1sYWJlbD0nYSBkZW5zZSB0YWJsZSc+XHJcbiAgICAgIDxUYWJsZUhlYWQ+XHJcbiAgICAgICAgPFRhYmxlUm93PlxyXG4gICAgICAgICAgPFN0eWxlZFRhYmxlQ2VsbD5Ob21lPC9TdHlsZWRUYWJsZUNlbGw+XHJcbiAgICAgICAgICA8U3R5bGVkVGFibGVDZWxsPkNQRjwvU3R5bGVkVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFN0eWxlZFRhYmxlQ2VsbD5FbWFpbDwvU3R5bGVkVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFN0eWxlZFRhYmxlQ2VsbD5UZWxlZm9uZTwvU3R5bGVkVGFibGVDZWxsPlxyXG4gICAgICAgICAgPFN0eWxlZFRhYmxlQ2VsbD5NdWx0YSBhdHVhbDwvU3R5bGVkVGFibGVDZWxsPlxyXG4gICAgICAgIDwvVGFibGVSb3c+XHJcbiAgICAgIDwvVGFibGVIZWFkPlxyXG4gICAgICA8VGFibGVCb2R5PlxyXG4gICAgICAgIHtsaXN0YUNsaWVudGVzLm1hcCgoY2xpZW50ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e2BjbGllbnRlXyR7aW5kZXh9YH0+XHJcbiAgICAgICAgICAgICAgPFRhYmxlQ2VsbCA+e2NsaWVudGUubm9tZX08L1RhYmxlQ2VsbCA+XHJcbiAgICAgICAgICAgICAgPFRhYmxlQ2VsbCA+e2NsaWVudGUuY3BmfTwvVGFibGVDZWxsID5cclxuICAgICAgICAgICAgICA8VGFibGVDZWxsID57Y2xpZW50ZS5lbWFpbH08L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICA8VGFibGVDZWxsID57Y2xpZW50ZS50ZWxlZm9uZX08L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgICA8VGFibGVDZWxsID57Y2xpZW50ZS5tdWx0YX08L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgPC9UYWJsZVJvdz5cclxuICAgICAgICAgIClcclxuICAgICAgICB9KX1cclxuICAgICAgPC9UYWJsZUJvZHk+XHJcbiAgICA8L1RhYmxlPlxyXG4gIDwvVGFibGVDb250YWluZXI+XHJcbiAgKVxyXG59IiwiaW1wb3J0IHsgY3JlYXRlR2xvYmFsU3R5bGUsIFRoZW1lUHJvdmlkZXIgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cydcclxuaW1wb3J0IHsgY3JlYXRlTXVpVGhlbWUgIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUnO1xyXG5cclxuY29uc3QgdGhlbWUgPSBjcmVhdGVNdWlUaGVtZSh7XHJcbiAgICBwYWxldHRlOiB7XHJcbiAgICAgIHByaW1hcnk6IHtcclxuICAgICAgICBsaWdodDogJyM3ZTVkYzAnLFxyXG4gICAgICAgIG1haW46ICcjNWUzNWIxJyxcclxuICAgICAgICBkYXJrOiAnIzQxMjU3YicsXHJcbiAgICAgICAgY29udHJhc3RUZXh0OiAnI2ZmZicsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNlY29uZGFyeToge1xyXG4gICAgICAgIGxpZ2h0OiAnIzUzOTNmZicsXHJcbiAgICAgICAgbWFpbjogJyMyOTc5ZmYnLFxyXG4gICAgICAgIGRhcms6ICcjMWM1NGIyJyxcclxuICAgICAgICBjb250cmFzdFRleHQ6ICcjZmZmJyxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9KTtcclxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2NvcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG1hdGVyaWFsLXVpL2NvcmUvQXBwQmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9jb3JlL3N0eWxlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvQWNjb3VudENpcmNsZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbWF0ZXJpYWwtdWkvaWNvbnMvTG9ja091dGxpbmVkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBtYXRlcmlhbC11aS9pY29ucy9NZW51XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=