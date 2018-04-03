const fs = require('fs');
const path = require("path");
exports.run = function () {
    // 根据文件路径读取文件，返回文件列表 需要了解下path对象 path.join
    // 用于连接路径。主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        if (err) {
            return console.error(err);
        }
        var len = files.length;
        var textarr = [];
        var map = {};
        //遍历读取到的文件列表
        files.forEach((filename, index) => { //由于这里files里面都是确定的txt文件，没有文件夹，所以不需要递归。如果不清楚files文件夹内容，就需要递归调用判断。
            var txtpath = path.join(__dirname, 'files', filename);
            fs.stat(txtpath, (err, stats) => {  //fs.stat 获取文件信息 判断是文件还是文件夹
                if (stats && stats.isFile()) {
                    // 同步读取文件内容
                    var data = fs.readFileSync(txtpath, 'utf-8');
                    if (typeof data == 'string') {
                        //var dataArr = data.replace(/\s+/g, ',').split(',');
                        //var dataArr = data.match(/[a-z]+[-']?[a-z]*/ig);
                        //var dataArr = data.replace(/[a-z]+[\-|\']+[a-z]+/ig, '').match(/([a-z]+)/ig);
                        var dataArr = data.match(/[a-z]+[\-\']?[a-z]*/gi); //正则匹配英文单词，放在数组里。
                        console.log(dataArr)
                        textarr = textarr.concat(dataArr);
                        if (index == len - 1) { // 循环到最后一个，所有的单词都在textarr里面，现在进行写入
                            for (var i = 0; i < textarr.length; i++) { //循环遍历数组，计算单词出现的次数，并放在map对象里
                                var s = textarr[i].toLowerCase().replace('-','');
                                var r = map[s];
                                if (r) {
                                    map[s] += 1;
                                } else {
                                    map[s] = 1;
                                }
                            }
                            //将map写入到result.json
                            fs.writeFile(path.join(__dirname, 'result.json'), JSON.stringify(map), function (err) {
                                if (err) {
                                    return console.error(err);
                                }
                            });
                        }
                    }
                }
            });
        });
    });
}