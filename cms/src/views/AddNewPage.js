import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../assets/css/style.css';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

function NavbarComponent() {
  const [addSuccessMessage, setAddSuccessMessage] = useState("");
  const [addErrorMessage, setAddErrorMessage] = useState("");
  const [newNavbarItem, setNewNavbarItem] = useState({
    name: '',
    link: '',
    position: '',
    content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNavbarItem({ ...newNavbarItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newNavbarItem.name.trim() || !newNavbarItem.link.trim() || !newNavbarItem.position.trim() || !newNavbarItem.content.trim()) {
      setAddErrorMessage("Name, Link, Position, and Content are required to add a navbar item.");
      setTimeout(() => {
        setAddErrorMessage("");
      }, 5000);
      return;
    }

    try {
      const response = await axios.post('https://back.zubilaw.com/navbar/add', newNavbarItem);

      if (response.status === 200 || response.status === 201) {
        setNewNavbarItem({
          name: '',
          link: '',
          position: '',
          content: ''
        });
        setAddSuccessMessage("Navbar item added successfully");
        setTimeout(() => {
          setAddSuccessMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error('Error adding navbar item:', error);
      setAddErrorMessage("Failed to add navbar item. Please try again.");
      setTimeout(() => {
        setAddErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="content">
      <CardHeader>
        <CardTitle tag="h4">Add Page in Navbar</CardTitle>
      </CardHeader>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="7">
            <FormGroup>
              <label>Name:</label>
              <Input
                type="text"
                name="name"
                value={newNavbarItem.name}
                onChange={handleInputChange}
                placeholder="Enter name"
              />
            </FormGroup>
          </Col>
          <Col md="7">
            <FormGroup>
              <label>Link:</label>
              <Input
                type="text"
                name="link"
                value={newNavbarItem.link}
                onChange={handleInputChange}
                placeholder="Enter link"
              />
            </FormGroup>
          </Col>
          <Col md="7">
            <FormGroup>
              <label>Position:</label>
              <Input
                type="number"
                name="position"
                value={newNavbarItem.position}
                onChange={handleInputChange}
                placeholder="Enter position"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="7">
            <FormGroup>
              <label>Page Content:</label>
              <div
                style={{
                  height: '300px',
                  overflowY: 'auto'
                }}
              >
                <ReactQuill
                  value={newNavbarItem.content}
                  onChange={(html) =>
                    setNewNavbarItem({
                      ...newNavbarItem,
                      content: html
                    })
                  }
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' },
                      { 'indent': '-1' }, { 'indent': '+1' }],
                      ['link', 'image', 'video'],
                      [{ 'align': [] }],
                      ['clean']
                    ],
                  }}
                  style={{ height: '80%' }}
                />


                
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <div className="update ml-auto mr-auto">
              <Button className="btn-round" color="primary" type="submit">
                Add Navbar Item
              </Button>
            </div>
          </Col>
        </Row>
        {addSuccessMessage && (
          <div className="alert alert-success" role="alert" style={{ width: '50%', margin: '10px auto', textAlign: 'center' }}>
            {addSuccessMessage}
          </div>
        )}
        {addErrorMessage && (
          <div className="alert alert-danger" role="alert" style={{ width: '50%', margin: '10px auto', textAlign: 'center' }}>
            {addErrorMessage}
          </div>
        )}
      </Form>
    </div>
  );
}

export default NavbarComponent;

