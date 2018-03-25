/// <reference path="tsdefination/index.d.ts" />
/// <reference path="tsdefination/lib.d.ts" />
declare namespace ITLecXrm {
    function getXrm(): Xrm.XrmStatic;
    function getJSON(): any;
    function getMscrm(): void;
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
    namespace URL {
        function getClientURL(): string;
        function getOrganizationDataSvc(): string;
        function getOdataURL(): string;
        function getAllEntitiesLogicalNameAPIUrl(): string;
        function getViewAPIUrl(viewName: any): string;
        function getAllSdkMessagesUrl(): string;
    }
}
declare namespace ITLecXrm {
    namespace HttpRequest {
        function updateRecordAsync(entityName: string, recordGuid: string, recordObj: any): void;
        function createNewRecord(entityName: string, recordObj: any): string;
        function getODataResponseText(url: string): any;
        function getODataObjectResult(url: string): any;
        function PostAsync(_Url: string, functionName: string): void;
        function getAsync(_Url: string, functionName: string): void;
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
        function getEntity(): Xrm.Entity;
        function getId(): string;
        function getEntityName(): string;
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
    namespace Helper {
        class KeyValueClass {
            Key: string;
            Value: string;
        }
    }
}
declare namespace ITLecXrm {
    namespace Metadata {
        function getAllEntitiesLogicalNameAsync(GetAllEntitiesLogicalName_CallBack: any): void;
        function getAllEntitiesLogicalName(): any;
        function getAllSdkMessageslName(): any;
    }
}
declare namespace ITLecXrm {
    namespace Form {
        namespace Control {
            namespace TextBox {
                function setAutoComplete(fieldName: any, arr: ITLecXrm.Helper.KeyValueClass[]): void;
                function setAutoCompleteWithEntityNames(fieldName: string): void;
                function SetAutoCompleteWithAllSdkMSGNames(fieldName: string): void;
                function removeAutoComplete(fieldName: string): void;
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
