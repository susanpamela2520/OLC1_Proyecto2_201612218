import { Guid } from "typescript-guid";
import { IExpression } from "../Abstract/IExpression";
import { IStatement } from "../Abstract/IStatement";
import { SymbolTable } from "../SymTable/SymbolTable";

export class Cout implements IStatement {
    constructor(
      private text: IExpression,
      public line: number,
      public column: number
    ) {}

    uuid: string = Guid.create().toString().replace(/-/gm, ""); // Unique identifier
    graph(): string {
      let str: string = `node${this.uuid} [label="Print"];\n`;
      str += `node${this.uuid} -> node${this.text.uuid};\n`;
      str += this.text.graph();
      return str;
    }

    execute(sym_table: SymbolTable): void {
        console.log('Enter to add symbol table');
        const eval_value = this.text.evaluate(sym_table);
        sym_table.addConsole(eval_value!.value.toString());
      }
}