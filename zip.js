let fs = require('fs');
let archiver = require('archiver');

// 创建文件输出流
let output = fs.createWriteStream('./dist.zip');
let archive = archiver('zip', {
    zlib: {level: 9} // 设置压缩级别
});

// 文件输出流结束
output.on('close', function () {
    console.log(`zip success total ${(archive.pointer() / 1024 / 1024).toFixed(2)} M`);
});

// 数据源是否耗尽
output.on('end', function () {
    console.log('数据源已耗尽')
});

// 存档警告
archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        console.warn('stat故障和其他非阻塞错误')
    } else {
        throw err
    }
});

// 存档出错
archive.on('error', function (err) {
    throw err
});

// 通过管道方法将输出流存档到文件
archive.pipe(output);

// 从子目录追加文件并将其命名为“新子dir”在存档中
archive.directory('./public/', '/');

// 完成归档
archive.finalize();
