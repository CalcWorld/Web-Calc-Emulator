var key, Module = void 0 !== Module ? Module : {}, moduleOverrides = {};
for (key in Module)
	Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
var arguments_ = []
	, thisProgram = "./this.program"
	, quit_ = function (e, r) {
		throw r
	}
	, ENVIRONMENT_IS_WEB = !1
	, ENVIRONMENT_IS_WORKER = !1
	, ENVIRONMENT_IS_NODE = !1
	, ENVIRONMENT_IS_SHELL = !1;
ENVIRONMENT_IS_WEB = "object" == typeof window,
	ENVIRONMENT_IS_WORKER = "function" == typeof importScripts,
	ENVIRONMENT_IS_NODE = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
	ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var read_, readAsync, readBinary, setWindowTitle, nodeFS, nodePath, scriptDirectory = "";
function locateFile(e) {
	return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e
}
ENVIRONMENT_IS_NODE ? (scriptDirectory = ENVIRONMENT_IS_WORKER ? require("path").dirname(scriptDirectory) + "/" : __dirname + "/",
	read_ = function (e, r) {
		return nodeFS || (nodeFS = require("fs")),
			nodePath || (nodePath = require("path")),
			e = nodePath.normalize(e),
			nodeFS.readFileSync(e, r ? null : "utf8")
	}
	,
	readBinary = function (e) {
		var r = read_(e, !0);
		return r.buffer || (r = new Uint8Array(r)),
			assert(r.buffer),
			r
	}
	,
	process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")),
	arguments_ = process.argv.slice(2),
	"undefined" != typeof module && (module.exports = Module),
	process.on("uncaughtException", (function (e) {
		if (!(e instanceof ExitStatus))
			throw e
	}
	)),
	process.on("unhandledRejection", abort),
	quit_ = function (e) {
		process.exit(e)
	}
	,
	Module.inspect = function () {
		return "[Emscripten Module object]"
	}
) : ENVIRONMENT_IS_SHELL ? ("undefined" != typeof read && (read_ = function (e) {
	return read(e)
}
),
	readBinary = function (e) {
		var r;
		return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (assert("object" == typeof (r = read(e, "binary"))),
			r)
	}
	,
	"undefined" != typeof scriptArgs ? arguments_ = scriptArgs : "undefined" != typeof arguments && (arguments_ = arguments),
	"function" == typeof quit && (quit_ = function (e) {
		quit(e)
	}
	),
	"undefined" != typeof print && ("undefined" == typeof console && (console = {}),
		console.log = print,
		console.warn = console.error = "undefined" != typeof printErr ? printErr : print)) : (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : "undefined" != typeof document && document.currentScript && (scriptDirectory = document.currentScript.src),
			scriptDirectory = 0 !== scriptDirectory.indexOf("blob:") ? scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1) : "",
			read_ = function (e) {
				var r = new XMLHttpRequest;
				return r.open("GET", e, !1),
					r.send(null),
					r.responseText
			}
			,
			ENVIRONMENT_IS_WORKER && (readBinary = function (e) {
				var r = new XMLHttpRequest;
				return r.open("GET", e, !1),
					r.responseType = "arraybuffer",
					r.send(null),
					new Uint8Array(r.response)
			}
			),
			readAsync = function (e, r, t) {
				var n = new XMLHttpRequest;
				n.open("GET", e, !0),
					n.responseType = "arraybuffer",
					n.onload = function () {
						200 == n.status || 0 == n.status && n.response ? r(n.response) : t()
					}
					,
					n.onerror = t,
					n.send(null)
			}
			,
			setWindowTitle = function (e) {
				document.title = e
			}
		);
var out = Module.print || console.log.bind(console)
	, err = Module.printErr || console.warn.bind(console);
for (key in moduleOverrides)
	moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
moduleOverrides = null,
	Module.arguments && (arguments_ = Module.arguments),
	Module.thisProgram && (thisProgram = Module.thisProgram),
	Module.quit && (quit_ = Module.quit);
var STACK_ALIGN = 16;
function alignMemory(e, r) {
	return r || (r = STACK_ALIGN),
		Math.ceil(e / r) * r
}
var wasmBinary, tempRet0 = 0, setTempRet0 = function (e) {
	tempRet0 = e
};
Module.wasmBinary && (wasmBinary = Module.wasmBinary);
var wasmMemory, noExitRuntime = Module.noExitRuntime || !0;
function getValue(e, r, t) {
	switch ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"),
	r) {
		case "i1":
		case "i8":
			return HEAP8[e >> 0];
		case "i16":
			return HEAP16[e >> 1];
		case "i32":
		case "i64":
			return HEAP32[e >> 2];
		case "float":
			return HEAPF32[e >> 2];
		case "double":
			return HEAPF64[e >> 3];
		default:
			abort("invalid type for getValue: " + r)
	}
	return null
}
"object" != typeof WebAssembly && abort("no native wasm support detected");
var EXITSTATUS, ABORT = !1;
function assert(e, r) {
	e || abort("Assertion failed: " + r)
}
function getCFunc(e) {
	var r = Module["_" + e];
	return assert(r, "Cannot call unknown function " + e + ", make sure it is exported"),
		r
}
function ccall(e, r, t, n, o) {
	var a = {
		string: function (e) {
			var r = 0;
			if (null != e && 0 !== e) {
				var t = 1 + (e.length << 2);
				stringToUTF8(e, r = stackAlloc(t), t)
			}
			return r
		},
		array: function (e) {
			var r = stackAlloc(e.length);
			return writeArrayToMemory(e, r),
				r
		}
	}
		, i = getCFunc(e)
		, u = []
		, s = 0;
	if (n)
		for (var l = 0; l < n.length; l++) {
			var c = a[t[l]];
			c ? (0 === s && (s = stackSave()),
				u[l] = c(n[l])) : u[l] = n[l]
		}
	var d = i.apply(null, u);
	return d = function (e) {
		return "string" === r ? UTF8ToString(e) : "boolean" === r ? Boolean(e) : e
	}(d),
		0 !== s && stackRestore(s),
		d
}
function cwrap(e, r, t, n) {
	var o = (t = t || []).every((function (e) {
		return "number" === e
	}
	));
	return "string" !== r && o && !n ? getCFunc(e) : function () {
		return ccall(e, r, t, arguments, n)
	}
}
var UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function UTF8ArrayToString(e, r, t) {
	for (var n = r + t, o = r; e[o] && !(o >= n);)
		++o;
	if (o - r > 16 && e.subarray && UTF8Decoder)
		return UTF8Decoder.decode(e.subarray(r, o));
	for (var a = ""; r < o;) {
		var i = e[r++];
		if (128 & i) {
			var u = 63 & e[r++];
			if (192 != (224 & i)) {
				var s = 63 & e[r++];
				if ((i = 224 == (240 & i) ? (15 & i) << 12 | u << 6 | s : (7 & i) << 18 | u << 12 | s << 6 | 63 & e[r++]) < 65536)
					a += String.fromCharCode(i);
				else {
					var l = i - 65536;
					a += String.fromCharCode(55296 | l >> 10, 56320 | 1023 & l)
				}
			} else
				a += String.fromCharCode((31 & i) << 6 | u)
		} else
			a += String.fromCharCode(i)
	}
	return a
}
function UTF8ToString(e, r) {
	return e ? UTF8ArrayToString(HEAPU8, e, r) : ""
}
function stringToUTF8Array(e, r, t, n) {
	if (!(n > 0))
		return 0;
	for (var o = t, a = t + n - 1, i = 0; i < e.length; ++i) {
		var u = e.charCodeAt(i);
		if (u >= 55296 && u <= 57343 && (u = 65536 + ((1023 & u) << 10) | 1023 & e.charCodeAt(++i)),
			u <= 127) {
			if (t >= a)
				break;
			r[t++] = u
		} else if (u <= 2047) {
			if (t + 1 >= a)
				break;
			r[t++] = 192 | u >> 6,
				r[t++] = 128 | 63 & u
		} else if (u <= 65535) {
			if (t + 2 >= a)
				break;
			r[t++] = 224 | u >> 12,
				r[t++] = 128 | u >> 6 & 63,
				r[t++] = 128 | 63 & u
		} else {
			if (t + 3 >= a)
				break;
			r[t++] = 240 | u >> 18,
				r[t++] = 128 | u >> 12 & 63,
				r[t++] = 128 | u >> 6 & 63,
				r[t++] = 128 | 63 & u
		}
	}
	return r[t] = 0,
		t - o
}
function stringToUTF8(e, r, t) {
	return stringToUTF8Array(e, HEAPU8, r, t)
}
function lengthBytesUTF8(e) {
	for (var r = 0, t = 0; t < e.length; ++t) {
		var n = e.charCodeAt(t);
		n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++t)),
			n <= 127 ? ++r : r += n <= 2047 ? 2 : n <= 65535 ? 3 : 4
	}
	return r
}
var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64, UTF16Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
function UTF16ToString(e, r) {
	for (var t = e, n = t >> 1, o = n + r / 2; !(n >= o) && HEAPU16[n];)
		++n;
	if ((t = n << 1) - e > 32 && UTF16Decoder)
		return UTF16Decoder.decode(HEAPU8.subarray(e, t));
	for (var a = "", i = 0; !(i >= r / 2); ++i) {
		var u = HEAP16[e + 2 * i >> 1];
		if (0 == u)
			break;
		a += String.fromCharCode(u)
	}
	return a
}
function stringToUTF16(e, r, t) {
	if (void 0 === t && (t = 2147483647),
		t < 2)
		return 0;
	for (var n = r, o = (t -= 2) < 2 * e.length ? t / 2 : e.length, a = 0; a < o; ++a) {
		var i = e.charCodeAt(a);
		HEAP16[r >> 1] = i,
			r += 2
	}
	return HEAP16[r >> 1] = 0,
		r - n
}
function lengthBytesUTF16(e) {
	return 2 * e.length
}
function UTF32ToString(e, r) {
	for (var t = 0, n = ""; !(t >= r / 4);) {
		var o = HEAP32[e + 4 * t >> 2];
		if (0 == o)
			break;
		if (++t,
			o >= 65536) {
			var a = o - 65536;
			n += String.fromCharCode(55296 | a >> 10, 56320 | 1023 & a)
		} else
			n += String.fromCharCode(o)
	}
	return n
}
function stringToUTF32(e, r, t) {
	if (void 0 === t && (t = 2147483647),
		t < 4)
		return 0;
	for (var n = r, o = n + t - 4, a = 0; a < e.length; ++a) {
		var i = e.charCodeAt(a);
		if (i >= 55296 && i <= 57343 && (i = 65536 + ((1023 & i) << 10) | 1023 & e.charCodeAt(++a)),
			HEAP32[r >> 2] = i,
			(r += 4) + 4 > o)
			break
	}
	return HEAP32[r >> 2] = 0,
		r - n
}
function lengthBytesUTF32(e) {
	for (var r = 0, t = 0; t < e.length; ++t) {
		var n = e.charCodeAt(t);
		n >= 55296 && n <= 57343 && ++t,
			r += 4
	}
	return r
}
function writeArrayToMemory(e, r) {
	HEAP8.set(e, r)
}
function writeAsciiToMemory(e, r, t) {
	for (var n = 0; n < e.length; ++n)
		HEAP8[r++ >> 0] = e.charCodeAt(n);
	t || (HEAP8[r >> 0] = 0)
}
function alignUp(e, r) {
	return e % r > 0 && (e += r - e % r),
		e
}
function updateGlobalBufferAndViews(e) {
	buffer = e,
		Module.HEAP8 = HEAP8 = new Int8Array(e),
		Module.HEAP16 = HEAP16 = new Int16Array(e),
		Module.HEAP32 = HEAP32 = new Int32Array(e),
		Module.HEAPU8 = HEAPU8 = new Uint8Array(e),
		Module.HEAPU16 = HEAPU16 = new Uint16Array(e),
		Module.HEAPU32 = HEAPU32 = new Uint32Array(e),
		Module.HEAPF32 = HEAPF32 = new Float32Array(e),
		Module.HEAPF64 = HEAPF64 = new Float64Array(e)
}
var wasmTable, INITIAL_MEMORY = Module.INITIAL_MEMORY || 16777216, __ATPRERUN__ = [], __ATINIT__ = [], __ATMAIN__ = [], __ATPOSTRUN__ = [], runtimeInitialized = !1;
function preRun() {
	if (Module.preRun)
		for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;)
			addOnPreRun(Module.preRun.shift());
	callRuntimeCallbacks(__ATPRERUN__)
}
function initRuntime() {
	runtimeInitialized = !0,
		Module.noFSInit || FS.init.initialized || FS.init(),
		TTY.init(),
		callRuntimeCallbacks(__ATINIT__)
}
function preMain() {
	FS.ignorePermissions = !1,
		callRuntimeCallbacks(__ATMAIN__)
}
function postRun() {
	if (Module.postRun)
		for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;)
			addOnPostRun(Module.postRun.shift());
	callRuntimeCallbacks(__ATPOSTRUN__)
}
function addOnPreRun(e) {
	__ATPRERUN__.unshift(e)
}
function addOnPostRun(e) {
	__ATPOSTRUN__.unshift(e)
}
__ATINIT__.push({
	func: function () {
		___wasm_call_ctors()
	}
});
var runDependencies = 0
	, runDependencyWatcher = null
	, dependenciesFulfilled = null;
function getUniqueRunDependency(e) {
	return e
}
function addRunDependency(e) {
	runDependencies++,
		Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies)
}
function removeRunDependency(e) {
	if (runDependencies--,
		Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies),
		0 == runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher),
			runDependencyWatcher = null),
			dependenciesFulfilled)) {
		var r = dependenciesFulfilled;
		dependenciesFulfilled = null,
			r()
	}
}
function abort(e) {
	throw Module.onAbort && Module.onAbort(e),
	err(e += ""),
	ABORT = !0,
	EXITSTATUS = 1,
	e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.",
	new WebAssembly.RuntimeError(e)
}
function hasPrefix(e, r) {
	return String.prototype.startsWith ? e.startsWith(r) : 0 === e.indexOf(r)
}
Module.preloadedImages = {},
	Module.preloadedAudios = {};
var dataURIPrefix = "data:application/octet-stream;base64,";
function isDataURI(e) {
	return hasPrefix(e, dataURIPrefix)
}
var fileURIPrefix = "file://";
function isFileURI(e) {
	return hasPrefix(e, fileURIPrefix)
}
var tempDouble, tempI64, wasmBinaryFile = "simlib.wasm";
function getBinary(e) {
	try {
		if (e == wasmBinaryFile && wasmBinary)
			return new Uint8Array(wasmBinary);
		if (readBinary)
			return readBinary(e);
		throw "both async and sync fetching of the wasm failed"
	} catch (e) {
		abort(e)
	}
}
function getBinaryPromise() {
	if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
		if ("function" == typeof fetch && !isFileURI(wasmBinaryFile))
			return fetch(wasmBinaryFile, {
				credentials: "same-origin"
			}).then((function (e) {
				if (!e.ok)
					throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
				return e.arrayBuffer()
			}
			)).catch((function () {
				return getBinary(wasmBinaryFile)
			}
			));
		if (readAsync)
			return new Promise((function (e, r) {
				readAsync(wasmBinaryFile, (function (r) {
					e(new Uint8Array(r))
				}
				), r)
			}
			))
	}
	return Promise.resolve().then((function () {
		return getBinary(wasmBinaryFile)
	}
	))
}
function createWasm() {
	var e, r = {
		a: asmLibraryArg
	};
	function t(e, r) {
		var t = e.exports;
		Module.asm = t,
			updateGlobalBufferAndViews((wasmMemory = Module.asm.H).buffer),
			wasmTable = Module.asm.ma,
			removeRunDependency("wasm-instantiate")
	}
	if (addRunDependency("wasm-instantiate"),
		Module.instantiateWasm)
		try {
			return Module.instantiateWasm(r, t)
		} catch (e) {
			return err("Module.instantiateWasm callback failed with error: " + e),
				!1
		}
	return wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || isDataURI(wasmBinaryFile) || isFileURI(wasmBinaryFile),
		e = function (e) {
			Module.debug1 = WebAssembly.Module.customSections(e.module, "debug1"),
				Module.debug2 = WebAssembly.Module.customSections(e.module, "debug2"),
				Module.debug3 = WebAssembly.Module.customSections(e.module, "debug3"),
				t(e.instance)
		}
		,
		getBinaryPromise().then((function (e) {
			return e = ENVIRONMENT_IS_NODE || e instanceof Uint8Array ? e.slice(1).map((e => ~e)) : new Uint8Array(e, 1).map((e => ~e)),
				Module.binary = e,
				WebAssembly.instantiate(e, r)
		}
		)).then(e, (function (e) {
			err("failed to asynchronously prepare wasm: " + e),
				abort(e)
		}
		)),
		{}
}
function callRuntimeCallbacks(e) {
	for (; e.length > 0;) {
		var r = e.shift();
		if ("function" != typeof r) {
			var t = r.func;
			"number" == typeof t ? void 0 === r.arg ? wasmTable.get(t)() : wasmTable.get(t)(r.arg) : t(void 0 === r.arg ? null : r.arg)
		} else
			r(Module)
	}
}
function ___assert_fail(e, r, t, n) {
	abort("Assertion failed: " + UTF8ToString(e) + ", at: " + [r ? UTF8ToString(r) : "unknown filename", t, n ? UTF8ToString(n) : "unknown function"])
}
function getShiftFromSize(e) {
	switch (e) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 4:
			return 2;
		case 8:
			return 3;
		default:
			throw new TypeError("Unknown type size: " + e)
	}
}
function embind_init_charCodes() {
	for (var e = new Array(256), r = 0; r < 256; ++r)
		e[r] = String.fromCharCode(r);
	embind_charCodes = e
}
isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile));
var embind_charCodes = void 0;
function readLatin1String(e) {
	for (var r = "", t = e; HEAPU8[t];)
		r += embind_charCodes[HEAPU8[t++]];
	return r
}
var awaitingDependencies = {}
	, registeredTypes = {}
	, typeDependencies = {}
	, char_0 = 48
	, char_9 = 57;
