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

export async function listCorpinCompareController(req, res) {
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

export async function getCorpinCompareController(req, res) {
  const { id } = req.params;
  const compareCorp = await getCorpinCompare(id);
  res.send(compareCorp);
}

export async function getCompareandOptionCountController(req, res) {
  const { id } = req.params;
  const compare = await postCompareandOptionCount(id);
  res.send(compare);
}

export async function getMyCompareandOptionCountController(req, res) {
  const { id } = req.params;
  const compare = await postMyCompareandOptionCount(id);
  res.send(compare);
}

export async function postOptionCountController(req, res) {
  const { id } = req.params;
  const compare = await postOptionCount(id);
  res.send(compare);
}

export async function postMyOptionCountController(req, res) {
  const { id } = req.params;
  const compare = await postMyOptionCount(id);
  res.send(compare);
}

export async function getCompareController(req, res) {
  const { offset = 0, limit = 10, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compareAndCorps = await getCompare(data);
  res.send(compareAndCorps);
}

export async function getMyCompareController(req, res) {
  const { offset = 0, limit = 10, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compareAndCorps = await getMyCompare(data);
  res.send(compareAndCorps);
}

export async function deleteCompareCorpController(req, res) {
  const compare = await deleteCompareCorp();
  res.send(compare);
}

export async function deleteMyCompareCorpController(req, res) {
  const compare = await deleteMyCompareCorp();
  res.send(compare);
}

export async function deleteMyCompareandOptionCountController(req, res, next) {
  const { id } = req.params;
  const compare = await deleteMyCompareandOptionCount(id);
  return res.send(compare);
}

export async function deleteCompareandOptionCountController(req, res, next) {
  const { id } = req.params;
  const compare = await deleteCompareandOptionCount(id);
  return res.send(compare);
}

export async function getMyCompareAndMyCompareController(req, res) {
  const compare = await getMyCompareAndMyCompare();
  res.send(compare);
}

export async function getRankingCompareController(req, res) {
  const { offset = 0, limit = 6, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compare = await getRankingCompare(data);
  res.send(compare);
}

export async function getOrderCompareController(req, res) {
  const { offset = 0, limit = 6, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compare = await getOrderCompare(data);
  res.send(compare);
}

export async function getTotalCompareController(req, res) {
  const { offset = 0, limit = 6, order = "investment_desc" } = req.query;
  const data = { offset, limit, order };
  const compare = await getTotalCompare(data);
  res.send(compare);
}
