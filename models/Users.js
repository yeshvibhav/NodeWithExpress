/**
 * Merchantuser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tablename:'Merchantuser',
    connection:'DBConn',
    autoCreatedAt:false,
    autoUpdatedAt:false,
    autoPK:false,
    attributes: {

        ID:{
            type:'INTEGER',
            autoIncrement:true
        },
        MERCHANTID:{
            type:'INTEGER'
        },
        BRANCHID:{
            type:'STRING'
        },
        LOGINID:{
            type:'STRING',
            primaryKey:true,
            required:true
        },
        USERTYPE:{
            type:'STRING'
        },
        TERMINALID:{
            type:'STRING'
        },
        TERMINALUSERID:{
            type:'STRING'
        },
        PASSWORD:{
            type:'STRING'
        },
        PASSPHRASE:{
            type:'STRING'
        },
        TITLE:{
            type:'STRING'
        },
        OTHER_TITLE:{
            type:'STRING'
        },
        FIRSTNAME:{
            type:'STRING'
        },
        MIDDLENAME:{
            type:'STRING'
        },
        LASTNAME:{
            type:'STRING'
        },
        GENDER:{
            type:'STRING'
        },
        DOB:{
            type: 'STRING'
        },
        USERPHOTO:{
            type:'STRING'
        },
        RESIDENTIALSTATUS:{
            type:'STRING'
        },
        CURRENTADDRESS:{
            type:'STRING'
        },
        CORRESPONDENCEADDRESS:{
            type:'STRING'
        },
        PREVIOUSADDRESS:{
            type:'STRING'
        },
        EMAILOFFICIAL: {
            type: 'string'
        },
        NATIONALITY:{
            type:'STRING'
        },
        HOMECONTACTNUMBER:{
            type:'STRING'
        },
        MOBILECONTACTNUMBER:{
            type:'string'
        },
        OFFICECONTACTNUMBER:{
            type:'STRING'
        },
        MERCHANTLATITUDE:{
            type:'string'
        },
        MERCHANTLONGITUDE:{
            type:'string'
        },
        DEVICEID:{
            type:'STRING'
        },
        MACID:{
            type:'STRING'
        },
        GCMID:{
            type:'STRING'
        },
        DEVICEOS:{
            type:'STRING'
        },
        STATUS:{
            type:'STRING'
        },
        REGISTRATIONDATE:{
            type: 'datetime',
            defaultsTo: function (){ return new Date(); }
        },
        FAX:{
            type:'STRING'
        },
        PASSWORDEXPIRYAPPLICABLE:{
            type:'STRING'
        },
        PASSWORDEXPIRYDAYS:{
            type:'INTEGER'
        },
        PWDNEXTCHANGEDATE:{
            type: 'datetime'
        },
        FORCECHANGE:{
            type:'STRING'
        },
        PASSWORDSTATUS:{
            type:'STRING'
        },
        IDLENODAYS:{
            type:'INTEGER'
        },
        INSTRUCTIONTYPE:{
            type:'STRING'
        },
        REMARKS:{
            type:'STRING'
        },
        KYCIDENTIFIER:{
            type:'STRING'
        },
        KYCIDENTIFIERVALUE:{
            type:'STRING'
        },
        EMAILALERTENABLE:{
            type:'STRING'
        },
        SMSALERTENABLE:{
            type:'STRING'
        },
        ISPROMOTIONALMAILENABLE:{
            type:'STRING'
        },
        ISSHIFTAPPLICABLE:{
            type:'STRING'
        },
        CREATIONDATE:{
            type: 'datetime',
            defaultsTo: function (){ return new Date(); }
        },
        CREATEDBY:{
            type:'STRING'
        },
        CREATEDBYSESSIONID:{
            type:'STRING'
        },
        MODIFIEDDATE:{
            type: 'datetime',
            defaultsTo: function (){ return new Date(); }
            //required:true
        },
        MODIFIEDBY:{
            type:'string'
        },
        MODIFIEDBYSESSIONID:{
            type:'string'
        },
        ROLEID:{
            type:'STRING'
        },
        SPECIALRIGHTS:{
            type:'STRING'
        },
        FIRSTLOGON:{
            type:'STRING',
            required:true
        },
        POSTALCODE: {
            type: 'INTEGER'
        },
        REMARKS:{
            type:'string'
        },
        REJECTIONREASON:{
            type:'string'
        }
    }

};
