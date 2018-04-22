/// <reference path="tsdefination/index.d.ts" />
/// <reference path="tsdefination/lib.d.ts" />
declare namespace ITLecXrm {
    function getXrm(): any;
    function getJSON(): any;
}
declare namespace ITLecXrm {
    namespace JS {
        namespace DateUtil {
            function isValidDate(str: any): boolean;
        }
    }
}
declare namespace ITLecXrm {
    namespace JS {
        namespace NumberUtil {
        }
    }
}
declare namespace ITLecXrm {
    namespace Helper {
        namespace StringFacade {
            function getRandomId(): string;
            function getPlural(word: any): string;
            function endsWith(word: any, subString: any): boolean;
        }
    }
}
declare namespace ITLecXrm {
    namespace URL {
        function getClientURL(): string;
        function getOdataURL(): string;
        function getAllEntitiesLogicalNameAPIUrl(): string;
        function getViewAPIUrl(viewName: any): string;
        function getAllSdkMessagesUrl(): string;
    }
}
declare namespace ITLecXrm {
    namespace WebResource {
        function getParam(paramName: string): string;
        function _parseDataValue(datavalue: string, paramName: string): string;
    }
}
declare namespace ITLecXrm {
    namespace Helper {
        class KeyValueClass {
            Key: string;
            Value: string;
        }
    }
}
declare namespace ITLecXrm {
    namespace Form {
        namespace Control {
            function setLabel(controlName: string, label: string): void;
            function getValue(controlName: string): any;
        }
    }
}
declare namespace ITLecXrm {
    namespace HttpRequest {
        function updateRecordAsync(entityName: string, recordGuid: string, recordObj: any, functionName?: string): void;
        function createNewRecord(entityName: string, recordObj: any): string;
        function getODataResponseText(url: string): any;
        function getODataObjectResult(url: string): any;
        function getRecordById(entityName: string, entityGuid: string, selectString?: string): any;
        function PostAsync(_Url: string, functionName: string): void;
        function getAsync(_Url: string, functionName: string): void;
        function _CallBack(retrieveReq: any, functionNameStr: string): void;
    }
}
declare namespace ITLecXrm {
    namespace Entity {
        namespace Attribute {
            function getAttribute(attributeName: string): any;
            function setAttribute(attributeName: string, attributeValue: string): void;
        }
    }
}
declare namespace ITLecXrm {
    namespace Security {
        function getRoleName(userRoleId: string): string;
    }
}
declare namespace ITLecXrm {
    namespace Converter {
        function convertFromLogicalNameToObjectTypeCode(logicalName: string): string;
    }
}
declare namespace ITLecXrm {
    namespace Entity {
        function getEntity(): any;
        function getId(): any;
        function getEntityName(): any;
    }
}
declare namespace ITLecXrm {
    namespace Form {
        namespace Control {
            namespace OptionSet {
                function getGlobalOptionSet(globalOptionSetName: string): any;
            }
        }
    }
}
declare namespace ITLecXrm {
    namespace Metadata {
        function getAllEntitiesLogicalNameAsync(GetAllEntitiesLogicalName_CallBack: any): void;
        function getAllEntitiesLogicalName(): any;
        function getAllSdkMessageslName(): any;
        function getEntitySetName(entityName: string): string;
        function getEntityMetadataId(entityName: string): string;
        function getEntityAttributes(entityName: string): any;
    }
}
declare namespace ITLecXrm {
    namespace Form {
        namespace Control {
            namespace TextBox {
                function _SetAutoComplete_keyPressFcn(ext: any, fieldName: any, arr: any): void;
                function setAutoComplete(fieldName: any, arr: ITLecXrm.Helper.KeyValueClass[]): void;
                function setAutoCompleteWithEntityNames(fieldName: string): void;
                function SetAutoCompleteWithAllSdkMSGNames(fieldName: string): void;
                function removeAutoComplete(fieldName: string): void;
                function setAutoCompleteWithEntityAttributes(fieldName: string, entityName: string): void;
            }
        }
    }
}
declare namespace ITLecXrm {
    namespace Form {
        namespace Control {
            namespace Lookup {
                function getCurrentEntityLookupText(attributename: string): string;
                function getCurrentEntityLookupGuid(attributename: string): string;
            }
        }
    }
}
declare namespace ITLecXrm {
    namespace Xml {
        namespace XmlHelper {
            function convertStringToXml(xmlStr: string): any;
        }
    }
}
declare namespace ITLecXrm {
    namespace Xml {
        namespace FetchXml {
            function executeFetchXml(fetchXmlStr: string): void;
        }
    }
}
declare namespace ITLecXrm {
    namespace Ribbon {
        class Menu {
            constructor(key: string, text: string, subMenu: Menu[], menuAction: MenuAction);
            Key: string;
            Text: string;
            SubMenus: Menu[];
            MenuAction: MenuAction;
        }
        class MenuAction {
            constructor(functionName: string, _arg?: any);
            FunctionName: string;
            arg: any;
        }
    }
}
declare namespace ITLecXrm {
    namespace JS {
        namespace JSFacade {
            function executeFunctionByName(functionName: any, context: any): any;
            function closeWindow(): void;
        }
    }
}
declare namespace ITLecXrm {
    namespace Ribbon {
        function generateMenu(populateQueryCommand: string, menuArr: Menu[], nodeName?: string): string;
        function testGenerateMenu(commandProperties: any): void;
        function onClick(commandProperties: any): void;
    }
}
declare namespace ITLecXrm {
    namespace JS {
        namespace DDLFacade {
            function addItem(ddlName: any, optionText: any, optionValue: any): void;
            function clearDDL(ddlName: any): void;
            function setSelectedItem(ddlName: any, valueToSelect: any): void;
        }
    }
}
declare namespace ITLecXrm {
    namespace GoogleMap {
        class LatLng {
            constructor(_lat: string, _lng: string);
            lat: string;
            lng: string;
        }
    }
}
declare namespace ITLecXrm {
    namespace GoogleMap {
        function generateMenu(commandProperties: any): void;
        function noConfigurationOnClick(): void;
        function selectLocationOnClick(): void;
        function getGoogleConfigRecord(): any;
        function getEntityGoogleConfigRecord(): any;
        function updateRecordLocation(_lat: string, _lng: string, _url: any): void;
        function retrieveCurrentEntityLatLng(): LatLng;
    }
}
declare namespace ITLecXrm {
    namespace GoogleMap {
        namespace Dashboard {
            function getEntityGoogleConfigRecords(): any;
            function fillEntityGoogleConfigRecordsDDL(ddlName: any): void;
        }
    }
}
declare namespace ITLecXrm {
    namespace GoogleMap {
        namespace Config {
            function generateEntityGoogleConfig(): void;
            function generateGoogleConfig(): void;
        }
    }
}
