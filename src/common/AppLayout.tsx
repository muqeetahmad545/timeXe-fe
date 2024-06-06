import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AppHeader } from "../components/Admin/Dashboard/AppHeader";
import { adminSidebar, employeeSidebar } from "./sidebar";
import { fetchUserData } from "../services/userApis/userApis";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserData();
        if (response && response.role !== undefined) {
          setUserRole(response.role);
        } else {
          setUserRole("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const role = userRole === "admin" ? adminSidebar : employeeSidebar;

  return (
    <Layout>
      <Header
        style={{ padding: 0, background: colorBgContainer, display: "flex" }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <AppHeader />
      </Header>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={role.map((menuitem) => ({
              key: menuitem.key,
              icon: <menuitem.icon />,
              label: menuitem.label,
              onClick: () =>{
                navigate(menuitem.path)
                if (menuitem.label === 'Logout') {
                  localStorage.removeItem("token");
                  localStorage.removeItem("firstName");
                  localStorage.clear()
                }
              },
            }))}
          />
        </Sider>
        <Layout className="h-screen">
          <Content
            style={{
              margin: "24px 16px",
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
        <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
