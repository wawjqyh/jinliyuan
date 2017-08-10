export default {
    initCustomer(store, customer){
        store.customer = customer;
    },
    initGoods(store, goods){
        store.goods = goods;
    },
    initCategory(store, category){
        store.category = category;
    },

    //显示和关闭加载提示弹框
    showLoading(store){
        store.loadingState = true;
    },
    hideLoading(store){
        store.loadingState = false;
    }
}