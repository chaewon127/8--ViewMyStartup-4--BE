import investmentService from "../services/investmentService.js";

const investmentController = {
  //투자 현황 조회
  getInvestments: async (req, res) => {
    const {
      offset = 0,
      limit = 10,
      sortBy = "virtual",
      order = "Highest",
    } = req.query;
    let orderBy;
    switch (order) {
      case "Highest":
        orderBy = "desc";
        break;
      case "Lowest":
        orderBy = "asc";
        break;
      default:
        orderBy = "desc";
    }
    const investments = await investmentService.getInvestments({
      offset,
      limit,
      sortBy,
      order: orderBy,
    });
    res.send({ success: true, ...investments });
  },

  //투자자 코멘트 리스트 조회
  getInvestmentComments: async (req, res) => {
    const { offset = 0, limit = 5 } = req.query;
    const investmentComments = await investmentService.getInvestmentComments({
      offset,
      limit,
    });
    res.send({ investmentComments });
  },

  // //투자자 코멘트 상세 조회
  // getInvestmentById: async (req, res) => {
  //   const { id } = req.params;
  //   const investment = await investmentService.getInvestmentById(id);
  //   res.send({ investment });
  // },

  //투자자 코멘트 글 작성
  createInvestmentComment: async (req, res) => {
    const { name, amount, comment, password, passwordConfirm } = req.body;
    const investmentComment = await investmentService.createInvestmentComment({
      name,
      amount,
      comment,
      password,
      passwordConfirm,
    });
    res.status(201).send({ message: "투자 완료", investmentComment });
  },

  //투자자 코멘트 글 수정
  updateInvestmentComment: async (req, res) => {
    const { id } = req.params;
    const { name, amount, comment, password } = req.body;
    const updatedInvestmentComment =
      await investmentService.updateInvestmentComment(id, {
        name,
        amount,
        comment,
        password,
      });
    res.send({
      message: "Updated successfully",
      investmentComment: updatedInvestmentComment,
    });
  },

  //투자자 코멘트 글 삭제
  deleteInvestmentComment: async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    await investmentService.deleteInvestmentComment(id, password);
    res.send({ message: "Deleted successfully" });
  },

  //투자 기록 저장
  // saveAccount: async (req, res) => {
  //   const { userId, corpId, name, amount, comment } = req.body;
  //   const account = await investmentService.saveAccount({
  //     userId,
  //     corpId,
  //     name,
  //     amount,
  //     comment,
  //   });
  //   res.status(201).send({ message: "Investment record saved", account });
  // },
};

export default investmentController;
