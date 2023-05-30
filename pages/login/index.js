import Link from "next/link";
import ReactModal from "react-modal";
import Select from "react-select";
import { loginApi } from "../../components/services/loginService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
function Login() {
  const [dsPhanManh, setDsPhanManh] = useState([]);
  const router = useRouter();
  const laydsPhanManh = async () => {
    try {
      const res = await loginApi.layDsPhanManh();
      let list = res?.data?.map((x) => ({
        label: x.TENCN,
        value: x.TENSERVER,
      }));
      console.log("res", list);

      return list;
    } catch (error) {
      console.log("error", error);
      return [];
    }
  };
  useEffect(() => {
    const setds = async () => {
      const res = await laydsPhanManh();
      localStorage.setItem("dsPhanManh", JSON.stringify(res));
      setDsPhanManh(res);
    };

    setds();
  }, []);

  const menu = {
    parentMenu: "admin",
    secondMenu: "class",
  };
  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      chiNhanh: currentCn.current?.value,
      user: currentTk.current,
      password: currentMk.current,
    };
    try {
      const res = await loginApi.dangNhap(payload);
      if (res?.data) {
        localStorage.setItem("userLogin", JSON.stringify(res.data));
        localStorage.setItem("currentDB", JSON.stringify(payload));
        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/trangchu");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Tài Khoản hoặc mật khẩu không đúng!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const currentTk = useRef();
  const currentMk = useRef();
  const currentCn = useRef();
  return (
    <div>
      <div>
        <ReactModal
          isOpen={true}
          contentLabel="Quanr lys sinh vien"
          style={customStyles}
        >
          <div
            style={{
              width: "30rem",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Quản lý điểm sinh viên</h3>
            <form>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label style={{ paddingRight: "2.8rem" }}>Khoa</label>
                <div style={{ width: "72%" }}>
                  <Select
                    options={dsPhanManh}
                    placeholder="Chọn chi nhánh"
                    onChange={(value) => {
                      currentCn.current = value;
                    }}
                  ></Select>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "1.5rem 0",
                }}
              >
                <label>Tài khoản</label>
                <input
                  onChange={(e) => {
                    currentTk.current = e.target.value;
                  }}
                  style={{ width: "70%", height: "1.5rem" }}
                ></input>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label>Mật khẩu</label>
                <input
                  onChange={(e) => {
                    currentMk.current = e.target.value;
                  }}
                  type="password"
                  style={{ width: "70%", height: "1.5rem" }}
                ></input>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "2rem",
                  marginTop: "1.5rem",
                }}
              >
                <button onClick={(e) => handleLogin(e)}>
                  {/* <Link href="main">Đăng nhập</Link> */}
                  Đăng nhập
                </button>
                <button
                  style={{
                    marginLeft: "1.5rem",
                  }}
                >
                  Thoát
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
