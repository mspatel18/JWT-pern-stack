import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface RegisterProps {
  setAuth: (value: boolean) => void;
}
const Register: React.FC<RegisterProps> = ({ setAuth }) => {
  // const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      //   console.log(parseRes);
      //   toast(parseRes.token);
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="font-bold text-3xl">Register</h1>
      <form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="p-2"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="p-2"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-2"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" className=" bg-blue-500 hover:border-gray-400">
          Submit
        </button>
      </form>
      <div className="mt-12">Already have account?</div>
      <a href="/login">
        <button>Login</button>
      </a>
    </div>
  );
};

export default Register;
