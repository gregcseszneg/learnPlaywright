import { Page } from "@playwright/test";
import { UploadComponent } from "../components/upload.component";

export class CartPage {
  private readonly page: Page;
  readonly uploadComponent: UploadComponent;

  constructor(page: Page) {
    this.page = page;
    this.uploadComponent = new UploadComponent(page);
  }
}
