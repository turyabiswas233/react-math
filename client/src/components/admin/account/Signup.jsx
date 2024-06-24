import React, { useEffect, useState } from "react";
import Input from "../Input";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../context/fb";
import { useAuth } from "../../../context/auth";
import { MdEmail, MdFace } from "react-icons/md";
function Signup() {
  const { user, setuser, setTrigger } = useAuth();
  const [adminInfo, setAdminInfo] = useState({
    f_name: "",
    email: "",
    ssKey: "",
  });
  const [pass, setPass] = useState("");
  const [c_pass, setCPass] = useState("");
  const [loginStat, setStat] = useState(null);
  const [error, setErr] = useState("");
  function handleInfo(e) {
    setErr("");
    setStat(null);
    setAdminInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  const DB_URL = import.meta.env.VITE_DB_URL;
  const API_VERSION = import.meta.env.VITE_API_VERSION;

  useEffect(() => {
    setErr("");
  }, [pass, c_pass]);

  async function createAdmin(e) {
    e.preventDefault();
    setErr("");
    if (pass === c_pass)
      if (pass.length < 8)
        setErr("Password is too short. Minimum character 8 is required");
      else
        try {
          await axios
            .post(
              `${DB_URL}/${API_VERSION}/users/new`,
              {
                ssKey: adminInfo.ssKey,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              setStat(res.data);
              if (res.data.message === "Permission Granted") {
                createUserWithEmailAndPassword(
                  auth,
                  adminInfo.email,
                  pass
                ).then((userCred) => {
                  const user = userCred.user;
                  setuser(user);
                  setErr("");
                  setStat({
                    message: "Account successfully created",
                    success: true,
                  });
                });
              }
            })
            .catch((err) => {
              setStat(err?.response?.data);
              setErr("Failed to create Admin Account");
            });
        } catch (error) {
          setStat(error?.response?.data);
          setErr("Failed to create Admin Account");
        }
  }
  useEffect(() => {
    if (loginStat?.message === "Account successfully created") {
      setTrigger(true);
    }
  }, [loginStat]);
  return (
    <div className="w-full grid place-items-center p-3  ">
      {!user?.refreshToken ? (
        <form
          className="bg-white rounded-2xl shadow-lg text-black space-y-2 p-10 w-full mx-2 max-w-sm my-10"
          onSubmit={createAdmin}
        >
          <h2 className="text-center font-bold text-3xl lg:text-4xl mb-10">
            Sign Up
          </h2>
          <Input
            id={"full_name"}
            name={"f_name"}
            title={"Full Name"}
            type={"text"}
            required={true}
            setValue={handleInfo}
            value={adminInfo.f_name}
            placeholder={"Full Name"}
          />

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
            placeholder={"Enter Password"}
          />
          <Input
            id={"cpass"}
            name={"c_password"}
            title={"Confirm Password"}
            type={"password"}
            confirm={pass === c_pass}
            required={true}
            setValue={(e) => setCPass(e.target.value)}
            value={c_pass}
            placeholder={"Confirm Password"}
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
          {error && (
            <div className="bg-rose-100 text-rose-600 dm-sans-medium ring-1 ring-rose-600 rounded-md px-3 py-2">
              {error}
            </div>
          )}
          <button
            className="w-full btn border-none bg-blue-600 hover:bg-blue-700 text-white dm-sans-medium"
            type="submit"
          >
            Sign Up
          </button>

          <div className="text-wrap break-words">
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

export default Signup;
