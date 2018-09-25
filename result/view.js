var view = (function(){
    var domStrings = {
        name: '#name',
        mail: '#mail',
        exam_select: '#exam_select',
        subject: '#subject',
        marks_secured: '#marks_secured',
        total_marks: '#total_marks',
        add_btn: '.add',
        marks_table: '.marks_table',
        marks_secured_in_all: '#marks_secured_in_all',
        total_marks_in_all: '#total_marks_in_all',
        percentage: '#percentage',
        sr: '.sr',
        perc: '.perc',
        reset: '.reset',
        child_4: '.child-4'
    };

    var updateSrNo = function(){
        var srList = document.querySelectorAll(domStrings.sr);
        var srArr = Array.prototype.slice.call(srList);
        srArr.forEach(function(current, index){
            current.textContent = index+1;
        });
    };

    var updatePerc = function(percArr){
        var percList = document.querySelectorAll(domStrings.perc);
        var percArray = Array.prototype.slice.call(percList);
        percArray.forEach(function(current, index){
            current.textContent = percArr[index] + '%';
        });
    }
    
    return { 
        fetchUser: function(){
            return{
                name: document.querySelector(domStrings.name).value,
                mail: document.querySelector(domStrings.mail).value,
                exam_select: document.querySelector(domStrings.exam_select)
            }
        },

        fetchedUserData: function(obj){
            var user_data = this.fetchUser();
            var html, newHtml;

            html = '<h3 id="info">Dear %name%, You get %marks_secured% out of %total_marks% in %exam_select% with %percentage% percent, Have a bright future. Keep doing Hard Work.</h3>';

            if(user_data.name !== ''){
                newHtml = html.replace('%name%', user_data.name);
            }else{
                newHtml = html.replace('%name%', 'Anonymous');
            }

            newHtml = newHtml.replace('%marks_secured%', obj.mks_sec);
            newHtml = newHtml.replace('%total_marks%', obj.tot_mks);
            
            if(user_data.exam_select.value !== ''){
                newHtml = newHtml.replace('%exam_select%', user_data.exam_select.value);
            }else{
                newHtml = newHtml.replace('%exam_select%', 'Exam');
            }

            newHtml = newHtml.replace('%percentage%', obj.per);

            var el = document.getElementById('info');
            if(el !== null){
                el.parentNode.removeChild(el);
            }

            document.querySelector(domStrings.child_4).insertAdjacentHTML('beforeend', newHtml);
            
        },

        fetchData: function(){

            return{
                subject: document.querySelector(domStrings.subject).value,
                marks_secured: parseFloat(document.querySelector(domStrings.marks_secured).value),
                total_marks: parseFloat(document.querySelector(domStrings.total_marks).value)
            }
        },
        dom: function(){
            return domStrings;
        },
        htmlToDOM: function(fet_obj){
            var html, newHtml;
            html = '<tr id="%id%" class="%id% data"><td class="sr">%sr%</td><td>%subject%</td><td>%marks_secured%</td><td>%total_marks%</td><td class="perc">%percentage%</td><td class="delete_btn"><i class="fa fa-trash-o delete_btn-i" style="font-size:22px; color:red;"></i></td></tr>';

            newHtml = html.replace('%id%', fet_obj.id);
            newHtml = newHtml.replace('%id%', fet_obj.id);
            newHtml = newHtml.replace('%subject%', fet_obj.subject);
            newHtml = newHtml.replace('%marks_secured%', fet_obj.marks_secured);
            newHtml = newHtml.replace('%total_marks%', fet_obj.total_marks);

            document.querySelector(domStrings.marks_table).insertAdjacentHTML('beforeend', newHtml);
            updateSrNo();
        },
        clearFields: function(){
            var fieldsList, fieldsArr;
            fieldsList = document.querySelectorAll(domStrings.subject + ', ' + domStrings.marks_secured + ', ' + domStrings.total_marks);
            
            fieldsArr = Array.prototype.slice.call(fieldsList);

            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });

            fieldsArr[0].focus();
        },
        displayTotals: function(obj){
            document.querySelector(domStrings.marks_secured_in_all).textContent = obj.mks_sec;
            document.querySelector(domStrings.total_marks_in_all).textContent = obj.tot_mks;
            document.querySelector(domStrings.percentage).textContent = obj.per+'%'; 
        },
        updateUI: function(selectedID){
            var el = document.getElementById(selectedID);
            el.parentNode.removeChild(el); 
            updateSrNo();
        },

        updatePercentages: function(percArr){
            updatePerc(percArr);
        },

        reset: function(){
            this.displayTotals({
                mks_sec: 0,
                tot_mks: 0,
                per: 0
            });

            var field = document.querySelectorAll('.data');

            var nodeListForEach = function(list, callback){
                for(var i = 0; i < field.length; i++){
                    callback(list[i], i);
                }
            };

            nodeListForEach(field, function(current, index){
                current.parentNode.removeChild(current);
            });

            var el = document.getElementById('info');
            console.log(el);
            if(el !== null){
                el.parentNode.removeChild(el);
            }

            var fieldsList, fieldsArr;
            fieldsList = document.querySelectorAll(domStrings.name + ', ' + domStrings.mail);
            
            fieldsArr = Array.prototype.slice.call(fieldsList);

            fieldsArr.forEach(function(current, index, array){
                current.value = '';
            });
        }
    };
}());