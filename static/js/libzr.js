var Libzr = (function Libzr() {
    var _privateVars = {
        "someVar": "This value made public by `someMethod`",
        "privateVar": "Can't see this value"
    };

    return function LibzrConstructor() {
        var _this = this; // Cache the `this` keyword

        _this.init= function () {
            // Add format date
            Date.prototype.format = function(format)
            {
                var o = {
                    "M+" : this.getMonth()+1, //month
                    "d+" : this.getDate(),    //day
                    "h+" : this.getHours(),   //hour
                    "m+" : this.getMinutes(), //minute
                    "s+" : this.getSeconds(), //second
                    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
                    "S" : this.getMilliseconds() //millisecond
                };

                if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)if(new RegExp("("+ k +")").test(format))
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length==1 ? o[k] :
                            ("00"+ o[k]).substr((""+ o[k]).length));
                return format;
            };
        };

        _this.getApi= function () {
            return '/api/v1/';
        };

        _this.getDelimiterVue = function () {
            return ['${', '}'];
        };

        _this.notifyBrowser = function (name, params) {
            if (("Notification" in window)) {
                // Let's check if the user is okay to get some notification
                if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {
                        // Whatever the user answers, we make sure we store the information
                        if(!('permission' in Notification)) {
                            Notification.permission = permission;
                        }
                        // If the user is okay, let's create a notification
                        if (permission === "granted") {
                            if (params['icon'] === undefined)
                                params['icon'] = '/images/logo.png';
                            var notification = new Notification(name, params);
                        }
                    });
                }
            }else{
                console.log("This browser does not support desktop notification");
            }
        };

        _this.isStrDate =  function (date) {
            // format DD/MM/YYYY or DD-MM-YYYY
            var dateRE = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            return dateRE.test(date);
        };

        _this.getUtcDate= function (_date) {
            if (_date === undefined)
                _date = new Date();
            var now_utc =  new Date(
                _date.getUTCFullYear(),
                _date.getUTCMonth(),
                _date.getUTCDate(),
                _date.getUTCHours(),
                _date.getUTCMinutes(),
                _date.getUTCSeconds()
            );
            return now_utc;

        };

        _this.getRandom= function (min, max) {
            return Math.floor(Math.random() * (max - min + min)) + 1;
        };

        _this.getDiffDay =  function (start_date, due_date) {
            var timeDiff = start_date.getTime() - due_date.getTime();
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        };

        // _this.snackBarNotify =  function (id) {
        //     var myElem = document.getElementById(id);
        //     if (myElem === null){
        //         console.log('Snack Bar Notify id don\'t exists')
        //     }else{
        //         var notify = new Vue({
        //             delimiters: libzr.getDelimiterVue(),
        //             el: '#'+id,
        //             template:
        //             '<div id="zr-notify-snackbar" class="mdl-js-snackbar mdl-snackbar">'+
        //                 '<!--<div id="notify-snackbar-background" class="mdl-color&#45;&#45;red">-->'+
        //                     '<div class="mdl-snackbar__text"></div>'+
        //                     '<button class="mdl-snackbar__action" type="button"></button>'+
        //                 '<!--</div>-->'+
        //             '</div>',
        //             data: {
        //
        //             },
        //             methods:{
        //                 notify: function (data) {
        //                     var snackbarContainer = document.querySelector('#zr-notify-snackbar');
        //                     if (!data.hasOwnProperty('timeout')){
        //                         data.timeout =2000;
        //                     }
        //                     snackbarContainer.MaterialSnackbar.showSnackbar(data);
        //                 }
        //             }
        //         });
        //         notify.notify(data)
        //     }
        // }
    };
}());
const libzr = new Libzr(); // invoke
libzr.init();