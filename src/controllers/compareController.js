import { formatRelativeWithOptions } from 'date-fns/fp';
import { 
  listCorpinCompare, 
  getCorpinCompare, 
  postCompareandOptionCount,
  postMyCompareandOptionCount,
  getCompare,
  getMyCompare,
  deleteCompareCorp,
  deleteMyCompareCorp,
} from "../services/compareService.js";
    

export async function listCorpinCompareController(req, res, next){
  try{
    const {offset = 0, limit = 10, order="investment_desc",search} = req.query;
    const data = {offset, limit, order,search};
    const compareCorps = await listCorpinCompare(data); 
    return res.send(compareCorps);
  }
  catch(e){
    next(e);  
  }
}

export async function getCorpinCompareController(req, res, next){
try{
  const { id } = req.params;
  const compareCorp = await getCorpinCompare(id);
  return res.send(compareCorp);
  }
  catch(e){
    next(e);
  } 
}


export async function getCompareandOptionCountController(req, res, next){
try{
  const { id  } = req.params;
  const compare = await postCompareandOptionCount(id);
  return res.send(compare);
  }
  catch(e){
    next(e);
  } 
}

export async function getMyCompareandOptionCountController(req, res, next){
  try{
  const { id  } = req.params;
  const compare = await postMyCompareandOptionCount(id);
  return res.send(compare);
  }
  catch(e){
    next(e);
  }
}

export async function getCompareController(req, res, next){
  try{
    const { offset = 0, limit = 10, order = "investment_desc" } = req.query;
    const data = {offset, limit, order};
    const compareAndCorps = await getCompare(data);
    return res.send(compareAndCorps);
  }
  catch(e){
    next(e);
  }
}

export async function getMyCompareController(req, res, next){
  try{
    const { offset = 0, limit = 10, order = "investment_desc" } = req.query;
    const data = {offset, limit, order};
    const compareAndCorps = await getMyCompare(data);
    return res.send(compareAndCorps);
  }
  catch(e){
    next(e);
  }
}



export async function deleteCompareCorpController(req, res, next){
  try{
    const { id  } = req.params;
    const compare = await deleteCompareCorp(id);
    return res.send(compare);
  }
  catch(e){
    next(e);
  }
}



export async function deleteMyCompareCorpController(req, res, next){
  try{
    const { id  } = req.params;
    const compare = await deleteMyCompareCorp(id);
    return res.send(compare);
  }
  catch(e){
    next(e);
  }
}

