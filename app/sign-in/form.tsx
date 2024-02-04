"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';


export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Your email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mt-3 mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>

      <div className="mt-3 text-white bg-gray-700 font-medium text-sm leading-snug uppercase rounded shadow-md items-center justify-center w-full flex hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
        <button
            type="submit"
            className="inline-block px-7 py-4 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            disabled={loading}
        >
            {loading ? "loading..." : "Sign In"}
        </button>
      </div>


      <div className="flex items-center justify-center my-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <a
          // className="bg-indigo-600 rounded-full p-2 hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 transition duration-150 ease-in-out"
          className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 transition duration-150 ease-in-out"
          onClick={() => signIn("google", { callbackUrl: '/' })}
          role="button"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '24px', color: 'white' }} />
          </div>
        </a>
        <a
          // className="bg-indigo-600 rounded-full p-2 hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-800 transition duration-150 ease-in-out"
          className="bg-gray-700 rounded-full p-2 hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 transition duration-150 ease-in-out"
          onClick={() => signIn("github", { callbackUrl: '/' })}
          role="button"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faGithub} style={{ fontSize: '24px', color: 'white' }} />
          </div>
        </a>
      </div>
    </form>
  );
};
