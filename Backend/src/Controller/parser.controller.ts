import { TsLanguageParser } from "../Analyzer/ts-parser";
import { Request, Response } from "express";
import { IStatement } from "../Analyzer/Abstract/IStatement";
import { SymbolTable } from "../Analyzer/SymTable/SymbolTable";
import { Method } from "../Analyzer/Statements/Method";
import { FunctionDef } from "../Analyzer/Statements/FunctionDef";
import { SemanticErrorEx } from "../Analyzer/Exceptions/SemanticErrorEx";
import { LexicalErrorEx } from "../Analyzer/Exceptions/LexicalErrorEx";
import { SyntaxErrorEx } from "../Analyzer/Exceptions/SyntaxErrorEx";
import { Global } from "../Analyzer/SymTable/Global";
import { Execute } from "../Analyzer/Statements/Execute";

const parser = (req: Request, res: Response) => {
  Global.clearTable(); // Clear the symbol table before parsing the new code
  const parser = new TsLanguageParser();
  parser!.parseError = (_err: any, hash: any) => {
    throw new SyntaxErrorEx(
      `No se esperaba el token: ${hash.token}, Se esperaba: ${hash.expected}`,
      hash.loc.first_line,
      hash.loc.last_column
    );
  };

  const { text } = req.body;
  try {
    const ast: IStatement[] = parser.parse(text);

    const table = new SymbolTable(undefined, "global");

    ast.forEach((statement) => {
      if (statement instanceof Method) statement.execute(table);
      else if (statement instanceof FunctionDef) statement.execute(table);
    });

    ast.find((statement) => statement instanceof Execute)?.execute(table); // Execute the main method

    const cout = table.printConsole();

    res.status(200).json({
      cout,
      table: Global.getTable(),
    });
  } catch (error: unknown) {
    if (error instanceof SemanticErrorEx) {
      res.status(200).json({
        cout: error.message,
      });
    } else if (error instanceof LexicalErrorEx) {
      res.status(200).json({
        cout: error.message,
      });
    } else if (error instanceof SyntaxErrorEx) {
      res.status(200).json({
        cout: error.message,
      });
    } else {
      console.error(error);
      throw error;
    }
  }
};

export default parser;