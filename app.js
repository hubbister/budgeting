
//budget
var budgetController = (function() {

    var Expense = function(id, descrition, value) {
        this.id = id;
        this.descrition = descrition;
        this.value = value;
    };

    var Income = function(id, descrition, value) {
        this.id = id;
        this.descrition = descrition;
        this.value = value;
    };

    
    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        total: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // create new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // create new item based on 'inc' or 'exp' type
            if(type === 'exp') {                
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            //push it into our data structure
            data.allItems[type].push(newItem);
            //return the new element
            return newItem;
        },
        testing: function() {
            console.log(data);
        }
    }

}) (); 


//UI
var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
// metodi pubblici
     return {
        getInput : function () {
            
            return {
                
            type : document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
            descrition : document.querySelector(DOMstrings.inputDescription).value,
            value : document.querySelector(DOMstrings.inputValue).value

            }
        },


        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text

            if( type === 'inc'){
                
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><iclass="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {

                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            };

            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.descrition);
            newHtml = newHtml.replace('%value%', obj.value);

            //insert the html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },


        
        // insert the html into the dom
        getDOMstrings: function() {
            return DOMstrings;
        }


    
     };
})();

var controller = (function(budgetCtrl, UICtrl){
// INIT
    var setupEventListeners = function () {
        
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlADDItem);

        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13) {
                ctrlADDItem();    
            }
        });

    };

// Aggiungi item
    var ctrlADDItem =  function() {
        var input, newItem;

        // 1. get the field input data
        input = UICtrl.getInput();
        // 2. add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.descrition, input.value);
        // 3. add the new item to the user interface
        UICtrl.addListItem(newItem, input.type);
        // 4. calculate the budget
        // 5. display the budget
    }
    
    return {
        init: function()
        {
            console.log('è partito il macinino');
            setupEventListeners();
        }
    }

})(budgetController, UIController);


controller.init();