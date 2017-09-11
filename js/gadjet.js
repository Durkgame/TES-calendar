var t;
var isDocked;
var mainSettings;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// setting's block
//
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function loadSettings()
{ 
    mainSettings = new GetMainSettings(); 
    System.Gadget.onSettingsClosing = SettingsClosing;
    if(mainSettings.tamrielDays == "checked")
    {
        tamrielDays.checked = true;
    }
    if(mainSettings.whiteTheme == "checked")
    {
        whiteTheme.checked = true;
    }
    if(mainSettings.eng == "checked")
    {
        eng.checked = true;
    }
}

function SettingsClosing(event)
{
    if (event.closeAction == event.Action.commit)
    {
        System.Gadget.Settings.write("GadgetViewed","yes");
        SaveSettings();
    }
    else if(event.closeAction == event.Action.cancel)
    {
    }
    event.cancel = false;
}

////////////////////////////////////////////////////////////////////////////////
//
// save the new settings
//
////////////////////////////////////////////////////////////////////////////////
function SaveSettings()
{ 
    if(tamrielDays.checked)
    {
        mainSettings.tamrielDays = "checked";
    }
    else
    {
        mainSettings.tamrielDays = "unchecked";
    }
    if(whiteTheme.checked)
    {
        mainSettings.whiteTheme = "checked";
    }
    else
    {
        mainSettings.whiteTheme = "unchecked";
    }
    if(eng.checked)
    {
        mainSettings.eng = "checked";
    }
    else
    {
        mainSettings.eng = "unchecked";
    }
    SetMainSettings(mainSettings);
}

////////////////////////////////////////////////////////////////////////////////
//
// settings getter
//
////////////////////////////////////////////////////////////////////////////////
function GetMainSettings()
{
    this.tamrielDays = System.Gadget.Settings.read("tamriel's Days");
    this.whiteTheme  = System.Gadget.Settings.read("white Theme");
    this.eng  = System.Gadget.Settings.read("eng");
    this.gadgetViewed   = System.Gadget.Settings.read("GadgetViewed");
    
    // if(this.tamrielDays == "")
    // {
    //     this.tamrielDays="checked";
    // }
}

////////////////////////////////////////////////////////////////////////////////
//
// settings setter
//
////////////////////////////////////////////////////////////////////////////////
function SetMainSettings(settings)
{
    System.Gadget.Settings.write("tamriel's Days", settings.tamrielDays);
    System.Gadget.Settings.write("white Theme", settings.whiteTheme);
    System.Gadget.Settings.write("eng", settings.eng);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function loadmain() {
    System.Gadget.settingsUI = "settings.html";
    System.Gadget.onSettingsClosed = SettingsClosed;
    System.Gadget.onUndock = checkState;
    System.Gadget.onDock = checkState;
    checkState();
}

function checkState() {
    if (!System.Gadget.docked) undockedState();
    else dockedState();
}
function undockedState() {
    with(document.body.style) {
        width = "650px";
        height = "120px";
    }
    background.style.width = "650px";
    background.style.height = "120px";
    background.src = "url(images/background.png)";
    isDocked = false;
    setDate();
}
function dockedState() {
    with(document.body.style) {
        width = "200px";
        height = "120px";
    }
    background.style.width = "200px";
    background.style.height = "120px";
    background.src = "url(images/background.png)";
    isDocked = true;
    setDate();
}

function setDate() {
    var dayD = 15;
    var mjD = 16;
    function custom(arg) {
        // 1 - output of day(+options); 
        // 2 - output of month(+options); 
        // 3 - color;
        var output;
        switch(arg){
            case 1:
            if (System.Gadget.Settings.read("tamriel's Days") == 'checked') {
                dayD = 16;
                if (System.Gadget.Settings.read("eng") == 'checked') {
                    output = dayTmrlEn;
                } else {
                    output = dayTmrlRu;
                }
            } else {
                if (System.Gadget.Settings.read("eng") == 'checked') {
                    output = dayGregEn;
                    dayD = 16;
                } else {
                    output = dayGregRu;
                }
            }
            break;
            case 2:
            output = monthRu;
            if (System.Gadget.Settings.read("eng") == 'checked') {
                output = monthEn;
                mjD = 17;
            }
            break;
            case 3:
            output = 'Black';
            if (System.Gadget.Settings.read("white Theme") == 'checked') {
                output = 'White';
            }
            break;
        }
        return output;
    }
    function flmin() {
        var fullmin = mintxt;
        if (String(mintxt).length == 1) {
            fullmin = '0' + fullmin;
        }
        return fullmin;
    }
    System.Gadget.beginTransition();
    background.removeObjects();
    var dayGregRu = new Array("воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота");
    var dayGregEn = new Array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
    var dayTmrlRu = new Array("Сандас", "Морндас", "Тирдас", "Миддас", "Турдас", "Фредас", "Лордас");
    var dayTmrlEn = new Array("Sundas", "Morndas", "Tirdas", "Middas", "Turdas", "Fredas", "Loredas");
    var monthRu = new Array("Утренней звезды", "Восхода солнца", "Первого зерна", "Руки дождя", "Второго зерна", "Середины года", "Высокого солнца", "Последнего зерна", "Огня очага", "Начала морозов", "Заката солнца", "Вечерней звезды");
    var monthEn = new Array("Morning Star", "Sun's Dawn", "First Seed", "Rain's Hand", "Second Seed", "Mid Year", "Sun's Height", "Last Seed", "Hearthfire", "Frostfall", "Sun's Dusk", "Evening Star");
    var nd = new Date;
    var hourtxt = (nd.getHours());
    var mintxt = (nd.getMinutes());
    var timetxt = (hourtxt + ':' + flmin());
    var daytxt = (custom(1)[nd.getDay()]);
    var datumtxt = (nd.getDate());
    var maandtxt = (custom(2)[nd.getMonth()]);
    var jaartxt = (nd.getYear());
    var color = custom(3);
    if (!isDocked) {
        var timeDisplay = background.addTextObject(timetxt, "Segoe UI", 110, color, 300, -40);
        timeDisplay.align = 2;
        var datumDisplay = background.addTextObject(datumtxt, "Segoe UI", 80, color, 365, -29);
        datumDisplay.align = 1;
        var dayDisplay = background.addTextObject(daytxt, "Segoe UI", 17, color, 365, 64);
        dayDisplay.align = 1;
        var maandjaarDisplay = background.addTextObject(maandtxt + ", " + jaartxt, "Segoe UI", 17, color, 411, 92);
        maandjaarDisplay.align = 2;
        t = setTimeout(setDate, 3000);
    } else {
        var dayDisplay = background.addTextObject(daytxt, "Segoe UI", dayD, color, 100, -3);
        dayDisplay.align = 1;
        var datumDisplay = background.addTextObject(datumtxt, "Segoe UI", 80, color, 100, -1);
        datumDisplay.align = 1;
        var maandjaarDisplay = background.addTextObject(maandtxt + ", " + jaartxt, "Segoe UI", mjD, color, 100, 95);
        maandjaarDisplay.align = 1;
        t = setTimeout(setDate, 3000);
    }
}