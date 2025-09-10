import { formatRelativeWithOptions } from 'date-fns/fp';
import { 
  getCorpTotal
} from "../services/compareTotalService.js";


export async function getCorpTotalController(req, res, next){
  try{ 
    const { offset=0, limit = 10, order='my_desc' } = req.query;
    const data = { offset , limit, order}
    const corpsTotal = await getCorpTotal(data);
    res.send(corpsTotal);
  }
  catch(e){
    next(e)
  }
}