import { TestBed } from '@angular/core/testing';

import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { instance, mock } from 'ts-mockito';
import { LoadingDialogService } from './loading-dialog.service';

@Component({
  template: `
    <div>this is a test component</div>
  `
})
class ContentDialogComponent implements OnInit {
  confirmData: any;
  ngOnInit(): void {}
}

describe('LoadingDialogService', () => {
  let modalService: BsModalService;
  let service: LoadingDialogService;

  beforeEach(() => {
    modalService = mock(BsModalService);

    TestBed.configureTestingModule({
      declarations: [ContentDialogComponent],
      imports: [ModalModule],
      providers: [{ provide: BsModalService, useValue: instance(modalService) }, LoadingDialogService]
    });

    service = new LoadingDialogService(modalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    it('open a dialog with data', () => {
      // Arrange
      const template = new Document();
      template.createElement('div');
      const modelRef = { content: template };

      spyOn(modalService, 'show').and.returnValue(modelRef);

      // Action
      service.open(template);

      // Assert
      expect(service.modalRef).not.toBeNull();
      expect(modalService.show).toHaveBeenCalled();
    });
  });

  describe('openWithData', () => {
    it('openWithData binds data to the template.', () => {
      // Arrange
      const template = new ContentDialogComponent();

      const data = [
        {
          key: 'confirmData',
          value: {
            title: 'Confirm Signature',
            message: 'Please confirm Signature with your PIN',
            prompt: false
          }
        }
      ];

      const modelRef = { content: template };

      spyOn(modalService, 'show').and.returnValue(modelRef);
      // Action
      service.openWithData(template, data);

      // Assert
      expect(service.modalRef).not.toBeNull();
      expect(service.modalRef.content.confirmData).not.toBeNull();
      expect(modalService.show).toHaveBeenCalled();
    });
  });

  describe('close', () => {
    it('close the modal after show', () => {
      // Arrange
      const template = new ContentDialogComponent();
      service.modalRef = new BsModalRef();
      service.modalRef.content = template;

      spyOn(service.modalRef, 'hide');

      // Action
      service.close();

      // Assert
      expect(service.modalRef.hide).toHaveBeenCalled();
    });
  });

  describe('when show()', () => {
    it('should open a dialog and return a promise', () => {
      // arrange
      const template = new Document();
      template.createElement('div');
      const modelRef = { content: template };
      spyOn(modalService, 'show').and.returnValue(modelRef);
      // action
      const promise = service.show(template);
      // assert
      expect(service.modalRef).not.toBeNull();
      expect(modalService.show).toHaveBeenCalled();
      expect(promise).toBeDefined();
    });

    it('should open a dialog with data and return a promise', () => {
      // arrange
      const template = new Document();
      template.createElement('div');
      const modelRef = { content: template };
      spyOn(modalService, 'show').and.returnValue(modelRef);
      const data = { key: 'value' };
      // action
      const promise = service.show(template, data);
      // assert
      expect(service.modalRef).not.toBeNull();
      expect(modalService.show).toHaveBeenCalledWith(template, { initialState: data });
      expect(promise).toBeDefined();
    });
  });

  describe('when hide()', () => {
    it('should resolve the promise after closing the modal', async () => {
      // arrange
      const template = new ContentDialogComponent();
      const modalRef = new BsModalRef();
      spyOn(modalRef, 'hide');
      spyOn(modalService, 'show').and.returnValue(modalRef);
      const data = { key: 'value' };

      // action
      const promise = service.show(template, data);
      service.hide(true, data);

      // assert
      expect(service.modalRef.hide).toHaveBeenCalled();
      expect(service);
      await promise.then(resolve => {
        expect(resolve.cancelled).toBe(true);
        expect(resolve.data).toBe(data);
      });
    });
  });
});
