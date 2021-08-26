import React from 'react'
import { useData } from '../contexts/DataContext'

const RenderPaginatedContent = ({ RenderComponent, data, dataLimit }) => {
    const { getPaginatedData } = useData()

    return getPaginatedData(data, dataLimit).map((d, idx) => (
        <RenderComponent key={idx} data={d} />
    ))
}

export default RenderPaginatedContent