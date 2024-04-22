import { Datatype } from "../Enums/EnumDatatype";

export interface IReturnEval {
  value: string | number | boolean;
  type: Datatype;
}