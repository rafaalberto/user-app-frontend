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
        return buildDirectionButtons(properties);
    }

    const renderNextPage = () => {
        const properties = {
            className: activePage === totalPages ? "page-item disabled" : "page-item",
            page: activePage + 1,
            label: 'Próximo'
        }
        return buildDirectionButtons(properties);
    }

    const buildDirectionButtons = (properties) => {
        const button = <button className="page-link" onClick={() => handlePage(properties.page)}>{properties.label}</button>;
        return <li className={properties.className}>{button}</li>
    }

    const renderNumericPages = () => {
        const pages = [];
        if(totalPages <= displayLimit) {
            return renderRegularNumericPages(totalPages, pages);
        } else {
            return renderExtendedNumericPages(displaySideLimit, totalPages, activePage, pages);
        }
    }

    const renderRegularNumericPages = (totalPages, pages) => {
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            buildNumericPagination(pages, pageNumber, pageNumber);
        }
        return pages;
    }

    const renderExtendedNumericPages = (displaySideLimit, totalPages, activePage, pages) => {
        const leftPages = fetchLeftPages(displaySideLimit);
        const rightPages = fetchRightPages(totalPages, displaySideLimit);
        const allPages = fetchAllPages(displaySideLimit, leftPages, activePage, rightPages, totalPages);
        allPages.forEach((pageNumber, index) => {
            buildNumericPagination(pages, pageNumber, index);
        });
        return pages;
    }

    const fetchLeftPages = displaySideLimit => {
        const leftPages = [];
        for (let pageNumber = 1; pageNumber <= displaySideLimit; pageNumber++) {
            leftPages.push(pageNumber);
        }
        return leftPages;
    }

    const fetchRightPages = (totalPages, displaySideLimit) => {
        const rightPages = [];
        for (let pageNumber = totalPages; pageNumber > totalPages - displaySideLimit; pageNumber--) {
            rightPages.push(pageNumber);
        }
        rightPages.sort();
        return rightPages;
    }
    
    const fetchAllPages = (displaySideLimit, leftPages, activePage, rightPages, totalPages) => {
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

    const buildNumericPagination = (pages, pageNumber, index) => {
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
                { renderNumericPages() }
                { renderNextPage() }
            </ul>
            <span>Total de registros {totalElements}</span>
        </nav>
    );
}

export default Pagination;
