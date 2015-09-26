var gui = require('nw.gui');

var triggerUnityEvent = function(eventName) {
    var event = document.createEvent('Event');
    event.initEvent('UnityActionEvent', true, true);
    document.body.setAttribute('data-unity-action', JSON.stringify(eventName));
    document.body.dispatchEvent(event);
}

var hotKeyMapping = {
    MediaPlayPause: 'pause',
    MediaNextTrack: 'next',
    MediaPrevTrack: 'previous'
}

var initializeGUI = function() {
    if (global.gui) {
        return;
    }

    global.gui = {};

    global.gui.tray = new gui.Tray({
        icon: 'icon.png',
        alticon: 'alticon.png',
        iconsAreTemplates: true
    });

    for (key in hotKeyMapping) {
        gui.App.registerGlobalHotKey(new gui.Shortcut({
            key: key,
            active: triggerUnityEvent.bind(null, hotKeyMapping[key])
        }));
    }

    var mb = new gui.Menu({
        type: 'menubar'
    });

    mb.createMacBuiltin('Yandex Music');
    gui.Window.get().menu = mb;

}

var initializeApp = function() {
    var hotkeys = [];

    var stateHandler = window.addEventListener('UnityStateEvent', function() {
        var state = JSON.parse(document.body.dataset.unityState);
        global.gui.tray.title = state.artist + ' — ' + state.title;
    });

    var unloadHandler = window.addEventListener('unload', function() {
        console.log('deactivating application' + window.location.href);
        gui.tray.title = null;
        window.removeEventListener('unload', unloadHandler);
        window.removeEventListener('UnityStateEvent', stateHandler)
    });
}

initializeGUI();

if (window.location.href === 'https://music.yandex.ru/') {
    initializeApp();
}
