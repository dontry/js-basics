import fs from "fs";
import {
  FileDataSource,
  CompressionDecorator,
  EncryptionDecorator
} from "./decorator";

const FILE_PATH = "./file1.txt";

describe("FileDataSource", () => {
  let fileDataSource: FileDataSource;
  beforeEach(() => {
    fileDataSource = new FileDataSource(FILE_PATH);
  });
  afterEach(done => {
    fs.unlink(fs.realpathSync(FILE_PATH), () => {
      done();
    });
  });
  it("should write data", () => {
    fileDataSource.writeData("xxxx");
    expect(fileDataSource.__data).toBe("xxxx");
  });

  it("should read data", () => {
    fileDataSource.writeData("xxxx");
    expect(fileDataSource.readData()).toBe("xxxx");
  });
});

describe("CompressionDecorator", () => {
  let compressionDecorator: CompressionDecorator;
  beforeEach(() => {
    const fileDataSource = new FileDataSource(FILE_PATH);
    compressionDecorator = new CompressionDecorator(fileDataSource);
  });

  afterEach(done => {
    fs.unlink(fs.realpathSync(FILE_PATH), () => {
      done();
    });
  });

  it("should compressed and write data", () => {
    compressionDecorator.writeData("aaaa");
    expect(compressionDecorator.getFileData().search(/^Compression:/)).toBe(0);
  });

  it("should depressed and read data", () => {
    compressionDecorator.writeData("aaaa");
    expect(compressionDecorator.readData()).toBe("aaaa");
  });
});

describe("EncryptionDecorator", () => {
  let encryptionDecorator: EncryptionDecorator;
  beforeEach(() => {
    const fileDataSource = new FileDataSource(FILE_PATH);
    encryptionDecorator = new EncryptionDecorator(fileDataSource);
  });

  afterEach(done => {
    fs.unlink(fs.realpathSync(FILE_PATH), () => {
      done();
    });
  });

  it("should encrypt and write data", () => {
    encryptionDecorator.writeData("aaaa");
    expect(encryptionDecorator.getFileData().search(/^Encryption:/)).toBe(0);
  });

  it("should decrypt and read data", () => {
    encryptionDecorator.writeData("aaaa");
    expect(encryptionDecorator.readData()).toBe("aaaa");
  });
});
