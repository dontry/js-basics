import fs from "fs";

interface DataSource {
  writeData(data: string): void;
  readData(): void;
}

export class FileDataSource implements DataSource {
  constructor(private filepath: string) {}

  writeData(data: string): void {
    console.log(`Writing data to ${this.filepath}`);
    fs.writeFileSync(this.filepath, data);
  }

  readData(): string {
    return fs.readFileSync(this.filepath).toString();
  }
  get __data(): string {
    return fs.readFileSync(this.filepath).toString();
  }
}

class DataSourceDecorator implements DataSource {
  constructor(protected delegate: FileDataSource) {}

  writeData(data: string): void {
    this.delegate.writeData(data);
  }

  readData(): string {
    return this.delegate.readData();
  }

  getFileData(): string {
    return this.delegate.__data;
  }
}

export class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    const encryptedData = "Encryption: " + data;
    super.writeData(encryptedData);
  }

  readData(): string {
    const encryptedData = this.delegate.readData();
    const decryptedData = encryptedData.replace("Encryption: ", "");
    return decryptedData;
  }
}

export class CompressionDecorator extends DataSourceDecorator {
  writeData(data: string): void {
    const compressedData = "Compression: " + data;
    super.writeData(compressedData);
  }

  readData(): string {
    const compressedData = this.delegate.readData();
    const depressedData = compressedData.replace("Compression: ", "");
    return depressedData;
  }
}
