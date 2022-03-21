let eventEmitter = {}
eventEmitter.list = {}
eventEmitter.on = function (event, fn) {
    let that = this;
    (that.list[event] || (that.list[event] = [])).push(fn);
    return that;
}

eventEmitter.emit = function () {
    let that = this;
    let event = [].shift.call(arguments), fns = [...that.list[event]];
    console.log(event, fns);
    if (!fns || fns.length === 0) {
        return false;
    }
    // 遍历 event 值对应的缓存列表，依次执行 fn
    fns.forEach(fn => {
        fn.apply(that, arguments);
    });
    return that;
}

function user1(content) {
    console.log('用户1订阅了:', content)
}

// 订阅
eventEmitter.on('article', user1);

// 发布
eventEmitter.emit('article', 'Javascript 发布-订阅模式');
