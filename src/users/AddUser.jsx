import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const { name, username, email } = user; //user객체의 속성을 구조 할당 분해

  const onInputChange = (e) => {
    setUser({
      ...user, //기존에 있던 유저 복사
      [e.target.name]: e.target.value, // 값 추가
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || username === "" || email === "") {
      alert("내용을 입력해 주세요.");
      return; //이름, 유저네임, 이메일 공백 시 리턴
    }

    await axios.post(`${process.env.USER_API}/users`, user);
    navigate("/"); //유저 추가 후 홈페이지로 이동
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">가입 하기</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                onChange={onInputChange}
                value={name}
                type="text"
                id="name"
                className="form-control"
                placeholder="이름 입력"
                name="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                유저네임
              </label>
              <input
                onChange={onInputChange}
                value={username}
                type="text"
                id="username"
                className="form-control"
                placeholder=" 유저네임 입력"
                name="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                onChange={onInputChange}
                value={email}
                type="email"
                id="email"
                className="form-control"
                placeholder="이메일 입력"
                name="email"
              />
            </div>
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                가입
              </button>
              <Link
                to="/"
                type="submit"
                className="btn btn-outline-danger px-3 mx-2"
              >
                취소
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
