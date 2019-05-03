// How to use

// 1. emiting to event
this.broadcaster.broadcast('toggleToolbar', true);

// 2.1 subscribing to event (unsubscribing manually)
this.toolBarSub = this.broadcaster.on('toggleToolbar').subscribe((toggled: boolean) => {
  this.toggleToolbar(toggled as boolean);
});

// 2.2 subscribing to event (unsubscribing declaratively)
destroy$: Subject<boolean> = new Subject<boolean>();
this.broadcaster.on('toggleToolbar').pipe(takeUntil(this.destroy$)).subscribe((toggled: boolean) => {
  this.toggleToolbar(toggled as boolean);
});


// 3.1 destroy
ngOnDestroy() {
  if (this.toolBarSub) {
    this.toolBarSub.unsubscribe();
  }
}

// 3.2 we don’t need to keep references to our subscriptions anymore
ngOnDestroy() {
  this.destroy$.next(true);
  // unsubscribe from the subject itself
  this.destroy$.unsubscribe();
}

