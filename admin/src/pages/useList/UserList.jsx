import './userlist.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { userRows } from '../../dummyData';
import {Link} from "react-router-dom"
import {useState} from "react"
import { useEffect } from 'react';
import { userRequest } from '../../requestMethods';

export default function UserList() {
  const [data, setData] = useState([])
  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id))
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/")
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  },[])

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'User',
      width: 150,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={params.row.avatar || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"} alt='' />
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Updeted At',
      width: 200,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={"/user/"+ params.row._id}>
          <button className='userListEdit'>Edit</button>
          </Link>
           
            <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/>
          </>
        );
      },
    },
  ];

  

  return (
    <div className='userList'>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}
