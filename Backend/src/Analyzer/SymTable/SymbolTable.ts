
import { ICallable } from "../Abstract/ICallable";
//import { ISymArray } from "../Abstract/ISymArray";

import { Datatype } from "../Enums/EnumDatatype";
import { SemanticErrorEx } from "../Exceptions/SemanticErrorEx";
//import fnParseArrayTypes from "../Functions/fnParseArrayTypes";
import { Global } from "./Global";

import { ISymbol } from "./ISymbol";

export class SymbolTable {
  public symbols: ISymbol[] = [];
  private console: string[] = [];
  private functions: ICallable[] = [];
  //private arrays: ISymArray[] = [];
  
  public constructor(
    private parent: SymbolTable | undefined,
    public env: string
  ) {
    // console.log("[DEBUG]\t", `Creating Symbol Table: ${env}`);
    Global.tableList.push(this);
  }

  private debugTable(): void {
    // console.log("[DEBUG]\t", "Symbol Table:");
    // console.log("[TABLE]\t");
    this.symbols.forEach((symbol) => {
      // console.log("[TABLE]\t", symbol.id, symbol.value);
    });
  }

  private debugFunctions(): void {
    // console.log("[DEBUG]\t", "Functions:");
    // console.log("[FUNCTIONS]\t");
    this.functions.forEach((func) => {
      // console.log("[FUNCTIONS]\t", func.id);
    });
  }

  

  public addSymbol(symbol: ISymbol): void {
    // console.log("[DEBUG]\t", `Adding symbol ${symbol.id} = ${symbol.value}`);
    this.debugTable();
    if (this.symbols.find((s) => s.id === symbol.id) !== undefined) {
      throw new SemanticErrorEx(
        `Symbol ${symbol.id} already exists`,
        symbol.line,
        symbol.column
      );
    } else {
      this.symbols.push(symbol);
    }
    // console.log("[DEBUG]\t", `Symbol ${symbol.id} added`);
    this.debugTable();
  }

  public getSymbol(
    id: string,
    line: number,
    column: number
  ): ISymbol | undefined {
    const result = this.symbols.find((symbol) => symbol.id === id);

    if (result === undefined && this.parent !== undefined) {
      return this.parent.getSymbol(id, line, column);
    } else if (result === undefined) {
      throw new SemanticErrorEx(`Symbol ${id} not found`, line, column);
    } else {
      return result;
    }
  }

  public updateSymbol(
    id: string,
    value: string | boolean | number,
    line: number,
    column: number
  ): void {
    // console.log("[DEBUG]\t", `Updating symbol ${id} = ${value}`);
    this.debugTable();
    const symbol = this.getSymbol(id, line, column);

    if (symbol) {
      symbol.value = value;
    } else {
      throw new SemanticErrorEx(`Symbol ${id} not found`, undefined, undefined);
    }
    // console.log("[DEBUG]\t", `Symbol ${id} updated`);
    this.debugTable();
  }

  public addConsole(text: string): void {
    if (this.parent === undefined) {
      this.console.push(text);
    } else {
      this.parent.addConsole(text);
    }
  }

  public printConsole(): string {
    let result = "";
    this.console.forEach((text) => {
      // console.log("[CONSOLE]\t", text);
      result += text;
    });

    return result;
  }

  public addFunction(func: ICallable): void {
     console.log("[DEBUG]\t", `Adding function ${func.id}`);
    this.debugFunctions();
    if (this.parent === undefined) {
      this.functions.push(func);
    } else {
      this.parent.addFunction(func);
    }
  }

  public getFunction(id: string): ICallable {
    if (this.parent === undefined) {
      return this.functions.find((func) => func.id === id)!;
    } else {
      return this.parent.getFunction(id);
    }
  }

  
    

    // console.log("[DEBUG]\t", `Array ${id} created`);
    
  }

