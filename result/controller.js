var controller = (function(model, view){

    var reset = function(){
        view.reset();
    };

    var addItem = function(){
        var fet_data = view.fetchData();
        var fet_obj;
        var percArr;

        if(fet_data.subject !== '' && !isNaN(fet_data.marks_secured) && !isNaN(fet_data.total_marks) && fet_data.marks_secured <= fet_data.total_marks && fet_data.total_marks>0){
            fet_obj = model.addItem(fet_data.subject, fet_data.marks_secured, fet_data.total_marks);
            view.htmlToDOM(fet_obj);
            view.clearFields();

            calculateTotals();

            model.calcPer();
            percArr = model.percArr();
            view.updatePercentages(percArr);
        }
    };

    var deleteItem = function(event){
        eventId = event.target.parentNode.parentNode.id;

        if(eventId){
            model.deleteItem(eventId+'');
            view.updateUI(eventId+'');    
        }

        calculateTotals();
    };

    var calculateTotals = function(){
        model.calculateT();
        var calcObj = model.retCalcT();
        view.displayTotals(calcObj);

        view.fetchUser();
        view.fetchedUserData(calcObj);
    };

    return{
        init: function(){
            var dom = view.dom();
        
            document.querySelector(dom.add_btn).addEventListener('click', addItem);
    
            document.addEventListener('keypress', function(event){
    
                if(event.keyCode === 13){
                    addItem();
                }
            });

            document.querySelector(dom.marks_table).addEventListener('click', deleteItem);

            document.querySelector(dom.reset).addEventListener('click', reset);


            view.displayTotals({
                mks_sec: 0,
                tot_mks: 0,
                per: 0
            });

        }
    }

}(model, view));

controller.init();