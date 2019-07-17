import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Injectable()
export class ModalService {
  openedModal: BsModalRef[] = [];

  constructor(
    private modal: BsModalService
  ) { }

  open(modalComponent: any, customClass?: string, isStatic: boolean = false, data?: object, animated: boolean = true): BsModalRef {
    const modalRef = this.modal.show(modalComponent, {
      class: customClass,
      initialState: data,
      backdrop: isStatic ? 'static' : true,
      keyboard: isStatic ? false : true,
      animated: animated
    });

    this.openedModal.push(modalRef);

    return modalRef;
  }

  close(modalTemplate?: object) {
    if (this.openedModal.length) {
      this.openedModal.forEach((modalRef, index) => {
        if (modalRef.content.constructor == modalTemplate || modalRef.content == modalTemplate) {
          modalRef.hide();
          this.openedModal.splice(index, 1);
        }
      });
    }
  }

  closeAll() {
    if (this.openedModal.length) {
      this.openedModal.forEach(modalRef => {
        modalRef.hide();
      });
      this.openedModal = [];
    }
  }
}
