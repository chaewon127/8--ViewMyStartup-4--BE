import investmentService from "../services/investmentService.js";

const investmentController = {
  //투자자 코멘트 리스트 조회
  getInvestments: async (req, res) => {
    const { offset = 0, limit = 5 } = req.query;
    const investments = await investmentService.getInvestments({
      offset,
      limit,
    });
    res.send({ investments });
  },

  //투자자 코멘트 상세 조회
  getInvestmentById: async (req, res) => {
    const { id } = req.params;
    const investment = await investmentService.getInvestmentById(id);
    res.send({ investment });
  },

  //투자자 코멘트 글 작성
  createInvestment: async (req, res) => {
    const { name, amount, comment, password } = req.body;
    const investment = await investmentService.createInvestment({
      name,
      amount,
      comment,
      password,
    });
    res.status(201).send({ message: "투자 완료", investment });
  },

  //투자자 코멘트 글 수정
  updateInvestment: async (req, res) => {
    const { id } = req.params;
    const { name, amount, comment, password } = req.body;
    const updatedInvestment = await investmentService.updateInvestment(id, {
      name,
      amount,
      comment,
      password,
    });
    res.send({
      message: "Updated successfully",
      investment: updatedInvestment,
    });
  },

  //투자자 코멘트 글 삭제
  deleteInvestment: async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    await investmentService.deleteInvestment(id, password);
    res.send({ message: "Deleted successfully" });
  },
};

export default investmentController;
