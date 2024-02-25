import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from 'react'

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const[activeTab, setActiveTab] = useState('instructions');

const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailData = await data.json();
    setDetails(detailData);
};

useEffect(() => {
    fetchDetails();
}, [params.name]);

  return (
    <DetailWrapper>
        <div className="recipe-info">
            <h2>{details.title}</h2>
            <img src={details.image} alt="" />
        </div>
        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : ''}
                    onClick={() => setActiveTab('instructions')}
            >
                Instructions
            </Button>
            <Button className={activeTab === 'ingredients' ? 'active' : ''} 
                    onClick={() => setActiveTab('ingredients')}
            >
                Ingredients
            </Button>

            {activeTab === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                </div>
            )}

            {activeTab === 'ingredients' && (
                <ul>
                    {details.extendedIngredients.map((ingredient) =>
                    <li key={ingredient.id}>{ingredient.original}</li>
                    )}
                </ul>
            )}

        </Info>
    </DetailWrapper>
  )
};


const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    @media (max-width: 768px) {
    flex-direction: column;
    
    .recipe-info {
      order: -1;
    }

  }
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
        border: 2px solid black;
        outline: none; // Add this line to remove the default outline
    }

    h2{
        margin-bottom: 2rem 0 ;
        text-align: center;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
        
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    width: 150px;
    height: auto;

    @media (max-width: 768px) {
    margin: auto;
    background-size: auto ;
  }
`

const Info = styled.div`
    margin-left: 10rem;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 768px) {
    margin-left: 0;
    
    
  }
`


export default Recipe