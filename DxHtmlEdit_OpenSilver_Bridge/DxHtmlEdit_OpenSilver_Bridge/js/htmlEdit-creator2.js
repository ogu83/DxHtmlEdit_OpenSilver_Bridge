(function () {

    window.jsHtmlEditClient = {
        createHtmlEdit: createHtmlEdit,
        setValue: setValue,
        getValue: getValue,
        formatText: formatText,
        getLength: getLength,
        getReadOnly: getReadOnly,
        setReadOnly: setReadOnly,
        dispose: dispose,
        redraw: redraw,
        setHeight: setHeight
    };

    var _created = false;
    var _creating = false;

    DevExpress.localization.loadMessages({
        "sv": {
            "Yes": "Ja",
            "No": "Nej",
            "Cancel": "Avbryt",
            "Close": "Stäng",
            "Clear": "Rensa",
            "Done": "Klar",
            "Loading": "Laddar...",
            "Select": "Välj...",
            "Search": "Sök",
            "Back": "Tillbaka",
            "OK": "OK",

            "dxCollectionWidget-noDataText": "Inget data att visa",

            "dxDropDownEditor-selectLabel": "Välj",

            "validation-required": "Krävs",
            "validation-required-formatted": "{0} krävs",
            "validation-numeric": "Värdet måste vara ett nummer",
            "validation-numeric-formatted": "{0} måste vara ett nummer",
            "validation-range": "Värdet utanför tillåtet intervall",
            "validation-range-formatted": "{0} utanför tillåtet intervall",
            "validation-stringLength": "Längden på värdet är inte korrekt",
            "validation-stringLength-formatted": "Längden på  {0} är inte korrekt",
            "validation-custom": "Ogiltigt värde",
            "validation-custom-formatted": "{0} är ogiltigt",
            "validation-async": "Ogiltigt värde",
            "validation-async-formatted": "{0} är ogiltigt",
            "validation-compare": "Värdena matchar inte",
            "validation-compare-formatted": "{0} matchar inte",
            "validation-pattern": "Värdet matchar inte mönster",
            "validation-pattern-formatted": "{0} matchar inte mönster",
            "validation-email": "E-post är ogiltigt",
            "validation-email-formatted": "{0} är ogiltigt",
            "validation-mask": "Värdet är ogiltigt",

            "dxLookup-searchPlaceholder": "Minsta antal tecken: {0}",

            "dxList-pullingDownText": "Dra neråt för att uppdatera...",
            "dxList-pulledDownText": "Släpp för att uppdatera...",
            "dxList-refreshingText": "Uppdaterar...",
            "dxList-pageLoadingText": "Laddar...",
            "dxList-nextButtonText": "Mer",
            "dxList-selectAll": "Välj alla",
            "dxListEditDecorator-delete": "Radera",
            "dxListEditDecorator-more": "Mer",

            "dxScrollView-pullingDownText": "Dra neråt för att uppdatera...",
            "dxScrollView-pulledDownText": "Släpp för att uppdatera...",
            "dxScrollView-refreshingText": "uppdaterar...",
            "dxScrollView-reachBottomText": "Laddar...",

            "dxDateBox-simulatedDataPickerTitleTime": "Välj tid",
            "dxDateBox-simulatedDataPickerTitleDate": "Välj datum",
            "dxDateBox-simulatedDataPickerTitleDateTime": "Välj datum och tid",
            "dxDateBox-validation-datetime": "Värdet måste vara ett datum eller en tid",

            "dxFileUploader-selectFile": "Välj fil",
            "dxFileUploader-dropFile": "eller släpp filen här",
            "dxFileUploader-bytes": "byte",
            "dxFileUploader-kb": "kb",
            "dxFileUploader-Mb": "Mb",
            "dxFileUploader-Gb": "Gb",
            "dxFileUploader-upload": "Ladda upp",
            "dxFileUploader-uploaded": "Uppladdad",
            "dxFileUploader-readyToUpload": "Klar att ladda upp",
            "dxFileUploader-uploadAbortedMessage": "Upload cancelled",
            "dxFileUploader-uploadFailedMessage": "Uppladdning misslyckades",
            "dxFileUploader-invalidFileExtension": "File type is not allowed",
            "dxFileUploader-invalidMaxFileSize": "File is too large",
            "dxFileUploader-invalidMinFileSize": "File is too small",

            "dxRangeSlider-ariaFrom": "Från",
            "dxRangeSlider-ariaTill": "Till",
            "dxSwitch-switchedOnText": "PÅ",
            "dxSwitch-switchedOffText": "AV",

            "dxForm-optionalMark": "valfri",
            "dxForm-requiredMessage": "{0} är nödvändigt",

            "dxNumberBox-invalidValueMessage": "Värdet måste vara ett nummer",
            "dxNumberBox-noDataText": "Inget data",

            "dxDataGrid-columnChooserTitle": "Kolumnväljare",
            "dxDataGrid-columnChooserEmptyText": "Dra en kolumn hit för att dölja den",
            "dxDataGrid-groupContinuesMessage": "Fortsätter på nästa sida",
            "dxDataGrid-groupContinuedMessage": "Fortsättning från föregående sida",
            "dxDataGrid-groupHeaderText": "Gruppera enligt denna kolumn",
            "dxDataGrid-ungroupHeaderText": "Avgruppera",
            "dxDataGrid-ungroupAllText": "Avgruppera allt",
            "dxDataGrid-editingEditRow": "Redigera",
            "dxDataGrid-editingSaveRowChanges": "Spara",
            "dxDataGrid-editingCancelRowChanges": "Avbryt",
            "dxDataGrid-editingDeleteRow": "Radera",
            "dxDataGrid-editingUndeleteRow": "Ångra radering",
            "dxDataGrid-editingConfirmDeleteMessage": "Är du säker på att du vill radera denna post?",
            "dxDataGrid-validationCancelChanges": "Avbryt ändringarna",
            "dxDataGrid-groupPanelEmptyText": "Dra en kolumnrubrik hit för att gruppera enligt den kolumnen",
            "dxDataGrid-noDataText": "Inget data",
            "dxDataGrid-searchPanelPlaceholder": "Sök...",
            "dxDataGrid-filterRowShowAllText": "(Allt)",
            "dxDataGrid-filterRowResetOperationText": "Återställ",
            "dxDataGrid-filterRowOperationEquals": "Är lika med",
            "dxDataGrid-filterRowOperationNotEquals": "Är olika",
            "dxDataGrid-filterRowOperationLess": "Mindre än",
            "dxDataGrid-filterRowOperationLessOrEquals": "Mindre än eller lika med",
            "dxDataGrid-filterRowOperationGreater": "Större än",
            "dxDataGrid-filterRowOperationGreaterOrEquals": "Större än eller lika med",
            "dxDataGrid-filterRowOperationStartsWith": "Börjar med",
            "dxDataGrid-filterRowOperationContains": "Innehåller",
            "dxDataGrid-filterRowOperationNotContains": "Innehåller inte",
            "dxDataGrid-filterRowOperationEndsWith": "Slutar med",
            "dxDataGrid-filterRowOperationBetween": "Mellan",
            "dxDataGrid-filterRowOperationBetweenStartText": "Start",
            "dxDataGrid-filterRowOperationBetweenEndText": "Slut",
            "dxDataGrid-applyFilterText": "Använd filter",
            "dxDataGrid-trueText": "sant",
            "dxDataGrid-falseText": "falskt",
            "dxDataGrid-sortingAscendingText": "Sortera stigande",
            "dxDataGrid-sortingDescendingText": "Sortera fallande",
            "dxDataGrid-sortingClearText": "Rensa sortering",
            "dxDataGrid-editingSaveAllChanges": "Spara ändringar",
            "dxDataGrid-editingCancelAllChanges": "Ångra ändringar",
            "dxDataGrid-editingAddRow": "Lägg till rad",
            "dxDataGrid-summaryMin": "Min: {0}",
            "dxDataGrid-summaryMinOtherColumn": "Minimi av {1} är {0}",
            "dxDataGrid-summaryMax": "Max: {0}",
            "dxDataGrid-summaryMaxOtherColumn": "Maximi av {1} är {0}",
            "dxDataGrid-summaryAvg": "Medel: {0}",
            "dxDataGrid-summaryAvgOtherColumn": "Medeltal av {1} är {0}",
            "dxDataGrid-summarySum": "Sum: {0}",
            "dxDataGrid-summarySumOtherColumn": "Summan av {1} är {0}",
            "dxDataGrid-summaryCount": "Antal: {0}",
            "dxDataGrid-columnFixingFix": "Fixera",
            "dxDataGrid-columnFixingUnfix": "Avfixera",
            "dxDataGrid-columnFixingLeftPosition": "Till vänster",
            "dxDataGrid-columnFixingRightPosition": "Till höger",
            "dxDataGrid-exportTo": "Exportera",
            "dxDataGrid-exportToExcel": "Exportera till Excel fil",
            "dxDataGrid-exporting": "Exportera...",
            "dxDataGrid-excelFormat": "Excel fil",
            "dxDataGrid-selectedRows": "Valda rader",
            "dxDataGrid-exportSelectedRows": "Exportera valda rader",
            "dxDataGrid-exportAll": "Exportera allt",
            "dxDataGrid-headerFilterLabel": "Filter options",
            "dxDataGrid-headerFilterIndicatorLabel": "Show filter options for column '{0}'",
            "dxDataGrid-headerFilterEmptyValue": "(Tomma)",
            "dxDataGrid-headerFilterOK": "OK",
            "dxDataGrid-headerFilterCancel": "Avbryt",
            "dxDataGrid-ariaAdaptiveCollapse": "Hide additional data",
            "dxDataGrid-ariaAdaptiveExpand": "Display additional data",
            "dxDataGrid-ariaColumn": "Kolumn",
            "dxDataGrid-ariaValue": "Värde",
            "dxDataGrid-ariaFilterCell": "Filtrera cell",
            "dxDataGrid-ariaCollapse": "Kollapsa",
            "dxDataGrid-ariaExpand": "Expandera",
            "dxDataGrid-ariaDataGrid": "Datarutnät",
            "dxDataGrid-ariaSearchInGrid": "Sök i datarutnätet",
            "dxDataGrid-ariaSelectAll": "Välj allt",
            "dxDataGrid-ariaSelectRow": "Välj rad",
            "dxDataGrid-ariaToolbar": "Data grid toolbar",
            "dxDataGrid-filterBuilderPopupTitle": "Filterverktyg",
            "dxDataGrid-filterPanelCreateFilter": "Skapa filter",
            "dxDataGrid-filterPanelClearFilter": "Rensa",
            "dxDataGrid-filterPanelFilterEnabledHint": "Aktivera filter",

            "dxTreeList-ariaTreeList": "Trädlista",
            "dxTreeList-ariaSearchInGrid": "Search in the tree list",
            "dxTreeList-ariaToolbar": "Tree list toolbar",
            "dxTreeList-editingAddRowToNode": "Lägg till",

            "dxPager-infoText": "Sida {0} av {1} ({2} uppgifter)",
            "dxPager-pagesCountText": "av",
            "dxPager-pageSizesAllText": "Allt",
            "dxPager-page": "Page {0}",
            "dxPager-prevPage": "Previous Page",
            "dxPager-nextPage": "Next Page",
            "dxPager-ariaLabel": "Page Navigation",

            "dxPivotGrid-grandTotal": "Totalsumma",
            "dxPivotGrid-total": "{0} Summa",
            "dxPivotGrid-fieldChooserTitle": "Fältväljare",
            "dxPivotGrid-showFieldChooser": "Visa fältväljare",
            "dxPivotGrid-expandAll": "Expandera alla",
            "dxPivotGrid-collapseAll": "Kollapsa alla",
            "dxPivotGrid-sortColumnBySummary": "Sortera \"{0}\" enligt denna kolumn",
            "dxPivotGrid-sortRowBySummary": "Sortera \"{0}\" enligt denna rad",
            "dxPivotGrid-removeAllSorting": "Avlägsna all sortering",
            "dxPivotGrid-dataNotAvailable": "Saknas",
            "dxPivotGrid-rowFields": "Radfält",
            "dxPivotGrid-columnFields": "Kolumnfält",
            "dxPivotGrid-dataFields": "Datafält",
            "dxPivotGrid-filterFields": "Filterfält",
            "dxPivotGrid-allFields": "Alla fält",
            "dxPivotGrid-columnFieldArea": "Släpp kolumnfält här",
            "dxPivotGrid-dataFieldArea": "Släpp datafält här",
            "dxPivotGrid-rowFieldArea": "Släpp radfält här",
            "dxPivotGrid-filterFieldArea": "Släpp filterfält här",

            "dxScheduler-editorLabelTitle": "Ämne",
            "dxScheduler-editorLabelStartDate": "Startdatum",
            "dxScheduler-editorLabelEndDate": "Slutdatum",
            "dxScheduler-editorLabelDescription": "Beskrivning",
            "dxScheduler-editorLabelRecurrence": "Upprepa",

            "dxScheduler-openAppointment": "Öppna avtalad tid",

            "dxScheduler-recurrenceNever": "Aldrig",
            "dxScheduler-recurrenceMinutely": "Minutely",
            "dxScheduler-recurrenceHourly": "Hourly",
            "dxScheduler-recurrenceDaily": "Varje dag",
            "dxScheduler-recurrenceWeekly": "Varje vecka",
            "dxScheduler-recurrenceMonthly": "Varje månad",
            "dxScheduler-recurrenceYearly": "Varje år",

            "dxScheduler-recurrenceRepeatEvery": "Varje",
            "dxScheduler-recurrenceRepeatOn": "Repeat On",
            "dxScheduler-recurrenceEnd": "Upprepning slutar",
            "dxScheduler-recurrenceAfter": "Efter",
            "dxScheduler-recurrenceOn": "På",

            "dxScheduler-recurrenceRepeatMinutely": "minute(s)",
            "dxScheduler-recurrenceRepeatHourly": "hour(s)",
            "dxScheduler-recurrenceRepeatDaily": "dagar",
            "dxScheduler-recurrenceRepeatWeekly": "veckor",
            "dxScheduler-recurrenceRepeatMonthly": "månader",
            "dxScheduler-recurrenceRepeatYearly": "år",

            "dxScheduler-switcherDay": "Dag",
            "dxScheduler-switcherWeek": "Vecka",
            "dxScheduler-switcherWorkWeek": "Arbetsvecka",
            "dxScheduler-switcherMonth": "Månad",

            "dxScheduler-switcherAgenda": "Agenda",

            "dxScheduler-switcherTimelineDay": "Tidslinje dag",
            "dxScheduler-switcherTimelineWeek": "Tidslinje vecka",
            "dxScheduler-switcherTimelineWorkWeek": "Tidslinje arbetsvecka",
            "dxScheduler-switcherTimelineMonth": "Tidslinje månad",

            "dxScheduler-recurrenceRepeatOnDate": "på datumet",
            "dxScheduler-recurrenceRepeatCount": "upprepning(ar)",
            "dxScheduler-allDay": "Hela dagen",

            "dxScheduler-confirmRecurrenceEditMessage": "Vill du redigera bara denna avtalade tid eller hela serien?",
            "dxScheduler-confirmRecurrenceDeleteMessage": "Vill du radera bara denna avtalade tid eller hela serien?",

            "dxScheduler-confirmRecurrenceEditSeries": "Redigera serien",
            "dxScheduler-confirmRecurrenceDeleteSeries": "Radera serien",
            "dxScheduler-confirmRecurrenceEditOccurrence": "Redigera avtalad tid",
            "dxScheduler-confirmRecurrenceDeleteOccurrence": "Radera avtalad tid",

            "dxScheduler-noTimezoneTitle": "Ingen tidszon",
            "dxScheduler-moreAppointments": "{0} mer",

            "dxCalendar-todayButtonText": "I dag",
            "dxCalendar-ariaWidgetName": "Kalender",

            "dxColorView-ariaRed": "Röd",
            "dxColorView-ariaGreen": "Grön",
            "dxColorView-ariaBlue": "Blå",
            "dxColorView-ariaAlpha": "Transparens",
            "dxColorView-ariaHex": "Färgkod",

            "dxTagBox-selected": "{0} valda",
            "dxTagBox-allSelected": "Alla valda ({0})",
            "dxTagBox-moreSelected": "{0} mer",

            "vizExport-printingButtonText": "Skriv ut",
            "vizExport-titleMenuText": "Export/Utskrift",
            "vizExport-exportButtonText": "{0} fil",

            "dxFilterBuilder-and": "Och",
            "dxFilterBuilder-or": "Eller",
            "dxFilterBuilder-notAnd": "Inte och",
            "dxFilterBuilder-notOr": "Inte eller",
            "dxFilterBuilder-addCondition": "Lägg till villkor",
            "dxFilterBuilder-addGroup": "Lägg till grupp",
            "dxFilterBuilder-enterValueText": "<ange värde>",
            "dxFilterBuilder-filterOperationEquals": "Är lika med",
            "dxFilterBuilder-filterOperationNotEquals": "Är olika",
            "dxFilterBuilder-filterOperationLess": "Mindre än",
            "dxFilterBuilder-filterOperationLessOrEquals": "Mindre än eller lika med",
            "dxFilterBuilder-filterOperationGreater": "Större än",
            "dxFilterBuilder-filterOperationGreaterOrEquals": "Större än eller lika med",
            "dxFilterBuilder-filterOperationStartsWith": "Börjar med",
            "dxFilterBuilder-filterOperationContains": "Innehåller",
            "dxFilterBuilder-filterOperationNotContains": "Innehåller inte",
            "dxFilterBuilder-filterOperationEndsWith": "Slutar med",
            "dxFilterBuilder-filterOperationIsBlank": "Är tom",
            "dxFilterBuilder-filterOperationIsNotBlank": "Är inte tom",
            "dxFilterBuilder-filterOperationBetween": "Mellan",
            "dxFilterBuilder-filterOperationAnyOf": "Någon av",
            "dxFilterBuilder-filterOperationNoneOf": "Ingen av",

            "dxHtmlEditor-dialogColorCaption": "Ändra teckenfärg",
            "dxHtmlEditor-dialogBackgroundCaption": "Ändra bakgrundsfärg",
            "dxHtmlEditor-dialogLinkCaption": "Lägg till länk",
            "dxHtmlEditor-dialogLinkUrlField": "URL",
            "dxHtmlEditor-dialogLinkTextField": "Text",
            "dxHtmlEditor-dialogLinkTargetField": "Öppna länk i nytt fönster",
            "dxHtmlEditor-dialogImageCaption": "Lägg till bild",
            "dxHtmlEditor-dialogImageUrlField": "Länk",
            "dxHtmlEditor-dialogImageAltField": "Alternativ text",
            "dxHtmlEditor-dialogImageWidthField": "Bredd (px)",
            "dxHtmlEditor-dialogImageHeightField": "Höljd (px)",
            "dxHtmlEditor-dialogInsertTableRowsField": "Rader",
            "dxHtmlEditor-dialogInsertTableColumnsField": "Kolumner",
            "dxHtmlEditor-dialogInsertTableCaption": "Lägg till tabell",
            "dxHtmlEditor-dialogUpdateImageCaption": "Uppdatera bild",
            "dxHtmlEditor-dialogImageUpdateButton": "Uppdatera",
            "dxHtmlEditor-dialogImageAddButton": "Lägg till",
            "dxHtmlEditor-dialogImageSpecifyUrl": "Från webben",
            "dxHtmlEditor-dialogImageSelectFile": "Från denna enhet",
            "dxHtmlEditor-dialogImageKeepAspectRatio": "Behåll bildförhållande",
            "dxHtmlEditor-dialogImageEncodeToBase64": "Encode till Base64",
            "dxHtmlEditor-heading": "Rubrik",
            "dxHtmlEditor-normalText": "Normal text",
            "dxHtmlEditor-background": "Bakgrundsfärg",
            "dxHtmlEditor-bold": "Fet",
            "dxHtmlEditor-color": "Teckenfärg",
            "dxHtmlEditor-font": "Typsnitt",
            "dxHtmlEditor-italic": "Kursivt",
            "dxHtmlEditor-link": "Lägg till länk",
            "dxHtmlEditor-image": "Lägg till bild",
            "dxHtmlEditor-size": "Storlek",
            "dxHtmlEditor-strike": "Genomstruken",
            "dxHtmlEditor-subscript": "Nerhöjd",
            "dxHtmlEditor-superscript": "Upphöjd",
            "dxHtmlEditor-underline": "Understruken",
            "dxHtmlEditor-blockquote": "Citattecken",
            "dxHtmlEditor-header": "Rubrik",
            "dxHtmlEditor-increaseIndent": "Ökat indrag",
            "dxHtmlEditor-decreaseIndent": "Minska indrag",
            "dxHtmlEditor-orderedList": "Nummeradlista",
            "dxHtmlEditor-bulletList": "Punktlista",
            "dxHtmlEditor-alignLeft": "Vänsterjustera text",
            "dxHtmlEditor-alignCenter": "Centera text",
            "dxHtmlEditor-alignRight": "Högerjustera text",
            "dxHtmlEditor-alignJustify": "Justera",
            "dxHtmlEditor-codeBlock": "Code Block",
            "dxHtmlEditor-variable": "Add Variable",
            "dxHtmlEditor-undo": "Ångra",
            "dxHtmlEditor-redo": "Gör om",
            "dxHtmlEditor-clear": "Rensa formatering",
            "dxHtmlEditor-insertTable": "Lägg till tabell",
            "dxHtmlEditor-insertHeaderRow": "Lägg till rad",
            "dxHtmlEditor-insertRowAbove": "Lägg till rad ovan",
            "dxHtmlEditor-insertRowBelow": "LÄgg till rad under",
            "dxHtmlEditor-insertColumnLeft": "Lägg till kolumn till vänster",
            "dxHtmlEditor-insertColumnRight": "Lägg till kolumn till höger",
            "dxHtmlEditor-deleteColumn": "Ta bort kolumn",
            "dxHtmlEditor-deleteRow": "Ta bort rad",
            "dxHtmlEditor-deleteTable": "Ta bort tabell",
            "dxHtmlEditor-cellProperties": "Cell egenskaper",
            "dxHtmlEditor-tableProperties": "Tabell egenskaper",
            "dxHtmlEditor-insert": "Lägg till",
            "dxHtmlEditor-delete": "Ta bort",
            "dxHtmlEditor-border": "Ram",
            "dxHtmlEditor-style": "Stil",
            "dxHtmlEditor-width": "Bredd",
            "dxHtmlEditor-height": "Höjd",
            "dxHtmlEditor-borderColor": "Färg",
            "dxHtmlEditor-tableBackground": "Bakgrund",
            "dxHtmlEditor-dimensions": "Mått",
            "dxHtmlEditor-alignment": "Justering",
            "dxHtmlEditor-horizontal": "Horisontell",
            "dxHtmlEditor-vertical": "Vertikal",
            "dxHtmlEditor-paddingVertical": "Vertikal Padding",
            "dxHtmlEditor-paddingHorizontal": "Horisontell Padding",
            "dxHtmlEditor-pixels": "Pixels",
            "dxHtmlEditor-list": "Lista",
            "dxHtmlEditor-ordered": "ordnad",
            "dxHtmlEditor-bullet": "prick",
            "dxHtmlEditor-align": "Justera",
            "dxHtmlEditor-center": "Center",
            "dxHtmlEditor-left": "Vänster",
            "dxHtmlEditor-right": "Höger",
            "dxHtmlEditor-indent": "Indrag",
            "dxHtmlEditor-justify": "Justering",

            "dxFileManager-newDirectoryName": "Untitled directory",
            "dxFileManager-rootDirectoryName": "Files",
            "dxFileManager-errorNoAccess": "Access Denied. Operation could not be completed.",
            "dxFileManager-errorDirectoryExistsFormat": "Directory '{0}' already exists.",
            "dxFileManager-errorFileExistsFormat": "File '{0}' already exists.",
            "dxFileManager-errorFileNotFoundFormat": "File '{0}' not found.",
            "dxFileManager-errorDirectoryNotFoundFormat": "Directory '{0}' not found.",
            "dxFileManager-errorWrongFileExtension": "File extension is not allowed.",
            "dxFileManager-errorMaxFileSizeExceeded": "File size exceeds the maximum allowed size.",
            "dxFileManager-errorInvalidSymbols": "This name contains invalid characters.",
            "dxFileManager-errorDefault": "Unspecified error.",
            "dxFileManager-errorDirectoryOpenFailed": "The directory cannot be opened",

            "dxFileManager-commandCreate": "New directory",
            "dxFileManager-commandRename": "Rename",
            "dxFileManager-commandMove": "Move to",
            "dxFileManager-commandCopy": "Copy to",
            "dxFileManager-commandDelete": "Delete",
            "dxFileManager-commandDownload": "Download",
            "dxFileManager-commandUpload": "Upload files",
            "dxFileManager-commandRefresh": "Refresh",
            "dxFileManager-commandThumbnails": "Thumbnails View",
            "dxFileManager-commandDetails": "Details View",
            "dxFileManager-commandClearSelection": "Clear selection",
            "dxFileManager-commandShowNavPane": "Toggle navigation pane",

            "dxFileManager-dialogDirectoryChooserMoveTitle": "Move to",
            "dxFileManager-dialogDirectoryChooserMoveButtonText": "Move",
            "dxFileManager-dialogDirectoryChooserCopyTitle": "Copy to",
            "dxFileManager-dialogDirectoryChooserCopyButtonText": "Copy",
            "dxFileManager-dialogRenameItemTitle": "Rename",
            "dxFileManager-dialogRenameItemButtonText": "Save",
            "dxFileManager-dialogCreateDirectoryTitle": "New directory",
            "dxFileManager-dialogCreateDirectoryButtonText": "Create",
            "dxFileManager-dialogDeleteItemTitle": "Delete",
            "dxFileManager-dialogDeleteItemButtonText": "Delete",
            "dxFileManager-dialogDeleteItemSingleItemConfirmation": "Are you sure you want to delete {0}?",
            "dxFileManager-dialogDeleteItemMultipleItemsConfirmation": "Are you sure you want to delete {0} items?",
            "dxFileManager-dialogButtonCancel": "Cancel",

            "dxFileManager-editingCreateSingleItemProcessingMessage": "Creating a directory inside {0}",
            "dxFileManager-editingCreateSingleItemSuccessMessage": "Created a directory inside {0}",
            "dxFileManager-editingCreateSingleItemErrorMessage": "Directory was not created",
            "dxFileManager-editingCreateCommonErrorMessage": "Directory was not created",

            "dxFileManager-editingRenameSingleItemProcessingMessage": "Renaming an item inside {0}",
            "dxFileManager-editingRenameSingleItemSuccessMessage": "Renamed an item inside {0}",
            "dxFileManager-editingRenameSingleItemErrorMessage": "Item was not renamed",
            "dxFileManager-editingRenameCommonErrorMessage": "Item was not renamed",

            "dxFileManager-editingDeleteSingleItemProcessingMessage": "Deleting an item from {0}",
            "dxFileManager-editingDeleteMultipleItemsProcessingMessage": "Deleting {0} items from {1}",
            "dxFileManager-editingDeleteSingleItemSuccessMessage": "Deleted an item from {0}",
            "dxFileManager-editingDeleteMultipleItemsSuccessMessage": "Deleted {0} items from {1}",
            "dxFileManager-editingDeleteSingleItemErrorMessage": "Item was not deleted",
            "dxFileManager-editingDeleteMultipleItemsErrorMessage": "{0} items were not deleted",
            "dxFileManager-editingDeleteCommonErrorMessage": "Some items were not deleted",

            "dxFileManager-editingMoveSingleItemProcessingMessage": "Moving an item to {0}",
            "dxFileManager-editingMoveMultipleItemsProcessingMessage": "Moving {0} items to {1}",
            "dxFileManager-editingMoveSingleItemSuccessMessage": "Moved an item to {0}",
            "dxFileManager-editingMoveMultipleItemsSuccessMessage": "Moved {0} items to {1}",
            "dxFileManager-editingMoveSingleItemErrorMessage": "Item was not moved",
            "dxFileManager-editingMoveMultipleItemsErrorMessage": "{0} items were not moved",
            "dxFileManager-editingMoveCommonErrorMessage": "Some items were not moved",

            "dxFileManager-editingCopySingleItemProcessingMessage": "Copying an item to {0}",
            "dxFileManager-editingCopyMultipleItemsProcessingMessage": "Copying {0} items to {1}",
            "dxFileManager-editingCopySingleItemSuccessMessage": "Copied an item to {0}",
            "dxFileManager-editingCopyMultipleItemsSuccessMessage": "Copied {0} items to {1}",
            "dxFileManager-editingCopySingleItemErrorMessage": "Item was not copied",
            "dxFileManager-editingCopyMultipleItemsErrorMessage": "{0} items were not copied",
            "dxFileManager-editingCopyCommonErrorMessage": "Some items were not copied",

            "dxFileManager-editingUploadSingleItemProcessingMessage": "Uploading an item to {0}",
            "dxFileManager-editingUploadMultipleItemsProcessingMessage": "Uploading {0} items to {1}",
            "dxFileManager-editingUploadSingleItemSuccessMessage": "Uploaded an item to {0}",
            "dxFileManager-editingUploadMultipleItemsSuccessMessage": "Uploaded {0} items to {1}",
            "dxFileManager-editingUploadSingleItemErrorMessage": "Item was not uploaded",
            "dxFileManager-editingUploadMultipleItemsErrorMessage": "{0} items were not uploaded",
            "dxFileManager-editingUploadCanceledMessage": "Canceled",

            "dxFileManager-editingDownloadSingleItemErrorMessage": "Item was not downloaded",
            "dxFileManager-editingDownloadMultipleItemsErrorMessage": "{0} items were not downloaded",

            "dxFileManager-listDetailsColumnCaptionName": "Name",
            "dxFileManager-listDetailsColumnCaptionDateModified": "Date Modified",
            "dxFileManager-listDetailsColumnCaptionFileSize": "File Size",

            "dxFileManager-listThumbnailsTooltipTextSize": "Size",
            "dxFileManager-listThumbnailsTooltipTextDateModified": "Date Modified",

            "dxFileManager-notificationProgressPanelTitle": "Progress",
            "dxFileManager-notificationProgressPanelEmptyListText": "No operations",
            "dxFileManager-notificationProgressPanelOperationCanceled": "Canceled",

            "dxDiagram-categoryGeneral": "General",
            "dxDiagram-categoryFlowchart": "Flowchart",
            "dxDiagram-categoryOrgChart": "Org Chart",
            "dxDiagram-categoryContainers": "Containers",
            "dxDiagram-categoryCustom": "Custom",

            "dxDiagram-commandExportToSvg": "Export to SVG",
            "dxDiagram-commandExportToPng": "Export to PNG",
            "dxDiagram-commandExportToJpg": "Export to JPEG",
            "dxDiagram-commandUndo": "Undo",
            "dxDiagram-commandRedo": "Redo",
            "dxDiagram-commandFontName": "Font Name",
            "dxDiagram-commandFontSize": "Font Size",
            "dxDiagram-commandBold": "Bold",
            "dxDiagram-commandItalic": "Italic",
            "dxDiagram-commandUnderline": "Underline",
            "dxDiagram-commandTextColor": "Font Color",
            "dxDiagram-commandLineColor": "Line Color",
            "dxDiagram-commandLineWidth": "Line Width",
            "dxDiagram-commandLineStyle": "Line Style",
            "dxDiagram-commandLineStyleSolid": "Solid",
            "dxDiagram-commandLineStyleDotted": "Dotted",
            "dxDiagram-commandLineStyleDashed": "Dashed",
            "dxDiagram-commandFillColor": "Fill Color",
            "dxDiagram-commandAlignLeft": "Align Left",
            "dxDiagram-commandAlignCenter": "Align Center",
            "dxDiagram-commandAlignRight": "Align Right",
            "dxDiagram-commandConnectorLineType": "Connector Line Type",
            "dxDiagram-commandConnectorLineStraight": "Straight",
            "dxDiagram-commandConnectorLineOrthogonal": "Orthogonal",
            "dxDiagram-commandConnectorLineStart": "Connector Line Start",
            "dxDiagram-commandConnectorLineEnd": "Connector Line End",
            "dxDiagram-commandConnectorLineNone": "None",
            "dxDiagram-commandConnectorLineArrow": "Arrow",
            "dxDiagram-commandFullscreen": "Full Screen",
            "dxDiagram-commandUnits": "Units",
            "dxDiagram-commandPageSize": "Page Size",
            "dxDiagram-commandPageOrientation": "Page Orientation",
            "dxDiagram-commandPageOrientationLandscape": "Landscape",
            "dxDiagram-commandPageOrientationPortrait": "Portrait",
            "dxDiagram-commandPageColor": "Page Color",
            "dxDiagram-commandShowGrid": "Show Grid",
            "dxDiagram-commandSnapToGrid": "Snap to Grid",
            "dxDiagram-commandGridSize": "Grid Size",
            "dxDiagram-commandZoomLevel": "Zoom Level",
            "dxDiagram-commandAutoZoom": "Auto Zoom",
            "dxDiagram-commandFitToContent": "Fit to Content",
            "dxDiagram-commandFitToWidth": "Fit to Width",
            "dxDiagram-commandAutoZoomByContent": "Auto Zoom by Content",
            "dxDiagram-commandAutoZoomByWidth": "Auto Zoom by Width",
            "dxDiagram-commandSimpleView": "Simple View",
            "dxDiagram-commandCut": "Cut",
            "dxDiagram-commandCopy": "Copy",
            "dxDiagram-commandPaste": "Paste",
            "dxDiagram-commandSelectAll": "Select All",
            "dxDiagram-commandDelete": "Delete",
            "dxDiagram-commandBringToFront": "Bring to Front",
            "dxDiagram-commandSendToBack": "Send to Back",
            "dxDiagram-commandLock": "Lock",
            "dxDiagram-commandUnlock": "Unlock",
            "dxDiagram-commandInsertShapeImage": "Insert Image...",
            "dxDiagram-commandEditShapeImage": "Change Image...",
            "dxDiagram-commandDeleteShapeImage": "Delete Image",
            "dxDiagram-commandLayoutLeftToRight": "Left-to-right",
            "dxDiagram-commandLayoutRightToLeft": "Right-to-left",
            "dxDiagram-commandLayoutTopToBottom": "Top-to-bottom",
            "dxDiagram-commandLayoutBottomToTop": "Bottom-to-top",

            "dxDiagram-unitIn": "in",
            "dxDiagram-unitCm": "cm",
            "dxDiagram-unitPx": "px",

            "dxDiagram-dialogButtonOK": "OK",
            "dxDiagram-dialogButtonCancel": "Cancel",
            "dxDiagram-dialogInsertShapeImageTitle": "Insert Image",
            "dxDiagram-dialogEditShapeImageTitle": "Change Image",
            "dxDiagram-dialogEditShapeImageSelectButton": "Select image",
            "dxDiagram-dialogEditShapeImageLabelText": "or drop a file here",

            "dxDiagram-uiExport": "Export",
            "dxDiagram-uiProperties": "Properties",
            "dxDiagram-uiSettings": "Settings",
            "dxDiagram-uiShowToolbox": "Show Toolbox",
            "dxDiagram-uiSearch": "Search",
            "dxDiagram-uiStyle": "Style",
            "dxDiagram-uiLayout": "Layout",
            "dxDiagram-uiLayoutTree": "Tree",
            "dxDiagram-uiLayoutLayered": "Layered",
            "dxDiagram-uiDiagram": "Diagram",
            "dxDiagram-uiText": "Text",
            "dxDiagram-uiObject": "Object",
            "dxDiagram-uiConnector": "Connector",
            "dxDiagram-uiPage": "Page",

            "dxDiagram-shapeText": "Text",
            "dxDiagram-shapeRectangle": "Rectangle",
            "dxDiagram-shapeEllipse": "Ellipse",
            "dxDiagram-shapeCross": "Cross",
            "dxDiagram-shapeTriangle": "Triangle",
            "dxDiagram-shapeDiamond": "Diamond",
            "dxDiagram-shapeHeart": "Heart",
            "dxDiagram-shapePentagon": "Pentagon",
            "dxDiagram-shapeHexagon": "Hexagon",
            "dxDiagram-shapeOctagon": "Octagon",
            "dxDiagram-shapeStar": "Star",
            "dxDiagram-shapeArrowLeft": "Left Arrow",
            "dxDiagram-shapeArrowUp": "Up Arrow",
            "dxDiagram-shapeArrowRight": "Right Arrow",
            "dxDiagram-shapeArrowDown": "Down Arrow",
            "dxDiagram-shapeArrowUpDown": "Up Down Arrow",
            "dxDiagram-shapeArrowLeftRight": "Left Right Arrow",
            "dxDiagram-shapeProcess": "Process",
            "dxDiagram-shapeDecision": "Decision",
            "dxDiagram-shapeTerminator": "Terminator",
            "dxDiagram-shapePredefinedProcess": "Predefined Process",
            "dxDiagram-shapeDocument": "Document",
            "dxDiagram-shapeMultipleDocuments": "Multiple Documents",
            "dxDiagram-shapeManualInput": "Manual Input",
            "dxDiagram-shapePreparation": "Preparation",
            "dxDiagram-shapeData": "Data",
            "dxDiagram-shapeDatabase": "Database",
            "dxDiagram-shapeHardDisk": "Hard Disk",
            "dxDiagram-shapeInternalStorage": "Internal Storage",
            "dxDiagram-shapePaperTape": "Paper Tape",
            "dxDiagram-shapeManualOperation": "Manual Operation",
            "dxDiagram-shapeDelay": "Delay",
            "dxDiagram-shapeStoredData": "Stored Data",
            "dxDiagram-shapeDisplay": "Display",
            "dxDiagram-shapeMerge": "Merge",
            "dxDiagram-shapeConnector": "Connector",
            "dxDiagram-shapeOr": "Or",
            "dxDiagram-shapeSummingJunction": "Summing Junction",
            "dxDiagram-shapeContainerDefaultText": "Container",
            "dxDiagram-shapeVerticalContainer": "Vertical Container",
            "dxDiagram-shapeHorizontalContainer": "Horizontal Container",
            "dxDiagram-shapeCardDefaultText": "Person's Name",
            "dxDiagram-shapeCardWithImageOnLeft": "Card with Image on the Left",
            "dxDiagram-shapeCardWithImageOnTop": "Card with Image on the Top",
            "dxDiagram-shapeCardWithImageOnRight": "Card with Image on the Right",

            "dxGantt-dialogTitle": "Title",
            "dxGantt-dialogStartTitle": "Start",
            "dxGantt-dialogEndTitle": "End",
            "dxGantt-dialogProgressTitle": "Progress",
            "dxGantt-dialogResourcesTitle": "Resources",
            "dxGantt-dialogResourceManagerTitle": "Resource Manager",
            "dxGantt-dialogTaskDetailsTitle": "Task Details",
            "dxGantt-dialogEditResourceListHint": "Edit Resource List",
            "dxGantt-dialogEditNoResources": "No resources",
            "dxGantt-dialogButtonAdd": "Add",
            "dxGantt-contextMenuNewTask": "New Task",
            "dxGantt-contextMenuNewSubtask": "New Subtask",
            "dxGantt-contextMenuDeleteTask": "Delete Task",
            "dxGantt-contextMenuDeleteDependency": "Delete Dependency",
            "dxGantt-dialogTaskDeleteConfirmation": "Deleting a task also deletes all its dependencies and subtasks. Are you sure you want to delete this task?",
            "dxGantt-dialogDependencyDeleteConfirmation": "Are you sure you want to delete the dependency from the task?",
            "dxGantt-dialogResourcesDeleteConfirmation": "Deleting a resource also deletes it from tasks to which this resource is assigned. Are you sure you want to delete these resources? Resources: {0}",
            "dxGantt-dialogConstraintCriticalViolationMessage": "The task you are attempting to move is linked to a second task by a dependency relation. This change would conflict with dependency rules. How would you like to proceed?",
            "dxGantt-dialogConstraintViolationMessage": "The task you are attempting to move is linked to a second task by a dependency relation. How would you like to proceed?",
            "dxGantt-dialogCancelOperationMessage": "Cancel the operation",
            "dxGantt-dialogDeleteDependencyMessage": "Delete the dependency",
            "dxGantt-dialogMoveTaskAndKeepDependencyMessage": "Move the task and keep the dependency",
            "dxGantt-dialogConstraintCriticalViolationSeveralTasksMessage": "The task you are attempting to move is linked to another tasks by dependency relations. This change would conflict with dependency rules. How would you like to proceed?",
            "dxGantt-dialogConstraintViolationSeveralTasksMessage": "The task you are attempting to move is linked to another tasks by dependency relations. How would you like to proceed?",
            "dxGantt-dialogDeleteDependenciesMessage": "Delete the dependency relations",
            "dxGantt-dialogMoveTaskAndKeepDependenciesMessage": "Move the task and keep the dependencies",
            "dxGantt-undo": "Undo",
            "dxGantt-redo": "Redo",
            "dxGantt-expandAll": "Expand All",
            "dxGantt-collapseAll": "Collapse All",
            "dxGantt-addNewTask": "Add New Task",
            "dxGantt-deleteSelectedTask": "Delete Selected Task",
            "dxGantt-zoomIn": "Zoom In",
            "dxGantt-zoomOut": "Zoom Out",
            "dxGantt-fullScreen": "Full Screen",
            "dxGantt-quarter": "Q{0}",
            "dxGantt-sortingAscendingText": "Sort Ascending",
            "dxGantt-sortingDescendingText": "Sort Descending",
            "dxGantt-sortingClearText": "Clear Sorting",
            "dxGantt-showResources": "Show Resources",
            "dxGantt-showDependencies": "Show Dependencies",
            "dxGantt-dialogStartDateValidation": "Start date must be after {0}",
            "dxGantt-dialogEndDateValidation": "End date must be after {0}"
        }
    });
    DevExpress.localization.locale("sv");


    function dispose() {
        window.htmlEdit = undefined;
        $("#html-editor").html("");
        _created = false;
        _creating = false;
    }

    function redraw() {
        window.htmlEdit.repaint();
    }

    function createHtmlEdit(onInitialized, onValueChanged) {

        if (_creating) {
            return;
        }

        _creating = true;

        if (_created) {
            _creating = false;
            return;
        }

        endCreate = function () {
            setTimeout(function () {
                var htmlEditor = document.getElementById("html-editor");
                if (htmlEditor) {

                    const sizeValues = ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"];
                    const fontValues = [
                        "Arial",
                        "Courier New",
                        "Georgia",
                        "Impact",
                        "Lucida Console",
                        "Tahoma",
                        "Times New Roman",
                        "Verdana",
                    ];
                    const headerValues = [false, 1, 2, 3];
                    const maxFileSize = 1048576;

                    window.htmlEdit = $("#html-editor").dxHtmlEditor({
                        valueType: "html",
                        imageUpload: {
                            tabs: ['file', 'url'],
                            fileUploadMode: 'base64',
                            fileUploaderOptions: {
                                maxFileSize: maxFileSize,
                                uploadMode: 'useButtons',
                                onOptionChanged: function (e) {
                                    if (e.name == "value") {
                                        var files = e.value;
                                        if (files.length > 0) {
                                            var file = files[0];
                                            if (file.size > maxFileSize) {
                                                setTimeout(function () { 
                                                    alert("Bilden kan ej infogas eftersom den överskrider storleksgränsen på 2MB.");
                                                    undo();
                                                }, 1000);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        mediaResizing: {
                            enabled: true,
                        },
                        onFocusIn({ e }) {
                            console.log("htmledit onFocusIn", e);
                        },
                        onfocusOut({ e }) {
                            console.log("htmledit onfocusOut", e);
                        },
                        onInitialized({ component }) {
                            if (onInitialized)
                                onInitialized();

                            $("#html-editor").css('background-color', 'white');
                        },
                        toolbar: {
                            container: null,
                            items: [
                                { name: 'undo', options: { text: "Ångra", hint: "Ångra" } },
                                { name: 'redo', options: { text: "Gör om", hint: "Gör om" } },
                                'separator',
                                { name: 'bold', options: { text: "Fet", hint: "Fet" } },
                                { name: 'italic', options: { text: "Kursiv", hint: "Kursiv" } },
                                { name: 'strike', options: { text: "Genomstruken", hint: "Genomstruken" } },
                                { name: 'underline', options: { text: "Understruken", hint: "Understruken" } },
                                'separator',
                                { name: 'alignLeft', options: { text: "Vänsterjustera", hint: "Vänsterjustera" } },
                                { name: 'alignCenter', options: { text: "Centrera", hint: "Centrera" } },
                                { name: 'alignRight', options: { text: "Högerjustera", hint: "Högerjustera" } },
                                { name: 'alignJustify', options: { text: "Justera", hint: "Justera" } },
                                'separator',
                                { name: 'orderedList', options: { text: "Numrerad lista", hint: "Numrerad lista" } },
                                { name: 'bulletList', options: { text: "Punktlista", hint: "Punktlista" } },
                                'separator',
                                {
                                    "name": "header",
                                    "acceptedValues": headerValues
                                },
                                'separator',
                                { name: 'image', options: { text: "Infoga bild", hint: "Infoga bild" } },
                                'separator',
                                { name: 'clear', options: { text: "Rensa", hint: "Rensa" } },
                                'separator',
                                { name: 'insertTable', options: { text: "Infoga tabell", hint: "Infoga tabell" } },
                                { name: 'insertRowAbove', options: { text: "Lägg till rad ovanför", hint: "Lägg till rad ovanför" } },
                                { name: 'insertRowBelow', options: { text: "Infoga rad nedanför", hint: "Infoga rad nedanför" } },
                                { name: 'deleteRow', options: { text: "Ta bort rad", hint: "Ta bort rad" } },
                                { name: 'insertColumnLeft', options: { text: "Infoga kolumn till vänster", hint: "Infoga kolumn till vänster" } },
                                { name: 'insertColumnRight', options: { text: "Infoga kolumn till höger", hint: "Infoga kolumn till höger" } },
                                { name: 'deleteColumn', options: { text: "Ta bort kolumnen", hint: "Ta bort kolumn" } }
                            ],
                            multiline: true
                        },
                    }).dxHtmlEditor("instance");
                    _created = true;
                    _creating = false;
                }
                else {
                    //console.log("html-editor Not Found, try again");
                    _created = false;
                    endCreate();
                }
            }, 1000);
        }

        endCreate();
    }

    function setValue(html) {
        if (!window.htmlEdit)
            return;
        window.htmlEdit.option("value", html);
    }

    function getValue() {
        if (!window.htmlEdit)
            return "";

        var html = window.htmlEdit.option("value");
        return html;
    }

    function getReadOnly() {
        if (!window.htmlEdit)
            return false;

        var val = window.htmlEdit.option("readOnly");
        return val;
    }

    function setReadOnly(val) {
        if (!window.htmlEdit)
            return;

        window.htmlEdit.option("readOnly", val);
    }

    function formatText(index, length, formatName, formatValue) {
        if (!window.htmlEdit)
            return;

        window.htmlEdit.formatText(index, length, formatName, formatValue);
    }

    function getLength() {
        if (!window.htmlEdit)
            return 0;

        return window.htmlEdit.getLength();
    }

    var _lastHeight = 0;
    function setHeight(val) {
        if (!window.htmlEdit)
            return;

        if (_lastHeight == val)
            return;

        _lastHeight = val;

        if (window.htmlEdit.option("height") == val)
            return;

        window.htmlEdit.option("height", val);
    }

    function undo() {
        if (!window.htmlEdit)
            return;

        window.htmlEdit.undo();
    }

})();
