import { formatRelativeWithOptions } from 'date-fns/fp';
import { listCorp, getCorp  } from '../services/corpService.js';

//전체 조회 컨트롤러 
export async function listCorpController(req, res, next) {
  try{
    const {offset = 0, limit =10, order="investment_desc", search} = req.query;
    const data = {offset, limit, order, search};
    const corps = await listCorp(data);
    return res.send(corps);
  }
  catch(e){
    next(e);
  }
};

// export async function getCorpController(req, res, next) {
//   try{
//     const { id } = req.params;
//     const corp = await getCorp(id);
//     return res.send(corp);

//   }
//   catch(e){
//     next(e);
//   }
// }

export async function getCorpController(req, res, next) {
  try{
    const { id } = req.params;
    const corp = await getCorp(id);
    return res.send(corp);

  }
  catch(e){
    next(e);
  }
}
