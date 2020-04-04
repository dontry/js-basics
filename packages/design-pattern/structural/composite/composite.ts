// Interface component
export interface Profile {
  showDetails(): void;
}

export interface Employee extends Profile {
  getId(): number;
}

// Leaf
export class Developer implements Employee {
  constructor(
    private name: string,
    private id: number,
    private position: string
  ) {}

  public showDetails(): void {
    console.log(`${this.id}:  ${this.name}`);
  }

  public getId(): number {
    return this.id;
  }
}

export class CompanyDirectory implements Profile {
  private employees: Map<number, Employee> = new Map<number, Employee>();

  add(employee: Employee) {
    this.employees.set(employee.getId(), employee);
  }

  remove(id: number) {
    this.employees.delete(id);
  }

  showDetails(): void {
    this.employees.forEach((employee) => {
      employee.showDetails();
    });
  }
}
