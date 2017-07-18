main = {};

main.insertSql = function (data) {
    let key = "";
    let value = "";

    for (let k in data) {
        key += k + ",";
        value += "'" + data[k] + "',";
    }

    key = key.substring(0, key.length - 1);
    value = value.substring(0, value.length - 1);

    return "(" + key + ") VALUES (" + value + ")";
};

module.exports = main;