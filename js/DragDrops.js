function allowDrop(event) {
    event.preventDefault();
}

function table(name, orderDets) {
    if (!tables.hasOwnProperty(name)) {
        var tableOrders = new Object();
        tableOrders = [];
        tables[name] = tableOrders;
    }

    var tableOrdersArray = tables[name];
    if (orderDets == undefined) {
        return tableOrdersArray;
    }

    if (orderDets != undefined) {
        for (let index = 0; index < tableOrdersArray.length; index++) {
            const orderDet = tableOrdersArray[index];
            if (orderDet.name == orderDets.name) {
                orderDet.noOfOrders++;
                return tableOrdersArray;
            }
        }
    }
    tableOrdersArray[tableOrdersArray.length] = orderDets;
    return tableOrdersArray;
}
table('table-1');
table('table-2');;
table('table-3');;

function orderDets(name, price) {
    var orderDets = new Object();
    orderDets.name = name;
    orderDets.price = price;
    orderDets.noOfOrders = 1;
    return orderDets;
}

function createOrderViewOnTable(insertAsChildOfThisElement, tableName) {
    var tableOrdersArr = tables[tableName];
    var divv;
    const idOfNewDiv = `${tableName}-display`;
    const divToInsertItems = insertAsChildOfThisElement.querySelector('#' + idOfNewDiv);
    if (divToInsertItems == null) {
        divv = document.createElement("div");
        divv.setAttribute('id', idOfNewDiv);
        var pp = document.createElement('p');
        pp.style.fontSize = '12px';
        divv.appendChild(pp);
        insertAsChildOfThisElement.appendChild(divv);
    } else {
        divv = document.querySelector('#' + idOfNewDiv);
    }
    var disp = '';
    for (let index = 0; index < tableOrdersArr.length; index++) {
        const orderDets = tableOrdersArr[index];
        if (orderDets.noOfOrders < 1) continue;
        disp += `${orderDets.name} has ${orderDets.noOfOrders} order${orderDets.noOfOrders>1?'s':''} totalling ${orderDets.noOfOrders*orderDets.price}<br/>`;
    }
    divv.childNodes[0].innerHTML = disp;
}


function onDropp(event) {
    event.preventDefault();
    var itemName = event.dataTransfer.getData("order");
    var price = 0;
    for (let index = 0; index < foodItemsArray.length; index++) {
        const foodItem = foodItemsArray[index];
        if (foodItem.name == itemName) {
            price = foodItem.price;
            break;
        }
    }
    const currentTableName = event.currentTarget.id;
    table(currentTableName, orderDets(itemName, price));
    createOrderViewOnTable(event.currentTarget, currentTableName);
}

function dragStart(ev) {
    ev.dataTransfer.setData("order", ev.target.childNodes[0].innerHTML);
}
var foodTables = document.querySelectorAll("div.food-table");
// for (let index = 0; index < foodTables.length; index++) {
//     const element = foodTables[index];
//     element.addEventListener("ondrop", onDropp);
//     element.addEventListener("ondragover", allowDrop);
// }
function changeOrder(currentTableName, orderDetName, finalQuantity) {
    var table = tables[currentTableName];
    for (let index = 0; index < table.length; index++) {
        const tableOrdersArr = table[index];
        if (tableOrdersArr.name == orderDetName) {
            tableOrdersArr.noOfOrders = finalQuantity;
        }
    }
    printBill(currentTableName);
    createOrderViewOnTable(document.getElementById(currentTableName), currentTableName);
}