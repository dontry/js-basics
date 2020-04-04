class Database {
  private static instance: Database;
  // The singleton's constructor should always be private to
  // prevent direct construction calls with the `new`
  // operator.
  private constructor() {}

  public static getInstance(): Database {
    if (Database.instance === null) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public query(sql: string): string {
    return `result of sql()`;
  }
}
