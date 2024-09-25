
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload to update?')) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});