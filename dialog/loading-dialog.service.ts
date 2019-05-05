import { Injectable, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingDialogService {
  modalRef: BsModalRef;
  private closeSubject: Subject<{ cancelled: boolean; data: any }>;

  constructor(private modalService: BsModalService) {}

  open(template: any, option?: ModalOptions) {
    this.modalRef = this.modalService.show(template, option);
  }

  openWithData(template: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modalRef = this.modalService.show(template);
      const comp = this.modalRef.content;
      data.forEach(item => {
        comp[item.key] = item.value;
      });
      comp.onCloseCallback = confirmed => {
        resolve(confirmed);
      };
    });
  }

  close() {
    this.modalRef.hide();
  }

  // Simplified open-with-data and close-with-data methods
  show(template: any, data?: any): Promise<{ cancelled: boolean; data?: any }> {
    this.modalRef = this.modalService.show(template, { initialState: data });
    this.closeSubject = new Subject<{ cancelled: boolean; data: any }>();
    return this.closeSubject.toPromise();
  }

  hide(cancelled: boolean, data?: any) {
    this.modalRef.hide();
    this.closeSubject.next({ cancelled, data });
    this.closeSubject.complete();
  }
}
