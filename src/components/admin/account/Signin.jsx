import React, { useState } from "react";
import Input from "../Input";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import { auth } from "../../../context/fb";
import { updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { MdEmail, MdFace } from "react-icons/md";

function Signin() {
  const [adminInfo, setAdminInfo] = useState({
    email: "",
    ssKey: "",
    f_name: "",
  });
  const [pass, setPass] = useState("");
  const [loginStat, setStat] = useState(null);
  const { user, setuser, setTrigger } = useAuth();

  function handleInfo(e) {
    setStat(null);
    setAdminInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }

  const DB_URL = import.meta.env.VITE_DB_URL;
  const API_VERSION = import.meta.env.VITE_API_VERSION;

  async function getSecretKey(e) {
    e.preventDefault();
    await axios
      .get(`${DB_URL}/${API_VERSION}/auth`, {
        params: {
          search: adminInfo.ssKey,
        },
      })
      .then((res) => {
        setStat(res.data);
        if (res.data?.success) {
          signInWithEmailAndPassword(auth, adminInfo.email, pass)
            .then((res) => {
              setuser(res.user);
              setTrigger(true);
              setStat(res.data);
            })
            .catch((err) => {
              setStat({ success: false, message: "Failed to login" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setStat(err?.response?.data);
      });
  }

  return (
    <div className="w-full grid place-items-center p-3">
      {!user?.refreshToken ? (
        <form
          className="bg-white rounded-2xl shadow-lg text-black space-y-2 p-10 w-full mx-2 max-w-sm my-10"
          onSubmit={getSecretKey}
        >
          <h2 className="text-center font-bold text-3xl lg:text-4xl mb-10">
            Sign In
          </h2>

          <Input
            id={"email"}
            name={"email"}
            title={"Email address"}
            type={"email"}
            required={true}
            setValue={handleInfo}
            value={adminInfo.email}
            placeholder={"Email Address"}
          />
          <Input
            id={"pass"}
            name={"password"}
            title={"Password"}
            type={"password"}
            required={true}
            setValue={(e) => setPass(e.target.value)}
            value={pass}
            placeholder={"Password"}
          />
          <Input
            id={"s_key"}
            name={"ssKey"}
            title={"Secret Key"}
            type={"text"}
            required={true}
            setValue={handleInfo}
            value={adminInfo.ssKey}
            placeholder={"Secret Key"}
            help={true}
            helpTitle={`Your secret key is totally different from your password.\nYou may get it from your office..`}
          />

          <button
            className="w-full btn border-none bg-blue-600 hover:bg-blue-700 text-white dm-sans-medium"
            type="submit"
            required={true}
          >
            Sign In
          </button>
          <div>
            {loginStat != null &&
              (loginStat?.success ? (
                <div className="bg-green-100 text-green-600 dm-sans-medium ring-1 ring-green-600 rounded-md px-3 py-2">
                  {loginStat?.message}
                </div>
              ) : (
                <div className="bg-rose-100 text-rose-600 dm-sans-medium ring-1 ring-rose-600 rounded-md px-3 py-2">
                  {loginStat?.message}
                </div>
              ))}
          </div>
          <p className="text-right text-sm text-gray-700/60 dm-sans-normal tracking-tight">
            Not an admin user?{" "}
            <a
              className="text-blue-600 font-medium hover:underline dm-sans-bold"
              href="/login"
            >
              Login
            </a>{" "}
            to student
          </p>
        </form>
      ) : (
        <div
          className="bg-white rounded-2xl shadow-lg text-black space-y-3 p-10
          w-full mx-2 max-w-sm my-10 grid"
        >
          <div className="inline-flex items-center gap-2 text-slate-400 ring p-2 rounded-md">
            <MdFace className="text-blue-400" />
            {user?.displayName ? (
              user?.displayName
            ) : (
              <div className="flex gap-2 items-center ">
                <Input
                  id={"addName"}
                  name={"f_name"}
                  value={adminInfo.f_name}
                  setValue={handleInfo}
                  placeholder={"Enter full name"}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    if (adminInfo.f_name.length > 2) {
                      try {
                        updateProfile(user, {
                          displayName: adminInfo.f_name,
                        }).then(() => {
                          setTrigger(true);
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                >
                  Update
                </button>
              </div>
            )}
          </div>
          <div className="inline-flex items-center gap-2 text-slate-400 ring p-2 rounded-md">
            <MdEmail className="text-blue-400" />
            {user?.email}
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
