import { formatRelativeWithOptions } from "date-fns/fp";
import {
  listCorpinCompare,
  getCorpinCompare,
  postCompareandOptionCount,
  postMyCompareandOptionCount,
  getCompare,
  getMyCompare,
  deleteCompareCorp,
  deleteMyCompareCorp,
  getMyCompareAndMyCompare,
  getRankingCompare,
  getOrderCompare,
  getTotalCompare,
} from "../services/compareService.js";

export async function listCorpinCompareController(req, res, next) {
  const {
    offset = 0,
    limit = 10,
    order = "investment_desc",
    search,
  } = req.query;
  const data = { offset, limit, order, search };
  const compareCorps = await listCorpinCompare(data);
  res.send(compareCorps);
}

export async function getCorpinCompareController(req, res, next) {
  const { id } = req.params;
  const compareCorp = await getCorpinCompare(id);
  res.send(compareCorp);
}

export async function getCompareandOptionCountController(req, res, next) {
  const { id } = req.params;
  const compare = await postCompareandOptionCount(id);
  res.send(compare);
}

export async function getMyCompareandOptionCountController(req, res, next) {
  const { id } = req.params;
  const compare = await postMyCompareandOptionCount(id);
  res.send(compare);
}

export async function getCompareController(req, res, next) {
  const { offset = 0, limit = 10, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compareAndCorps = await getCompare(data);
  res.send(compareAndCorps);
}

export async function getMyCompareController(req, res, next) {
  const { offset = 0, limit = 10, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compareAndCorps = await getMyCompare(data);
  res.send(compareAndCorps);
}

export async function deleteCompareCorpController(req, res, next) {
  const compare = await deleteCompareCorp();
  res.send(compare);
}

export async function deleteMyCompareCorpController(req, res, next) {
  const compare = await deleteMyCompareCorp();
  res.send(compare);
}

export async function getMyCompareAndMyCompareController(req, res, next) {
  try {
    const compare = await getMyCompareAndMyCompare();
    return res.send(compare);
  } catch (e) {
    next(e);
  }
}

export async function getRankingCompareController(req, res, next) {
  try {
    const { offset = 0, limit = 6, order = "investment_desc" } = req.query;
    const data = { offset, limit, order };
    const compare = await getRankingCompare(data);
    return res.send(compare);
  } catch (e) {
    next(e);
  }
}

export async function getOrderCompareController(req, res, next) {
  try {
    const { offset = 0, limit = 6, order = "investment_desc" } = req.query;
    const data = { offset, limit, order };
    const compare = await getOrderCompare(data);
    return res.send(compare);
  } catch (e) {
    next(e);
  }
}

export async function getTotalCompareController(req, res, next) {
  try {
    const { offset = 0, limit = 6, order = "investment_desc" } = req.query;
    const data = { offset, limit, order };
    const compare = await getTotalCompare(data);
    return res.send(compare);
  } catch (e) {
    next(e);
  }
}
