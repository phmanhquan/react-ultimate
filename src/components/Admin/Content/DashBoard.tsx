import {
  Bar,
  BarChart,
  // CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  // XAxis,
  YAxis,
} from "recharts";
import "./DashBoard.scss";
import { useOverview } from "../../../hooks/useDashboard";

const DashBoard = () => {
  const { overview } = useOverview();
  const data = [
    {
      quizzes: overview?.others?.countQuiz,
      questions: overview?.others?.countQuestions,
      answers: overview?.others?.countAnswers,
    },
  ];
  return (
    <div className="dashboard-container">
      <div className="title">Analytics DashBoard</div>
      <div className="content">
        <div className="content-left">
          <div className="child">
            <span className="text-1">Total Users</span>
            <span className="text-2">{overview?.users?.total}</span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">{overview?.others?.countQuiz}</span>
          </div>
          <div className="child">
            <span className="text-1">Total Admins</span>
            <span className="text-2">{overview?.users?.countAdmin}</span>
          </div>
          <div className="child">
            <span className="text-1">Total Members</span>
            <span className="text-2">{overview?.users?.countUsers}</span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={data} barGap="20%">
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              {/* <XAxis dataKey="name" /> */}
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quizzes" fill="#8884d8" />
              <Bar dataKey="questions" fill="#82ca9d" />
              <Bar dataKey="answers" fill="#8dd1e1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
