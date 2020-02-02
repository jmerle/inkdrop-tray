import { remote } from 'electron';

let tray = null;
let onMinimizeCallback = null;

function createIcon() {
  // Base64 version of https://inkdrop.app/icons/icon-48x48.png
  // prettier-ignore
  const base64 = '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';
  const buffer = Buffer.from(base64, 'base64');
  return remote.nativeImage.createFromBuffer(buffer);
}

function createMenu() {
  return remote.Menu.buildFromTemplate([
    {
      label: 'Show Inkdrop',
      click: () => inkdrop.window.show(),
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => remote.app.quit(),
    },
  ]);
}

function onMinimize() {
  if (inkdrop.config.get('tray.minimizeToTray')) {
    if (inkdrop.clientInfo.clientName === 'win32') {
      inkdrop.window.maximize();
      inkdrop.window.blur();
    }

    inkdrop.window.hide();
  }
}

export const config = {
  minimizeToTray: {
    title: 'Minimize to tray',
    type: 'boolean',
    default: true,
  },
};

export function activate() {
  if (!inkdrop.isMainWindow) {
    return;
  }

  tray = new remote.Tray(createIcon());
  tray.setToolTip('Inkdrop');
  tray.setContextMenu(createMenu());
  tray.on('click', () => inkdrop.window.show());

  onMinimizeCallback = () => onMinimize();
  inkdrop.window.on('minimize', onMinimizeCallback);

  if (inkdrop.window.isMinimized()) {
    onMinimize();
  }
}

export function deactivate() {
  if (tray !== null) {
    tray.destroy();
    tray = null;
  }

  if (onMinimizeCallback !== null) {
    inkdrop.window.off('minimize', onMinimizeCallback);
    onMinimizeCallback = null;
  }
}
