export default {
    //改变商家弹框的状态
    changeSellerBox(store){
        store.sellerBoxState = !store.sellerBoxState;
    },

    //改变购物车列表弹框的状态
    changeCartBox(store){
        if (store.cart.length === 0) {
            store.cartBoxState = false;
            return;
        }

        store.cartBoxState = !store.cartBoxState;
    },

    //初始化商家信息
    initSeller(store, seller){
        store.seller = seller;
    },

    //初始化商品
    initGoods(store, goods){
        for (let i = 0; i < goods.length; i++) {
            for (let j = 0; j < goods[i].foods.length; j++) {
                goods[i].foods[j].num = 0;
            }
        }

        store.goods = goods;
    },

    //商品的购买数量加1
    addGoodsNum(store, goodsItem){
        //goods列表中，改商品的数量加1
        for (let i = 0; i < store.goods.length; i++) {
            for (let j = 0; j < store.goods[i].foods.length; j++) {
                if (store.goods[i].foods[j].name === goodsItem.name) {
                    store.goods[i].foods[j].num++;
                    break;
                }
            }
        }

        //如果购物车中没有该商品，则添加该商品到购物车，如果有则商品数量加1
        for (let i = 0; i < store.cart.length; i++) {
            if (store.cart[i].name === goodsItem.name) {
                store.cart[i].num++;
                return;
            }
        }

        store.cart.push({
            name: goodsItem.name,
            price: goodsItem.price,
            num: 1
        });
    },

    //商品的购买数量减1
    subGoodsNum(store, goodsItem){
        //goods列表商品数量减1
        for (let i = 0; i < store.goods.length; i++) {
            for (let j = 0; j < store.goods[i].foods.length; j++) {
                if (store.goods[i].foods[j].name === goodsItem.name) {
                    store.goods[i].foods[j].num--;
                    break;
                }
            }
        }

        //购物车列表商品数量减1，如果商品数量为0则重购物车中移除
        for (let i = 0; i < store.cart.length; i++) {
            if (store.cart[i].name === goodsItem.name) {
                store.cart[i].num--;

                if (store.cart[i].num <= 0) {
                    store.cart.splice(i, 1);
                }
            }
        }
    },

    //清空购物车
    clearCart(store){
        store.cart = [];

        for (let i = 0; i < store.goods.length; i++) {
            for (let j = 0; j < store.goods[i].foods.length; j++) {
                store.goods[i].foods[j].num = 0;
            }
        }
    },

    //设定商品详情页显示的商品
    setCurFood(store, food){
        store.curFood = food;
    }
}