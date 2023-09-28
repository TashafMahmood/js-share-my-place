/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SharePlace.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/modal */ \"./src/UI/modal.js\");\n/* harmony import */ var _UI_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map */ \"./src/UI/Map.js\");\n/* harmony import */ var _Utility_Location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location */ \"./src/Utility/Location.js\");\n\n\n\nclass PlaceFinder {\n  constructor() {\n    const addressForm = document.querySelector('form');\n    const locateUserButton = document.getElementById('locate-btn');\n    this.shareButn = document.getElementById('share-btn');\n    locateUserButton.addEventListener('click', this.locateUserHandlers.bind(this));\n    addressForm.addEventListener('submit', this.findUserAddressHandler.bind(this));\n    this.shareButn.addEventListener('click', this.sharePlaceaHandler.bind(this));\n  }\n  sharePlaceaHandler() {\n    const SharedLinkInput = document.getElementById('share-link');\n    if (!navigator.clipboard) {\n      SharedLinkInput.select();\n      return;\n    }\n    navigator.clipboard.writeText(SharedLinkInput.value).then(() => {\n      window.open(SharedLinkInput.value, \"_blank\");\n    }).catch(err => {\n      SharedLinkInput.select();\n    });\n  }\n  selectPlce(coordinates, address) {\n    if (this.map) {\n      this.map.render(coordinates);\n    } else {\n      this.map = new _UI_Map__WEBPACK_IMPORTED_MODULE_1__[\"Map\"](coordinates);\n    }\n    this.shareButn.disabled = false;\n    const SharedLinkInput = document.getElementById('share-link');\n    SharedLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;\n  }\n  locateUserHandlers() {\n    if (!navigator.geolocation) {\n      alert('location feature in not available in your browser - Please some other mordern browser');\n      return;\n    }\n    const modal = new _UI_modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"]('loading-modal-content', 'Loading content.. Please wait');\n    modal.showModal();\n    navigator.geolocation.getCurrentPosition(async successResult => {\n      const coordinates = {\n        lat: successResult.coords.latitude,\n        lng: successResult.coords.longitude\n      };\n      const address = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getLinkOftheAddress\"])(coordinates);\n      modal.hideModal();\n      this.selectPlce(coordinates, address);\n      console.log(coordinates, \"coordinates\");\n    }, error => {\n      alert('Could not locate you unfortunately Please enter address manually');\n    });\n  }\n  async findUserAddressHandler(event) {\n    event.preventDefault();\n    const address = event.target.querySelector('input').value;\n    if (!address || address.trim().length === 0) {\n      alert('Invalid address entered - please try again');\n      return;\n    }\n    const modal = new _UI_modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"]('loading-modal-content', 'Loading content.. Please wait');\n    modal.showModal();\n    try {\n      const coordinates = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getCoordsFromtheAddress\"])(address);\n      this.selectPlce(coordinates, address);\n    } catch (error) {\n      alert(error.message);\n    }\n    modal.hideModal();\n  }\n}\nconst placeFinder = new PlaceFinder();\n\n//    \"build:prod\": \"webpack --config webpack.config.prod.js\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU2hhcmVQbGFjZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9TaGFyZVBsYWNlLmpzP2Q1YTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL1VJL21vZGFsJ1xyXG5pbXBvcnQgeyBNYXAgfSBmcm9tICcuL1VJL01hcCdcclxuaW1wb3J0IHsgZ2V0Q29vcmRzRnJvbXRoZUFkZHJlc3MsIGdldExpbmtPZnRoZUFkZHJlc3MgfSBmcm9tICcuL1V0aWxpdHkvTG9jYXRpb24nXHJcbmNsYXNzIFBsYWNlRmluZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IGFkZHJlc3NGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0ZVVzZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRlLWJ0bicpO1xyXG4gICAgICAgIHRoaXMuc2hhcmVCdXRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLWJ0bicpXHJcbiAgICAgICAgbG9jYXRlVXNlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubG9jYXRlVXNlckhhbmRsZXJzLmJpbmQodGhpcykpXHJcbiAgICAgICAgYWRkcmVzc0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5maW5kVXNlckFkZHJlc3NIYW5kbGVyLmJpbmQodGhpcykpXHJcbiAgICAgICAgdGhpcy5zaGFyZUJ1dG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHRoaXMuc2hhcmVQbGFjZWFIYW5kbGVyLmJpbmQodGhpcykpXHJcbiAgICB9XHJcblxyXG4gICAgc2hhcmVQbGFjZWFIYW5kbGVyKCl7XHJcbiAgICAgICAgY29uc3QgU2hhcmVkTGlua0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLWxpbmsnKVxyXG5cclxuICAgICAgICBpZighbmF2aWdhdG9yLmNsaXBib2FyZCl7XHJcbiAgICAgICAgICAgIFNoYXJlZExpbmtJbnB1dC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KFNoYXJlZExpbmtJbnB1dC52YWx1ZSkudGhlbigoKT0+e1xyXG4gICAgICAgICBcclxuICAgICAgICAgIHdpbmRvdy5vcGVuKFNoYXJlZExpbmtJbnB1dC52YWx1ZSwgXCJfYmxhbmtcIik7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycik9PntcclxuICAgICAgICAgICAgU2hhcmVkTGlua0lucHV0LnNlbGVjdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzZWxlY3RQbGNlKGNvb3JkaW5hdGVzLCBhZGRyZXNzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbmRlcihjb29yZGluYXRlcylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoY29vcmRpbmF0ZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hhcmVCdXRuLmRpc2FibGVkID0gZmFsc2VcclxuICAgICAgICBjb25zdCBTaGFyZWRMaW5rSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUtbGluaycpXHJcbiAgICAgICAgU2hhcmVkTGlua0lucHV0LnZhbHVlPWAke2xvY2F0aW9uLm9yaWdpbn0vbXktcGxhY2U/YWRkcmVzcz0ke2VuY29kZVVSSShhZGRyZXNzKX0mbGF0PSR7Y29vcmRpbmF0ZXMubGF0fSZsbmc9JHtjb29yZGluYXRlcy5sbmd9YFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgbG9jYXRlVXNlckhhbmRsZXJzKCkge1xyXG4gICAgICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdsb2NhdGlvbiBmZWF0dXJlIGluIG5vdCBhdmFpbGFibGUgaW4geW91ciBicm93c2VyIC0gUGxlYXNlIHNvbWUgb3RoZXIgbW9yZGVybiBicm93c2VyJyk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgnbG9hZGluZy1tb2RhbC1jb250ZW50JywgJ0xvYWRpbmcgY29udGVudC4uIFBsZWFzZSB3YWl0JylcclxuICAgICAgICBtb2RhbC5zaG93TW9kYWwoKVxyXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXHJcbiAgICAgICAgICAgIGFzeW5jIHN1Y2Nlc3NSZXN1bHQgPT4ge1xyXG4gXHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xyXG4gICAgICAgICAgICAgICAgbGF0OiBzdWNjZXNzUmVzdWx0LmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgIGxuZzogc3VjY2Vzc1Jlc3VsdC5jb29yZHMubG9uZ2l0dWRlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBhd2FpdCBnZXRMaW5rT2Z0aGVBZGRyZXNzKGNvb3JkaW5hdGVzKVxyXG4gICAgICAgICAgICBtb2RhbC5oaWRlTW9kYWwoKVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBsY2UoY29vcmRpbmF0ZXMsIGFkZHJlc3MpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzLCBcImNvb3JkaW5hdGVzXCIpXHJcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBhbGVydCgnQ291bGQgbm90IGxvY2F0ZSB5b3UgdW5mb3J0dW5hdGVseSBQbGVhc2UgZW50ZXIgYWRkcmVzcyBtYW51YWxseScpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGFzeW5jIGZpbmRVc2VyQWRkcmVzc0hhbmRsZXIoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgY29uc3QgYWRkcmVzcyA9IGV2ZW50LnRhcmdldC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlO1xyXG4gICAgICAgIGlmICghYWRkcmVzcyB8fCBhZGRyZXNzLnRyaW0oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgYWRkcmVzcyBlbnRlcmVkIC0gcGxlYXNlIHRyeSBhZ2FpbicpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgnbG9hZGluZy1tb2RhbC1jb250ZW50JywgJ0xvYWRpbmcgY29udGVudC4uIFBsZWFzZSB3YWl0JylcclxuICAgICAgICBtb2RhbC5zaG93TW9kYWwoKVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gYXdhaXQgZ2V0Q29vcmRzRnJvbXRoZUFkZHJlc3MoYWRkcmVzcylcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGxjZShjb29yZGluYXRlcywgYWRkcmVzcylcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBhbGVydChlcnJvci5tZXNzYWdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RhbC5oaWRlTW9kYWwoKVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHBsYWNlRmluZGVyID0gbmV3IFBsYWNlRmluZGVyKClcclxuXHJcblxyXG5cclxuLy8gICAgXCJidWlsZDpwcm9kXCI6IFwid2VicGFjayAtLWNvbmZpZyB3ZWJwYWNrLmNvbmZpZy5wcm9kLmpzXCJcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/SharePlace.js\n");

/***/ }),

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\n  constructor(coords) {\n    //this.coordinates=coords;\n    this.render(coords);\n  }\n  render(coordinates) {\n    if (!google) {\n      alert('could not load maps library - Pkease try again later');\n      return;\n    }\n    const map = new google.maps.Map(document.getElementById('map'), {\n      center: coordinates,\n      zoom: 16\n    });\n    new google.maps.Marker({\n      position: coordinates,\n      map: map\n    });\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvTWFwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1VJL01hcC5qcz9iNTc5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb29yZHMpe1xyXG4vL3RoaXMuY29vcmRpbmF0ZXM9Y29vcmRzO1xyXG50aGlzLnJlbmRlcihjb29yZHMpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoY29vcmRpbmF0ZXMpe1xyXG4gICAgICAgIGlmKCFnb29nbGUpe1xyXG4gICAgICAgICAgICBhbGVydCgnY291bGQgbm90IGxvYWQgbWFwcyBsaWJyYXJ5IC0gUGtlYXNlIHRyeSBhZ2FpbiBsYXRlcicpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICBjb25zdCBtYXA9ICAgbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJykse2NlbnRlcjpjb29yZGluYXRlcyx6b29tOjE2fSlcclxuICAgICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjpjb29yZGluYXRlcyxcclxuICAgICAgICBtYXA6bWFwXHJcbiAgICAgfSlcclxuICAgIH1cclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/UI/Map.js\n");

/***/ }),

