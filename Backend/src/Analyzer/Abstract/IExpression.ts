import { SymbolTable } from "../SymTable/SymbolTable";
import { IGraphical } from "./IGraphical";
import { IReturnEval } from "./IReturnEval";
import { ITabulable } from "./ITabulable";

export interface IExpression extends ITabulable, IGraphical {
  evaluate(sym_table: SymbolTable): IReturnEval | undefined;
}