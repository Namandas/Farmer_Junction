import React from 'react'
import Card from './Card.jsx';
import '../'

const Batches = (props) => {
    function getId(id)
    {
        props.removeTour(id);
    }

    return (
        <div className='container'>
            <div>
                <h2 className="title text-white ">Your Assigned Batches</h2>
            </div>

            <div className="cardsContainer">
                {
                    props.tours.map((tour) => {
                        return <Card tour={tour} getRemoveId = {getId}/>
                    })
                }
            </div>
        </div>
    )
}

export default Batches
