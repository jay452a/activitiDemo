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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _demo = __webpack_require__(1);

var _demo2 = _interopRequireDefault(_demo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by lenovo on 2017/7/24.
 */
var act = new _demo2.default();
act.init("mainFlow");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by lenovo on 2017/7/24.
 */

var Activiti = function () {
    function Activiti() {
        _classCallCheck(this, Activiti);

        this.addDom = null;
        this.addArea = null;
        this.paintArea = null;
        this.operateArr = []; //用于储存操作
    }
    //一些单独方法


    _createClass(Activiti, [{
        key: "getRandString",
        value: function getRandString() {
            //随机生成6位数的大写字母
            var result = [];
            for (var i = 0; i < 6; i++) {
                var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
                result.push(String.fromCharCode(65 + ranNum));
            }
            var resultSring = result.join("");
            return resultSring;
        }
    }, {
        key: "changeName",
        value: function changeName(end) {
            //降终点上下左右转换成点的className
            switch (end) {
                case "top":
                    end = "dotT";
                    break;
                case "bottom":
                    end = "dotB";
                    break;
                case "left":
                    end = "dotL";
                    break;
                default:
                    end = "dotR";
            }
            return end;
        }

        //启动整个流程相关方法

    }, {
        key: "init",
        value: function init(domId) {
            var container = document.getElementById(domId);
            var html = "<div class='addArea'><span class='add' draggable='true'>添加流程</span></div>";
            html += '<div id="paintArea">' + '<svg id="paintSvg" xmlns="http://www.w3.org/2000/svg" version="1.1">' + '<defs> ' + '<marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" markerUnits="strokeWidth"> ' + '<path d="M0,0 L0,4 L4,2 z" fill="rgb(89, 171, 228)" /> ' + '</marker> ' + '</defs>' + '</svg>' + '</div>';
            container.innerHTML = html;
            this.addDom = document.querySelectorAll(".add")[0];
            this.addArea = document.querySelectorAll(".addArea")[0];
            this.addNode();
        }
    }, {
        key: "addNode",
        value: function addNode() {
            //向绘图区域添加节点
            var addDom = this.addDom; //获取添加节点
            var paintArea = document.getElementById("paintArea");
            this.paintArea = paintArea;
            var x = void 0;
            var y = void 0;
            var that = this;
            paintArea.ondrop = function (e) {
                //在目标对象里释放
                var ev = window.event || e;
                var belongSring = that.getRandString(); //用来标识某个节点路程
                ev.preventDefault();
                var movedDom = document.createElement("div");
                movedDom.setAttribute("class", "flowIcon");
                movedDom.setAttribute("data-row", belongSring);
                var innerH = '<span>添加流程</span>';
                innerH += '<i class="dotL" data-row="' + belongSring + '"></i><i class="dotR" data-row="' + belongSring + '"></i><i class="dotT" data-row="' + belongSring + '"></i><i class="dotB" data-row="' + belongSring + '"></i>';
                movedDom.innerHTML = innerH;
                document.getElementById("paintArea").appendChild(movedDom);
                var movedDomWidth = movedDom.offsetWidth;
                var movedDomHeight = movedDom.offsetHeight;
                movedDom.style.setProperty("left", x - movedDomWidth / 2 > 0 ? x - movedDomWidth / 2 + "px" : 0);
                movedDom.style.setProperty("top", y - movedDomHeight / 2 > 0 ? y - movedDomHeight / 2 + "px" : 0);
                that.moveFlowIcon(movedDom); //可移动节点
                that.paintArrow(movedDom); //画线
            };
            paintArea.ondragover = function (e) {
                //源对象悬停在目标对象上
                var ev = window.event || e;
                ev.preventDefault();
                var mouseX = ev.pageX;
                var mouseY = ev.pageY;
                var paintAreaOffsetX = paintArea.offsetLeft;
                var paintAreaOffsetY = paintArea.offsetTop;
                var scrollTop = paintArea.scrollTop;
                var scrollLeft = paintArea.scrollLeft;
                var windowScrollY = window.scrollY;
                var windowScrollX = window.scrollX;
                x = mouseX - paintAreaOffsetX + scrollLeft + windowScrollX;
                y = mouseY - paintAreaOffsetY + scrollTop + windowScrollY;
            };
            addDom.ondragstart = function (e) {
                //源对象开始被拖动
                var ev = window.event || e;
            };
        }
    }, {
        key: "moveFlowIcon",
        value: function moveFlowIcon(movedDom) {
            //可在绘图区域内移动节点
            var isDown = false;
            var x = void 0;
            var y = void 0;
            var that = this;
            var startX = void 0;
            var startY = void 0;
            var drag = function drag(ev) {

                var mouseX = ev.clientX;
                var mouseY = ev.clientY;
                //console.log(mouseX,mouseY)
                if (mouseX == startX && mouseY == startY) {
                    return;
                }
                var paintAreaOffsetX = that.paintArea.offsetLeft;
                var paintAreaOffsetY = that.paintArea.offsetTop;
                //获取滚动条的高度
                var scrollTop = that.paintArea.scrollTop;
                var scrollLeft = that.paintArea.scrollLeft;
                var windowScrollY = window.scrollY;
                var windowScrollX = window.scrollX;

                //console.log("top"+scrollTop)
                x = mouseX - paintAreaOffsetX + scrollLeft + windowScrollX;
                y = mouseY - paintAreaOffsetY + scrollTop + windowScrollY;
                var movedDomWidth = movedDom.offsetWidth;
                var movedDomHeight = movedDom.offsetHeight;
                movedDom.style.setProperty("left", x - movedDomWidth / 2 > 0 ? x - movedDomWidth / 2 + "px" : 0);
                movedDom.style.setProperty("top", y - movedDomHeight / 2 > 0 ? y - movedDomHeight / 2 + "px" : 0);
            };
            var dragOver = function dragOver() {
                //当移动超出视野范围之后，svg的宽高一起发生变化
                var allMoveDom = document.querySelectorAll(".flowIcon");
                var containerW = that.paintArea.offsetWidth;
                var containerH = that.paintArea.offsetHeight;
                var maxLeft = 0;
                var maxTop = 0;
                var svg = document.getElementById("paintSvg");
                for (var i = 0; i < allMoveDom.length; i++) {
                    var left = allMoveDom[i].offsetLeft;
                    var width = allMoveDom[i].offsetWidth;
                    var top = allMoveDom[i].offsetTop;
                    var height = allMoveDom[i].offsetHeight;
                    //console.log(left+width,containerW)
                    if (left + width > containerW) {
                        if (left + width > maxLeft) {
                            maxLeft = left + width;
                        }
                    }
                    if (top + height > containerH) {
                        if (top + height > maxTop) {
                            maxTop = top + height;
                        }
                    }
                }
                //console.log("max="+maxLeft)
                if (maxLeft != 0) {
                    svg.style.width = maxLeft;
                }
                if (maxTop != 0) {
                    svg.style.height = maxTop;
                }
            };
            movedDom.onmousedown = function (e) {
                var ev = window.event || e;
                ev.preventDefault();
                isDown = true;
                startX = ev.clientX;
                startY = ev.clientY;
                document.onmousemove = function (e) {
                    var ev = window.event || e;
                    if (isDown == true) {
                        drag(ev);
                        that.moveChangeSvg(movedDom);
                    }
                };
                this.onmouseup = function (e) {
                    var ev = window.event || e;
                    ev.preventDefault();
                    isDown = false;
                    dragOver();
                };
                document.onmouseup = function (e) {
                    var ev = window.event || e;
                    ev.preventDefault();
                    isDown = false;
                    dragOver();
                };
            };
        }
        //画线

    }, {
        key: "paintArrowGetPath",
        value: function paintArrowGetPath(startX, startY, x, y, direct, nearlyName) {
            //获取画线的路径，svg path
            var pathD = void 0;
            var flowWidth = document.querySelector(".flowIcon").offsetWidth / 2;
            var flowHeight = document.querySelector(".flowIcon").offsetHeight;

            //获取滚动条高度
            var scrollTop = this.paintArea.scrollTop;
            var scrollLeft = this.paintArea.scrollLeft;
            var windowScrollY = window.scrollY;
            var windowScrollX = window.scrollX;
            startX += scrollLeft + windowScrollX;
            startY += scrollTop + windowScrollY;
            console.log(direct, nearlyName);
            if (nearlyName == undefined) {
                //如果没有进入流程div内
                x += scrollLeft + windowScrollX;
                y += scrollTop + windowScrollY;
                switch (direct) {
                    case "dotB":
                        if (x - startX <= 0 && y - startY >= 0) {
                            //往左下
                            if (y - startY < 30) {
                                //当Y移动不超过30时
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + x + "," + (startY + 30) + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (x - startX <= 0 && startY - y > 0) {
                            //往左上

                            if (startX - x < flowWidth) {
                                //当鼠标往左移动小于节点的一半
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (startX - flowWidth - 30) + "," + (startY + 30) + " L" + (startX - flowWidth - 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + x + "," + (startY + 30) + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && y - startY >= 0) {
                            //往右下
                            if (y - startY < 30) {
                                //当Y移动不超过30时
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + x + "," + (startY + 30) + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && startY - y > 0) {
                            //往右上
                            if (x - startX < flowWidth) {
                                //当鼠标往左移动小于节点的一半
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (startX + flowWidth + 30) + "," + (startY + 30) + " L" + (startX + flowWidth + 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + x + "," + (startY + 30) + " L" + x + "," + y;
                            }
                        }
                        break;
                    case "dotT":
                        if (x - startX <= 0 && startY - y > 0) {
                            //往左上
                            if (startY - y < 30) {
                                //当Y移动不超过30时
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + x + "," + (startY - 30) + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && startY - y > 0) {
                            //往右上
                            if (startY - y < 30) {
                                //当Y移动不超过30时
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + x + "," + (startY - 30) + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (x - startX <= 0 && startY - y <= 0) {
                            //往左下
                            if (startX - x < flowWidth) {
                                //当鼠标往左移动小于节点的一半
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (startX - flowWidth - 30) + "," + (startY - 30) + " L" + (startX - flowWidth - 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + x + "," + (startY - 30) + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && startY - y <= 0) {
                            if (x - startX < flowWidth) {
                                //当鼠标往左移动小于节点的一半
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (startX + flowWidth + 30) + "," + (startY - 30) + " L" + (startX + flowWidth + 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + x + "," + (startY - 30) + " L" + x + "," + y;
                            }
                        }
                        break;
                    case "dotL":
                        if (x - startX <= 0 && startY - y > 0) {
                            //往左上
                            if (startX - x < 30) {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + x + "," + startY + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && startY - y > 0) {
                            //往右上
                            pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + y + " L" + x + "," + y;
                        }
                        if (x - startX <= 0 && startY - y <= 0) {
                            //往左下
                            if (startX - x < 30) {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + x + "," + startY + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && startY - y <= 0) {
                            //往右下
                            pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + y + " L" + x + "," + y;
                        }
                        break;
                    default:
                        if (x - startX <= 0 && startY - y > 0) {
                            //往左上
                            pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + y + " L" + x + "," + y;
                        }
                        if (x - startX <= 0 && startY - y <= 0) {
                            //往左下
                            pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + y + " L" + x + "," + y;
                        }
                        if (x - startX > 0 && startY - y > 0) {
                            //往右上
                            if (x - startX < 30) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + x + "," + startY + " L" + x + "," + y;
                            }
                        }
                        if (x - startX > 0 && startY - y <= 0) {
                            //往右下
                            if (x - startX < 30) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + x + "," + startY + " L" + x + "," + y;
                            }
                        }
                }
            }

            if (nearlyName) {
                switch (direct) {
                    case "dotT":
                        if (nearlyName == "left") {
                            x -= 6;
                            if (x - startX > 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX > 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (x + startX) / 2 + "," + (startY - 30) + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX <= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + y) / 2 + " L" + (x - 30) + "," + (startY + y) / 2 + " L" + (x - 30) + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX <= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (x - 30) + "," + (startY - 30) + " L" + (x - 30) + "," + y + ' L' + x + "," + y;
                            }
                        }
                        if (nearlyName == "right") {
                            x += 6;
                            if (x - startX > 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x + 30) + "," + (y + startY) / 2 + " L" + (x + 30) + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX > 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (x + 30) + "," + (startY - 30) + " L" + (x + 30) + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX <= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX <= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (x + startX) / 2 + "," + (startY - 30) + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "top") {
                            y -= 6;
                            if (y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y - 30) + " L" + x + "," + (y - 30) + " L" + x + "," + y;
                            }
                            if (y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + x + "," + (startY - 30) + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "bottom") {
                            y += 6;
                            if (y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + y) / 2 + " L" + x + "," + (startY + y) / 2 + " L" + x + "," + y;
                            }
                            if (y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY - 30) + " L" + (x + startX) / 2 + "," + (startY - 30) + " L" + (x + startX) / 2 + "," + (y + 30) + " L" + x + "," + (y + 30) + " L" + x + "," + y;
                            }
                        }
                        break;
                    case "dotB":
                        if (nearlyName == "left") {
                            x -= 6;
                            if (x - startX < 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (x - 30) + "," + (startY + 30) + " L" + (x - 30) + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (x + startX) / 2 + "," + (startY + 30) + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX < 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x - 30) + "," + (y + startY) / 2 + " L" + (x - 30) + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "right") {
                            x += 6;
                            if (x - startX < 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (x + startX) / 2 + "," + (startY + 30) + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (x + 30) + "," + (startY + 30) + " L" + (x + 30) + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX < 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + (x + 30) + "," + (y + startY) / 2 + " L" + (x + 30) + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "top") {
                            y -= 6;
                            if (y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + (x + startX) / 2 + "," + (startY + 30) + " L" + (x + startX) / 2 + "," + (y - 30) + " L" + x + "," + (y - 30) + " L" + x + "," + y;
                            }
                            if (y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "bottom") {
                            y += 6;
                            if (y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (startY + 30) + " L" + x + "," + (startY + 30) + " L" + x + "," + y;
                            }
                            if (y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + startX + "," + (y + 30) + " L" + x + "," + (y + 30) + " L" + x + "," + y;
                            }
                        }
                        break;
                    case "dotL":
                        if (nearlyName == "left") {
                            x -= 6;
                            if (x - startX < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x - 30) + "," + startY + " L" + (x - 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "right") {
                            x += 6;
                            if (x - startX < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + (y + startY) / 2 + " L" + (x + 30) + "," + (y + startY) / 2 + " L" + (x + 30) + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "top") {
                            y -= 6;
                            if (x - startX < 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y - 30) + " L" + x + "," + (y - 30) + ' L' + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + (y - 30) + " L" + x + "," + (y - 30) + " L" + x + "," + y;
                            }
                            if (x - startX < 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "bottom") {
                            y += 6;
                            if (x - startX < 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                            if (x - startX < 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y + 30) + " L" + x + "," + (y + 30) + ' L' + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX - 30) + "," + startY + " L" + (startX - 30) + "," + (y + 30) + " L" + x + "," + (y + 30) + " L" + x + "," + y;
                            }
                        }
                        break;
                    default:
                        if (nearlyName == "left") {
                            x -= 6;
                            if (x - startX < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + (y + startY) / 2 + " L" + (x - 30) + "," + (y + startY) / 2 + " L" + (x - 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "right") {
                            x += 6;
                            if (x - startX < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + y + " L" + x + "," + y;
                            } else {
                                pathD = "M" + startX + "," + startY + " L" + (x + 30) + "," + startY + " L" + (x + 30) + "," + y + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "top") {
                            y -= 6;
                            if (x - startX < 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + (y - 30) + " L" + x + "," + (y - 30) + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y - 30) + " L" + x + "," + (y - 30) + " L" + x + "," + y;
                            }
                            if (x - startX < 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                        }
                        if (nearlyName == "bottom") {
                            y += 6;
                            if (x - startX < 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY < 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y + startY) / 2 + " L" + x + "," + (y + startY) / 2 + " L" + x + "," + y;
                            }
                            if (x - startX < 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (startX + 30) + "," + startY + " L" + (startX + 30) + "," + (y + 30) + " L" + x + "," + (y + 30) + " L" + x + "," + y;
                            }
                            if (x - startX >= 0 && y - startY >= 0) {
                                pathD = "M" + startX + "," + startY + " L" + (x + startX) / 2 + "," + startY + " L" + (x + startX) / 2 + "," + (y + 30) + " L" + x + "," + (y + 30) + " L" + x + "," + y;
                            }
                        }
                }
            }

            return pathD;
        }
    }, {
        key: "paintArrow",
        value: function paintArrow(moveDom) {
            var isDown = false;
            var startX = void 0;
            var startY = void 0;
            var endX = void 0;
            var endY = void 0;
            var svgContainer = document.getElementById("paintSvg");
            var that = this;
            var direct = void 0;

            //当鼠标移动的时候绘图
            var paint = function paint(groupData, dataRow, cursorNode) {
                var mouseX = cursorNode.clientX; //鼠标位置x
                var mouseY = cursorNode.clientY; //鼠标位置y
                var paintAreaX = that.paintArea.offsetLeft;
                var paintAreaY = that.paintArea.offsetTop;
                var x = mouseX - paintAreaX;
                var y = mouseY - paintAreaY;
                var nearlyName = void 0; //获取最近点名称
                /*计算最近点*/
                var endDom = void 0; //获取指向节点
                if (cursorNode.target.className == "flowIcon") {
                    endDom = cursorNode.target;
                }
                if (cursorNode.target.parentNode.className == "flowIcon") {
                    endDom = cursorNode.target.parentNode;
                }
                //console.log(endDom)

                if (cursorNode.target.className == "flowIcon" || cursorNode.target.parentNode.className == "flowIcon") {
                    //计算出指向节点的上下左右四个位置坐标
                    var endDomT = {};
                    var endDomB = {};
                    var endDomL = {};
                    var endDomR = {};
                    endDomT.x = endDom.offsetLeft + endDom.offsetWidth / 2;
                    endDomT.y = endDom.offsetTop;
                    endDomB.x = endDom.offsetLeft + endDom.offsetWidth / 2;
                    endDomB.y = endDom.offsetTop + endDom.offsetHeight;
                    endDomL.x = endDom.offsetLeft;
                    endDomL.y = endDom.offsetTop + endDom.offsetHeight / 2;
                    endDomR.x = endDom.offsetLeft + endDom.offsetWidth;
                    endDomR.y = endDom.offsetTop + endDom.offsetHeight / 2;
                    //   console.log(endDomT,endDomB,endDomL,endDomR)
                    //比较鼠标离哪个点更近
                    var curToEndDomT = Math.sqrt(Math.pow(x - endDomT.x, 2) + Math.pow(y - endDomT.y, 2));
                    var curToEndDomB = Math.sqrt(Math.pow(x - endDomB.x, 2) + Math.pow(y - endDomB.y, 2));
                    var curToEndDomL = Math.sqrt(Math.pow(x - endDomL.x, 2) + Math.pow(y - endDomL.y, 2));
                    var curToEndDomR = Math.sqrt(Math.pow(x - endDomR.x, 2) + Math.pow(y - endDomR.y, 2));
                    var destination = [];
                    destination.push({ name: "top", num: curToEndDomT }, { name: "bottom", num: curToEndDomB }, { name: "left", num: curToEndDomL }, { name: "right", num: curToEndDomR });
                    var nearly = 100000;
                    for (var i = 0; i < destination.length; i++) {
                        if (destination[i].num < nearly) {
                            nearly = destination[i].num;
                            nearlyName = destination[i].name;
                        }
                    }
                    // console.log(nearly,nearlyName)
                    switch (nearlyName) {
                        case "top":
                            x = endDomT.x;
                            y = endDomT.y;
                            break;
                        case "bottom":
                            x = endDomB.x;
                            y = endDomB.y;
                            break;
                        case "left":
                            x = endDomL.x;
                            y = endDomL.y;
                            break;
                        default:
                            x = endDomR.x;
                            y = endDomR.y;
                    }
                }
                /*计算最近点*/

                //绘制直线属性
                /*groupData.line.setAttribute("x1",startX)
                groupData.line.setAttribute("y1",startY)
                groupData.line.setAttribute("x2",x)
                groupData.line.setAttribute("y2",y)
                groupData.line.setAttribute("marker-end","url(#arrow)")//箭头
                groupData.line.style.stroke="rgb(89, 171, 228)"
                groupData.line.style.strokeWidth="2px"*/
                //获取绘制路径属性
                var pathD = that.paintArrowGetPath(startX, startY, x, y, direct, nearlyName);

                groupData.path.setAttribute("d", pathD);
                groupData.path.setAttribute("fill", "transparent");
                groupData.path.setAttribute("stroke", "#59ABE4");
                groupData.path.setAttribute("stroke-width", "2");
                groupData.path.setAttribute("marker-end", "url(#arrow)");
                groupData.group.setAttribute("data-start", direct);
                groupData.group.setAttribute("data-end", nearlyName);
                endX = x;
                endY = y;
            };
            //鼠标释放
            var dragOver = function dragOver(groupData, dataRow, cursorNode) {
                //判断是否进入另外一个节点

                if (cursorNode.target.className == "flowIcon" || cursorNode.target.parentNode.className == "flowIcon") {
                    if (cursorNode.target.getAttribute("data-row") != dataRow && cursorNode.target.parentNode.getAttribute("data-row") != dataRow) {
                        var start = dataRow;
                        var end = cursorNode.target.getAttribute("data-row") || cursorNode.target.parentNode.getAttribute("data-row");
                        var svgArea = document.getElementById("paintSvg");
                        var svgGroup = svgArea.childNodes;
                        console.log(svgGroup);
                        for (var i = 0; i < svgGroup.length; i++) {
                            if (svgGroup[i].tagName == "g") {
                                if (svgGroup[i].getAttribute("data-path") == start + "-" + end) {
                                    svgGroup[i].remove();
                                }
                            }
                        }
                        groupData.group.setAttribute("data-path", start + "-" + end);
                    } else {
                        // groupData.group.remove()
                    }
                } else {
                    groupData.group.remove();
                }
            };

            moveDom.addEventListener("mousedown", function (e) {
                var ev = window.event || e;
                isDown = true;
                if (ev.target.nodeName == 'I') {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    this.onmouseup = null;
                    direct = ev.target.className; //标记哪个点按下的
                    var directDom = ev.target; //获取画线的起始点的dom节点
                    startX = ev.clientX - that.paintArea.offsetLeft;
                    startY = ev.clientY - that.paintArea.offsetTop;
                    //创建一个组
                    var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    //创建一条路径
                    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    svgContainer.appendChild(group);
                    group.appendChild(path);
                    var groupData = { //包含svg组的一些信息
                        group: group,
                        path: path
                    };
                    var dataRow = ev.target.getAttribute("data-row"); //获取开始画线的起始点的data-row属性
                    document.onmousemove = function (e) {
                        var ev = window.event || e;
                        if (isDown == true) {
                            console.log("huaxianmove");
                            paint(groupData, dataRow, ev);
                        }
                    };
                    this.onmouseup = function (e) {
                        var ev = window.event || e;
                        ev.preventDefault();
                        isDown = false;
                        dragOver(groupData, dataRow, ev);
                    };
                    document.onmouseup = function (e) {
                        var ev = window.event || e;
                        ev.preventDefault();
                        if (isDown == true) {
                            dragOver(groupData, dataRow, ev);
                        }

                        isDown = false;
                    };
                }
            });
        }

        //当流程节点移动的时候，折线图随之移动

    }, {
        key: "moveChangeSvg",
        value: function moveChangeSvg(movedDom) {
            console.log(movedDom);
            var svg = document.querySelectorAll("g");
            console.log(movedDom.offsetLeft, movedDom.offsetTop);
            console.log(svg);
            if (!svg) {
                return;
            }
            var flowDivChildren = movedDom.childNodes;
            console.log(flowDivChildren);
            for (var i = 0; i < svg.length; i++) {
                var start = svg[i].getAttribute('data-start');
                var end = this.changeName(svg[i].getAttribute("data-end"));
                var pathStart = svg[i].getAttribute("data-path").split("-")[0];
                var pathEnd = svg[i].getAttribute("data-path").split("-")[1];
                if (movedDom.getAttribute("data-row") == pathStart) {
                    for (var j = 0; j < flowDivChildren.length; j++) {
                        if (flowDivChildren[j].className == start) {
                            var startX = movedDom.offsetLeft + flowDivChildren[j].offsetLeft + flowDivChildren[j].offsetWidth / 2;
                            var startY = movedDom.offsetTop + flowDivChildren[j].offsetTop + flowDivChildren[j].offsetHeight / 2;
                            console.log(startX, startY);
                            var path = svg[i].childNodes[0].getAttribute("d");
                            var pathArr = path.split(" ");
                            console.log(pathArr);
                            pathArr[0] = "M" + startX + "," + startY;

                            if (start == "dotT" || start == "dotB") {
                                var pathArr1 = pathArr[1];
                                var pathArr1Y = pathArr1.split(",")[1];
                                var pathArr1New = "L" + startX + "," + pathArr1Y;
                                pathArr[1] = pathArr1New;
                                svg[i].childNodes[0].setAttribute("d", pathArr.join(" "));
                            }
                            if (start == "dotL" || start == "dotR") {
                                var _pathArr = pathArr[1];
                                var pathArr1X = _pathArr.split(",")[0];
                                var _pathArr1New = pathArr1X + "," + startY;
                                pathArr[1] = _pathArr1New;
                                svg[i].childNodes[0].setAttribute("d", pathArr.join(" "));
                            }
                        }
                    }
                }
                if (movedDom.getAttribute("data-row") == pathEnd) {
                    for (var k = 0; k < flowDivChildren.length; k++) {
                        if (flowDivChildren[k].className == end) {
                            var endX = movedDom.offsetLeft + flowDivChildren[k].offsetLeft + flowDivChildren[k].offsetWidth / 2;
                            var endY = movedDom.offsetTop + flowDivChildren[k].offsetTop + flowDivChildren[k].offsetHeight / 2;
                            var _path = svg[i].childNodes[0].getAttribute("d");
                            var _pathArr2 = _path.split(" ");
                            var length = _pathArr2.length;

                            console.log(_pathArr2, length);
                            if (end == "dotT" || end == "dotB") {
                                var pathArrLast2 = _pathArr2[length - 2];
                                var pathArrLast2Y = pathArrLast2.split(",")[1];
                                var pathArrLast2New = "L" + endX + "," + pathArrLast2Y;

                                var pathArrLast3 = _pathArr2[length - 3];
                                var pathArrLast3X = pathArrLast3.split(",")[0];
                                var pathArrLast3New = void 0;
                                pathArrLast2New = "L" + endX + "," + (end == "dotT" ? endY - 30 : endY + 30);
                                pathArrLast3New = pathArrLast3X + "," + (end == "dotT" ? endY - 30 : endY + 30);

                                _pathArr2[length - 1] = "L" + endX + "," + (end == "dotT" ? endY - 6 : endY + 6);
                                _pathArr2[length - 2] = pathArrLast2New;
                                _pathArr2[length - 3] = pathArrLast3New;
                                var pathString = _pathArr2.join(" ");
                                console.log(pathString);
                                svg[i].childNodes[0].setAttribute("d", pathString);
                            }

                            if (end == "dotL" || end == "dotR") {
                                var _pathArrLast = _pathArr2[length - 2];
                                var pathArrLast2X = end == "dotL" ? endX - 30 : endX + 30;
                                var _pathArrLast2New = "L" + pathArrLast2X + "," + endY;
                                var _pathArrLast2 = _pathArr2[length - 3];
                                var pathArrLast3Y = _pathArrLast2.split(",")[1];
                                var _pathArrLast3New = pathArrLast2X + "," + pathArrLast3Y;
                                _pathArr2[length - 1] = "L" + (end == "dotL" ? endX - 6 : endX + 6) + "," + endY;
                                _pathArr2[length - 2] = _pathArrLast2New;
                                _pathArr2[length - 3] = _pathArrLast3New;
                                svg[i].childNodes[0].setAttribute("d", _pathArr2.join(" "));
                            }
                        }
                    }
                }
            }
        }
    }]);

    return Activiti;
}();

exports.default = Activiti;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);