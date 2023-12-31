import { Participant } from "../../../services/participant-service";

interface Props {
  listUser: Participant[];
  onUpdate: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
}

const TableUser = ({ listUser, onUpdate, onView, onDelete }: Props) => {
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => onView(user.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-success mx-3"
                      onClick={() => onUpdate(user.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={4}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
