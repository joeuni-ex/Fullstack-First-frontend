import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  let navigate = useNavigate();
  //"/user/:id" 의 값이 "/user/123" 이면 id의 값으로 123을 받음
  const { id } = useParams(); //파라미터 값 받기

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const { name, username, email } = user; //user객체의 속성을 구조 할당 분해

  //페이지 시작시 유저데이터를 받아 user에 저장
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  // 유저 아이디로 데이터 가져오기
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/users/${id}`);
    setUser(result.data);
  };

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

    await axios.put(`http://localhost:8080/users/${id}`, user);
    navigate("/"); //유저 수정 후 홈페이지로 이동
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">유저 수정</h2>
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
                수정
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

export default EditUser;
