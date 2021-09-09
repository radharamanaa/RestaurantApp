var tables = new Object();

function activateModal() {
    document.getElementsByClassName('modal')[0].style.display = 'block';
}

function deactivateModal() {
    document.getElementsByClassName('modal')[0].style.display = 'none';
}

function printBill(currentTableName) {
    var tableOrdersArr = tables[currentTableName];
    var display = '<table><tr>' +
        '<th>Item Name</th><th>Quantity</th><th>Price</th><th>Delete Item</th></tr>';
    var totalPrice = 0;
    for (let index = 0; index < tableOrdersArr.length; index++) {
        const tableOrderDets = tableOrdersArr[index];
        if (tableOrderDets.noOfOrders < 1) continue;
        display += `<tr><td>${tableOrderDets.name}</td>`;
        display += `<td><input min='1' class='modal-input' type='number' onchange="changeOrder('${currentTableName.trim()}','${tableOrderDets.name}',this.value)" onkeyup="changeOrder('${currentTableName.trim()}','${tableOrderDets.name}',this.value)" value='${tableOrderDets.noOfOrders}'></td>`;
        display += `<td>${tableOrderDets.noOfOrders*tableOrderDets.price}$</td>`;
        display += `<td><span onclick="changeOrder('${currentTableName.trim()}','${tableOrderDets.name}',0)">&times;</span></td></tr>`
        totalPrice += tableOrderDets.noOfOrders * tableOrderDets.price;
    }
    display += `</table><h3>Total Price:${totalPrice}</h3><br/>`;
    display += `<button class='close-button' onclick='closeModal()'>OK</button>`
    var modalInfo = document.getElementById('billPrinting');
    modalInfo.innerHTML = display;
    activateModal();
}

function clearTable(currentTableName) {
    var choice = confirm('Surely Clear Table?');
    if (!choice) return;
    tables[currentTableName] = [];
    createOrderViewOnTable(document.getElementById(currentTableName), currentTableName);
}

function closeModal() {
    deactivateModal();
}