import React, { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../Service/UserService";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
 
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
 
export default function SearchUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
 
  const loadUsers = async () => {
    const result = await UserServices.loadUsers();
    setUsers(result.data);
  };
 
  useEffect(() => {
    loadUsers();
  }, []);
 
  const columns = [
    { title: "Id", field: "id", editable: "never" },
    { title: "First Name", field: "fullName" },
    {
      title: "Address",
      field: "address",
      initialEditValue: "initial value",
    },
    { title: "Mobile Number", field: "phoneNo", type: "numeric" },
    { title: "Email", field: "email", editable: "never" },
    {
      title: "Confirmation Code",
      field: "confirmationCode",
      editable: "never",
    },
    { title: "Created At", field: "createdAt", editable: "never" },
  ];
 
  const updateUser = async (id, newData) => {
    try {
      const response = await UserServices.updateUser(id, newData);
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
user.id === id ? newData : user
        );
        setUsers(updatedUsers);
        console.log(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
 
  const deleteUser = async (id) => {
    try {
      const response = await UserServices.deleteUserById(id);
      if (response.status === 204) {
        await loadUsers();
        console.log("User deleted:", response.data);
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };
 
  return (
    <>
      <h2 style={{ fontWeight: "bold" }}>Users List</h2>
      <MaterialTable
        title="Editable table"
        icons={tableIcons}
        columns={columns}
        data={users}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
const id = oldData.id;
              updateUser(id, newData)
                .then(() => {
                  resolve();
                })
                .catch((error) => {
                  console.error("Error updating user:", error);
                  reject();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
const id = oldData.id;
              deleteUser(id)
                .then(() => {
                  resolve();
                })
                .catch((error) => {
                  console.error("Error deleting user:", error);
                  reject();
                });
            }),
        }}
      />
    </>
  );
}