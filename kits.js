let kits = {};

//封装一个获取时间的方法
/**
 * 
 * @description 
 * 
 */
kits.formateDay = function () {
    //设置时间格式
    function addZero(t) {
        return t < 10 ? '0' + t : t;
    }

    let date = new Date();
    let y = date.getFullYear();
    let M = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    M = addZero(M);
    d = addZero(d);
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);

    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
}

// 封装一个可以获得随机区间的整数的方法
/**
 * 
 * @description 用于可以获得随机区间的整数的方法
 * @param (number) n小的数值
 * @param (number) m大的数值
 * @return 返回一个区间里的随机整数
 */
kits.randomInt = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

//封装一个简化获取元素 id 的方法
kits.getDID = function (id) {
    return typeof (id) ? document.getElementById(id) : id;
}
//封装一个简化获取元素 className 的方法
/**
 * 
 * @description 用于简化获取 className 元素的方法
 * 
 */
kits.getDCN = function (cn) {
    return typeof (cn) ? document.getElementsByClassName(cn) : cn;
}
//封装一个简化获取元素 querySeletor 的方法
/**
 * 
 * @description 用于简化获取元素
 */
kits.getDQS = function (qs) {
    return typeof (qs) ? document.querySelector(qs) : qs;
}


//封装一个可以生成唯一id的方法
/**
 * 
 * @description 用于生成唯一id的方法
 * @return {string} 返回一个由即时时间加上（100000，999999）之间大范围的随机数
 * 
 */
kits.primaryKey = function () {
    //获得当前时间
    let now = Date.now();
    //阻止1毫秒内生成多个id,从而加上个大范围的随机数
    let ran = kits.randomInt(100000, 999999);

    return now + '' + ran;
}

/**
 * 
 * @description 读取存储在localStorage里的数据
 * @param {string} key 存储数据使用的键
 * @return {Array} 返回一个数组，若不存在，则返回空数组
 * 
 */
kits.loadData = function (key) {
    let str = localStorage.getItem(key);
    let arr = JSON.parse(str);
    if (!arr) {
        arr = [];
    }
    return arr;
}

/**
 * 
 * @description 用于将数组存储到localStorage里的方法
 * @param {string} key 存储使用的键
 * @param {Array} arr 要存储的数组数据
 * @return {undefined}
 * 
 */
function saveData(key, arr) {
    var json = JSON.stringify(arr);
    localStorage.setItem(key, json);
}

/**
 * 转换思路是：
        url参数长成： id=10086&name=goudan&pwd=123
        把url参数使用  &  割开，成为  [键=值,键=值...]
        再把数组里面的每个 键=值 再割开 ， [键,值]
 * */
kits.getUrlParams = function () {
    let arr = location.search.substring(1).split('&');
    let prams = {};
    arr.forEach(e => {
        let temp = e.split('=');
        let key = temp[0];
        let val = temp[1];
        prams[key] = val;
    })
    return prams;
}

let strategies = {
    isNonEmpty: function (val, msg) {
        if (val.trim().length === 0) {
            return msg;
        }
    },
    minLength: function (val, len, msg) {
        if (val.trim().length < len) {
            return msg;
        }
    }
}

/**
 * @description 用于验证表单填写是否符合标准
 */

//用对象存储不同的规则的验证
let regMethods = {
    //空
    regEmpty: function (val, msg) {
        if (val.trim().length === 0) {
            return msg;
        }
    },
    //长度
    regLength: function (val, len, msg) {
        if (val.trim().length < len) {
            return msg;
        }
    },
    //手机
    regPhone: function (val, msg) {
        if (! /(^1[3|5|8|9][0-9]{9}$)/.test(val)) {
            return msg;
        }
    }
}

function regFun() {
    this.regArr = [];
}
//添加的函数 参数：验证对应输入框的元素 不同的规则
regFun.prototype.add = function (dom, rules) {
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let fn = function () {
            let splitArr = rule.regFunName.split(':');
            let funName = splitArr.shift();
            splitArr.unshift(dom.value);
            splitArr.push(rule.msg);
            return regMethods[funName].apply(dom, splitArr);
        }
        this.regArr.push(fn);
    }
}
//数组函数的验证
regFun.prototype.start = function () {
    for (let i = 0; i < this.regArr.length; i++) {
        let msg = this.regArr[i]();
        if (msg) {
            return msg;
        }
    }
}

/**
 * 阻止浏览器回退
 */
function forbiddenBack(){
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    })
}

/**
 * @description 创建一个范围内数组内所有数相加的函数
 * @param {object} arr 
 * @return {number} 返回一个数组内所有数的和
 *  
 */
function sumArrAll(arr){
    let sum = 0;
    for(let i = Math.min(...arr); i < Math.max(...arr); i++){
        sum += i;
    }
    return sum;
}
//测试
//再测试
