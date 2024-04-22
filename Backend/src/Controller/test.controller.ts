import { Request, Response } from "express";

const tst = (req:Request, res: Response) =>{

    res.status(200).json({
        out:"test aplication"
    });
}

export default tst;