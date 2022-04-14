import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export let navShow = trigger('navShow', [
  state('Open', style({ width: '100%' })),
  state('Close', style({ width: '20%' })),

  transition('Close => Open', animate(500)),
  transition('Open => Close', animate(1000)),
]);
