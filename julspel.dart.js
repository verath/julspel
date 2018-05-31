(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isd=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isj)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="n"){processStatics(init.statics[b1]=b2.n,b3)
delete b2.n}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cE"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cE"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cE(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.M=function(){}
var dart=[["","",,H,{"^":"",kA:{"^":"d;a"}}],["","",,J,{"^":"",
z:function(a){return void 0},
bX:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bU:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cJ==null){H.jH()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.h(new P.e3("Return interceptor for "+H.i(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$c6()]
if(v!=null)return v
v=H.jQ(a)
if(v!=null)return v
if(typeof a=="function")return C.B
y=Object.getPrototypeOf(a)
if(y==null)return C.o
if(y===Object.prototype)return C.o
if(typeof w=="function"){Object.defineProperty(w,$.$get$c6(),{value:C.i,enumerable:false,writable:true,configurable:true})
return C.i}return C.i},
j:{"^":"d;",
E:function(a,b){return a===b},
gN:function(a){return H.a8(a)},
k:["e6",function(a){return H.bE(a)}],
"%":"Blob|CanvasGradient|CanvasPattern|DOMError|DOMImplementation|File|FileError|MediaError|NavigatorUserMediaError|PositionError|Range|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|StorageManager|WebGLRenderingContext"},
fY:{"^":"j;",
k:function(a){return String(a)},
gN:function(a){return a?519018:218159},
$isjx:1},
fZ:{"^":"j;",
E:function(a,b){return null==b},
k:function(a){return"null"},
gN:function(a){return 0}},
c7:{"^":"j;",
gN:function(a){return 0},
k:["e7",function(a){return String(a)}],
$ish_:1},
hp:{"^":"c7;"},
bK:{"^":"c7;"},
b7:{"^":"c7;",
k:function(a){var z=a[$.$get$d6()]
return z==null?this.e7(a):J.Y(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
b5:{"^":"j;$ti",
bX:function(a,b){if(!!a.immutable$list)throw H.h(new P.Q(b))},
d5:function(a,b){if(!!a.fixed$length)throw H.h(new P.Q(b))},
ax:function(a,b){var z
this.d5(a,"remove")
for(z=0;z<a.length;++z)if(J.D(a[z],b)){a.splice(z,1)
return!0}return!1},
aZ:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.h(new P.a6(a))}},
av:function(a,b){return new H.cb(a,b,[H.a0(a,0),null])},
a9:function(a,b){return H.bc(a,b,null,H.a0(a,0))},
a1:function(a,b){if(b<0||b>=a.length)return H.b(a,b)
return a[b]},
gJ:function(a){if(a.length>0)return a[0]
throw H.h(H.c5())},
bt:function(a,b,c,d,e){var z,y,x,w,v
this.bX(a,"setRange")
P.ck(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.A(P.a2(e,0,null,"skipCount",null))
y=J.z(d)
if(!!y.$isn){x=e
w=d}else{w=y.a9(d,e).az(0,!1)
x=0}y=J.N(w)
if(x+z>y.gp(w))throw H.h(H.fX())
if(x<b)for(v=z-1;v>=0;--v)a[b+v]=y.i(w,x+v)
else for(v=0;v<z;++v)a[b+v]=y.i(w,x+v)},
ao:function(a,b,c,d){return this.bt(a,b,c,d,0)},
fI:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.D(a[z],b))return z
return-1},
fH:function(a,b){return this.fI(a,b,0)},
k:function(a){return P.bw(a,"[","]")},
gW:function(a){return new J.eP(a,a.length,0,null)},
gN:function(a){return H.a8(a)},
gp:function(a){return a.length},
sp:function(a,b){this.d5(a,"set length")
if(b<0)throw H.h(P.a2(b,0,null,"newLength",null))
a.length=b},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.F(a,b))
if(b>=a.length||b<0)throw H.h(H.F(a,b))
return a[b]},
q:function(a,b,c){this.bX(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.F(a,b))
if(b>=a.length||b<0)throw H.h(H.F(a,b))
a[b]=c},
$isL:1,
$asL:I.M,
$isn:1,
$asn:null,
$isk:1,
$ask:null},
kz:{"^":"b5;$ti"},
eP:{"^":"d;a,b,c,d",
gH:function(){return this.d},
F:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.h(H.ez(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b6:{"^":"j;",
aU:function(a,b){var z
if(typeof b!=="number")throw H.h(H.S(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gc1(b)
if(this.gc1(a)===z)return 0
if(this.gc1(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gc1:function(a){return a===0?1/a<0:a<0},
d3:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.h(new P.Q(""+a+".ceil()"))},
fw:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.h(new P.Q(""+a+".floor()"))},
dz:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.h(new P.Q(""+a+".round()"))},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gN:function(a){return a&0x1FFFFFFF},
L:function(a,b){if(typeof b!=="number")throw H.h(H.S(b))
return a+b},
R:function(a,b){if(typeof b!=="number")throw H.h(H.S(b))
return a-b},
b8:function(a,b){return a/b},
C:function(a,b){if(typeof b!=="number")throw H.h(H.S(b))
return a*b},
aC:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
ak:function(a,b){return(a|0)===a?a/b|0:this.eV(a,b)},
eV:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.h(new P.Q("Result of truncating division is "+H.i(z)+": "+H.i(a)+" ~/ "+H.i(b)))},
bS:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
eT:function(a,b){return b>31?0:a>>>b},
ah:function(a,b){if(typeof b!=="number")throw H.h(H.S(b))
return a<b},
P:function(a,b){if(typeof b!=="number")throw H.h(H.S(b))
return a>b},
$isad:1},
dp:{"^":"b6;",$isa_:1,$isad:1,$isp:1},
dn:{"^":"b6;",$isa_:1,$isad:1},
bx:{"^":"j;",
eB:function(a,b){if(b>=a.length)throw H.h(H.F(a,b))
return a.charCodeAt(b)},
L:function(a,b){if(typeof b!=="string")throw H.h(P.cV(b,null,null))
return a+b},
e5:function(a,b,c){if(c==null)c=a.length
H.jy(c)
if(b<0)throw H.h(P.bF(b,null,null))
if(typeof c!=="number")return H.e(c)
if(b>c)throw H.h(P.bF(b,null,null))
if(c>a.length)throw H.h(P.bF(c,null,null))
return a.substring(b,c)},
e4:function(a,b){return this.e5(a,b,null)},
C:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.h(C.r)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
aU:function(a,b){var z
if(typeof b!=="string")throw H.h(H.S(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gN:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gp:function(a){return a.length},
i:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.h(H.F(a,b))
if(b>=a.length||b<0)throw H.h(H.F(a,b))
return a[b]},
$isL:1,
$asL:I.M,
$isar:1}}],["","",,H,{"^":"",
bR:function(a){if(a<0)H.A(P.a2(a,0,null,"count",null))
return a},
c5:function(){return new P.bH("No element")},
fX:function(){return new P.bH("Too few elements")},
ba:function(a,b,c,d){if(c-b<=32)H.hJ(a,b,c,d)
else H.hI(a,b,c,d)},
hJ:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.N(a);z<=c;++z){x=y.i(a,z)
w=z
while(!0){if(!(w>b&&J.P(d.$2(y.i(a,w-1),x),0)))break
v=w-1
y.q(a,w,y.i(a,v))
w=v}y.q(a,w,x)}},
hI:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.ak(c-b+1,6)
y=b+z
x=c-z
w=C.d.ak(b+c,2)
v=w-z
u=w+z
t=J.N(a)
s=t.i(a,y)
r=t.i(a,v)
q=t.i(a,w)
p=t.i(a,u)
o=t.i(a,x)
if(J.P(d.$2(s,r),0)){n=r
r=s
s=n}if(J.P(d.$2(p,o),0)){n=o
o=p
p=n}if(J.P(d.$2(s,q),0)){n=q
q=s
s=n}if(J.P(d.$2(r,q),0)){n=q
q=r
r=n}if(J.P(d.$2(s,p),0)){n=p
p=s
s=n}if(J.P(d.$2(q,p),0)){n=p
p=q
q=n}if(J.P(d.$2(r,o),0)){n=o
o=r
r=n}if(J.P(d.$2(r,q),0)){n=q
q=r
r=n}if(J.P(d.$2(p,o),0)){n=o
o=p
p=n}t.q(a,y,s)
t.q(a,w,q)
t.q(a,x,o)
t.q(a,v,t.i(a,b))
t.q(a,u,t.i(a,c))
m=b+1
l=c-1
if(J.D(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.i(a,k)
i=d.$2(j,r)
h=J.z(i)
if(h.E(i,0))continue
if(h.ah(i,0)){if(k!==m){t.q(a,k,t.i(a,m))
t.q(a,m,j)}++m}else for(;!0;){i=d.$2(t.i(a,l),r)
h=J.aY(i)
if(h.P(i,0)){--l
continue}else{g=l-1
if(h.ah(i,0)){t.q(a,k,t.i(a,m))
f=m+1
t.q(a,m,t.i(a,l))
t.q(a,l,j)
l=g
m=f
break}else{t.q(a,k,t.i(a,l))
t.q(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.i(a,k)
if(J.aA(d.$2(j,r),0)){if(k!==m){t.q(a,k,t.i(a,m))
t.q(a,m,j)}++m}else if(J.P(d.$2(j,p),0))for(;!0;)if(J.P(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aA(d.$2(t.i(a,l),r),0)){t.q(a,k,t.i(a,m))
f=m+1
t.q(a,m,t.i(a,l))
t.q(a,l,j)
m=f}else{t.q(a,k,t.i(a,l))
t.q(a,l,j)}l=g
break}}e=!1}h=m-1
t.q(a,b,t.i(a,h))
t.q(a,h,r)
h=l+1
t.q(a,c,t.i(a,h))
t.q(a,h,p)
H.ba(a,b,m-2,d)
H.ba(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.D(d.$2(t.i(a,m),r),0);)++m
for(;J.D(d.$2(t.i(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.i(a,k)
if(J.D(d.$2(j,r),0)){if(k!==m){t.q(a,k,t.i(a,m))
t.q(a,m,j)}++m}else if(J.D(d.$2(j,p),0))for(;!0;)if(J.D(d.$2(t.i(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.aA(d.$2(t.i(a,l),r),0)){t.q(a,k,t.i(a,m))
f=m+1
t.q(a,m,t.i(a,l))
t.q(a,l,j)
m=f}else{t.q(a,k,t.i(a,l))
t.q(a,l,j)}l=g
break}}H.ba(a,m,l,d)}else H.ba(a,m,l,d)},
k:{"^":"W;$ti",$ask:null},
an:{"^":"k;$ti",
gW:function(a){return new H.dq(this,this.gp(this),0,null)},
av:function(a,b){return new H.cb(this,b,[H.C(this,"an",0),null])},
a9:function(a,b){return H.bc(this,b,null,H.C(this,"an",0))},
az:function(a,b){var z,y,x
z=H.l([],[H.C(this,"an",0)])
C.b.sp(z,this.gp(this))
for(y=0;y<this.gp(this);++y){x=this.a1(0,y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
bn:function(a){return this.az(a,!0)}},
hS:{"^":"an;a,b,c,$ti",
geG:function(){var z,y
z=J.a5(this.a)
y=this.c
if(y==null||y>z)return z
return y},
geU:function(){var z,y
z=J.a5(this.a)
y=this.b
if(y>z)return z
return y},
gp:function(a){var z,y,x
z=J.a5(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x==null||x>=z)return z-y
if(typeof x!=="number")return x.R()
return x-y},
a1:function(a,b){var z,y
z=this.geU()+b
if(b>=0){y=this.geG()
if(typeof y!=="number")return H.e(y)
y=z>=y}else y=!0
if(y)throw H.h(P.aM(b,this,"index",null,null))
return J.cR(this.a,z)},
a9:function(a,b){var z,y
if(b<0)H.A(P.a2(b,0,null,"count",null))
z=this.b+b
y=this.c
if(y!=null&&z>=y)return new H.dd(this.$ti)
return H.bc(this.a,z,y,H.a0(this,0))},
az:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.N(y)
w=x.gp(y)
v=this.c
if(v!=null&&v<w)w=v
if(typeof w!=="number")return w.R()
u=w-z
if(u<0)u=0
t=H.l(new Array(u),this.$ti)
for(s=0;s<u;++s){r=x.a1(y,z+s)
if(s>=t.length)return H.b(t,s)
t[s]=r
if(x.gp(y)<w)throw H.h(new P.a6(this))}return t},
eo:function(a,b,c,d){var z,y
z=this.b
if(z<0)H.A(P.a2(z,0,null,"start",null))
y=this.c
if(y!=null)if(z>y)throw H.h(P.a2(z,0,y,"start",null))},
n:{
bc:function(a,b,c,d){var z=new H.hS(a,b,c,[d])
z.eo(a,b,c,d)
return z}}},
dq:{"^":"d;a,b,c,d",
gH:function(){return this.d},
F:function(){var z,y,x,w
z=this.a
y=J.N(z)
x=y.gp(z)
if(this.b!==x)throw H.h(new P.a6(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.a1(z,w);++this.c
return!0}},
ds:{"^":"W;a,b,$ti",
gW:function(a){return new H.hi(null,J.bl(this.a),this.b,this.$ti)},
gp:function(a){return J.a5(this.a)},
$asW:function(a,b){return[b]},
n:{
bA:function(a,b,c,d){if(!!a.$isk)return new H.da(a,b,[c,d])
return new H.ds(a,b,[c,d])}}},
da:{"^":"ds;a,b,$ti",$isk:1,
$ask:function(a,b){return[b]}},
hi:{"^":"dm;a,b,c,$ti",
F:function(){var z=this.b
if(z.F()){this.a=this.c.$1(z.gH())
return!0}this.a=null
return!1},
gH:function(){return this.a}},
cb:{"^":"an;a,b,$ti",
gp:function(a){return J.a5(this.a)},
a1:function(a,b){return this.b.$1(J.cR(this.a,b))},
$asan:function(a,b){return[b]},
$ask:function(a,b){return[b]},
$asW:function(a,b){return[b]}},
cm:{"^":"W;a,b,$ti",
a9:function(a,b){return new H.cm(this.a,this.b+H.bR(b),this.$ti)},
gW:function(a){return new H.hH(J.bl(this.a),this.b,this.$ti)},
n:{
dN:function(a,b,c){if(!!J.z(a).$isk)return new H.db(a,H.bR(b),[c])
return new H.cm(a,H.bR(b),[c])}}},
db:{"^":"cm;a,b,$ti",
gp:function(a){var z=J.a5(this.a)-this.b
if(z>=0)return z
return 0},
a9:function(a,b){return new H.db(this.a,this.b+H.bR(b),this.$ti)},
$isk:1,
$ask:null},
hH:{"^":"dm;a,b,$ti",
F:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.F()
this.b=0
return z.F()},
gH:function(){return this.a.gH()}},
dd:{"^":"k;$ti",
gW:function(a){return C.q},
gp:function(a){return 0},
av:function(a,b){return C.p},
a9:function(a,b){if(b<0)H.A(P.a2(b,0,null,"count",null))
return this},
az:function(a,b){var z=this.$ti
return b?H.l([],z):H.l(new Array(0),z)},
bn:function(a){return this.az(a,!0)}},
fl:{"^":"d;",
F:function(){return!1},
gH:function(){return}},
di:{"^":"d;$ti"}}],["","",,H,{"^":"",
bg:function(a,b){var z=a.aY(b)
if(!init.globalState.d.cy)init.globalState.f.ay()
return z},
ey:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.z(y).$isn)throw H.h(P.bn("Arguments to main must be a List: "+H.i(y)))
init.globalState=new H.j3(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dk()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.iC(P.ao(null,H.bf),0)
x=P.p
y.z=new H.al(0,null,null,null,null,null,0,[x,H.cA])
y.ch=new H.al(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.j2()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fQ,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.j4)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.aO(null,null,null,x)
v=new H.bG(0,null,!1)
u=new H.cA(y,new H.al(0,null,null,null,null,null,0,[x,H.bG]),w,init.createNewIsolate(),v,new H.af(H.bY()),new H.af(H.bY()),!1,!1,[],P.aO(null,null,null,null),null,null,!1,!0,P.aO(null,null,null,null))
w.v(0,0)
u.cz(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.ay(a,{func:1,args:[,]}))u.aY(new H.jU(z,a))
else if(H.ay(a,{func:1,args:[,,]}))u.aY(new H.jV(z,a))
else u.aY(a)
init.globalState.f.ay()},
fU:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.fV()
return},
fV:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.h(new P.Q("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.h(new P.Q('Cannot extract URI from "'+z+'"'))},
fQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bM(!0,[]).as(b.data)
y=J.N(z)
switch(y.i(z,"command")){case"start":init.globalState.b=y.i(z,"id")
x=y.i(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.i(z,"args")
u=new H.bM(!0,[]).as(y.i(z,"msg"))
t=y.i(z,"isSpawnUri")
s=y.i(z,"startPaused")
r=new H.bM(!0,[]).as(y.i(z,"replyTo"))
y=init.globalState.a++
q=P.p
p=P.aO(null,null,null,q)
o=new H.bG(0,null,!1)
n=new H.cA(y,new H.al(0,null,null,null,null,null,0,[q,H.bG]),p,init.createNewIsolate(),o,new H.af(H.bY()),new H.af(H.bY()),!1,!1,[],P.aO(null,null,null,null),null,null,!1,!0,P.aO(null,null,null,null))
p.v(0,0)
n.cz(0,o)
init.globalState.f.a.ai(new H.bf(n,new H.fR(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.ay()
break
case"spawn-worker":break
case"message":if(y.i(z,"port")!=null)J.aC(y.i(z,"port"),y.i(z,"msg"))
init.globalState.f.ay()
break
case"close":init.globalState.ch.ax(0,$.$get$dl().i(0,a))
a.terminate()
init.globalState.f.ay()
break
case"log":H.fP(y.i(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aN(["command","print","msg",z])
q=new H.at(!0,P.aT(null,P.p)).a8(q)
y.toString
self.postMessage(q)}else P.cM(y.i(z,"msg"))
break
case"error":throw H.h(y.i(z,"msg"))}},
fP:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aN(["command","log","msg",a])
x=new H.at(!0,P.aT(null,P.p)).a8(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.U(w)
z=H.O(w)
y=P.bv(z)
throw H.h(y)}},
fS:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dG=$.dG+("_"+y)
$.dH=$.dH+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
J.aC(f,["spawned",new H.bQ(y,x),w,z.r])
x=new H.fT(a,b,c,d,z)
if(e===!0){z.d0(w,w)
init.globalState.f.a.ai(new H.bf(z,x,"start isolate"))}else x.$0()},
jm:function(a){return new H.bM(!0,[]).as(new H.at(!1,P.aT(null,P.p)).a8(a))},
jU:{"^":"f:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
jV:{"^":"f:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
j3:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",n:{
j4:function(a){var z=P.aN(["command","print","msg",a])
return new H.at(!0,P.aT(null,P.p)).a8(z)}}},
cA:{"^":"d;a_:a>,b,c,fU:d<,fc:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
d0:function(a,b){if(!this.f.E(0,a))return
if(this.Q.v(0,b)&&!this.y)this.y=!0
this.bT()},
h8:function(a){var z,y,x
if(!this.y)return
z=this.Q
z.ax(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.b(z,-1)
x=z.pop()
init.globalState.f.a.al(x)}this.y=!1}this.bT()},
eX:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.z(a),y=0;x=this.ch,y<x.length;y+=2)if(z.E(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.b(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
h7:function(a){var z,y,x
if(this.ch==null)return
for(z=J.z(a),y=0;x=this.ch,y<x.length;y+=2)if(z.E(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.A(new P.Q("removeRange"))
P.ck(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
dV:function(a,b){if(!this.r.E(0,a))return
this.db=b},
fC:function(a,b,c){var z=J.z(b)
if(!z.E(b,0))z=z.E(b,1)&&!this.cy
else z=!0
if(z){J.aC(a,c)
return}z=this.cx
if(z==null){z=P.ao(null,null)
this.cx=z}z.ai(new H.iX(a,c))},
fB:function(a,b){var z
if(!this.r.E(0,a))return
z=J.z(b)
if(!z.E(b,0))z=z.E(b,1)&&!this.cy
else z=!0
if(z){this.c2()
return}z=this.cx
if(z==null){z=P.ao(null,null)
this.cx=z}z.ai(this.gfX())},
fD:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.cM(a)
if(b!=null)P.cM(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.Y(a)
y[1]=b==null?null:J.Y(b)
for(x=new P.ed(z,z.r,null,null),x.c=z.e;x.F();)J.aC(x.d,y)},
aY:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.U(u)
v=H.O(u)
this.fD(w,v)
if(this.db===!0){this.c2()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gfU()
if(this.cx!=null)for(;t=this.cx,!t.gam(t);)this.cx.b5().$0()}return y},
dn:function(a){return this.b.i(0,a)},
cz:function(a,b){var z=this.b
if(z.d6(a))throw H.h(P.bv("Registry: ports must be registered only once."))
z.q(0,a,b)},
bT:function(){var z=this.b
if(z.gp(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.c2()},
c2:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aI(0)
for(z=this.b,y=z.gdI(z),y=y.gW(y);y.F();)y.gH().eA()
z.aI(0)
this.c.aI(0)
init.globalState.z.ax(0,this.a)
this.dx.aI(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.b(z,v)
J.aC(w,z[v])}this.ch=null}},"$0","gfX",0,0,2]},
iX:{"^":"f:2;a,b",
$0:function(){J.aC(this.a,this.b)}},
iC:{"^":"d;a,b",
ff:function(){var z=this.a
if(z.b===z.c)return
return z.b5()},
dC:function(){var z,y,x
z=this.ff()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.d6(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gam(y)}else y=!1
else y=!1
else y=!1
if(y)H.A(P.bv("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gam(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aN(["command","close"])
x=new H.at(!0,new P.ee(0,null,null,null,null,null,0,[null,P.p])).a8(x)
y.toString
self.postMessage(x)}return!1}z.h5()
return!0},
cU:function(){if(self.window!=null)new H.iD(this).$0()
else for(;this.dC(););},
ay:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.cU()
else try{this.cU()}catch(x){z=H.U(x)
y=H.O(x)
w=init.globalState.Q
v=P.aN(["command","error","msg",H.i(z)+"\n"+H.i(y)])
v=new H.at(!0,P.aT(null,P.p)).a8(v)
w.toString
self.postMessage(v)}}},
iD:{"^":"f:2;a",
$0:function(){if(!this.a.dC())return
P.i7(C.k,this)}},
bf:{"^":"d;a,b,c",
h5:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.aY(this.b)}},
j2:{"^":"d;"},
fR:{"^":"f:0;a,b,c,d,e,f",
$0:function(){H.fS(this.a,this.b,this.c,this.d,this.e,this.f)}},
fT:{"^":"f:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.ay(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.ay(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.bT()}},
e8:{"^":"d;"},
bQ:{"^":"e8;b,a",
bq:function(a,b){var z,y,x
z=init.globalState.z.i(0,this.a)
if(z==null)return
y=this.b
if(y.gcK())return
x=H.jm(b)
if(z.gfc()===y){y=J.N(x)
switch(y.i(x,0)){case"pause":z.d0(y.i(x,1),y.i(x,2))
break
case"resume":z.h8(y.i(x,1))
break
case"add-ondone":z.eX(y.i(x,1),y.i(x,2))
break
case"remove-ondone":z.h7(y.i(x,1))
break
case"set-errors-fatal":z.dV(y.i(x,1),y.i(x,2))
break
case"ping":z.fC(y.i(x,1),y.i(x,2),y.i(x,3))
break
case"kill":z.fB(y.i(x,1),y.i(x,2))
break
case"getErrors":y=y.i(x,1)
z.dx.v(0,y)
break
case"stopErrors":y=y.i(x,1)
z.dx.ax(0,y)
break}return}init.globalState.f.a.ai(new H.bf(z,new H.j6(this,x),"receive"))},
E:function(a,b){if(b==null)return!1
return b instanceof H.bQ&&J.D(this.b,b.b)},
gN:function(a){return this.b.gbK()}},
j6:{"^":"f:0;a,b",
$0:function(){var z=this.a.b
if(!z.gcK())z.eu(this.b)}},
cB:{"^":"e8;b,c,a",
bq:function(a,b){var z,y,x
z=P.aN(["command","message","port",this,"msg",b])
y=new H.at(!0,P.aT(null,P.p)).a8(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.i(0,this.b)
if(x!=null)x.postMessage(y)}},
E:function(a,b){if(b==null)return!1
return b instanceof H.cB&&J.D(this.b,b.b)&&J.D(this.a,b.a)&&J.D(this.c,b.c)},
gN:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.dX()
y=this.a
if(typeof y!=="number")return y.dX()
x=this.c
if(typeof x!=="number")return H.e(x)
return(z<<16^y<<8^x)>>>0}},
bG:{"^":"d;bK:a<,b,cK:c<",
eA:function(){this.c=!0
this.b=null},
eu:function(a){if(this.c)return
this.b.$1(a)},
$ishv:1},
i3:{"^":"d;a,b,c",
eq:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ai(new H.bf(y,new H.i5(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.ax(new H.i6(this,b),0),a)}else throw H.h(new P.Q("Timer greater than 0."))},
n:{
i4:function(a,b){var z=new H.i3(!0,!1,null)
z.eq(a,b)
return z}}},
i5:{"^":"f:2;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
i6:{"^":"f:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
af:{"^":"d;bK:a<",
gN:function(a){var z=this.a
if(typeof z!=="number")return z.hl()
z=C.a.bS(z,0)^C.a.ak(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
E:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.af){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
at:{"^":"d;a,b",
a8:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.i(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gp(z))
z=J.z(a)
if(!!z.$isdt)return["buffer",a]
if(!!z.$isce)return["typed",a]
if(!!z.$isL)return this.dR(a)
if(!!z.$isfN){x=this.gdO()
w=a.gdk()
w=H.bA(w,x,H.C(w,"W",0),null)
w=P.bz(w,!0,H.C(w,"W",0))
z=z.gdI(a)
z=H.bA(z,x,H.C(z,"W",0),null)
return["map",w,P.bz(z,!0,H.C(z,"W",0))]}if(!!z.$ish_)return this.dS(a)
if(!!z.$isj)this.dE(a)
if(!!z.$ishv)this.b6(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbQ)return this.dT(a)
if(!!z.$iscB)return this.dU(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.b6(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaf)return["capability",a.a]
if(!(a instanceof P.d))this.dE(a)
return["dart",init.classIdExtractor(a),this.dQ(init.classFieldsExtractor(a))]},"$1","gdO",2,0,1],
b6:function(a,b){throw H.h(new P.Q((b==null?"Can't transmit:":b)+" "+H.i(a)))},
dE:function(a){return this.b6(a,null)},
dR:function(a){var z=this.dP(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.b6(a,"Can't serialize indexable: ")},
dP:function(a){var z,y,x
z=[]
C.b.sp(z,a.length)
for(y=0;y<a.length;++y){x=this.a8(a[y])
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
dQ:function(a){var z
for(z=0;z<a.length;++z)C.b.q(a,z,this.a8(a[z]))
return a},
dS:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.b6(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.b.sp(y,z.length)
for(x=0;x<z.length;++x){w=this.a8(a[z[x]])
if(x>=y.length)return H.b(y,x)
y[x]=w}return["js-object",z,y]},
dU:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
dT:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gbK()]
return["raw sendport",a]}},
bM:{"^":"d;a,b",
as:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.h(P.bn("Bad serialized message: "+H.i(a)))
switch(C.b.gJ(a)){case"ref":if(1>=a.length)return H.b(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.b(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.l(this.aX(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return H.l(this.aX(x),[null])
case"mutable":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return this.aX(x)
case"const":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
y=H.l(this.aX(x),[null])
y.fixed$length=Array
return y
case"map":return this.fi(a)
case"sendport":return this.fj(a)
case"raw sendport":if(1>=a.length)return H.b(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.fh(a)
case"function":if(1>=a.length)return H.b(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.b(a,1)
return new H.af(a[1])
case"dart":y=a.length
if(1>=y)return H.b(a,1)
w=a[1]
if(2>=y)return H.b(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.aX(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.h("couldn't deserialize: "+H.i(a))}},"$1","gfg",2,0,1],
aX:function(a){var z,y,x
z=J.N(a)
y=0
while(!0){x=z.gp(a)
if(typeof x!=="number")return H.e(x)
if(!(y<x))break
z.q(a,y,this.as(z.i(a,y)));++y}return a},
fi:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w=P.hf()
this.b.push(w)
y=J.eK(y,this.gfg()).bn(0)
for(z=J.N(y),v=J.N(x),u=0;u<z.gp(y);++u){if(u>=y.length)return H.b(y,u)
w.q(0,y[u],this.as(v.i(x,u)))}return w},
fj:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
if(3>=z)return H.b(a,3)
w=a[3]
if(J.D(y,init.globalState.b)){v=init.globalState.z.i(0,x)
if(v==null)return
u=v.dn(w)
if(u==null)return
t=new H.bQ(u,x)}else t=new H.cB(y,w,x)
this.b.push(t)
return t},
fh:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.b(a,1)
y=a[1]
if(2>=z)return H.b(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.N(y)
v=J.N(x)
u=0
while(!0){t=z.gp(y)
if(typeof t!=="number")return H.e(t)
if(!(u<t))break
w[z.i(y,u)]=this.as(v.i(x,u));++u}return w}}}],["","",,H,{"^":"",
jC:function(a){return init.types[a]},
jP:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.z(a).$isX},
i:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.Y(a)
if(typeof z!=="string")throw H.h(H.S(a))
return z},
a8:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dI:function(a){var z,y,x,w,v,u,t,s
z=J.z(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.u||!!J.z(a).$isbK){v=C.n(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.l.eB(w,0)===36)w=C.l.e4(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.et(H.bV(a),0,null),init.mangledGlobalNames)},
bE:function(a){return"Instance of '"+H.dI(a)+"'"},
ci:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.h(H.S(a))
return a[b]},
dJ:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.h(H.S(a))
a[b]=c},
e:function(a){throw H.h(H.S(a))},
b:function(a,b){if(a==null)J.a5(a)
throw H.h(H.F(a,b))},
F:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ae(!0,b,"index",null)
z=J.a5(a)
if(!(b<0)){if(typeof z!=="number")return H.e(z)
y=b>=z}else y=!0
if(y)return P.aM(b,a,"index",null,z)
return P.bF(b,"index",null)},
S:function(a){return new P.ae(!0,a,null,null)},
ep:function(a){if(typeof a!=="number")throw H.h(H.S(a))
return a},
jy:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.h(H.S(a))
return a},
h:function(a){var z
if(a==null)a=new P.cf()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.eA})
z.name=""}else z.toString=H.eA
return z},
eA:function(){return J.Y(this.dartException)},
A:function(a){throw H.h(a)},
ez:function(a){throw H.h(new P.a6(a))},
U:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jX(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.bS(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c8(H.i(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.i(y)+" (Error "+w+")"
return z.$1(new H.dy(v,null))}}if(a instanceof TypeError){u=$.$get$dT()
t=$.$get$dU()
s=$.$get$dV()
r=$.$get$dW()
q=$.$get$e_()
p=$.$get$e0()
o=$.$get$dY()
$.$get$dX()
n=$.$get$e2()
m=$.$get$e1()
l=u.aa(y)
if(l!=null)return z.$1(H.c8(y,l))
else{l=t.aa(y)
if(l!=null){l.method="call"
return z.$1(H.c8(y,l))}else{l=s.aa(y)
if(l==null){l=r.aa(y)
if(l==null){l=q.aa(y)
if(l==null){l=p.aa(y)
if(l==null){l=o.aa(y)
if(l==null){l=r.aa(y)
if(l==null){l=n.aa(y)
if(l==null){l=m.aa(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dy(y,l==null?null:l.method))}}return z.$1(new H.ib(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dO()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ae(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dO()
return a},
O:function(a){var z
if(a==null)return new H.ef(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ef(a,null)},
jS:function(a){if(a==null||typeof a!='object')return J.bk(a)
else return H.a8(a)},
jB:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
jJ:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bg(b,new H.jK(a))
case 1:return H.bg(b,new H.jL(a,d))
case 2:return H.bg(b,new H.jM(a,d,e))
case 3:return H.bg(b,new H.jN(a,d,e,f))
case 4:return H.bg(b,new H.jO(a,d,e,f,g))}throw H.h(P.bv("Unsupported number of arguments for wrapped closure"))},
ax:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jJ)
a.$identity=z
return z},
f_:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.z(c).$isn){z.$reflectionInfo=c
x=H.hx(z).r}else x=c
w=d?Object.create(new H.hK().constructor.prototype):Object.create(new H.c1(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a1
$.a1=J.V(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.d1(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.jC,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.cZ:H.c2
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.h("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d1(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
eX:function(a,b,c,d){var z=H.c2
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d1:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.eZ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eX(y,!w,z,b)
if(y===0){w=$.a1
$.a1=J.V(w,1)
u="self"+H.i(w)
w="return function(){var "+u+" = this."
v=$.aD
if(v==null){v=H.br("self")
$.aD=v}return new Function(w+H.i(v)+";return "+u+"."+H.i(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a1
$.a1=J.V(w,1)
t+=H.i(w)
w="return function("+t+"){return this."
v=$.aD
if(v==null){v=H.br("self")
$.aD=v}return new Function(w+H.i(v)+"."+H.i(z)+"("+t+");}")()},
eY:function(a,b,c,d){var z,y
z=H.c2
y=H.cZ
switch(b?-1:a){case 0:throw H.h(new H.hy("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eZ:function(a,b){var z,y,x,w,v,u,t,s
z=H.eR()
y=$.cY
if(y==null){y=H.br("receiver")
$.cY=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eY(w,!u,x,b)
if(w===1){y="return function(){return this."+H.i(z)+"."+H.i(x)+"(this."+H.i(y)+");"
u=$.a1
$.a1=J.V(u,1)
return new Function(y+H.i(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.i(z)+"."+H.i(x)+"(this."+H.i(y)+", "+s+");"
u=$.a1
$.a1=J.V(u,1)
return new Function(y+H.i(u)+"}")()},
cE:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.z(c).$isn){c.fixed$length=Array
z=c}else z=c
return H.f_(a,b,z,!!d,e,f)},
jz:function(a){var z=J.z(a)
return"$S" in z?z.$S():null},
ay:function(a,b){var z
if(a==null)return!1
z=H.jz(a)
return z==null?!1:H.es(z,b)},
jW:function(a){throw H.h(new P.fa(a))},
bY:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eq:function(a){return init.getIsolateTag(a)},
l:function(a,b){a.$ti=b
return a},
bV:function(a){if(a==null)return
return a.$ti},
er:function(a,b){return H.cN(a["$as"+H.i(b)],H.bV(a))},
C:function(a,b,c){var z=H.er(a,b)
return z==null?null:z[c]},
a0:function(a,b){var z=H.bV(a)
return z==null?null:z[b]},
az:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.et(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.i(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.az(z,b)
return H.jo(a,b)}return"unknown-reified-type"},
jo:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.az(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.az(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.az(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.jA(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.az(r[p],b)+(" "+H.i(p))}w+="}"}return"("+w+") => "+z},
et:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cn("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.M=v+", "
u=a[y]
if(u!=null)w=!1
v=z.M+=H.az(u,c)}return w?"":"<"+z.k(0)+">"},
cN:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bS:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.bV(a)
y=J.z(a)
if(y[b]==null)return!1
return H.en(H.cN(y[d],z),c)},
en:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.T(a[y],b[y]))return!1
return!0},
cF:function(a,b,c){return a.apply(b,H.er(b,c))},
T:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="bC")return!0
if('func' in b)return H.es(a,b)
if('func' in a)return b.builtin$cls==="kt"||b.builtin$cls==="d"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.az(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.en(H.cN(u,z),x)},
em:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.T(z,v)||H.T(v,z)))return!1}return!0},
jt:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.T(v,u)||H.T(u,v)))return!1}return!0},
es:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.T(z,y)||H.T(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.em(x,w,!1))return!1
if(!H.em(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.T(o,n)||H.T(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.T(o,n)||H.T(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.T(o,n)||H.T(n,o)))return!1}}return H.jt(a.named,b.named)},
ll:function(a){var z=$.cI
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
lj:function(a){return H.a8(a)},
li:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
jQ:function(a){var z,y,x,w,v,u
z=$.cI.$1(a)
y=$.bT[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bW[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.el.$2(a,z)
if(z!=null){y=$.bT[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bW[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cL(x)
$.bT[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bW[z]=x
return x}if(v==="-"){u=H.cL(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.ev(a,x)
if(v==="*")throw H.h(new P.e3(z))
if(init.leafTags[z]===true){u=H.cL(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.ev(a,x)},
ev:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bX(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cL:function(a){return J.bX(a,!1,null,!!a.$isX)},
jR:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.bX(z,!1,null,!!z.$isX)
else return J.bX(z,c,null,null)},
jH:function(){if(!0===$.cJ)return
$.cJ=!0
H.jI()},
jI:function(){var z,y,x,w,v,u,t,s
$.bT=Object.create(null)
$.bW=Object.create(null)
H.jD()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.ew.$1(v)
if(u!=null){t=H.jR(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jD:function(){var z,y,x,w,v,u,t
z=C.v()
z=H.aw(C.w,H.aw(C.x,H.aw(C.m,H.aw(C.m,H.aw(C.z,H.aw(C.y,H.aw(C.A(C.n),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cI=new H.jE(v)
$.el=new H.jF(u)
$.ew=new H.jG(t)},
aw:function(a,b){return a(b)||b},
hw:{"^":"d;a,b,c,d,e,f,r,x",n:{
hx:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hw(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
i9:{"^":"d;a,b,c,d,e,f",
aa:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
n:{
a4:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.i9(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bJ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
dZ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dy:{"^":"H;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.i(this.a)
return"NullError: method not found: '"+H.i(z)+"' on null"}},
h2:{"^":"H;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.i(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.i(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.i(this.a)+")"},
n:{
c8:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h2(a,y,z?null:b.receiver)}}},
ib:{"^":"H;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jX:{"^":"f:1;a",
$1:function(a){if(!!J.z(a).$isH)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ef:{"^":"d;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jK:{"^":"f:0;a",
$0:function(){return this.a.$0()}},
jL:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
jM:{"^":"f:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
jN:{"^":"f:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
jO:{"^":"f:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{"^":"d;",
k:function(a){return"Closure '"+H.dI(this).trim()+"'"},
gdK:function(){return this},
gdK:function(){return this}},
dQ:{"^":"f;"},
hK:{"^":"dQ;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
c1:{"^":"dQ;a,b,c,d",
E:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.c1))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gN:function(a){var z,y
z=this.c
if(z==null)y=H.a8(this.a)
else y=typeof z!=="object"?J.bk(z):H.a8(z)
z=H.a8(this.b)
if(typeof y!=="number")return y.hn()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.i(this.d)+"' of "+H.bE(z)},
n:{
c2:function(a){return a.a},
cZ:function(a){return a.c},
eR:function(){var z=$.aD
if(z==null){z=H.br("self")
$.aD=z}return z},
br:function(a){var z,y,x,w,v
z=new H.c1("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
hy:{"^":"H;a",
k:function(a){return"RuntimeError: "+H.i(this.a)}},
al:{"^":"d;a,b,c,d,e,f,r,$ti",
gp:function(a){return this.a},
gam:function(a){return this.a===0},
gdk:function(){return new H.hd(this,[H.a0(this,0)])},
gdI:function(a){return H.bA(this.gdk(),new H.h1(this),H.a0(this,0),H.a0(this,1))},
d6:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.eE(z,a)}else return this.fP(a)},
fP:function(a){var z=this.d
if(z==null)return!1
return this.b1(this.bf(z,this.b0(a)),a)>=0},
i:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aS(z,b)
return y==null?null:y.gau()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aS(x,b)
return y==null?null:y.gau()}else return this.fQ(b)},
fQ:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bf(z,this.b0(a))
x=this.b1(y,a)
if(x<0)return
return y[x].gau()},
q:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.bN()
this.b=z}this.cv(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bN()
this.c=y}this.cv(y,b,c)}else{x=this.d
if(x==null){x=this.bN()
this.d=x}w=this.b0(b)
v=this.bf(x,w)
if(v==null)this.bR(x,w,[this.bO(b,c)])
else{u=this.b1(v,b)
if(u>=0)v[u].sau(c)
else v.push(this.bO(b,c))}}},
ax:function(a,b){if(typeof b==="string")return this.cS(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cS(this.c,b)
else return this.fR(b)},
fR:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bf(z,this.b0(a))
x=this.b1(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cZ(w)
return w.gau()},
aI:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aZ:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.h(new P.a6(this))
z=z.c}},
cv:function(a,b,c){var z=this.aS(a,b)
if(z==null)this.bR(a,b,this.bO(b,c))
else z.sau(c)},
cS:function(a,b){var z
if(a==null)return
z=this.aS(a,b)
if(z==null)return
this.cZ(z)
this.cG(a,b)
return z.gau()},
bO:function(a,b){var z,y
z=new H.hc(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cZ:function(a){var z,y
z=a.geP()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
b0:function(a){return J.bk(a)&0x3ffffff},
b1:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.D(a[y].gde(),b))return y
return-1},
k:function(a){return P.hj(this)},
aS:function(a,b){return a[b]},
bf:function(a,b){return a[b]},
bR:function(a,b,c){a[b]=c},
cG:function(a,b){delete a[b]},
eE:function(a,b){return this.aS(a,b)!=null},
bN:function(){var z=Object.create(null)
this.bR(z,"<non-identifier-key>",z)
this.cG(z,"<non-identifier-key>")
return z},
$isfN:1},
h1:{"^":"f:1;a",
$1:function(a){return this.a.i(0,a)}},
hc:{"^":"d;de:a<,au:b@,c,eP:d<"},
hd:{"^":"k;a,$ti",
gp:function(a){return this.a.a},
gW:function(a){var z,y
z=this.a
y=new H.he(z,z.r,null,null)
y.c=z.e
return y}},
he:{"^":"d;a,b,c,d",
gH:function(){return this.d},
F:function(){var z=this.a
if(this.b!==z.r)throw H.h(new P.a6(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jE:{"^":"f:1;a",
$1:function(a){return this.a(a)}},
jF:{"^":"f:7;a",
$2:function(a,b){return this.a(a,b)}},
jG:{"^":"f:8;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
jA:function(a){var z=H.l(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
jT:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
c:function(a){return a},
bB:function(a){return new Float32Array(H.c(a))},
dt:{"^":"j;",$isdt:1,"%":"ArrayBuffer"},
ce:{"^":"j;",$isce:1,"%":"DataView;ArrayBufferView;cc|du|dw|cd|dv|dx|a7"},
cc:{"^":"ce;",
gp:function(a){return a.length},
$isX:1,
$asX:I.M,
$isL:1,
$asL:I.M},
cd:{"^":"dw;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
a[b]=c}},
du:{"^":"cc+aP;",$asX:I.M,$asL:I.M,
$asn:function(){return[P.a_]},
$ask:function(){return[P.a_]},
$isn:1,
$isk:1},
dw:{"^":"du+di;",$asX:I.M,$asL:I.M,
$asn:function(){return[P.a_]},
$ask:function(){return[P.a_]}},
a7:{"^":"dx;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
a[b]=c},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]}},
dv:{"^":"cc+aP;",$asX:I.M,$asL:I.M,
$asn:function(){return[P.p]},
$ask:function(){return[P.p]},
$isn:1,
$isk:1},
dx:{"^":"dv+di;",$asX:I.M,$asL:I.M,
$asn:function(){return[P.p]},
$ask:function(){return[P.p]}},
kG:{"^":"cd;",$isn:1,
$asn:function(){return[P.a_]},
$isk:1,
$ask:function(){return[P.a_]},
"%":"Float32Array"},
kH:{"^":"cd;",$isn:1,
$asn:function(){return[P.a_]},
$isk:1,
$ask:function(){return[P.a_]},
"%":"Float64Array"},
kI:{"^":"a7;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"Int16Array"},
kJ:{"^":"a7;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"Int32Array"},
kK:{"^":"a7;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"Int8Array"},
kL:{"^":"a7;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"Uint16Array"},
kM:{"^":"a7;",
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"Uint32Array"},
kN:{"^":"a7;",
gp:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kO:{"^":"a7;",
gp:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)H.A(H.F(a,b))
return a[b]},
$isn:1,
$asn:function(){return[P.p]},
$isk:1,
$ask:function(){return[P.p]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
iq:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.ju()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.ax(new P.is(z),1)).observe(y,{childList:true})
return new P.ir(z,y,x)}else if(self.setImmediate!=null)return P.jv()
return P.jw()},
l7:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.ax(new P.it(a),0))},"$1","ju",2,0,5],
l8:[function(a){++init.globalState.f.b
self.setImmediate(H.ax(new P.iu(a),0))},"$1","jv",2,0,5],
l9:[function(a){P.cu(C.k,a)},"$1","jw",2,0,5],
eg:function(a,b){if(H.ay(a,{func:1,args:[P.bC,P.bC]})){b.toString
return a}else{b.toString
return a}},
fr:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
y=new P.R(0,$.u,null,[P.n])
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.ft(z,!1,b,y)
try{for(s=a.length,r=0;r<a.length;a.length===s||(0,H.ez)(a),++r){w=a[r]
v=z.b
w.ce(new P.fs(z,!1,b,y,v),x);++z.b}s=z.b
if(s===0){s=new P.R(0,$.u,null,[null])
s.ex(C.C)
return s}q=new Array(s)
q.fixed$length=Array
z.a=q}catch(p){u=H.U(p)
t=H.O(p)
if(z.b===0||!1){o=u
if(o==null)o=new P.cf()
s=$.u
if(s!==C.c)s.toString
s=new P.R(0,s,null,[null])
s.ey(o,t)
return s}else{z.c=u
z.d=t}}return y},
jn:function(a,b,c){$.u.toString
a.aj(b,c)},
jq:function(){var z,y
for(;z=$.au,z!=null;){$.aV=null
y=z.b
$.au=y
if(y==null)$.aU=null
z.a.$0()}},
lh:[function(){$.cC=!0
try{P.jq()}finally{$.aV=null
$.cC=!1
if($.au!=null)$.$get$cz().$1(P.eo())}},"$0","eo",0,0,2],
ek:function(a){var z=new P.e7(a,null)
if($.au==null){$.aU=z
$.au=z
if(!$.cC)$.$get$cz().$1(P.eo())}else{$.aU.b=z
$.aU=z}},
js:function(a){var z,y,x
z=$.au
if(z==null){P.ek(a)
$.aV=$.aU
return}y=new P.e7(a,null)
x=$.aV
if(x==null){y.b=z
$.aV=y
$.au=y}else{y.b=x.b
x.b=y
$.aV=y
if(y.b==null)$.aU=y}},
ex:function(a){var z=$.u
if(C.c===z){P.av(null,null,C.c,a)
return}z.toString
P.av(null,null,z,z.bV(a,!0))},
jk:function(a,b,c){var z=a.bW()
if(!!J.z(z).$isZ&&z!==$.$get$b4())z.cg(new P.jl(b,c))
else b.aF(c)},
jj:function(a,b,c){$.u.toString
a.bz(b,c)},
i7:function(a,b){var z=$.u
if(z===C.c){z.toString
return P.cu(a,b)}return P.cu(a,z.bV(b,!0))},
cu:function(a,b){var z=C.d.ak(a.a,1000)
return H.i4(z<0?0:z,b)},
bh:function(a,b,c,d,e){var z={}
z.a=d
P.js(new P.jr(z,e))},
eh:function(a,b,c,d){var z,y
y=$.u
if(y===c)return d.$0()
$.u=c
z=y
try{y=d.$0()
return y}finally{$.u=z}},
ej:function(a,b,c,d,e){var z,y
y=$.u
if(y===c)return d.$1(e)
$.u=c
z=y
try{y=d.$1(e)
return y}finally{$.u=z}},
ei:function(a,b,c,d,e,f){var z,y
y=$.u
if(y===c)return d.$2(e,f)
$.u=c
z=y
try{y=d.$2(e,f)
return y}finally{$.u=z}},
av:function(a,b,c,d){var z=C.c!==c
if(z)d=c.bV(d,!(!z||!1))
P.ek(d)},
is:{"^":"f:1;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ir:{"^":"f:9;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
it:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iu:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
Z:{"^":"d;$ti"},
ft:{"^":"f:4;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.b)this.d.aj(a,b)
else{z.c=a
z.d=b}}else if(y===0&&!this.b)this.d.aj(z.c,z.d)}},
fs:{"^":"f;a,b,c,d,e",
$1:function(a){var z,y,x
z=this.a
y=--z.b
x=z.a
if(x!=null){z=this.e
if(z<0||z>=x.length)return H.b(x,z)
x[z]=a
if(y===0)this.d.cE(x)}else if(z.b===0&&!this.b)this.d.aj(z.c,z.d)},
$S:function(){return{func:1,args:[,]}}},
ix:{"^":"d;$ti"},
jh:{"^":"ix;a,$ti"},
eb:{"^":"d;bP:a<,b,c,d,e",
geW:function(){return this.b.b},
gdd:function(){return(this.c&1)!==0},
gfG:function(){return(this.c&2)!==0},
gdc:function(){return this.c===8},
fE:function(a){return this.b.b.cb(this.d,a)},
fZ:function(a){if(this.c!==6)return!0
return this.b.b.cb(this.d,J.b0(a))},
fz:function(a){var z,y,x
z=this.e
y=J.m(a)
x=this.b.b
if(H.ay(z,{func:1,args:[,,]}))return x.hb(z,y.gat(a),a.gap())
else return x.cb(z,y.gat(a))},
fF:function(){return this.b.b.dA(this.d)}},
R:{"^":"d;bi:a<,b,eS:c<,$ti",
geN:function(){return this.a===2},
gbM:function(){return this.a>=4},
ce:function(a,b){var z,y
z=$.u
if(z!==C.c){z.toString
if(b!=null)b=P.eg(b,z)}y=new P.R(0,z,null,[null])
this.bA(new P.eb(null,y,b==null?1:3,a,b))
return y},
cd:function(a){return this.ce(a,null)},
cg:function(a){var z,y
z=$.u
y=new P.R(0,z,null,this.$ti)
if(z!==C.c)z.toString
this.bA(new P.eb(null,y,8,a,null))
return y},
bA:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gbM()){y.bA(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.av(null,null,z,new P.iK(this,a))}},
cR:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gbP()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gbM()){v.cR(a)
return}this.a=v.a
this.c=v.c}z.a=this.bh(a)
y=this.b
y.toString
P.av(null,null,y,new P.iR(z,this))}},
bg:function(){var z=this.c
this.c=null
return this.bh(z)},
bh:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gbP()
z.a=y}return y},
aF:function(a){var z,y
z=this.$ti
if(H.bS(a,"$isZ",z,"$asZ"))if(H.bS(a,"$isR",z,null))P.bO(a,this)
else P.ec(a,this)
else{y=this.bg()
this.a=4
this.c=a
P.as(this,y)}},
cE:function(a){var z=this.bg()
this.a=4
this.c=a
P.as(this,z)},
aj:[function(a,b){var z=this.bg()
this.a=8
this.c=new P.bo(a,b)
P.as(this,z)},function(a){return this.aj(a,null)},"hp","$2","$1","gbG",2,2,10,0],
ex:function(a){var z
if(H.bS(a,"$isZ",this.$ti,"$asZ")){this.ez(a)
return}this.a=1
z=this.b
z.toString
P.av(null,null,z,new P.iM(this,a))},
ez:function(a){var z
if(H.bS(a,"$isR",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.av(null,null,z,new P.iQ(this,a))}else P.bO(a,this)
return}P.ec(a,this)},
ey:function(a,b){var z
this.a=1
z=this.b
z.toString
P.av(null,null,z,new P.iL(this,a,b))},
$isZ:1,
n:{
iJ:function(a,b){var z=new P.R(0,$.u,null,[b])
z.a=4
z.c=a
return z},
ec:function(a,b){var z,y,x
b.a=1
try{a.ce(new P.iN(b),new P.iO(b))}catch(x){z=H.U(x)
y=H.O(x)
P.ex(new P.iP(b,z,y))}},
bO:function(a,b){var z,y,x
for(;a.geN();)a=a.c
z=a.gbM()
y=b.c
if(z){b.c=null
x=b.bh(y)
b.a=a.a
b.c=a.c
P.as(b,x)}else{b.a=2
b.c=a
a.cR(y)}},
as:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.b0(v)
t=v.gap()
y.toString
P.bh(null,null,y,u,t)}return}for(;b.gbP()!=null;b=s){s=b.a
b.a=null
P.as(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gdd()||b.gdc()){q=b.geW()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=J.b0(v)
t=v.gap()
y.toString
P.bh(null,null,y,u,t)
return}p=$.u
if(p==null?q!=null:p!==q)$.u=q
else p=null
if(b.gdc())new P.iU(z,x,w,b).$0()
else if(y){if(b.gdd())new P.iT(x,b,r).$0()}else if(b.gfG())new P.iS(z,x,b).$0()
if(p!=null)$.u=p
y=x.b
if(!!J.z(y).$isZ){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.bh(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.bO(y,o)
return}}o=b.b
b=o.bg()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
iK:{"^":"f:0;a,b",
$0:function(){P.as(this.a,this.b)}},
iR:{"^":"f:0;a,b",
$0:function(){P.as(this.b,this.a.a)}},
iN:{"^":"f:1;a",
$1:function(a){var z=this.a
z.a=0
z.aF(a)}},
iO:{"^":"f:11;a",
$2:function(a,b){this.a.aj(a,b)},
$1:function(a){return this.$2(a,null)}},
iP:{"^":"f:0;a,b,c",
$0:function(){this.a.aj(this.b,this.c)}},
iM:{"^":"f:0;a,b",
$0:function(){this.a.cE(this.b)}},
iQ:{"^":"f:0;a,b",
$0:function(){P.bO(this.b,this.a)}},
iL:{"^":"f:0;a,b,c",
$0:function(){this.a.aj(this.b,this.c)}},
iU:{"^":"f:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.fF()}catch(w){y=H.U(w)
x=H.O(w)
if(this.c){v=J.b0(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bo(y,x)
u.a=!0
return}if(!!J.z(z).$isZ){if(z instanceof P.R&&z.gbi()>=4){if(z.gbi()===8){v=this.b
v.b=z.geS()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.cd(new P.iV(t))
v.a=!1}}},
iV:{"^":"f:1;a",
$1:function(a){return this.a}},
iT:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.fE(this.c)}catch(x){z=H.U(x)
y=H.O(x)
w=this.a
w.b=new P.bo(z,y)
w.a=!0}}},
iS:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.fZ(z)===!0&&w.e!=null){v=this.b
v.b=w.fz(z)
v.a=!1}}catch(u){y=H.U(u)
x=H.O(u)
w=this.a
v=J.b0(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.bo(y,x)
s.a=!0}}},
e7:{"^":"d;a,b"},
a3:{"^":"d;$ti",
av:function(a,b){return new P.j5(b,this,[H.C(this,"a3",0),null])},
gp:function(a){var z,y
z={}
y=new P.R(0,$.u,null,[P.p])
z.a=0
this.aN(new P.hO(z),!0,new P.hP(z,y),y.gbG())
return y},
bn:function(a){var z,y,x
z=H.C(this,"a3",0)
y=H.l([],[z])
x=new P.R(0,$.u,null,[[P.n,z]])
this.aN(new P.hQ(this,y),!0,new P.hR(y,x),x.gbG())
return x},
a9:function(a,b){if(b<0)H.A(P.bn(b))
return new P.je(b,this,[H.C(this,"a3",0)])},
gJ:function(a){var z,y
z={}
y=new P.R(0,$.u,null,[H.C(this,"a3",0)])
z.a=null
z.a=this.aN(new P.hM(z,this,y),!0,new P.hN(y),y.gbG())
return y}},
hO:{"^":"f:1;a",
$1:function(a){++this.a.a}},
hP:{"^":"f:0;a,b",
$0:function(){this.b.aF(this.a.a)}},
hQ:{"^":"f;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.cF(function(a){return{func:1,args:[a]}},this.a,"a3")}},
hR:{"^":"f:0;a,b",
$0:function(){this.b.aF(this.a)}},
hM:{"^":"f;a,b,c",
$1:function(a){P.jk(this.a.a,this.c,a)},
$S:function(){return H.cF(function(a){return{func:1,args:[a]}},this.b,"a3")}},
hN:{"^":"f:0;a",
$0:function(){var z,y,x,w
try{x=H.c5()
throw H.h(x)}catch(w){z=H.U(w)
y=H.O(w)
P.jn(this.a,z,y)}}},
hL:{"^":"d;"},
bd:{"^":"d;bi:e<,$ti",
c7:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.d2()
if((z&4)===0&&(this.e&32)===0)this.cJ(this.gcN())},
ds:function(a){return this.c7(a,null)},
dv:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gam(z)}else z=!1
if(z)this.r.bp(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cJ(this.gcP())}}}},
bW:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.bD()
z=this.f
return z==null?$.$get$b4():z},
bD:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.d2()
if((this.e&32)===0)this.r=null
this.f=this.cM()},
bb:["e9",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.cV(a)
else this.bB(new P.iy(a,null,[H.C(this,"bd",0)]))}],
bz:["ea",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.cX(a,b)
else this.bB(new P.iA(a,b,null))}],
ew:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.cW()
else this.bB(C.t)},
cO:[function(){},"$0","gcN",0,0,2],
cQ:[function(){},"$0","gcP",0,0,2],
cM:function(){return},
bB:function(a){var z,y
z=this.r
if(z==null){z=new P.jg(null,null,0,[H.C(this,"bd",0)])
this.r=z}z.v(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bp(this)}},
cV:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cc(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bE((z&4)!==0)},
cX:function(a,b){var z,y
z=this.e
y=new P.iw(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bD()
z=this.f
if(!!J.z(z).$isZ&&z!==$.$get$b4())z.cg(y)
else y.$0()}else{y.$0()
this.bE((z&4)!==0)}},
cW:function(){var z,y
z=new P.iv(this)
this.bD()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.z(y).$isZ&&y!==$.$get$b4())y.cg(z)
else z.$0()},
cJ:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bE((z&4)!==0)},
bE:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gam(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gam(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.cO()
else this.cQ()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bp(this)},
ct:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.eg(b,z)
this.c=c}},
iw:{"^":"f:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.ay(y,{func:1,args:[P.d,P.bb]})
w=z.d
v=this.b
u=z.b
if(x)w.hc(u,v,this.c)
else w.cc(u,v)
z.e=(z.e&4294967263)>>>0}},
iv:{"^":"f:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dB(z.c)
z.e=(z.e&4294967263)>>>0}},
e9:{"^":"d;b3:a@"},
iy:{"^":"e9;b,a,$ti",
c8:function(a){a.cV(this.b)}},
iA:{"^":"e9;at:b>,ap:c<,a",
c8:function(a){a.cX(this.b,this.c)}},
iz:{"^":"d;",
c8:function(a){a.cW()},
gb3:function(){return},
sb3:function(a){throw H.h(new P.bH("No events after a done."))}},
j7:{"^":"d;bi:a<",
bp:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.ex(new P.j8(this,a))
this.a=1},
d2:function(){if(this.a===1)this.a=3}},
j8:{"^":"f:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gb3()
z.b=w
if(w==null)z.c=null
x.c8(this.b)}},
jg:{"^":"j7;b,c,a,$ti",
gam:function(a){return this.c==null},
v:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sb3(b)
this.c=b}}},
jl:{"^":"f:0;a,b",
$0:function(){return this.a.aF(this.b)}},
be:{"^":"a3;$ti",
aN:function(a,b,c,d){return this.cF(a,d,c,!0===b)},
dm:function(a,b,c){return this.aN(a,null,b,c)},
cF:function(a,b,c,d){return P.iI(this,a,b,c,d,H.C(this,"be",0),H.C(this,"be",1))},
bJ:function(a,b){b.bb(a)},
eL:function(a,b,c){c.bz(a,b)},
$asa3:function(a,b){return[b]}},
bN:{"^":"bd;x,y,a,b,c,d,e,f,r,$ti",
bb:function(a){if((this.e&2)!==0)return
this.e9(a)},
bz:function(a,b){if((this.e&2)!==0)return
this.ea(a,b)},
cO:[function(){var z=this.y
if(z==null)return
z.ds(0)},"$0","gcN",0,0,2],
cQ:[function(){var z=this.y
if(z==null)return
z.dv()},"$0","gcP",0,0,2],
cM:function(){var z=this.y
if(z!=null){this.y=null
return z.bW()}return},
hq:[function(a){this.x.bJ(a,this)},"$1","geI",2,0,function(){return H.cF(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"bN")}],
hs:[function(a,b){this.x.eL(a,b,this)},"$2","geK",4,0,12],
hr:[function(){this.ew()},"$0","geJ",0,0,2],
cu:function(a,b,c,d,e,f,g){this.y=this.x.a.dm(this.geI(),this.geJ(),this.geK())},
$asbd:function(a,b){return[b]},
n:{
iI:function(a,b,c,d,e,f,g){var z,y
z=$.u
y=e?1:0
y=new P.bN(a,null,null,null,null,z,y,null,null,[f,g])
y.ct(b,c,d,e,g)
y.cu(a,b,c,d,e,f,g)
return y}}},
j5:{"^":"be;b,a,$ti",
bJ:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.U(w)
x=H.O(w)
P.jj(b,y,x)
return}b.bb(z)}},
jf:{"^":"bN;z,x,y,a,b,c,d,e,f,r,$ti",
geF:function(){return this.z},
$asbN:function(a){return[a,a]},
$asbd:null},
je:{"^":"be;b,a,$ti",
cF:function(a,b,c,d){var z,y,x
z=H.a0(this,0)
y=$.u
x=d?1:0
x=new P.jf(this.b,this,null,null,null,null,y,x,null,null,this.$ti)
x.ct(a,b,c,d,z)
x.cu(this,a,b,c,d,z,z)
return x},
bJ:function(a,b){var z=b.geF()
if(z>0){b.z=z-1
return}b.bb(a)},
$asbe:function(a){return[a,a]},
$asa3:null},
bo:{"^":"d;at:a>,ap:b<",
k:function(a){return H.i(this.a)},
$isH:1},
ji:{"^":"d;"},
jr:{"^":"f:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cf()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.h(z)
x=H.h(z)
x.stack=J.Y(y)
throw x}},
ja:{"^":"ji;",
dB:function(a){var z,y,x,w
try{if(C.c===$.u){x=a.$0()
return x}x=P.eh(null,null,this,a)
return x}catch(w){z=H.U(w)
y=H.O(w)
x=P.bh(null,null,this,z,y)
return x}},
cc:function(a,b){var z,y,x,w
try{if(C.c===$.u){x=a.$1(b)
return x}x=P.ej(null,null,this,a,b)
return x}catch(w){z=H.U(w)
y=H.O(w)
x=P.bh(null,null,this,z,y)
return x}},
hc:function(a,b,c){var z,y,x,w
try{if(C.c===$.u){x=a.$2(b,c)
return x}x=P.ei(null,null,this,a,b,c)
return x}catch(w){z=H.U(w)
y=H.O(w)
x=P.bh(null,null,this,z,y)
return x}},
bV:function(a,b){if(b)return new P.jb(this,a)
else return new P.jc(this,a)},
f1:function(a,b){return new P.jd(this,a)},
i:function(a,b){return},
dA:function(a){if($.u===C.c)return a.$0()
return P.eh(null,null,this,a)},
cb:function(a,b){if($.u===C.c)return a.$1(b)
return P.ej(null,null,this,a,b)},
hb:function(a,b,c){if($.u===C.c)return a.$2(b,c)
return P.ei(null,null,this,a,b,c)}},
jb:{"^":"f:0;a,b",
$0:function(){return this.a.dB(this.b)}},
jc:{"^":"f:0;a,b",
$0:function(){return this.a.dA(this.b)}},
jd:{"^":"f:1;a,b",
$1:function(a){return this.a.cc(this.b,a)}}}],["","",,P,{"^":"",
hf:function(){return new H.al(0,null,null,null,null,null,0,[null,null])},
aN:function(a){return H.jB(a,new H.al(0,null,null,null,null,null,0,[null,null]))},
fW:function(a,b,c){var z,y
if(P.cD(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aW()
y.push(a)
try{P.jp(a,z)}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=P.dP(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bw:function(a,b,c){var z,y,x
if(P.cD(a))return b+"..."+c
z=new P.cn(b)
y=$.$get$aW()
y.push(a)
try{x=z
x.M=P.dP(x.gM(),a,", ")}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=z
y.M=y.gM()+c
y=z.gM()
return y.charCodeAt(0)==0?y:y},
cD:function(a){var z,y
for(z=0;y=$.$get$aW(),z<y.length;++z)if(a===y[z])return!0
return!1},
jp:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gW(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.F())return
w=H.i(z.gH())
b.push(w)
y+=w.length+2;++x}if(!z.F()){if(x<=5)return
if(0>=b.length)return H.b(b,-1)
v=b.pop()
if(0>=b.length)return H.b(b,-1)
u=b.pop()}else{t=z.gH();++x
if(!z.F()){if(x<=4){b.push(H.i(t))
return}v=H.i(t)
if(0>=b.length)return H.b(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gH();++x
for(;z.F();t=s,s=r){r=z.gH();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.i(t)
v=H.i(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aO:function(a,b,c,d){return new P.iZ(0,null,null,null,null,null,0,[d])},
hj:function(a){var z,y,x
z={}
if(P.cD(a))return"{...}"
y=new P.cn("")
try{$.$get$aW().push(a)
x=y
x.M=x.gM()+"{"
z.a=!0
a.aZ(0,new P.hk(z,y))
z=y
z.M=z.gM()+"}"}finally{z=$.$get$aW()
if(0>=z.length)return H.b(z,-1)
z.pop()}z=y.gM()
return z.charCodeAt(0)==0?z:z},
ee:{"^":"al;a,b,c,d,e,f,r,$ti",
b0:function(a){return H.jS(a)&0x3ffffff},
b1:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gde()
if(x==null?b==null:x===b)return y}return-1},
n:{
aT:function(a,b){return new P.ee(0,null,null,null,null,null,0,[a,b])}}},
iZ:{"^":"iW;a,b,c,d,e,f,r,$ti",
gW:function(a){var z=new P.ed(this,this.r,null,null)
z.c=this.e
return z},
gp:function(a){return this.a},
aV:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.eD(b)},
eD:function(a){var z=this.d
if(z==null)return!1
return this.be(z[this.bc(a)],a)>=0},
dn:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.aV(0,a)?a:null
else return this.eO(a)},
eO:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bc(a)]
x=this.be(y,a)
if(x<0)return
return J.y(y,x).gcH()},
v:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.cB(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.cB(x,b)}else return this.ai(b)},
ai:function(a){var z,y,x
z=this.d
if(z==null){z=P.j0()
this.d=z}y=this.bc(a)
x=z[y]
if(x==null)z[y]=[this.bF(a)]
else{if(this.be(x,a)>=0)return!1
x.push(this.bF(a))}return!0},
ax:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.cC(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.cC(this.c,b)
else return this.eQ(b)},
eQ:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bc(a)]
x=this.be(y,a)
if(x<0)return!1
this.cD(y.splice(x,1)[0])
return!0},
aI:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cB:function(a,b){if(a[b]!=null)return!1
a[b]=this.bF(b)
return!0},
cC:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.cD(z)
delete a[b]
return!0},
bF:function(a){var z,y
z=new P.j_(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
cD:function(a){var z,y
z=a.geC()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bc:function(a){return J.bk(a)&0x3ffffff},
be:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.D(a[y].gcH(),b))return y
return-1},
$isk:1,
$ask:null,
n:{
j0:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
j_:{"^":"d;cH:a<,b,eC:c<"},
ed:{"^":"d;a,b,c,d",
gH:function(){return this.d},
F:function(){var z=this.a
if(this.b!==z.r)throw H.h(new P.a6(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
iW:{"^":"hA;$ti"},
aP:{"^":"d;$ti",
gW:function(a){return new H.dq(a,this.gp(a),0,null)},
a1:function(a,b){return this.i(a,b)},
av:function(a,b){return new H.cb(a,b,[H.C(a,"aP",0),null])},
a9:function(a,b){return H.bc(a,b,null,H.C(a,"aP",0))},
k:function(a){return P.bw(a,"[","]")},
$isn:1,
$asn:null,
$isk:1,
$ask:null},
hk:{"^":"f:4;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.M+=", "
z.a=!1
z=this.b
y=z.M+=H.i(a)
z.M=y+": "
z.M+=H.i(b)}},
hg:{"^":"an;a,b,c,d,$ti",
gW:function(a){return new P.j1(this,this.c,this.d,this.b,null)},
gam:function(a){return this.b===this.c},
gp:function(a){return(this.c-this.b&this.a.length-1)>>>0},
a1:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.A(P.aM(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.b(y,w)
return y[w]},
aI:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.b(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.bw(this,"{","}")},
al:function(a){var z,y,x
z=this.b
y=this.a
x=y.length
z=(z-1&x-1)>>>0
this.b=z
if(z<0||z>=x)return H.b(y,z)
y[z]=a
if(z===this.c)this.cI();++this.d},
b5:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.h(H.c5());++this.d
y=this.a
x=y.length
if(z>=x)return H.b(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ai:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.b(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.cI();++this.d},
cI:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.l(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.b.bt(y,0,w,z,x)
C.b.bt(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
ej:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.l(z,[b])},
$ask:null,
n:{
ao:function(a,b){var z=new P.hg(null,0,0,0,[b])
z.ej(a,b)
return z}}},
j1:{"^":"d;a,b,c,d,e",
gH:function(){return this.e},
F:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.A(new P.a6(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.b(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
hB:{"^":"d;$ti",
av:function(a,b){return new H.da(this,b,[H.a0(this,0),null])},
k:function(a){return P.bw(this,"{","}")},
a9:function(a,b){return H.dN(this,b,H.a0(this,0))},
$isk:1,
$ask:null},
hA:{"^":"hB;$ti"}}],["","",,P,{"^":"",
de:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.Y(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fm(a)},
fm:function(a){var z=J.z(a)
if(!!z.$isf)return z.k(a)
return H.bE(a)},
bv:function(a){return new P.iH(a)},
bz:function(a,b,c){var z,y
z=H.l([],[c])
for(y=J.bl(a);y.F();)z.push(y.gH())
if(b)return z
z.fixed$length=Array
return z},
ap:function(a,b,c,d){var z,y,x
z=H.l([],[d])
C.b.sp(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.b(z,y)
z[y]=x}return z},
cM:function(a){H.jT(H.i(a))},
jx:{"^":"d;",
gN:function(a){return P.d.prototype.gN.call(this,this)},
k:function(a){return this?"true":"false"}},
"+bool":0,
a_:{"^":"ad;"},
"+double":0,
aH:{"^":"d;aQ:a<",
L:function(a,b){return new P.aH(this.a+b.gaQ())},
R:function(a,b){return new P.aH(this.a-b.gaQ())},
C:function(a,b){return new P.aH(C.a.dz(this.a*b))},
ah:function(a,b){return this.a<b.gaQ()},
P:function(a,b){return C.d.P(this.a,b.gaQ())},
E:function(a,b){if(b==null)return!1
if(!(b instanceof P.aH))return!1
return this.a===b.a},
gN:function(a){return this.a&0x1FFFFFFF},
aU:function(a,b){return C.d.aU(this.a,b.gaQ())},
k:function(a){var z,y,x,w,v
z=new P.fi()
y=this.a
if(y<0)return"-"+new P.aH(0-y).k(0)
x=z.$1(C.d.ak(y,6e7)%60)
w=z.$1(C.d.ak(y,1e6)%60)
v=new P.fh().$1(y%1e6)
return""+C.d.ak(y,36e8)+":"+H.i(x)+":"+H.i(w)+"."+H.i(v)}},
fh:{"^":"f:6;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fi:{"^":"f:6;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
H:{"^":"d;",
gap:function(){return H.O(this.$thrownJsError)}},
cf:{"^":"H;",
k:function(a){return"Throw of null."}},
ae:{"^":"H;a,b,c,d",
gbI:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbH:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.i(z)
w=this.gbI()+y+x
if(!this.a)return w
v=this.gbH()
u=P.de(this.b)
return w+v+": "+H.i(u)},
n:{
bn:function(a){return new P.ae(!1,null,null,a)},
cV:function(a,b,c){return new P.ae(!0,a,b,c)}}},
cj:{"^":"ae;e,f,a,b,c,d",
gbI:function(){return"RangeError"},
gbH:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.i(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.i(z)
else if(x>z)y=": Not in range "+H.i(z)+".."+H.i(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.i(z)}return y},
n:{
hu:function(a){return new P.cj(null,null,!1,null,null,a)},
bF:function(a,b,c){return new P.cj(null,null,!0,a,b,"Value not in range")},
a2:function(a,b,c,d,e){return new P.cj(b,c,!0,a,d,"Invalid value")},
ck:function(a,b,c,d,e,f){if(0>a||a>c)throw H.h(P.a2(a,0,c,"start",f))
if(a>b||b>c)throw H.h(P.a2(b,a,c,"end",f))
return b}}},
fI:{"^":"ae;e,p:f>,a,b,c,d",
gbI:function(){return"RangeError"},
gbH:function(){if(J.aA(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.i(z)},
n:{
aM:function(a,b,c,d,e){var z=e!=null?e:J.a5(b)
return new P.fI(b,z,!0,a,c,"Index out of range")}}},
Q:{"^":"H;a",
k:function(a){return"Unsupported operation: "+this.a}},
e3:{"^":"H;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.i(z):"UnimplementedError"}},
bH:{"^":"H;a",
k:function(a){return"Bad state: "+this.a}},
a6:{"^":"H;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.i(P.de(z))+"."}},
ho:{"^":"d;",
k:function(a){return"Out of Memory"},
gap:function(){return},
$isH:1},
dO:{"^":"d;",
k:function(a){return"Stack Overflow"},
gap:function(){return},
$isH:1},
fa:{"^":"H;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.i(z)+"' during its initialization"}},
iH:{"^":"d;a",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.i(z)}},
fn:{"^":"d;a,cL",
k:function(a){return"Expando:"+H.i(this.a)},
i:function(a,b){var z,y
z=this.cL
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.A(P.cV(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.ci(b,"expando$values")
return y==null?null:H.ci(y,z)},
q:function(a,b,c){var z,y
z=this.cL
if(typeof z!=="string")z.set(b,c)
else{y=H.ci(b,"expando$values")
if(y==null){y=new P.d()
H.dJ(b,"expando$values",y)}H.dJ(y,z,c)}}},
p:{"^":"ad;"},
"+int":0,
W:{"^":"d;$ti",
av:function(a,b){return H.bA(this,b,H.C(this,"W",0),null)},
az:function(a,b){return P.bz(this,b,H.C(this,"W",0))},
bn:function(a){return this.az(a,!0)},
gp:function(a){var z,y
z=this.gW(this)
for(y=0;z.F();)++y
return y},
a9:function(a,b){return H.dN(this,b,H.C(this,"W",0))},
a1:function(a,b){var z,y,x
if(b<0)H.A(P.a2(b,0,null,"index",null))
for(z=this.gW(this),y=0;z.F();){x=z.gH()
if(b===y)return x;++y}throw H.h(P.aM(b,this,"index",null,y))},
k:function(a){return P.fW(this,"(",")")}},
dm:{"^":"d;"},
n:{"^":"d;$ti",$asn:null,$isk:1,$ask:null},
"+List":0,
bC:{"^":"d;",
gN:function(a){return P.d.prototype.gN.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
ad:{"^":"d;"},
"+num":0,
d:{"^":";",
E:function(a,b){return this===b},
gN:function(a){return H.a8(this)},
k:function(a){return H.bE(this)},
toString:function(){return this.k(this)}},
bb:{"^":"d;"},
ar:{"^":"d;"},
"+String":0,
cn:{"^":"d;M<",
gp:function(a){return this.M.length},
k:function(a){var z=this.M
return z.charCodeAt(0)==0?z:z},
n:{
dP:function(a,b,c){var z=J.bl(b)
if(!z.F())return a
if(c.length===0){do a+=H.i(z.gH())
while(z.F())}else{a+=H.i(z.gH())
for(;z.F();)a=a+c+H.i(z.gH())}return a}}}}],["","",,W,{"^":"",
iB:function(a,b){return document.createElement(a)},
K:function(a,b,c){var z=document.createElement("img")
z.src=b
return z},
aX:function(a){var z=$.u
if(z===C.c)return a
return z.f1(a,!0)},
J:{"^":"dc;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
jZ:{"^":"J;",
k:function(a){return String(a)},
$isj:1,
"%":"HTMLAnchorElement"},
k0:{"^":"J;",
k:function(a){return String(a)},
$isj:1,
"%":"HTMLAreaElement"},
k1:{"^":"J;",$isj:1,"%":"HTMLBodyElement"},
k2:{"^":"J;a2:height},a7:width}",
dM:function(a,b,c){return a.getContext(b)},
dL:function(a,b){return this.dM(a,b,null)},
"%":"HTMLCanvasElement"},
eV:{"^":"j;fs:fillStyle},co:globalAlpha},dl:lineWidth}",
f0:function(a){return a.beginPath()},
f5:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
fq:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
f6:function(a){return a.closePath()},
f_:function(a,b,c,d,e,f,g){a.arc(b,c,d,e,f,g)},
eZ:function(a,b,c,d,e,f){return this.f_(a,b,c,d,e,f,!1)},
fm:function(a,b,c,d){a.drawImage(b,d.a,d.b,d.c,d.d,c.a,c.b,c.c,c.d)},
fk:function(a,b,c,d,e,f){return a.drawImage(b,c,d,e,f)},
fl:function(a,b,c,d,e,f,g,h,i,j){return a.drawImage(b,c,d,e,f,g,h,i,j)},
ft:function(a,b,c,d,e){a.fillText(b,c,d)},
c0:function(a,b,c,d){return this.ft(a,b,c,d,null)},
fp:function(a,b){a.fill(b)},
fo:function(a){return this.fp(a,"nonzero")},
"%":"CanvasRenderingContext2D"},
k3:{"^":"B;p:length=",$isj:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
k4:{"^":"B;",$isj:1,"%":"DocumentFragment|ShadowRoot"},
k5:{"^":"j;",
k:function(a){return String(a)},
"%":"DOMException"},
dc:{"^":"B;a_:id=",
k:function(a){return a.localName},
$isj:1,
"%":";Element"},
k6:{"^":"J;a2:height},a7:width}","%":"HTMLEmbedElement"},
k7:{"^":"aI;at:error=","%":"ErrorEvent"},
aI:{"^":"j;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
bu:{"^":"j;",
ev:function(a,b,c,d){return a.addEventListener(b,H.ax(c,1),!1)},
eR:function(a,b,c,d){return a.removeEventListener(b,H.ax(c,1),!1)},
"%":";EventTarget"},
ks:{"^":"J;p:length=","%":"HTMLFormElement"},
ku:{"^":"aI;a_:id=","%":"GeofencingEvent"},
kv:{"^":"J;a2:height},a7:width}","%":"HTMLIFrameElement"},
kw:{"^":"J;a2:height},a7:width}","%":"HTMLImageElement"},
ky:{"^":"J;a2:height},a7:width}",$isj:1,"%":"HTMLInputElement"},
by:{"^":"ia;fW:keyCode=",$isby:1,$isd:1,"%":"KeyboardEvent"},
kB:{"^":"j;",
k:function(a){return String(a)},
"%":"Location"},
hm:{"^":"J;at:error=","%":"HTMLAudioElement;HTMLMediaElement"},
kE:{"^":"bu;a_:id=","%":"MediaStream"},
kF:{"^":"hn;",
hk:function(a,b,c){return a.send(b,c)},
bq:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
hn:{"^":"bu;a_:id=","%":"MIDIInput;MIDIPort"},
kP:{"^":"j;A:storage=",$isj:1,"%":"Navigator"},
B:{"^":"bu;",
k:function(a){var z=a.nodeValue
return z==null?this.e6(a):z},
$isd:1,
"%":"Attr|Document|HTMLDocument|XMLDocument;Node"},
kQ:{"^":"fL;",
gp:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.aM(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.h(new P.Q("Cannot assign element of immutable List."))},
a1:function(a,b){if(b<0||b>=a.length)return H.b(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.B]},
$isk:1,
$ask:function(){return[W.B]},
$isX:1,
$asX:function(){return[W.B]},
$isL:1,
$asL:function(){return[W.B]},
"%":"NodeList|RadioNodeList"},
fJ:{"^":"j+aP;",
$asn:function(){return[W.B]},
$ask:function(){return[W.B]},
$isn:1,
$isk:1},
fL:{"^":"fJ+dj;",
$asn:function(){return[W.B]},
$ask:function(){return[W.B]},
$isn:1,
$isk:1},
kR:{"^":"J;a2:height},a7:width}","%":"HTMLObjectElement"},
kU:{"^":"J;U:position=","%":"HTMLProgressElement"},
kZ:{"^":"J;p:length=","%":"HTMLSelectElement"},
l_:{"^":"aI;at:error=","%":"SpeechRecognitionError"},
ia:{"^":"aI;","%":"CompositionEvent|DragEvent|FocusEvent|MouseEvent|PointerEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent;UIEvent"},
l5:{"^":"hm;a2:height},a7:width}","%":"HTMLVideoElement"},
ie:{"^":"bu;",
geY:function(a){var z,y
z=P.ad
y=new P.R(0,$.u,null,[z])
this.aR(a)
this.aT(a,W.aX(new W.ig(new P.jh(y,[z]))))
return y},
aT:function(a,b){return a.requestAnimationFrame(H.ax(b,1))},
aR:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isj:1,
"%":"DOMWindow|Window"},
ig:{"^":"f:1;a",
$1:function(a){var z=this.a.a
if(z.a!==0)H.A(new P.bH("Future already completed"))
z.aF(a)}},
la:{"^":"B;",$isj:1,"%":"DocumentType"},
lc:{"^":"J;",$isj:1,"%":"HTMLFrameSetElement"},
ld:{"^":"fM;",
gp:function(a){return a.length},
i:function(a,b){if(b>>>0!==b||b>=a.length)throw H.h(P.aM(b,a,null,null,null))
return a[b]},
q:function(a,b,c){throw H.h(new P.Q("Cannot assign element of immutable List."))},
a1:function(a,b){if(b<0||b>=a.length)return H.b(a,b)
return a[b]},
$isn:1,
$asn:function(){return[W.B]},
$isk:1,
$ask:function(){return[W.B]},
$isX:1,
$asX:function(){return[W.B]},
$isL:1,
$asL:function(){return[W.B]},
"%":"MozNamedAttrMap|NamedNodeMap"},
fK:{"^":"j+aP;",
$asn:function(){return[W.B]},
$ask:function(){return[W.B]},
$isn:1,
$isk:1},
fM:{"^":"fK+dj;",
$asn:function(){return[W.B]},
$ask:function(){return[W.B]},
$isn:1,
$isk:1},
iE:{"^":"a3;a,b,c,$ti",
aN:function(a,b,c,d){return W.ea(this.a,this.b,a,!1,H.a0(this,0))},
dm:function(a,b,c){return this.aN(a,null,b,c)}},
G:{"^":"iE;a,b,c,$ti"},
iF:{"^":"hL;a,b,c,d,e,$ti",
bW:function(){if(this.b==null)return
this.d_()
this.b=null
this.d=null
return},
c7:function(a,b){if(this.b==null)return;++this.a
this.d_()},
ds:function(a){return this.c7(a,null)},
dv:function(){if(this.b==null||this.a<=0)return;--this.a
this.cY()},
cY:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.eB(x,this.c,z,!1)}},
d_:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.eC(x,this.c,z,!1)}},
es:function(a,b,c,d,e){this.cY()},
n:{
ea:function(a,b,c,d,e){var z=W.aX(new W.iG(c))
z=new W.iF(0,a,b,z,!1,[e])
z.es(a,b,c,!1,e)
return z}}},
iG:{"^":"f:1;a",
$1:function(a){return this.a.$1(a)}},
dj:{"^":"d;$ti",
gW:function(a){return new W.fp(a,this.gp(a),-1,null)},
$isn:1,
$asn:null,
$isk:1,
$ask:null},
fp:{"^":"d;a,b,c,d",
F:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.y(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gH:function(){return this.d}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
bP:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
iY:{"^":"d;",
dr:function(a){if(a<=0||a>4294967296)throw H.h(P.hu("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0},
b4:function(){return Math.random()}},
j9:{"^":"d;",
k:function(a){return"Rectangle ("+this.a+", "+this.b+") "+this.c+" x "+this.d},
E:function(a,b){var z,y,x,w
if(b==null)return!1
if(!(b instanceof P.dK))return!1
z=this.a
y=b.a
if(z===y){x=this.b
w=b.b
z=x===w&&z+this.c===y+b.c&&x+this.d===w+b.d}else z=!1
return z},
gN:function(a){var z,y,x
z=this.a
y=this.b
y=P.bP(P.bP(P.bP(P.bP(0,z&0x1FFFFFFF),y&0x1FFFFFFF),z+this.c&0x1FFFFFFF),y+this.d&0x1FFFFFFF)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}},
dK:{"^":"j9;a,b,c,d,$ti",n:{
a9:function(a,b,c,d,e){return new P.dK(a,b,c,d,[e])}}}}],["","",,P,{"^":"",jY:{"^":"ak;",$isj:1,"%":"SVGAElement"},k_:{"^":"x;",$isj:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},k8:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEBlendElement"},k9:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEColorMatrixElement"},ka:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEComponentTransferElement"},kb:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFECompositeElement"},kc:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEConvolveMatrixElement"},kd:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEDiffuseLightingElement"},ke:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEDisplacementMapElement"},kf:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEFloodElement"},kg:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEGaussianBlurElement"},kh:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEImageElement"},ki:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEMergeElement"},kj:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEMorphologyElement"},kk:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFEOffsetElement"},kl:{"^":"x;j:x=,l:y=","%":"SVGFEPointLightElement"},km:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFESpecularLightingElement"},kn:{"^":"x;j:x=,l:y=","%":"SVGFESpotLightElement"},ko:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFETileElement"},kp:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFETurbulenceElement"},kq:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGFilterElement"},kr:{"^":"ak;j:x=,l:y=","%":"SVGForeignObjectElement"},fF:{"^":"ak;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},ak:{"^":"x;",$isj:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},kx:{"^":"ak;j:x=,l:y=",$isj:1,"%":"SVGImageElement"},kC:{"^":"x;",$isj:1,"%":"SVGMarkerElement"},kD:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGMaskElement"},kS:{"^":"x;j:x=,l:y=",$isj:1,"%":"SVGPatternElement"},kT:{"^":"j;p:length=","%":"SVGPointList"},kV:{"^":"j;a2:height},a7:width},j:x%,l:y%","%":"SVGRect"},kW:{"^":"fF;j:x=,l:y=","%":"SVGRectElement"},kY:{"^":"x;",$isj:1,"%":"SVGScriptElement"},x:{"^":"dc;",$isj:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},l0:{"^":"ak;j:x=,l:y=",$isj:1,"%":"SVGSVGElement"},l1:{"^":"x;",$isj:1,"%":"SVGSymbolElement"},dR:{"^":"ak;","%":";SVGTextContentElement"},l2:{"^":"dR;",$isj:1,"%":"SVGTextPathElement"},l3:{"^":"dR;j:x=,l:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},l4:{"^":"ak;j:x=,l:y=",$isj:1,"%":"SVGUseElement"},l6:{"^":"x;",$isj:1,"%":"SVGViewElement"},lb:{"^":"x;",$isj:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},le:{"^":"x;",$isj:1,"%":"SVGCursorElement"},lf:{"^":"x;",$isj:1,"%":"SVGFEDropShadowElement"},lg:{"^":"x;",$isj:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",kX:{"^":"j;",$isj:1,"%":"WebGL2RenderingContext"}}],["","",,P,{"^":""}],["","",,V,{"^":"",
b8:function(a,b){var z,y,x,w
z=a.a
y=b.a
x=z[0]-y[0]
w=z[1]-y[1]
return x*x+w*w},
ac:function(a,b,c){var z,y,x
z=a.a
y=z[0]
z=z[1]
x=c.a
x[0]=b*z
x[1]=-b*y},
f4:{"^":"d;",
cr:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x!==0&&x===y.c)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
f5:{"^":"d;a,b"},
cW:{"^":"d;fY:a<,b",
bs:function(a,b){var z,y,x,w
z=this.a
y=a.a.a
x=y[0]
w=b.a.a
x=Math.min(x,w[0])
z=z.a
z[0]=x
z[1]=Math.min(y[1],w[1])
w=this.b
y=a.b.a
z=y[0]
x=b.b.a
z=Math.max(z,x[0])
w=w.a
w[0]=z
w[1]=Math.max(y[1],x[1])},
aV:function(a,b){var z,y,x
z=this.a.a
y=z[0]
x=b.a.a
if(y>x[0])if(z[1]>x[1]){z=this.b.a
y=z[1]
x=b.b.a
z=y<x[1]&&z[0]<x[0]}else z=!1
else z=!1
return z},
h:function(a){this.a.h(a.gfY())
this.b.h(a.b)},
k:function(a){return J.Y(this.a)+", "+J.Y(this.b)},
ed:function(a,b){if(this.a==null)this.a=new T.a(new Float32Array(H.c(2)))
if(this.b==null)this.b=new T.a(new Float32Array(H.c(2)))},
n:{
bp:function(a,b){var z=new V.cW(a,b)
z.ed(a,b)
return z},
cX:function(a,b){var z,y,x
z=b.a.a
y=z[0]
x=a.b.a
if(!(y>x[0]||z[1]>x[1])){z=a.a.a
y=z[0]
x=b.b.a
z=y>x[0]||z[1]>x[1]}else z=!0
return!z}}},
eS:{"^":"d;a,b,c,d,e,f,r",
dF:function(a){var z,y,x,w,v,u,t
this.f=0
for(z=this.a,y=0;x=this.c,y<x.length;++y){x=x[y]
this.r=x
if(x==null)continue
z.bQ(this,x.a,z.a,1)}this.c=H.l([],[V.bt])
x=this.d
w=this.f
P.ck(0,w,x.length,null,null,null)
v=P.bz(H.bc(x,0,w,H.a0(x,0)),!0,null)
C.b.bX(v,"sort")
H.ba(v,0,v.length-1,new V.eU())
x=this.d;(x&&C.b).ao(x,0,this.f,v)
for(y=0;y<this.f;){x=this.d
if(y<0||y>=x.length)return H.b(x,y)
u=x[y]
a.$2(u.gab().gdG(),u.gac().gdG());++y
for(;y<this.f;){x=this.d
if(y>=x.length)return H.b(x,y)
t=x[y]
x=t.gab()
w=u.gab()
if(x==null?w==null:x===w){x=t.gac()
w=u.gac()
w=x==null?w!=null:x!==w
x=w}else x=!0
if(x)break;++y}}z.dt(4)},
hf:function(a){var z,y,x,w,v,u,t,s
if(a===this.r)return!0
z=this.f
y=this.e
if(z===y){x=this.d
if(typeof y!=="number")return y.C()
z=y*2
this.e=z
z=new Array(z)
z.fixed$length=Array
z=H.l(z,[V.bD])
this.d=z
for(w=x.length,y=z.length,v=0;v<w;++v){u=x[v]
if(v>=y)return H.b(z,v)
z[v]=u}u=this.e
if(typeof u!=="number")return H.e(u)
for(;w<u;++w){if(w>=y)return H.b(z,w)
z[w]=new V.bD(null,null)}}z=a.r
y=this.r
u=y.r
if(typeof z!=="number")return z.ah()
if(typeof u!=="number")return H.e(u)
t=this.d
s=this.f
if(z<u){if(s>=t.length)return H.b(t,s)
t[s].sab(a)
z=this.d
y=this.f
if(y>=z.length)return H.b(z,y)
z[y].sac(this.r)}else{if(s>=t.length)return H.b(t,s)
t[s].sab(y)
z=this.d
y=this.f
if(y>=z.length)return H.b(z,y)
z[y].sac(a)}++this.f
return!0},
ee:function(){var z,y,x
this.c=H.l([],[V.bt])
z=this.e
if(typeof z!=="number")return H.e(z)
z=new Array(z)
z.fixed$length=Array
z=H.l(z,[V.bD])
this.d=z
y=this.e
if(typeof y!=="number")return H.e(y)
x=0
for(;x<y;++x){if(x>=z.length)return H.b(z,x)
z[x]=new V.bD(null,null)}},
n:{
eT:function(){var z=new V.eS(V.fk(),0,null,null,16,0,null)
z.ee()
return z}}},
eU:{"^":"f:4;",
$2:function(a,b){return J.eG(a,b)}},
fj:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
fe:function(a,b){var z,y,x,w,v,u,t,s
z=this.cA()
y=z.a
x=y.a
w=a.a.a
v=w[0]
x=x.a
x[0]=v-0.1
x[1]=w[1]-0.1
y=y.b
w=a.b.a
x=w[0]
y=y.a
y[0]=x+0.1
y[1]=w[1]+0.1
z.f=b
this.bL(z)
u=C.d.bS(this.b,4)
t=this.bd(this.a)
s=0
while(!0){if(!(t>64&&s<10))break
this.dt(u)
t=this.bd(this.a);++s}return z},
h0:function(a,b,c){var z,y,x,w
z=a.a
if(z.aV(0,b))return!1
this.cT(a)
y=b.a.a
y[0]=y[0]-0.1
y[1]=y[1]-0.1
y=b.b.a
y[0]=y[0]+0.1
y[1]=y[1]+0.1
y=this.y
y.h(c)
y.G(0,2)
y=y.a
x=y[0]
if(x<0){w=b.a.a
w[0]=w[0]+x}else{w=b.b.a
w[0]=w[0]+x}y=y[1]
if(y<0){x=b.a.a
x[1]=x[1]+y}else{x=b.b.a
x[1]=x[1]+y}z.a.h(b.a)
z.b.h(b.b)
this.bL(a)
return!0},
cA:function(){var z,y,x,w
z=this.f
if(z.b===z.c)for(y=0;y<6;++y){x=new V.cW(null,null)
x.a=new T.a(new Float32Array(2))
x.b=new T.a(new Float32Array(2))
z.al(new V.bt(x,null,null,null,null,null,null))}w=z.b5()
J.eN(w,null)
w.d=null
w.e=null
w.f=null
z=this.x
w.r=z
this.x=z+1;++this.b
return w},
bQ:function(a,b,c,d){var z
if(c==null)return!0
if(V.cX(b,c.a)){z=c.d
if(z==null)a.hf(c)
else{if(d<64){++d
if(!this.bQ(a,b,z,d))return!1}if(d<64)if(!this.bQ(a,b,c.e,d+1))return!1}}return!0},
bL:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l;++this.d
if(this.a==null){this.a=a
a.b=null
return}z=this.Q
y=a.a
x=y.a
w=new Float32Array(2)
x=x.a
w[1]=x[1]
w[0]=x[0]
new T.a(w).v(0,y.b)
w[1]=w[1]*0.5
w[0]=w[0]*0.5
x=z.a
x[1]=w[1]
x[0]=w[0]
v=this.a
if(v.d!=null){x=this.ch
w=this.cx
u=x.a
t=w.a
do{s=v.d
r=v.e
q=s.a
p=q.a
o=new Float32Array(2)
p=p.a
o[1]=p[1]
o[0]=p[0]
new T.a(o).v(0,q.b)
o[1]=o[1]*0.5
o[0]=o[0]*0.5
u[1]=o[1]
u[0]=o[0]
o=r.a
q=o.a
p=new Float32Array(2)
q=q.a
p[1]=q[1]
p[0]=q[0]
new T.a(p).v(0,o.b)
p[1]=p[1]*0.5
p[0]=p[0]*0.5
t[1]=p[1]
t[0]=p[0]
p=x.m(z).a
p[1]=Math.abs(p[1])
p[0]=Math.abs(p[0])
p=w.m(z).a
p[1]=Math.abs(p[1])
p[0]=Math.abs(p[0])
v=u[0]+u[1]<t[0]+t[1]?s:r}while(v.d!=null)}n=v.b
m=this.cA()
m.b=n
m.f=null
m.a.bs(y,v.a)
if(n!=null){if(v.b.d===v)n.d=m
else n.e=m
m.d=v
m.e=a
v.b=m
a.b=m
do{z=n.a
if(z.aV(0,m.a))break
z.bs(n.d.a,n.e.a)
l=n.b
if(l!=null){m=n
n=l
continue}else break}while(!0)}else{m.d=v
m.e=a
v.b=m
a.b=m
this.a=m}},
cT:function(a){var z,y,x,w,v,u,t
z=this.a
if(a==null?z==null:a===z){this.a=null
z=this.c
if(z==null?a==null:z===a)this.c=null
return}y=a.b
x=y.b
w=y.d
if(w==null?a==null:w===a)w=y.e
if(x!=null){z=x.d
if(z==null?y==null:z===y)x.d=w
else x.e=w
w.b=x
this.f.al(y);--this.b
for(z=this.z;x!=null;){v=x.a
u=z.a
t=v.a
u=u.a
t=t.a
u[1]=t[1]
u[0]=t[0]
t=z.b
u=v.b
t=t.a
u=u.a
t[1]=u[1]
t[0]=u[0]
v.bs(x.d.a,x.e.a)
if(z.aV(0,v))break
x=x.b}}else{this.a=w
w.b=null
this.f.al(y);--this.b}z=this.c
if(z==null?a==null:z===a)this.c=this.a},
bd:function(a){if(a==null)return 0
return 1+Math.max(this.bd(a.d),this.bd(a.e))},
dt:function(a){var z,y,x,w,v
if(this.a==null)return
for(z=0;z<a;++z){y=this.a
for(x=this.e,w=0;v=y.d,v!=null;){y=(C.d.eT(x,w)&1)===0?v:y.e
w=w+1&31}this.e=x+1
this.cT(y)
this.bL(y)}},
eh:function(){var z,y
for(z=this.r,y=0;y<4;++y)z[y]=new T.a(new Float32Array(2))},
n:{
fk:function(){var z,y,x
z=H.l(new Array(4),[T.a])
y=new Float32Array(H.c(2))
x=V.bp(null,null)
x=new V.fj(null,0,null,0,0,P.ao(null,V.bt),z,0,new T.a(y),x,new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))))
x.eh()
return x}}},
bt:{"^":"d;a,h3:b',c,d,e,dG:f<,bl:r>",
k:function(a){var z=this.a
return J.Y(z.a)+", "+J.Y(z.b)}},
bD:{"^":"d;ab:a@,ac:b@",
aU:function(a,b){var z,y
z=this.a.r
y=b.gab()
y=y.gbl(y)
if(typeof z!=="number")return z.ah()
if(typeof y!=="number")return H.e(y)
if(z<y)return-1
z=this.a.r
y=b.gab()
y=y.gbl(y)
if(z==null?y==null:z===y){z=this.b.r
y=b.gac()
y=y.gbl(y)
if(typeof z!=="number")return z.ah()
if(typeof y!=="number")return H.e(y)
if(z<y)z=-1
else{z=this.b.r
y=b.gac()
y=y.gbl(y)
z=(z==null?y==null:z===y)?0:1}return z}return 1}},
f0:{"^":"d;a,b,c,d,e,f,r,x,a3:y<,z,Q,ch,cx,cy,db,dx,dy",
f8:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
a.e=0
z=b.gU(b)
y=c.a.a
x=y[1]
w=c.b.a
v=C.a.C(w[1],z.gj(z))
u=C.a.C(w[3],z.gl(z))
y=y[0]
t=C.a.C(w[0],z.gj(z))
w=C.a.C(w[2],z.gl(z))
s=d.gU(d)
r=e.a.a
q=r[1]
p=e.b.a
o=C.a.C(p[1],s.gj(s))
n=C.a.C(p[3],s.gl(s))
m=r[0]+C.a.C(p[0],s.gj(s))+C.a.C(p[2],s.gl(s))-(y+t+w)
l=q+o+n-(x+v+u)
k=b.b.L(0,d.b)
if(C.a.P(m*m+l*l,k.C(0,k)))return
a.d=0
a.c.h(b.gU(b))
a.b.Y()
a.e=1
y=a.a
y[0].gt().h(d.gU(d))
J.aB(y[0]).b7()},
f9:function(b1,b2,b3,b4,b5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
b1.e=0
z=b4.gU(b4)
y=b5.a.a
x=y[1]
w=b5.b.a
v=C.a.C(w[1],z.gj(z))
u=C.a.C(w[3],z.gl(z))
t=b3.a.a
s=y[0]+C.a.C(w[0],z.gj(z))+C.a.C(w[2],z.gl(z))-t[0]
r=x+v+u-t[1]
t=b3.b.a
q=t[0]
p=t[1]
o=s*t[2]+r*t[3]
n=s*q+r*p
m=C.f.L(b2.b,b4.b)
l=b2.f
k=b2.d
j=b2.e
for(i=0,h=1e-12,g=0;g<l;++g){if(g>=8)return H.b(k,g)
f=k[g]
y=J.m(f)
x=y.gj(f)
if(typeof x!=="number")return H.e(x)
y=y.gl(f)
if(typeof y!=="number")return H.e(y)
w=j[g].a
e=w[0]*(n-x)+w[1]*(o-y)
if(e>m)return
if(e>h){h=e
i=g}}d=i+1
d=d<l?d:0
if(i<0||i>=8)return H.b(k,i)
c=k[i]
if(d<0||d>=8)return H.b(k,d)
b=k[d]
if(h<1192e-10){b1.e=1
b1.d=1
y=j[i].a
x=b1.b.a
x[0]=y[0]
x[1]=y[1]
y=J.m(c)
x=J.m(b)
w=b1.c.a
w[0]=J.aZ(J.V(y.gj(c),x.gj(b)),0.5)
y=y.gl(c)
x=x.gl(b)
if(typeof y!=="number")return y.L()
if(typeof x!=="number")return H.e(x)
w[1]=(y+x)*0.5
a=b1.a[0]
x=a.gt()
y=b4.gU(b4)
x.a[0]=y.gj(y)
y=a.gt()
x=b4.gU(b4)
y.a[1]=x.gl(x)
J.aB(a).b7()
return}y=J.m(c)
x=y.gj(c)
if(typeof x!=="number")return H.e(x)
w=y.gl(c)
if(typeof w!=="number")return H.e(w)
v=J.m(b)
a0=J.bi(v.gj(b),y.gj(c))
u=v.gl(b)
t=y.gl(c)
if(typeof u!=="number")return u.R()
if(typeof t!=="number")return H.e(t)
if(typeof a0!=="number")return H.e(a0)
a1=v.gj(b)
if(typeof a1!=="number")return H.e(a1)
a2=v.gl(b)
if(typeof a2!=="number")return H.e(a2)
a3=J.bi(y.gj(c),v.gj(b))
a4=y.gl(c)
a5=v.gl(b)
if(typeof a4!=="number")return a4.R()
if(typeof a5!=="number")return H.e(a5)
if(typeof a3!=="number")return H.e(a3)
if((n-x)*a0+(o-w)*(u-t)<=0){x=y.gj(c)
if(typeof x!=="number")return H.e(x)
a6=n-x
x=y.gl(c)
if(typeof x!=="number")return H.e(x)
a7=o-x
if(a6*a6+a7*a7>m*m)return
b1.e=1
b1.d=1
x=b1.b
w=y.gj(c)
if(typeof w!=="number")return H.e(w)
v=x.a
v[0]=n-w
y=y.gl(c)
if(typeof y!=="number")return H.e(y)
v[1]=o-y
x.Z()
b1.c.h(c)
x=b1.a
x[0].gt().h(b4.gU(b4))
J.aB(x[0]).b7()}else if((n-a1)*a3+(o-a2)*(a4-a5)<=0){y=v.gj(b)
if(typeof y!=="number")return H.e(y)
a6=n-y
y=v.gl(b)
if(typeof y!=="number")return H.e(y)
a7=o-y
if(a6*a6+a7*a7>m*m)return
b1.e=1
b1.d=1
y=b1.b
x=v.gj(b)
if(typeof x!=="number")return H.e(x)
w=y.a
w[0]=n-x
v=v.gl(b)
if(typeof v!=="number")return H.e(v)
w[1]=o-v
y.Z()
b1.c.h(b)
y=b1.a
y[0].gt().h(b4.gU(b4))
J.aB(y[0]).b7()}else{a8=J.aZ(J.V(y.gj(c),v.gj(b)),0.5)
y=y.gl(c)
v=v.gl(b)
if(typeof y!=="number")return y.L()
if(typeof v!=="number")return H.e(v)
a9=(y+v)*0.5
if(typeof a8!=="number")return H.e(a8)
b0=j[i]
v=b0.a
if((n-a8)*v[0]+(o-a9)*v[1]>m)return
b1.e=1
b1.d=1
b1.b.h(b0)
y=b1.c.a
y[0]=a8
y[1]=a9
y=b1.a
y[0].gt().h(b4.gU(b4))
J.aB(y[0]).b7()}},
bk:function(a9,b0,b1,b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
z=a9.e
y=b2.f
x=b2.d
if(b1<0||b1>=8)return H.b(z,b1)
w=z[b1]
v=b0.b.a
u=v[1]
t=w.a
s=t[0]
r=v[3]
t=t[1]
q=u*s+r*t
p=v[0]*s+v[2]*t
t=b3.b.a
o=p*t[0]+q*t[1]
n=p*t[2]+q*t[3]
for(m=0,l=99999999999999,k=0;k<y;++k){if(k>=8)return H.b(x,k)
j=x[k]
u=J.m(j)
s=J.aZ(u.gj(j),o)
u=u.gl(j)
if(typeof u!=="number")return u.C()
i=J.V(s,u*n)
if(J.aA(i,l)){l=i
m=k}}h=a9.d[b1]
u=b0.a.a
s=u[1]
r=v[1]
g=J.m(h)
f=g.gj(h)
if(typeof f!=="number")return H.e(f)
e=v[3]
d=g.gl(h)
if(typeof d!=="number")return H.e(d)
u=u[0]
c=v[0]
b=g.gj(h)
if(typeof b!=="number")return H.e(b)
v=v[2]
g=g.gl(h)
if(typeof g!=="number")return H.e(g)
if(m<0||m>=8)return H.b(x,m)
a=x[m]
a0=b3.a.a
a1=a0[1]
a2=t[1]
a3=J.m(a)
a4=a3.gj(a)
if(typeof a4!=="number")return H.e(a4)
a5=t[3]
a6=a3.gl(a)
if(typeof a6!=="number")return H.e(a6)
a0=a0[0]
a7=t[0]
a8=a3.gj(a)
if(typeof a8!=="number")return H.e(a8)
t=t[2]
a3=a3.gl(a)
if(typeof a3!=="number")return H.e(a3)
return(a0+a7*a8+t*a3-(u+c*b+v*g))*p+(a1+a2*a4+a5*a6-(s+r*f+e*d))*q},
d9:function(a9,b0,b1,b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
z=b0.f
y=b0.e
x=b3.a.a
w=x[1]
v=b3.b.a
u=v[1]
t=b2.c.a
s=t[0]
r=v[3]
t=t[1]
x=x[0]
q=v[0]
v=v[2]
p=b1.a.a
o=p[1]
n=b1.b.a
m=n[1]
l=b0.c.a
k=l[0]
j=n[3]
l=l[1]
p=p[0]
i=n[0]
n=n[2]
h=x+q*s+v*t-(p+i*k+n*l)
g=w+u*s+r*t-(o+m*k+j*l)
f=h*i+g*m
e=h*n+g*j
for(d=0,c=1e-12,b=0;b<z;++b){if(b>=8)return H.b(y,b)
x=y[b].a
a=x[0]*f+x[1]*e
if(a>c){c=a
d=b}}a0=this.bk(b0,b1,d,b2,b3)
a1=d-1
a1=a1>=0?a1:z-1
a2=this.bk(b0,b1,a1,b2,b3)
a3=d+1
a3=a3<z?a3:0
a4=this.bk(b0,b1,a3,b2,b3)
if(a2>a0&&a2>a4){a5=a2
a6=a1
a7=-1}else{if(!(a4>a0)){a9.b=d
a9.a=a0
return}a5=a4
a6=a3
a7=1}for(x=a7===-1,d=z-1;!0;a5=a0,a6=a8){if(x){a8=a6-1
a8=a8>=0?a8:d}else{a8=a6+1
a8=a8<z?a8:0}a0=this.bk(b0,b1,a8,b2,b3)
if(!(a0>a5))break}a9.b=a6
a9.a=a5},
fu:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q
z=b.e
y=e.f
x=e.d
w=e.e
if(d<0||d>=8)return H.b(z,d)
v=this.cx
c.b.O(z[d],v)
f.b.a6().O(v,v)
for(u=0,t=99999999999999,s=0;s<y;++s){if(s>=8)return H.b(w,s)
r=v.B(w[s])
if(r<t){t=r
u=s}}q=u+1
q=q<y?q:0
if(u<0||u>=8)return H.b(x,u)
V.o(f,x[u],a[0].a)
v=a[0].b.a
v.a=d
v.b=u
v.c=0
if(q<0||q>=8)return H.b(x,q)
V.o(f,x[q],a[1].a)
v=a[1].b.a
v.a=d
v.b=q
v.c=1},
fa:function(a2,a3,a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
a2.e=0
z=a3.b+a5.b
y=this.e
this.d9(y,a3,a4,a5,a6)
if(y.a>z)return
x=this.f
this.d9(x,a5,a6,a3,a4)
w=x.a
if(w>z)return
if(w>0.98*y.a+0.001){v=x.b
a2.d=2
u=a4
t=a6
s=a3
r=a5
q=1}else{v=y.b
a2.d=1
u=a6
t=a4
s=a5
r=a3
q=0}y=this.r
this.fu(y,r,t,v,s,u)
p=r.f
o=r.d
x=this.cy
if(v<0||v>=8)return H.b(o,v)
x.h(o[v])
w=this.db
n=v+1
if(n<p){if(n>=8)return H.b(o,n)
n=o[n]}else n=o[0]
w.h(n)
n=this.x
n.h(w).m(x)
n.Z()
m=this.y
V.ac(n,1,m)
l=this.z
l.h(x).v(0,w).G(0,0.5)
k=this.Q
t.b.O(n,k)
n=this.ch
V.ac(k,1,n)
V.o(t,x,x)
V.o(t,w,w)
j=n.B(x)
x=k.B(x)
w=k.B(w)
k.K()
i=this.dx
h=V.d2(i,y,k,-x+z)
k.K()
if(h<2)return
y=this.dy
if(V.d2(y,i,k,w+z)<2)return
a2.b.h(m)
a2.c.h(l)
for(x=a2.a,w=u.a.a,m=u.b.a,g=0,f=0;f<2;++f)if(n.B(y[f].a)-j<=z){if(g>=2)return H.b(x,g)
e=x[g]
l=y[f].a
k=e.gt()
l=l.a
d=l[0]-w[0]
c=l[1]-w[1]
b=m[0]
a=m[1]
a0=m[2]
a1=m[3]
k=k.a
k[0]=d*b+c*a
k[1]=d*a0+c*a1
k=J.m(e)
k.ga_(e).h(y[f].b)
k.ga_(e).gc_().d=q;++g}a2.e=g},
ef:function(a){var z=this.r
z[0]=V.aE()
z[1]=V.aE()
z=this.dx
z[0]=V.aE()
z[1]=V.aE()
z=this.dy
z[0]=V.aE()
z[1]=V.aE()},
n:{
f1:function(a){var z,y
z=V.d7()
y=[V.d0]
y=new V.f0(a,V.dL(),z,V.d8(),new V.d9(0,0),new V.d9(0,0),H.l(new Array(2),y),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),H.l(new Array(2),y),H.l(new Array(2),y))
y.ef(a)
return y},
d2:function(a,b,c,d){var z,y,x,w,v,u,t
z=c.B(b[0].a)-d
y=c.B(b[1].a)-d
if(z<=0){x=a[0]
w=b[0]
x.a.h(w.a)
x.b.a.h(w.b.a)
v=1}else v=0
if(y<=0){u=v+1
x=a[v]
w=b[1]
x.a.h(w.a)
x.b.a.h(w.b.a)
v=u}if(z*y<0){if(v>=2)return H.b(a,v)
a[v].a.h(b[1].a).m(b[0].a).G(0,z/(z-y)).v(0,b[0].a)
t=z>0?b[0]:b[1]
a[v].b.a.h(t.b.a);++v}return v}}},
d0:{"^":"d;dH:a<,a_:b>",
h:function(a){this.a.h(a.gdH())
this.b.a.h(a.ga_(a).a)},
n:{
aE:function(){return new V.d0(new T.a(new Float32Array(H.c(2))),new V.d5(V.fo()))}}},
d9:{"^":"d;a,b"},
d5:{"^":"d;c_:a<",
E:function(a,b){if(b==null)return!1
return b.gc_().E(0,this.a)},
h:function(a){this.a.h(a.gc_())},
fT:function(a){return a.a.E(0,this.a)},
b7:function(){var z=this.a
z.a=0
z.b=0
z.c=0
z.d=0}},
fc:{"^":"d;a,b,c,d,e,f,r,x,y,z",
d7:function(a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1;++this.a
z=a4.a
y=a4.b
x=a4.c
w=a4.d
v=this.d
v.h6(a3,z,x,y,w)
u=v.d
t=this.r
v.cj(t)
t.gc3()
for(s=this.e,r=this.f,q=this.y,p=w.b,o=this.x,n=o.a,m=x.b,l=q.a,k=0;k<this.c;){j=v.e
for(i=0;i<j;++i){if(i>=3)return H.b(u,i)
s[i]=u[i].e
r[i]=u[i].f}switch(j){case 1:break
case 2:v.e_()
break
case 3:v.e0()
break
default:return}if(v.e===3)break
v.cj(t)
t.gc3()
v.dN(o)
if(o.gc3()<14208639999999999e-30)break
h=v.e
if(h>=3)return H.b(u,h)
g=u[h]
h=m.a6()
n[1]=-n[1]
n[0]=-n[0]
l[1]=n[1]
l[0]=n[0]
h.an(0,q)
h=z.aB(q)
g.e=h
f=z.a
if(h>=8)return H.b(f,h)
h=f[h]
f=g.a
V.o(x,h,f)
h=p.a6()
n[1]=-n[1]
n[0]=-n[0]
l[1]=n[1]
l[0]=n[0]
h.an(0,q)
h=y.aB(q)
g.f=h
e=y.a
if(h>=8)return H.b(e,h)
h=e[h]
e=g.b
V.o(w,h,e)
h=g.c
d=h.a
e=e.a
d[1]=e[1]
d[0]=e[0]
h.m(f);++k;++this.b
i=0
while(!0){if(!(i<j)){c=!1
break}h=g.e
if(i>=3)return H.b(s,i)
if(J.D(h,s[i])&&J.D(g.f,r[i])){c=!0
break}++i}if(c)break;++v.e}this.c=Math.max(this.c,k)
b=a2.a
a=a2.b
switch(v.e){case 0:break
case 1:t=v.a
b.h(t.a)
a.h(t.b)
break
case 2:t=v.y
s=v.a
t.h(s.a).G(0,s.d)
r=v.b
b.h(r.a).G(0,r.d).v(0,t)
t.h(s.b).G(0,s.d)
a.h(r.b).G(0,r.d).v(0,t)
break
case 3:t=v.a
b.h(t.a).G(0,t.d)
t=v.Q
s=v.b
t.h(s.a).G(0,s.d)
s=v.ch
r=v.c
s.h(r.a).G(0,r.d)
b.v(0,t).v(0,s)
a.h(b)
break
default:break}a2.c=Math.sqrt(V.b8(b,a))
a2.d=k
v.hi(a3)
if(a4.e){a0=z.gaO()
a1=y.gaO()
v=a2.c
t=a0+a1
if(typeof v!=="number")return v.P()
if(v>t&&v>1192e-10){a2.c=v-t
v=this.z
v.h(a).m(b)
v.Z()
q.h(v).G(0,a0)
b.v(0,q)
q.h(v).G(0,a1)
a.m(q)}else{b.v(0,a).G(0,0.5)
a.h(b)
a2.c=0}}},
n:{
fd:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=V.cl()
y=V.cl()
x=V.cl()
w=H.l(new Array(3),[V.dM])
v=new Float32Array(H.c(2))
u=new Float32Array(H.c(2))
t=new Float32Array(H.c(2))
s=new Float32Array(H.c(2))
r=new Float32Array(H.c(2))
q=new Float32Array(H.c(2))
p=new Float32Array(H.c(2))
w[0]=z
w[1]=y
w[2]=x
o=[P.p]
return new V.fc(0,0,20,new V.hD(z,y,x,w,0,new T.a(v),new T.a(t),new T.a(u),new T.a(s),new T.a(r),new T.a(q),new T.a(p)),H.l(new Array(3),o),H.l(new Array(3),o),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))))}}},
fe:{"^":"d;ab:a@,ac:b@,c,d,e",n:{
d7:function(){return new V.fe(V.aG(),V.aG(),V.ab(),V.ab(),!1)}}},
ff:{"^":"d;a,b,c,d",n:{
d8:function(){return new V.ff(new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),null,null)}}},
fg:{"^":"d;I:a<,b,aO:c<",
ba:function(a){var z,y,x,w,v
z=a.a
if(z===0){this.a[0].h(a.gU(a))
this.b=1
this.c=a.b}else if(z===1){this.b=a.f
this.c=a.b
for(z=this.a,y=0;y<this.b;++y){if(y>=8)return H.b(z,y)
x=z[y]
w=a.d[y]
x=x.a
v=J.m(w)
x[1]=J.y(v.gA(w),1)
x[0]=J.y(v.gA(w),0)}}},
aB:function(a){var z,y,x,w,v
z=this.a
y=z[0].B(a)
for(x=0,w=1;w<this.b;++w){if(w>=8)return H.b(z,w)
v=z[w].B(a)
if(v>y){y=v
x=w}}return x},
eg:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new T.a(new Float32Array(2))},
n:{
aG:function(){var z=new V.fg(H.l(new Array(8),[T.a]),0,0)
z.eg()
return z}}},
dg:{"^":"d;du:a<,b,c,d",
h:function(a){this.a=a.gdu()
this.b=a.b
this.c=a.c
this.d=a.d},
E:function(a,b){if(b==null)return!1
return this.a===b.gdu()&&this.b===b.b&&this.c===b.c&&this.d===b.d},
k:function(a){return"Features: ("+this.d+", "+this.b+", "+this.c+" "+this.a+")"},
n:{
fo:function(){return new V.dg(0,0,0,0)}}},
hh:{"^":"d;aw:a>,a3:b<,t:c<,aA:d>,a0:e<",
h:function(a){var z,y,x,w
z=this.a
y=0
while(!0){x=a.ga0()
if(typeof x!=="number")return H.e(x)
if(!(y<x))break
if(y>=2)return H.b(z,y)
x=z[y]
w=a.gaw(a)
if(y>=w.length)return H.b(w,y)
x.h(w[y]);++y}this.d=a.gaA(a)
this.b.h(a.ga3())
this.c.h(a.gt())
this.e=a.ga0()},
ek:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new V.dr(new T.a(new Float32Array(2)),0,0,new V.d5(new V.dg(0,0,0,0)))},
n:{
aQ:function(){var z=new Array(2)
z.fixed$length=Array
z=new V.hh(H.l(z,[V.dr]),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),null,0)
z.ek()
return z}}},
dr:{"^":"d;t:a<,X:b@,a5:c@,a_:d>",
h:function(a){this.a.h(a.gt())
this.b=a.gX()
this.c=a.ga5()
this.d.a.h(a.ga_(a).a)}},
hl:{"^":"d;dq:a<,f3:b<,dh:c<",
h:function(a){this.a=a.gdq()
this.c=a.gdh()
this.b.h(a.gf3())}},
dF:{"^":"hC;c,d,e,f,a,b",
b9:function(a,b){var z,y,x
this.f=4
z=this.d
y=-a
x=-b
z[0].aP(y,x)
z[1].aP(a,x)
z[2].aP(a,b)
z[3].aP(y,b)
y=this.e
z=y[0].a
z[0]=0
z[1]=-1
z=y[1].a
z[0]=1
z[1]=0
z=y[2].a
z[0]=0
z[1]=1
y=y[3].a
y[0]=-1
y[1]=0
this.c.Y()},
br:function(a,b){var z,y
this.f=2
z=this.d
z[0].h(a)
z[1].h(b)
this.c.h(a).v(0,b).G(0,0.5)
z=this.e
z[0].h(b).m(a)
y=z[0]
V.ac(y,1,y)
z[0].Z()
z[1].h(z[0]).K()},
bY:function(a,b){var z,y,x,w,v,u,t,s
z=new Float32Array(H.c(2))
y=new T.a(z)
x=new Float32Array(H.c(2))
w=new Float32Array(H.c(2))
v=new T.a(w)
u=this.d
V.o(b,u[0],y)
new T.a(x).h(y)
for(t=1;t<this.f;++t){if(t>=8)return H.b(u,t)
V.o(b,u[t],v)
z[0]=Math.min(z[0],w[0])
z[1]=Math.min(z[1],w[1])
x[0]=Math.max(x[0],w[0])
x[1]=Math.max(x[1],w[1])}w=a.a
u=z[0]
s=this.b
w=w.a
w[0]=u-s
w[1]=z[1]-s
z=a.b
w=x[0]
z=z.a
z[0]=w+s
z[1]=x[1]+s},
fb:function(a,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
if(this.f===2){z=this.d
a.b.h(z[0]).v(0,z[1]).G(0,0.5)
a.a=0
a.c=0
return}z=new Float32Array(H.c(2))
y=new T.a(z)
y.Y()
x=new Float32Array(H.c(2))
w=new T.a(x)
w.Y()
v=new Float32Array(H.c(2))
u=new T.a(v)
t=new Float32Array(H.c(2))
s=new T.a(t)
for(r=this.d,q=0,p=0,o=0;n=this.f,o<n;){if(o>=8)return H.b(r,o)
m=r[o];++o
if(o<n){if(o>=8)return H.b(r,o)
l=r[o]}else l=r[0]
n=J.m(m)
v[1]=J.y(n.gA(m),1)
v[0]=J.y(n.gA(m),0)
u.m(w)
k=J.m(l)
t[1]=J.y(k.gA(l),1)
t[0]=J.y(k.gA(l),0)
s.m(w)
j=v[0]*t[1]-v[1]*t[0]
i=0.5*j
q+=i
h=i*0.3333333333333333
z[0]=z[0]+h*(x[0]+n.gj(m)+k.gj(l))
z[1]=z[1]+h*(x[1]+n.gl(m)+k.gl(l))
g=x[0]
f=x[1]
e=v[0]
d=v[1]
c=t[0]
b=t[1]
p+=j*(0.3333333333333333*(0.25*(e*e+c*e+c*c)+(g*e+g*c))+0.5*g*g+(0.3333333333333333*(0.25*(d*d+b*d+b*b)+(f*d+f*b))+0.5*f*f))}if(typeof a0!=="number")return a0.C()
a.a=a0*q
y.G(0,1/q)
a.b.h(y)
a.c=p*a0},
em:function(){var z,y
for(z=this.d,y=0;y<8;++y)z[y]=new T.a(new Float32Array(2))
for(z=this.e,y=0;y<8;++y)z[y]=new T.a(new Float32Array(2))},
en:function(a){var z,y,x,w,v,u
for(z=this.d,y=a.d,x=0;x<8;++x){w=y[x]
v=new Float32Array(2)
u=J.m(w)
v[1]=J.y(u.gA(w),1)
v[0]=J.y(u.gA(w),0)
z[x]=new T.a(v)}for(z=this.e,y=a.e,x=0;x<8;++x){w=y[x]
v=new Float32Array(2)
w=w.a
v[1]=w[1]
v[0]=w[0]
z[x]=new T.a(v)}},
n:{
b9:function(){var z,y
z=new Array(8)
z.fixed$length=Array
y=[T.a]
z=H.l(z,y)
y=H.l(new Array(8),y)
y=new V.dF(new T.a(new Float32Array(H.c(2))),z,y,0,1,0.01)
y.em()
return y},
hs:function(a){var z,y,x,w,v
z=a.b
y=a.f
x=new Array(8)
x.fixed$length=Array
w=[T.a]
x=H.l(x,w)
w=H.l(new Array(8),w)
v=new T.a(new Float32Array(H.c(2)))
v.h(a.c)
z=new V.dF(v,x,w,y,1,z)
z.en(a)
return z}}},
hC:{"^":"d;"},
hD:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch",
h6:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
this.e=a.b
for(z=this.d,y=a.c,x=a.d,w=0;v=this.e,w<v;++w){if(w>=3)return H.b(z,w)
u=z[w]
if(w>=y.length)return H.b(y,w)
u.e=y[w]
if(w>=x.length)return H.b(x,w)
u.f=x[w]
v=b.gI()
t=u.e
if(t>>>0!==t||t>=8)return H.b(v,t)
s=v[t]
t=d.gI()
v=u.f
if(v>>>0!==v||v>=8)return H.b(t,v)
r=t[v]
v=u.a
V.o(c,s,v)
t=u.b
V.o(e,r,t)
q=u.c
p=q.a
t=t.a
p[1]=t[1]
p[0]=t[0]
q.m(v)
u.d=0}if(v>1){o=a.a
n=this.ck()
if(n<0.5*o||2*o<n||n<1192e-10)this.e=0}if(this.e===0){u=z[0]
u.e=0
u.f=0
s=b.gI()[0]
r=d.gI()[0]
z=u.a
V.o(c,s,z)
y=u.b
V.o(e,r,y)
u.c.h(y).m(z)
this.e=1}},
hi:function(a){var z,y,x,w,v,u,t,s
a.a=this.ck()
z=this.e
a.b=z
for(y=a.c,x=this.d,w=y.length,v=a.d,u=v.length,t=0;t<z;++t){if(t>=3)return H.b(x,t)
s=x[t].e
if(t>=w)return H.b(y,t)
y[t]=s
s=x[t].f
if(t>=u)return H.b(v,t)
v[t]=s}},
dN:function(a){var z,y
switch(this.e){case 1:a.h(this.a.c).K()
return
case 2:z=this.x
y=this.a.c
z.h(this.b.c).m(y)
a.h(y).K()
if(z.aJ(a)>0)V.ac(z,-1,a)
else V.ac(z,1,a)
break
default:a.Y()
return}},
cj:function(a){var z,y,x
switch(this.e){case 0:a.Y()
return
case 1:a.h(this.a.c)
return
case 2:z=this.z
y=this.b
z.h(y.c).G(0,y.d)
y=this.y
x=this.a
y.h(x.c).G(0,x.d).v(0,z)
a.h(y)
return
case 3:a.Y()
return
default:a.Y()
return}},
ck:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(V.b8(this.a.c,this.b.c))
case 3:z=this.Q
y=this.a.c
z.h(this.b.c).m(y)
x=this.ch
x.h(this.c.c).m(y)
return z.aJ(x)
default:return 0}},
e_:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.x
v.h(w).m(y)
u=-y.B(v)
if(u<=0){z.d=1
this.e=1
return}t=w.B(v)
if(t<=0){x.d=1
this.e=1
z.h(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
e0:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.a
y=z.c
x=this.b
w=x.c
v=this.c
u=v.c
t=this.x
t.h(w).m(y)
s=y.B(t)
r=w.B(t)
q=-s
p=this.f
p.h(u).m(y)
o=y.B(p)
n=u.B(p)
m=-o
l=this.r
l.h(u).m(w)
k=w.B(l)
j=u.B(l)
i=-k
h=t.aJ(p)
g=h*w.aJ(u)
f=h*u.aJ(y)
e=h*y.aJ(w)
if(q<=0&&m<=0){z.d=1
this.e=1
return}if(r>0&&q>0&&e<=0){d=1/(r+q)
z.d=r*d
x.d=q*d
this.e=2
return}if(n>0&&m>0&&f<=0){c=1/(n+m)
z.d=n*c
v.d=m*c
this.e=2
x.h(v)
return}if(r<=0&&i<=0){x.d=1
this.e=1
z.h(x)
return}if(n<=0&&j<=0){v.d=1
this.e=1
z.h(v)
return}if(j>0&&i>0&&g<=0){b=1/(j+i)
x.d=j*b
v.d=i*b
this.e=2
z.h(v)
return}a=1/(g+f+e)
z.d=g*a
x.d=f*a
v.d=e*a
this.e=3}},
hE:{"^":"d;h_:a<,b,df:c<,dg:d<",
h:function(a){var z=this.c
C.b.ao(z,0,z.length,a.gdf())
z=this.d
C.b.ao(z,0,z.length,a.gdg())
this.a=a.gh_()
this.b=a.b},
n:{
dL:function(){var z=P.p
return new V.hE(0,0,P.ap(3,new V.hF(),!0,z),P.ap(3,new V.hG(),!0,z))}}},
hF:{"^":"f:1;",
$1:function(a){return 2147483647}},
hG:{"^":"f:1;",
$1:function(a){return 2147483647}},
dM:{"^":"d;hg:a<,b,c,d,df:e<,dg:f<",
h:function(a){this.a.h(a.ghg())
this.b.h(a.b)
this.c.h(a.c)
this.d=a.d
this.e=a.e
this.f=a.f},
k:function(a){return"wA: "+this.a.k(0)+", wB: "+this.b.k(0)+", w: "+this.c.k(0)},
n:{
cl:function(){return new V.dM(new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,0,0)}}},
hU:{"^":"d;a,b,c,d,e,f,r,x,y,z",
he:function(a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
z=$.cp
if(typeof z!=="number")return z.L()
$.cp=z+1
a3.a=0
a3.b=a4.e
y=a4.a
x=a4.b
z=this.x
z.h(a4.c)
w=this.y
w.h(a4.d)
z.Z()
w.Z()
v=a4.e
u=Math.max(0.005,y.c+x.c-0.015)
t=this.a
t.b=0
s=this.b
s.a=y
s.b=x
s.e=!1
for(r=this.f,q=this.r,p=u+0.00125,o=u-0.00125,n=this.e,m=this.c,l=this.d,k=this.z,j=0,i=0;!0;){z.ag(m,j)
w.ag(l,j)
s.c=m
s.d=l
k.c.d7(n,t,s)
h=n.c
if(typeof h!=="number")return h.hj()
if(h<=0){a3.a=2
a3.b=0
break}if(h<p){a3.a=3
a3.b=j
break}r.fO(0,t,y,z,x,w,j)
f=v
e=0
while(!0){if(!!0){g=!1
break}d=r.fv(q,f)
if(d>p){a3.a=4
a3.b=v
g=!0
break}if(d>o){j=f
g=!1
break}c=r.aL(q[0],q[1],j)
if(c<o){a3.a=1
a3.b=j
g=!0
break}if(c<=p){a3.a=3
a3.b=j
g=!0
break}for(b=f,a=j,a0=0;!0;){a1=(a0&1)===1?a+(u-c)*(b-a)/(d-c):0.5*(a+b)
a2=r.aL(q[0],q[1],a1)
if(Math.abs(a2-u)<0.00125){f=a1
break}if(a2>u){a=a1
c=a2}else{b=a1
d=a2}++a0
h=$.ct
if(typeof h!=="number")return h.L()
$.ct=h+1
if(a0===50)break}$.cs=Math.max(H.ep($.cs),a0);++e
if(e===8){g=!1
break}}++i
h=$.cq
if(typeof h!=="number")return h.L()
$.cq=h+1
if(g)break
if(i===1000){a3.a=1
a3.b=j
break}}$.cr=Math.max(H.ep($.cr),i)},
ep:function(a){var z=this.r
z[0]=0
z[1]=0
$.cp=0
$.cq=0
$.cr=0
$.ct=0
$.cs=0},
n:{
hV:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=V.dL()
y=V.d7()
x=V.ab()
w=V.ab()
v=V.d8()
u=V.aG()
t=V.aG()
s=new Float32Array(H.c(2))
r=new Float32Array(H.c(2))
q=V.aa()
p=V.aa()
o=new Float32Array(H.c(2))
n=new Float32Array(H.c(2))
m=new Float32Array(H.c(2))
l=new Float32Array(H.c(2))
k=new Float32Array(H.c(2))
j=new Float32Array(H.c(2))
i=new Float32Array(H.c(2))
h=new Float32Array(H.c(2))
g=new Float32Array(H.c(2))
f=new Float32Array(H.c(2))
e=V.ab()
d=V.ab()
d=new V.hU(z,y,x,w,v,new V.hz(u,t,0,new T.a(s),new T.a(r),q,p,new T.a(o),new T.a(n),new T.a(m),new T.a(l),new T.a(k),new T.a(j),new T.a(i),new T.a(h),new T.a(g),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(f),e,d),H.l(new Array(2),[P.p]),V.aa(),V.aa(),a)
d.ep(a)
return d}}},
hz:{"^":"d;ab:a@,ac:b@,c,t:d<,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
fO:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fy
d.ag(y,g)
x=this.go
this.r.ag(x,g)
if(z===1){this.c=0
g=this.x
w=this.a.gI()
v=b.c
if(0>=v.length)return H.b(v,0)
v=v[0]
if(v>>>0!==v||v>=8)return H.b(w,v)
g.h(w[v])
v=this.y
w=this.b.gI()
u=b.d
if(0>=u.length)return H.b(u,0)
u=u[0]
if(u>>>0!==u||u>=8)return H.b(w,u)
v.h(w[u])
u=this.z
V.o(y,g,u)
g=this.Q
V.o(x,v,g)
v=this.e
v.h(g).m(u)
return v.h2()}else{g=b.c
w=g.length
if(0>=w)return H.b(g,0)
v=g[0]
if(1>=w)return H.b(g,1)
w=b.d
u=this.z
t=this.d
s=this.cy
r=this.e
q=this.Q
p=this.fx
if(J.D(v,g[1])){this.c=2
v=this.db
o=this.b.gI()
if(0>=w.length)return H.b(w,0)
n=w[0]
if(n>>>0!==n||n>=8)return H.b(o,n)
v.h(o[n])
n=this.dx
o=this.b.gI()
if(1>=w.length)return H.b(w,1)
w=w[1]
if(w>>>0!==w||w>=8)return H.b(o,w)
n.h(o[w])
p.h(n).m(v)
V.ac(p,1,r)
r.Z()
x.b.O(r,s)
t.h(v)
t.v(0,n)
t.G(0,0.5)
V.o(x,t,q)
t=this.x
x=this.a.gI()
if(0>=g.length)return H.b(g,0)
g=g[0]
if(g>>>0!==g||g>=8)return H.b(x,g)
t.h(x[g])
V.o(y,t,u)
p.h(u)
p.m(q)
m=p.B(s)
if(m<0){r.K()
m=-m}return m}else{this.c=1
v=this.ch
o=this.a.gI()
if(0>=g.length)return H.b(g,0)
n=g[0]
if(n>>>0!==n||n>=8)return H.b(o,n)
v.h(o[n])
n=this.cx
o=this.a.gI()
if(1>=g.length)return H.b(g,1)
g=g[1]
if(g>>>0!==g||g>=8)return H.b(o,g)
n.h(o[g])
p.h(n)
p.m(v)
V.ac(p,1,r)
r.Z()
y.b.O(r,s)
t.h(v)
t.v(0,n)
t.G(0,0.5)
V.o(y,t,u)
t=this.y
y=this.b.gI()
if(0>=w.length)return H.b(w,0)
w=w[0]
if(w>>>0!==w||w>=8)return H.b(y,w)
t.h(y[w])
V.o(x,t,q)
p.h(q)
p.m(u)
m=p.B(s)
if(m<0){r.K()
m=-m}return m}}},
fv:function(a,b){var z,y,x,w,v,u,t
z=this.fy
this.f.ag(z,b)
y=this.go
this.r.ag(y,b)
switch(this.c){case 0:x=this.e
w=this.dy
z.b.a6().O(x,w)
v=this.fr
y.b.a6().O(x.K(),v)
x.K()
a[0]=this.a.aB(w)
a[1]=this.b.aB(v)
v=this.x
w=this.a.gI()
u=a[0]
if(u>>>0!==u||u>=8)return H.b(w,u)
v.h(w[u])
u=this.y
w=this.b.gI()
t=a[1]
if(t>>>0!==t||t>=8)return H.b(w,t)
u.h(w[t])
t=this.z
V.o(z,v,t)
v=this.Q
V.o(y,u,v)
return v.m(t).B(x)
case 1:x=this.cy
z.b.O(this.e,x)
w=this.z
V.o(z,this.d,w)
x.K()
z=this.fr
y.b.a6().O(x,z)
x.K()
a[0]=-1
a[1]=this.b.aB(z)
z=this.y
v=this.b.gI()
u=a[1]
if(u>>>0!==u||u>=8)return H.b(v,u)
z.h(v[u])
u=this.Q
V.o(y,z,u)
return u.m(w).B(x)
case 2:x=this.cy
y.b.O(this.e,x)
w=this.Q
V.o(y,this.d,w)
y=this.dy
z.b.a6().O(x.K(),y)
x.K()
a[1]=-1
a[0]=this.a.aB(y)
y=this.x
v=this.a.gI()
u=a[0]
if(u>>>0!==u||u>=8)return H.b(v,u)
y.h(v[u])
u=this.z
V.o(z,y,u)
return u.m(w).B(x)
default:a[0]=-1
a[1]=-1
return 0}},
aL:function(a,b,c){var z,y,x,w,v,u
z=this.fy
this.f.ag(z,c)
y=this.go
this.r.ag(y,c)
switch(this.c){case 0:x=this.e
z.b.a6().O(x,this.dy)
y.b.a6().O(x.K(),this.fr)
x.K()
w=this.x
v=this.a.gI()
if(a>>>0!==a||a>=8)return H.b(v,a)
w.h(v[a])
v=this.y
u=this.b.gI()
if(b>>>0!==b||b>=8)return H.b(u,b)
v.h(u[b])
u=this.z
V.o(z,w,u)
w=this.Q
V.o(y,v,w)
return w.m(u).B(x)
case 1:x=this.cy
z.b.O(this.e,x)
w=this.z
V.o(z,this.d,w)
x.K()
y.b.a6().O(x,this.fr)
x.K()
z=this.y
v=this.b.gI()
if(b>>>0!==b||b>=8)return H.b(v,b)
z.h(v[b])
v=this.Q
V.o(y,z,v)
return v.m(w).B(x)
case 2:x=this.cy
y.b.O(this.e,x)
w=this.Q
V.o(y,this.d,w)
z.b.a6().O(x.K(),this.dy)
x.K()
y=this.x
v=this.a.gI()
if(a>>>0!==a||a>=8)return H.b(v,a)
y.h(v[a])
v=this.z
V.o(z,y,v)
return v.m(w).B(x)
default:return 0}}},
hX:{"^":"d;ab:a<,ac:b<,c,d,e"},
hY:{"^":"d;a,b"},
il:{"^":"d;a,b,c,d",
fN:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
switch(b.d){case 0:z=this.c
y=this.d
x=this.a
w=x.a
w[0]=1
w[1]=0
v=c.a.a
u=c.b.a
t=b.c.a
s=z.a
s[0]=v[0]+u[0]*t[0]+u[2]*t[1]
s[1]=v[1]+u[1]*t[0]+u[3]*t[1]
t=e.a.a
u=e.b.a
v=b.a
r=y.a
r[0]=t[0]+u[0]*v[0].gt().a[0]+u[2]*v[0].gt().a[1]
r[1]=t[1]+u[1]*v[0].gt().a[0]+u[3]*v[0].gt().a[1]
if(V.b8(z,y)>14208639999999999e-30){w[0]=r[0]-s[0]
w[1]=r[1]-s[1]
x.Z()}x=w[0]
v=s[0]
w=w[1]
s=s[1]
u=r[0]
r=r[1]
t=this.b
if(0>=t.length)return H.b(t,0)
J.c_(t[0],(x*d+v+(-x*f+u))*0.5)
if(0>=t.length)return H.b(t,0)
J.c0(t[0],(w*d+s+(-w*f+r))*0.5)
return
case 1:x=c.b.a
w=b.b.a
v=this.a.a
v[0]=x[0]*w[0]+x[2]*w[1]
v[1]=x[1]*w[0]+x[3]*w[1]
w=c.a.a
u=b.c.a
t=this.c.a
t[0]=w[0]+x[0]*u[0]+x[2]*u[1]
t[1]=w[1]+x[1]*u[0]+x[3]*u[1]
x=e.a.a
w=e.b.a
u=b.a
s=this.d.a
r=this.b
q=0
while(!0){p=b.e
if(typeof p!=="number")return H.e(p)
if(!(q<p))break
p=x[0]
o=w[0]
if(q>=2)return H.b(u,q)
s[0]=p+o*u[q].gt().a[0]+w[2]*u[q].gt().a[1]
s[1]=x[1]+w[1]*u[q].gt().a[0]+w[3]*u[q].gt().a[1]
o=s[0]
p=t[0]
n=v[0]
m=s[1]
l=t[1]
k=v[1]
j=d-((o-p)*n+(m-l)*k)
if(q>=r.length)return H.b(r,q)
J.c_(r[q],(n*j+o+(-n*f+o))*0.5)
if(q>=r.length)return H.b(r,q)
J.c0(r[q],(k*j+m+(-k*f+m))*0.5);++q}return
case 2:x=e.b.a
w=b.b.a
v=this.a.a
v[0]=x[0]*w[0]+x[2]*w[1]
v[1]=x[1]*w[0]+x[3]*w[1]
w=e.a.a
u=b.c.a
t=this.c.a
t[0]=w[0]+x[0]*u[0]+x[2]*u[1]
t[1]=w[1]+x[1]*u[0]+x[3]*u[1]
x=c.a.a
w=c.b.a
u=b.a
s=this.d.a
r=this.b
q=0
while(!0){p=b.e
if(typeof p!=="number")return H.e(p)
if(!(q<p))break
p=x[0]
o=w[0]
if(q>=2)return H.b(u,q)
s[0]=p+o*u[q].gt().a[0]+w[2]*u[q].gt().a[1]
s[1]=x[1]+w[1]*u[q].gt().a[0]+w[3]*u[q].gt().a[1]
o=s[0]
p=t[0]
n=v[0]
m=s[1]
l=t[1]
k=v[1]
j=f-((o-p)*n+(m-l)*k)
if(q>=r.length)return H.b(r,q)
J.c_(r[q],(-n*d+o+(n*j+o))*0.5)
if(q>=r.length)return H.b(r,q)
J.c0(r[q],(-k*d+m+(k*j+m))*0.5);++q}v[0]=-v[0]
v[1]=-v[1]
break}},
n:{
im:function(){var z,y,x
z=new Float32Array(H.c(2))
y=new Float32Array(H.c(2))
x=new Float32Array(H.c(2))
return new V.il(new T.a(z),P.ap(2,new V.io(),!0,T.a),new T.a(y),new T.a(x))}}},
io:{"^":"f:1;",
$1:function(a){return new T.a(new Float32Array(H.c(2)))}},
hT:{"^":"d;c4:a<,d4:b<,c,d,e",
E:function(a,b){if(b==null)return!1
return this.a===b.gc4()&&this.b===b.gd4()&&this.c===b.c&&this.d===b.d&&this.e===b.e},
h:function(a){this.a.h(a.gc4())
this.b.h(a.gd4())
this.c.h(a.c)
this.d=a.d
this.e=a.e},
Z:function(){var z=6.283185307179586*C.f.fw(this.d/6.283185307179586)
this.d-=z
this.e-=z},
ag:function(a,b){var z,y,x,w
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=a.b
x.bu(z*this.d+b*this.e)
x=x.a
z=this.a.a
w[0]=w[0]-(x[0]*z[0]+x[2]*z[1])
w[1]=w[1]-(x[1]*z[0]+x[3]*z[1])},
d1:function(a){var z,y,x
z=1-a
y=this.b.a
x=this.c.a
y[0]=z*y[0]+a*x[0]
y[1]=z*y[1]+a*x[1]
this.d=z*this.d+a*this.e},
n:{
aa:function(){return new V.hT(new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,0)}}},
i8:{"^":"d;U:a>,dw:b<",
E:function(a,b){if(b==null)return!1
return this.a===J.cS(b)&&this.b===b.gdw()},
h:function(a){this.a.h(J.cS(a))
this.b.h(a.gdw())},
n:{
ab:function(){return new V.i8(new T.a(new Float32Array(H.c(2))),new T.aq(new Float32Array(H.c(4))))},
o:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=a.a.a
y=z[1]
x=a.b.a
w=x[1]
v=J.m(b)
u=v.gj(b)
if(typeof u!=="number")return H.e(u)
t=x[3]
s=v.gl(b)
if(typeof s!=="number")return H.e(s)
z=z[0]
r=x[0]
q=v.gj(b)
if(typeof q!=="number")return H.e(q)
x=x[2]
v=v.gl(b)
if(typeof v!=="number")return H.e(v)
p=J.m(c)
p.sj(c,z+r*q+x*v)
p.sl(c,y+w*u+t*s)}}},
id:{"^":"d;",
gdD:function(){var z=new T.a(new Float32Array(H.c(2)))
z.h(this.b)
z.m(this.d)
return z},
bo:function(a,b){var z,y,x,w
z=J.m(a)
y=this.b.a
x=J.V(J.aZ(z.gj(a),this.c),y[0])
y=y[1]
z=z.gl(a)
w=this.c
if(typeof z!=="number")return z.C()
b.aP(J.V(x,this.gdD().a[0]),y-z*w+-this.gdD().a[1])}},
bq:{"^":"d;a,b,c,d,e,f,r,dq:x<,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
fd:function(a,b){var z,y,x,w,v,u
z=this.k3
z.a=a
z.e=b
y=V.bp(null,null)
x=new V.dh(0,0,0)
w=new V.b3(y,null,null,null,null,null,null,null,x,null,null,V.bp(null,null),V.bp(null,null))
w.Q=z.b
w.f=z.c
w.r=z.d
w.d=this
x.h(z.r)
w.z=!1
x=z.a
x.toString
x=V.hs(x)
w.e=x
w.b=z.e
z=this.b
if(typeof z!=="number")return z.D()
if((z&32)===32){v=this.a.b.a
x.bY(y,this.k1)
u=v.a.fe(y,w);++v.b
v.c.push(u)
w.x=u}w.c=this.ch
this.ch=w;++this.cx
w.d=this
z=w.b
if(typeof z!=="number")return z.P()
if(z>0)this.ha()
this.a.a|=1
return w},
ar:function(a){return this.fd(a,0)},
gU:function(a){return this.k1.a},
gc4:function(){return this.k2.a},
bU:function(a,b){var z,y,x,w,v
if(this.go!==2)return
this.sV(!0)
z=this.f.a
y=z[0]
x=a.a
w=x[0]
v=this.y
z[0]=y+w*v
z[1]=z[1]+x[1]*v
v=b.a
z=this.k2.c.a
this.r=this.r+this.fr*((v[0]-z[0])*x[1]-(v[1]-z[1])*x[0])},
gdh:function(){var z,y,x,w
z=this.dy
y=this.x
x=this.k2.a.a
w=x[0]
x=x[1]
return z+y*(w*w+x*x)},
ha:function(){var z,y,x,w,v,u,t,s,r
this.x=0
this.y=0
this.dy=0
this.fr=0
z=this.k2
y=z.a
y.Y()
x=this.go
if(x===0||x===1){y=this.k1.a
z.c.h(y)
z.b.h(y)
return}x=this.rx
x.Y()
w=this.k4
for(v=this.ch,u=w.b;v!=null;v=v.c){t=v.b
if(t===0)continue
v.e.fb(w,t)
this.x=this.x+w.a
t=new Float32Array(2)
s=u.a
t[1]=s[1]
t[0]=s[0]
s=w.a
t[1]=t[1]*s
t[0]=t[0]*s
x.v(0,new T.a(t))
this.dy=this.dy+w.c}u=this.x
if(u>0){u=1/u
this.y=u
x.G(0,u)}else{this.x=1
this.y=1}u=this.dy
if(u>0){t=this.b
if(typeof t!=="number")return t.D()
t=(t&16)===0}else t=!1
if(t){u-=this.x*x.B(x)
this.dy=u
this.fr=1/u}else{this.dy=0
this.fr=0}u=this.r2
t=z.c
u.h(t)
y.h(x)
z=z.b
V.o(this.k1,y,z)
t.h(z)
r=new T.a(new Float32Array(H.c(2)))
r.h(t)
r.m(u)
V.ac(r,-this.r,r)
this.f.v(0,r)},
sV:function(a){var z
if(a){z=this.b
if(typeof z!=="number")return z.D()
if((z&2)===0){this.b=z|2
this.d=0}}else{z=this.b
if(typeof z!=="number")return z.D()
this.b=z&4294967293
this.d=0
this.f.Y()
this.r=0
this.db.Y()
this.dx=0}},
ec:function(){var z,y,x,w,v,u
z=this.r1
y=z.b
x=this.k2
y.bu(x.d)
w=z.a
y.O(x.a,w)
w.G(0,-1)
w.v(0,x.b)
v=this.a.b.a
for(u=this.ch,y=this.k1;u!=null;u=u.c)u.eb(v,z,y)},
aq:function(){var z,y,x,w,v,u,t,s
z=this.k2
y=Math.cos(z.e)
x=Math.sin(z.e)
w=this.k1
v=w.b
v.dW(y,x,-x,y)
u=v.a
t=z.a.a
z=z.c.a
s=w.a.a
s[0]=(u[0]*t[0]+u[2]*t[1])*-1+z[0]
s[1]=(u[1]*t[0]+u[3]*t[1])*-1+z[1]},
dY:function(a){return!(this.go!==2&&a.go!==2)}},
eQ:{"^":"d;a,b,c,U:d>,e,f,r,x,y,z,Q,ch,cx,cy",n:{
b1:function(){return new V.eQ(0,0,null,new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,!1,null,!1,!0,0,0,!0,!0)}}},
f6:{"^":"d;a,b,c,d,e,f",
ho:[function(a,b){var z,y,x,w,v,u,t,s
z=a.d
y=b.d
if(z==null?y==null:z===y)return
x=y.c
for(;x!=null;){w=x.a
if(w==null?z==null:w===z){w=x.b
v=w.f
u=w.r
if((v==null?a==null:v===a)&&(u==null?b==null:u===b))return
if((v==null?b==null:v===b)&&(u==null?a==null:u===a))return}x=x.d}if(!y.dY(z))return
w=this.d.cr(a,b)
if(!w)return
t=this.f.h4(a,b)
a=t.f
b=t.r
z=a.d
y=b.d
t.b=null
w=this.b
t.c=w
if(w!=null)w.b=t
this.b=t
w=t.d
w.b=t
w.a=y
w.c=null
s=z.c
w.d=s
if(s!=null)s.c=w
z.c=w
w=t.e
w.b=t
w.a=z
w.c=null
s=y.c
w.d=s
if(s!=null)s.c=w
y.c=w;++this.c},"$2","gcw",4,0,13],
bZ:function(a){var z,y,x,w,v,u,t,s,r
z=a.f
y=a.r
x=z.d
w=y.d
v=this.e
if(v!=null){u=a.a
if(typeof u!=="number")return u.D()
u=(u&2)===2}else u=!1
if(u)v.d8(a)
v=a.b
if(v!=null)v.c=a.c
u=a.c
if(u!=null)u.b=v
if(a===this.b)this.b=u
v=a.d
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===x.c)x.c=t
v=a.e
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===w.c)w.c=t
v=a.x.e
if(typeof v!=="number")return v.P()
if(v>0){a.f.d.sV(!0)
a.r.d.sV(!0)}s=a.f.e.a
r=a.r.e.a
v=this.f.dx
if(s>=2)return H.b(v,s)
v=v[s]
v.length
if(r>=2)return H.b(v,r)
v[r].a.al(a);--this.c},
f7:function(){var z,y,x,w,v,u,t,s,r,q
z=this.b
for(y=this.d;z!=null;){x=z.f
w=z.r
v=x.d
u=w.d
t=v.b
if(typeof t!=="number")return t.D()
if((t&2)!==2){t=u.b
if(typeof t!=="number")return t.D()
t=(t&2)!==2}else t=!1
if(t){z=z.c
continue}t=z.a
if(typeof t!=="number")return t.D()
if((t&8)===8){if(u.go!==2&&v.go!==2){s=z.c
this.bZ(z)
z=s
continue}t=y.cr(x,w)
if(!t){s=z.c
this.bZ(z)
z=s
continue}t=z.a
if(typeof t!=="number")return t.D()
z.a=t&4294967287}r=x.x
q=w.x
if(!V.cX(r.a,q.a)){s=z.c
this.bZ(z)
z=s
continue}z.cf(this.e)
z=z.c}}},
d_:{"^":"b2;a,b,c,d,e,f,r,x,y,z,Q",
b_:function(a,b){this.by(a,b)},
aL:function(a,b,c){this.z.a.f8(a,this.f.e,b,this.r.e,c)}},
b2:{"^":"d;c5:x<",
b_:["by",function(a,b){var z
this.a=0
this.f=a
this.r=b
this.x.e=0
this.b=null
this.c=null
z=this.d
z.b=null
z.c=null
z.d=null
z.a=null
z=this.e
z.b=null
z.c=null
z.d=null
z.a=null
this.y=0}],
cf:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=this.Q
z.h(this.x)
y=this.a
if(typeof y!=="number")return y.aD()
y|=4
this.a=y
x=(y&2)===2
y=this.f
w=y.z
v=this.r
u=v.z
t=w===!0||u===!0
s=y.d
r=v.d
q=s.k1
p=r.k1
if(t){o=y.e
n=v.e
z=this.z.a
y=z.c
y.a.ba(o)
y.b.ba(n)
v=y.c
v.a.h(q.a)
v.b.h(q.b)
v=y.d
v.a.h(p.a)
v.b.h(p.b)
y.e=!0
v=z.b
v.b=0
m=z.a.c
z=z.d
m.d7(z,v,y)
z=z.c
if(typeof z!=="number")return z.ah()
l=z<0.000001192
this.x.e=0}else{this.aL(this.x,q,p)
y=this.x.e
if(typeof y!=="number")return y.P()
l=y>0
y=z.a
k=0
while(!0){v=this.x
m=v.e
if(typeof m!=="number")return H.e(m)
if(!(k<m))break
v=v.a
if(k>=2)return H.b(v,k)
j=v[k]
j.sX(0)
j.sa5(0)
i=j.ga_(j)
h=0
while(!0){v=z.e
if(typeof v!=="number")return H.e(v)
if(!(h<v))break
if(h>=2)return H.b(y,h)
g=y[h]
if(J.aB(g).fT(i)){j.b=g.gX()
j.c=g.ga5()
break}++h}++k}if(l!==x){s.sV(!0)
r.sV(!0)}}z=this.a
if(l){if(typeof z!=="number")return z.aD()
this.a=z|2}else{if(typeof z!=="number")return z.D()
this.a=z&4294967293}if(a==null)return
if(!x&&l){f=this.f.d.e
e=this.r.d.e
if(f instanceof V.ag&&e instanceof V.ag){f.bj(e)
e.bj(f)}}if(x&&!l)a.d8(this)}},
c3:{"^":"d;aw:a>,a3:b<,t:c<,c6:d<,e,f,S:r@,T:x@,aA:y*,aO:z@,Q,ch,a0:cx@,c5:cy@",
h:function(a){var z,y,x,w
this.cx=a.ga0()
this.b.h(a.ga3())
this.c.h(a.gt())
this.d.h(a.gc6())
this.e.h(a.e)
this.f.h(a.f)
this.r=a.r
this.x=a.x
this.y=a.y
this.z=a.z
this.Q=a.Q
this.ch=a.ch
this.cy=a.cy
z=this.a
y=a.a
x=0
while(!0){w=a.cx
if(typeof w!=="number")return H.e(w)
if(!(x<w))break
if(x>=z.length)return H.b(z,x)
w=z[x]
if(x>=y.length)return H.b(y,x)
w.h(y[x]);++x}},
k:function(a){return'localNormal: "'+this.b.k(0)+'", localPoint: "'+this.c.k(0)+'" normal: "'+this.d.k(0)+'", radius: "'+H.i(this.z)+'" friction: "'+H.i(this.Q)+'" restitution: "'+H.i(this.ch)+'", pointCount: "'+H.i(this.cx)+'"'},
n:{
d3:function(){return new V.c3(P.ap(2,new V.f3(),!0,V.d4),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.aq(new Float32Array(H.c(4))),new T.aq(new Float32Array(H.c(4))),null,null,null,null,null,null,0,null)}}},
f3:{"^":"f:1;",
$1:function(a){return new V.d4(new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,0,0,0,0)}},
d4:{"^":"d;t:a<,af:b<,a4:c<,X:d@,a5:e@,h1:f<,hd:r<,x",
h:function(a){this.a.h(a.gt())
this.b.h(a.gaf())
this.c.h(a.ga4())
this.d=a.gX()
this.e=a.e
this.f=a.f
this.r=a.r
this.x=a.x},
k:function(a){return"normal impulse: "+H.i(this.d)+", tangentImpulse: "+H.i(this.e)+", normalMass: "+H.i(this.f)+", tangentMass: "+H.i(this.r)+", velocityBias: "+H.i(this.x)+", localPoint: "+this.a.k(0)+", rA: "+this.b.k(0)+", rB: "+this.c.k(0)}},
aF:{"^":"d;a,b,c,d"},
bs:{"^":"d;a,b"},
f7:{"^":"d;a,b,c,d,e,f,r,x,y,z,j:Q>,ch,cx,cy,db,af:dx<,a4:dy<",
fJ:function(d6,d7,d8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5
this.b=d7
z=this.a
y=z.length
if(typeof d7!=="number")return H.e(d7)
if(y<d7){y=new Array(Math.max(y*2,d7))
y.fixed$length=Array
y=H.l(y,[V.c3])
this.a=y
C.b.ao(y,0,z.length,z)
for(x=z.length;z=this.a,x<z.length;++x){y=V.d3()
if(x>=z.length)return H.b(z,x)
z[x]=y}}z=this.c
y=z.b
w=this.d.a
v=this.f.a
u=this.e.a
t=z.a.a
x=0
while(!0){s=this.b
if(typeof s!=="number")return H.e(s)
if(!(x<s))break
if(x>=d6.length)return H.b(d6,x)
r=d6[x]
q=r.f
p=r.r
o=q.e
n=p.e
m=o.b
l=n.b
k=q.d
j=p.d
i=r.x
s=q.f
h=p.f
if(typeof s!=="number")return s.C()
if(typeof h!=="number")return H.e(h)
g=Math.sqrt(s*h)
h=q.r
s=p.r
if(typeof h!=="number")return h.P()
if(typeof s!=="number")return H.e(s)
if(h>s)f=h
else f=s
e=k.f
d=j.f
c=k.r
b=j.r
z.fN(0,i,k.k1,m,j.k1,l)
s=this.a
if(x>=s.length)return H.b(s,x)
a=s[x]
a.sS(k)
a.sT(j)
a.sc5(i)
s=a.d.a
s[0]=t[0]
s[1]=t[1]
a.cx=i.e
a.Q=g
a.ch=f
h=i.b.a
a0=a.b.a
a0[0]=h[0]
a0[1]=h[1]
h=i.c.a
a0=a.c.a
a0[0]=h[0]
a0[1]=h[1]
a.z=m+l
a.y=i.d
h=i.a
a0=a.a
a1=-c
a2=-b
a3=d.a
a4=e.a
a5=-f
a6=0
while(!0){a7=a.cx
if(typeof a7!=="number")return H.e(a7)
if(!(a6<a7))break
if(a6>=2)return H.b(h,a6)
a8=h[a6]
if(a6>=a0.length)return H.b(a0,a6)
a9=a0[a6]
a9.sX(d8*a8.gX())
a9.sa5(d8*a8.ga5())
a9.gt().a[0]=a8.gt().a[0]
a9.gt().a[1]=a8.gt().a[1]
a7=a9.gaf()
if(a6>=y.length)return H.b(y,a6)
b0=J.cT(y[a6])
b1=k.k2.c.a
a7.a[0]=J.bi(b0,b1[0])
b0=a9.b
if(a6>=y.length)return H.b(y,a6)
a7=J.cU(y[a6])
b1=b1[1]
if(typeof a7!=="number")return a7.R()
b0=b0.a
b0[1]=a7-b1
b1=a9.c
if(a6>=y.length)return H.b(y,a6)
a7=J.cT(y[a6])
b2=j.k2.c.a
b1=b1.a
b1[0]=J.bi(a7,b2[0])
if(a6>=y.length)return H.b(y,a6)
a7=J.cU(y[a6])
b2=b2[1]
if(typeof a7!=="number")return a7.R()
b1[1]=a7-b2
b2=b0[0]
a7=s[1]
b3=b0[1]
b4=s[0]
b5=b2*a7-b3*b4
b6=b1[0]*a7-b1[1]*b4
b4=k.y+j.y
b3=k.fr
b2=j.fr
a9.f=1/(b4+b3*(b5*b5)+b2*(b6*b6))
w[0]=a7
w[1]=-1*s[0]
a7=b0[0]
b7=w[1]
b8=b0[1]
b9=w[0]
c0=a7*b7-b8*b9
c1=b1[0]*b7-b1[1]*b9
a9.r=1/(b4+b3*(c0*c0)+b2*(c1*c1))
a9.x=0
v[0]=a1*b8
v[1]=c*b0[0]
u[0]=a2*b1[1]+a3[0]-a4[0]-v[0]
u[1]=b*b1[0]+a3[1]-a4[1]-v[1]
c2=s[0]*u[0]+s[1]*u[1]
if(c2<-1)a9.x=a5*c2;++a6}if(a7===2){h=a0.length
if(0>=h)return H.b(a0,0)
c3=a0[0]
if(1>=h)return H.b(a0,1)
c4=a0[1]
c5=k.y
c6=k.fr
c7=j.y
c8=j.fr
a0=c3.gaf().a
c9=a0[0]*s[1]-a0[1]*s[0]
a0=c3.ga4().a
d0=a0[0]*s[1]-a0[1]*s[0]
a0=c4.gaf().a
d1=a0[0]*s[1]-a0[1]*s[0]
a0=c4.ga4().a
d2=a0[0]*s[1]-a0[1]*s[0]
s=c5+c7
a0=c6*c9
h=c8*d0
d3=s+a0*c9+h*d0
d4=s+c6*d1*d1+c8*d2*d2
d5=s+a0*d1+h*d2
if(d3*d3<100*(d3*d4-d5*d5)){s=a.f.a
s[3]=d4
s[2]=d5
s[1]=d5
s[0]=d3
s=a.e
h=s.a
h[3]=d4
h[2]=d5
h[1]=d5
h[0]=d3
s.fS()}else a.cx=1}++x}},
hh:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.d.a
y=0
while(!0){x=this.b
if(typeof x!=="number")return H.e(x)
if(!(y<x))break
x=this.a
if(y>=x.length)return H.b(x,y)
w=x[y]
v=w.gS()
u=w.gT()
t=v.y
s=v.fr
r=u.y
q=u.fr
x=w.gc6().a
p=x[0]
z[0]=x[1]
z[1]=-1*p
p=w.a
o=0
while(!0){n=w.cx
if(typeof n!=="number")return H.e(n)
if(!(o<n))break
if(o>=p.length)return H.b(p,o)
m=p[o]
l=m.gX()*x[0]+m.ga5()*z[0]
k=m.gX()*x[1]+m.ga5()*z[1]
n=v.r-s*(m.gaf().a[0]*k-m.b.a[1]*l)
if(v.go!==0){if(n*n>0)v.sV(!0)
v.r=n}n=v.f.a
n[0]=n[0]-l*t
n[1]=n[1]-k*t
n=u.r
j=m.c.a
j=n+q*(j[0]*k-j[1]*l)
if(u.go!==0){if(j*j>0)u.sV(!0)
u.r=j}n=u.f.a
n[0]=n[0]+l*r
n[1]=n[1]+k*r;++o}++y}},
e2:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0
z=this.Q
y=this.f
x=y.a
w=this.y.a
v=this.z.a
u=this.x.a
t=this.d.a
s=z.a
r=this.ch
q=r.a
p=this.cx.a
o=this.cy
n=o.a
m=this.e
l=m.a
k=0
while(!0){j=this.b
if(typeof j!=="number")return H.e(j)
if(!(k<j))break
j=this.a
if(k>=j.length)return H.b(j,k)
i=j[k]
h=i.gS()
g=i.gT()
f=h.r
e=g.r
d=h.f
c=g.f
b=h.y
a=h.fr
a0=g.y
a1=g.fr
t[0]=i.gc6().a[1]
j=i.d.a
t[1]=-1*j[0]
a2=i.Q
a3=i.a
a4=c.a
a5=d.a
a6=0
while(!0){a7=i.cx
if(typeof a7!=="number")return H.e(a7)
if(!(a6<a7))break
if(a6>=a3.length)return H.b(a3,a6)
a8=a3[a6]
a7=a8.gaf().a
u[0]=-e*a8.ga4().a[1]+a4[0]-a5[0]+f*a7[1]
u[1]=e*a8.ga4().a[0]+a4[1]-a5[1]-f*a7[0]
a7=u[0]
a9=t[0]
b0=u[1]
b1=t[1]
b2=a8.ghd()
b3=a8.d
if(typeof a2!=="number")return a2.C()
b4=a2*b3
b3=a8.e
b5=Math.max(-b4,Math.min(b3+b2*-(a7*a9+b0*b1),b4))
b6=b5-b3
b7=t[0]*b6
b8=t[1]*b6
a5[0]=a5[0]-b7*b
a5[1]=a5[1]-b8*b
b3=a8.b.a
f-=a*(b3[0]*b8-b3[1]*b7)
a4[0]=a4[0]+b7*a0
a4[1]=a4[1]+b8*a0
b3=a8.c.a
e+=a1*(b3[0]*b8-b3[1]*b7)
a8.e=b5;++a6}if(a7===1){if(0>=a3.length)return H.b(a3,0)
a8=a3[0]
a3=a8.gaf().a
u[0]=-e*a8.ga4().a[1]+a4[0]-a5[0]+f*a3[1]
u[1]=e*a8.ga4().a[0]+a4[1]-a5[1]-f*a3[0]
a3=u[0]
a7=j[0]
a9=u[1]
b0=j[1]
b1=a8.gh1()
b2=a8.x
b3=a8.d
b9=b3+-b1*(a3*a7+a9*b0-b2)
b5=b9>0?b9:0
b6=b5-b3
b7=j[0]*b6
b8=j[1]*b6
a5[0]=a5[0]-b7*b
a5[1]=a5[1]-b8*b
j=a8.b.a
f-=a*(j[0]*b8-j[1]*b7)
a4[0]=a4[0]+b7*a0
a4[1]=a4[1]+b8*a0
j=a8.c.a
e+=a1*(j[0]*b8-j[1]*b7)
a8.d=b5}else{a7=a3.length
if(0>=a7)return H.b(a3,0)
c0=a3[0]
if(1>=a7)return H.b(a3,1)
c1=a3[1]
a3=c0.gX()
a7=c1.gX()
a9=new Float32Array(2)
b9=new T.a(a9)
a9[0]=a3
a9[1]=a7
a7=-e
a3=c0.ga4().a[1]
b0=a4[0]
b1=a5[0]
b2=c0.b.a
w[0]=a7*a3+b0-b1+f*b2[1]
b1=c0.c.a
w[1]=e*b1[0]+a4[1]-a5[1]-f*b2[0]
b0=c1.ga4().a[1]
a3=a4[0]
b3=a5[0]
c2=c1.b.a
v[0]=a7*b0+a3-b3+f*c2[1]
b3=c1.c.a
v[1]=e*b3[0]+a4[1]-a5[1]-f*c2[0]
a3=w[0]
b0=j[0]
a7=w[1]
c3=j[1]
c4=v[0]
c5=v[1]
c6=c0.x
c7=c1.x
c8=new Float32Array(2)
c8[0]=a3*b0+a7*c3-c6
c8[1]=c4*b0+c5*c3-c7
c7=i.f.a
x[0]=c7[0]*a9[0]+c7[2]*a9[1]
x[1]=c7[1]*a9[0]+c7[3]*a9[1]
c8[0]=c8[0]-x[0]
c8[1]=c8[1]-x[1]
$loop$1:{a3=i.e
s[1]=c8[1]
s[0]=c8[0]
a3.an(0,z)
s[1]=s[1]*-1
s[0]=s[0]*-1
if(s[0]>=0&&s[1]>=0){q[1]=s[1]
q[0]=s[0]
r.m(b9)
p[1]=j[1]
p[0]=j[0]
a3=q[0]
p[1]=p[1]*a3
p[0]=p[0]*a3
n[1]=j[1]
n[0]=j[0]
j=q[1]
n[1]=n[1]*j
n[0]=n[0]*j
l[1]=p[1]
l[0]=p[0]
m.v(0,o)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*b
x[0]=x[0]*b
d.m(y)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*a0
x[0]=x[0]*a0
c.v(0,y)
j=b2[0]
a3=p[1]
b2=b2[1]
a7=p[0]
a9=c2[0]
b0=n[1]
c2=c2[1]
c3=n[0]
f-=a*(j*a3-b2*a7+(a9*b0-c2*c3))
e+=a1*(b1[0]*a3-b1[1]*a7+(b3[0]*b0-b3[1]*c3))
c0.d=s[0]
c1.d=s[1]
break $loop$1}s[0]=-c0.f*c8[0]
s[1]=0
a3=c7[1]
a7=s[0]
a9=c8[1]
if(a7>=0&&a3*a7+a9>=0){q[1]=s[1]
q[0]=s[0]
r.m(b9)
p[1]=j[1]
p[0]=j[0]
a3=q[0]
p[1]=p[1]*a3
p[0]=p[0]*a3
n[1]=j[1]
n[0]=j[0]
j=q[1]
n[1]=n[1]*j
n[0]=n[0]*j
l[1]=p[1]
l[0]=p[0]
m.v(0,o)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*b
x[0]=x[0]*b
d.m(y)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*a0
x[0]=x[0]*a0
c.v(0,y)
j=b2[0]
a3=p[1]
b2=b2[1]
a7=p[0]
a9=c2[0]
b0=n[1]
c2=c2[1]
c3=n[0]
f-=a*(j*a3-b2*a7+(a9*b0-c2*c3))
e+=a1*(b1[0]*a3-b1[1]*a7+(b3[0]*b0-b3[1]*c3))
c0.d=s[0]
c1.d=s[1]
break $loop$1}s[0]=0
s[1]=-c1.f*c8[1]
a3=c7[2]
a7=s[1]
a9=c8[0]
if(a7>=0&&a3*a7+a9>=0){q[1]=a7
q[0]=s[0]
r.m(b9)
p[1]=j[1]
p[0]=j[0]
a3=q[0]
p[1]=p[1]*a3
p[0]=p[0]*a3
n[1]=j[1]
n[0]=j[0]
j=q[1]
n[1]=n[1]*j
n[0]=n[0]*j
l[1]=p[1]
l[0]=p[0]
m.v(0,o)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*b
x[0]=x[0]*b
d.m(y)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*a0
x[0]=x[0]*a0
c.v(0,y)
j=b2[0]
a3=p[1]
b2=b2[1]
a7=p[0]
a9=c2[0]
b0=n[1]
c2=c2[1]
c3=n[0]
f-=a*(j*a3-b2*a7+(a9*b0-c2*c3))
e+=a1*(b1[0]*a3-b1[1]*a7+(b3[0]*b0-b3[1]*c3))
c0.d=s[0]
c1.d=s[1]
break $loop$1}s[0]=0
s[1]=0
c9=c8[0]
d0=c8[1]
if(c9>=0&&d0>=0){q[1]=s[1]
q[0]=s[0]
r.m(b9)
p[1]=j[1]
p[0]=j[0]
a3=q[0]
p[1]=p[1]*a3
p[0]=p[0]*a3
n[1]=j[1]
n[0]=j[0]
j=q[1]
n[1]=n[1]*j
n[0]=n[0]*j
l[1]=p[1]
l[0]=p[0]
m.v(0,o)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*b
x[0]=x[0]*b
d.m(y)
x[1]=l[1]
x[0]=l[0]
x[1]=x[1]*a0
x[0]=x[0]*a0
c.v(0,y)
j=b2[0]
a3=p[1]
b2=b2[1]
a7=p[0]
a9=c2[0]
b0=n[1]
c2=c2[1]
b1=n[0]
f-=a*(j*a3-b2*a7+(a9*b0-c2*b1))
e+=a1*(a9*a3-c2*a7+(b3[0]*b0-b3[1]*b1))
c0.d=s[0]
c1.d=s[1]
break $loop$1}break $loop$1}}a5[1]=a5[1]
a5[0]=a5[0]
if(h.go!==0){if(f*f>0)h.sV(!0)
h.r=f}a4[1]=a4[1]
a4[0]=a4[0]
if(g.go!==0){if(e*e>0)g.sV(!0)
g.r=e}++k}},
e3:function(){var z,y,x,w,v,u,t
z=0
while(!0){y=this.b
if(typeof y!=="number")return H.e(y)
if(!(z<y))break
y=this.a
if(z>=y.length)return H.b(y,z)
x=y[z]
w=x.gc5()
v=0
while(!0){y=x.ga0()
if(typeof y!=="number")return H.e(y)
if(!(v<y))break
y=w.a
if(v>=2)return H.b(y,v)
u=y[v]
t=x.a
if(v>=t.length)return H.b(t,v)
u.sX(t[v].gX())
y=y[v]
if(v>=t.length)return H.b(t,v)
y.sa5(t[v].ga5());++v}++z}},
cs:function(c0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9
z=this.r.a
y=this.e
x=y.a
w=this.dx
v=w.a
u=this.dy
t=u.a
s=this.db
r=s.r
q=s.x
p=s.f
o=p.a
n=q.a
m=s.a
l=s.b
k=l.a
j=m.a
i=s.d
h=i.a
g=s.e
f=g.a
e=0
d=0
while(!0){c=this.b
if(typeof c!=="number")return H.e(c)
if(!(d<c))break
c=this.a
if(d>=c.length)return H.b(c,d)
b=c[d]
a=b.gS()
a0=b.gT()
c=a.x
a1=c*a.y
a2=c*a.fr
c=a0.x
a3=c*a0.y
a4=c*a0.fr
c=a1+a3
a5=0
while(!0){a6=b.ga0()
if(typeof a6!=="number")return H.e(a6)
if(!(a5<a6))break
switch(b.gaA(b)){case 0:a6=b.gS()
a7=b.gt()
V.o(a6.k1,a7,i)
a7=b.gT()
a6=b.gaw(b)
if(0>=a6.length)return H.b(a6,0)
a6=a6[0].gt()
V.o(a7.k1,a6,g)
if(V.b8(i,g)>14208639999999999e-30){j[1]=f[1]
j[0]=f[0]
m.m(i)
m.Z()}else{j[0]=1
j[1]=0}k[1]=h[1]
k[0]=h[0]
a6=l.v(0,g).a
a6[1]=a6[1]*0.5
a6[0]=a6[0]*0.5
o[1]=f[1]
o[0]=f[0]
p.m(i)
a6=p.B(m)
a7=b.z
if(typeof a7!=="number")return H.e(a7)
s.c=a6-a7
break
case 1:a6=b.gS()
a7=b.ga3()
a6=a6.k1
a7=a7.a
j[1]=a7[1]
j[0]=a7[0]
a6.b.an(0,m)
a6=b.gS()
a7=b.gt()
V.o(a6.k1,a7,r)
a7=b.gT()
a6=b.gaw(b)
if(a5>=a6.length)return H.b(a6,a5)
a6=a6[a5].gt()
V.o(a7.k1,a6,q)
o[1]=n[1]
o[0]=n[0]
p.m(r)
a6=p.B(m)
a7=b.z
if(typeof a7!=="number")return H.e(a7)
s.c=a6-a7
k[1]=n[1]
k[0]=n[0]
break
case 2:a6=b.gT()
a7=b.ga3()
a6=a6.k1
a7=a7.a
j[1]=a7[1]
j[0]=a7[0]
a6.b.an(0,m)
a6=b.gT()
a7=b.gt()
V.o(a6.k1,a7,r)
a7=b.gS()
a6=b.gaw(b)
if(a5>=a6.length)return H.b(a6,a5)
a6=a6[a5].gt()
V.o(a7.k1,a6,q)
o[1]=n[1]
o[0]=n[0]
p.m(r)
a6=p.B(m)
a7=b.z
if(typeof a7!=="number")return H.e(a7)
s.c=a6-a7
k[1]=n[1]
k[0]=n[0]
j[1]=-j[1]
j[0]=-j[0]
break}a8=s.c
v[1]=k[1]
v[0]=k[0]
a6=a.k2
a7=a6.c
w.m(a7)
t[1]=k[1]
t[0]=k[0]
a9=a0.k2
b0=a9.c
u.m(b0)
e=Math.min(e,a8)
b1=Math.max(-0.2,Math.min(c0*(a8+0.005),0))
b2=v[0]
b3=j[1]
b4=v[1]
b5=j[0]
b6=b2*b3-b4*b5
b7=t[0]*b3-t[1]*b5
b8=c+a2*b6*b6+a4*b7*b7
b9=b8>0?-b1/b8:0
z[1]=b3
z[0]=j[0]
z[1]=z[1]*b9
z[0]=z[0]*b9
x[1]=z[1]
x[0]=z[0]
x[1]=x[1]*a1
x[0]=x[0]*a1
a7.m(y)
a6.e=a6.e-a2*(v[0]*z[1]-v[1]*z[0])
a.aq()
x[1]=z[1]
x[0]=z[0]
x[1]=x[1]*a3
x[0]=x[0]*a3
b0.v(0,y)
a9.e=a9.e+a4*(t[0]*z[1]-t[1]*z[0])
a0.aq();++a5}++d}return e>=-0.0075},
n:{
f8:function(){return new V.f7(P.ap(256,new V.f9(),!0,V.c3),null,V.im(),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new V.ht(new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2)))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))))}}},
f9:{"^":"f:1;",
$1:function(a){return V.d3()}},
ht:{"^":"d;a,b,c,d,e,f,r,x"},
dD:{"^":"b2;a,b,c,d,e,f,r,x,y,z,Q",
b_:function(a,b){this.by(a,b)},
aL:function(a,b,c){this.z.a.f9(a,this.f.e,b,this.r.e,c)}},
dE:{"^":"b2;a,b,c,d,e,f,r,x,y,z,Q",
b_:function(a,b){this.by(a,b)},
aL:function(a,b,c){this.z.a.fa(a,this.f.e,b,this.r.e,c)}},
co:{"^":"d;b2:a<,a3:b<,t:c<,aA:d*,aO:e@,a0:f@,S:r@,T:x@",
h:function(a){var z,y,x,w
for(z=this.a,y=0;y<z.length;++y){x=z[y]
w=a.gb2()
if(y>=w.length)return H.b(w,y)
x.h(w[y])}this.b.h(a.ga3())
this.c.h(a.gt())
this.d=a.gaA(a)
this.e=a.gaO()
this.f=a.ga0()
this.r=a.gS()
this.x=a.gT()},
n:{
dS:function(){return new V.co(P.ap(2,new V.hW(),!0,T.a),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,0,0,null,null)}}},
hW:{"^":"f:1;",
$1:function(a){return new T.a(new Float32Array(H.c(2)))}},
hZ:{"^":"d;a,b,c,d,af:e<,a4:f<,r,x",
fM:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
this.b=c
this.c=d
z=this.a
y=z.length
if(c>=y){y=new Array(Math.max(c,y*2))
y.fixed$length=Array
y=H.l(y,[V.co])
this.a=y
C.b.ao(y,0,z.length,z)
for(x=z.length;z=this.a,x<z.length;++x){y=V.dS()
if(x>=z.length)return H.b(z,x)
z[x]=y}}for(x=0;x<this.b;++x){if(x>=32)return H.b(b,x)
w=b[x]
v=w.f
u=w.r
t=v.e
s=u.e
r=t.b
q=s.b
p=v.d
o=u.d
n=w.x
z=this.a
if(x>=z.length)return H.b(z,x)
m=z[x]
m.sS(p)
m.sT(o)
z=m.ga3().a
y=n.b.a
z[1]=y[1]
z[0]=y[0]
y=m.gt().a
z=n.c.a
y[1]=z[1]
y[0]=z[0]
m.saA(0,n.d)
m.sa0(n.e)
m.saO(r+q)
z=n.a
l=0
while(!0){y=m.ga0()
if(typeof y!=="number")return H.e(y)
if(!(l<y))break
if(l>=2)return H.b(z,l)
k=z[l]
y=m.gb2()
j=k.gt()
if(l>=y.length)return H.b(y,l)
y[l]=j;++l}}},
bv:function(c1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
for(z=this.r.a,y=this.x,x=y.a,w=this.e,v=w.a,u=this.f,t=u.a,s=this.d,r=s.a,q=s.b,p=q.a,o=r.a,n=s.f,m=n.a,l=s.x.a,k=s.r,j=s.d,i=j.a,h=s.e,g=h.a,f=0,e=0;e<this.b;++e){d=this.a
if(e>=d.length)return H.b(d,e)
c=d[e]
b=c.gS()
a=c.gT()
a0=b.x
a1=a.x
d=this.c
if(b==null?d==null:b===d)a1=0
else a0=0
a2=a0*b.y
a3=a0*b.fr
a4=a1*a.y
a5=a1*a.fr
d=a2+a4
a6=0
while(!0){a7=c.ga0()
if(typeof a7!=="number")return H.e(a7)
if(!(a6<a7))break
switch(c.gaA(c)){case 0:a7=c.gS()
a8=c.gt()
a7.toString
a9=new Float32Array(2)
V.o(a7.k1,a8,new T.a(a9))
i[1]=a9[1]
i[0]=a9[0]
a9=c.gT()
a8=c.gb2()
if(0>=a8.length)return H.b(a8,0)
a8=a8[0]
a9.toString
a7=new Float32Array(2)
V.o(a9.k1,a8,new T.a(a7))
g[1]=a7[1]
g[0]=a7[0]
if(V.b8(j,h)>14208639999999999e-30){o[1]=g[1]
o[0]=g[0]
r.m(j)
r.Z()}else{o[0]=1
o[1]=0}p[1]=i[1]
p[0]=i[0]
a7=q.v(0,h).a
a7[1]=a7[1]*0.5
a7[0]=a7[0]*0.5
m[1]=g[1]
m[0]=g[0]
n.m(j)
a7=n.B(r)
a8=c.e
if(typeof a8!=="number")return H.e(a8)
s.c=a7-a8
break
case 1:a7=c.gS()
a8=c.ga3()
a7.toString
a9=new Float32Array(2)
a7=a7.k1
a8=a8.a
a9[1]=a8[1]
a9[0]=a8[0]
a7.b.an(0,new T.a(a9))
o[1]=a9[1]
o[0]=a9[0]
a7=c.gS()
a8=c.gt()
a7.toString
a9=new Float32Array(2)
V.o(a7.k1,a8,new T.a(a9))
a8=k.a
a8[1]=a9[1]
a8[0]=a9[0]
a9=c.gT()
a8=c.gb2()
if(a6>=a8.length)return H.b(a8,a6)
a8=a8[a6]
a9.toString
a7=new Float32Array(2)
V.o(a9.k1,a8,new T.a(a7))
l[1]=a7[1]
l[0]=a7[0]
m[1]=l[1]
m[0]=l[0]
n.m(k)
a7=n.B(r)
a8=c.e
if(typeof a8!=="number")return H.e(a8)
s.c=a7-a8
p[1]=l[1]
p[0]=l[0]
break
case 2:a7=c.gT()
a8=c.ga3()
a7.toString
a9=new Float32Array(2)
a7=a7.k1
a8=a8.a
a9[1]=a8[1]
a9[0]=a8[0]
a7.b.an(0,new T.a(a9))
o[1]=a9[1]
o[0]=a9[0]
a7=c.gT()
a8=c.gt()
a7.toString
a9=new Float32Array(2)
V.o(a7.k1,a8,new T.a(a9))
a8=k.a
a8[1]=a9[1]
a8[0]=a9[0]
a9=c.gS()
a8=c.gb2()
if(a6>=a8.length)return H.b(a8,a6)
a8=a8[a6]
a9.toString
a7=new Float32Array(2)
V.o(a9.k1,a8,new T.a(a7))
l[1]=a7[1]
l[0]=a7[0]
m[1]=l[1]
m[0]=l[0]
n.m(k)
a7=n.B(r)
a8=c.e
if(typeof a8!=="number")return H.e(a8)
s.c=a7-a8
p[1]=l[1]
p[0]=l[0]
o[1]=-o[1]
o[0]=-o[0]
break}b0=s.c
v[1]=p[1]
v[0]=p[0]
a7=b.k2
a8=a7.c
w.m(a8)
t[1]=p[1]
t[0]=p[0]
a9=a.k2
b1=a9.c
u.m(b1)
f=Math.min(f,b0)
b2=Math.max(-0.2,Math.min(c1*(b0+0.005),0))
b3=v[0]
b4=o[1]
b5=v[1]
b6=o[0]
b7=b3*b4-b5*b6
b8=t[0]*b4-t[1]*b6
b9=d+a3*b7*b7+a5*b8*b8
c0=b9>0?-b2/b9:0
z[1]=b4
z[0]=o[0]
z[1]=z[1]*c0
z[0]=z[0]*c0
x[1]=z[1]
x[0]=z[0]
x[1]=x[1]*a2
x[0]=x[0]*a2
a8.m(y)
a7.e=a7.e-a3*(v[0]*z[1]-v[1]*z[0])
b.aq()
x[1]=z[1]
x[0]=z[0]
x[1]=x[1]*a4
x[0]=x[0]*a4
b1.v(0,y)
a9.e=a9.e+a5*(t[0]*z[1]-t[1]*z[0])
a.aq();++a6}}return f>=-0.0075},
n:{
i_:function(){return new V.hZ(P.ap(4,new V.i1(),!0,V.co),0,null,new V.i0(new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),0,new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2)))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))))}}},
i1:{"^":"f:1;",
$1:function(a){return V.dS()}},
i0:{"^":"d;a,b,c,d,e,f,r,x"},
dh:{"^":"d;f2:a<,b,c",
h:function(a){this.a=a.gf2()
this.b=a.b
this.c=a.c}},
b3:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",
eb:function(a,b,c){var z,y,x,w,v,u,t,s,r
if(this.x==null)return
z=this.ch
this.e.bY(z,b)
y=this.cx
this.e.bY(y,c)
x=this.a
w=x.a
v=z.a
u=v.a
t=u[0]
s=y.a.a
r=s[0]
t=t<r?t:r
w=w.a
w[0]=t
t=u[1]
s=s[1]
w[1]=t<s?t:s
w=x.b
z=z.b.a
t=z[0]
y=y.b.a
s=y[0]
t=t>s?t:s
w=w.a
w[0]=t
z=z[1]
y=y[1]
w[1]=z>y?z:y
z=c.a.a
y=b.a.a
u[0]=z[0]-y[0]
u[1]=z[1]-y[1]
y=this.x
if(a.a.h0(y,x,v))a.c.push(y)}},
fq:{"^":"d;a,b,c,d,e,f,r"},
fO:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
fK:function(a,b,c,d){var z,y,x,w,v
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.a=d
z=this.b
if(z==null||a>z.length)this.b=H.l(new Array(a),[V.bq])
z=this.c
if(z!=null){y=this.Q
z=z.length
if(typeof y!=="number")return y.P()
z=y>z}else z=!0
if(z){z=this.Q
if(typeof z!=="number")return H.e(z)
this.c=H.l(new Array(z),[V.b2])}z=this.d
if(z!=null){y=this.ch
z=z.length
if(typeof y!=="number")return y.P()
z=y>z}else z=!0
if(z){z=this.ch
if(typeof z!=="number")return H.e(z)
this.d=H.l(new Array(z),[V.h0])}x=this.f
z=x==null
if(!z){y=this.z
w=x.length
if(typeof y!=="number")return y.P()
w=y>w
y=w}else y=!0
if(y){if(z)x=H.l(new Array(0),[V.cv])
z=this.z
if(typeof z!=="number")return H.e(z)
z=new Array(z)
z.fixed$length=Array
z=H.l(z,[V.cv])
this.f=z
v=x.length
C.b.ao(z,0,v,x)
for(;z=this.f,v<z.length;++v){y=new V.cv(null,null)
y.a=new T.a(new Float32Array(2))
y.b=0
z[v]=y}}x=this.e
z=x==null
if(!z){y=this.z
w=x.length
if(typeof y!=="number")return y.P()
w=y>w
y=w}else y=!0
if(y){if(z)x=H.l(new Array(0),[V.ch])
z=this.z
if(typeof z!=="number")return H.e(z)
z=new Array(z)
z.fixed$length=Array
z=H.l(z,[V.ch])
this.e=z
v=x.length
C.b.ao(z,0,v,x)
for(;z=this.e,v<z.length;++v){y=new V.ch(null,null)
y.a=new T.a(new Float32Array(2))
y.b=0
z[v]=y}}},
dZ:function(a4,a5,a6){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a5.a
y=0
while(!0){x=this.r
if(typeof x!=="number")return H.e(x)
if(!(y<x))break
c$0:{x=this.b
if(y>=x.length)return H.b(x,y)
w=x[y]
if(w.go!==2)break c$0
x=w.db.a
v=x[0]
u=w.y
t=z[0]
s=a4.a
x=x[1]
r=z[1]
q=new Float32Array(2)
q[0]=(v*u+t)*s
q[1]=(x*u+r)*s
s=w.f
s.v(0,new T.a(q))
q=w.r
p=q+a4.a*w.fr*w.dx
if(w.go!==0){if(p*p>0)w.sV(!0)
w.r=p
x=p}else x=q
v=a4.a
o=1-v*w.fx
u=o<1
if(0>(u?o:1))n=0
else n=u?o:1
u=s.a
u[1]=u[1]*n
u[0]=u[0]*n
m=1-v*w.fy
l=m<1?m:1
x*=0>l?0:l
if(w.go!==0){if(x*x>0)w.sV(!0)
w.r=x}}++y}z=this.y
if(typeof z!=="number")return H.e(z)
x=this.c
k=-1
j=0
for(;j<z;++j){v=x.length
if(j>=v)return H.b(x,j)
u=x[j]
i=u.f
h=u.r
g=i.d
f=h.d
if(g.go!==0&&f.go!==0){++k
if(k>=v)return H.b(x,k)
e=x[k]
x[k]=u
x[j]=e}}v=this.cy
v.fJ(x,z,a4.c)
v.hh()
y=0
while(!0){z=this.x
if(typeof z!=="number")return H.e(z)
if(!(y<z))break
z=this.d
if(y>=z.length)return H.b(z,y)
z[y].hw(a4);++y}for(y=0;y<a4.d;++y){d=0
while(!0){z=this.x
if(typeof z!=="number")return H.e(z)
if(!(d<z))break
z=this.d
if(d>=z.length)return H.b(z,d)
z[d].hm(a4);++d}v.e2()}v.e3()
z=new Float32Array(H.c(2))
e=new T.a(z)
x=this.db
u=x.a
y=0
while(!0){t=this.r
if(typeof t!=="number")return H.e(t)
if(!(y<t))break
c$0:{t=this.b
if(y>=t.length)return H.b(t,y)
w=t[y]
if(w.go===0)break c$0
t=w.f.a
u[1]=t[1]
u[0]=t[0]
s=a4.a
u[1]=u[1]*s
u[0]=u[0]*s
if(x.B(x)>4){c=2/x.gp(x)
t[1]=t[1]*c
t[0]=t[0]*c}s=a4.a
r=w.r
b=s*r
if(b*b>2.4674011002723395){s=r*(1.5707963267948966/Math.abs(b))
if(w.go!==0){if(s*s>0)w.sV(!0)
w.r=s}}s=w.k2
r=s.c
q=s.b.a
a=r.a
q[1]=a[1]
q[0]=a[0]
s.d=s.e
z[1]=t[1]
z[0]=t[0]
t=a4.a
z[1]=z[1]*t
z[0]=z[0]*t
r.v(0,e)
s.e=s.e+a4.a*w.r
w.aq()}++y}for(y=0;y<a4.e;++y){a0=v.cs(0.2)
a1=!0
d=0
while(!0){z=this.x
if(typeof z!=="number")return H.e(z)
if(!(d<z))break
z=this.d
if(d>=z.length)return H.b(z,d)
a2=z[d].cs(0.2)
a1=a1&&a2;++d}if(a0&&a1)break}this.h9(v.a)
a3=99999999999999
y=0
while(!0){z=this.r
if(typeof z!=="number")return H.e(z)
if(!(y<z))break
c$0:{z=this.b
if(y>=z.length)return H.b(z,y)
w=z[y]
if(w.go===0)break c$0
z=w.b
if(typeof z!=="number")return z.D()
z=(z&4)===0
if(z){w.d=0
a3=0}if(!z){z=w.r
if(!(z*z>0.0012184696791468343)){z=w.f
z=z.B(z)>0.0001}else z=!0}else z=!0
if(z){w.d=0
a3=0}else{z=w.d+a4.a
w.d=z
a3=Math.min(a3,z)}}++y}if(a3>=0.5){y=0
while(!0){z=this.r
if(typeof z!=="number")return H.e(z)
if(!(y<z))break
z=this.b
if(y>=z.length)return H.b(z,y)
z[y].sV(!1);++y}}},
h9:function(a){var z,y,x,w,v,u
if(this.a==null)return
z=this.dx
y=z.a
z=z.b
x=0
while(!0){w=this.y
if(typeof w!=="number")return H.e(w)
if(!(x<w))break
w=this.c
if(x>=w.length)return H.b(w,x)
w[x]
if(x>=a.length)return H.b(a,x)
v=a[x]
u=0
while(!0){w=v.ga0()
if(typeof w!=="number")return H.e(w)
if(!(u<w))break
w=v.gaw(v)
if(u>=w.length)return H.b(w,u)
w=w[u].gX()
if(u>=2)return H.b(y,u)
y[u]=w
w=v.gaw(v)
if(u>=w.length)return H.b(w,u)
z[u]=w[u].ga5();++u}this.a.toString;++x}}},
ch:{"^":"d;j:a*,b"},
cv:{"^":"d;dH:a<,b"},
h0:{"^":"d;"},
i2:{"^":"d;a,b,c,d,e,f"},
ih:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
bC:function(a,b,c){var z,y,x,w
z=new V.bs(null,!1)
z.a=a
z.b=!0
y=this.dx
if(b>=2)return H.b(y,b)
x=y[b]
x.length
if(c>=2)return H.b(x,c)
x[c]=z
if(b!==c){w=new V.bs(null,!1)
w.a=a
y[c][b]=w}},
h4:function(a,b){var z,y,x,w,v,u
z=a.e.a
y=b.e.a
x=this.dx
if(z>=2)return H.b(x,z)
x=x[z]
x.length
if(y>=2)return H.b(x,y)
w=x[y]
v=w.a
if(v!=null){if(v.b===v.c)v=this.eH(z,y)
if(w.b){u=v.b5()
u.b_(a,b)
return u}else{u=v.b5()
u.b_(b,a)
return u}}else return},
eH:function(a,b){var z,y
if(a===0&&b===0)return this.ch.ci()
else{z=a===1&&b===1
y=this.ch
if(z)return y.cm()
else return y.cl()}},
aW:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
if((this.a&2)===2)return
z=V.ab()
y=V.aa()
x=new T.a(new Float32Array(H.c(2)))
x.h(a.e)
w=new Float32Array(H.c(2))
v=a.c
u=new V.dh(0,0,0)
u.a=1
u.b=65535
t=new Float32Array(H.c(2))
s=V.ab()
r=new Float32Array(H.c(2))
q=new Float32Array(H.c(2))
p=a.a
o=new V.bq(this,0,null,0,v,x,0,null,null,null,null,null,0,null,new T.a(w),0,0,0,a.Q,a.ch,p,null,z,y,new V.fq(null,null,0.2,0,0,!1,u),new V.hl(0,new T.a(t),0),s,new T.a(r),new T.a(q))
o.b=4
o.b=6
o.b=38
z.a.h(a.d)
z.b.bu(a.b)
x=y.a
x.Y()
w=y.b
V.o(z,x,w)
y.c.h(w)
w=a.b
y.e=w
y.d=w
if(p===2){o.x=1
o.y=1}else{o.x=0
o.y=0}z=this.c
o.z=z
if(z!=null)z.Q=o
this.c=o;++this.e
return o},
f4:function(){var z,y
for(z=this.c;z!=null;z=z.z){y=z.db.a
y[0]=0
y[1]=0
z.dx=0}},
bv:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.r2
y=this.e
x=this.b
z.fK(y,x.c,this.f,x.e)
for(w=this.c;w!=null;w=w.z){y=w.b
if(typeof y!=="number")return y.D()
w.b=y&4294967294}for(v=this.b.b;v!=null;v=v.c){y=v.a
if(typeof y!=="number")return y.D()
v.a=y&4294967294}for(u=this.d;!1;u=u.ght())u.sdi(!1)
t=this.e
if(this.rx.length<t)this.rx=H.l(new Array(t),[V.bq])
for(s=this.c,y=this.r;s!=null;s=s.z){x=s.b
if(typeof x!=="number")return x.D()
if((x&1)===1)continue
if((x&2)!==2||(x&32)!==32)continue
if(s.go===0)continue
z.r=0
z.y=0
z.x=0
r=this.rx
if(0>=r.length)return H.b(r,0)
r[0]=s
s.b=x|1
for(q=1;q>0;){x=this.rx;--q
if(q>=x.length)return H.b(x,q)
w=x[q]
x=z.r
w.id=x
r=z.b
if(typeof x!=="number")return x.L()
z.r=x+1
if(x>=r.length)return H.b(r,x)
r[x]=w
w.sV(!0)
if(w.go===0)continue
for(p=w.c;p!=null;p=p.d){o=p.b
x=o.a
if(typeof x!=="number")return x.D()
if((x&1)===1)continue
if((x&4)!==4||(x&2)!==2)continue
n=o.f.z
m=o.r.z
if(n===!0||m===!0)continue
r=z.c
l=z.y
if(typeof l!=="number")return l.L()
z.y=l+1
if(l>=r.length)return H.b(r,l)
r[l]=o
o.a=x|1
k=p.a
x=k.b
if(typeof x!=="number")return x.D()
if((x&1)===1)continue
r=this.rx
j=q+1
if(q>=r.length)return H.b(r,q)
r[q]=k
k.b=x|1
q=j}for(i=w.cy;!1;i=i.gb3()){i.gdj().gdi()
k=i.ghx()
k.ghu(k)
x=i.gdj()
r=z.d
l=z.x
if(typeof l!=="number")return l.L()
z.x=l+1
if(l>=r.length)return H.b(r,l)
r[l]=x
i.gdj().sdi(!0)
k.gda().D(0,1)
x=this.rx
j=q+1
if(q<0||q>=x.length)return H.b(x,q)
x[q]=k
k.sda(k.gda().aD(0,1))
q=j}}z.dZ(a,y,!0)
h=0
while(!0){x=z.r
if(typeof x!=="number")return H.e(x)
if(!(h<x))break
x=z.b
if(h>=x.length)return H.b(x,h)
w=x[h]
if(w.go===0){x=w.b
if(typeof x!=="number")return x.D()
w.b=x&4294967294}++h}}for(w=this.c;w!=null;w=w.z){z=w.b
if(typeof z!=="number")return z.D()
if((z&1)===0)continue
if(w.go===0)continue
w.ec()}z=this.b
z.a.dF(z.gcw())},
e1:function(){var z,y,x,w
for(z=this.b.b;z!=null;z=z.c){y=z.a
if(typeof y!=="number")return y.aD()
z.a=y|4
z.y=0}for(x=this.c;x!=null;x=x.z){y=x.b
if(typeof y!=="number")return y.D()
if((y&1)!==0){w=x.go
w=w===1||w===0}else w=!0
if(w)x.b=y|64
else x.b=y&4294967231}for(x=this.c;x!=null;x=x.z){y=x.b
if(typeof y!=="number")return y.D()
if((y&64)===64||(y&8)===8)continue
this.bw(x)
y=x.b
if(typeof y!=="number")return y.aD()
x.b=y|64}for(x=this.c;x!=null;x=x.z){y=x.b
if(typeof y!=="number")return y.D()
if((y&64)===64||(y&8)!==8)continue
this.bw(x)
y=x.b
if(typeof y!=="number")return y.aD()
x.b=y|64}},
bw:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
z=a.b
if(typeof z!=="number")return z.D()
y=(z&8)===8
z=this.k2
x=this.k1
w=x.a
v=x.b
u=x.c
t=x.d
s=this.ch
r=null
q=1
p=null
o=0
do{for(n=a.c,m=!1,l=0;n!=null;n=n.d){k=n.b
if(k==null?r==null:k===r)continue
j=n.a
i=j.go
if(y){h=j.b
if(typeof h!=="number")return h.D()
if((h&64)===0)continue
if(i!==0){h=k.a
if(typeof h!=="number")return h.D()
h=(h&16)!==0}else h=!1
if(h)continue}else if(i===2)continue
h=k.a
if(typeof h!=="number")return h.D()
if((h&4)===4){h=k.y
if(typeof h!=="number")return h.P()
h=h>10}else h=!0
if(h)continue
g=k.f
f=k.r
if(g.z===!0||f.z===!0)continue
e=g.d
d=f.d
w.ba(g.e)
v.ba(f.e)
u.h(e.k2)
t.h(d.k2)
x.e=q
s.b.he(z,x)
if(z.a===3&&z.b<q){q=z.b
p=j
r=k
m=!0}++l}++o}while(m&&l>1&&o<50)
if(r==null){z=a.k2
z.d1(1)
x=z.c.a
w=z.b.a
x[1]=w[1]
x[0]=w[0]
z.e=z.d
a.aq()
return}z=this.k3
x=a.k2
z.h(x)
x.d1(q)
w=x.c.a
v=x.b.a
w[1]=v[1]
w[0]=v[0]
x.e=x.d
a.aq()
r.cf(this.b.e)
w=r.a
if(typeof w!=="number")return w.D()
if((w&4)!==4){x.h(z)
this.bw(a)}z=r.y
if(typeof z!=="number")return z.L()
r.y=z+1
n=a.c
l=0
while(!0){if(!(n!=null&&l<32))break
c$0:{if(n.a.go===2)break c$0
c=n.b
z=c.a
if(typeof z!=="number")return z.D()
if((z&4)!==4)break c$0
g=c.f
f=c.r
if(g.z===!0||f.z===!0)break c$0
if(c!==r)c.cf(this.b.e)
z=c.a
if(typeof z!=="number")return z.D()
if((z&4)!==4||(z&2)!==2)break c$0
z=this.r1
if(l>=32)return H.b(z,l)
z[l]=c;++l}n=n.d}z=this.k4
z.fM(0,this.r1,l,a)
for(b=0;b<20;++b)if(z.bv(0.75))break
if(p.go!==0){z=r.a
if(typeof z!=="number")return z.aD()
r.a=z|16}},
er:function(a,b,c){var z,y,x
this.b=new V.f6(V.eT(),null,0,new V.f4(),null,this)
for(z=this.dx,y=[V.bs],x=0;x<2;++x)z[x]=H.l(new Array(2),y)
z=this.ch
this.bC(z.ci(),0,0)
this.bC(z.cl(),1,0)
this.bC(z.cm(),1,1)},
n:{
ii:function(a,b,c){var z=[P.a_]
z=new V.ih(4,null,null,null,0,0,a,!0,null,null,null,c,0,!0,!0,H.l(new Array(2),[[P.n,V.bs]]),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new V.i2(0,0,0,0,0,!0),new T.a(new Float32Array(H.c(2))),new T.a(new Float32Array(H.c(2))),new V.ip(null,null),new V.hX(V.aG(),V.aG(),V.aa(),V.aa(),0),new V.hY(0,0),V.aa(),V.i_(),H.l(new Array(32),[V.b2]),new V.fO(null,null,null,null,null,null,null,null,null,null,null,null,null,V.f8(),new T.a(new Float32Array(H.c(2))),new V.f5(H.l(new Array(2),z),H.l(new Array(2),z))),H.l(new Array(10),[V.bq]))
z.er(a,!0,c)
return z}}},
ip:{"^":"d;a,b"},
fb:{"^":"d;a,b,c",
ci:function(){var z,y
z=P.ao(null,V.d_)
for(y=0;y<10;++y)z.al(new V.d_(null,null,null,new V.aF(null,null,null,null),new V.aF(null,null,null,null),null,null,V.aQ(),null,this,V.aQ()))
return z},
cl:function(){var z,y
z=P.ao(null,V.dD)
for(y=0;y<10;++y)z.al(new V.dD(null,null,null,new V.aF(null,null,null,null),new V.aF(null,null,null,null),null,null,V.aQ(),null,this,V.aQ()))
return z},
cm:function(){var z,y
z=P.ao(null,V.dE)
for(y=0;y<10;++y)z.al(new V.dE(null,null,null,new V.aF(null,null,null,null),new V.aF(null,null,null,null),null,null,V.aQ(),null,this,V.aQ()))
return z}}}],["","",,Y,{"^":"",eW:{"^":"id;a,b,c,d"}}],["","",,T,{"^":"",aq:{"^":"d;A:a>",
dW:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a
return this},
h:function(a){var z,y
z=this.a
y=J.m(a)
z[3]=J.y(y.gA(a),3)
z[2]=J.y(y.gA(a),2)
z[1]=J.y(y.gA(a),1)
z[0]=J.y(y.gA(a),0)
return this},
k:function(a){return"[0] "+this.cn(0).k(0)+"\n[1] "+this.cn(1).k(0)+"\n"},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.b(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.b(z,b)
z[b]=c},
cn:function(a){var z,y,x
z=new Float32Array(H.c(2))
y=this.a
if(a>=4)return H.b(y,a)
z[0]=y[a]
x=2+a
if(x>=4)return H.b(y,x)
z[1]=y[x]
return new T.a(z)},
C:function(a,b){var z,y,x
if(typeof b==="number"){z=new Float32Array(H.c(4))
y=this.a
z[3]=y[3]*b
z[2]=y[2]*b
z[1]=y[1]*b
z[0]=y[0]*b
return new T.aq(z)}z=J.z(b)
if(!!z.$isa){y=new Float32Array(H.c(2))
x=this.a
y[1]=C.a.C(x[1],z.gA(b).i(0,0))+C.a.C(x[3],z.gA(b).i(0,1))
y[0]=C.a.C(x[0],z.gA(b).i(0,0))+C.a.C(x[2],z.gA(b).i(0,1))
return new T.a(y)}b.ghv()
throw H.h(P.bn(b))},
L:function(a,b){var z,y,x
z=new Float32Array(H.c(4))
y=this.a
x=J.m(b)
z[0]=y[0]+J.y(x.gA(b),0)
z[1]=y[1]+J.y(x.gA(b),1)
z[2]=y[2]+J.y(x.gA(b),2)
z[3]=y[3]+J.y(x.gA(b),3)
return new T.aq(z)},
R:function(a,b){var z,y,x
z=new Float32Array(H.c(4))
y=this.a
x=J.m(b)
z[0]=y[0]-J.y(x.gA(b),0)
z[1]=y[1]-J.y(x.gA(b),1)
z[2]=y[2]-J.y(x.gA(b),2)
z[3]=y[3]-J.y(x.gA(b),3)
return new T.aq(z)},
a6:function(){var z,y
z=new Float32Array(H.c(4))
y=this.a
z[0]=y[0]
z[1]=y[2]
z[2]=y[1]
z[3]=y[3]
return new T.aq(z)},
fS:function(){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[3]
w=z[1]
v=z[2]
u=y*x-w*v
if(u===0)return 0
t=1/u
z[0]=x*t
z[1]=-w*t
z[2]=-v*t
z[3]=y*t
return u},
bu:function(a){var z,y,x
z=Math.cos(a)
y=Math.sin(a)
x=this.a
x[0]=z
x[1]=y
x[2]=-y
x[3]=z},
an:function(a,b){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=b.a
w=x[0]
v=z[2]
u=x[1]
t=z[1]
z=z[3]
x[0]=y*w+v*u
x[1]=t*w+z*u
return b},
O:function(a,b){b.h(a)
return this.an(0,b)}},a:{"^":"d;A:a>",
aP:function(a,b){var z=this.a
z[0]=a
z[1]=b
return this},
Y:function(){var z=this.a
z[0]=0
z[1]=0
return this},
h:function(a){var z,y
z=this.a
y=J.m(a)
z[1]=J.y(y.gA(a),1)
z[0]=J.y(y.gA(a),0)
return this},
k:function(a){var z=this.a
return"["+H.i(z[0])+","+H.i(z[1])+"]"},
R:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
x=J.m(b)
w=J.y(x.gA(b),0)
z=z[1]
x=J.y(x.gA(b),1)
v=new Float32Array(H.c(2))
v[0]=y-w
v[1]=z-x
return new T.a(v)},
L:function(a,b){var z,y,x,w,v
z=this.a
y=z[0]
x=J.m(b)
w=J.y(x.gA(b),0)
z=z[1]
x=J.y(x.gA(b),1)
v=new Float32Array(H.c(2))
v[0]=y+w
v[1]=z+x
return new T.a(v)},
b8:function(a,b){var z,y,x,w
z=1/b
y=this.a
x=y[0]
y=y[1]
w=new Float32Array(H.c(2))
w[0]=x*z
w[1]=y*z
return new T.a(w)},
C:function(a,b){var z,y,x
z=this.a
y=z[0]
z=z[1]
x=new Float32Array(H.c(2))
x[0]=y*b
x[1]=z*b
return new T.a(x)},
i:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.b(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.b(z,b)
z[b]=c},
gp:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
gc3:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
Z:function(){var z,y
z=this.gp(this)
if(z===0)return this
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
return this},
h2:function(){var z,y
z=this.gp(this)
if(z===0)return 0
z=1/z
y=this.a
y[0]=y[0]*z
y[1]=y[1]*z
return z},
B:function(a){var z,y,x
z=this.a
y=z[0]
x=a.a
return y*x[0]+z[1]*x[1]},
aJ:function(a){var z,y
z=this.a
y=a.a
return z[0]*y[1]-z[1]*y[0]},
v:function(a,b){var z,y
z=this.a
y=J.m(b)
z[0]=z[0]+J.y(y.gA(b),0)
z[1]=z[1]+J.y(y.gA(b),1)
return this},
m:function(a){var z,y
z=this.a
y=a.a
z[0]=z[0]-y[0]
z[1]=z[1]-y[1]
return this},
G:function(a,b){var z=this.a
z[1]=z[1]*b
z[0]=z[0]*b
return this},
K:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]
return this},
sj:function(a,b){this.a[0]=b
return b},
sl:function(a,b){this.a[1]=b
return b},
gj:function(a){return this.a[0]},
gl:function(a){return this.a[1]},
n:{
bL:function(a,b){var z=new Float32Array(H.c(2))
z[0]=a
z[1]=b
return new T.a(z)}}}}],["","",,V,{"^":"",
lk:[function(){var z,y,x,w
z=H.l([],[P.p])
y=H.l([],[V.am])
x=H.l([],[T.a])
w=new V.fu(null,null,null,null,z,y,null,null,0,0,!1,!1,null,null,x,C.j)
w.fL(0)
w.ay()},"$0","eu",0,0,2],
fu:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
fn:function(){J.bm(this.b,"#fff")
C.b.aZ(this.db,new V.fy(this))},
bx:function(a,b){var z,y,x,w,v,u,t,s,r
J.cP(this.b,0,0,800,600)
if(this.Q){z=this.cx
z.toString
if(typeof b!=="number")return b.aC()
y=C.f.d3(C.a.aC(b,800)/200)
J.bm(z.a,"#2e422c")
J.bZ(z.a,0,0,800,600)
if(y===1)J.bj(z.a,z.b,P.a9(0,0,800,600,null),P.a9(0,0,800,600,null))
else if(y===2)J.bj(z.a,z.b,P.a9(0,0,800,600,null),P.a9(800,0,800,600,null))
else if(y===3)J.bj(z.a,z.b,P.a9(0,0,800,600,null),P.a9(0,600,800,600,null))
else if(y===4)J.bj(z.a,z.b,P.a9(0,0,800,600,null),P.a9(800,600,800,600,null))
x=z.a
J.m(x).sdl(x,0.5)
x.fillStyle="#000"
x.font="100px sans-serif"
z=z.c
C.h.c0(x,"YOU DID IT!",100+z.dr(5),100+z.dr(5))}else if(this.ch){this.ch=!1
this.cq()
C.b.ax(this.f,this.x)
this.z=b}else{z=J.aY(b)
if(J.aA(z.R(b,this.z),2500)){x=this.x
if(x!=null)x.ca(b)
J.eL(this.b,J.cO(z.R(b,this.z),1250))
this.r.ca(b)
z=z.R(b,this.z)
if(typeof z!=="number")return H.e(z)
w=this.r.gaM()
x=this.b
J.m(x).sco(x,1)
x.lineWidth=0.5
x.fillStyle="#fff"
x.font="80px monospace"
C.h.c0(x,w+" in "+C.f.k(C.f.dz((2500-z)/1000*10)/10)+"s",40,140)
this.y=b}else{x=this.r
if(x!=null){v=x.c
u=v.a
if((u&1)===1){u=v.b
u.a.dF(u.gcw())
u=v.a&=4294967294}v.a=u|2
u=v.fx
u.a=0.016666666666666666
u.d=10
u.e=10
u.b=60
u.c=v.cx*0.016666666666666666
u.f=!0
v.b.f7()
if(u.a>0){v.bv(u)
v.e1()
v.cx=u.b}if((v.a&4)===4)v.f4()
v.a&=4294967293
v=new Float32Array(H.c(2))
x.d.bo(x.gae().c.k1.a,new T.a(v))
u=v[0]
t=x.d.d.a
s=t[0]
if(Math.abs(u-s)>1)if(u>s)t[0]=s+1
else t[0]=s-1
v=v[1]
if(v<0)t[1]=t[1]+600
else if(v>600)t[1]=t[1]-600
x.ca(b)
v=this.f
if(v.length>1){u=this.cy
t=this.b
s=J.cO(z.R(b,this.y),16e3)
u.toString
J.cQ(t,$.$get$ca(),0,0,500,10,10,10,780,10)
r=J.V(J.aZ(s,740),30)
t.drawImage($.$get$c9(),0,0,60,60,r,5,20,20)}x.fA(this.e)
if(J.P(z.R(b,this.y),16e3))if(!this.Q){this.cq()
if(v.length>1)this.z=b}}}}C.b.sp(this.e,0)
this.fn()
z=this.c
if(typeof z!=="number")return z.L()
this.c=z+1
C.e.geY(window).cd(new V.fC(this))},
eM:function(){var z=W.iB("canvas",null)
this.a=z
J.eO(z,800)
J.eM(this.a,600)
z=document
z.body.appendChild(this.a)
this.b=J.eJ(this.a,"2d")
this.c=0
z=z.querySelector("#fps-counter")
this.d=z
z.hidden=!0},
fL:function(a){var z,y,x,w,v,u,t,s,r,q,p
this.eM()
z=this.b
y=W.K(null,"images/background_won.png",null)
x=[W.aI]
w=new W.G(y,"load",!1,x)
$.$get$E().push(w.gJ(w))
this.cx=new V.fv(z,y,C.j)
y=$.$get$c9()
z=$.$get$E()
y.toString
y=new W.G(y,"load",!1,x)
z.push(y.gJ(y))
y=$.$get$ca()
z=$.$get$E()
y.toString
y=new W.G(y,"load",!1,x)
z.push(y.gJ(y))
this.cy=new V.h9()
for(z=this.dx,y=this.db,v=0;v<150;++v){w=z.b4()
u=z.b4()
t=new Float32Array(2)
t[0]=w*800
t[1]=u*600
y.push(new T.a(t))}z=this.f
y=this.b
w=W.K(null,"images/level1.png",null)
u=new Float32Array(H.c(2))
t=new T.a(u)
u[0]=100
u[1]=140
u=[V.aJ]
s=H.l([],u)
r=new V.h3(null,w,null,this,y,null,null,null,s,null,t,null)
r.aE(this,y,t)
w=new W.G(w,"load",!1,x)
$.$get$E().push(w.gJ(w))
w=r.x.a[1]
t=new Float32Array(H.c(2))
t[0]=0
t[1]=w/4
r.ch=new T.a(t)
t=r.c
w=new Float32Array(H.c(2))
w[0]=-20
w[1]=-20
w=V.aR(t,new T.a(w))
r.z=w
t=$.$get$I()
y=$.$get$E()
t.toString
t=new W.G(t,"load",!1,x)
y.push(t.gJ(t))
s.push(new V.aS(w))
w=r.c
t=new V.v(null,20,2,w)
t.w(w,30,-17,20,2)
w=$.$get$t()
y=$.$get$q()
q=$.$get$r()
p=new V.w(t,null,null,w,y,q)
p.u(t,w,y,q)
s.push(p)
p=r.c
q=new V.v(null,20,2,p)
q.w(p,10,-21,20,2)
p=$.$get$t()
y=$.$get$q()
w=$.$get$r()
t=new V.w(q,null,null,p,y,w)
t.u(q,p,y,w)
s.push(t)
t=r.c
w=new V.v(null,20,2,t)
w.w(t,-10,-25,20,2)
t=$.$get$t()
y=$.$get$q()
p=$.$get$r()
q=new V.w(w,null,null,t,y,p)
q.u(w,t,y,p)
s.push(q)
q=V.aK(r.c,r,30,12,5,5)
p=$.$get$aj()
y=$.$get$ah()
t=$.$get$ai()
w=new V.aL(q,null,null,p,y,t)
w.u(q,p,y,t)
s.push(w)
z.push(r)
r=this.b
w=W.K(null,"images/level2.png",null)
s=new Float32Array(H.c(2))
t=new T.a(s)
s[0]=100
s[1]=140
s=H.l([],u)
y=new V.h4(null,w,null,this,r,null,null,null,s,null,t,null)
y.aE(this,r,t)
w=new W.G(w,"load",!1,x)
$.$get$E().push(w.gJ(w))
w=y.x.a[1]
t=new Float32Array(H.c(2))
t[0]=0
t[1]=w/4
y.ch=new T.a(t)
t=y.c
w=new Float32Array(H.c(2))
w[0]=-20
w[1]=-20
w=V.aR(t,new T.a(w))
y.z=w
t=$.$get$I()
r=$.$get$E()
t.toString
t=new W.G(t,"load",!1,x)
r.push(t.gJ(t))
s.push(new V.aS(w))
w=y.c
t=new V.v(null,10,2,w)
t.w(w,-9,-25,10,2)
w=$.$get$t()
r=$.$get$q()
p=$.$get$r()
q=new V.w(t,null,null,w,r,p)
q.u(t,w,r,p)
s.push(q)
q=y.c
p=new V.v(null,10,2,q)
p.w(q,9,-18,10,2)
q=$.$get$t()
r=$.$get$q()
w=$.$get$r()
t=new V.w(p,null,null,q,r,w)
t.u(p,q,r,w)
s.push(t)
t=y.c
w=new V.v(null,10,2,t)
w.w(t,-9,-11,10,2)
t=$.$get$t()
r=$.$get$q()
q=$.$get$r()
p=new V.w(w,null,null,t,r,q)
p.u(w,t,r,q)
s.push(p)
p=y.c
q=new V.v(null,10,2,p)
q.w(p,9,-4,10,2)
p=$.$get$t()
r=$.$get$q()
t=$.$get$r()
w=new V.w(q,null,null,p,r,t)
w.u(q,p,r,t)
s.push(w)
w=y.c
t=new V.v(null,10,2,w)
t.w(w,-9,3,10,2)
w=$.$get$t()
r=$.$get$q()
p=$.$get$r()
q=new V.w(t,null,null,w,r,p)
q.u(t,w,r,p)
s.push(q)
q=V.aK(y.c,y,-9,12,5,5)
p=$.$get$aj()
r=$.$get$ah()
w=$.$get$ai()
t=new V.aL(q,null,null,p,r,w)
t.u(q,p,r,w)
s.push(t)
z.push(y)
y=this.b
t=W.K(null,"images/level3.png",null)
s=new Float32Array(H.c(2))
w=new T.a(s)
s[0]=100
s[1]=180
s=H.l([],u)
r=new V.h5(null,t,null,this,y,null,null,null,s,null,w,null)
r.aE(this,y,w)
t=new W.G(t,"load",!1,x)
$.$get$E().push(t.gJ(t))
t=r.x.a[1]
w=new Float32Array(H.c(2))
w[0]=0
w[1]=t/4
r.ch=new T.a(w)
w=r.c
t=new Float32Array(H.c(2))
t[0]=-20
t[1]=-20
t=V.aR(w,new T.a(t))
r.z=t
w=$.$get$I()
y=$.$get$E()
w.toString
w=new W.G(w,"load",!1,x)
y.push(w.gJ(w))
s.push(new V.aS(t))
t=r.c
w=new V.v(null,10,2,t)
w.w(t,9,-25,10,2)
t=$.$get$t()
y=$.$get$q()
p=$.$get$r()
q=new V.w(w,null,null,t,y,p)
q.u(w,t,y,p)
s.push(q)
q=r.c
p=new V.v(null,10,2,q)
p.w(q,9,-18,10,2)
q=$.$get$t()
y=$.$get$q()
t=$.$get$r()
w=new V.w(p,null,null,q,y,t)
w.u(p,q,y,t)
s.push(w)
w=r.c
t=new V.v(null,10,2,w)
t.w(w,9,-11,10,2)
w=$.$get$t()
y=$.$get$q()
q=$.$get$r()
p=new V.w(t,null,null,w,y,q)
p.u(t,w,y,q)
s.push(p)
p=r.c
q=new V.v(null,10,2,p)
q.w(p,9,-4,10,2)
p=$.$get$t()
y=$.$get$q()
w=$.$get$r()
t=new V.w(q,null,null,p,y,w)
t.u(q,p,y,w)
s.push(t)
t=r.c
w=new V.v(null,10,2,t)
w.w(t,9,3,10,2)
t=$.$get$t()
y=$.$get$q()
p=$.$get$r()
q=new V.w(w,null,null,t,y,p)
q.u(w,t,y,p)
s.push(q)
q=V.aK(r.c,r,9,12,5,5)
p=$.$get$aj()
y=$.$get$ah()
t=$.$get$ai()
w=new V.aL(q,null,null,p,y,t)
w.u(q,p,y,t)
s.push(w)
z.push(r)
r=this.b
w=W.K(null,"images/level4.png",null)
s=new Float32Array(H.c(2))
t=new T.a(s)
s[0]=100
s[1]=180
s=H.l([],u)
y=new V.h6(null,w,null,this,r,null,null,null,s,null,t,null)
y.aE(this,r,t)
w=new W.G(w,"load",!1,x)
$.$get$E().push(w.gJ(w))
w=y.x.a[1]
t=new Float32Array(H.c(2))
t[0]=0
t[1]=w/4
y.ch=new T.a(t)
t=y.c
w=new Float32Array(H.c(2))
w[0]=-20
w[1]=-20
w=V.aR(t,new T.a(w))
y.z=w
t=$.$get$I()
r=$.$get$E()
t.toString
t=new W.G(t,"load",!1,x)
r.push(t.gJ(t))
s.push(new V.aS(w))
w=y.c
t=new V.v(null,10,2,w)
t.w(w,0,-25,10,2)
w=$.$get$t()
r=$.$get$q()
p=$.$get$r()
q=new V.w(t,null,null,w,r,p)
q.u(t,w,r,p)
s.push(q)
q=y.c
p=new V.v(null,10,2,q)
p.w(q,0,-18,10,2)
q=$.$get$t()
r=$.$get$q()
w=$.$get$r()
t=new V.w(p,null,null,q,r,w)
t.u(p,q,r,w)
s.push(t)
t=y.c
w=new V.v(null,10,2,t)
w.w(t,0,-11,10,2)
t=$.$get$t()
r=$.$get$q()
q=$.$get$r()
p=new V.w(w,null,null,t,r,q)
p.u(w,t,r,q)
s.push(p)
p=y.c
q=new V.v(null,10,2,p)
q.w(p,0,-4,10,2)
p=$.$get$t()
r=$.$get$q()
t=$.$get$r()
w=new V.w(q,null,null,p,r,t)
w.u(q,p,r,t)
s.push(w)
w=y.c
t=new V.e5(null,2,20,w)
t.w(w,6,5,2,20)
w=$.$get$cy()
r=$.$get$cw()
p=$.$get$cx()
q=new V.e6(t,null,null,w,r,p)
q.u(t,w,r,p)
s.push(q)
q=y.c
p=new V.e5(null,2,20,q)
p.w(q,13,5,2,20)
q=$.$get$cy()
r=$.$get$cw()
w=$.$get$cx()
t=new V.e6(p,null,null,q,r,w)
t.u(p,q,r,w)
s.push(t)
t=y.c
w=new V.v(null,10,2,t)
w.w(t,19,-25,10,2)
t=$.$get$t()
r=$.$get$q()
q=$.$get$r()
p=new V.w(w,null,null,t,r,q)
p.u(w,t,r,q)
s.push(p)
p=y.c
q=new V.v(null,10,2,p)
q.w(p,19,-18,10,2)
p=$.$get$t()
r=$.$get$q()
t=$.$get$r()
w=new V.w(q,null,null,p,r,t)
w.u(q,p,r,t)
s.push(w)
w=y.c
t=new V.v(null,10,2,w)
t.w(w,19,-11,10,2)
w=$.$get$t()
r=$.$get$q()
p=$.$get$r()
q=new V.w(t,null,null,w,r,p)
q.u(t,w,r,p)
s.push(q)
q=y.c
p=new V.v(null,10,2,q)
p.w(q,19,-4,10,2)
q=$.$get$t()
r=$.$get$q()
w=$.$get$r()
t=new V.w(p,null,null,q,r,w)
t.u(p,q,r,w)
s.push(t)
t=V.aK(y.c,y,9.5,12,5,5)
w=$.$get$aj()
r=$.$get$ah()
q=$.$get$ai()
p=new V.aL(t,null,null,w,r,q)
p.u(t,w,r,q)
s.push(p)
z.push(y)
y=this.b
p=W.K(null,"images/level5.png",null)
s=new Float32Array(H.c(2))
q=new T.a(s)
s[0]=100
s[1]=180
s=H.l([],u)
r=new V.h7(null,p,null,this,y,null,null,null,s,null,q,null)
r.aE(this,y,q)
p=new W.G(p,"load",!1,x)
$.$get$E().push(p.gJ(p))
p=r.x.a[1]
q=new Float32Array(H.c(2))
q[0]=0
q[1]=p/4
r.ch=new T.a(q)
q=r.c
p=new Float32Array(H.c(2))
p[0]=-20
p[1]=-20
p=V.aR(q,new T.a(p))
r.z=p
q=$.$get$I()
y=$.$get$E()
q.toString
q=new W.G(q,"load",!1,x)
y.push(q.gJ(q))
s.push(new V.aS(p))
p=r.c
q=new V.v(null,10,2,p)
q.w(p,0,-25,10,2)
p=$.$get$t()
y=$.$get$q()
w=$.$get$r()
t=new V.w(q,null,null,p,y,w)
t.u(q,p,y,w)
s.push(t)
t=r.c
w=new V.v(null,10,2,t)
w.w(t,0,-18,10,2)
t=$.$get$t()
y=$.$get$q()
p=$.$get$r()
q=new V.w(w,null,null,t,y,p)
q.u(w,t,y,p)
s.push(q)
q=r.c
p=new V.v(null,10,2,q)
p.w(q,0,-11,10,2)
q=$.$get$t()
y=$.$get$q()
t=$.$get$r()
w=new V.w(p,null,null,q,y,t)
w.u(p,q,y,t)
s.push(w)
w=r.c
t=new V.v(null,10,2,w)
t.w(w,0,-4,10,2)
w=$.$get$t()
y=$.$get$q()
q=$.$get$r()
p=new V.w(t,null,null,w,y,q)
p.u(t,w,y,q)
s.push(p)
p=r.c
q=new V.v(null,20,2,p)
q.w(p,0,8,20,2)
p=$.$get$t()
y=$.$get$q()
w=$.$get$r()
t=new V.w(q,null,null,p,y,w)
t.u(q,p,y,w)
s.push(t)
t=V.aK(r.c,r,0,12,5,5)
w=$.$get$aj()
y=$.$get$ah()
p=$.$get$ai()
q=new V.aL(t,null,null,w,y,p)
q.u(t,w,y,p)
s.push(q)
z.push(r)
r=this.b
q=W.K(null,"images/level6.png",null)
s=new Float32Array(H.c(2))
p=new T.a(s)
s[0]=140
s[1]=200
u=H.l([],u)
s=new V.h8(null,q,null,this,r,null,null,null,u,null,p,null)
s.aE(this,r,p)
q=new W.G(q,"load",!1,x)
$.$get$E().push(q.gJ(q))
q=s.x.a[1]
p=new Float32Array(H.c(2))
p[0]=0
p[1]=q/4
s.ch=new T.a(p)
p=s.c
q=new Float32Array(H.c(2))
q[0]=-20
q[1]=-20
q=V.aR(p,new T.a(q))
s.z=q
p=$.$get$I()
r=$.$get$E()
p.toString
x=new W.G(p,"load",!1,x)
r.push(x.gJ(x))
u.push(new V.aS(q))
q=s.c
x=new V.v(null,10,2,q)
x.w(q,0,-25,10,2)
q=$.$get$t()
r=$.$get$q()
p=$.$get$r()
y=new V.w(x,null,null,q,r,p)
y.u(x,q,r,p)
u.push(y)
y=s.c
p=new V.v(null,10,2,y)
p.w(y,0,-18,10,2)
y=$.$get$t()
r=$.$get$q()
q=$.$get$r()
x=new V.w(p,null,null,y,r,q)
x.u(p,y,r,q)
u.push(x)
x=s.c
q=new V.v(null,10,2,x)
q.w(x,0,-11,10,2)
x=$.$get$t()
r=$.$get$q()
y=$.$get$r()
p=new V.w(q,null,null,x,r,y)
p.u(q,x,r,y)
u.push(p)
p=s.c
y=new V.v(null,10,2,p)
y.w(p,0,-4,10,2)
p=$.$get$t()
r=$.$get$q()
x=$.$get$r()
q=new V.w(y,null,null,p,r,x)
q.u(y,p,r,x)
u.push(q)
q=V.hq(s.c,0,8,20,2)
x=$.$get$dB()
r=$.$get$dz()
p=$.$get$dA()
y=new V.hr(q,null,null,x,r,p)
y.u(q,x,r,p)
u.push(y)
y=s.c
p=new V.v(null,2,2,y)
p.w(y,50,-25,2,2)
y=$.$get$t()
r=$.$get$q()
x=$.$get$r()
q=new V.w(p,null,null,y,r,x)
q.u(p,y,r,x)
u.push(q)
q=s.c
x=new V.v(null,2,2,q)
x.w(q,50,-18,2,2)
q=$.$get$t()
r=$.$get$q()
y=$.$get$r()
p=new V.w(x,null,null,q,r,y)
p.u(x,q,r,y)
u.push(p)
p=s.c
y=new V.v(null,2,2,p)
y.w(p,50,-11,2,2)
p=$.$get$t()
r=$.$get$q()
q=$.$get$r()
x=new V.w(y,null,null,p,r,q)
x.u(y,p,r,q)
u.push(x)
x=s.c
q=new V.v(null,2,2,x)
q.w(x,50,-4,2,2)
x=$.$get$t()
r=$.$get$q()
p=$.$get$r()
y=new V.w(q,null,null,x,r,p)
y.u(q,x,r,p)
u.push(y)
y=V.aK(s.c,s,0,12,5,5)
p=$.$get$aj()
r=$.$get$ah()
x=$.$get$ai()
q=new V.aL(y,null,null,p,r,x)
q.u(y,p,r,x)
u.push(q)
z.push(s)
this.cp()
W.ea(window,"keydown",new V.fz(this),!1,W.by)},
dJ:function(a){var z,y,x,w
J.cP(this.b,0,0,800,600)
J.bm(this.b,"#3e523c")
J.bZ(this.b,0,0,800,600)
if(typeof a!=="number")return a.aC()
z=C.a.ak(C.a.aC(a,600),150)
for(y="",x=0;x<z;++x)y+="."
w=this.b
J.m(w).sdl(w,0.5)
w.fillStyle="#fff"
w.font="100px monospace"
C.h.c0(w,"Loading"+y,40,140)
this.y=a
this.z=a
if($.c4){w=window
C.e.aR(w)
C.e.aT(w,W.aX(new V.fD(this)))}else{w=window
C.e.aR(w)
C.e.aT(w,W.aX(new V.fE(this)))}},
ay:function(){V.fw()
if($.c4){var z=window
C.e.aR(z)
C.e.aT(z,W.aX(new V.fA(this)))}else{z=window
C.e.aR(z)
C.e.aT(z,W.aX(new V.fB(this)))}},
cp:function(){this.r=C.b.gJ(this.f)},
cq:function(){var z,y,x
z=this.r
this.x=z
y=this.f
z=C.b.fH(y,z)+1
x=y.length
if(z<x){if(z<0)return H.b(y,z)
this.r=y[z]}else this.cp()},
n:{
fw:function(){P.fr($.$get$E(),null,!1).cd(new V.fx())}}},
fy:{"^":"f:14;a",
$1:function(a){var z,y,x,w
z=this.a
J.eE(z.b)
y=J.m(a)
J.eD(z.b,y.gj(a),y.gl(a),2,0,6.283185307179586)
J.eF(z.b)
J.eH(z.b)
z=z.dx
y.sj(a,J.V(y.gj(a),z.b4()*4-2))
x=y.gl(a)
w=z.b4()
if(typeof x!=="number")return x.L()
y.sl(a,x+w*2)
x=y.gl(a)
if(typeof x!=="number")return x.P()
if(x>600){y.sl(a,0)
y.sj(a,z.b4()*800)}}},
fC:{"^":"f:3;a",
$1:function(a){this.a.bx(0,a)}},
fz:{"^":"f:15;a",
$1:function(a){this.a.e.push(J.eI(a))}},
fD:{"^":"f:3;a",
$1:function(a){this.a.bx(0,a)}},
fE:{"^":"f:3;a",
$1:function(a){this.a.dJ(a)}},
fA:{"^":"f:3;a",
$1:function(a){this.a.bx(0,a)}},
fB:{"^":"f:3;a",
$1:function(a){this.a.dJ(a)}},
fx:{"^":"f:1;",
$1:function(a){$.c4=!0}},
am:{"^":"d;",
gaH:function(){return"#3e523c"},
ca:function(a){J.bm(this.b,this.gaH())
J.bZ(this.b,0,0,800,600)
this.aG(a)
C.b.aZ(this.f,new V.hb(this,a))},
fA:function(a){C.b.aZ(a,new V.ha(this))},
aE:function(a,b,c){var z,y,x,w,v,u,t,s
z=new Float32Array(H.c(2))
z[0]=0
z[1]=-10
y=new V.fb(null,null,null)
y.c=V.fd()
y.a=V.f1(y)
y.b=V.hV(y)
y=V.ii(new T.a(z),!0,y)
this.c=y
y.b.e=new V.f2()
y=new Float32Array(H.c(2))
x=new T.a(y)
y[0]=400
y[1]=300
y=new T.a(new Float32Array(H.c(2)))
y.h(x)
z=new T.a(new Float32Array(H.c(2)))
z.h(x)
z=new Y.eW(null,y,20,z)
z.a=!0
this.d=z
z.c=10
this.e=new V.ic(this.b,z)
z=this.c
y=new V.ij(null,this.x,z)
w=V.b9()
v=V.b1()
u=v.d.a
u[0]=0
u[1]=-30
v.c=y
y.b=z.aW(v)
z=y.c.a[0]
u=new Float32Array(H.c(2))
u[0]=-z/2
u[1]=0
z=y.c.a
t=z[0]
z=z[1]
s=new Float32Array(H.c(2))
s[0]=-t/2
s[1]=z/2
w.br(new T.a(u),new T.a(s))
y.b.ar(w)
s=y.c.a
u=s[0]
s=s[1]
z=new Float32Array(H.c(2))
z[0]=-u/2
z[1]=s/2
s=y.c.a
u=s[0]
s=s[1]
t=new Float32Array(H.c(2))
t[0]=u/2
t[1]=s/2
w.br(new T.a(z),new T.a(t))
y.b.ar(w)
t=y.c.a
z=t[0]
t=t[1]
s=new Float32Array(H.c(2))
s[0]=z/2
s[1]=t/2
t=y.c.a[0]
z=new Float32Array(H.c(2))
z[0]=t/2
z[1]=0
w.br(new T.a(s),new T.a(z))
y.b.ar(w)
this.f.push(new V.ik(y))
y=this.c
z=this.x
s=new V.fH(null,y)
w=V.b9()
v=V.b1()
t=v.d.a
t[0]=0
t[1]=-30
v.c=s
s.b=y.aW(v)
w.b9(z.a[0]/2,0.2)
s.b.ar(w)
this.y=s}},
hb:{"^":"f:16;a,b",
$1:function(a){a.bm(this.a.e,this.b)}},
ha:{"^":"f:17;a",
$1:function(a){var z,y,x
z=J.z(a)
if(z.E(a,32))this.a.gae().fV()
else if(z.E(a,65)){z=this.a.gae()
y=z.c
x=new Float32Array(H.c(2))
x[0]=-2
x[1]=0
y.bU(new T.a(x),z.c.k2.c)
z=z.c.f.a
if(z[0]<-8)z[0]=-8}else if(z.E(a,68)){z=this.a.gae()
y=z.c
x=new Float32Array(H.c(2))
x[0]=2
x[1]=0
y.bU(new T.a(x),z.c.k2.c)
z=z.c.f.a
if(z[0]>8)z[0]=8}}},
h3:{"^":"am;ae:z<,Q,ch,a,b,c,d,e,f,r,x,y",
gaM:function(){return"Level 1"},
aG:function(a){var z,y,x
z=this.e
y=this.ch
x=new T.a(new Float32Array(H.c(2)))
x.h(y)
z.aK(this.Q,x,this.x)}},
h4:{"^":"am;ae:z<,Q,ch,a,b,c,d,e,f,r,x,y",
gaM:function(){return"Level 2"},
gaH:function(){return"#88382d"},
aG:function(a){var z,y,x
z=this.e
y=this.ch
x=new T.a(new Float32Array(H.c(2)))
x.h(y)
z.aK(this.Q,x,this.x)}},
h5:{"^":"am;ae:z<,Q,ch,a,b,c,d,e,f,r,x,y",
gaM:function(){return"Level 3"},
gaH:function(){return"#002872"},
aG:function(a){var z,y,x
z=this.e
y=this.ch
x=new T.a(new Float32Array(H.c(2)))
x.h(y)
z.aK(this.Q,x,this.x)}},
h6:{"^":"am;ae:z<,Q,ch,a,b,c,d,e,f,r,x,y",
gaM:function(){return"Level 4"},
gaH:function(){return"#000"},
aG:function(a){var z,y,x
z=this.e
y=this.ch
x=new T.a(new Float32Array(H.c(2)))
x.h(y)
z.aK(this.Q,x,this.x)}},
h7:{"^":"am;ae:z<,Q,ch,a,b,c,d,e,f,r,x,y",
gaM:function(){return"Level 5"},
gaH:function(){return"#000"},
aG:function(a){var z,y,x
z=this.e
y=this.ch
x=new T.a(new Float32Array(H.c(2)))
x.h(y)
z.aK(this.Q,x,this.x)}},
h8:{"^":"am;ae:z<,Q,ch,a,b,c,d,e,f,r,x,y",
gaM:function(){return"Level 6"},
gaH:function(){return"#b7acac"},
aG:function(a){var z,y,x
z=this.e
y=this.ch
x=new T.a(new Float32Array(H.c(2)))
x.h(y)
z.aK(this.Q,x,this.x)}},
f2:{"^":"d;",
d8:function(a){a.f.d.e
a.r.d.e}},
ag:{"^":"d;",
bj:function(a){}},
fG:{"^":"ag;b,c,a7:d*,a2:e*,a",
gc9:function(){return this.b},
bj:function(a){var z,y
if(!!a.$isdC){z=this.c
y=z.a
if(y.f.length===1){y.r=null
y.Q=!0}else if(y.r===z)y.ch=!0}},
ei:function(a,b,c,d,e,f){var z,y,x
z=V.b9()
y=V.b1()
x=y.d.a
x[0]=c
x[1]=d
y.a=2
y.c=this
this.b=a.aW(y)
z.b9(this.d/2,this.e/2)
this.b.ar(z)},
n:{
aK:function(a,b,c,d,e,f){var z=new V.fG(null,b,e,f,a)
z.ei(a,b,c,d,e,f)
return z}}},
fH:{"^":"ag;b,a",$ise4:1},
cg:{"^":"ag;b,a7:c*,a2:d*,a",
gc9:function(){return this.b},
w:function(a,b,c,d,e){var z,y,x
z=V.b9()
y=V.b1()
x=y.d.a
x[0]=b
x[1]=c
y.c=this
this.b=a.aW(y)
z.b9(this.c/2,this.d/2)
this.b.ar(z)},
n:{
hq:function(a,b,c,d,e){var z=new V.cg(null,d,e,a)
z.w(a,b,c,d,e)
return z}}},
v:{"^":"cg;b,c,d,a",$ise4:1},
dC:{"^":"ag;b,c,a",
fV:function(){var z,y
if(this.b<1)return
z=this.c
y=new Float32Array(H.c(2))
y[0]=0
y[1]=8
z.bU(new T.a(y),this.c.k2.c);--this.b},
bj:function(a){if(!!a.$ise4)this.b=2},
el:function(a,b){var z,y
z=V.b9()
y=V.b1()
y.d.h(b)
y.cx=!0
y.a=2
y.c=this
this.c=a.aW(y)
z.b9(2,4)
this.c.ar(z)},
n:{
aR:function(a,b){var z=new V.dC(2,null,a)
z.el(a,b)
return z}}},
e5:{"^":"cg;b,c,d,a"},
ij:{"^":"ag;b,c,a"},
aJ:{"^":"d;"},
fv:{"^":"d;a,b,c"},
aL:{"^":"bI;a,b,c,d,e,f",
bm:function(a,b){var z,y
z=this.a.gc9().k1
y=new T.a(new Float32Array(H.c(2)))
y.h(z.a)
this.b=y
this.e8(a,b)}},
h9:{"^":"d;"},
hr:{"^":"bI;a,b,c,d,e,f"},
w:{"^":"bI;a,b,c,d,e,f"},
aS:{"^":"aJ;a",
bm:function(a,b){var z,y,x,w,v
z=this.a
y=z.c.k1
x=new T.a(new Float32Array(H.c(2)))
x.h(y.a)
y=new Float32Array(H.c(2))
w=new T.a(y)
y[0]=4
y[1]=8
if(typeof b!=="number")return b.aC()
v=C.f.d3(C.a.aC(b,400)/200)
z=z.c.f.a
if(z[1]>0)if(v===1)a.ad($.$get$I(),0,200,100,200,x,w)
else a.ad($.$get$I(),100,200,100,200,x,w)
else{z=z[0]
if(z<0)if(v===1)a.ad($.$get$I(),0,400,100,200,x,w)
else a.ad($.$get$I(),100,400,100,200,x,w)
else if(z>0)if(v===1)a.ad($.$get$I(),0,600,100,200,x,w)
else a.ad($.$get$I(),100,600,100,200,x,w)
else if(v===1)a.ad($.$get$I(),0,0,100,200,x,w)
else a.ad($.$get$I(),100,0,100,200,x,w)}}},
bI:{"^":"aJ;",
bm:["e8",function(a,b){var z,y,x,w,v,u
z=this.e.a
y=z[0]
z=z[1]
x=this.f.a
w=x[0]
x=x[1]
v=this.b
u=new T.a(new Float32Array(H.c(2)))
u.h(v)
a.ad(this.d,y,z,w,x,u,this.c)}],
u:function(a,b,c,d){var z,y,x
z=this.d
y=$.$get$E()
z.toString
z=new W.G(z,"load",!1,[W.aI])
y.push(z.gJ(z))
z=this.a
y=z.gc9().k1
x=new T.a(new Float32Array(H.c(2)))
x.h(y.a)
this.b=x
x=z.ga7(z)
z=z.ga2(z)
y=new Float32Array(H.c(2))
y[0]=x
y[1]=z
this.c=new T.a(y)}},
ic:{"^":"d;a,b",
aK:function(a,b,c){var z,y,x,w,v
z=new T.a(new Float32Array(H.c(2)))
z.h(c)
c=z.b8(0,2)
this.b.bo(b,b)
z=b.a
z[1]=z[1]-c.a[1]/2
y=c.C(0,this.b.c).a
J.b_(this.a,a,z[0],z[1],y[0],y[1])
x=this.a
w=z[0]
v=y[0]
J.b_(x,a,w-v,z[1],v,y[1])
v=this.a
w=z[0]
x=y[0]
J.b_(v,a,w+x,z[1],x,y[1])
x=this.a
w=z[0]
v=y[0]
J.b_(x,a,w-v*2,z[1],v,y[1])
v=this.a
w=z[0]
x=y[0]
J.b_(v,a,w+x*2,z[1],x,y[1])},
ad:function(a,b,c,d,e,f,g){var z,y
this.b.bo(f,f)
g=g.C(0,this.b.c)
z=f.R(0,g.b8(0,2)).a
y=g.a
J.cQ(this.a,a,b,c,d,e,z[0],z[1],y[0],y[1])}},
e6:{"^":"bI;a,b,c,d,e,f"},
ik:{"^":"aJ;a",
bm:function(a,b){}}},1]]
setupProgram(dart,0)
J.z=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dp.prototype
return J.dn.prototype}if(typeof a=="string")return J.bx.prototype
if(a==null)return J.fZ.prototype
if(typeof a=="boolean")return J.fY.prototype
if(a.constructor==Array)return J.b5.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b7.prototype
return a}if(a instanceof P.d)return a
return J.bU(a)}
J.N=function(a){if(typeof a=="string")return J.bx.prototype
if(a==null)return a
if(a.constructor==Array)return J.b5.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b7.prototype
return a}if(a instanceof P.d)return a
return J.bU(a)}
J.cG=function(a){if(a==null)return a
if(a.constructor==Array)return J.b5.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b7.prototype
return a}if(a instanceof P.d)return a
return J.bU(a)}
J.aY=function(a){if(typeof a=="number")return J.b6.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bK.prototype
return a}
J.cH=function(a){if(typeof a=="number")return J.b6.prototype
if(typeof a=="string")return J.bx.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bK.prototype
return a}
J.m=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b7.prototype
return a}if(a instanceof P.d)return a
return J.bU(a)}
J.V=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.cH(a).L(a,b)}
J.cO=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aY(a).b8(a,b)}
J.D=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.z(a).E(a,b)}
J.P=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aY(a).P(a,b)}
J.aA=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aY(a).ah(a,b)}
J.aZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.cH(a).C(a,b)}
J.bi=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aY(a).R(a,b)}
J.y=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.jP(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.N(a).i(a,b)}
J.eB=function(a,b,c,d){return J.m(a).ev(a,b,c,d)}
J.eC=function(a,b,c,d){return J.m(a).eR(a,b,c,d)}
J.eD=function(a,b,c,d,e,f){return J.m(a).eZ(a,b,c,d,e,f)}
J.eE=function(a){return J.m(a).f0(a)}
J.cP=function(a,b,c,d,e){return J.m(a).f5(a,b,c,d,e)}
J.eF=function(a){return J.m(a).f6(a)}
J.eG=function(a,b){return J.cH(a).aU(a,b)}
J.b_=function(a,b,c,d,e,f){return J.m(a).fk(a,b,c,d,e,f)}
J.cQ=function(a,b,c,d,e,f,g,h,i,j){return J.m(a).fl(a,b,c,d,e,f,g,h,i,j)}
J.bj=function(a,b,c,d){return J.m(a).fm(a,b,c,d)}
J.cR=function(a,b){return J.cG(a).a1(a,b)}
J.eH=function(a){return J.m(a).fo(a)}
J.bZ=function(a,b,c,d,e){return J.m(a).fq(a,b,c,d,e)}
J.b0=function(a){return J.m(a).gat(a)}
J.bk=function(a){return J.z(a).gN(a)}
J.aB=function(a){return J.m(a).ga_(a)}
J.bl=function(a){return J.cG(a).gW(a)}
J.eI=function(a){return J.m(a).gfW(a)}
J.a5=function(a){return J.N(a).gp(a)}
J.cS=function(a){return J.m(a).gU(a)}
J.cT=function(a){return J.m(a).gj(a)}
J.cU=function(a){return J.m(a).gl(a)}
J.eJ=function(a,b){return J.m(a).dL(a,b)}
J.eK=function(a,b){return J.cG(a).av(a,b)}
J.aC=function(a,b){return J.m(a).bq(a,b)}
J.bm=function(a,b){return J.m(a).sfs(a,b)}
J.eL=function(a,b){return J.m(a).sco(a,b)}
J.eM=function(a,b){return J.m(a).sa2(a,b)}
J.eN=function(a,b){return J.m(a).sh3(a,b)}
J.eO=function(a,b){return J.m(a).sa7(a,b)}
J.c_=function(a,b){return J.m(a).sj(a,b)}
J.c0=function(a,b){return J.m(a).sl(a,b)}
J.Y=function(a){return J.z(a).k(a)}
I.cK=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.h=W.eV.prototype
C.u=J.j.prototype
C.b=J.b5.prototype
C.f=J.dn.prototype
C.d=J.dp.prototype
C.a=J.b6.prototype
C.l=J.bx.prototype
C.B=J.b7.prototype
C.o=J.hp.prototype
C.i=J.bK.prototype
C.e=W.ie.prototype
C.p=new H.dd([null])
C.q=new H.fl()
C.r=new P.ho()
C.t=new P.iz()
C.j=new P.iY()
C.c=new P.ja()
C.k=new P.aH(0)
C.v=function() {  var toStringFunction = Object.prototype.toString;  function getTag(o) {    var s = toStringFunction.call(o);    return s.substring(8, s.length - 1);  }  function getUnknownTag(object, tag) {    if (/^HTML[A-Z].*Element$/.test(tag)) {      var name = toStringFunction.call(object);      if (name == "[object Object]") return null;      return "HTMLElement";    }  }  function getUnknownTagGenericBrowser(object, tag) {    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";    return getUnknownTag(object, tag);  }  function prototypeForTag(tag) {    if (typeof window == "undefined") return null;    if (typeof window[tag] == "undefined") return null;    var constructor = window[tag];    if (typeof constructor != "function") return null;    return constructor.prototype;  }  function discriminator(tag) { return null; }  var isBrowser = typeof navigator == "object";  return {    getTag: getTag,    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,    prototypeForTag: prototypeForTag,    discriminator: discriminator };}
C.m=function(hooks) { return hooks; }
C.w=function(hooks) {  if (typeof dartExperimentalFixupGetTag != "function") return hooks;  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);}
C.x=function(hooks) {  var getTag = hooks.getTag;  var prototypeForTag = hooks.prototypeForTag;  function getTagFixed(o) {    var tag = getTag(o);    if (tag == "Document") {      // "Document", so we check for the xmlVersion property, which is the empty      if (!!o.xmlVersion) return "!Document";      return "!HTMLDocument";    }    return tag;  }  function prototypeForTagFixed(tag) {    if (tag == "Document") return null;    return prototypeForTag(tag);  }  hooks.getTag = getTagFixed;  hooks.prototypeForTag = prototypeForTagFixed;}
C.y=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Firefox") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "GeoGeolocation": "Geolocation",    "Location": "!Location",    "WorkerMessageEvent": "MessageEvent",    "XMLDocument": "!Document"};  function getTagFirefox(o) {    var tag = getTag(o);    return quickMap[tag] || tag;  }  hooks.getTag = getTagFirefox;}
C.n=function getTagFallback(o) {  var s = Object.prototype.toString.call(o);  return s.substring(8, s.length - 1);}
C.z=function(hooks) {  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";  if (userAgent.indexOf("Trident/") == -1) return hooks;  var getTag = hooks.getTag;  var quickMap = {    "BeforeUnloadEvent": "Event",    "DataTransfer": "Clipboard",    "HTMLDDElement": "HTMLElement",    "HTMLDTElement": "HTMLElement",    "HTMLPhraseElement": "HTMLElement",    "Position": "Geoposition"  };  function getTagIE(o) {    var tag = getTag(o);    var newTag = quickMap[tag];    if (newTag) return newTag;    if (tag == "Object") {      if (window.DataView && (o instanceof window.DataView)) return "DataView";    }    return tag;  }  function prototypeForTagIE(tag) {    var constructor = window[tag];    if (constructor == null) return null;    return constructor.prototype;  }  hooks.getTag = getTagIE;  hooks.prototypeForTag = prototypeForTagIE;}
C.A=function(getTagFallback) {  return function(hooks) {    if (typeof navigator != "object") return hooks;    var ua = navigator.userAgent;    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;    if (ua.indexOf("Chrome") >= 0) {      function confirm(p) {        return typeof window == "object" && window[p] && window[p].name == p;      }      if (confirm("Window") && confirm("HTMLElement")) return hooks;    }    hooks.getTag = getTagFallback;  };}
C.C=I.cK([])
$.dG="$cachedFunction"
$.dH="$cachedInvocation"
$.a1=0
$.aD=null
$.cY=null
$.cI=null
$.el=null
$.ew=null
$.bT=null
$.bW=null
$.cJ=null
$.au=null
$.aU=null
$.aV=null
$.cC=!1
$.u=C.c
$.df=0
$.cp=null
$.cq=null
$.cr=null
$.ct=null
$.cs=null
$.c4=!1
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["d6","$get$d6",function(){return H.eq("_$dart_dartClosure")},"c6","$get$c6",function(){return H.eq("_$dart_js")},"dk","$get$dk",function(){return H.fU()},"dl","$get$dl",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.df
$.df=z+1
z="expando$key$"+z}return new P.fn(null,z)},"dT","$get$dT",function(){return H.a4(H.bJ({
toString:function(){return"$receiver$"}}))},"dU","$get$dU",function(){return H.a4(H.bJ({$method$:null,
toString:function(){return"$receiver$"}}))},"dV","$get$dV",function(){return H.a4(H.bJ(null))},"dW","$get$dW",function(){return H.a4(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e_","$get$e_",function(){return H.a4(H.bJ(void 0))},"e0","$get$e0",function(){return H.a4(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"dY","$get$dY",function(){return H.a4(H.dZ(null))},"dX","$get$dX",function(){return H.a4(function(){try{null.$method$}catch(z){return z.message}}())},"e2","$get$e2",function(){return H.a4(H.dZ(void 0))},"e1","$get$e1",function(){return H.a4(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cz","$get$cz",function(){return P.iq()},"b4","$get$b4",function(){return P.iJ(null,P.bC)},"aW","$get$aW",function(){return[]},"E","$get$E",function(){return H.l([],[P.Z])},"aj","$get$aj",function(){return W.K(null,"images/goal.png",null)},"ah","$get$ah",function(){return new T.a(H.bB(2))},"ai","$get$ai",function(){return T.bL(100,100)},"ca","$get$ca",function(){return W.K(null,"images/level_indicator_bg.png",null)},"c9","$get$c9",function(){return W.K(null,"images/level_indicator.png",null)},"dB","$get$dB",function(){return W.K(null,"images/platform_not_walkable.png",null)},"dz","$get$dz",function(){return new T.a(H.bB(2))},"dA","$get$dA",function(){return T.bL(200,20)},"t","$get$t",function(){return W.K(null,"images/platform.png",null)},"q","$get$q",function(){return new T.a(H.bB(2))},"r","$get$r",function(){return T.bL(200,20)},"I","$get$I",function(){return W.K(null,"images/player.png",null)},"cy","$get$cy",function(){return W.K(null,"images/wall.png",null)},"cw","$get$cw",function(){return new T.a(H.bB(2))},"cx","$get$cx",function(){return T.bL(20,200)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,args:[,]},{func:1,v:true},{func:1,args:[P.ad]},{func:1,args:[,,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.ar,args:[P.p]},{func:1,args:[,P.ar]},{func:1,args:[P.ar]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.d],opt:[P.bb]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.bb]},{func:1,v:true,args:[V.b3,V.b3]},{func:1,args:[T.a]},{func:1,args:[W.by]},{func:1,args:[V.aJ]},{func:1,args:[P.p]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.jW(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cK=a.cK
Isolate.M=a.M
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.ey(V.eu(),b)},[])
else (function(b){H.ey(V.eu(),b)})([])})})()