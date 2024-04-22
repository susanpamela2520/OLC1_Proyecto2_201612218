import { ICallable } from "../Abstract/ICallable";
import { IStatement } from "../Abstract/IStatement";
import { Datatype } from "../Enums/EnumDatatype";
import { IParam } from "../Abstract/IParam";
import { SymbolTable } from "../SymTable/SymbolTable";
import { Guid } from "typescript-guid";

export class FunctionDef implements ICallable {
  constructor(
    public id: string,
    public params: IParam[] | undefined,
    public datatype: Datatype,
    public body: IStatement[],
    public line: number,
    public column: number
  ) {}

  uuid: string = Guid.create().toString().replace(/-/gm, ""); // Unique identifier
  graph(): string {
    let str: string = `node${this.uuid} [label="FunctionDef"];\n`;
    str += `node${this.uuid} -> node${this.uuid}id;\n node${this.uuid}id[label="${this.id}"];\n`;

    this.body.forEach((statement) => {
      str += `node${this.uuid} -> node${statement.uuid};\n`;
      str += statement.graph();
    });
    return str;
  }

  execute(sym_table: SymbolTable): void {
    sym_table.addFunction(this);
  }
}