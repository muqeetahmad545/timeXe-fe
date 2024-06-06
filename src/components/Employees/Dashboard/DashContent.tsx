import { Typography, DatePicker, Divider, Row, Card, message } from "antd";
// import { FaArrowRightToBracket } from "react-icons/fa6";
// import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoPauseCircleOutline } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

import {
  CheckInApi,
  CheckOutApi,
  fetchUserAttendance,
} from "../../../services/attendenceApis/attendence";
import { AttendanceRecord, UserData } from "../../types";
import { fetchUserData } from "../../../services/userApis/userApis";
const { Title } = Typography;
function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
const data = [{ value: 5 }];



const size = {
  width: 400,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 32,
}));

export const DashContent = () => {
  const [hourCard, setHourCard] = useState(false);
  const [action, setAction] = useState<number>(0);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord | null>(
    null
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [checkIn, setCheckIn] = useState(false);
  const [workingHours, setWorkingHours] = useState("")

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //   //  {attendanceData?.working_hours
  //   //     ? convertToHHMMSS(Number(attendanceData?.working_hours)) 
  //   //     : 0 }
  //    console.log("workingHours",workingHours)
  //     if(!attendanceData?.working_hours){
  //     const currentTime :any = new Date();
  //     const timeInc :any =attendanceData?.time_in
  //     const timeIn : any = new Date(timeInc);
  //     const diffMilliseconds = currentTime - timeIn;
  //     const workingHours = convertToHHMMSS(diffMilliseconds);
  //     setWorkingHours(workingHours as any);
  //     }else{
  //       setWorkingHours(attendanceData?.working_hours as any);
  //     }
     
  //   }, 30000);
  // }, [attendanceData?.working_hours]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUserAttendance();
      const userDetail = await fetchUserData();
      console.log("response",response.data);
      setUserData(userDetail);
      const latRes = response.data[response.data.length - 1];
      const todayDate = new Date().toISOString().substring(0, 10);
      // console.log(todayDate);
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log("response.data",latRes.time_in);
        if (
          latRes?.time_in &&
          latRes?.time_in.toLocaleString().slice(0, 10) === todayDate
        ) {
          setCheckIn(true);
          setHourCard(true);
        }
        if (latRes?.time_out) {
          setHourCard(false);
        }
        console.log(
          latRes?.time_in.toLocaleString().slice(0, 10) === todayDate
        );
        if (latRes?.time_in.toLocaleString().slice(0, 10) === todayDate) {
          setAttendanceData(latRes);
        }
      }
    };
    fetchData();
  }, [action]);
  const totalAttendance = attendanceData ? 1 : 0;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchUserAttendance();
  //     const userDetail = await fetchUserData();
  //     console.log(userDetail);
  //     setUserData(userDetail);
  //     const latRes = response.data[response.data.length - 1];
  //     const todayDate = new Date().toISOString().substring(0, 10);
  //     console.log(todayDate);
  //     if (Array.isArray(response.data) && response.data.length > 0) {
  //       console.log(latRes);
  //       if (
  //         latRes?.time_in &&
  //         latRes?.time_in.toLocaleString().slice(0, 10) === todayDate
  //       ) {
  //         setCheckIn(true);
  //         setHourCard(true);
  //       }
  //       if (latRes?.time_out) {
  //         setHourCard(false);
  //       }
  //       console.log(
  //         latRes?.time_in.toLocaleString().slice(0, 10) === todayDate
  //       );
  //       if (latRes?.time_in.toLocaleString().slice(0, 10) === todayDate) {
  //         setAttendanceData(latRes);
  //         console.log(attendanceData);
  //         console.log(attendanceData?.time_in.toLocaleString().slice(0, 10));
  //         // if (attendanceData?.time_in && !attendanceData?.time_out) {
  //         //   setHourCard(true);
  //         // } else if (attendanceData?.time_in && attendanceData?.time_out) {
  //         //   setHourCard(false);
  //         // } else {
  //         //   setHourCard(false);
  //         // }
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [action]);
  const handleCheckIn = async () => {
    try {
      const responseData = await CheckInApi();
      console.log("CheckInApi",CheckInApi);
      if (responseData.checkedIn) {
        message.success("You CheckedIn successfully");
        setCheckIn(true);
        setHourCard(true);
        localStorage.setItem("checkedIn", responseData.checkedIn);
        setAction((prev) => prev + 1);
      } else {
        message.error("You already checkedIn");
      }
    } catch (error) {
      console.log("error in checking in", error);
    }
  };
  const handleCheckOut = async () => {
    try {
      if (hourCard === false) {
        message.error("You are already checked out");
        return;
      }
      const response = await CheckOutApi();
      message.success("You checked Out successfully");
      setAction((prev) => prev + 1);
      setHourCard(false);
    } catch (error) {
      message.error("Failed to check out");
    }
  };
  
  const convertToHHMMSS = (decimalHours: number) => {
    if (isNaN(decimalHours)) {
      return 'N/A';
    }
    const totalSeconds = Math.floor(decimalHours * 3600);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
const IconvertToHHMMSS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};


  const calculateWorkingHours = (): string => {
    if (!attendanceData || !attendanceData.time_in) return "0";
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - new Date(attendanceData.time_in).getTime();
    const workingHoursInSeconds = timeDifference / 1000;
    return IconvertToHHMMSS(workingHoursInSeconds);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const newWorkingHours = calculateWorkingHours();
      setWorkingHours(newWorkingHours);
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateWorkingHours]);

  return (
    
    <div>
      <div className="bg-slate-200 pb-4">
        <div className="flex justify-between bg-slate-200 p-1 rounded-md">
          <div className="border-l-4 border-secondary-color h-9 flex items-center">
            <Title level={5} className="ml-2">
              Good Day, {userData?.firstName && userData?.lastName ? userData?.firstName + ' ' + userData?.lastName : ''}
            </Title>
          </div>
          <DatePicker />
        </div>
        <Divider />
        <Row className=" flex justify-center">
          {!checkIn && (
            <Card className="mr-2 bg-green-100" onClick={handleCheckIn}>
              <Title level={5}>
                {attendanceData?.time_in
                  ? attendanceData?.time_in.toLocaleString().slice(11, 19)
                  : "You did not checkIn"}
              </Title>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <FaRegPlayCircle style={{ fontSize: "40px" }} />
  </div>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginTop:"10px" }}>
    <span>Checked In</span>
  </div>
        </Card>
          )}
          {checkIn && (
            <Card className="mr-2 bg-orange-100" onClick={handleCheckOut} >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Title level={5}>
      {attendanceData?.time_out
        ? new Date(attendanceData?.time_out).toLocaleString('en-US', {
            timeZone: 'Asia/Karachi', 
            hour: 'numeric',
            minute: 'numeric',
            hour12: true 
          })
        : "0"}
              </Title>
              </div>
   
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <IoPauseCircleOutline style={{ fontSize: "40px" }} />
  </div>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginTop:"10px" }}>
    <span>Checked Out</span>
  </div>
            </Card>
          )}
          {checkIn && (
              <Card className="mr-2 bg-blue-100" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width:"150px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Title level={5}>
                {attendanceData?.working_hours
                 ? convertToHHMMSS(Number(attendanceData?.working_hours)) 
                  : calculateWorkingHours()}
              </Title>
            </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginTop:"10px" }}>
              <span>Working hours</span>
  </div>
            </Card>
          )}
       {hourCard ? (
   <Card className="mr-2 bg-blue-100" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <title>
      {attendanceData?.time_in
        ? attendanceData?.time_in.toLocaleString().slice(11, 19)
        : "Check Out after CheckIn"}
    </title>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
    <Title level={5}>
      {attendanceData?.time_in
        ? new Date(attendanceData?.time_in).toLocaleString('en-US', {
            timeZone: 'Asia/Karachi', 
            hour: 'numeric',
            minute: 'numeric',
            hour12: true 
          })
        : "N/A"}
    </Title>
    </div>

    {/* <Title level={5}>
      {currentTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})}
    </Title> */}
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "15px", marginTop:"10px" , width:"100px"  }}>
    <span>Check In</span>
  </div>
  </Card>
) : (
  ""
)}
        </Row>
      </div>
      <div className="flex items-center justify-around bg-slate-200 rounded-md mt-4 p-2">
      <div className="bg-white rounded-md flex justify-center items-center">
  <div className="" style={{marginLeft:55}}>
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>{totalAttendance}</PieCenterLabel>
    </PieChart>
    <p className="mt-2 ml-32">Total Attendance</p>
  </div>
</div>

        <div className="bg-white rounded-md">
          <Title
            level={5}
            className="border-2 border-slate-200 w-[140px] p-1 m-1 rounded-full 
            !text-slate-400"
          >
            Graphical Report
          </Title>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={700}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};
