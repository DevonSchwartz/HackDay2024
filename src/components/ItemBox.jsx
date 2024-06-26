import React, {useContext} from 'react';
import { Box, Button } from '@mui/material';
import DamageComponent from './DamageComponent';
import { BoxContext } from "../context-providers/BoxContext";

// used for subboxes 
const BoxStyle = {
    display: 'flex',
    border: 1,
    fontFamily: 'Arial, sans-serif'
}



// Hold an individual household item. Information can be edited by the user
// ItemName: string
// description: string
// price: number
// originalPhoto: string (base64)
// boxId: number
// deleteBoxFunction: function pointer that takes a number
// contextProviderRouter: function pointer that takes a string
const ItemBox = (props) => {
    let {items, goToPage, deleteBox} = useContext(BoxContext)

    // parameterized values
    const boxIndex = props.boxIndex
    const boxId = props.boxId

    const itemName = items?.[boxIndex] ? items[boxIndex].itemName : 'Item Name'
    const description = items?.[boxIndex] ? items[boxIndex].description : 'Description'
    const price = items?.[boxIndex] ? items[boxIndex].price : 'Price'
    const originalPhoto = items?.[boxIndex] ? items[boxIndex].originalPhoto : null
    const damaged = items?.[boxIndex] ? items[boxIndex].damaged : false
    const damagedPhoto = items?.[boxIndex] ? items[boxIndex].damagedPhoto : null
    

    const handleRemoveClick = () => {
        deleteBox(boxId, boxIndex);
    };

    const handleEditClick = () => {
        goToPage('/editItem', 
            {state: {
                item: {
                    itemName: itemName,
                    description: description,
                    price: price,
                    originalPhoto: originalPhoto,
                    damaged: damaged,
                    damagedPhoto: damagedPhoto,
                },
                index: boxIndex
        }});
    };

    const itemNameBox = (
        <Box
            color="black"
            bgcolor="white" p={1}
            justifyContent="center"
            sx={BoxStyle}>
            <header>{itemName}</header>
        </Box>
    );

    const descriptionBox = (
        <Box
            color="black"
            bgcolor="white" p={1}
            justifyContent="center"
            sx={BoxStyle}>

            <header>{description}</header>
        </Box>
    )

    const priceBox = (
        <Box
            color="black"
            bgcolor="white" p={1}
            justifyContent="center"
            sx={BoxStyle}>
            <header>{price}</header>
        </Box>
    )

    const uploadImage = (
        <Box
            color="black"
            bgcolor="white" p={1}
            justifyContent="center"
            sx={BoxStyle}>
            <img src={`data:image/png;base64, ${originalPhoto}`} alt='Original Photo' 
                width={250} height={250}></img>
        </Box>
    )

    const damagedComponent = (
        <DamageComponent 
            key={boxId}
            index={boxIndex} 
        />
    )

    return (
        <div style={{
            marginLeft: '25%',
            marginTop: '60px',
            width: '50%',
            display: 'flex', 
            gap: '20px', 
            backgroundColor: 'white', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            overflow: 'hidden', 
        }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={handleRemoveClick}>x</button>
                    <Button variant="contained" color="primary" onClick={handleEditClick} 
                        style={{ marginLeft: '10px' }}>Edit Item</Button>
                </div>
                {itemNameBox}
                {descriptionBox}
                {priceBox}
                {uploadImage}
            </div>
            <div style={{ flex: 1 }}>
                {boxIndex >= items.length ? null : damagedComponent}
            </div>
        </div>
    );
}

export default ItemBox;
