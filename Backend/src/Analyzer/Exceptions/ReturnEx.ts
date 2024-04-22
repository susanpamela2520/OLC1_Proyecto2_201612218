import { IReturnEval } from "../Abstract/IReturnEval";

export class ReturnEx extends Error {
  constructor(public value: IReturnEval | undefined) {
    super();
  }
}