import { Locator, Page } from "@playwright/test";

export class UploadComponent {
  private readonly page: Page;
  readonly uploadSelectLoc: string;
  readonly uploadButtonLoc: Locator;
  readonly uploadSuccessResLoc: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadSelectLoc = ("input#upfile_1");
    this.uploadButtonLoc = page.locator("#upload_1");
    this.uploadSuccessResLoc = page.locator("#wfu_messageblock_header_1_1");
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles(
      this.uploadSelectLoc,
      filePath
    );
    await this.uploadButtonLoc.click();
  }
}
