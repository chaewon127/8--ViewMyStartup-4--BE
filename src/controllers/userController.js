import userService from "../services/userService.js";

export const signup = async (req, res) => {
  const { name, email, password, gender, birth } = req.body;
  const user = await userService.signup({
    name,
    email,
    password,
    gender,
    birth,
  });
  res.status(201).send({ message: "회원가입 성공", user });
};

export const login = async (req, req) => {
  const { email, password } = req.body;
  const token = await userService.login({ email, password });
  res.status(200).send({ message: "로그인 성공", token });
};
