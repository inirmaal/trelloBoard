import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import TrelloList from "./TrelloList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    //reordering logic
    const { destination, source, draggableId, type } = result;
    if(!destination) {
      return;
    }
    dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type))
  };
  const lists = useSelector(state => state.lists);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div>
     <h4>Trello</h4>
     <Droppable droppableId="all-lists" direction="horizontal" type="list">
       {(provided) => (
         <div style = {styles.listsContainer} {...provided.droppableProps} ref= {provided.innerRef}> 
         {lists.map((list,index) => (
           <TrelloList index={index} listID={list.id} key={list.id} title={list.title} cards={list.cards} />
         ))}
         <TrelloActionButton lists={lists}/>
         </div>
       )}
     </Droppable>
    </div>
    </DragDropContext>
  );
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: 'row'
  }
}

export default App;
