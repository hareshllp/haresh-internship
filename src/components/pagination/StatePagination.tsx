import getPaginationItems from './PaginationItems';
import PageLink from './PageLink';
import './Pagination.css';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from 'redux/slices/products.slice';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: Props) => {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  const dispatch = useDispatch();

  return (
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => setCurrentPage(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      <PageLink
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  );
}

export default Pagination;
