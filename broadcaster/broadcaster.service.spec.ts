import { TestBed } from '@angular/core/testing';

import { BroadcasterService } from './broadcaster.service';

describe('BroadcasterService', () => {
  let service: BroadcasterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcasterService]
    });
    service = TestBed.get(BroadcasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('broadcast ', () => {
    // Arrange
    const key = 'test-broadcast';
    const value = { result: true };
    const obs = service.on(key);

    // Action
    service.broadcast(key, value);

    // Assert
    obs.subscribe(data => {
      expect(data).toBeTruthy();
    });
  });

  it('on subscribe', () => {
    // Arrange
    const key = 'test-broadcast';
    const value = { result: true };

    // Action
    const obs = service.on(key);

    // Assert
    service.broadcast(key, value);
    obs.subscribe(data => {
      expect(data).toBeTruthy();
    });
  });
});
