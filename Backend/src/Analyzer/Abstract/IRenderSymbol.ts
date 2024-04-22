import { Datatype } from "../Enums/EnumDatatype";

export interface IRenderSymbol {
  id: string;
  datatype: Datatype;
  line: number;
  column: number;
  env: string;
  value: string | number | boolean;
}