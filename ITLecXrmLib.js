/// <reference path="tsdefination/index.d.ts" />
/// <reference path="tsdefination/lib.d.ts" />
var ITLecXrm;
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="tsdefination/lib.d.ts" />
(function (ITLecXrm) {
    function getXrm() {
        // return typeof Xrm != "undefined" && typeof Xrm.Page != "undefined" ? Xrm : WindowParent().Xrm;
        var _xrm = (typeof Xrm != "undefined" && typeof Xrm.Page != "undefined") ? Xrm : window.parent.Xrm;
        return (typeof _xrm != "undefined" && typeof _xrm.Page != "undefined") ? _xrm : window.opener.Xrm;
    }
    ITLecXrm.getXrm = getXrm;
    function getJSON() {
        //   throw new Error('Not Implemented yet.');
        return typeof JSON != "undefined" ? JSON : WindowParent().JSON;
    }
    ITLecXrm.getJSON = getJSON;
    function WindowParent() {
        return window.parent;
    }
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var JS;
    (function (JS) {
        var DateUtil;
        (function (DateUtil) {
            function isValidDate(str) {
                var retVal = false;
                var convertedVal = Date.parse(str);
                if (!isNaN(convertedVal)) {
                    retVal = true;
                }
                return retVal;
            }
            DateUtil.isValidDate = isValidDate;
        })(DateUtil = JS.DateUtil || (JS.DateUtil = {}));
    })(JS = ITLecXrm.JS || (ITLecXrm.JS = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var JS;
    (function (JS) {
        var NumberUtil;
        (function (NumberUtil) {
            function IsPositiveInteger(_number) {
                var n = Math.floor(Number(_number));
                return n !== Infinity && String(n) === _number && n >= 0;
            }
        })(NumberUtil = JS.NumberUtil || (JS.NumberUtil = {}));
    })(JS = ITLecXrm.JS || (ITLecXrm.JS = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var Helper;
    (function (Helper) {
        var StringFacade;
        (function (StringFacade) {
            function getRandomId() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 5; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                return text;
            }
            StringFacade.getRandomId = getRandomId;
            function getPlural(word) {
                var words;
                words = "" + word + (ITLecXrm.Helper.StringFacade.endsWith(word, "s") ? "es" : "s"); //  word + ITLecXrm.Helper.StringFacade.endsWith(word, "s") ? "es" : "s";
                return words;
            }
            StringFacade.getPlural = getPlural;
            function endsWith(word, subString) {
                var lastIndex = word.lastIndexOf(subString);
                return (lastIndex !== -1) && (lastIndex + subString.length === word.length);
            }
            StringFacade.endsWith = endsWith;
        })(StringFacade = Helper.StringFacade || (Helper.StringFacade = {}));
    })(Helper = ITLecXrm.Helper || (ITLecXrm.Helper = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="itlecxrm.ts" />
var ITLecXrm;
/// <reference path="itlecxrm.ts" />
(function (ITLecXrm) {
    var URL;
    (function (URL) {
        function getClientURL() {
            var context = ITLecXrm.getXrm().Page.context;
            var crmUrl = context.getClientUrl();
            return crmUrl;
        }
        URL.getClientURL = getClientURL;
        /* Not Supported
        export function getOrganizationDataSvc(): string{

            var serverUrl = getClientURL();
            var oDataPath = serverUrl + "/XRMServices/2011/OrganizationData.svc";
            return oDataPath;
        }*/
        function getOdataURL() {
            var serverURL = getClientURL();
            var url = serverURL + "/api/data/v8.0";
            return url;
        }
        URL.getOdataURL = getOdataURL;
        function getAllEntitiesLogicalNameAPIUrl() {
            var odataURL = getOdataURL();
            var allEntitiesURL = odataURL + "/EntityDefinitions?$select=LogicalName";
            return allEntitiesURL;
        }
        URL.getAllEntitiesLogicalNameAPIUrl = getAllEntitiesLogicalNameAPIUrl;
        function getViewAPIUrl(viewName) {
            var odataURL = getOdataURL();
            var url = odataURL + "/savedqueries?$top=1&$select=fetchxml,savedqueryid,layoutxml,name,returnedtypecode&$filter=name eq '" + viewName + "'";
            return url;
        }
        URL.getViewAPIUrl = getViewAPIUrl;
        function getAllSdkMessagesUrl() {
            var odataURL = getOdataURL();
            var url = odataURL + "/sdkmessages?$select=sdkmessageid,name&$filter=isprivate eq false";
            return url;
        }
        URL.getAllSdkMessagesUrl = getAllSdkMessagesUrl;
    })(URL = ITLecXrm.URL || (ITLecXrm.URL = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
var ITLecXrm;
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
(function (ITLecXrm) {
    var WebResource;
    (function (WebResource) {
        function getParam(paramName) {
            var retVal = "";
            var vals = new Array();
            if (location.search != "") {
                vals = location.search.substr(1).split("&");
                for (var i in vals) {
                    vals[i] = vals[i].replace(/\+/g, " ").split("=");
                }
                //look for the parameter named 'data'
                for (var i in vals) {
                    if (vals[i][0].toLowerCase() == "data") {
                        retVal = _parseDataValue(vals[i][1], paramName);
                        break;
                    }
                }
            }
            return retVal;
        }
        WebResource.getParam = getParam;
        function _parseDataValue(datavalue, paramName) {
            var retVal = "";
            if (datavalue != "") {
                var vals = new Array();
                vals = decodeURIComponent(datavalue).split("&");
                for (var i in vals) {
                    vals[i] = vals[i].replace(/\+/g, " ").split("=");
                    if (vals[i][0] == paramName) {
                        return vals[i][1];
                    }
                }
            }
            return retVal;
        }
        WebResource._parseDataValue = _parseDataValue;
    })(WebResource = ITLecXrm.WebResource || (ITLecXrm.WebResource = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var Helper;
    (function (Helper) {
        var KeyValueClass = /** @class */ (function () {
            function KeyValueClass() {
            }
            return KeyValueClass;
        }());
        Helper.KeyValueClass = KeyValueClass;
    })(Helper = ITLecXrm.Helper || (ITLecXrm.Helper = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
var ITLecXrm;
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
(function (ITLecXrm) {
    var Form;
    (function (Form) {
        var Control;
        (function (Control) {
            function setLabel(controlName, label) {
                ITLecXrm.getXrm().Page.getControl(controlName).setLabel(label);
            }
            Control.setLabel = setLabel;
            function getValue(controlName) {
                return ITLecXrm.getXrm().Page.getAttribute(controlName).getValue();
            }
            Control.getValue = getValue;
        })(Control = Form.Control || (Form.Control = {}));
    })(Form = ITLecXrm.Form || (ITLecXrm.Form = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
/// <reference path="helper/stringfacade.ts" />
var ITLecXrm;
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
/// <reference path="helper/stringfacade.ts" />
(function (ITLecXrm) {
    var HttpRequest;
    (function (HttpRequest) {
        function updateRecordAsync(entityName, recordGuid, recordObj, functionName) {
            debugger;
            var clientUrl = ITLecXrm.getXrm().Page.context.getClientUrl();
            recordGuid = recordGuid.replace("{", "").replace("}", "");
            var req = new XMLHttpRequest();
            req.open("PATCH", encodeURI(ITLecXrm.URL.getOdataURL() + "/" + ITLecXrm.Helper.StringFacade.getPlural(entityName) + "(" + recordGuid + ")"), true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            var body = JSON.stringify(recordObj);
            if (functionName) {
                req.onreadystatechange = function () { _CallBack(this, functionName); };
            }
            req.send(body);
        }
        HttpRequest.updateRecordAsync = updateRecordAsync;
        function createNewRecord(entityName, recordObj) {
            var req = new XMLHttpRequest();
            req.open("POST", encodeURI(ITLecXrm.URL.getOdataURL() + "/" + entityName + "s"), false);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            //req.onreadystatechange = function () {
            //    var accountUri = this.getResponseHeader("OData-EntityId");
            //};
            var body = JSON.stringify(recordObj);
            req.send(body);
            var recordId = req.getResponseHeader("OData-EntityId");
            var arr = recordId.split("(");
            if (arr.length > 1) {
                var subArr = arr[1].split(")");
                if (subArr.length > 0) {
                    recordId = subArr[0];
                }
            }
            return recordId;
        }
        HttpRequest.createNewRecord = createNewRecord;
        function getODataResponseText(url) {
            var xmlhttp = null;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            }
            else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET", url, false);
            xmlhttp.setRequestHeader("X-Requested-Width", "XMLHttpRequest");
            xmlhttp.setRequestHeader("Accept", "application/json, text/javascript, */*");
            xmlhttp.send(null);
            return xmlhttp.responseText;
        }
        HttpRequest.getODataResponseText = getODataResponseText;
        function getODataObjectResult(url) {
            var str = getODataResponseText(url);
            var data = eval('(' + str + ')');
            return data;
        }
        HttpRequest.getODataObjectResult = getODataObjectResult;
        //SelectString = address1_latitude,address1_longitude
        function getRecordById(entityName, entityGuid, selectString) {
            var _retVal = null;
            if (entityName && entityGuid) {
                entityGuid = entityGuid.replace("{", "").replace("}", "");
                var serverURL = ITLecXrm.URL.getClientURL();
                var recordURL = serverURL + "/api/data/v8.0/" + ITLecXrm.Helper.StringFacade.getPlural(entityName) + "(" + entityGuid + ")?$select=" + ((selectString) ? selectString : '*');
                // var recordURL = serverURL + "/api/data/v8.0/itlec_entitygoogleconfigs?$filter=itlec_entityname eq '" + _entityName + "'";
                var data = ITLecXrm.HttpRequest.getODataObjectResult(recordURL);
                if (data) {
                    _retVal = data;
                }
            }
            return _retVal;
        }
        HttpRequest.getRecordById = getRecordById;
        function PostAsync(_Url, functionName) {
            var retrieveReq = new XMLHttpRequest();
            retrieveReq.open("POST", _Url, true);
            retrieveReq.setRequestHeader("Accept", "application/json");
            retrieveReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            retrieveReq.setRequestHeader("OData-MaxVersion", "4.0");
            retrieveReq.setRequestHeader("OData-Version", "4.0");
            retrieveReq.onreadystatechange = function () { _CallBack(this, functionName); };
            retrieveReq.send();
        }
        HttpRequest.PostAsync = PostAsync;
        function getAsync(_Url, functionName) {
            var retrieveReq = new XMLHttpRequest();
            retrieveReq.open("GET", _Url, false);
            retrieveReq.setRequestHeader("Accept", "application/json");
            retrieveReq.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            retrieveReq.onreadystatechange = function () { _CallBack(this, functionName); };
            retrieveReq.send();
        }
        HttpRequest.getAsync = getAsync;
        function _CallBack(retrieveReq, functionNameStr) {
            if (retrieveReq.readyState == 4 /* complete */) {
                try {
                    var retrieved = ITLecXrm.getJSON().parse(retrieveReq.responseText); //.d
                    if (retrieved) {
                        var record = retrieved;
                        window[functionNameStr](record);
                    }
                }
                catch (err) {
                    eval(functionNameStr);
                }
            }
        }
        HttpRequest._CallBack = _CallBack;
    })(HttpRequest = ITLecXrm.HttpRequest || (ITLecXrm.HttpRequest = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="..\tsdefination/index.d.ts" />
/// <reference path="..\itlecxrm.ts" />
/// <reference path="..\url.ts" />
/// <reference path="..\tsdefination/lib.d.ts" />
var ITLecXrm;
/// <reference path="..\tsdefination/index.d.ts" />
/// <reference path="..\itlecxrm.ts" />
/// <reference path="..\url.ts" />
/// <reference path="..\tsdefination/lib.d.ts" />
(function (ITLecXrm) {
    var Entity;
    (function (Entity) {
        var Attribute;
        (function (Attribute) {
            function getAttribute(attributeName) {
                //return ITLecXrmUtils.GetXrm().Page.getAttribute(attributeName).getValue();
                var retVal = null;
                try {
                    retVal = ITLecXrm.getXrm().Page.getAttribute(attributeName).getValue();
                }
                catch (e) {
                }
                return retVal;
            }
            Attribute.getAttribute = getAttribute;
            function setAttribute(attributeName, attributeValue) {
                ITLecXrm.getXrm().Page.getAttribute(attributeName).setValue(attributeValue);
                ITLecXrm.getXrm().Page.getAttribute(attributeName).setSubmitMode("always");
            }
            Attribute.setAttribute = setAttribute;
        })(Attribute = Entity.Attribute || (Entity.Attribute = {}));
    })(Entity = ITLecXrm.Entity || (ITLecXrm.Entity = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
/// <reference path="httprequest.ts" />
/// <reference path="entity/itlecxrm.entity.attribute.ts" />
var ITLecXrm;
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
/// <reference path="httprequest.ts" />
/// <reference path="entity/itlecxrm.entity.attribute.ts" />
(function (ITLecXrm) {
    var Security;
    (function (Security) {
        function getRoleName(userRoleId) {
            var roleName = "";
            var req = new XMLHttpRequest();
            req.open("GET", ITLecXrm.getXrm().Page.context.getClientUrl() + "/api/data/v8.2/roles(" + userRoleId + ")?$select=name", false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"OData.Community.Display.V1.FormattedValue\"");
            req.send();
            var results = JSON.parse(req.response);
            if (results.name != null) {
                roleName = results.name;
            }
            return roleName;
        }
        Security.getRoleName = getRoleName;
    })(Security = ITLecXrm.Security || (ITLecXrm.Security = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="httprequest.ts" />
/// <reference path="js/itlecxrm.js.numberutil.ts" />
var ITLecXrm;
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="httprequest.ts" />
/// <reference path="js/itlecxrm.js.numberutil.ts" />
(function (ITLecXrm) {
    var Converter;
    (function (Converter) {
        function convertFromLogicalNameToObjectTypeCode(logicalName) {
            var filterURL = ITLecXrm.URL.getOdataURL() + "/EntityDefinitions?$select=ObjectTypeCode&$filter=LogicalName eq '" + logicalName + "'";
            var data = ITLecXrm.HttpRequest.getODataObjectResult(filterURL);
            return data.value[0].ObjectTypeCode;
        }
        Converter.convertFromLogicalNameToObjectTypeCode = convertFromLogicalNameToObjectTypeCode;
    })(Converter = ITLecXrm.Converter || (ITLecXrm.Converter = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
var ITLecXrm;
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
(function (ITLecXrm) {
    var Entity;
    (function (Entity) {
        function getEntity() {
            return ITLecXrm.getXrm().Page.data.entity;
        }
        Entity.getEntity = getEntity;
        function getId() {
            return getEntity().getId();
        }
        Entity.getId = getId;
        function getEntityName() {
            return getEntity().getEntityName();
        }
        Entity.getEntityName = getEntityName;
    })(Entity = ITLecXrm.Entity || (ITLecXrm.Entity = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../httprequest.ts" />
var ITLecXrm;
/// <reference path="../httprequest.ts" />
(function (ITLecXrm) {
    var Form;
    (function (Form) {
        var Control;
        (function (Control) {
            var OptionSet;
            (function (OptionSet) {
                function getGlobalOptionSet(globalOptionSetName) {
                    var url = parent.Xrm.Page.context.getClientUrl()
                        + "/api/data/v8.2/GlobalOptionSetDefinitions(Name='" + globalOptionSetName + "')";
                    return ITLecXrm.HttpRequest.getODataObjectResult(url);
                }
                OptionSet.getGlobalOptionSet = getGlobalOptionSet;
            })(OptionSet = Control.OptionSet || (Control.OptionSet = {}));
        })(Control = Form.Control || (Form.Control = {}));
    })(Form = ITLecXrm.Form || (ITLecXrm.Form = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
/// <reference path="httprequest.ts" />
/// <reference path="entity/itlecxrm.entity.attribute.ts" />
var ITLecXrm;
/// <reference path="tsdefination/index.d.ts" />
/// <reference path="itlecxrm.ts" />
/// <reference path="url.ts" />
/// <reference path="tsdefination/lib.d.ts" />
/// <reference path="httprequest.ts" />
/// <reference path="entity/itlecxrm.entity.attribute.ts" />
(function (ITLecXrm) {
    var Metadata;
    (function (Metadata) {
        function getAllEntitiesLogicalNameAsync(GetAllEntitiesLogicalName_CallBack) {
            var allEntitiesURL = ITLecXrm.URL.getAllEntitiesLogicalNameAPIUrl();
            ITLecXrm.HttpRequest.getAsync(allEntitiesURL, GetAllEntitiesLogicalName_CallBack);
        }
        Metadata.getAllEntitiesLogicalNameAsync = getAllEntitiesLogicalNameAsync;
        function getAllEntitiesLogicalName() {
            var allEntitiesURL = ITLecXrm.URL.getAllEntitiesLogicalNameAPIUrl();
            var data = ITLecXrm.HttpRequest.getODataObjectResult(allEntitiesURL);
            data.value.sort(function (o1, o2) {
                var t1 = o1.LogicalName.toLowerCase(), t2 = o2.LogicalName.toLowerCase();
                return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
            });
            return data.value;
        }
        Metadata.getAllEntitiesLogicalName = getAllEntitiesLogicalName;
        function getAllSdkMessageslName() {
            //if (ArrAllEntitiesLogicalName)
            var allSdkMSGUrl = ITLecXrm.URL.getAllSdkMessagesUrl();
            var data = ITLecXrm.HttpRequest.getODataObjectResult(allSdkMSGUrl);
            data.value.sort(function (o1, o2) {
                var t1 = o1.name.toLowerCase(), t2 = o2.name.toLowerCase();
                return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
            });
            return data.value;
        }
        Metadata.getAllSdkMessageslName = getAllSdkMessageslName;
        function getEntitySetName(entityName) {
            var retVal = "";
            var url = ITLecXrm.URL.getOdataURL() + "/EntityDefinitions?$select=EntitySetName&$filter=LogicalName eq '" + entityName + "'";
            var data = ITLecXrm.HttpRequest.getODataObjectResult(url);
            if (data.value[0] && data.value[0].EntitySetName) {
                retVal = data.value[0].EntitySetName;
            }
            return retVal;
        }
        Metadata.getEntitySetName = getEntitySetName;
        function getEntityMetadataId(entityName) {
            var retVal = "";
            var url = ITLecXrm.URL.getOdataURL() + "/EntityDefinitions?$select=MetadataId&$filter=LogicalName eq '" + entityName + "'";
            var data = ITLecXrm.HttpRequest.getODataObjectResult(url);
            if (data.value[0] && data.value[0].MetadataId) {
                retVal = data.value[0].MetadataId;
            }
            return retVal.replace("{", "").replace("}", "");
        }
        Metadata.getEntityMetadataId = getEntityMetadataId;
        function getEntityAttributes(entityName) {
            var attributes = null;
            //  let url: string = `${ITLecXrm.URL.getOdataURL()}/EntityDefinitions?$select=MetadataId&$filter=LogicalName eq '${entityName}'`;
            var metadataId = ITLecXrm.Metadata.getEntityMetadataId(entityName);
            if (metadataId) {
                var url = ITLecXrm.URL.getOdataURL() + "/EntityDefinitions(" + metadataId + ")?$select=LogicalName&$expand=Attributes($select=LogicalName)";
                var data = ITLecXrm.HttpRequest.getODataObjectResult(url);
                if (data.Attributes) {
                    attributes = data.Attributes;
                }
            }
            return attributes;
        }
        Metadata.getEntityAttributes = getEntityAttributes;
    })(Metadata = ITLecXrm.Metadata || (ITLecXrm.Metadata = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../entity/itlecxrm.entity.ts" />
/// <reference path="../entity/itlecxrm.entity.attribute.ts" />
/// <reference path="../helper/keyvalueclass.ts" />
/// <reference path="../metadata.ts" />
var ITLecXrm;
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../entity/itlecxrm.entity.ts" />
/// <reference path="../entity/itlecxrm.entity.attribute.ts" />
/// <reference path="../helper/keyvalueclass.ts" />
/// <reference path="../metadata.ts" />
(function (ITLecXrm) {
    var Form;
    (function (Form) {
        var Control;
        (function (Control) {
            var TextBox;
            (function (TextBox) {
                function _SetAutoComplete_keyPressFcn(ext, fieldName, arr) {
                    try {
                        var userInput = ITLecXrm.getXrm().Page.getControl(fieldName).getValue();
                        //  let userInput: String =    ITLecXrm.Entity.Attribute.getAttribute(fieldName);
                        var resultSet = {
                            results: new Array(),
                            commands: {
                                id: "sp_commands",
                                label: "Learn More",
                                action: function () {
                                    // Specify what you want to do when the user
                                    // clicks the "Learn More" link at the bottom
                                    // of the auto-completion list.
                                    // For this sample, we are just opening a page
                                    // that provides information on working with
                                    // accounts in CRM.
                                    window.open("www.itlec.com");
                                }
                            }
                        };
                        var userInputLowerCase = userInput.toLowerCase();
                        for (var i = 0; i < arr.length; i++) {
                            // if (userInputLowerCase === arr[i].name.substring(0, userInputLowerCase.length).toLowerCase()) {
                            if (arr[i].Key.toLowerCase().indexOf(userInputLowerCase) != -1) {
                                resultSet.results.push({
                                    id: i,
                                    fields: [arr[i].Key]
                                });
                            }
                            if (resultSet.results.length >= 20)
                                break;
                        }
                        if (resultSet.results.length > 0) {
                            ext.getEventSource().showAutoComplete(resultSet);
                        }
                        else {
                            ext.getEventSource().hideAutoComplete();
                        }
                    }
                    catch (e) {
                        // Handle any exceptions. In the sample code,
                        // we are just displaying the exception, if any.
                        console.log(e);
                    }
                }
                TextBox._SetAutoComplete_keyPressFcn = _SetAutoComplete_keyPressFcn;
                function setAutoComplete(fieldName, arr) {
                    /*
                    arr = [
                        { name: 'A. Datum Corporation', code: 'A01' },
                        { name: 'Adventure Works Cycles', code: 'A02' }
                    ];*/
                    var keyPressFcn = function (ext) {
                        ITLecXrm.Form.Control.TextBox._SetAutoComplete_keyPressFcn(ext, fieldName, arr);
                    };
                    ITLecXrm.getXrm().Page.getControl(fieldName).addOnKeyPress(keyPressFcn);
                }
                TextBox.setAutoComplete = setAutoComplete;
                function setAutoCompleteWithEntityNames(fieldName) {
                    var arr = ITLecXrm.Metadata.getAllEntitiesLogicalName();
                    if (arr) {
                        var newArr = new Array();
                        //  let  newArr : ITLecXrm.Helper.KeyValueClass[];
                        arr.forEach(function (item) {
                            var obj = new ITLecXrm.Helper.KeyValueClass(); //new Object();
                            obj.Key = item.LogicalName;
                            obj.Value = item.LogicalName;
                            newArr.push(obj);
                        });
                        ITLecXrm.Form.Control.TextBox.setAutoComplete(fieldName, newArr);
                    }
                }
                TextBox.setAutoCompleteWithEntityNames = setAutoCompleteWithEntityNames;
                function SetAutoCompleteWithAllSdkMSGNames(fieldName) {
                    var arr = ITLecXrm.Metadata.getAllSdkMessageslName();
                    var newArr = new Array();
                    //    var newArr: ITLecXrm.Helper.KeyValueClass[];
                    arr.forEach(function (item) {
                        var obj = new ITLecXrm.Helper.KeyValueClass(); // new Object();
                        obj.Key = item.sdkmessageid;
                        obj.Value = item.name;
                        newArr.push(obj);
                    });
                    ITLecXrm.Form.Control.TextBox.setAutoComplete(fieldName, newArr);
                }
                TextBox.SetAutoCompleteWithAllSdkMSGNames = SetAutoCompleteWithAllSdkMSGNames;
                function HideAutoComplete(fieldName) {
                    //todo         ITLecXrm.getXrm().Page.getControl(fieldName).hideAutoComplete();
                }
                function removeAutoComplete(fieldName) {
                    var arr = [];
                    var keyPressFcn = function (ext) {
                        _SetAutoComplete_keyPressFcn(ext, fieldName, arr);
                    };
                    ITLecXrm.getXrm().Page.getControl(fieldName).addOnKeyPress(keyPressFcn);
                }
                TextBox.removeAutoComplete = removeAutoComplete;
                function setAutoCompleteWithEntityAttributes(fieldName, entityName) {
                    var arr = ITLecXrm.Metadata.getEntityAttributes(entityName);
                    if (arr) {
                        var newArr = new Array();
                        arr.forEach(function (item) {
                            var obj = new ITLecXrm.Helper.KeyValueClass(); //new Object();
                            obj.Key = item.LogicalName;
                            obj.Value = item.LogicalName;
                            newArr.push(obj);
                        });
                        ITLecXrm.Form.Control.TextBox.setAutoComplete(fieldName, newArr);
                    }
                }
                TextBox.setAutoCompleteWithEntityAttributes = setAutoCompleteWithEntityAttributes;
            })(TextBox = Control.TextBox || (Control.TextBox = {}));
        })(Control = Form.Control || (Form.Control = {}));
    })(Form = ITLecXrm.Form || (ITLecXrm.Form = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../entity/itlecxrm.entity.ts" />
/// <reference path="../entity/itlecxrm.entity.attribute.ts" />
/// <reference path="../helper/keyvalueclass.ts" />
/// <reference path="../metadata.ts" />
/// <reference path="../converter.ts" />
var ITLecXrm;
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../entity/itlecxrm.entity.ts" />
/// <reference path="../entity/itlecxrm.entity.attribute.ts" />
/// <reference path="../helper/keyvalueclass.ts" />
/// <reference path="../metadata.ts" />
/// <reference path="../converter.ts" />
(function (ITLecXrm) {
    var Form;
    (function (Form) {
        var Control;
        (function (Control) {
            var Lookup;
            (function (Lookup) {
                function getCurrentEntityLookupText(attributename) {
                    var lookuptext = '';
                    var objectLookup = ITLecXrm.Entity.Attribute.getAttribute(attributename);
                    if ((objectLookup != null)) {
                        lookuptext = objectLookup[0].name;
                    }
                    return lookuptext;
                }
                Lookup.getCurrentEntityLookupText = getCurrentEntityLookupText;
                function getCurrentEntityLookupGuid(attributename) {
                    var lookuptext = '';
                    var objectLookup = ITLecXrm.Entity.Attribute.getAttribute(attributename);
                    if ((objectLookup != null)) {
                        lookuptext = objectLookup[0].id;
                    }
                    return lookuptext;
                }
                Lookup.getCurrentEntityLookupGuid = getCurrentEntityLookupGuid;
                function openLookupFilterByViewName(viewName, callBack_Function) {
                    //TODO
                    throw new Error('Not Implemented yet.');
                    //    var filterURL = ITLecXrm.URL.getViewAPIUrl(viewName);
                    //    var data = ITLecXrm.HttpRequest.getODataObjectResult(filterURL);
                    //    var objectCode = ITLecXrm.Converter.convertFromLogicalNameToObjectTypeCode(data.value[0].returnedtypecode);
                    //    var fetchxml = data.value[0].fetchxml;
                    //    var layout = data.value[0].layoutxml;
                    //    var viewId = data.value[0].savedqueryid;
                    //    //creates the custom view object
                    //    var customView = data.value[0];
                    //    /*{
                    //    fetchXml: fetchxml,
                    //    id: viewId,
                    //    layoutXml: layout,
                    //    name: "Contact Lookup",
                    //    recordType: objectCode,
                    //    Type: 0
                    //};*/
                    //    ITLecXrm.getMscrm().Utilities.returnLookupItems = function (lookupItems, lookupField, bPopulateLookup, callbackReference) {
                    //        //Checks the itmem selected and add it to the grid
                    //        if (lookupItems != null) {
                    //            if (lookupItems.items.length > 0) {
                    //                callBack_Function(lookupItems);
                    //                //    window[functionName](lookupItems);
                    //                /*    var lookupItemName = lookupItems.items[0].name;
                    //                    alert(lookupItemName);
                    //                    var lookupItemId = lookupItems.items[0].id;*/
                    //            }
                    //        }
                    //    };
                    //    //Creates the call back function object
                    //    var callbackFunctionObject = ITLecXrmUtils.GetMscrm().Utilities.createCallbackFunctionObject('returnLookupItems', ITLecXrmUtils.GetMscrm().Utilities, [null, null], false);
                    //    //pops the lookup window with our view injected
                    //    ITLecXrmUtils.SetLookupObjectsWithCallback(callbackFunctionObject, null, "single", objectCode, 0, null, "", "0", null, null, null, null, null, viewId, [customView], null, null, null, null, "0", "0", "0", null, null, null);
                }
            })(Lookup = Control.Lookup || (Control.Lookup = {}));
        })(Control = Form.Control || (Form.Control = {}));
    })(Form = ITLecXrm.Form || (ITLecXrm.Form = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
var ITLecXrm;
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
(function (ITLecXrm) {
    var Xml;
    (function (Xml) {
        var XmlHelper;
        (function (XmlHelper) {
            function convertStringToXml(xmlStr) {
                var xmlDoc;
                var parser;
                if (window.DOMParser) {
                    // code for modern browsers
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xmlStr, "text/xml");
                }
                else {
                    // code for old IE browsers
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlStr);
                }
                return xmlDoc;
            }
            XmlHelper.convertStringToXml = convertStringToXml;
        })(XmlHelper = Xml.XmlHelper || (Xml.XmlHelper = {}));
    })(Xml = ITLecXrm.Xml || (ITLecXrm.Xml = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="../entity/itlecxrm.entity.attribute.ts" />
/// <reference path="ITLecXrm.Xml.XmlHelper.ts" />
var ITLecXrm;
/// <reference path="../tsdefination/index.d.ts" />
/// <reference path="../itlecxrm.ts" />
/// <reference path="../url.ts" />
/// <reference path="../tsdefination/lib.d.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="../entity/itlecxrm.entity.attribute.ts" />
/// <reference path="ITLecXrm.Xml.XmlHelper.ts" />
(function (ITLecXrm) {
    var Xml;
    (function (Xml) {
        var FetchXml;
        (function (FetchXml) {
            function executeFetchXml(fetchXmlStr) {
                var xmlDoc = ITLecXrm.Xml.XmlHelper.convertStringToXml(fetchXmlStr);
                var entityElement = xmlDoc.getElementsByTagName('entity')[0];
                var entityName = entityElement.attributes[0].nodeValue;
                var encodedFetchXML = encodeURIComponent(fetchXmlStr);
                var url = ITLecXrm.URL.getClientURL() + "/api/data/v8.0/" + entityElement + "s?fetchXml=" + encodedFetchXML;
                var fetchXmlObj = ITLecXrm.HttpRequest.getODataObjectResult(url);
            }
            FetchXml.executeFetchXml = executeFetchXml;
        })(FetchXml = Xml.FetchXml || (Xml.FetchXml = {}));
    })(Xml = ITLecXrm.Xml || (ITLecXrm.Xml = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var Ribbon;
    (function (Ribbon) {
        var Menu = /** @class */ (function () {
            function Menu(key, text, subMenu, menuAction) {
                this.Key = key;
                this.MenuAction = menuAction;
                this.SubMenus = subMenu;
                this.Text = text;
            }
            return Menu;
        }());
        Ribbon.Menu = Menu;
        var MenuAction = /** @class */ (function () {
            function MenuAction(functionName, _arg) {
                this.FunctionName = functionName;
                this.arg = _arg;
            }
            return MenuAction;
        }());
        Ribbon.MenuAction = MenuAction;
    })(Ribbon = ITLecXrm.Ribbon || (ITLecXrm.Ribbon = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var JS;
    (function (JS) {
        var JSFacade;
        (function (JSFacade) {
            function executeFunctionByName(functionName, context /*, args */) {
                var args = Array.prototype.slice.call(arguments, 2);
                var namespaces = functionName.split(".");
                var func = namespaces.pop();
                for (var i = 0; i < namespaces.length; i++) {
                    context = context[namespaces[i]];
                }
                return context[func].apply(context, args);
            }
            JSFacade.executeFunctionByName = executeFunctionByName;
            function closeWindow() {
                if (confirm("Do you want to close without saving any changes?")) {
                    close();
                }
            }
            JSFacade.closeWindow = closeWindow;
        })(JSFacade = JS.JSFacade || (JS.JSFacade = {}));
    })(JS = ITLecXrm.JS || (ITLecXrm.JS = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="itlecxrm.ribbon.menu.ts" />
/// <reference path="../helper/stringfacade.ts" />
/// <reference path="../js/itlecxrm.js.jsfacade.ts" />
var ITLecXrm;
/// <reference path="itlecxrm.ribbon.menu.ts" />
/// <reference path="../helper/stringfacade.ts" />
/// <reference path="../js/itlecxrm.js.jsfacade.ts" />
(function (ITLecXrm) {
    var Ribbon;
    (function (Ribbon) {
        function generateMenu(populateQueryCommand, menuArr, nodeName) {
            if (!nodeName) {
                nodeName = ITLecXrm.Helper.StringFacade.getRandomId();
            }
            var retValue = '';
            retValue = retValue + ("<Menu Id=\"menu" + nodeName + "\"> ");
            retValue = retValue + ("     <MenuSection Id=\"menuSection" + nodeName + "\"> ");
            retValue = retValue + ("         <Controls Id=\"controls" + nodeName + "\">  ");
            for (var _i = 0, menuArr_1 = menuArr; _i < menuArr_1.length; _i++) {
                var item = menuArr_1[_i];
                if (item.SubMenus && item.SubMenus.length > 0) {
                    retValue = retValue + ("<FlyoutAnchor Command=\"Mscrm.Enabled\" Id=\"" + item.Key + "\"  PopulateDynamically=\"true\" PopulateQueryCommand=\"" + populateQueryCommand + "\"  LabelText=\"" + item.Text + "\" >");
                    retValue = retValue + generateMenu(populateQueryCommand, item.SubMenus, item.Key);
                    retValue = retValue + "</FlyoutAnchor>";
                }
                else {
                    retValue = retValue + ("<Button Command=\"" + item.MenuAction.FunctionName + "\" Id=\"" + item.Key + "\" LabelText=\"" + item.Text + "\"  />");
                }
            }
            retValue = retValue + "         </Controls>  ";
            retValue = retValue + "     </MenuSection> ";
            retValue = retValue + "</Menu>";
            return retValue;
        }
        Ribbon.generateMenu = generateMenu;
        function testGenerateMenu(commandProperties) {
            //  debugger;
            var __menu = new Ribbon.Menu("FirstMenu", "FirstMenu", null, new Ribbon.MenuAction("itlec.DynamicButtons.Command"));
            var __menu2 = new Ribbon.Menu("FirstMenu2", "FirstMenu2", null, new Ribbon.MenuAction("itlec.DynamicButtons.Command"));
            var _menuArr = [
                __menu,
                __menu2
            ];
            var _menu = new Ribbon.Menu("FirstMenu", "FirstMenu", null, new Ribbon.MenuAction("itlec.DynamicButtons.Command"));
            var _menu2 = new Ribbon.Menu("FirstMenu2", "FirstMenu2", _menuArr, new Ribbon.MenuAction("itlec.DynamicButtons.Command"));
            var menuArr = [
                _menu,
                _menu2
            ];
            var menuStr = generateMenu("itlec.PopulateDynamicQuery.Command", menuArr, "main");
            alert(menuStr);
            commandProperties["PopulationXML"] = menuStr;
        }
        Ribbon.testGenerateMenu = testGenerateMenu;
        function onClick(commandProperties) {
            // Determine which button was clicked in the menu
            //      alert(commandProperties.SourceControlId + ' clicked');
            // window[commandProperties.SourceControlId+"OnClick"]();
            ITLecXrm.JS.JSFacade.executeFunctionByName(commandProperties.SourceControlId + "OnClick", window);
        }
        Ribbon.onClick = onClick;
    })(Ribbon = ITLecXrm.Ribbon || (ITLecXrm.Ribbon = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var JS;
    (function (JS) {
        var DDLFacade;
        (function (DDLFacade) {
            function addItem(ddlName, optionText, optionValue) {
                var optionControl = (document.getElementById(ddlName));
                var option = document.createElement("option");
                option.text = optionText;
                option.value = optionValue;
                optionControl.add(option);
            }
            DDLFacade.addItem = addItem;
            function clearDDL(ddlName) {
                //var _ddl = window.document.getElementById(ddlName);
                //_ddl.innerHTML = "";
                var optionControl = (document.getElementById(ddlName));
                var i;
                for (i = optionControl.options.length - 1; i >= 0; i--) {
                    optionControl.remove(i);
                }
            }
            DDLFacade.clearDDL = clearDDL;
            function setSelectedItem(ddlName, valueToSelect) {
                var element = document.getElementById(ddlName);
                element.value = valueToSelect;
            }
            DDLFacade.setSelectedItem = setSelectedItem;
        })(DDLFacade = JS.DDLFacade || (JS.DDLFacade = {}));
    })(JS = ITLecXrm.JS || (ITLecXrm.JS = {}));
})(ITLecXrm || (ITLecXrm = {}));
var ITLecXrm;
(function (ITLecXrm) {
    var GoogleMap;
    (function (GoogleMap) {
        var LatLng = /** @class */ (function () {
            function LatLng(_lat, _lng) {
                this.lat = _lat;
                this.lng = _lng;
            }
            return LatLng;
        }());
        GoogleMap.LatLng = LatLng;
    })(GoogleMap = ITLecXrm.GoogleMap || (ITLecXrm.GoogleMap = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../ribbon/itlecxrm.ribbon.ts" />
/// <reference path="../ribbon/itlecxrm.ribbon.menu.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="itlecxrm.googlemap.latlng.ts" />
var ITLecXrm;
/// <reference path="../ribbon/itlecxrm.ribbon.ts" />
/// <reference path="../ribbon/itlecxrm.ribbon.menu.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="itlecxrm.googlemap.latlng.ts" />
(function (ITLecXrm) {
    var GoogleMap;
    (function (GoogleMap) {
        function generateMenu(commandProperties) {
            //   debugger; 
            //Copy this function Code AS IS
            var menuStr = "";
            //   alert('hello');
            /*
                        var __menu = new ITLecXrm.Ribbon.Menu("ITLecXrm.GoogleMap.selectLocation", "Select Location4", null, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"));
                        var __menu2 = new ITLecXrm.Ribbon.Menu("selectLocation", "FirstMenu3", null, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"));
                            var _menuArr = [
                                __menu,
                                __menu2
                            ];
                        var _menu = new ITLecXrm.Ribbon.Menu("itlec.DynamicButtonGoogleMap.Command", "FirstMenu1", null, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"));
                        var _menu2 = new ITLecXrm.Ribbon.Menu("FirstMenu2", "FirstMenu2", _menuArr, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"));
                            var menuArr = [
                                _menu,
                                _menu2
                            ];*/
            /*
 var menuArr = [
     new ITLecXrm.Ribbon.Menu("ITLecXrm.GoogleMap.selectLocation", "Select Location", null, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"))
                ];*/
            var _menu; //    
            if (ITLecXrm.GoogleMap.getEntityGoogleConfigRecord()) {
                _menu = new ITLecXrm.Ribbon.Menu("ITLecXrm.GoogleMap.selectLocation", "Select Location", null, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"));
            }
            else {
                _menu = new ITLecXrm.Ribbon.Menu("ITLecXrm.GoogleMap.noConfiguration", "No Configration", null, new ITLecXrm.Ribbon.MenuAction("itlec.DynamicButtonGoogleMap.Command"));
            }
            var menuArr = [_menu];
            menuStr = ITLecXrm.Ribbon.generateMenu("itlec.PopulateDynamicQueryGMap.Command", menuArr, "main");
            commandProperties["PopulationXML"] = menuStr;
            //    ITLecXrm.GoogleMap.selectLocationOnClick
        }
        GoogleMap.generateMenu = generateMenu;
        function noConfigurationOnClick() {
            //  alert();
            ITLecXrm.getXrm().Utility.confirmDialog("There is no predefined configration for this entity, Would you like to create new one?", function () {
                var parameters = {};
                parameters["itlec_name"] = ITLecXrm.Entity.getEntityName();
                parameters["itlec_entityname"] = ITLecXrm.Entity.getEntityName();
                // Open the window.
                Xrm.Utility.openEntityForm("itlec_entitygoogleconfig", null, parameters);
            }, null);
        }
        GoogleMap.noConfigurationOnClick = noConfigurationOnClick;
        function selectLocationOnClick() {
            var _param = "lat=" + ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_latitudefieldname + "&lng=" + ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_longitudefieldname + "&url=" + ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_mapurlfieldname;
            var customParameters = encodeURIComponent(_param);
            ITLecXrm.getXrm().Utility.openWebResource("itlec_googlemapcontrol.html", customParameters);
        }
        GoogleMap.selectLocationOnClick = selectLocationOnClick;
        var _googleConfigRecord = null;
        function getGoogleConfigRecord() {
            if (!_googleConfigRecord) {
                var alertStr = "";
                if (_googleConfigRecord == null) {
                    var serverURL = ITLecXrm.URL.getClientURL();
                    var recordURL = serverURL + "/api/data/v8.0/itlec_googleconfigs";
                    var data = ITLecXrm.HttpRequest.getODataObjectResult(recordURL);
                    if (data && data.value[0]) {
                        _googleConfigRecord = data.value[0];
                    }
                }
                //Validation
                if (_googleConfigRecord == null) {
                    alertStr = alertStr + "There is not GoogleConfigRecord.\n";
                }
                else {
                    if (!_googleConfigRecord.itlec_googlemapapikey) {
                        alertStr = alertStr + "There is not Google Map API Key.\n";
                    }
                    if (!_googleConfigRecord.itlec_googlemaplanguage) {
                        alertStr = alertStr + "There is not Google Map Language.\n";
                    }
                }
                if (alertStr) {
                    alert(alertStr);
                }
                //End Validation
            }
            return _googleConfigRecord;
        }
        GoogleMap.getGoogleConfigRecord = getGoogleConfigRecord;
        var _entityGoogleConfigRecord = null;
        function getEntityGoogleConfigRecord() {
            if (!_entityGoogleConfigRecord) {
                var _entityName = ITLecXrm.Entity.getEntityName();
                var alertStr = "";
                if (_entityGoogleConfigRecord == null) {
                    var serverURL = ITLecXrm.URL.getClientURL();
                    var recordURL = serverURL + "/api/data/v8.0/itlec_entitygoogleconfigs?$filter=itlec_entityname eq '" + _entityName + "'";
                    var data = ITLecXrm.HttpRequest.getODataObjectResult(recordURL);
                    if (data && data.value[0]) {
                        _entityGoogleConfigRecord = data.value[0];
                    }
                }
                //Validation
                /*        if (_entityGoogleConfigRecord == null) {
                            alertStr = alertStr + "There is not Entity Google Config Record.\n";
                        }
                        else {
        
                            if (!_entityGoogleConfigRecord.itlec_longitudefieldname) {
                                alertStr = alertStr + "There is not longitude field name.\n";
                            }
                            if (!_entityGoogleConfigRecord.itlec_latitudefieldname) {
                                alertStr = alertStr + "There is not latitude field name.\n";
                            }
                        }
        
                        if (alertStr) {
                            alert(alertStr);
                        }*/
                //End Validation
            }
            return _entityGoogleConfigRecord;
        }
        GoogleMap.getEntityGoogleConfigRecord = getEntityGoogleConfigRecord;
        function updateRecordLocation(_lat, _lng, _url) {
            if (confirm("Do you want to save the changes and close the map?")) {
                var entityName = ITLecXrm.Entity.getEntityName();
                var entityGuid = ITLecXrm.Entity.getId();
                var latFieldName = ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_latitudefieldname;
                var lngFieldName = ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_longitudefieldname;
                var mapUrlFieldName = ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_mapurlfieldname;
                var recordObj = {};
                if (mapUrlFieldName) {
                    recordObj = (_a = {},
                        _a[latFieldName] = _lat.toString(),
                        _a[lngFieldName] = _lng.toString(),
                        _a[mapUrlFieldName] = _url,
                        _a);
                }
                else {
                    recordObj = (_b = {},
                        _b[latFieldName] = _lat.toString(),
                        _b[lngFieldName] = _lng.toString(),
                        _b);
                }
                ITLecXrm.HttpRequest.updateRecordAsync(entityName, entityGuid, recordObj, "window.close();");
            }
            var _a, _b;
        }
        GoogleMap.updateRecordLocation = updateRecordLocation;
        var CurrentRecordLanLng = null;
        function retrieveCurrentEntityLatLng() {
            var retVal;
            if (CurrentRecordLanLng) {
                retVal = CurrentRecordLanLng;
            }
            else {
                //  ITLecXrm.GoogleMap.retrieveCurrentEntityLatLng().lat
                var latFieldName = ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_latitudefieldname;
                var lngFieldName = ITLecXrm.GoogleMap.getEntityGoogleConfigRecord().itlec_longitudefieldname;
                if (latFieldName && lngFieldName) {
                    var entityName = ITLecXrm.Entity.getEntityName();
                    var entityGuid = ITLecXrm.Entity.getId();
                    var recordObj = ITLecXrm.HttpRequest.getRecordById(entityName, entityGuid, latFieldName + "," + lngFieldName);
                    retVal = new GoogleMap.LatLng(recordObj[latFieldName], recordObj[lngFieldName]);
                    CurrentRecordLanLng = retVal;
                }
            }
            return retVal;
        }
        GoogleMap.retrieveCurrentEntityLatLng = retrieveCurrentEntityLatLng;
    })(GoogleMap = ITLecXrm.GoogleMap || (ITLecXrm.GoogleMap = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../ribbon/itlecxrm.ribbon.ts" />
/// <reference path="../ribbon/itlecxrm.ribbon.menu.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="itlecxrm.googlemap.latlng.ts" />
var ITLecXrm;
/// <reference path="../ribbon/itlecxrm.ribbon.ts" />
/// <reference path="../ribbon/itlecxrm.ribbon.menu.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="itlecxrm.googlemap.latlng.ts" />
(function (ITLecXrm) {
    var GoogleMap;
    (function (GoogleMap) {
        var Dashboard;
        (function (Dashboard) {
            var _entityGoogleConfigRecords = null;
            function getEntityGoogleConfigRecords() {
                if (!_entityGoogleConfigRecords) {
                    if (_entityGoogleConfigRecords == null) {
                        var serverURL = ITLecXrm.URL.getClientURL();
                        var recordsURL = serverURL + "/api/data/v8.0/itlec_entitygoogleconfigs?$filter=itlec_mapdashboardstatus eq 100";
                        var data = ITLecXrm.HttpRequest.getODataObjectResult(recordsURL);
                        if (data && data.value[0]) {
                            _entityGoogleConfigRecords = data.value;
                        }
                    }
                }
                return _entityGoogleConfigRecords;
            }
            Dashboard.getEntityGoogleConfigRecords = getEntityGoogleConfigRecords;
            function fillEntityGoogleConfigRecordsDDL(ddlName) {
                ITLecXrm.JS.DDLFacade.clearDDL(ddlName);
                var select = document.getElementById(ddlName);
                for (var i = 0; i < ITLecXrm.GoogleMap.Dashboard.getEntityGoogleConfigRecords().length; i++) {
                    var opt = ITLecXrm.GoogleMap.Dashboard.getEntityGoogleConfigRecords()[i];
                    var el = document.createElement("option");
                    el.textContent = opt.itlec_name;
                    el.value = opt.itlec_entitygoogleconfigid;
                    select.appendChild(el);
                }
            }
            Dashboard.fillEntityGoogleConfigRecordsDDL = fillEntityGoogleConfigRecordsDDL;
        })(Dashboard = GoogleMap.Dashboard || (GoogleMap.Dashboard = {}));
    })(GoogleMap = ITLecXrm.GoogleMap || (ITLecXrm.GoogleMap = {}));
})(ITLecXrm || (ITLecXrm = {}));
/// <reference path="../ribbon/itlecxrm.ribbon.ts" />
/// <reference path="../ribbon/itlecxrm.ribbon.menu.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="itlecxrm.googlemap.latlng.ts" />
var ITLecXrm;
/// <reference path="../ribbon/itlecxrm.ribbon.ts" />
/// <reference path="../ribbon/itlecxrm.ribbon.menu.ts" />
/// <reference path="../httprequest.ts" />
/// <reference path="itlecxrm.googlemap.latlng.ts" />
(function (ITLecXrm) {
    var GoogleMap;
    (function (GoogleMap) {
        var Config;
        (function (Config) {
            function generateEntityGoogleConfig() {
                debugger;
                var itlec_googleconfigURL = ITLecXrm.URL.getOdataURL() + "/itlec_entitygoogleconfigs?$filter=itlec_entityname eq 'itlec_googleconfig'";
                var data_itlec_googleconfig = ITLecXrm.HttpRequest.getODataObjectResult(itlec_googleconfigURL);
                if (!data_itlec_googleconfig || data_itlec_googleconfig.value.length < 1) {
                    var googleMapConfigRecordConfig = {
                        "itlec_name": "Google Config",
                        "itlec_entityname": "itlec_googleconfig",
                        "itlec_latitudefieldname": "itlec_defaultlatitude",
                        "itlec_longitudefieldname": "itlec_defaultlongitude",
                        "itlec_displayfieldname": "itlec_name",
                        "itlec_mapdashboardstatus": "200",
                        "itlec_mapurlfieldname": "itlec_defaultgooglemapurl"
                    };
                    ITLecXrm.HttpRequest.createNewRecord("itlec_entitygoogleconfig", googleMapConfigRecordConfig);
                    //        alert("Entity Config Map Has Been Created");
                }
                var accountURL = ITLecXrm.URL.getOdataURL() + "/itlec_entitygoogleconfigs?$filter=itlec_entityname eq 'account'";
                var data_account = ITLecXrm.HttpRequest.getODataObjectResult(accountURL);
                if (!data_account || data_account.value.length < 1) {
                    var accountRecordConfig = {
                        "itlec_name": "Account Map",
                        "itlec_entityname": "account",
                        "itlec_latitudefieldname": "address1_latitude",
                        "itlec_longitudefieldname": "address1_longitude",
                        "itlec_displayfieldname": "name",
                        "itlec_mapdashboardstatus": "100"
                    };
                    ITLecXrm.HttpRequest.createNewRecord("itlec_entitygoogleconfig", accountRecordConfig);
                    //         alert("Account Map Has Been Created");
                }
                var leadURL = ITLecXrm.URL.getOdataURL() + "/itlec_entitygoogleconfigs?$filter=itlec_entityname eq 'lead'";
                var data_lead = ITLecXrm.HttpRequest.getODataObjectResult(leadURL);
                if (!data_lead || data_lead.value.length < 1) {
                    var leadRecordConfig = {
                        "itlec_name": "Lead Map",
                        "itlec_entityname": "lead",
                        "itlec_latitudefieldname": "address1_latitude",
                        "itlec_longitudefieldname": "address1_longitude",
                        "itlec_displayfieldname": "name",
                        "itlec_mapdashboardstatus": "100"
                    };
                    ITLecXrm.HttpRequest.createNewRecord("itlec_entitygoogleconfig", leadRecordConfig);
                    //       alert("Lead Map Has Been Created");
                }
                var contactURL = ITLecXrm.URL.getOdataURL() + "/itlec_entitygoogleconfigs?$filter=itlec_entityname eq 'contact'";
                var data_lead = ITLecXrm.HttpRequest.getODataObjectResult(contactURL);
                if (!data_lead || data_lead.value.length < 1) {
                    var contactRecordConfig = {
                        "itlec_name": "Contact Map",
                        "itlec_entityname": "contact",
                        "itlec_latitudefieldname": "address1_latitude",
                        "itlec_longitudefieldname": "address1_longitude",
                        "itlec_displayfieldname": "fullname",
                        "itlec_mapdashboardstatus": "100"
                    };
                    ITLecXrm.HttpRequest.createNewRecord("itlec_entitygoogleconfig", contactRecordConfig);
                    //        alert("Contact Map Has Been Created");
                }
                var competitorURL = ITLecXrm.URL.getOdataURL() + "/itlec_entitygoogleconfigs?$filter=itlec_entityname eq 'competitor'";
                var data_competitor = ITLecXrm.HttpRequest.getODataObjectResult(competitorURL);
                if (!data_competitor || data_competitor.value.length < 1) {
                    var competitorRecordConfig = {
                        "itlec_name": "Competitor Map",
                        "itlec_entityname": "competitor",
                        "itlec_latitudefieldname": "address1_latitude",
                        "itlec_longitudefieldname": "address1_longitude",
                        "itlec_displayfieldname": "fullname",
                        "itlec_mapdashboardstatus": "100"
                    };
                    ITLecXrm.HttpRequest.createNewRecord("itlec_entitygoogleconfig", competitorRecordConfig);
                    //    alert("Competitor Map Has Been Created");
                }
                document.getElementById('iframeEntityGoogleConfigView').src = document.getElementById('iframeEntityGoogleConfigView').src;
            }
            Config.generateEntityGoogleConfig = generateEntityGoogleConfig;
            function generateGoogleConfig() {
                var itlec_googleconfigGuid = "";
                var itlec_googleconfigURL = ITLecXrm.URL.getOdataURL() + "/itlec_googleconfigs";
                var data_itlec_googleconfig = ITLecXrm.HttpRequest.getODataObjectResult(itlec_googleconfigURL);
                if (!data_itlec_googleconfig || data_itlec_googleconfig.value.length < 1) {
                    var googleMapConfigRecordConfig = {
                        "itlec_name": "Google Config",
                        "itlec_googlemapapikey": "AIzaSyAtJfAN7Yr5Xm6E6q9qnXKQp5kpwMU53_0",
                        "itlec_googlemaplanguage": "en",
                        "itlec_googlemapdashboardlanguage": "en",
                        "itlec_defaultzoom": 5,
                        "itlec_dashboarddefaultzoom": 5,
                        "itlec_defaultlatitude": "26.82055",
                        "itlec_defaultlongitude": "30.802498",
                        "itlec_googlemaptype": "roadmap",
                        "itlec_dashboardgooglemaptype": "roadmap"
                    };
                    itlec_googleconfigGuid = ITLecXrm.HttpRequest.createNewRecord("itlec_googleconfig", googleMapConfigRecordConfig);
                    //  alert("Config Map Has Been Created");
                }
                else {
                    itlec_googleconfigGuid = data_itlec_googleconfig.value[0].itlec_googleconfigid;
                }
                window.open(ITLecXrm.URL.getClientURL() + "/main.aspx?etc=10184&extraqs=&id=" + itlec_googleconfigGuid + "&newWindow=true&pagetype=entityrecord");
            }
            Config.generateGoogleConfig = generateGoogleConfig;
        })(Config = GoogleMap.Config || (GoogleMap.Config = {}));
    })(GoogleMap = ITLecXrm.GoogleMap || (ITLecXrm.GoogleMap = {}));
})(ITLecXrm || (ITLecXrm = {}));
//# sourceMappingURL=ITLecXrmLib.js.map
