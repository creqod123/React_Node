import React from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'



export default function PaginatedItems({ pages, page, isAdmin = false, keyword = '' }) {
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={
                        !isAdmin
                            ? keyword
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/page/${x + 1}`
                            : `/admin/productlist/${x + 1}`
                    }
                >

                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}   