/***/ "./src/UI/modal.js":
/*!*************************!*\
  !*** ./src/UI/modal.js ***!
  \*************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Modal\", function() { return Modal; });\nclass Modal {\n  constructor(contentId, fallBackText) {\n    this.fallBackText = fallBackText;\n    this.contentTemplateEle = document.getElementById(contentId);\n    this.modalTemplateEle = document.getElementById('modal-template');\n  }\n  showModal() {\n    if ('content' in document.createElement('template')) {\n      this.modalElements = document.importNode(this.modalTemplateEle.content, true);\n      this.modelElement = this.modalElements.querySelector('.modal');\n      this.backDropElements = this.modalElements.querySelector('.backdrop');\n      this.contentElements = document.importNode(this.contentTemplateEle.content, true);\n      this.modelElement.append(this.contentElements);\n      document.body.insertAdjacentElement('afterbegin', this.modelElement);\n      document.body.insertAdjacentElement('afterbegin', this.backDropElements);\n    } else {\n      alert(this.fallBackText);\n    }\n  }\n  hideModal() {\n    if (this.modelElement) {\n      document.body.removeChild(this.modelElement);\n      document.body.removeChild(this.backDropElements);\n      this.modalElement = null;\n      this.backDropElements = null;\n    }\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvbW9kYWwuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkvbW9kYWwuanM/NDBmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9kYWwge1xyXG4gICAgY29uc3RydWN0b3IoY29udGVudElkLCBmYWxsQmFja1RleHQpIHtcclxuICAgICAgICB0aGlzLmZhbGxCYWNrVGV4dCA9IGZhbGxCYWNrVGV4dDtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZUVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRlbnRJZCk7XHJcbiAgICAgICAgdGhpcy5tb2RhbFRlbXBsYXRlRWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLXRlbXBsYXRlJyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb2RhbCgpIHtcclxuICAgICAgICBpZiAoJ2NvbnRlbnQnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJykpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RhbEVsZW1lbnRzID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLm1vZGFsVGVtcGxhdGVFbGUuY29udGVudCwgdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5tb2RlbEVsZW1lbnQgPSB0aGlzLm1vZGFsRWxlbWVudHMucXVlcnlTZWxlY3RvcignLm1vZGFsJylcclxuICAgICAgICAgICAgdGhpcy5iYWNrRHJvcEVsZW1lbnRzID0gdGhpcy5tb2RhbEVsZW1lbnRzLnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZHJvcCcpXHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsZW1lbnRzID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLmNvbnRlbnRUZW1wbGF0ZUVsZS5jb250ZW50LCB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsRWxlbWVudC5hcHBlbmQodGhpcy5jb250ZW50RWxlbWVudHMpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsdGhpcy5tb2RlbEVsZW1lbnQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJyx0aGlzLmJhY2tEcm9wRWxlbWVudHMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQodGhpcy5mYWxsQmFja1RleHQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBoaWRlTW9kYWwoKSB7XHJcbiAgICAgICAgaWYodGhpcy5tb2RlbEVsZW1lbnQpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubW9kZWxFbGVtZW50KVxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuYmFja0Ryb3BFbGVtZW50cylcclxuICAgICAgICAgICAgdGhpcy5tb2RhbEVsZW1lbnQ9bnVsbDtcclxuICAgICAgICAgICAgdGhpcy5iYWNrRHJvcEVsZW1lbnRzPW51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/UI/modal.js\n");

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/*! exports provided: getCoordsFromtheAddress, getLinkOftheAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCoordsFromtheAddress\", function() { return getCoordsFromtheAddress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLinkOftheAddress\", function() { return getLinkOftheAddress; });\nasync function getCoordsFromtheAddress(address) {\n  const urlAddress = encodeURI(address);\n  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=AIzaSyCJ881TLHH1lpMTbIiDUcAtjFkofcDeLEE`);\n  if (!response.ok) {\n    throw new Error('failed to fetch location');\n  }\n  const data = await response.json();\n  if (data.error_message) {\n    throw new Error(data.error_message);\n  }\n  console.log(data);\n  const coordinates = data.results[0].geometry.location;\n  return coordinates;\n}\nasync function getLinkOftheAddress(coords) {\n  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyCJ881TLHH1lpMTbIiDUcAtjFkofcDeLEE`);\n  if (!response.ok) {\n    throw new Error('failed to fetch address');\n  }\n  const data = await response.json();\n  if (data.error_message) {\n    throw new Error(data.error_message);\n  }\n  console.log(data);\n  const address = data.results[0].formatted_address;\n  return address;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbGl0eS9Mb2NhdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VdGlsaXR5L0xvY2F0aW9uLmpzPzQyZGUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvb3Jkc0Zyb210aGVBZGRyZXNzKGFkZHJlc3MpIHtcclxuICAgIGNvbnN0IHVybEFkZHJlc3MgPSBlbmNvZGVVUkkoYWRkcmVzcylcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/YWRkcmVzcz0ke3VybEFkZHJlc3N9JmtleT1BSXphU3lDSjg4MVRMSEgxbHBNVGJJaURVY0F0akZrb2ZjRGVMRUVgKVxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZmFpbGVkIHRvIGZldGNoIGxvY2F0aW9uJylcclxuICAgIH1cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgIGlmIChkYXRhLmVycm9yX21lc3NhZ2UpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcl9tZXNzYWdlKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uO1xyXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGlua09mdGhlQWRkcmVzcyhjb29yZHMpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPSR7Y29vcmRzLmxhdH0sJHtjb29yZHMubG5nfSZrZXk9QUl6YVN5Q0o4ODFUTEhIMWxwTVRiSWlEVWNBdGpGa29mY0RlTEVFYClcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBmZXRjaCBhZGRyZXNzJylcclxuICAgIH1cclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcclxuICAgIGlmIChkYXRhLmVycm9yX21lc3NhZ2UpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcl9tZXNzYWdlKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBkYXRhLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XHJcbiAgICByZXR1cm4gYWRkcmVzcztcclxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Utility/Location.js\n");

/***/ })

/******/ });