function makeLegalFunctionName(e) {
	if (void 0 === e)
		return "_unknown";
	var r = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
	return r >= char_0 && r <= char_9 ? "_" + e : e
}
function createNamedFunction(e, r) {
	return e = makeLegalFunctionName(e),
		new Function("body", "return function " + e + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(r)
}
function extendError(e, r) {
	var t = createNamedFunction(r, (function (e) {
		this.name = r,
			this.message = e;
		var t = new Error(e).stack;
		void 0 !== t && (this.stack = this.toString() + "\n" + t.replace(/^Error(:[^\n]*)?\n/, ""))
	}
	));
	return t.prototype = Object.create(e.prototype),
		t.prototype.constructor = t,
		t.prototype.toString = function () {
			return void 0 === this.message ? this.name : this.name + ": " + this.message
		}
		,
		t
}
var BindingError = void 0;
function throwBindingError(e) {
	throw new BindingError(e)
}
var InternalError = void 0;
function throwInternalError(e) {
	throw new InternalError(e)
}
function whenDependentTypesAreResolved(e, r, t) {
	function n(r) {
		var n = t(r);
		n.length !== e.length && throwInternalError("Mismatched type converter count");
		for (var o = 0; o < e.length; ++o)
			registerType(e[o], n[o])
	}
	e.forEach((function (e) {
		typeDependencies[e] = r
	}
	));
	var o = new Array(r.length)
		, a = []
		, i = 0;
	r.forEach((function (e, r) {
		registeredTypes.hasOwnProperty(e) ? o[r] = registeredTypes[e] : (a.push(e),
			awaitingDependencies.hasOwnProperty(e) || (awaitingDependencies[e] = []),
			awaitingDependencies[e].push((function () {
				o[r] = registeredTypes[e],
					++i === a.length && n(o)
			}
			)))
	}
	)),
		0 === a.length && n(o)
}
function registerType(e, r, t) {
	if (t = t || {},
		!("argPackAdvance" in r))
		throw new TypeError("registerType registeredInstance requires argPackAdvance");
	var n = r.name;
	if (e || throwBindingError('type "' + n + '" must have a positive integer typeid pointer'),
		registeredTypes.hasOwnProperty(e)) {
		if (t.ignoreDuplicateRegistrations)
			return;
		throwBindingError("Cannot register type '" + n + "' twice")
	}
	if (registeredTypes[e] = r,
		delete typeDependencies[e],
		awaitingDependencies.hasOwnProperty(e)) {
		var o = awaitingDependencies[e];
		delete awaitingDependencies[e],
			o.forEach((function (e) {
				e()
			}
			))
	}
}
function __embind_register_bool(e, r, t, n, o) {
	var a = getShiftFromSize(t);
	registerType(e, {
		name: r = readLatin1String(r),
		fromWireType: function (e) {
			return !!e
		},
		toWireType: function (e, r) {
			return r ? n : o
		},
		argPackAdvance: 8,
		readValueFromPointer: function (e) {
			var n;
			if (1 === t)
				n = HEAP8;
			else if (2 === t)
				n = HEAP16;
			else {
				if (4 !== t)
					throw new TypeError("Unknown boolean type size: " + r);
				n = HEAP32
			}
			return this.fromWireType(n[e >> a])
		},
		destructorFunction: null
	})
}
var emval_free_list = []
	, emval_handle_array = [{}, {
		value: void 0
	}, {
		value: null
	}, {
		value: !0
	}, {
		value: !1
	}];
function __emval_decref(e) {
	e > 4 && 0 == --emval_handle_array[e].refcount && (emval_handle_array[e] = void 0,
		emval_free_list.push(e))
}
function count_emval_handles() {
	for (var e = 0, r = 5; r < emval_handle_array.length; ++r)
		void 0 !== emval_handle_array[r] && ++e;
	return e
}
function get_first_emval() {
	for (var e = 5; e < emval_handle_array.length; ++e)
		if (void 0 !== emval_handle_array[e])
			return emval_handle_array[e];
	return null
}
function init_emval() {
	Module.count_emval_handles = count_emval_handles,
		Module.get_first_emval = get_first_emval
}
function __emval_register(e) {
	switch (e) {
		case void 0:
			return 1;
		case null:
			return 2;
		case !0:
			return 3;
		case !1:
			return 4;
		default:
			var r = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
			return emval_handle_array[r] = {
				refcount: 1,
				value: e
			},
				r
	}
}
function simpleReadValueFromPointer(e) {
	return this.fromWireType(HEAPU32[e >> 2])
}
function __embind_register_emval(e, r) {
	registerType(e, {
		name: r = readLatin1String(r),
		fromWireType: function (e) {
			var r = emval_handle_array[e].value;
			return __emval_decref(e),
				r
		},
		toWireType: function (e, r) {
			return __emval_register(r)
		},
		argPackAdvance: 8,
		readValueFromPointer: simpleReadValueFromPointer,
		destructorFunction: null
	})
}
function _embind_repr(e) {
	if (null === e)
		return "null";
	var r = typeof e;
	return "object" === r || "array" === r || "function" === r ? e.toString() : "" + e
}
function floatReadValueFromPointer(e, r) {
	switch (r) {
		case 2:
			return function (e) {
				return this.fromWireType(HEAPF32[e >> 2])
			}
				;
		case 3:
			return function (e) {
				return this.fromWireType(HEAPF64[e >> 3])
			}
				;
		default:
			throw new TypeError("Unknown float type: " + e)
	}
}
function __embind_register_float(e, r, t) {
	var n = getShiftFromSize(t);
	registerType(e, {
		name: r = readLatin1String(r),
		fromWireType: function (e) {
			return e
		},
		toWireType: function (e, r) {
			if ("number" != typeof r && "boolean" != typeof r)
				throw new TypeError('Cannot convert "' + _embind_repr(r) + '" to ' + this.name);
			return r
		},
		argPackAdvance: 8,
		readValueFromPointer: floatReadValueFromPointer(r, n),
		destructorFunction: null
	})
}
function new_(e, r) {
	if (!(e instanceof Function))
		throw new TypeError("new_ called with constructor type " + typeof e + " which is not a function");
	var t = createNamedFunction(e.name || "unknownFunctionName", (function () { }
	));
	t.prototype = e.prototype;
	var n = new t
		, o = e.apply(n, r);
	return o instanceof Object ? o : n
}
function runDestructors(e) {
	for (; e.length;) {
		var r = e.pop();
		e.pop()(r)
	}
}
function craftInvokerFunction(e, r, t, n, o) {
	var a = r.length;
	a < 2 && throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
	for (var i = null !== r[1] && null !== t, u = !1, s = 1; s < r.length; ++s)
		if (null !== r[s] && void 0 === r[s].destructorFunction) {
			u = !0;
			break
		}
	var l = "void" !== r[0].name
		, c = ""
		, d = "";
	for (s = 0; s < a - 2; ++s)
		c += (0 !== s ? ", " : "") + "arg" + s,
			d += (0 !== s ? ", " : "") + "arg" + s + "Wired";
	var f = "return function " + makeLegalFunctionName(e) + "(" + c + ") {\nif (arguments.length !== " + (a - 2) + ") {\nthrowBindingError('function " + e + " called with ' + arguments.length + ' arguments, expected " + (a - 2) + " args!');\n}\n";
	u && (f += "var destructors = [];\n");
	var m = u ? "destructors" : "null"
		, _ = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"]
		, p = [throwBindingError, n, o, runDestructors, r[0], r[1]];
	for (i && (f += "var thisWired = classParam.toWireType(" + m + ", this);\n"),
		s = 0; s < a - 2; ++s)
		f += "var arg" + s + "Wired = argType" + s + ".toWireType(" + m + ", arg" + s + "); // " + r[s + 2].name + "\n",
			_.push("argType" + s),
			p.push(r[s + 2]);
	if (i && (d = "thisWired" + (d.length > 0 ? ", " : "") + d),
		f += (l ? "var rv = " : "") + "invoker(fn" + (d.length > 0 ? ", " : "") + d + ");\n",
		u)
		f += "runDestructors(destructors);\n";
	else
		for (s = i ? 1 : 2; s < r.length; ++s) {
			var S = 1 === s ? "thisWired" : "arg" + (s - 2) + "Wired";
			null !== r[s].destructorFunction && (f += S + "_dtor(" + S + "); // " + r[s].name + "\n",
				_.push(S + "_dtor"),
				p.push(r[s].destructorFunction))
		}
	return l && (f += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
		f += "}\n",
		_.push(f),
		new_(Function, _).apply(null, p)
}
function ensureOverloadTable(e, r, t) {
	if (void 0 === e[r].overloadTable) {
		var n = e[r];
		e[r] = function () {
			return e[r].overloadTable.hasOwnProperty(arguments.length) || throwBindingError("Function '" + t + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + e[r].overloadTable + ")!"),
				e[r].overloadTable[arguments.length].apply(this, arguments)
		}
			,
			e[r].overloadTable = [],
			e[r].overloadTable[n.argCount] = n
	}
}
function exposePublicSymbol(e, r, t) {
	Module.hasOwnProperty(e) ? ((void 0 === t || void 0 !== Module[e].overloadTable && void 0 !== Module[e].overloadTable[t]) && throwBindingError("Cannot register public name '" + e + "' twice"),
		ensureOverloadTable(Module, e, e),
		Module.hasOwnProperty(t) && throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + t + ")!"),
		Module[e].overloadTable[t] = r) : (Module[e] = r,
			void 0 !== t && (Module[e].numArguments = t))
}
function heap32VectorToArray(e, r) {
	for (var t = [], n = 0; n < e; n++)
		t.push(HEAP32[(r >> 2) + n]);
	return t
}
function replacePublicSymbol(e, r, t) {
	Module.hasOwnProperty(e) || throwInternalError("Replacing nonexistant public symbol"),
		void 0 !== Module[e].overloadTable && void 0 !== t ? Module[e].overloadTable[t] = r : (Module[e] = r,
			Module[e].argCount = t)
}
function dynCallLegacy(e, r, t) {
	var n = Module["dynCall_" + e];
	return t && t.length ? n.apply(null, [r].concat(t)) : n.call(null, r)
}
function dynCall(e, r, t) {
	return -1 != e.indexOf("j") ? dynCallLegacy(e, r, t) : wasmTable.get(r).apply(null, t)
}
function getDynCaller(e, r) {
	var t = [];
	return function () {
		t.length = arguments.length;
		for (var n = 0; n < arguments.length; n++)
			t[n] = arguments[n];
		return dynCall(e, r, t)
	}
}
function embind__requireFunction(e, r) {
	var t = -1 != (e = readLatin1String(e)).indexOf("j") ? getDynCaller(e, r) : wasmTable.get(r);
	return "function" != typeof t && throwBindingError("unknown function pointer with signature " + e + ": " + r),
		t
}
var UnboundTypeError = void 0;
function getTypeName(e) {
	var r = ___getTypeName(e)
		, t = readLatin1String(r);
	return _free(r),
		t
}
function throwUnboundTypeError(e, r) {
	var t = []
		, n = {};
	throw r.forEach((function e(r) {
		n[r] || registeredTypes[r] || (typeDependencies[r] ? typeDependencies[r].forEach(e) : (t.push(r),
			n[r] = !0))
	}
	)),
	new UnboundTypeError(e + ": " + t.map(getTypeName).join([", "]))
}
function __embind_register_function(e, r, t, n, o, a) {
	var i = heap32VectorToArray(r, t);
	e = readLatin1String(e),
		o = embind__requireFunction(n, o),
		exposePublicSymbol(e, (function () {
			throwUnboundTypeError("Cannot call " + e + " due to unbound types", i)
		}
		), r - 1),
		whenDependentTypesAreResolved([], i, (function (t) {
			var n = [t[0], null].concat(t.slice(1));
			return replacePublicSymbol(e, craftInvokerFunction(e, n, null, o, a), r - 1),
				[]
		}
		))
}
function integerReadValueFromPointer(e, r, t) {
	switch (r) {
		case 0:
			return t ? function (e) {
				return HEAP8[e]
			}
				: function (e) {
					return HEAPU8[e]
				}
				;
		case 1:
			return t ? function (e) {
				return HEAP16[e >> 1]
			}
				: function (e) {
					return HEAPU16[e >> 1]
				}
				;
		case 2:
			return t ? function (e) {
				return HEAP32[e >> 2]
			}
				: function (e) {
					return HEAPU32[e >> 2]
				}
				;
		default:
			throw new TypeError("Unknown integer type: " + e)
	}
}
function __embind_register_integer(e, r, t, n, o) {
	r = readLatin1String(r),
		-1 === o && (o = 4294967295);
	var a = getShiftFromSize(t)
		, i = function (e) {
			return e
		};
	if (0 === n) {
		var u = 32 - 8 * t;
		i = function (e) {
			return e << u >>> u
		}
	}
	var s = -1 != r.indexOf("unsigned");
	registerType(e, {
		name: r,
		fromWireType: i,
		toWireType: function (e, t) {
			if ("number" != typeof t && "boolean" != typeof t)
				throw new TypeError('Cannot convert "' + _embind_repr(t) + '" to ' + this.name);
			if (t < n || t > o)
				throw new TypeError('Passing a number "' + _embind_repr(t) + '" from JS side to C/C++ side to an argument of type "' + r + '", which is outside the valid range [' + n + ", " + o + "]!");
			return s ? t >>> 0 : 0 | t
		},
		argPackAdvance: 8,
		readValueFromPointer: integerReadValueFromPointer(r, a, 0 !== n),
		destructorFunction: null
	})
}
function __embind_register_memory_view(e, r, t) {
	var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][r];
	function o(e) {
		var r = HEAPU32
			, t = r[e >>= 2]
			, o = r[e + 1];
		return new n(buffer, o, t)
	}
	registerType(e, {
		name: t = readLatin1String(t),
		fromWireType: o,
		argPackAdvance: 8,
		readValueFromPointer: o
	}, {
		ignoreDuplicateRegistrations: !0
	})
}
function __embind_register_std_string(e, r) {
	var t = "std::string" === (r = readLatin1String(r));
	registerType(e, {
		name: r,
		fromWireType: function (e) {
			var r, n = HEAPU32[e >> 2];
			if (t)
				for (var o = e + 4, a = 0; a <= n; ++a) {
					var i = e + 4 + a;
					if (a == n || 0 == HEAPU8[i]) {
						var u = UTF8ToString(o, i - o);
						void 0 === r ? r = u : (r += String.fromCharCode(0),
							r += u),
							o = i + 1
					}
				}
			else {
				var s = new Array(n);
				for (a = 0; a < n; ++a)
					s[a] = String.fromCharCode(HEAPU8[e + 4 + a]);
				r = s.join("")
			}
			return _free(e),
				r
		},
		toWireType: function (e, r) {
			r instanceof ArrayBuffer && (r = new Uint8Array(r));
			var n = "string" == typeof r;
			n || r instanceof Uint8Array || r instanceof Uint8ClampedArray || r instanceof Int8Array || throwBindingError("Cannot pass non-string to std::string");
			var o = (t && n ? function () {
				return lengthBytesUTF8(r)
			}
				: function () {
					return r.length
				}
			)()
				, a = _malloc(4 + o + 1);
			if (HEAPU32[a >> 2] = o,
				t && n)
				stringToUTF8(r, a + 4, o + 1);
			else if (n)
				for (var i = 0; i < o; ++i) {
					var u = r.charCodeAt(i);
					u > 255 && (_free(a),
						throwBindingError("String has UTF-16 code units that do not fit in 8 bits")),
						HEAPU8[a + 4 + i] = u
				}
			else
				for (i = 0; i < o; ++i)
					HEAPU8[a + 4 + i] = r[i];
			return null !== e && e.push(_free, a),
				a
		},
		argPackAdvance: 8,
		readValueFromPointer: simpleReadValueFromPointer,
		destructorFunction: function (e) {
			_free(e)
		}
	})
}
function __embind_register_std_wstring(e, r, t) {
	var n, o, a, i, u;
	t = readLatin1String(t),
		2 === r ? (n = UTF16ToString,
			o = stringToUTF16,
			i = lengthBytesUTF16,
			a = function () {
				return HEAPU16
			}
			,
			u = 1) : 4 === r && (n = UTF32ToString,
				o = stringToUTF32,
				i = lengthBytesUTF32,
				a = function () {
					return HEAPU32
				}
				,
				u = 2),
		registerType(e, {
			name: t,
			fromWireType: function (e) {
				for (var t, o = HEAPU32[e >> 2], i = a(), s = e + 4, l = 0; l <= o; ++l) {
					var c = e + 4 + l * r;
					if (l == o || 0 == i[c >> u]) {
						var d = n(s, c - s);
						void 0 === t ? t = d : (t += String.fromCharCode(0),
							t += d),
							s = c + r
					}
				}
				return _free(e),
					t
			},
			toWireType: function (e, n) {
				"string" != typeof n && throwBindingError("Cannot pass non-string to C++ string type " + t);
				var a = i(n)
					, s = _malloc(4 + a + r);
				return HEAPU32[s >> 2] = a >> u,
					o(n, s + 4, a + r),
					null !== e && e.push(_free, s),
					s
			},
			argPackAdvance: 8,
			readValueFromPointer: simpleReadValueFromPointer,
			destructorFunction: function (e) {
				_free(e)
			}
		})
}
function __embind_register_void(e, r) {
	registerType(e, {
		isVoid: !0,
		name: r = readLatin1String(r),
		argPackAdvance: 0,
		fromWireType: function () { },
		toWireType: function (e, r) { }
	})
}
function __emscripten_fetch_free(e) {
	delete Fetch.xhrs[e - 1]
}
function requireHandle(e) {
	return e || throwBindingError("Cannot use deleted val. handle = " + e),
		emval_handle_array[e].value
}
function requireRegisteredType(e, r) {
	var t = registeredTypes[e];
	return void 0 === t && throwBindingError(r + " has unknown type " + getTypeName(e)),
		t
}
function __emval_as(e, r, t) {
	e = requireHandle(e),
		r = requireRegisteredType(r, "emval::as");
	var n = []
		, o = __emval_register(n);
	return HEAP32[t >> 2] = o,
		r.toWireType(n, e)
}
var emval_symbols = {};
function getStringOrSymbol(e) {
	var r = emval_symbols[e];
	return void 0 === r ? readLatin1String(e) : r
}
function emval_get_global() {
	return "object" == typeof globalThis ? globalThis : Function("return this")()
}
function __emval_get_global(e) {
	return 0 === e ? __emval_register(emval_get_global()) : (e = getStringOrSymbol(e),
		__emval_register(emval_get_global()[e]))
}
function __emval_get_module_property(e) {
	return e = getStringOrSymbol(e),
		__emval_register(Module[e])
}
function __emval_get_property(e, r) {
	return __emval_register((e = requireHandle(e))[r = requireHandle(r)])
}
function __emval_instanceof(e, r) {
	return (e = requireHandle(e)) instanceof requireHandle(r)
}
function __emval_new_cstring(e) {
	return __emval_register(getStringOrSymbol(e))
}
function __emval_run_destructors(e) {
	runDestructors(emval_handle_array[e].value),
		__emval_decref(e)
}
function __emval_take_value(e, r) {
	return __emval_register((e = requireRegisteredType(e, "_emval_take_value")).readValueFromPointer(r))
}
function _abort() {
	abort()
}
function _emscripten_is_main_browser_thread() {
	return !ENVIRONMENT_IS_WORKER
}
function _emscripten_memcpy_big(e, r, t) {
	HEAPU8.copyWithin(e, r, r + t)
}
function _emscripten_get_heap_size() {
	return HEAPU8.length
}
function emscripten_realloc_buffer(e) {
	try {
		return wasmMemory.grow(e - buffer.byteLength + 65535 >>> 16),
			updateGlobalBufferAndViews(wasmMemory.buffer),
			1
	} catch (e) { }
}
function _emscripten_resize_heap(e) {
	var r = _emscripten_get_heap_size()
		, t = 2147483648;
	if (e > t)
		return !1;
	for (var n = 1; n <= 4; n *= 2) {
		var o = r * (1 + .2 / n);
		if (o = Math.min(o, e + 100663296),
			emscripten_realloc_buffer(Math.min(t, alignUp(Math.max(e, o), 65536))))
			return !0
	}
	return !1
}
Module._emscripten_is_main_browser_thread = _emscripten_is_main_browser_thread;
var Fetch = {
	xhrs: [],
	setu64: function (e, r) {
		HEAPU32[e >> 2] = r,
			HEAPU32[e + 4 >> 2] = r / 4294967296 | 0
	},
	openDatabase: function (e, r, t, n) {
		try {
			var o = indexedDB.open(e, r)
		} catch (e) {
			return n(e)
		}
		o.onupgradeneeded = function (e) {
			var r = e.target.result;
			r.objectStoreNames.contains("FILES") && r.deleteObjectStore("FILES"),
				r.createObjectStore("FILES")
		}
			,
			o.onsuccess = function (e) {
				t(e.target.result)
			}
			,
			o.onerror = function (e) {
				n(e)
			}
	},
	staticInit: function () {
		Fetch.openDatabase("emscripten_filesystem", 1, (function (e) {
			Fetch.dbInstance = e,
				removeRunDependency("library_fetch_init")
		}
		), (function () {
			Fetch.dbInstance = !1,
				removeRunDependency("library_fetch_init")
		}
		)),
			"undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER && ENVIRONMENT_IS_FETCH_WORKER || addRunDependency("library_fetch_init")
	}
};
function fetchXHR(e, r, t, n, o) {
	var a = HEAPU32[e + 8 >> 2];
	if (a) {
		var i = UTF8ToString(a)
			, u = e + 112
			, s = UTF8ToString(u);
		s || (s = "GET"),
			HEAPU32[e + 4 >> 2];
		var l = HEAPU32[u + 52 >> 2]
			, c = HEAPU32[u + 56 >> 2]
			, d = !!HEAPU32[u + 60 >> 2]
			, f = (HEAPU32[u + 64 >> 2],
				HEAPU32[u + 68 >> 2])
			, m = HEAPU32[u + 72 >> 2]
			, _ = HEAPU32[u + 76 >> 2]
			, p = HEAPU32[u + 80 >> 2]
			, S = HEAPU32[u + 84 >> 2]
			, h = HEAPU32[u + 88 >> 2]
			, g = !!(1 & l)
			, y = !!(2 & l)
			, F = !!(64 & l)
			, E = f ? UTF8ToString(f) : void 0
			, v = m ? UTF8ToString(m) : void 0
			, w = p ? UTF8ToString(p) : void 0
			, M = new XMLHttpRequest;
		if (M.withCredentials = d,
			M.open(s, i, !F, E, v),
			F || (M.timeout = c),
			M.url_ = i,
			M.responseType = "arraybuffer",
			p && M.overrideMimeType(w),
			_)
			for (; ;) {
				var A = HEAPU32[_ >> 2];
				if (!A)
					break;
				var T = HEAPU32[_ + 4 >> 2];
				if (!T)
					break;
				_ += 8;
				var b = UTF8ToString(A)
					, P = UTF8ToString(T);
				M.setRequestHeader(b, P)
			}
		Fetch.xhrs.push(M);
		var D = Fetch.xhrs.length;
		HEAPU32[e + 0 >> 2] = D;
	} else
		t(e, 0, "no url specified!");
	function H(r) {
		var t = 0
			, n = 0;
		r && (n = M.response ? M.response.byteLength : 0,
			t = _malloc(n),
			HEAPU8.set(new Uint8Array(M.response), t)),
			HEAPU32[e + 12 >> 2] = t,
			Fetch.setu64(e + 16, n)
	}
}
function fetchCacheData(e, r, t, n, o) {
	if (e) {
		var a = HEAPU32[r + 112 + 64 >> 2];
		a || (a = HEAPU32[r + 8 >> 2]);
		var i = UTF8ToString(a);
		try {
			var u = e.transaction(["FILES"], "readwrite").objectStore("FILES").put(t, i);
			u.onsuccess = function (e) {
				HEAPU16[r + 40 >> 1] = 4,
					HEAPU16[r + 42 >> 1] = 200,
					stringToUTF8("OK", r + 44, 64),
					n(r, 0, i)
			}
				,
				u.onerror = function (e) {
					HEAPU16[r + 40 >> 1] = 4,
						HEAPU16[r + 42 >> 1] = 413,
						stringToUTF8("Payload Too Large", r + 44, 64),
						o(r, 0, e)
				}
		} catch (e) {
			o(r, 0, e)
		}
	} else
		o(r, 0, "IndexedDB not available!")
}
function fetchLoadCachedData(e, r, t, n) {
	if (e) {
		var o = HEAPU32[r + 112 + 64 >> 2];
		o || (o = HEAPU32[r + 8 >> 2]);
		var a = UTF8ToString(o);
		try {
			var i = e.transaction(["FILES"], "readonly").objectStore("FILES").get(a);
			i.onsuccess = function (e) {
				if (e.target.result) {
					var o = e.target.result
						, a = o.byteLength || o.length
						, i = _malloc(a);
					HEAPU8.set(new Uint8Array(o), i),
						HEAPU32[r + 12 >> 2] = i,
						Fetch.setu64(r + 16, a),
						Fetch.setu64(r + 24, 0),
						Fetch.setu64(r + 32, a),
						HEAPU16[r + 40 >> 1] = 4,
						HEAPU16[r + 42 >> 1] = 200,
						stringToUTF8("OK", r + 44, 64),
						t(r, 0, o)
				} else
					HEAPU16[r + 40 >> 1] = 4,
						HEAPU16[r + 42 >> 1] = 404,
						stringToUTF8("Not Found", r + 44, 64),
						n(r, 0, "no data")
			}
				,
				i.onerror = function (e) {
					HEAPU16[r + 40 >> 1] = 4,
						HEAPU16[r + 42 >> 1] = 404,
						stringToUTF8("Not Found", r + 44, 64),
						n(r, 0, e)
				}
		} catch (e) {
			n(r, 0, e)
		}
	} else
		n(r, 0, "IndexedDB not available!")
}
function fetchDeleteCachedData(e, r, t, n) {
	if (e) {
		var o = HEAPU32[r + 112 + 64 >> 2];
		o || (o = HEAPU32[r + 8 >> 2]);
		var a = UTF8ToString(o);
		try {
			var i = e.transaction(["FILES"], "readwrite").objectStore("FILES").delete(a);
			i.onsuccess = function (e) {
				var n = e.target.result;
				HEAPU32[r + 12 >> 2] = 0,
					Fetch.setu64(r + 16, 0),
					Fetch.setu64(r + 24, 0),
					Fetch.setu64(r + 32, 0),
					HEAPU16[r + 40 >> 1] = 4,
					HEAPU16[r + 42 >> 1] = 200,
					stringToUTF8("OK", r + 44, 64),
					t(r, 0, n)
			}
				,
				i.onerror = function (e) {
					HEAPU16[r + 40 >> 1] = 4,
						HEAPU16[r + 42 >> 1] = 404,
						stringToUTF8("Not Found", r + 44, 64),
						n(r, 0, e)
				}
		} catch (e) {
			n(r, 0, e)
		}
	} else
		n(r, 0, "IndexedDB not available!")
}
function _emscripten_start_fetch(e, r, t, n, o) {
	noExitRuntime = !0;
	var a = e + 112
		, i = UTF8ToString(a)
		, u = HEAPU32[a + 36 >> 2]
		, s = HEAPU32[a + 40 >> 2]
		, l = HEAPU32[a + 44 >> 2]
		, c = HEAPU32[a + 48 >> 2]
		, d = HEAPU32[a + 52 >> 2]
		, f = !!(4 & d)
		, m = !!(32 & d)
		, _ = !!(16 & d)
		, p = function (e, t, n) {
			u ? wasmTable.get(u)(e) : r && r(e)
		}
		, S = function (e, r, t) {
			l ? wasmTable.get(l)(e) : n && n(e)
		}
		, h = function (e, r, n) {
			s ? wasmTable.get(s)(e) : t && t(e)
		}
		, g = function (e, r, t) {
			c ? wasmTable.get(c)(e) : o && o(e)
		}
		, y = function (e, t, n) {
			fetchCacheData(Fetch.dbInstance, e, t.response, (function (e, t, n) {
				u ? wasmTable.get(u)(e) : r && r(e)
			}
			), (function (e, t, n) {
				u ? wasmTable.get(u)(e) : r && r(e)
			}
			))
		};
	if ("EM_IDB_STORE" === i) {
		var F = HEAPU32[a + 84 >> 2];
		fetchCacheData(Fetch.dbInstance, e, HEAPU8.slice(F, F + HEAPU32[a + 88 >> 2]), p, h)
	} else if ("EM_IDB_DELETE" === i)
		fetchDeleteCachedData(Fetch.dbInstance, e, p, h);
	else if (_) {
		if (m)
			return 0;
		fetchXHR(e, f ? y : p, h, S, g)
	} else
		fetchLoadCachedData(Fetch.dbInstance, e, p, m ? h : f ? function (e, r, t) {
			fetchXHR(e, y, h, S, g)
		}
			: function (e, r, t) {
				fetchXHR(e, p, h, S, g)
			}
		);
	return e
}
var ENV = {};
function getExecutableName() {
	return thisProgram || "./this.program"
}
function getEnvStrings() {
	if (!getEnvStrings.strings) {
		var e = {
			USER: "web_user",
			LOGNAME: "web_user",
			PATH: "/",
			PWD: "/",
			HOME: "/home/web_user",
			LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
			_: getExecutableName()
		};
		for (var r in ENV)
			e[r] = ENV[r];
		var t = [];
		for (var r in e)
			t.push(r + "=" + e[r]);
		getEnvStrings.strings = t
	}
	return getEnvStrings.strings
}
var PATH = {
	splitPath: function (e) {
		return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1)
	},
	normalizeArray: function (e, r) {
		for (var t = 0, n = e.length - 1; n >= 0; n--) {
			var o = e[n];
			"." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1),
				t++) : t && (e.splice(n, 1),
					t--)
		}
		if (r)
			for (; t; t--)
				e.unshift("..");
		return e
	},
	normalize: function (e) {
		var r = "/" === e.charAt(0)
			, t = "/" === e.substr(-1);
		return (e = PATH.normalizeArray(e.split("/").filter((function (e) {
			return !!e
		}
		)), !r).join("/")) || r || (e = "."),
			e && t && (e += "/"),
			(r ? "/" : "") + e
	},
	dirname: function (e) {
		var r = PATH.splitPath(e)
			, t = r[0]
			, n = r[1];
		return t || n ? (n && (n = n.substr(0, n.length - 1)),
			t + n) : "."
	},
	basename: function (e) {
		if ("/" === e)
			return "/";
		var r = (e = (e = PATH.normalize(e)).replace(/\/$/, "")).lastIndexOf("/");
		return -1 === r ? e : e.substr(r + 1)
	},
	extname: function (e) {
		return PATH.splitPath(e)[3]
	},
	join: function () {
		var e = Array.prototype.slice.call(arguments, 0);
		return PATH.normalize(e.join("/"))
	},
	join2: function (e, r) {
		return PATH.normalize(e + "/" + r)
	}
};
function getRandomDevice() {
	if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
		var e = new Uint8Array(1);
		return function () {
			return crypto.getRandomValues(e),
				e[0]
		}
	}
	if (ENVIRONMENT_IS_NODE)
		try {
			var r = require("crypto");
			return function () {
				return r.randomBytes(1)[0]
			}
		} catch (e) { }
	return function () {
		abort("randomDevice")
	}
}
var PATH_FS = {
	resolve: function () {
		for (var e = "", r = !1, t = arguments.length - 1; t >= -1 && !r; t--) {
			var n = t >= 0 ? arguments[t] : FS.cwd();
			if ("string" != typeof n)
				throw new TypeError("Arguments to path.resolve must be strings");
			if (!n)
				return "";
			e = n + "/" + e,
				r = "/" === n.charAt(0)
		}
		return (r ? "/" : "") + (e = PATH.normalizeArray(e.split("/").filter((function (e) {
			return !!e
		}
		)), !r).join("/")) || "."
	},
	relative: function (e, r) {
		function t(e) {
			for (var r = 0; r < e.length && "" === e[r]; r++)
				;
			for (var t = e.length - 1; t >= 0 && "" === e[t]; t--)
				;
			return r > t ? [] : e.slice(r, t - r + 1)
		}
		e = PATH_FS.resolve(e).substr(1),
			r = PATH_FS.resolve(r).substr(1);
		for (var n = t(e.split("/")), o = t(r.split("/")), a = Math.min(n.length, o.length), i = a, u = 0; u < a; u++)
			if (n[u] !== o[u]) {
				i = u;
				break
			}
		var s = [];
		for (u = i; u < n.length; u++)
			s.push("..");
		return (s = s.concat(o.slice(i))).join("/")
	}
}
	, TTY = {
		ttys: [],
		init: function () { },
		shutdown: function () { },
		register: function (e, r) {
			TTY.ttys[e] = {
				input: [],
				output: [],
				ops: r
			},
				FS.registerDevice(e, TTY.stream_ops)
		},
		stream_ops: {
			open: function (e) {
				var r = TTY.ttys[e.node.rdev];
				if (!r)
					throw new FS.ErrnoError(43);
				e.tty = r,
					e.seekable = !1
			},
			close: function (e) {
				e.tty.ops.flush(e.tty)
			},
			flush: function (e) {
				e.tty.ops.flush(e.tty)
			},
			read: function (e, r, t, n, o) {
				if (!e.tty || !e.tty.ops.get_char)
					throw new FS.ErrnoError(60);
				for (var a = 0, i = 0; i < n; i++) {
					var u;
					try {
						u = e.tty.ops.get_char(e.tty)
					} catch (e) {
						throw new FS.ErrnoError(29)
					}
					if (void 0 === u && 0 === a)
						throw new FS.ErrnoError(6);
					if (null == u)
						break;
					a++,
						r[t + i] = u
				}
				return a && (e.node.timestamp = Date.now()),
					a
			},
			write: function (e, r, t, n, o) {
				if (!e.tty || !e.tty.ops.put_char)
					throw new FS.ErrnoError(60);
				try {
					for (var a = 0; a < n; a++)
						e.tty.ops.put_char(e.tty, r[t + a])
				} catch (e) {
					throw new FS.ErrnoError(29)
				}
				return n && (e.node.timestamp = Date.now()),
					a
			}
		},
		default_tty_ops: {
			get_char: function (e) {
				if (!e.input.length) {
					var r = null;
					if (ENVIRONMENT_IS_NODE) {
						var t = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256)
							, n = 0;
						try {
							n = nodeFS.readSync(process.stdin.fd, t, 0, 256, null)
						} catch (e) {
							if (-1 == e.toString().indexOf("EOF"))
								throw e;
							n = 0
						}
						r = n > 0 ? t.slice(0, n).toString("utf-8") : null
					} else
						"undefined" != typeof window && "function" == typeof window.prompt ? null !== (r = window.prompt("Input: ")) && (r += "\n") : "function" == typeof readline && null !== (r = readline()) && (r += "\n");
					if (!r)
						return null;
					e.input = intArrayFromString(r, !0)
				}
				return e.input.shift()
			},
			put_char: function (e, r) {
				null === r || 10 === r ? (out(UTF8ArrayToString(e.output, 0)),
					e.output = []) : 0 != r && e.output.push(r)
			},
			flush: function (e) {
				e.output && e.output.length > 0 && (out(UTF8ArrayToString(e.output, 0)),
					e.output = [])
			}
		},
		default_tty1_ops: {
			put_char: function (e, r) {
				null === r || 10 === r ? (err(UTF8ArrayToString(e.output, 0)),
					e.output = []) : 0 != r && e.output.push(r)
			},
			flush: function (e) {
				e.output && e.output.length > 0 && (err(UTF8ArrayToString(e.output, 0)),
					e.output = [])
			}
		}
	};
