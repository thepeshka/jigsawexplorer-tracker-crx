import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: "Jigsaw Explorer Tracker",
  description: pkg.description,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
  },
  content_scripts: [{
    js: ['src/main.js'],
    matches: ['https://www.jigsawexplorer.com/*'],
    run_at: 'document_end',
  }, {
    js: ['src/player.js'],
    matches: ['https://www.jigsawexplorer.com/online-jigsaw-puzzle-player.html?*'],
    run_at: 'document_end',
    world: 'MAIN',
  }],
})
