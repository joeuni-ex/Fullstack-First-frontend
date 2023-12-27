import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getUsers();
  }, []); //한 번만 실행

  //전체 유저 정보 가져오기
  const getUsers = async () => {
    const result = await axios.get(`${import.meta.env.VITE_USER_API}/users`);
    setUsers(result.data);
  };

  //유저 삭제하기
  const deleteUser = async (id) => {
    if (confirm("정말로 삭제할까요?")) {
      await axios.delete(`${import.meta.env.VITE_USER_API}/users/${id}`);
      getUsers(); //삭제 후 유저 정보 다시 가져오기
    }
  };
  //검색
  const searchUser = async (e) => {
    e.preventDefault();
    if (search === "") {
      getUsers();
      return;
    }
    const result = await axios.get(
      `${import.meta.env.VITE_USER_API}/searchUser?search=${search}`
    );
    setUsers(result.data);
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="container">
      <form onSubmit={searchUser}>
        <div className="d-flex justify-content-center ">
          <div className="input-group mb-3  w-50 p-3">
            <input
              onChange={onChange}
              type="text"
              className="form-control mt-4 "
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary  mt-4"
              type="submit"
              id="button-addon2"
            >
              Button
            </button>
          </div>
        </div>
      </form>
      <table className="table  border shadow text-center  my-4 table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">이름</th>
            <th scope="col">유저네임</th>
            <th scope="col">이메일</th>
            <th scope="col">액션</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`/viewuser/${user.id}`}
                  className="btn btn-outline-secondary mx-2"
                >
                  보기
                </Link>
                <Link
                  to={`/edituser/${user.id}`}
                  className="btn btn-outline-warning mx-2"
                >
                  수정
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-outline-danger mx-2"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