function mmapAlloc(e) {
	for (var r = alignMemory(e, 16384), t = _malloc(r); e < r;)
		HEAP8[t + e++] = 0;
	return t
}
var MEMFS = {
	ops_table: null,
	mount: function (e) {
		return MEMFS.createNode(null, "/", 16895, 0)
	},
	createNode: function (e, r, t, n) {
		if (FS.isBlkdev(t) || FS.isFIFO(t))
			throw new FS.ErrnoError(63);
		MEMFS.ops_table || (MEMFS.ops_table = {
			dir: {
				node: {
					getattr: MEMFS.node_ops.getattr,
					setattr: MEMFS.node_ops.setattr,
					lookup: MEMFS.node_ops.lookup,
					mknod: MEMFS.node_ops.mknod,
					rename: MEMFS.node_ops.rename,
					unlink: MEMFS.node_ops.unlink,
					rmdir: MEMFS.node_ops.rmdir,
					readdir: MEMFS.node_ops.readdir,
					symlink: MEMFS.node_ops.symlink
				},
				stream: {
					llseek: MEMFS.stream_ops.llseek
				}
			},
			file: {
				node: {
					getattr: MEMFS.node_ops.getattr,
					setattr: MEMFS.node_ops.setattr
				},
				stream: {
					llseek: MEMFS.stream_ops.llseek,
					read: MEMFS.stream_ops.read,
					write: MEMFS.stream_ops.write,
					allocate: MEMFS.stream_ops.allocate,
					mmap: MEMFS.stream_ops.mmap,
					msync: MEMFS.stream_ops.msync
				}
			},
			link: {
				node: {
					getattr: MEMFS.node_ops.getattr,
					setattr: MEMFS.node_ops.setattr,
					readlink: MEMFS.node_ops.readlink
				},
				stream: {}
			},
			chrdev: {
				node: {
					getattr: MEMFS.node_ops.getattr,
					setattr: MEMFS.node_ops.setattr
				},
				stream: FS.chrdev_stream_ops
			}
		});
		var o = FS.createNode(e, r, t, n);
		return FS.isDir(o.mode) ? (o.node_ops = MEMFS.ops_table.dir.node,
			o.stream_ops = MEMFS.ops_table.dir.stream,
			o.contents = {}) : FS.isFile(o.mode) ? (o.node_ops = MEMFS.ops_table.file.node,
				o.stream_ops = MEMFS.ops_table.file.stream,
				o.usedBytes = 0,
				o.contents = null) : FS.isLink(o.mode) ? (o.node_ops = MEMFS.ops_table.link.node,
					o.stream_ops = MEMFS.ops_table.link.stream) : FS.isChrdev(o.mode) && (o.node_ops = MEMFS.ops_table.chrdev.node,
						o.stream_ops = MEMFS.ops_table.chrdev.stream),
			o.timestamp = Date.now(),
			e && (e.contents[r] = o,
				e.timestamp = o.timestamp),
			o
	},
	getFileDataAsTypedArray: function (e) {
		return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0)
	},
	expandFileStorage: function (e, r) {
		var t = e.contents ? e.contents.length : 0;
		if (!(t >= r)) {
			r = Math.max(r, t * (t < 1048576 ? 2 : 1.125) >>> 0),
				0 != t && (r = Math.max(r, 256));
			var n = e.contents;
			e.contents = new Uint8Array(r),
				e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0)
		}
	},
	resizeFileStorage: function (e, r) {
		if (e.usedBytes != r)
			if (0 == r)
				e.contents = null,
					e.usedBytes = 0;
			else {
				var t = e.contents;
				e.contents = new Uint8Array(r),
					t && e.contents.set(t.subarray(0, Math.min(r, e.usedBytes))),
					e.usedBytes = r
			}
	},
	node_ops: {
		getattr: function (e) {
			var r = {};
			return r.dev = FS.isChrdev(e.mode) ? e.id : 1,
				r.ino = e.id,
				r.mode = e.mode,
				r.nlink = 1,
				r.uid = 0,
				r.gid = 0,
				r.rdev = e.rdev,
				FS.isDir(e.mode) ? r.size = 4096 : FS.isFile(e.mode) ? r.size = e.usedBytes : FS.isLink(e.mode) ? r.size = e.link.length : r.size = 0,
				r.atime = new Date(e.timestamp),
				r.mtime = new Date(e.timestamp),
				r.ctime = new Date(e.timestamp),
				r.blksize = 4096,
				r.blocks = Math.ceil(r.size / r.blksize),
				r
		},
		setattr: function (e, r) {
			void 0 !== r.mode && (e.mode = r.mode),
				void 0 !== r.timestamp && (e.timestamp = r.timestamp),
				void 0 !== r.size && MEMFS.resizeFileStorage(e, r.size)
		},
		lookup: function (e, r) {
			throw FS.genericErrors[44]
		},
		mknod: function (e, r, t, n) {
			return MEMFS.createNode(e, r, t, n)
		},
		rename: function (e, r, t) {
			if (FS.isDir(e.mode)) {
				var n;
				try {
					n = FS.lookupNode(r, t)
				} catch (e) { }
				if (n)
					for (var o in n.contents)
						throw new FS.ErrnoError(55)
			}
			delete e.parent.contents[e.name],
				e.parent.timestamp = Date.now(),
				e.name = t,
				r.contents[t] = e,
				r.timestamp = e.parent.timestamp,
				e.parent = r
		},
		unlink: function (e, r) {
			delete e.contents[r],
				e.timestamp = Date.now()
		},
		rmdir: function (e, r) {
			var t = FS.lookupNode(e, r);
			for (var n in t.contents)
				throw new FS.ErrnoError(55);
			delete e.contents[r],
				e.timestamp = Date.now()
		},
		readdir: function (e) {
			var r = [".", ".."];
			for (var t in e.contents)
				e.contents.hasOwnProperty(t) && r.push(t);
			return r
		},
		symlink: function (e, r, t) {
			var n = MEMFS.createNode(e, r, 41471, 0);
			return n.link = t,
				n
		},
		readlink: function (e) {
			if (!FS.isLink(e.mode))
				throw new FS.ErrnoError(28);
			return e.link
		}
	},
	stream_ops: {
		read: function (e, r, t, n, o) {
			var a = e.node.contents;
			if (o >= e.node.usedBytes)
				return 0;
			var i = Math.min(e.node.usedBytes - o, n);
			if (i > 8 && a.subarray)
				r.set(a.subarray(o, o + i), t);
			else
				for (var u = 0; u < i; u++)
					r[t + u] = a[o + u];
			return i
		},
		write: function (e, r, t, n, o, a) {
			if (r.buffer === HEAP8.buffer && (a = !1),
				!n)
				return 0;
			var i = e.node;
			if (i.timestamp = Date.now(),
				r.subarray && (!i.contents || i.contents.subarray)) {
				if (a)
					return i.contents = r.subarray(t, t + n),
						i.usedBytes = n,
						n;
				if (0 === i.usedBytes && 0 === o)
					return i.contents = r.slice(t, t + n),
						i.usedBytes = n,
						n;
				if (o + n <= i.usedBytes)
					return i.contents.set(r.subarray(t, t + n), o),
						n
			}
			if (MEMFS.expandFileStorage(i, o + n),
				i.contents.subarray && r.subarray)
				i.contents.set(r.subarray(t, t + n), o);
			else
				for (var u = 0; u < n; u++)
					i.contents[o + u] = r[t + u];
			return i.usedBytes = Math.max(i.usedBytes, o + n),
				n
		},
		llseek: function (e, r, t) {
			var n = r;
			if (1 === t ? n += e.position : 2 === t && FS.isFile(e.node.mode) && (n += e.node.usedBytes),
				n < 0)
				throw new FS.ErrnoError(28);
			return n
		},
		allocate: function (e, r, t) {
			MEMFS.expandFileStorage(e.node, r + t),
				e.node.usedBytes = Math.max(e.node.usedBytes, r + t)
		},
		mmap: function (e, r, t, n, o, a) {
			if (0 !== r)
				throw new FS.ErrnoError(28);
			if (!FS.isFile(e.node.mode))
				throw new FS.ErrnoError(43);
			var i, u, s = e.node.contents;
			if (2 & a || s.buffer !== buffer) {
				if ((n > 0 || n + t < s.length) && (s = s.subarray ? s.subarray(n, n + t) : Array.prototype.slice.call(s, n, n + t)),
					u = !0,
					!(i = mmapAlloc(t)))
					throw new FS.ErrnoError(48);
				HEAP8.set(s, i)
			} else
				u = !1,
					i = s.byteOffset;
			return {
				ptr: i,
				allocated: u
			}
		},
		msync: function (e, r, t, n, o) {
			if (!FS.isFile(e.node.mode))
				throw new FS.ErrnoError(43);
			return 2 & o || MEMFS.stream_ops.write(e, r, 0, n, t, !1),
				0
		}
	}
}
	, FS = {
		root: null,
		mounts: [],
		devices: {},
		streams: [],
		nextInode: 1,
		nameTable: null,
		currentPath: "/",
		initialized: !1,
		ignorePermissions: !0,
		trackingDelegate: {},
		tracking: {
			openFlags: {
				READ: 1,
				WRITE: 2
			}
		},
		ErrnoError: null,
		genericErrors: {},
		filesystems: null,
		syncFSRequests: 0,
		lookupPath: function (e, r) {
			if (r = r || {},
				!(e = PATH_FS.resolve(FS.cwd(), e)))
				return {
					path: "",
					node: null
				};
			var t = {
				follow_mount: !0,
				recurse_count: 0
			};
			for (var n in t)
				void 0 === r[n] && (r[n] = t[n]);
			if (r.recurse_count > 8)
				throw new FS.ErrnoError(32);
			for (var o = PATH.normalizeArray(e.split("/").filter((function (e) {
				return !!e
			}
			)), !1), a = FS.root, i = "/", u = 0; u < o.length; u++) {
				var s = u === o.length - 1;
				if (s && r.parent)
					break;
				if (a = FS.lookupNode(a, o[u]),
					i = PATH.join2(i, o[u]),
					FS.isMountpoint(a) && (!s || s && r.follow_mount) && (a = a.mounted.root),
					!s || r.follow)
					for (var l = 0; FS.isLink(a.mode);) {
						var c = FS.readlink(i);
						if (i = PATH_FS.resolve(PATH.dirname(i), c),
							a = FS.lookupPath(i, {
								recurse_count: r.recurse_count
							}).node,
							l++ > 40)
							throw new FS.ErrnoError(32)
					}
			}
			return {
				path: i,
				node: a
			}
		},
		getPath: function (e) {
			for (var r; ;) {
				if (FS.isRoot(e)) {
					var t = e.mount.mountpoint;
					return r ? "/" !== t[t.length - 1] ? t + "/" + r : t + r : t
				}
				r = r ? e.name + "/" + r : e.name,
					e = e.parent
			}
		},
		hashName: function (e, r) {
			for (var t = 0, n = 0; n < r.length; n++)
				t = (t << 5) - t + r.charCodeAt(n) | 0;
			return (e + t >>> 0) % FS.nameTable.length
		},
		hashAddNode: function (e) {
			var r = FS.hashName(e.parent.id, e.name);
			e.name_next = FS.nameTable[r],
				FS.nameTable[r] = e
		},
		hashRemoveNode: function (e) {
			var r = FS.hashName(e.parent.id, e.name);
			if (FS.nameTable[r] === e)
				FS.nameTable[r] = e.name_next;
			else
				for (var t = FS.nameTable[r]; t;) {
					if (t.name_next === e) {
						t.name_next = e.name_next;
						break
					}
					t = t.name_next
				}
		},
		lookupNode: function (e, r) {
			var t = FS.mayLookup(e);
			if (t)
				throw new FS.ErrnoError(t, e);
			for (var n = FS.hashName(e.id, r), o = FS.nameTable[n]; o; o = o.name_next) {
				var a = o.name;
				if (o.parent.id === e.id && a === r)
					return o
			}
			return FS.lookup(e, r)
		},
		createNode: function (e, r, t, n) {
			var o = new FS.FSNode(e, r, t, n);
			return FS.hashAddNode(o),
				o
		},
		destroyNode: function (e) {
			FS.hashRemoveNode(e)
		},
		isRoot: function (e) {
			return e === e.parent
		},
		isMountpoint: function (e) {
			return !!e.mounted
		},
		isFile: function (e) {
			return 32768 == (61440 & e)
		},
		isDir: function (e) {
			return 16384 == (61440 & e)
		},
		isLink: function (e) {
			return 40960 == (61440 & e)
		},
		isChrdev: function (e) {
			return 8192 == (61440 & e)
		},
		isBlkdev: function (e) {
			return 24576 == (61440 & e)
		},
		isFIFO: function (e) {
			return 4096 == (61440 & e)
		},
		isSocket: function (e) {
			return 49152 == (49152 & e)
		},
		flagModes: {
			r: 0,
			"r+": 2,
			w: 577,
			"w+": 578,
			a: 1089,
			"a+": 1090
		},
		modeStringToFlags: function (e) {
			var r = FS.flagModes[e];
			if (void 0 === r)
				throw new Error("Unknown file open mode: " + e);
			return r
		},
		flagsToPermissionString: function (e) {
			var r = ["r", "w", "rw"][3 & e];
			return 512 & e && (r += "w"),
				r
		},
		nodePermissions: function (e, r) {
			return FS.ignorePermissions || (-1 === r.indexOf("r") || 292 & e.mode) && (-1 === r.indexOf("w") || 146 & e.mode) && (-1 === r.indexOf("x") || 73 & e.mode) ? 0 : 2
		},
		mayLookup: function (e) {
			return FS.nodePermissions(e, "x") || (e.node_ops.lookup ? 0 : 2)
		},
		mayCreate: function (e, r) {
			try {
				return FS.lookupNode(e, r),
					20
			} catch (e) { }
			return FS.nodePermissions(e, "wx")
		},
		mayDelete: function (e, r, t) {
			var n;
			try {
				n = FS.lookupNode(e, r)
			} catch (e) {
				return e.errno
			}
			var o = FS.nodePermissions(e, "wx");
			if (o)
				return o;
			if (t) {
				if (!FS.isDir(n.mode))
					return 54;
				if (FS.isRoot(n) || FS.getPath(n) === FS.cwd())
					return 10
			} else if (FS.isDir(n.mode))
				return 31;
			return 0
		},
		mayOpen: function (e, r) {
			return e ? FS.isLink(e.mode) ? 32 : FS.isDir(e.mode) && ("r" !== FS.flagsToPermissionString(r) || 512 & r) ? 31 : FS.nodePermissions(e, FS.flagsToPermissionString(r)) : 44
		},
		MAX_OPEN_FDS: 4096,
		nextfd: function (e, r) {
			e = e || 0,
				r = r || FS.MAX_OPEN_FDS;
			for (var t = e; t <= r; t++)
				if (!FS.streams[t])
					return t;
			throw new FS.ErrnoError(33)
		},
		getStream: function (e) {
			return FS.streams[e]
		},
		createStream: function (e, r, t) {
			FS.FSStream || (FS.FSStream = function () { }
				,
				FS.FSStream.prototype = {
					object: {
						get: function () {
							return this.node
						},
						set: function (e) {
							this.node = e
						}
					},
					isRead: {
						get: function () {
							return 1 != (2097155 & this.flags)
						}
					},
					isWrite: {
						get: function () {
							return 0 != (2097155 & this.flags)
						}
					},
					isAppend: {
						get: function () {
							return 1024 & this.flags
						}
					}
				});
			var n = new FS.FSStream;
			for (var o in e)
				n[o] = e[o];
			e = n;
			var a = FS.nextfd(r, t);
			return e.fd = a,
				FS.streams[a] = e,
				e
		},
		closeStream: function (e) {
			FS.streams[e] = null
		},
		chrdev_stream_ops: {
			open: function (e) {
				var r = FS.getDevice(e.node.rdev);
				e.stream_ops = r.stream_ops,
					e.stream_ops.open && e.stream_ops.open(e)
			},
			llseek: function () {
				throw new FS.ErrnoError(70)
			}
		},
		major: function (e) {
			return e >> 8
		},
		minor: function (e) {
			return 255 & e
		},
		makedev: function (e, r) {
			return e << 8 | r
		},
		registerDevice: function (e, r) {
			FS.devices[e] = {
				stream_ops: r
			}
		},
		getDevice: function (e) {
			return FS.devices[e]
		},
		getMounts: function (e) {
			for (var r = [], t = [e]; t.length;) {
				var n = t.pop();
				r.push(n),
					t.push.apply(t, n.mounts)
			}
			return r
		},
		syncfs: function (e, r) {
			"function" == typeof e && (r = e,
				e = !1),
				FS.syncFSRequests++,
				FS.syncFSRequests > 1 && err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
			var t = FS.getMounts(FS.root.mount)
				, n = 0;
			function o(e) {
				return FS.syncFSRequests--,
					r(e)
			}
			function a(e) {
				if (e)
					return a.errored ? void 0 : (a.errored = !0,
						o(e));
				++n >= t.length && o(null)
			}
			t.forEach((function (r) {
				if (!r.type.syncfs)
					return a(null);
				r.type.syncfs(r, e, a)
			}
			))
		},
		mount: function (e, r, t) {
			var n, o = "/" === t, a = !t;
			if (o && FS.root)
				throw new FS.ErrnoError(10);
			if (!o && !a) {
				var i = FS.lookupPath(t, {
					follow_mount: !1
				});
				if (t = i.path,
					n = i.node,
					FS.isMountpoint(n))
					throw new FS.ErrnoError(10);
				if (!FS.isDir(n.mode))
					throw new FS.ErrnoError(54)
			}
			var u = {
				type: e,
				opts: r,
				mountpoint: t,
				mounts: []
			}
				, s = e.mount(u);
			return s.mount = u,
				u.root = s,
				o ? FS.root = s : n && (n.mounted = u,
					n.mount && n.mount.mounts.push(u)),
				s
		},
		unmount: function (e) {
			var r = FS.lookupPath(e, {
				follow_mount: !1
			});
			if (!FS.isMountpoint(r.node))
				throw new FS.ErrnoError(28);
			var t = r.node
				, n = t.mounted
				, o = FS.getMounts(n);
			Object.keys(FS.nameTable).forEach((function (e) {
				for (var r = FS.nameTable[e]; r;) {
					var t = r.name_next;
					-1 !== o.indexOf(r.mount) && FS.destroyNode(r),
						r = t
				}
			}
			)),
				t.mounted = null;
			var a = t.mount.mounts.indexOf(n);
			t.mount.mounts.splice(a, 1)
		},
		lookup: function (e, r) {
			return e.node_ops.lookup(e, r)
		},
		mknod: function (e, r, t) {
			var n = FS.lookupPath(e, {
				parent: !0
			}).node
				, o = PATH.basename(e);
			if (!o || "." === o || ".." === o)
				throw new FS.ErrnoError(28);
			var a = FS.mayCreate(n, o);
			if (a)
				throw new FS.ErrnoError(a);
			if (!n.node_ops.mknod)
				throw new FS.ErrnoError(63);
			return n.node_ops.mknod(n, o, r, t)
		},
		create: function (e, r) {
			return r = void 0 !== r ? r : 438,
				r &= 4095,
				r |= 32768,
				FS.mknod(e, r, 0)
		},
		mkdir: function (e, r) {
			return r = void 0 !== r ? r : 511,
				r &= 1023,
				r |= 16384,
				FS.mknod(e, r, 0)
		},
		mkdirTree: function (e, r) {
			for (var t = e.split("/"), n = "", o = 0; o < t.length; ++o)
				if (t[o]) {
					n += "/" + t[o];
					try {
						FS.mkdir(n, r)
					} catch (e) {
						if (20 != e.errno)
							throw e
					}
				}
		},
		mkdev: function (e, r, t) {
			return void 0 === t && (t = r,
				r = 438),
				r |= 8192,
				FS.mknod(e, r, t)
		},
		symlink: function (e, r) {
			if (!PATH_FS.resolve(e))
				throw new FS.ErrnoError(44);
			var t = FS.lookupPath(r, {
				parent: !0
			}).node;
			if (!t)
				throw new FS.ErrnoError(44);
			var n = PATH.basename(r)
				, o = FS.mayCreate(t, n);
			if (o)
				throw new FS.ErrnoError(o);
			if (!t.node_ops.symlink)
				throw new FS.ErrnoError(63);
			return t.node_ops.symlink(t, n, e)
		},
		rename: function (e, r) {
			var t, n, o = PATH.dirname(e), a = PATH.dirname(r), i = PATH.basename(e), u = PATH.basename(r);
			if (t = FS.lookupPath(e, {
				parent: !0
			}).node,
				n = FS.lookupPath(r, {
					parent: !0
				}).node,
				!t || !n)
				throw new FS.ErrnoError(44);
			if (t.mount !== n.mount)
				throw new FS.ErrnoError(75);
			var s, l = FS.lookupNode(t, i), c = PATH_FS.relative(e, a);
			if ("." !== c.charAt(0))
				throw new FS.ErrnoError(28);
			if ("." !== (c = PATH_FS.relative(r, o)).charAt(0))
				throw new FS.ErrnoError(55);
			try {
				s = FS.lookupNode(n, u)
			} catch (e) { }
			if (l !== s) {
				var d = FS.isDir(l.mode)
					, f = FS.mayDelete(t, i, d);
				if (f)
					throw new FS.ErrnoError(f);
				if (f = s ? FS.mayDelete(n, u, d) : FS.mayCreate(n, u))
					throw new FS.ErrnoError(f);
				if (!t.node_ops.rename)
					throw new FS.ErrnoError(63);
				if (FS.isMountpoint(l) || s && FS.isMountpoint(s))
					throw new FS.ErrnoError(10);
				if (n !== t && (f = FS.nodePermissions(t, "w")))
					throw new FS.ErrnoError(f);
				try {
					FS.trackingDelegate.willMovePath && FS.trackingDelegate.willMovePath(e, r)
				} catch (t) {
					err("FS.trackingDelegate['willMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message)
				}
				FS.hashRemoveNode(l);
				try {
					t.node_ops.rename(l, n, u)
				} catch (e) {
					throw e
				} finally {
					FS.hashAddNode(l)
				}
				try {
					FS.trackingDelegate.onMovePath && FS.trackingDelegate.onMovePath(e, r)
				} catch (t) {
					err("FS.trackingDelegate['onMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message)
				}
			}
		},
		rmdir: function (e) {
			var r = FS.lookupPath(e, {
				parent: !0
			}).node
				, t = PATH.basename(e)
				, n = FS.lookupNode(r, t)
				, o = FS.mayDelete(r, t, !0);
			if (o)
				throw new FS.ErrnoError(o);
			if (!r.node_ops.rmdir)
				throw new FS.ErrnoError(63);
			if (FS.isMountpoint(n))
				throw new FS.ErrnoError(10);
			try {
				FS.trackingDelegate.willDeletePath && FS.trackingDelegate.willDeletePath(e)
			} catch (r) {
				err("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message)
			}
			r.node_ops.rmdir(r, t),
				FS.destroyNode(n);
			try {
				FS.trackingDelegate.onDeletePath && FS.trackingDelegate.onDeletePath(e)
			} catch (r) {
				err("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message)
			}
		},
		readdir: function (e) {
			var r = FS.lookupPath(e, {
				follow: !0
			}).node;
			if (!r.node_ops.readdir)
				throw new FS.ErrnoError(54);
			return r.node_ops.readdir(r)
		},
		unlink: function (e) {
			var r = FS.lookupPath(e, {
				parent: !0
			}).node
				, t = PATH.basename(e)
				, n = FS.lookupNode(r, t)
				, o = FS.mayDelete(r, t, !1);
			if (o)
				throw new FS.ErrnoError(o);
			if (!r.node_ops.unlink)
				throw new FS.ErrnoError(63);
			if (FS.isMountpoint(n))
				throw new FS.ErrnoError(10);
			try {
				FS.trackingDelegate.willDeletePath && FS.trackingDelegate.willDeletePath(e)
			} catch (r) {
				err("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message)
			}
			r.node_ops.unlink(r, t),
				FS.destroyNode(n);
			try {
				FS.trackingDelegate.onDeletePath && FS.trackingDelegate.onDeletePath(e)
			} catch (r) {
				err("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message)
			}
		},
		readlink: function (e) {
			var r = FS.lookupPath(e).node;
			if (!r)
				throw new FS.ErrnoError(44);
			if (!r.node_ops.readlink)
				throw new FS.ErrnoError(28);
			return PATH_FS.resolve(FS.getPath(r.parent), r.node_ops.readlink(r))
		},
		stat: function (e, r) {
			var t = FS.lookupPath(e, {
				follow: !r
			}).node;
			if (!t)
				throw new FS.ErrnoError(44);
			if (!t.node_ops.getattr)
				throw new FS.ErrnoError(63);
			return t.node_ops.getattr(t)
		},
		lstat: function (e) {
			return FS.stat(e, !0)
		},
		chmod: function (e, r, t) {
			var n;
			if (!(n = "string" == typeof e ? FS.lookupPath(e, {
				follow: !t
			}).node : e).node_ops.setattr)
				throw new FS.ErrnoError(63);
			n.node_ops.setattr(n, {
				mode: 4095 & r | -4096 & n.mode,
				timestamp: Date.now()
			})
		},
		lchmod: function (e, r) {
			FS.chmod(e, r, !0)
		},
		fchmod: function (e, r) {
			var t = FS.getStream(e);
			if (!t)
				throw new FS.ErrnoError(8);
			FS.chmod(t.node, r)
		},
		chown: function (e, r, t, n) {
			var o;
			if (!(o = "string" == typeof e ? FS.lookupPath(e, {
				follow: !n
			}).node : e).node_ops.setattr)
				throw new FS.ErrnoError(63);
			o.node_ops.setattr(o, {
				timestamp: Date.now()
			})
		},
		lchown: function (e, r, t) {
			FS.chown(e, r, t, !0)
		},
		fchown: function (e, r, t) {
			var n = FS.getStream(e);
			if (!n)
				throw new FS.ErrnoError(8);
			FS.chown(n.node, r, t)
		},
		truncate: function (e, r) {
			if (r < 0)
				throw new FS.ErrnoError(28);
			var t;
			if (!(t = "string" == typeof e ? FS.lookupPath(e, {
				follow: !0
			}).node : e).node_ops.setattr)
				throw new FS.ErrnoError(63);
			if (FS.isDir(t.mode))
				throw new FS.ErrnoError(31);
			if (!FS.isFile(t.mode))
				throw new FS.ErrnoError(28);
			var n = FS.nodePermissions(t, "w");
			if (n)
				throw new FS.ErrnoError(n);
			t.node_ops.setattr(t, {
				size: r,
				timestamp: Date.now()
			})
		},
		ftruncate: function (e, r) {
			var t = FS.getStream(e);
			if (!t)
				throw new FS.ErrnoError(8);
			if (0 == (2097155 & t.flags))
				throw new FS.ErrnoError(28);
			FS.truncate(t.node, r)
		},
		utime: function (e, r, t) {
			var n = FS.lookupPath(e, {
				follow: !0
			}).node;
			n.node_ops.setattr(n, {
				timestamp: Math.max(r, t)
			})
		},
		open: function (e, r, t, n, o) {
			if ("" === e)
				throw new FS.ErrnoError(44);
			var a;
			if (t = void 0 === t ? 438 : t,
				t = 64 & (r = "string" == typeof r ? FS.modeStringToFlags(r) : r) ? 4095 & t | 32768 : 0,
				"object" == typeof e)
				a = e;
			else {
				e = PATH.normalize(e);
				try {
					a = FS.lookupPath(e, {
						follow: !(131072 & r)
					}).node
				} catch (e) { }
			}
			var i = !1;
			if (64 & r)
				if (a) {
					if (128 & r)
						throw new FS.ErrnoError(20)
				} else
					a = FS.mknod(e, t, 0),
						i = !0;
			if (!a)
				throw new FS.ErrnoError(44);
			if (FS.isChrdev(a.mode) && (r &= -513),
				65536 & r && !FS.isDir(a.mode))
				throw new FS.ErrnoError(54);
			if (!i) {
				var u = FS.mayOpen(a, r);
				if (u)
					throw new FS.ErrnoError(u)
			}
			512 & r && FS.truncate(a, 0),
				r &= -131713;
			var s = FS.createStream({
				node: a,
				path: FS.getPath(a),
				flags: r,
				seekable: !0,
				position: 0,
				stream_ops: a.stream_ops,
				ungotten: [],
				error: !1
			}, n, o);
			s.stream_ops.open && s.stream_ops.open(s),
				!Module.logReadFiles || 1 & r || (FS.readFiles || (FS.readFiles = {}),
					e in FS.readFiles || (FS.readFiles[e] = 1,
						err("FS.trackingDelegate error on read file: " + e)));
			try {
				if (FS.trackingDelegate.onOpenFile) {
					var l = 0;
					1 != (2097155 & r) && (l |= FS.tracking.openFlags.READ),
						0 != (2097155 & r) && (l |= FS.tracking.openFlags.WRITE),
						FS.trackingDelegate.onOpenFile(e, l)
				}
			} catch (r) {
				err("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + r.message)
			}
			return s
		},
		close: function (e) {
			if (FS.isClosed(e))
				throw new FS.ErrnoError(8);
			e.getdents && (e.getdents = null);
			try {
				e.stream_ops.close && e.stream_ops.close(e)
			} catch (e) {
				throw e
			} finally {
				FS.closeStream(e.fd)
			}
			e.fd = null
		},
		isClosed: function (e) {
			return null === e.fd
		},
		llseek: function (e, r, t) {
			if (FS.isClosed(e))
				throw new FS.ErrnoError(8);
			if (!e.seekable || !e.stream_ops.llseek)
				throw new FS.ErrnoError(70);
			if (0 != t && 1 != t && 2 != t)
				throw new FS.ErrnoError(28);
			return e.position = e.stream_ops.llseek(e, r, t),
				e.ungotten = [],
				e.position
		},
		read: function (e, r, t, n, o) {
			if (n < 0 || o < 0)
				throw new FS.ErrnoError(28);
			if (FS.isClosed(e))
				throw new FS.ErrnoError(8);
			if (1 == (2097155 & e.flags))
				throw new FS.ErrnoError(8);
			if (FS.isDir(e.node.mode))
				throw new FS.ErrnoError(31);
			if (!e.stream_ops.read)
				throw new FS.ErrnoError(28);
			var a = void 0 !== o;
			if (a) {
				if (!e.seekable)
					throw new FS.ErrnoError(70)
			} else
				o = e.position;
			var i = e.stream_ops.read(e, r, t, n, o);
			return a || (e.position += i),
				i
		},
		write: function (e, r, t, n, o, a) {
			if (n < 0 || o < 0)
				throw new FS.ErrnoError(28);
			if (FS.isClosed(e))
				throw new FS.ErrnoError(8);
			if (0 == (2097155 & e.flags))
				throw new FS.ErrnoError(8);
			if (FS.isDir(e.node.mode))
				throw new FS.ErrnoError(31);
			if (!e.stream_ops.write)
				throw new FS.ErrnoError(28);
			e.seekable && 1024 & e.flags && FS.llseek(e, 0, 2);
			var i = void 0 !== o;
			if (i) {
				if (!e.seekable)
					throw new FS.ErrnoError(70)
			} else
				o = e.position;
			var u = e.stream_ops.write(e, r, t, n, o, a);
			i || (e.position += u);
			try {
				e.path && FS.trackingDelegate.onWriteToFile && FS.trackingDelegate.onWriteToFile(e.path)
			} catch (r) {
				err("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + r.message)
			}
			return u
		},
		allocate: function (e, r, t) {
			if (FS.isClosed(e))
				throw new FS.ErrnoError(8);
			if (r < 0 || t <= 0)
				throw new FS.ErrnoError(28);
			if (0 == (2097155 & e.flags))
				throw new FS.ErrnoError(8);
			if (!FS.isFile(e.node.mode) && !FS.isDir(e.node.mode))
				throw new FS.ErrnoError(43);
			if (!e.stream_ops.allocate)
				throw new FS.ErrnoError(138);
			e.stream_ops.allocate(e, r, t)
		},
		mmap: function (e, r, t, n, o, a) {
			if (0 != (2 & o) && 0 == (2 & a) && 2 != (2097155 & e.flags))
				throw new FS.ErrnoError(2);
			if (1 == (2097155 & e.flags))
				throw new FS.ErrnoError(2);
			if (!e.stream_ops.mmap)
				throw new FS.ErrnoError(43);
			return e.stream_ops.mmap(e, r, t, n, o, a)
		},
		msync: function (e, r, t, n, o) {
			return e && e.stream_ops.msync ? e.stream_ops.msync(e, r, t, n, o) : 0
		},
		munmap: function (e) {
			return 0
		},
		ioctl: function (e, r, t) {
			if (!e.stream_ops.ioctl)
				throw new FS.ErrnoError(59);
			return e.stream_ops.ioctl(e, r, t)
		},
		readFile: function (e, r) {
			if ((r = r || {}).flags = r.flags || 0,
				r.encoding = r.encoding || "binary",
				"utf8" !== r.encoding && "binary" !== r.encoding)
				throw new Error('Invalid encoding type "' + r.encoding + '"');
			var t, n = FS.open(e, r.flags), o = FS.stat(e).size, a = new Uint8Array(o);
			return FS.read(n, a, 0, o, 0),
				"utf8" === r.encoding ? t = UTF8ArrayToString(a, 0) : "binary" === r.encoding && (t = a),
				FS.close(n),
				t
		},
		writeFile: function (e, r, t) {
			(t = t || {}).flags = t.flags || 577;
			var n = FS.open(e, t.flags, t.mode);
			if ("string" == typeof r) {
				var o = new Uint8Array(lengthBytesUTF8(r) + 1)
					, a = stringToUTF8Array(r, o, 0, o.length);
				FS.write(n, o, 0, a, void 0, t.canOwn)
			} else {
				if (!ArrayBuffer.isView(r))
					throw new Error("Unsupported data type");
				FS.write(n, r, 0, r.byteLength, void 0, t.canOwn)
			}
			FS.close(n)
		},
		cwd: function () {
			return FS.currentPath
		},
		chdir: function (e) {
			var r = FS.lookupPath(e, {
				follow: !0
			});
			if (null === r.node)
				throw new FS.ErrnoError(44);
			if (!FS.isDir(r.node.mode))
				throw new FS.ErrnoError(54);
			var t = FS.nodePermissions(r.node, "x");
			if (t)
				throw new FS.ErrnoError(t);
			FS.currentPath = r.path
		},
		createDefaultDirectories: function () {
			FS.mkdir("/tmp"),
				FS.mkdir("/home"),
				FS.mkdir("/home/web_user")
		},
		createDefaultDevices: function () {
			FS.mkdir("/dev"),
				FS.registerDevice(FS.makedev(1, 3), {
					read: function () {
						return 0
					},
					write: function (e, r, t, n, o) {
						return n
					}
				}),
				FS.mkdev("/dev/null", FS.makedev(1, 3)),
				TTY.register(FS.makedev(5, 0), TTY.default_tty_ops),
				TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops),
				FS.mkdev("/dev/tty", FS.makedev(5, 0)),
				FS.mkdev("/dev/tty1", FS.makedev(6, 0));
			var e = getRandomDevice();
			FS.createDevice("/dev", "random", e),
				FS.createDevice("/dev", "urandom", e),
				FS.mkdir("/dev/shm"),
				FS.mkdir("/dev/shm/tmp")
		},
		createSpecialDirectories: function () {
			FS.mkdir("/proc");
			var e = FS.mkdir("/proc/self");
			FS.mkdir("/proc/self/fd"),
				FS.mount({
					mount: function () {
						var r = FS.createNode(e, "fd", 16895, 73);
						return r.node_ops = {
							lookup: function (e, r) {
								var t = +r
									, n = FS.getStream(t);
								if (!n)
									throw new FS.ErrnoError(8);
								var o = {
									parent: null,
									mount: {
										mountpoint: "fake"
									},
									node_ops: {
										readlink: function () {
											return n.path
										}
									}
								};
								return o.parent = o,
									o
							}
						},
							r
					}
				}, {}, "/proc/self/fd")
		},
		createStandardStreams: function () {
			Module.stdin ? FS.createDevice("/dev", "stdin", Module.stdin) : FS.symlink("/dev/tty", "/dev/stdin"),
				Module.stdout ? FS.createDevice("/dev", "stdout", null, Module.stdout) : FS.symlink("/dev/tty", "/dev/stdout"),
				Module.stderr ? FS.createDevice("/dev", "stderr", null, Module.stderr) : FS.symlink("/dev/tty1", "/dev/stderr"),
				FS.open("/dev/stdin", 0),
				FS.open("/dev/stdout", 1),
				FS.open("/dev/stderr", 1)
		},
		ensureErrnoError: function () {
			FS.ErrnoError || (FS.ErrnoError = function (e, r) {
				this.node = r,
					this.setErrno = function (e) {
						this.errno = e
					}
					,
					this.setErrno(e),
					this.message = "FS error"
			}
				,
				FS.ErrnoError.prototype = new Error,
				FS.ErrnoError.prototype.constructor = FS.ErrnoError,
				[44].forEach((function (e) {
					FS.genericErrors[e] = new FS.ErrnoError(e),
						FS.genericErrors[e].stack = "<generic error, no stack>"
				}
				)))
		},
		staticInit: function () {
			FS.ensureErrnoError(),
				FS.nameTable = new Array(4096),
				FS.mount(MEMFS, {}, "/"),
				FS.createDefaultDirectories(),
				FS.createDefaultDevices(),
				FS.createSpecialDirectories(),
				FS.filesystems = {
					MEMFS
				}
		},
		init: function (e, r, t) {
			FS.init.initialized = !0,
				FS.ensureErrnoError(),
				Module.stdin = e || Module.stdin,
				Module.stdout = r || Module.stdout,
				Module.stderr = t || Module.stderr,
				FS.createStandardStreams()
		},
		quit: function () {
			FS.init.initialized = !1;
			var e = Module._fflush;
			e && e(0);
			for (var r = 0; r < FS.streams.length; r++) {
				var t = FS.streams[r];
				t && FS.close(t)
			}
		},
		getMode: function (e, r) {
			var t = 0;
			return e && (t |= 365),
				r && (t |= 146),
				t
		},
		findObject: function (e, r) {
			var t = FS.analyzePath(e, r);
			return t.exists ? t.object : null
		},
		analyzePath: function (e, r) {
			try {
				e = (n = FS.lookupPath(e, {
					follow: !r
				})).path
			} catch (e) { }
			var t = {
				isRoot: !1,
				exists: !1,
				error: 0,
				name: null,
				path: null,
				object: null,
				parentExists: !1,
				parentPath: null,
				parentObject: null
			};
			try {
				var n = FS.lookupPath(e, {
					parent: !0
				});
				t.parentExists = !0,
					t.parentPath = n.path,
					t.parentObject = n.node,
					t.name = PATH.basename(e),
					n = FS.lookupPath(e, {
						follow: !r
					}),
					t.exists = !0,
					t.path = n.path,
					t.object = n.node,
					t.name = n.node.name,
					t.isRoot = "/" === n.path
			} catch (e) {
				t.error = e.errno
			}
			return t
		},
		createPath: function (e, r, t, n) {
			e = "string" == typeof e ? e : FS.getPath(e);
			for (var o = r.split("/").reverse(); o.length;) {
				var a = o.pop();
				if (a) {
					var i = PATH.join2(e, a);
					try {
						FS.mkdir(i)
					} catch (e) { }
					e = i
				}
			}
			return i
		},
		createFile: function (e, r, t, n, o) {
			var a = PATH.join2("string" == typeof e ? e : FS.getPath(e), r)
				, i = FS.getMode(n, o);
			return FS.create(a, i)
		},
		createDataFile: function (e, r, t, n, o, a) {
			var i = r ? PATH.join2("string" == typeof e ? e : FS.getPath(e), r) : e
				, u = FS.getMode(n, o)
				, s = FS.create(i, u);
			if (t) {
				if ("string" == typeof t) {
					for (var l = new Array(t.length), c = 0, d = t.length; c < d; ++c)
						l[c] = t.charCodeAt(c);
					t = l
				}
				FS.chmod(s, 146 | u);
				var f = FS.open(s, 577);
				FS.write(f, t, 0, t.length, 0, a),
					FS.close(f),
					FS.chmod(s, u)
			}
			return s
		},
		createDevice: function (e, r, t, n) {
			var o = PATH.join2("string" == typeof e ? e : FS.getPath(e), r)
				, a = FS.getMode(!!t, !!n);
			FS.createDevice.major || (FS.createDevice.major = 64);
			var i = FS.makedev(FS.createDevice.major++, 0);
			return FS.registerDevice(i, {
				open: function (e) {
					e.seekable = !1
				},
				close: function (e) {
					n && n.buffer && n.buffer.length && n(10)
				},
				read: function (e, r, n, o, a) {
					for (var i = 0, u = 0; u < o; u++) {
						var s;
						try {
							s = t()
						} catch (e) {
							throw new FS.ErrnoError(29)
						}
						if (void 0 === s && 0 === i)
							throw new FS.ErrnoError(6);
						if (null == s)
							break;
						i++,
							r[n + u] = s
					}
					return i && (e.node.timestamp = Date.now()),
						i
				},
				write: function (e, r, t, o, a) {
					for (var i = 0; i < o; i++)
						try {
							n(r[t + i])
						} catch (e) {
							throw new FS.ErrnoError(29)
						}
					return o && (e.node.timestamp = Date.now()),
						i
				}
			}),
				FS.mkdev(o, a, i)
		},
		forceLoadFile: function (e) {
			if (e.isDevice || e.isFolder || e.link || e.contents)
				return !0;
			if ("undefined" != typeof XMLHttpRequest)
				throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
			if (!read_)
				throw new Error("Cannot load without read() or XMLHttpRequest.");
			try {
				e.contents = intArrayFromString(read_(e.url), !0),
					e.usedBytes = e.contents.length
			} catch (e) {
				throw new FS.ErrnoError(29)
			}
		},
		createLazyFile: function (e, r, t, n, o) {
			function a() {
				this.lengthKnown = !1,
					this.chunks = []
			}
			if (a.prototype.get = function (e) {
				if (!(e > this.length - 1 || e < 0)) {
					var r = e % this.chunkSize
						, t = e / this.chunkSize | 0;
					return this.getter(t)[r]
				}
			}
				,
				a.prototype.setDataGetter = function (e) {
					this.getter = e
				}
				,
				a.prototype.cacheLength = function () {
					var e = new XMLHttpRequest;
					if (e.open("HEAD", t, !1),
						e.send(null),
						!(e.status >= 200 && e.status < 300 || 304 === e.status))
						throw new Error("Couldn't load " + t + ". Status: " + e.status);
					var r, n = Number(e.getResponseHeader("Content-length")), o = (r = e.getResponseHeader("Accept-Ranges")) && "bytes" === r, a = (r = e.getResponseHeader("Content-Encoding")) && "gzip" === r, i = 1048576;
					o || (i = n);
					var u = this;
					u.setDataGetter((function (e) {
						var r = e * i
							, o = (e + 1) * i - 1;
						if (o = Math.min(o, n - 1),
							void 0 === u.chunks[e] && (u.chunks[e] = function (e, r) {
								if (e > r)
									throw new Error("invalid range (" + e + ", " + r + ") or no bytes requested!");
								if (r > n - 1)
									throw new Error("only " + n + " bytes available! programmer error!");
								var o = new XMLHttpRequest;
								if (o.open("GET", t, !1),
									n !== i && o.setRequestHeader("Range", "bytes=" + e + "-" + r),
									"undefined" != typeof Uint8Array && (o.responseType = "arraybuffer"),
									o.overrideMimeType && o.overrideMimeType("text/plain; charset=x-user-defined"),
									o.send(null),
									!(o.status >= 200 && o.status < 300 || 304 === o.status))
									throw new Error("Couldn't load " + t + ". Status: " + o.status);
								return void 0 !== o.response ? new Uint8Array(o.response || []) : intArrayFromString(o.responseText || "", !0)
							}(r, o)),
							void 0 === u.chunks[e])
							throw new Error("doXHR failed!");
						return u.chunks[e]
					}
					)),
						!a && n || (i = n = 1,
							n = this.getter(0).length,
							i = n,
							out("LazyFiles on gzip forces download of the whole file when length is accessed")),
						this._length = n,
						this._chunkSize = i,
						this.lengthKnown = !0
				}
				,
				"undefined" != typeof XMLHttpRequest) {
				if (!ENVIRONMENT_IS_WORKER)
					throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
				var i = new a;
				Object.defineProperties(i, {
					length: {
						get: function () {
							return this.lengthKnown || this.cacheLength(),
								this._length
						}
					},
					chunkSize: {
						get: function () {
							return this.lengthKnown || this.cacheLength(),
								this._chunkSize
						}
					}
				});
				var u = {
					isDevice: !1,
					contents: i
				}
			} else
				u = {
					isDevice: !1,
					url: t
				};
			var s = FS.createFile(e, r, u, n, o);
			u.contents ? s.contents = u.contents : u.url && (s.contents = null,
				s.url = u.url),
				Object.defineProperties(s, {
					usedBytes: {
						get: function () {
							return this.contents.length
						}
					}
				});
			var l = {};
			return Object.keys(s.stream_ops).forEach((function (e) {
				var r = s.stream_ops[e];
				l[e] = function () {
					return FS.forceLoadFile(s),
						r.apply(null, arguments)
				}
			}
			)),
				l.read = function (e, r, t, n, o) {
					FS.forceLoadFile(s);
					var a = e.node.contents;
					if (o >= a.length)
						return 0;
					var i = Math.min(a.length - o, n);
					if (a.slice)
						for (var u = 0; u < i; u++)
							r[t + u] = a[o + u];
					else
						for (u = 0; u < i; u++)
							r[t + u] = a.get(o + u);
					return i
				}
				,
				s.stream_ops = l,
				s
		},
		createPreloadedFile: function (e, r, t, n, o, a, i, u, s, l) {
			Browser.init();
			var c = r ? PATH_FS.resolve(PATH.join2(e, r)) : e
				, d = getUniqueRunDependency("cp " + c);
			function f(t) {
				function f(t) {
					l && l(),
						u || FS.createDataFile(e, r, t, n, o, s),
						a && a(),
						removeRunDependency(d)
				}
				var m = !1;
				Module.preloadPlugins.forEach((function (e) {
					m || e.canHandle(c) && (e.handle(t, c, f, (function () {
						i && i(),
							removeRunDependency(d)
					}
					)),
						m = !0)
				}
				)),
					m || f(t)
			}
			addRunDependency(d),
				"string" == typeof t ? Browser.asyncLoad(t, (function (e) {
					f(e)
				}
				), i) : f(t)
		},
		indexedDB: function () {
			return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
		},
		DB_NAME: function () {
			return "EM_FS_" + window.location.pathname
		},
		DB_VERSION: 20,
		DB_STORE_NAME: "FILE_DATA",
		saveFilesToDB: function (e, r, t) {
			r = r || function () { }
				,
				t = t || function () { }
				;
			var n = FS.indexedDB();
			try {
				var o = n.open(FS.DB_NAME(), FS.DB_VERSION)
			} catch (e) {
				return t(e)
			}
			o.onupgradeneeded = function () {
				out("creating db"),
					o.result.createObjectStore(FS.DB_STORE_NAME)
			}
				,
				o.onsuccess = function () {
					var n = o.result.transaction([FS.DB_STORE_NAME], "readwrite")
						, a = n.objectStore(FS.DB_STORE_NAME)
						, i = 0
						, u = 0
						, s = e.length;
					function l() {
						0 == u ? r() : t()
					}
					e.forEach((function (e) {
						var r = a.put(FS.analyzePath(e).object.contents, e);
						r.onsuccess = function () {
							++i + u == s && l()
						}
							,
							r.onerror = function () {
								u++,
									i + u == s && l()
							}
					}
					)),
						n.onerror = t
				}
				,
				o.onerror = t
		},
		loadFilesFromDB: function (e, r, t) {
			r = r || function () { }
				,
				t = t || function () { }
				;
			var n = FS.indexedDB();
			try {
				var o = n.open(FS.DB_NAME(), FS.DB_VERSION)
			} catch (e) {
				return t(e)
			}
			o.onupgradeneeded = t,
				o.onsuccess = function () {
					var n = o.result;
					try {
						var a = n.transaction([FS.DB_STORE_NAME], "readonly")
					} catch (e) {
						return void t(e)
					}
					var i = a.objectStore(FS.DB_STORE_NAME)
						, u = 0
						, s = 0
						, l = e.length;
					function c() {
						0 == s ? r() : t()
					}
					e.forEach((function (e) {
						var r = i.get(e);
						r.onsuccess = function () {
							FS.analyzePath(e).exists && FS.unlink(e),
								FS.createDataFile(PATH.dirname(e), PATH.basename(e), r.result, !0, !0, !0),
								++u + s == l && c()
						}
							,
							r.onerror = function () {
								s++,
									u + s == l && c()
							}
					}
					)),
						a.onerror = t
				}
				,
				o.onerror = t
		}
	}
	, SYSCALLS = {
		mappings: {},
		DEFAULT_POLLMASK: 5,
		umask: 511,
		calculateAt: function (e, r, t) {
			if ("/" === r[0])
				return r;
			var n;
			if (-100 === e)
				n = FS.cwd();
			else {
				var o = FS.getStream(e);
				if (!o)
					throw new FS.ErrnoError(8);
				n = o.path
			}
			if (0 == r.length) {
				if (!t)
					throw new FS.ErrnoError(44);
				return n
			}
			return PATH.join2(n, r)
		},
		doStat: function (e, r, t) {
			try {
				var n = e(r)
			} catch (e) {
				if (e && e.node && PATH.normalize(r) !== PATH.normalize(FS.getPath(e.node)))
					return -54;
				throw e
			}
			return HEAP32[t >> 2] = n.dev,
				HEAP32[t + 4 >> 2] = 0,
				HEAP32[t + 8 >> 2] = n.ino,
				HEAP32[t + 12 >> 2] = n.mode,
				HEAP32[t + 16 >> 2] = n.nlink,
				HEAP32[t + 20 >> 2] = n.uid,
				HEAP32[t + 24 >> 2] = n.gid,
				HEAP32[t + 28 >> 2] = n.rdev,
				HEAP32[t + 32 >> 2] = 0,
				tempI64 = [n.size >>> 0, (tempDouble = n.size,
					+Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
				HEAP32[t + 40 >> 2] = tempI64[0],
				HEAP32[t + 44 >> 2] = tempI64[1],
				HEAP32[t + 48 >> 2] = 4096,
				HEAP32[t + 52 >> 2] = n.blocks,
				HEAP32[t + 56 >> 2] = n.atime.getTime() / 1e3 | 0,
				HEAP32[t + 60 >> 2] = 0,
				HEAP32[t + 64 >> 2] = n.mtime.getTime() / 1e3 | 0,
				HEAP32[t + 68 >> 2] = 0,
				HEAP32[t + 72 >> 2] = n.ctime.getTime() / 1e3 | 0,
				HEAP32[t + 76 >> 2] = 0,
				tempI64 = [n.ino >>> 0, (tempDouble = n.ino,
					+Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
				HEAP32[t + 80 >> 2] = tempI64[0],
				HEAP32[t + 84 >> 2] = tempI64[1],
				0
		},
		doMsync: function (e, r, t, n, o) {
			var a = HEAPU8.slice(e, e + t);
			FS.msync(r, a, o, t, n)
		},
		doMkdir: function (e, r) {
			return "/" === (e = PATH.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)),
				FS.mkdir(e, r, 0),
				0
		},
		doMknod: function (e, r, t) {
			switch (61440 & r) {
				case 32768:
				case 8192:
				case 24576:
				case 4096:
				case 49152:
					break;
				default:
					return -28
			}
			return FS.mknod(e, r, t),
				0
		},
		doReadlink: function (e, r, t) {
			if (t <= 0)
				return -28;
			var n = FS.readlink(e)
				, o = Math.min(t, lengthBytesUTF8(n))
				, a = HEAP8[r + o];
			return stringToUTF8(n, r, t + 1),
				HEAP8[r + o] = a,
				o
		},
		doAccess: function (e, r) {
			if (-8 & r)
				return -28;
			var t;
			if (!(t = FS.lookupPath(e, {
				follow: !0
			}).node))
				return -44;
			var n = "";
			return 4 & r && (n += "r"),
				2 & r && (n += "w"),
				1 & r && (n += "x"),
				n && FS.nodePermissions(t, n) ? -2 : 0
		},
		doDup: function (e, r, t) {
			var n = FS.getStream(t);
			return n && FS.close(n),
				FS.open(e, r, 0, t, t).fd
		},
		doReadv: function (e, r, t, n) {
			for (var o = 0, a = 0; a < t; a++) {
				var i = HEAP32[r + 8 * a >> 2]
					, u = HEAP32[r + (8 * a + 4) >> 2]
					, s = FS.read(e, HEAP8, i, u, n);
				if (s < 0)
					return -1;
				if (o += s,
					s < u)
					break
			}
			return o
		},
		doWritev: function (e, r, t, n) {
			for (var o = 0, a = 0; a < t; a++) {
				var i = HEAP32[r + 8 * a >> 2]
					, u = HEAP32[r + (8 * a + 4) >> 2]
					, s = FS.write(e, HEAP8, i, u, n);
				if (s < 0)
					return -1;
				o += s
			}
			return o
		},
		varargs: void 0,
		get: function () {
			return SYSCALLS.varargs += 4,
				HEAP32[SYSCALLS.varargs - 4 >> 2]
		},
		getStr: function (e) {
			return UTF8ToString(e)
		},
		getStreamFromFD: function (e) {
			var r = FS.getStream(e);
			if (!r)
				throw new FS.ErrnoError(8);
			return r
		},
		get64: function (e, r) {
			return e
		}
	};
function _environ_get(e, r) {
	try {
		var t = 0;
		return getEnvStrings().forEach((function (n, o) {
			var a = r + t;
			HEAP32[e + 4 * o >> 2] = a,
				writeAsciiToMemory(n, a),
				t += n.length + 1
		}
		)),
			0
	} catch (e) {
		return void 0 !== FS && e instanceof FS.ErrnoError || abort(e),
			e.errno
	}
}
function _environ_sizes_get(e, r) {
	try {
		var t = getEnvStrings();
		HEAP32[e >> 2] = t.length;
		var n = 0;
		return t.forEach((function (e) {
			n += e.length + 1
		}
		)),
			HEAP32[r >> 2] = n,
			0
	} catch (e) {
		return void 0 !== FS && e instanceof FS.ErrnoError || abort(e),
			e.errno
	}
}
function _fd_close(e) {
	try {
		var r = SYSCALLS.getStreamFromFD(e);
		return FS.close(r),
			0
	} catch (e) {
		return void 0 !== FS && e instanceof FS.ErrnoError || abort(e),
			e.errno
	}
}
function _fd_read(e, r, t, n) {
	try {
		var o = SYSCALLS.getStreamFromFD(e)
			, a = SYSCALLS.doReadv(o, r, t);
		return HEAP32[n >> 2] = a,
			0
	} catch (e) {
		return void 0 !== FS && e instanceof FS.ErrnoError || abort(e),
			e.errno
	}
}
function _fd_seek(e, r, t, n, o) {
	try {
		var a = SYSCALLS.getStreamFromFD(e)
			, i = 4294967296 * t + (r >>> 0)
			, u = 9007199254740992;
		return i <= -u || i >= u ? -61 : (FS.llseek(a, i, n),
			tempI64 = [a.position >>> 0, (tempDouble = a.position,
				+Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math.min(+Math.floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],
			HEAP32[o >> 2] = tempI64[0],
			HEAP32[o + 4 >> 2] = tempI64[1],
			a.getdents && 0 === i && 0 === n && (a.getdents = null),
			0)
	} catch (e) {
		return void 0 !== FS && e instanceof FS.ErrnoError || abort(e),
			e.errno
	}
}
function _fd_write(e, r, t, n) {
	try {
		var o = SYSCALLS.getStreamFromFD(e)
			, a = SYSCALLS.doWritev(o, r, t);
		return HEAP32[n >> 2] = a,
			0
	} catch (e) {
		return void 0 !== FS && e instanceof FS.ErrnoError || abort(e),
			e.errno
	}
}
function _setTempRet0(e) {
	setTempRet0(0 | e)
}
function __isLeapYear(e) {
	return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0)
}
function __arraySum(e, r) {
	for (var t = 0, n = 0; n <= r; t += e[n++])
		;
	return t
}
var __MONTH_DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	, __MONTH_DAYS_REGULAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function __addDays(e, r) {
	for (var t = new Date(e.getTime()); r > 0;) {
		var n = __isLeapYear(t.getFullYear())
			, o = t.getMonth()
			, a = (n ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[o];
		if (!(r > a - t.getDate()))
			return t.setDate(t.getDate() + r),
				t;
		r -= a - t.getDate() + 1,
			t.setDate(1),
			o < 11 ? t.setMonth(o + 1) : (t.setMonth(0),
				t.setFullYear(t.getFullYear() + 1))
	}
	return t
}
function _strftime(e, r, t, n) {
	var o = HEAP32[n + 40 >> 2]
		, a = {
			tm_sec: HEAP32[n >> 2],
			tm_min: HEAP32[n + 4 >> 2],
			tm_hour: HEAP32[n + 8 >> 2],
			tm_mday: HEAP32[n + 12 >> 2],
			tm_mon: HEAP32[n + 16 >> 2],
			tm_year: HEAP32[n + 20 >> 2],
			tm_wday: HEAP32[n + 24 >> 2],
			tm_yday: HEAP32[n + 28 >> 2],
			tm_isdst: HEAP32[n + 32 >> 2],
			tm_gmtoff: HEAP32[n + 36 >> 2],
			tm_zone: o ? UTF8ToString(o) : ""
		}
		, i = UTF8ToString(t)
		, u = {
			"%c": "%a %b %d %H:%M:%S %Y",
			"%D": "%m/%d/%y",
			"%F": "%Y-%m-%d",
			"%h": "%b",
			"%r": "%I:%M:%S %p",
			"%R": "%H:%M",
			"%T": "%H:%M:%S",
			"%x": "%m/%d/%y",
			"%X": "%H:%M:%S",
			"%Ec": "%c",
			"%EC": "%C",
			"%Ex": "%m/%d/%y",
			"%EX": "%H:%M:%S",
			"%Ey": "%y",
			"%EY": "%Y",
			"%Od": "%d",
			"%Oe": "%e",
			"%OH": "%H",
			"%OI": "%I",
			"%Om": "%m",
			"%OM": "%M",
			"%OS": "%S",
			"%Ou": "%u",
			"%OU": "%U",
			"%OV": "%V",
			"%Ow": "%w",
			"%OW": "%W",
			"%Oy": "%y"
		};
	for (var s in u)
		i = i.replace(new RegExp(s, "g"), u[s]);
	var l = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		, c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	function d(e, r, t) {
		for (var n = "number" == typeof e ? e.toString() : e || ""; n.length < r;)
			n = t[0] + n;
		return n
	}
	function f(e, r) {
		return d(e, r, "0")
	}
	function m(e, r) {
		function t(e) {
			return e < 0 ? -1 : e > 0 ? 1 : 0
		}
		var n;
		return 0 === (n = t(e.getFullYear() - r.getFullYear())) && 0 === (n = t(e.getMonth() - r.getMonth())) && (n = t(e.getDate() - r.getDate())),
			n
	}
	function _(e) {
		switch (e.getDay()) {
			case 0:
				return new Date(e.getFullYear() - 1, 11, 29);
			case 1:
				return e;
			case 2:
				return new Date(e.getFullYear(), 0, 3);
			case 3:
				return new Date(e.getFullYear(), 0, 2);
			case 4:
				return new Date(e.getFullYear(), 0, 1);
			case 5:
				return new Date(e.getFullYear() - 1, 11, 31);
			case 6:
				return new Date(e.getFullYear() - 1, 11, 30)
		}
	}
	function p(e) {
		var r = __addDays(new Date(e.tm_year + 1900, 0, 1), e.tm_yday)
			, t = new Date(r.getFullYear(), 0, 4)
			, n = new Date(r.getFullYear() + 1, 0, 4)
			, o = _(t)
			, a = _(n);
		return m(o, r) <= 0 ? m(a, r) <= 0 ? r.getFullYear() + 1 : r.getFullYear() : r.getFullYear() - 1
	}
	var S = {
		"%a": function (e) {
			return l[e.tm_wday].substring(0, 3)
		},
		"%A": function (e) {
			return l[e.tm_wday]
		},
		"%b": function (e) {
			return c[e.tm_mon].substring(0, 3)
		},
		"%B": function (e) {
			return c[e.tm_mon]
		},
		"%C": function (e) {
			return f((e.tm_year + 1900) / 100 | 0, 2)
		},
		"%d": function (e) {
			return f(e.tm_mday, 2)
		},
		"%e": function (e) {
			return d(e.tm_mday, 2, " ")
		},
		"%g": function (e) {
			return p(e).toString().substring(2)
		},
		"%G": function (e) {
			return p(e)
		},
		"%H": function (e) {
			return f(e.tm_hour, 2)
		},
		"%I": function (e) {
			var r = e.tm_hour;
			return 0 == r ? r = 12 : r > 12 && (r -= 12),
				f(r, 2)
		},
		"%j": function (e) {
			return f(e.tm_mday + __arraySum(__isLeapYear(e.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, e.tm_mon - 1), 3)
		},
		"%m": function (e) {
			return f(e.tm_mon + 1, 2)
		},
		"%M": function (e) {
			return f(e.tm_min, 2)
		},
		"%n": function () {
			return "\n"
		},
		"%p": function (e) {
			return e.tm_hour >= 0 && e.tm_hour < 12 ? "AM" : "PM"
		},
		"%S": function (e) {
			return f(e.tm_sec, 2)
		},
		"%t": function () {
			return "\t"
		},
		"%u": function (e) {
			return e.tm_wday || 7
		},
		"%U": function (e) {
			var r = new Date(e.tm_year + 1900, 0, 1)
				, t = 0 === r.getDay() ? r : __addDays(r, 7 - r.getDay())
				, n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
			if (m(t, n) < 0) {
				var o = __arraySum(__isLeapYear(n.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, n.getMonth() - 1) - 31
					, a = 31 - t.getDate() + o + n.getDate();
				return f(Math.ceil(a / 7), 2)
			}
			return 0 === m(t, r) ? "01" : "00"
		},
		"%V": function (e) {
			var r, t = new Date(e.tm_year + 1900, 0, 4), n = new Date(e.tm_year + 1901, 0, 4), o = _(t), a = _(n), i = __addDays(new Date(e.tm_year + 1900, 0, 1), e.tm_yday);
			return m(i, o) < 0 ? "53" : m(a, i) <= 0 ? "01" : (r = o.getFullYear() < e.tm_year + 1900 ? e.tm_yday + 32 - o.getDate() : e.tm_yday + 1 - o.getDate(),
				f(Math.ceil(r / 7), 2))
		},
		"%w": function (e) {
			return e.tm_wday
		},
		"%W": function (e) {
			var r = new Date(e.tm_year, 0, 1)
				, t = 1 === r.getDay() ? r : __addDays(r, 0 === r.getDay() ? 1 : 7 - r.getDay() + 1)
				, n = new Date(e.tm_year + 1900, e.tm_mon, e.tm_mday);
			if (m(t, n) < 0) {
				var o = __arraySum(__isLeapYear(n.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, n.getMonth() - 1) - 31
					, a = 31 - t.getDate() + o + n.getDate();
				return f(Math.ceil(a / 7), 2)
			}
			return 0 === m(t, r) ? "01" : "00"
		},
		"%y": function (e) {
			return (e.tm_year + 1900).toString().substring(2)
		},
		"%Y": function (e) {
			return e.tm_year + 1900
		},
		"%z": function (e) {
			var r = e.tm_gmtoff
				, t = r >= 0;
			return r = (r = Math.abs(r) / 60) / 60 * 100 + r % 60,
				(t ? "+" : "-") + String("0000" + r).slice(-4)
		},
		"%Z": function (e) {
			return e.tm_zone
		},
		"%%": function () {
			return "%"
		}
	};
	for (var s in S)
		i.indexOf(s) >= 0 && (i = i.replace(new RegExp(s, "g"), S[s](a)));
	var h = intArrayFromString(i, !1);
	return h.length > r ? 0 : (writeArrayToMemory(h, e),
		h.length - 1)
}
function _strftime_l(e, r, t, n) {
	return _strftime(e, r, t, n)
}
embind_init_charCodes(),
	BindingError = Module.BindingError = extendError(Error, "BindingError"),
	InternalError = Module.InternalError = extendError(Error, "InternalError"),
	init_emval(),
	UnboundTypeError = Module.UnboundTypeError = extendError(Error, "UnboundTypeError"),
	Fetch.staticInit();
var FSNode = function (e, r, t, n) {
	e || (e = this),
		this.parent = e,
		this.mount = e.mount,
		this.mounted = null,
		this.id = FS.nextInode++,
		this.name = r,
		this.mode = t,
		this.node_ops = {},
		this.stream_ops = {},
		this.rdev = n
}
	, readMode = 365
	, writeMode = 146;
function intArrayFromString(e, r, t) {
	var n = t > 0 ? t : lengthBytesUTF8(e) + 1
		, o = new Array(n)
		, a = stringToUTF8Array(e, o, 0, o.length);
	return r && (o.length = a),
		o
}
Object.defineProperties(FSNode.prototype, {
	read: {
		get: function () {
			return (this.mode & readMode) === readMode
		},
		set: function (e) {
			e ? this.mode |= readMode : this.mode &= ~readMode
		}
	},
	write: {
		get: function () {
			return (this.mode & writeMode) === writeMode
		},
		set: function (e) {
			e ? this.mode |= writeMode : this.mode &= ~writeMode
		}
	},
	isFolder: {
		get: function () {
			return FS.isDir(this.mode)
		}
	},
	isDevice: {
		get: function () {
			return FS.isChrdev(this.mode)
		}
	}
}),
	FS.FSNode = FSNode,
	FS.staticInit();
var calledRun, asmLibraryArg = {
	b: ___assert_fail,
	E: __embind_register_bool,
	D: __embind_register_emval,
	p: __embind_register_float,
	G: __embind_register_function,
	d: __embind_register_integer,
	c: __embind_register_memory_view,
	q: __embind_register_std_string,
	i: __embind_register_std_wstring,
	F: __embind_register_void,
	A: __emscripten_fetch_free,
	f: __emval_as,
	a: __emval_decref,
	n: __emval_get_global,
	j: __emval_get_module_property,
	g: __emval_get_property,
	m: __emval_instanceof,
	l: __emval_new_cstring,
	e: __emval_run_destructors,
	k: __emval_take_value,
	h: _abort,
	C: _emscripten_is_main_browser_thread,
	t: _emscripten_memcpy_big,
	u: _emscripten_resize_heap,
	B: _emscripten_start_fetch,
	w: _environ_get,
	x: _environ_sizes_get,
	y: _fd_close,
	z: _fd_read,
	r: _fd_seek,
	o: _fd_write,
	s: _setTempRet0,
	v: _strftime_l
}, asm = createWasm(), ___wasm_call_ctors = Module.___wasm_call_ctors = function () {
	return (___wasm_call_ctors = Module.___wasm_call_ctors = Module.asm.I).apply(null, arguments)
}
	, _Version = Module._Version = function () {
		return (_Version = Module._Version = Module.asm.J).apply(null, arguments)
	}
	, _SetCodeMemorySize = Module._SetCodeMemorySize = function () {
		return (_SetCodeMemorySize = Module._SetCodeMemorySize = Module.asm.K).apply(null, arguments)
	}
	, _SetDataMemorySize = Module._SetDataMemorySize = function () {
		return (_SetDataMemorySize = Module._SetDataMemorySize = Module.asm.L).apply(null, arguments)
	}
	, _SetRomWindowSize = Module._SetRomWindowSize = function () {
		return (_SetRomWindowSize = Module._SetRomWindowSize = Module.asm.M).apply(null, arguments)
	}
	, _SetCodeMemoryDefaultCode = Module._SetCodeMemoryDefaultCode = function () {
		return (_SetCodeMemoryDefaultCode = Module._SetCodeMemoryDefaultCode = Module.asm.N).apply(null, arguments)
	}
	, _SetMemoryModel = Module._SetMemoryModel = function () {
		return (_SetMemoryModel = Module._SetMemoryModel = Module.asm.O).apply(null, arguments)
	}
	, _SetInterruptTableEntry = Module._SetInterruptTableEntry = function () {
		return (_SetInterruptTableEntry = Module._SetInterruptTableEntry = Module.asm.P).apply(null, arguments)
	}
	, _SetPeriBCD = Module._SetPeriBCD = function () {
		return (_SetPeriBCD = Module._SetPeriBCD = Module.asm.Q).apply(null, arguments)
	}
	, _LoadHexFile = Module._LoadHexFile = function () {
		return (_LoadHexFile = Module._LoadHexFile = Module.asm.R).apply(null, arguments)
	}
	, _GetCount = Module._GetCount = function () {
		return (_GetCount = Module._GetCount = Module.asm.S).apply(null, arguments)
	}
	, _GetSimRun = Module._GetSimRun = function () {
		return (_GetSimRun = Module._GetSimRun = Module.asm.T).apply(null, arguments)
	}
	, _Execute = Module._Execute = function () {
		return (_Execute = Module._Execute = Module.asm.U).apply(null, arguments)
	}
	, _ExecuteMultiple = Module._ExecuteMultiple = function () {
		return (_ExecuteMultiple = Module._ExecuteMultiple = Module.asm.V).apply(null, arguments)
	}
	, _ExecuteWhileRun = Module._ExecuteWhileRun = function () {
		return (_ExecuteWhileRun = Module._ExecuteWhileRun = Module.asm.W).apply(null, arguments)
	}
	, _CheckInterrupt = Module._CheckInterrupt = function () {
		return (_CheckInterrupt = Module._CheckInterrupt = Module.asm.X).apply(null, arguments)
	}
	, _SimReset = Module._SimReset = function () {
		return (_SimReset = Module._SimReset = Module.asm.Y).apply(null, arguments)
	}
	, _ReadCodeMemory = Module._ReadCodeMemory = function () {
		return (_ReadCodeMemory = Module._ReadCodeMemory = Module.asm.Z).apply(null, arguments)
	}
	, _WriteCodeMemory = Module._WriteCodeMemory = function () {
		return (_WriteCodeMemory = Module._WriteCodeMemory = Module.asm._).apply(null, arguments)
	}
	, _ReadDataMemory = Module._ReadDataMemory = function () {
		return (_ReadDataMemory = Module._ReadDataMemory = Module.asm.$).apply(null, arguments)
	}
	, _WriteDataMemory = Module._WriteDataMemory = function () {
		return (_WriteDataMemory = Module._WriteDataMemory = Module.asm.aa).apply(null, arguments)
	}
	, _WriteBitDataMemory = Module._WriteBitDataMemory = function () {
		return (_WriteBitDataMemory = Module._WriteBitDataMemory = Module.asm.ba).apply(null, arguments)
	}
	, _ReadReg = Module._ReadReg = function () {
		return (_ReadReg = Module._ReadReg = Module.asm.ca).apply(null, arguments)
	}
	, _WriteReg = Module._WriteReg = function () {
		return (_WriteReg = Module._WriteReg = Module.asm.da).apply(null, arguments)
	}
	, _LogStart = Module._LogStart = function () {
		return (_LogStart = Module._LogStart = Module.asm.ea).apply(null, arguments)
	}
	, _LogStop = Module._LogStop = function () {
		return (_LogStop = Module._LogStop = Module.asm.fa).apply(null, arguments)
	}
	, _LogState = Module._LogState = function () {
		return (_LogState = Module._LogState = Module.asm.ga).apply(null, arguments)
	}
	, _LogStart2 = Module._LogStart2 = function () {
		return (_LogStart2 = Module._LogStart2 = Module.asm.ha).apply(null, arguments)
	}
	, _LogLength2 = Module._LogLength2 = function () {
		return (_LogLength2 = Module._LogLength2 = Module.asm.ia).apply(null, arguments)
	}
	, _LogText2 = Module._LogText2 = function () {
		return (_LogText2 = Module._LogText2 = Module.asm.ja).apply(null, arguments)
	}
	, _LoadRAM = Module._LoadRAM = function () {
		return (_LoadRAM = Module._LoadRAM = Module.asm.ka).apply(null, arguments)
	}
	, _SaveRAM = Module._SaveRAM = function () {
		return (_SaveRAM = Module._SaveRAM = Module.asm.la).apply(null, arguments)
	}
	, _malloc = Module._malloc = function () {
		return (_malloc = Module._malloc = Module.asm.na).apply(null, arguments)
	}
	, ___getTypeName = Module.___getTypeName = function () {
		return (___getTypeName = Module.___getTypeName = Module.asm.oa).apply(null, arguments)
	}
	, ___embind_register_native_and_builtin_types = Module.___embind_register_native_and_builtin_types = function () {
		return (___embind_register_native_and_builtin_types = Module.___embind_register_native_and_builtin_types = Module.asm.pa).apply(null, arguments)
	}
	, _free = Module._free = function () {
		return (_free = Module._free = Module.asm.qa).apply(null, arguments)
	}
	, stackSave = Module.stackSave = function () {
		return (stackSave = Module.stackSave = Module.asm.ra).apply(null, arguments)
	}
	, stackRestore = Module.stackRestore = function () {
		return (stackRestore = Module.stackRestore = Module.asm.sa).apply(null, arguments)
	}
	, stackAlloc = Module.stackAlloc = function () {
		return (stackAlloc = Module.stackAlloc = Module.asm.ta).apply(null, arguments)
	}
	, dynCall_jiji = Module.dynCall_jiji = function () {
		return (dynCall_jiji = Module.dynCall_jiji = Module.asm.ua).apply(null, arguments)
	}
	, dynCall_viijii = Module.dynCall_viijii = function () {
		return (dynCall_viijii = Module.dynCall_viijii = Module.asm.va).apply(null, arguments)
	}
	, dynCall_iiiiij = Module.dynCall_iiiiij = function () {
		return (dynCall_iiiiij = Module.dynCall_iiiiij = Module.asm.wa).apply(null, arguments)
	}
	, dynCall_iiiiijj = Module.dynCall_iiiiijj = function () {
		return (dynCall_iiiiijj = Module.dynCall_iiiiijj = Module.asm.xa).apply(null, arguments)
	}
	, dynCall_iiiiiijj = Module.dynCall_iiiiiijj = function () {
		return (dynCall_iiiiiijj = Module.dynCall_iiiiiijj = Module.asm.ya).apply(null, arguments)
	}
	;
function ExitStatus(e) {
	this.name = "ExitStatus",
		this.message = "Program terminated with exit(" + e + ")",
		this.status = e
}
function run(e) {
	function r() {
		calledRun || (calledRun = !0,
			Module.calledRun = !0,
			ABORT || (initRuntime(),
				preMain(),
				Module.initialize(),
				Module.onRuntimeInitialized && Module.onRuntimeInitialized(),
				postRun()))
	}
	e = e || arguments_,
		runDependencies > 0 || (preRun(),
			runDependencies > 0 || (Module.setStatus ? (Module.setStatus("Running..."),
				setTimeout((function () {
					setTimeout((function () {
						Module.setStatus("")
					}
					), 1),
						r()
				}
				), 1)) : r()))
}
if (Module.cwrap = cwrap,
	Module.getValue = getValue,
	dependenciesFulfilled = function e() {
		calledRun || run(),
			calledRun || (dependenciesFulfilled = e)
	}
	,
	Module.run = run,
	Module.preInit)
	for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0;)
		Module.preInit.pop()();
run();
