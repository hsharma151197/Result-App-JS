var model = (function(){
    
    function AddObject(id, subject, marks_secured, total_marks){
        this.id = id;
        this.subject = subject;
        this.marks_secured = marks_secured;
        this.total_marks = total_marks;
        this.percentage = -1;
    }

    AddObject.prototype.calcPercentage = function(){
        this.percentage = ((this.marks_secured/this.total_marks)*100).toFixed(2);
    };

    AddObject.prototype.getPercentage = function(){
        return this.percentage;
    };

    var calcT = function(){
        var sum1 = 0, sum2 = 0;
        dataStruct.allObj.forEach(function(current){
            sum1 += current.marks_secured;
            sum2 += current.total_marks;
        });
        dataStruct.total.marks_secured = sum1;
        dataStruct.total.total_marks = sum2;
        if(sum1 && sum2){    
            dataStruct.percentage = ((sum1/sum2)*100).toFixed(2);
        }else{
            dataStruct.percentage = 0;
        }
    };
    
    var dataStruct = {
        allObj: [],
        total: {
            marks_secured: 0,
            total_marks: 0
        },
        percentage: -1,
    }


    return{
        addItem: function(sub, mks_sec, tot_mks){
            var newObj, id;
            
            if(dataStruct.allObj.length > 0){
                id = dataStruct.allObj[dataStruct.allObj.length-1].id + 1;
            }else{
                id = 0;
            }

            newObj = new AddObject(id, sub, mks_sec, tot_mks);

            dataStruct.allObj.push(newObj);

            return newObj;
        },

        calculateT: function(){
            calcT();
        },
        retCalcT: function(){
            return{
                mks_sec: dataStruct.total.marks_secured,
                tot_mks: dataStruct.total.total_marks,
                per: dataStruct.percentage
            }
        },

        deleteItem: function(id){
            var ids, index;
            ids = dataStruct.allObj.map(function(current){
                return current.id+'';
            });

            index = ids.indexOf(id);

            dataStruct.allObj.splice(index, 1);
        },

        calcPer: function(){
            dataStruct.allObj.forEach(function(current){
                current.calcPercentage();
            });
        },
        percArr: function(){
            var retPercArr = dataStruct.allObj.map(function(current){
                return current.getPercentage();
            });

            return retPercArr;
        }
    };

}());