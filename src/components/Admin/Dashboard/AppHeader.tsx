import { BellOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import { Avatar } from "antd";

const userName = localStorage.getItem("firstName");

export const AppHeader = () => {
  return (
    <div
      className="flex justify-between w-full items-center"
      style={{ backgroundColor: "#001529" }}
    >
      <Typography
        variant="h5"
        className="font-semibold"
        style={{ color: "white" }}
      >
        X-Time
      </Typography>
      <div className="flex w-2/14 justify-around items-center">
        {userName && (
          <div className="flex items-center space-x-5 mr-5">
            <Avatar className="text-5xl">{/* {userName.slice(0, 1)} */}</Avatar>
            {/* <Typography variant="body1">{userName}</Typography> */}
          </div>
        )}
      </div>
    </div>
  );
};
