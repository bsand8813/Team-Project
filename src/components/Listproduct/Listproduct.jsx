import React from 'react';
import { Card, Button, Row, CardDeck, CardColumns } from 'react-bootstrap';
import styles from './Listproduct.module.css'
import {
    useHistory, withRouter
  } from "react-router-dom";
import Carouselproduct from '../Carouselproduct/Carouselproduct';
import axios from 'axios';


class Listproduct extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Products : []
        }
    }    
    

    async componentDidMount() {
        const {kategori} = this.props.match.params
        console.log(kategori);
        await axios.get(`http://localhost:8000/category/home`)
          .then(res => {
            
            const productdata = res.data;
            this.setState({
                Products : productdata
            })
          })
          console.log(this.state.Products);
      }

    Productdetails = (id) => {
        this.props.history.push({
            pathname: `/detailproduct/${id}`,
            state: { detail: id }
        });
    }


    render(){
        
        return (
            
            <div className={styles.listbaju}>
                <h4>Featured Colection</h4>
                <hr/>
                

                {/* <CardDeck className="mb-4">
                    <Carouselproduct/>
                </CardDeck> */}
                <CardColumns className="mb-4">
                {this.state.Products.map((Product) => (
                    
                        <Card onClick={() =>this.Productdetails(Product.idProduk)} key={Product.idProduk} style={{cursor : "pointer",}}>
                            <Card.Img variant="top" src={Product.gambarProduk} />
                            <Card.Body>
                            <Card.Title>{Product.namaProduk}</Card.Title>
                            <Card.Text>
                                <p style={{fontSize : "20px"}}>Rp.{Product.hargaProduk}</p>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    
                    
                ))}
                </CardColumns>
            </div>
        )
    }
}

export default withRouter(Listproduct);