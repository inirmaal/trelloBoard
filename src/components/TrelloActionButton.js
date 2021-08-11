import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import TextArea from 'react-textarea-autosize';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addList, addCard } from '../actions';

const TrelloActionButton = ({lists, listID}) => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const [text, setText] = useState("");

    const openFormHandler = () => {
        setOpenForm(true);
    }

    const closeFormHandler = () => {
        setOpenForm(false);
    }

    const onChangeHandler = (e) => {
        setText(e.target.value);
    }

    const submitListHandler = () => {
        if(text) {
            dispatch(addList(text));
            setText('');
        }
    };

    const submitCardHandler = () => {
        if(text) {
            dispatch(addCard(listID, text));
            setText('');
        }
    }

    const renderAddButton = () => {
        const buttonText = lists ? "Add another list" : "Add another card";
        const buttonTextOpacity = lists ? 1 : 0.5;
        const buttonTextColor = lists ? 'white' : 'inherit';
        const buttonTextBackground = lists ? 'rgba(0,0,0,.15)' : 'inherit';

        return (
            <div 
            onClick={openFormHandler}
            style = {{
                ...styles.openFormButtonGroup,
                opacity: buttonTextOpacity, 
                color: buttonTextColor, 
                backgroundColor: buttonTextBackground}}>
            <Icon>add</Icon>
            <p>{buttonText}</p>
            </div>
        )
    };

    const renderForm = () => {
        const placeholder = lists ? 'Enter list title...' : 'Enter a title for this card...'
        const buttonTitle = lists ? 'Add List' : 'Add Card'
        return (
            <div>
                <Card style = {{minHeight: 80, minWidth: 272, padding: '6px 8px 2px'}}>
                    <TextArea placeholder={placeholder} autoFocus onBlur={closeFormHandler}
                    value={text} onChange={onChangeHandler}
                    style={{resize:'none', width: '100%', overflow: 'hidden', outline: 'none', border: 'none'}}/> 
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button 
                    onMouseDown= {lists ? submitListHandler : submitCardHandler } variant='contained' style={{color: 'white', backgroundColor: '#5aac44'}}>
                    {buttonTitle} {" "}
                    </Button>
                    <Icon style={{marginLeft: 8, cursor: 'pointer'}}>close</Icon>
                </div>
            </div>
        )
    };

    return openForm ? renderForm() : renderAddButton();
};

const styles = {
    openFormButtonGroup: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: 'flex',
        alignItems: 'center'
    }
}
export default TrelloActionButton;