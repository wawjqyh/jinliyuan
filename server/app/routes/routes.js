const router = require('koa-router')();

let customer = require("../controller/customer");

router.get('/', async (ctx, next) => {
    /*await ctx.render('index', {
     title: 'Hello Koa 2!'
     });*/
    ctx.body = 'hello'
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
});


router.get("/api/customer", customer.list);                 //客户列表
router.post("/api/customer/insert", customer.insert);       //新增客户

module.exports = router;