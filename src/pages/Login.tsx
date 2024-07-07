import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const [login, { data, error }] = useLoginMutation();

  console.log({ data, error });

  const onsubmit = async (data: object) => {
    console.log(data);
    const res = await login(data).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" {...register("password")} />
        <Button htmlType="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
