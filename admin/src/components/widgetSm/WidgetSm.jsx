import "./widgetsm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect} from "react";
import {userRequest} from "../../requestMethods"

export default function WidgetSm() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user => (
           <li key={user._id} className="widgetSmListItem">
           <img
             src={user.img || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"}
             alt=""
             className="widgetSmImg"
           />
           <div className="widgetSmUser">
             <span className="widgetSmUsername">{user.username}</span>
           </div>
           <button className="widgetSmButton">
             <Visibility className="widgetSmIcon" />
             Display
           </button>
         </li>
        ))}
      </ul>
    </div>
  );
}