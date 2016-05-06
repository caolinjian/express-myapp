"use strict";
var router = require('express').Router();

module.exports = function (app) {
    router.get('/', function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });

    router.get('/getbooks', function (req, res, next) {
        res.status(200).json([{
            title: 'Express'
        }, {
            hahah: 'hahah'
        }]);
    });

    router.get('/member/list', function (req, res, next) {
        console.log(req.query.page);
        var data = {
            currentPage: parseInt(req.query.page),
            size: 5,
            total: 63,
            list: [{
                memberName: 'Tom'+req.query.page,
                memberEmail: '307296756@qq.com',
                memberPhone: '13175483167'
            }, {
                memberName: 'Kate'+req.query.page,
                memberEmail: 'j307296756@163.com',
                memberPhone: '15158116005'
            }, {
                memberName: 'Mate'+req.query.page,
                memberEmail: 'j307296756@163.com',
                memberPhone: '13175483167'
            }, {
                memberName: 'Phoenix'+req.query.page,
                memberEmail: 'j307296756@google.com',
                memberPhone: '13175483167'
            }, {
                memberName: 'kate'+req.query.page,
                memberEmail: 'j307296756@sina.cn',
                memberPhone: '13175483167'
            }]
        }

        res.status(200).json(data);
    });

    router.post('/books', function (req, res, next) {
        console.log(req)
        console.log(req.body)
        res.status(200).json({
            success: true,
            title: 'dsa'
        });
    });
    app.use('/', router);
}
