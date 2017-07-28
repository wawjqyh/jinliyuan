main = {};

main.insertSql = function (data) {
    let key = "";
    let value = "";

    //data为数组，即要插入多条数据
    if (data instanceof Array) {
        let firstItem = data[0];

        for (let k in firstItem) {
            key += k + ",";
        }

        data.forEach(item => {
            let singleValue = "";

            for (let k in item) {
                singleValue += "'" + item[k] + "',";
            }

            singleValue = singleValue.substring(0, singleValue.length - 1);
            singleValue = "(" + singleValue + "),";
            value = value + singleValue;
        });

        value = value.substring(0, value.length - 1);
    }

    //data为对象，只插入一条数据
    else {
        for (let k in data) {
            key += k + ",";
            value += "'" + data[k] + "',";
        }

        value = value.substring(0, value.length - 1);
        value = "(" + value + ")";
    }

    key = key.substring(0, key.length - 1);

    return "(" + key + ") VALUES " + value;
};

module.exports = main;