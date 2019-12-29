import React from 'react';

const Pagination = props => {
    
    const { totalElements, size, activePage } = props;
    const totalPages = Math.ceil(totalElements / size);
    const displayLimit = 7;
    const displaySideLimit = 4;
    
    const renderPreviousPage = () => {
        const properties = {
            className: activePage === 1 ? "page-item disabled" : "page-item",
            page: activePage - 1,
            label: 'Anterior'
        }
        return renderFirstOrLastButton(properties);
    }

    const renderNextPage = () => {
        const properties = {
            className: activePage === totalPages ? "page-item disabled" : "page-item",
            page: activePage + 1,
            label: 'Próximo'
        }
        return renderFirstOrLastButton(properties);
    }

    const renderFirstOrLastButton = (properties) => {
        const button = <button className="page-link" onClick={() => handlePage(properties.page)}>{properties.label}</button>;
        return <li className={properties.className}>{button}</li>
    }

    const renderNumberPages = () => {
        const pages = [];
        if(totalPages <= displayLimit) {
            return displayRegularPages(totalPages, buildNumberPagination, pages);
        } else {
            return displayExtendedPages(displaySideLimit, totalPages, activePage, buildNumberPagination, pages);
        }
    }

    const displayExtendedPages = (displaySideLimit, totalPages, activePage, buildNumberPagination, pages) => {
        const leftPages = fetchLeftPages(displaySideLimit);
        const rightPages = fetchRightPages(totalPages, displaySideLimit);
        const pagesDisplay = fetchPagesDisplay(displaySideLimit, leftPages, activePage, rightPages, totalPages);
        pagesDisplay.forEach((pageNumber, index) => {
            buildNumberPagination(pages, pageNumber, index);
        });
        return pages;
    }
    
    const displayRegularPages = (totalPages, buildNumberPagination, pages) => {
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            buildNumberPagination(pages, pageNumber, pageNumber);
        }
        return pages;
    }
    
    const fetchPagesDisplay = (displaySideLimit, leftPages, activePage, rightPages, totalPages) => {
        const lastItem = displaySideLimit - 1;
        let pages = [];
        if (leftPages.includes(activePage)) {
            pages = [...leftPages, leftPages[lastItem] + 1, '...', rightPages[lastItem]];
        } else if (rightPages.includes(activePage)) {
            pages = [1, '...', leftPages[lastItem] + 1, ...rightPages];
        } else {
            pages = [1, '...', activePage - 1, activePage, activePage + 1, '...', totalPages];
        }
        return pages;
    }
    
    const fetchRightPages = (totalPages, displaySideLimit) => {
        const rightPages = [];
        for (let pageNumber = totalPages; pageNumber > totalPages - displaySideLimit; pageNumber--) {
            rightPages.push(pageNumber);
        }
        rightPages.sort();
        return rightPages;
    }
    
    const fetchLeftPages = displaySideLimit => {
        const leftPages = [];
        for (let pageNumber = 1; pageNumber <= displaySideLimit; pageNumber++) {
            leftPages.push(pageNumber);
        }
        return leftPages;
    }

    const buildNumberPagination = (pages, pageNumber, index) => {
        const className = pageNumber === activePage ? "page-item active" : "page-item";
        const activeButton = <span className="page-link avoid-click">{pageNumber}</span>;
        const regularButton = <button className="page-link" onClick={() => handlePage(pageNumber)}>{pageNumber}</button>;
        const pageButtons = pageNumber === activePage || pageNumber === '...' ? activeButton : regularButton;
        pages.push(<li className={className} key={index}>{pageButtons}</li>);
    }

    const handlePage = pageNumber => {
        props.onChange(pageNumber);
    }

    return (
        <nav aria-label="pagination">
            <ul className="pagination justify-content-end">
                { renderPreviousPage() }
                { renderNumberPages() }
                { renderNextPage() }
            </ul>
            <span>Total de registros {totalElements}</span>
        </nav>
    );
}

export default Pagination;
