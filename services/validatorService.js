
var validatorService = require('../services/validatorService');

exports.validate=function(res,validateInput,cb){
        var validError={};
        var vr=[];
        var valid=true;
        var validator = require('validator');
        var dateFormat = require('date-format');
        var moment=require('moment');

    console.log("test 123  ");
        for(var key in validateInput){
            var data=validateInput[key];
            validatorService.validateRules(function(rules){
                var getRules=rules[key];
                console.log("getRules");
                console.log(getRules);
                var error=[];
                for(var ruleKey in getRules){

                    var keyFlag=true;

                    if((ruleKey=='required')&&(getRules['required']==false)&&(validator.isNull(data))) break;

                    if((ruleKey=='required')&&(getRules['required']==true)) {
                        if (validator.isNull(data)) {
                            valid    = false;
                            keyFlag  = false;
                            error.push(' Is Required');

                        }
                    }
                    if((ruleKey=='type')&&(getRules['type']=='alphanumeric')){
                        if(!validator.isAlphanumeric(data)){
                            valid   = false;
                            keyFlag = false;
                            error.push((' Should Be AlphaNumeric'));
                        }
                    }
                    if((ruleKey=='type')&&(getRules['type']=='numeric')){
                        if(!validator.isNumeric(data)){
                            valid   = false;
                            keyFlag = false;
                            error.push((' Should Be Numeric'));
                        }
                    }
                    if((ruleKey=='type')&&(getRules['type']=='int')){
                        if(!validator.isInt(data)){
                            valid   = false;
                            keyFlag = false;
                            error.push((' Should Be Valid'));
                        }
                    }

                    var minLen=0;
                    if(!validator.isNull(data)) var maxLen=0;
                    if((getRules['min']!=null)){
                        minLen=getRules['min'];
                    }if((getRules['max']!=null)) {
                        maxLen=getRules['max'];
                    }
                    if((ruleKey==['min']) || (ruleKey==['max'])){

                        if(!validator.isLength(data, minLen ,maxLen)){
                            if(maxLen==0){
                                maxLen ='undefined'
                            }
                            valid   = false;
                            keyFlag = false;
                            error.push(' Minimum Length Should Be '+minLen+' and Maximum Length Should Be '+maxLen);
                        }
                    }

                    if((ruleKey=='type')&&(getRules['type']=='email')){
                        if(!validator.isEmail(data)){
                            valid=false;
                            keyFlag=false;
                            error.push((' Should Be Valid'));
                        }
                    }


                    if((ruleKey=='type')&&(getRules['type']=='mobnumber')){
                        if (!validator.isNull(data)) {
                            var matchplus  = data.match(/[/0-9]{1}[0-9]/);
                            if(matchplus==null){
                                valid=false;
                                keyFlag=false;
                                error.push((' Should Be A Mobile Number'));
                            }
                        }
                    }

                    if(!keyFlag){
                        validError[key]=error;

                    }
                }
            });
        }
        cb(valid,validError);
    };


    exports.validateRules=function(cb){
        var validRules         = {};
        validRules.userName    = {required:true,type:'alphanumeric'};
        validRules.registrationId = {required:true,type:'int'};
        validRules.gender      = {required:true,type:'string',max:1};
        validRules.firstName   = {required:true,type:'string'};
        validRules.lastName    = {required:true,type:'string'};
        validRules.nationality = {required:true,type:'string'};
        validRules.mobileNo    = {required:true,type:'mobnumber',max:13};
        validRules.officeNo    = {required:true,type:'int'};

        cb(validRules);

};
