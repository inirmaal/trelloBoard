import React from 'react';
import TrelloActionButton from './TrelloActionButton';
import TrelloCard from './TrelloCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';


const TrelloList = ({title, cards, listID, index}) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} style={styles.container}>
                <Droppable droppableId={String(listID)}>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h4>{title}</h4>
                    {cards.map((card,index) => (
                        <TrelloCard index={index} key={card.id} text={card.text} id={card.id} /> 
                    ))}
                    {provided.placeholder}
                    <TrelloActionButton listID={listID}/>
                </div>
                )}
            </Droppable>    
            </div>
            )}
        </Draggable>
    )
};

const styles = {
    container: {
        backgroundColor: "#dfe3e6",
        borderRadius: 3,
        width: 300,
        padding: 8,
        height: '100%',
        marginRight: 8
    }
}


export default TrelloList;