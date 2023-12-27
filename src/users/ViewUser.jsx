import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
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
    const result = await axios.get(
      `${import.meta.env.VITE_USER_API}/users/${id}`
    );
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">유저 정보</h2>

          <div className="card">
            <div className="card-header">
              유저ID :
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>이름 : {name} </b>
                </li>
                <li className="list-group-item">
                  <b>유저네임 : {username}</b>
                </li>
                <li className="list-group-item">
                  <b>이메일 : {email} </b>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            돌아기기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
