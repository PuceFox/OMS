export default function Paging({ totalPage, page, setPage }) {
  let pages = [];

  for (let i = 1; i <= totalPage; i++) {
    if (page === i) {
      pages.push(
        <button onClick={() => setPage(i)} className="join-item btn btn-active">
          {i}
        </button>
      );
    } else {
      pages.push(
        <button onClick={() => setPage(i)} className="join-item btn">
          {i}
        </button>
      );
    }
  }

  return <div className="join">{pages}</div>;
}
