import { Participant } from "../../../services/participant-service";
import ReactPaginate from "react-paginate";

interface Props {
  listUser: Participant[];
  totalPage: number;
  pageSelected: number;
  limit: number;
  onUpdate: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onAssignQuiz: (id: number) => void;
  onChangePage: (page: number) => void;
}

const TableUserPaginate = ({
  listUser,
  totalPage,
  pageSelected,
  limit,
  onUpdate,
  onView,
  onDelete,
  onAssignQuiz,
  onChangePage,
}: Props) => {
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
                  <th scope="row">{pageSelected * limit + index + 1}</th>
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
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => onAssignQuiz(user.id)}
                    >
                      Assign Quiz
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
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={(event) => onChangePage(event.selected)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={pageSelected}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
