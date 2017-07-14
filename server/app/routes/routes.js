const router = require('koa-router')();
let pool = require("../util/pool");

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

async function mysqltest(ctx, next){
    await new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject();
            }

            connection.query("SELECT * FROM customer", function (err, res, fields) {
                connection.release();

                if (err) {
                    reject();
                }

                console.log(res);

                resolve();
            })
        });
    });

    ctx.body = "mysqltest";
}

router.get("/mysqltest", mysqltest);

module.exports = router;