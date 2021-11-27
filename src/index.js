'use babel';

import { remote } from 'electron';

let tray = null;

let onMinimizeCallback = null;
let onMaximizeCallback = null;
let onUnmaximizeCallback = null;
let onRestoreCallback = null;

let isMaximized = false;

function createIcon() {
  let base64;
  if (inkdrop.config.get('tray.useMonochromeIcon')) {
    // Base64 version of https://inkdrop.app/icons/icon-48x48.png converted to grayscale
    // prettier-ignore
    base64 = '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';
  } else {
    // Base64 version of https://inkdrop.app/icons/icon-48x48.png
    // prettier-ignore
    base64 = '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';
  }

  const buffer = Buffer.from(base64, 'base64');
  const image = remote.nativeImage.createFromBuffer(buffer);

  if (process.platform === 'darwin') {
    return image.resize({ width: 16, height: 16 });
  }

  return image;
}

function createMenu() {
  return remote.Menu.buildFromTemplate([
    {
      label: 'Show Inkdrop',
      click: () => inkdrop.window.show(),
    },
    {
      label: 'New Note',
      click: () => {
        inkdrop.window.once('show', () => {
          inkdrop.commands.dispatch(document.body, 'core:new-note');
        });

        inkdrop.window.show();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => remote.app.quit(),
    },
  ]);
}

function createTray() {
  if (tray !== null) {
    tray.destroy();
  }

  tray = new remote.Tray(createIcon());
  tray.setToolTip('Inkdrop');
  tray.setContextMenu(createMenu());
  tray.on('click', () => inkdrop.window.show());
}

function onMinimize() {
  if (inkdrop.config.get('tray.minimizeToTray')) {
    if (isMaximized) {
      // Make sure the window opens in maximized state if it was maximized before it was minimized
      inkdrop.window.maximize();
    }

    // We need to blur before we hide to ensure application:toggle-main-window brings it back
    // See https://forum.inkdrop.app/t/application-toggle-main-window-on-windows-10/1745
    inkdrop.window.blur();
    inkdrop.window.hide();
  }
}

function updateIsMaximized() {
  isMaximized = inkdrop.window.isMaximized();
}

export const config = {
  minimizeToTray: {
    title: 'Minimize to tray',
    type: 'boolean',
    default: true,
  },
  useMonochromeIcon: {
    title: 'Use monochrome icon',
    type: 'boolean',
    default: false,
  },
};

export function activate() {
  if (!inkdrop.isMainWindow) {
    return;
  }

  createTray();

  inkdrop.config.onDidChange('tray.useMonochromeIcon', () => createTray());

  onMinimizeCallback = () => onMinimize();
  inkdrop.window.on('minimize', onMinimizeCallback);

  onMaximizeCallback = () => updateIsMaximized();
  inkdrop.window.on('maximize', onMaximizeCallback);

  onUnmaximizeCallback = () => updateIsMaximized();
  inkdrop.window.on('unmaximize', onUnmaximizeCallback);

  onRestoreCallback = () => updateIsMaximized();
  inkdrop.window.on('restore', onRestoreCallback);

  window.addEventListener('unload', () => deactivate());

  updateIsMaximized();

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

  if (onMaximizeCallback !== null) {
    inkdrop.window.off('maximize', onMaximizeCallback);
    onMaximizeCallback = null;
  }

  if (onUnmaximizeCallback !== null) {
    inkdrop.window.off('unmaximize', onUnmaximizeCallback);
    onUnmaximizeCallback = null;
  }

  if (onRestoreCallback !== null) {
    inkdrop.window.off('restore', onRestoreCallback);
    onRestoreCallback = null;
  }
}
