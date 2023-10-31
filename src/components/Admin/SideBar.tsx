import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import { FaGem, FaGithub } from "react-icons/fa";
import { DiReact } from "react-icons/di";
import sidebarBg from "../../assets/bg2.jpg";
import "react-pro-sidebar/dist/css/styles.css";
import { MdDashboard } from "react-icons/md";
import "./SideBar.scss";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  collapsed?: boolean;
  toggled?: boolean;
  handleToggleSidebar?: (value: boolean) => void;
}

const SideBar = ({ collapsed, toggled, handleToggleSidebar }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader
          onClick={() => {
            navigate("/");
          }}
        >
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <span>React Ultimate</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                Quản lý Users <Link to="/admins/manage-users" />
              </MenuItem>
              <MenuItem>
                Quản lý Bài Quiz
                <Link to="/admins/manage-quizzes" />
              </MenuItem>
              <MenuItem> Quản lý Câu Hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/phmanhquan/react-ultimate"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                View Source
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
