function CreateItem(name, desc, price) {
    var item = new Object();
    item.name = name;
    item.desc = desc;
    item.price = price;
    return item;
}
var text25 = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate ipsum, voluptatum fugiat rem quaerat saepe, fuga animi iusto repudiandae ratione exercitationem repellat doloribus harum dignissimos.';
var text30 = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat officia animi, velit doloremque aut id iste cum corrupti? Ad reiciendis impedit incidunt qui laudantium deleniti vero temporibus porro distinctio similique.';
var text35 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam rem debitis eius id eos et tempore adipisci a ipsam ab possimus iusto ex, quod aspernatur obcaecati natus unde deserunt saepe? Quisquam consectetur ex repellat commodi.';

var foodItemsArray = [];
foodItemsArray[0] = CreateItem('Hyderabadi Biryani', text25, 60);
foodItemsArray[1] = CreateItem('French Fries', text30, 50);
foodItemsArray[2] = CreateItem('Idli Sambar', text25, 30);
foodItemsArray[3] = CreateItem('Paneer Butter Masala', text25, 45);
foodItemsArray[4] = CreateItem('Pav Bhaji', text30, 35);
foodItemsArray[5] = CreateItem('Palak Tandoor', text25, 25);
foodItemsArray[6] = CreateItem('Sabji Mix', text25, 45);
foodItemsArray[7] = CreateItem('Pav Bhaji', text30, );
foodItemsArray[8] = CreateItem('Panneer Biryani', text35, 90);
foodItemsArray[9] = CreateItem('Full Meal', text30, 120);

function renderEachItem(foodItem) {
    var divv = document.createElement("div");
    divv.classList.add("food-item");
    var h1 = document.createElement("h1");
    var pp = document.createElement('p');
    var h33 = document.createElement('h3');

    divv.setAttribute('draggable', true);
    divv.setAttribute('ondragstart', 'dragStart(event)');

    h1.innerHTML = foodItem.name;
    pp.innerHTML = foodItem.desc;
    h33.innerHTML = 'Price: ' + foodItem.price + "$";

    divv.appendChild(h1);
    divv.appendChild(pp);
    divv.appendChild(h33);
    return divv;
}
var foodItemsDiv = document.getElementById("addFoodItems");

function renderDishes() {
    for (let i = 0; i < foodItemsArray.length; i++) {
        foodItemsDiv.appendChild(renderEachItem(foodItemsArray[i]));
    }
}

function filterItems() {
    var foodItemDivs = document.querySelectorAll('div.item-right > div.food-item');
    var searchText = document.getElementById("itemSearch").value;
    for (let i = 0; i < foodItemDivs.length; i++) {
        if (!(foodItemDivs.item(i).childNodes[0].innerHTML.toLowerCase().includes(searchText.toLowerCase()))) {
            foodItemDivs[i].style.display = 'none';
        } else {
            foodItemDivs[i].style.display = 'flex';
        }
    }
}

function filterTable(inputEle) {
    var tables = document.getElementsByClassName('food-table');
    for (let index = 0; index < tables.length; index++) {
        const table = tables[index];
        table.style.display = 'flex';
    }

    for (let index = 0; index < tables.length; index++) {
        const table = tables[index];
        var textToFind = inputEle.value.toLowerCase();
        const extrTableName = String(table.childNodes[1].innerHTML);
        if (!extrTableName.toLowerCase().includes(textToFind)) {
            table.style.display = "none";
        }

    }

}