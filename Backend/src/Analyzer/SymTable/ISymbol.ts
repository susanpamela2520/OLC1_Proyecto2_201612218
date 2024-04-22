import { Datatype } from "../Enums/EnumDatatype";

export interface ISymbol {
  id: string;
  datatype: Datatype;
  line: number;
  column: number;
  value: number | string | boolean;
}